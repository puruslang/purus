import { execFileSync } from "node:child_process";
import fs from "node:fs";
import Module from "node:module";
import os from "node:os";
import path from "node:path";
import { compile } from "../lib/core.js";
import {
  configString,
  findPurusFiles,
  resolveModuleType,
} from "../lib/files.js";
import { loadConfig } from "../lib/config.js";

interface RunArgs {
  entry: string | null;
  /** null = use the default (true) */
  strict: boolean | null;
  moduleType: string | null;
}

function parseArgs(args: string[]): RunArgs {
  const parsed: RunArgs = { entry: null, strict: null, moduleType: null };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--no-header") {
      // run never emits a header; accepted for symmetry with build
    } else if (arg === "--strict") {
      if (
        i + 1 < args.length &&
        (args[i + 1] === "true" || args[i + 1] === "false")
      ) {
        parsed.strict = args[++i] === "true";
      } else {
        parsed.strict = true;
      }
    } else if (arg === "--type" || arg === "-t") {
      if (i + 1 < args.length) {
        parsed.moduleType = args[++i];
      }
    } else if (arg === "--entry" || arg === "-e") {
      parsed.entry = args[++i] ?? null;
    } else if (!arg.startsWith("-")) {
      parsed.entry = arg;
    }
  }

  return parsed;
}

function printUsage(): void {
  console.log("Error: no input file specified and no config.purus found");
  console.log("");
  console.log("Usage:");
  console.log("  purus run <file|dir>           Run a file or directory");
  console.log("  purus run --entry <file|dir>   Specify entry");
  console.log("  purus run                      Run using config.purus");
}

/** `purus run [file|dir]` */
export function run(rawArgs: string[]): void {
  const args = parseArgs(rawArgs);
  const { entry } = args;
  const useStrict = args.strict !== null ? args.strict : true;

  if (entry && fs.existsSync(entry) && fs.statSync(entry).isFile()) {
    // Single file - compile and run in this process
    const source = fs.readFileSync(entry, "utf8");
    const js = compile(source, {
      header: false,
      strict: useStrict,
      type: resolveModuleType(entry, args.moduleType, loadConfig()),
    });
    const m = new Module(entry) as Module & {
      _compile(code: string, filename: string): void;
    };
    m._compile(js, entry);
    return;
  }

  let entryDir: string;

  if (entry) {
    entryDir = path.resolve(entry);
  } else {
    const result = loadConfig();
    if (!result) {
      printUsage();
      process.exit(1);
    }

    const { config, configDir } = result;
    entryDir = path.resolve(configDir, configString(config, "entry", "src"));
  }

  if (!fs.existsSync(entryDir)) {
    console.log(`Error: entry directory '${entryDir}' not found`);
    process.exit(1);
  }

  const stat = fs.statSync(entryDir);
  const files = stat.isFile() ? [entryDir] : findPurusFiles(entryDir);

  if (files.length === 0) {
    console.log(`No .purus files found in ${entryDir}`);
    process.exit(0);
  }

  for (const f of files) {
    const source = fs.readFileSync(f, "utf8");
    const js = compile(source, {
      header: false,
      strict: useStrict,
      type: resolveModuleType(f, args.moduleType, loadConfig()),
    });

    const tmpFile = path.join(
      os.tmpdir(),
      `purus_run_${Date.now()}_${Math.random().toString(36).slice(2)}.js`
    );
    try {
      fs.writeFileSync(tmpFile, js, "utf8");
      execFileSync(process.execPath, [tmpFile], {
        stdio: "inherit",
        cwd: path.dirname(f),
      });
    } finally {
      try {
        fs.unlinkSync(tmpFile);
      } catch {
        // ignore cleanup errors
      }
    }
  }
}
