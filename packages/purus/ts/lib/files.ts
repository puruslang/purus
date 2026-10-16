import fs from "node:fs";
import path from "node:path";
import type { LoadedConfig } from "./config.js";
import type { ModuleType } from "./core.js";

const PURUS_FILE = /\.(c|m)?purus$/;

export function isPurusFile(file: string): boolean {
  return PURUS_FILE.test(file);
}

/** Recursively collect `.purus`, `.cpurus` and `.mpurus` files. */
export function findPurusFiles(
  dir: string,
  options: { skipConfig?: boolean } = {}
): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPurusFiles(fullPath, options));
    } else if (
      PURUS_FILE.test(entry.name) &&
      !(options.skipConfig && entry.name === "config.purus")
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

/** JavaScript output extension for a Purus source file. */
export function outputExtension(file: string): string {
  if (file.endsWith(".cpurus")) return ".cjs";
  if (file.endsWith(".mpurus")) return ".mjs";
  return ".js";
}

function toModuleType(value: unknown): ModuleType {
  return value === "commonjs" ? "commonjs" : "module";
}

/**
 * Resolve the module type for a file.
 * `.cpurus` is always CommonJS and `.mpurus` always ESM. For `.purus`:
 * CLI `--type` > config.purus `type` > package.json `type` > ESM.
 */
export function resolveModuleType(
  filePath: string | null,
  cliModuleType: string | null,
  configResult: LoadedConfig | null
): ModuleType {
  if (filePath && filePath.endsWith(".cpurus")) return "commonjs";
  if (filePath && filePath.endsWith(".mpurus")) return "module";

  if (cliModuleType) return toModuleType(cliModuleType);

  if (configResult && configResult.config.type) {
    return toModuleType(configResult.config.type);
  }

  try {
    const pkgDir = configResult ? configResult.configDir : process.cwd();
    const pkgPath = path.join(pkgDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as {
        type?: string;
      };
      if (pkg.type) return toModuleType(pkg.type);
    }
  } catch {
    // ignore
  }

  return "module";
}

/** Read a string setting from config.purus with a fallback. */
export function configString(
  config: LoadedConfig["config"],
  key: string,
  fallback: string
): string {
  const value = config[key];
  return typeof value === "string" && value ? value : fallback;
}
