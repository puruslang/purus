import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterEach, describe, expect, it } from "vitest";
import { createServer, RUN_ENV } from "../src/index.js";

async function connect() {
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();
  await createServer().connect(serverTransport);
  const client = new Client({ name: "test", version: "0.0.0" });
  await client.connect(clientTransport);
  return client;
}

async function text(
  client: Client,
  name: string,
  args: Record<string, unknown>
) {
  const result = (await client.callTool({ name, arguments: args })) as {
    content: { text: string }[];
    isError?: boolean;
  };
  return { text: result.content[0].text, isError: result.isError ?? false };
}

afterEach(() => {
  delete process.env[RUN_ENV];
});

describe("mcp server", () => {
  it("lists the tools", async () => {
    const client = await connect();
    const names = (await client.listTools()).tools.map((t) => t.name).sort();
    expect(names).toEqual(["check", "compile", "format", "lint", "run"]);
  });

  it("compiles, checks, lints and formats", async () => {
    const client = await connect();
    expect(
      (await text(client, "compile", { source: "const x be 1" })).text
    ).toContain("const x = 1;");
    expect(
      (await text(client, "check", { source: "const x be 1" })).text
    ).toMatch(/OK/);
    expect(
      (await text(client, "lint", { source: "var x be 1" })).text
    ).toContain("no-var");
    expect(
      (await text(client, "format", { source: "const  x  be  1" })).text
    ).toBe("const x be 1\n");
  });

  it("reports compile errors as tool errors", async () => {
    const client = await connect();
    const result = await text(client, "check", { source: "if x gt 1 then\n" });
    expect(result.isError).toBe(true);
  });

  it("keeps run disabled by default and runs when enabled", async () => {
    const client = await connect();
    const denied = await text(client, "run", { source: "console.log[1]" });
    expect(denied.isError).toBe(true);
    expect(denied.text).toContain(RUN_ENV);
    process.env[RUN_ENV] = "1";
    const allowed = await text(client, "run", {
      source: "console.log[///hi///]",
    });
    expect(allowed.text.trim()).toBe("hi");
  });

  it("exposes the stdlib resource", async () => {
    const client = await connect();
    const res = await client.readResource({ uri: "purus://stdlib" });
    expect((res.contents[0] as { text: string }).text).toContain("p-array");
  });
});
