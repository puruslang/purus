#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { compile, check, version as purusVersion } from "purus";
import { z } from "zod";
import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import { execFileSync } from "child_process";

const server = new McpServer({ name: "purus-mcp", version: "0.1.0" });

server.registerTool(
  "compile",
  {
    description: "Purus コードを JavaScript にコンパイルします",
    inputSchema: {
      code: z.string().describe("コンパイルする Purus ソースコード"),
      strict: z.boolean().optional().describe("strict モードを有効にする（デフォルト: true）"),
      type: z.enum(["module", "commonjs"]).optional().describe('出力モジュール形式（デフォルト: "module"）'),
    },
  },
  async ({ code, strict, type }) => {
    try {
      const js = compile(code, { header: false, strict, type });
      return { content: [{ type: "text", text: js }] };
    } catch (e) {
      return {
        content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "check",
  {
    description: "Purus コードの構文チェックのみ行います（コンパイルはしません）",
    inputSchema: {
      code: z.string().describe("チェックする Purus ソースコード"),
    },
  },
  async ({ code }) => {
    try {
      check(code);
      return { content: [{ type: "text", text: "Syntax OK" }] };
    } catch (e) {
      return {
        content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "run",
  {
    description: "Purus コードをコンパイルして実行し、出力を返します",
    inputSchema: {
      code: z.string().describe("実行する Purus ソースコード"),
      timeout: z.number().optional().describe("タイムアウト（ミリ秒）。デフォルト: 5000"),
    },
  },
  async ({ code, timeout: rawTimeout }) => {
    const timeout = Math.min(
      typeof rawTimeout === "number" ? rawTimeout : 5000,
      10000
    );
    const tmpFile = path.join(os.tmpdir(), `purus-run-${Date.now()}.js`);
    try {
      const js = compile(code, { header: false, type: "commonjs" });
      fs.writeFileSync(tmpFile, js, "utf-8");
      const output = execFileSync(process.execPath, [tmpFile], {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout,
      });
      return { content: [{ type: "text", text: output }] };
    } catch (e) {
      let message: string;
      if (e instanceof Error) {
        const execError = e as NodeJS.ErrnoException & { stderr?: string };
        message = execError.stderr
          ? `${e.message}\n${execError.stderr}`
          : e.message;
      } else {
        message = String(e);
      }
      return {
        content: [{ type: "text", text: message }],
        isError: true,
      };
    } finally {
      try {
        fs.unlinkSync(tmpFile);
      } catch {
        // 無視
      }
    }
  }
);

server.registerTool(
  "version",
  {
    description: "Purus のバージョンを返します",
    inputSchema: {},
  },
  async () => {
    return { content: [{ type: "text", text: `purus v${purusVersion}` }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("purus-mcp server started");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
