import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  addDevCommand,
  detect,
  initCommand,
  installHint,
} from "../ts/lib/pm.js";

describe("pm", () => {
  let dir: string;
  const originalAgent = process.env.npm_config_user_agent;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "purus-pm-"));
    delete process.env.npm_config_user_agent;
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
    if (originalAgent === undefined) delete process.env.npm_config_user_agent;
    else process.env.npm_config_user_agent = originalAgent;
  });

  it("falls back to npm", () => {
    expect(detect(dir)).toBe("npm");
  });

  it("detects the manager from the user agent first", () => {
    fs.writeFileSync(path.join(dir, "yarn.lock"), "");
    process.env.npm_config_user_agent = "pnpm/9.12.0 npm/? node/v22.11.0";
    expect(detect(dir)).toBe("pnpm");
  });

  it("detects the manager from a lockfile", () => {
    fs.writeFileSync(path.join(dir, "bun.lock"), "");
    expect(detect(dir)).toBe("bun");
    fs.rmSync(path.join(dir, "bun.lock"));
    fs.writeFileSync(path.join(dir, "pnpm-lock.yaml"), "");
    expect(detect(dir)).toBe("pnpm");
  });

  it("ignores an unknown user agent", () => {
    process.env.npm_config_user_agent = "deno/2.0.0";
    expect(detect(dir)).toBe("npm");
  });

  it("maps init commands", () => {
    expect(initCommand("npm", true)).toEqual({
      cmd: "npm",
      args: ["init", "-y"],
    });
    expect(initCommand("npm", false)).toEqual({ cmd: "npm", args: ["init"] });
    expect(initCommand("pnpm", true)).toEqual({ cmd: "pnpm", args: ["init"] });
    expect(initCommand("yarn", true)).toEqual({
      cmd: "yarn",
      args: ["init", "-y"],
    });
    expect(initCommand("bun", true)).toBeNull();
  });

  it("maps add-dev commands", () => {
    expect(addDevCommand("npm", ["a", "b"])).toEqual({
      cmd: "npm",
      args: ["install", "--save-dev", "a", "b"],
    });
    expect(addDevCommand("pnpm", ["a"]).args).toEqual(["add", "-D", "a"]);
    expect(addDevCommand("yarn", ["a"]).args).toEqual(["add", "--dev", "a"]);
    expect(addDevCommand("bun", ["a"]).args).toEqual(["add", "--dev", "a"]);
  });

  it("prints install hints", () => {
    expect(installHint("npm")).toBe("npm install");
    expect(installHint("yarn")).toBe("yarn");
  });
});
