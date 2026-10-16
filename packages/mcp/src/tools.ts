import { lint } from "@puruslang/linter";
import { formatPurus } from "@puruslang/prettier-plugin-purus";
import { check, compile } from "purus";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export interface ToolResult {
  [key: string]: unknown;
  content: { type: "text"; text: string }[];
  isError?: boolean;
}

function ok(text: string): ToolResult {
  return { content: [{ type: "text", text }] };
}

function fail(text: string): ToolResult {
  return { content: [{ type: "text", text }], isError: true };
}

export function compileTool(
  source: string,
  options: { type?: "module" | "commonjs"; strict?: boolean } = {}
): ToolResult {
  try {
    return ok(compile(source, { header: false, ...options }));
  } catch (err) {
    return fail((err as Error).message);
  }
}

export function checkTool(source: string): ToolResult {
  try {
    check(source);
    return ok("OK: no syntax errors");
  } catch (err) {
    return fail((err as Error).message);
  }
}

export function lintTool(source: string): ToolResult {
  const diagnostics = lint(source);
  if (diagnostics.length === 0) return ok("No issues found.");
  return ok(
    diagnostics
      .map((d) => `${d.line}:${d.col} ${d.severity} ${d.message} (${d.rule})`)
      .join("\n")
  );
}

export function formatTool(source: string): ToolResult {
  return ok(formatPurus(source));
}

export const RUN_ENV = "PURUS_MCP_ALLOW_RUN";
const MAX_OUTPUT = 64 * 1024;

/**
 * Runs compiled code in a child Node process. Disabled unless the server was
 * started with PURUS_MCP_ALLOW_RUN=1. Output and time are capped; the code is
 * NOT sandboxed (it can use the file system and the network).
 */
export function runTool(source: string, timeoutMs = 5000): ToolResult {
  if (process.env[RUN_ENV] !== "1") {
    return fail(
      `Running code is disabled. Start the server with ${RUN_ENV}=1 to enable it (the code runs unsandboxed).`
    );
  }
  let js: string;
  try {
    js = compile(source, { header: false, type: "commonjs", strict: true });
  } catch (err) {
    return fail((err as Error).message);
  }
  const file = path.join(
    os.tmpdir(),
    `purus_mcp_${Date.now()}_${Math.random().toString(36).slice(2)}.cjs`
  );
  try {
    fs.writeFileSync(file, js);
    const out = execFileSync(process.execPath, [file], {
      encoding: "utf8",
      timeout: timeoutMs,
      maxBuffer: MAX_OUTPUT,
      stdio: ["ignore", "pipe", "pipe"],
    });
    return ok(out.slice(0, MAX_OUTPUT));
  } catch (err) {
    const e = err as { stdout?: string; stderr?: string; message: string };
    return fail(`${e.stdout ?? ""}${e.stderr ?? ""}`.trim() || e.message);
  } finally {
    try {
      fs.unlinkSync(file);
    } catch {
      // ignore
    }
  }
}

export const STDLIB_MODULES = [
  "p-array",
  "p-datetime",
  "p-error",
  "p-json",
  "p-map",
  "p-math",
  "p-number",
  "p-object",
  "p-promise",
  "p-random",
  "p-regexp",
  "p-set",
  "p-string",
];
