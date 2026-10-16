import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  checkTool,
  compileTool,
  formatTool,
  lintTool,
  runTool,
  STDLIB_MODULES,
} from "./tools.js";

export function createServer(): McpServer {
  const server = new McpServer({ name: "puruslang-mcp", version: "0.1.0" });
  const source = z.string().describe("Purus source code");

  server.registerTool(
    "compile",
    {
      description: "Compile Purus source code to JavaScript",
      inputSchema: {
        source,
        type: z.enum(["module", "commonjs"]).optional(),
        strict: z.boolean().optional(),
      },
    },
    ({ source, type, strict }) => compileTool(source, { type, strict })
  );
  server.registerTool(
    "check",
    {
      description: "Check Purus source code for syntax errors",
      inputSchema: { source },
    },
    ({ source }) => checkTool(source)
  );
  server.registerTool(
    "lint",
    { description: "Lint Purus source code", inputSchema: { source } },
    ({ source }) => lintTool(source)
  );
  server.registerTool(
    "format",
    { description: "Format Purus source code", inputSchema: { source } },
    ({ source }) => formatTool(source)
  );
  server.registerTool(
    "run",
    {
      description:
        "Compile and run Purus code (disabled unless the server runs with PURUS_MCP_ALLOW_RUN=1; not sandboxed)",
      inputSchema: { source },
    },
    ({ source }) => runTool(source)
  );
  server.registerResource(
    "stdlib",
    "purus://stdlib",
    { description: "Standard library modules (use p-<name> as alias)" },
    (uri) => ({
      contents: [{ uri: uri.href, text: STDLIB_MODULES.join("\n") }],
    })
  );
  return server;
}
