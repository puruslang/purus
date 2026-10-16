import fs from "node:fs";
import path from "node:path";
import { compile } from "../lib/core.js";
import { configString, findPurusFiles } from "../lib/files.js";
import { loadConfig } from "../lib/config.js";

function checkFile(file: string): boolean {
  try {
    const source = fs.readFileSync(file, "utf8");
    compile(source, { header: false });
    return true;
  } catch (err) {
    console.log(`${file}: ${(err as Error).message}`);
    return false;
  }
}

function printUsage(): void {
  console.log("Error: no input file specified and no config.purus found");
  console.log("");
  console.log("Usage:");
  console.log("  purus check <file|dir>           Check a file or directory");
  console.log("  purus check --entry <file|dir>   Specify entry");
  console.log("  purus check                      Check using config.purus");
}

/** `purus check [file|dir]` */
export function run(args: string[]): void {
  let entry: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--entry" || args[i] === "-e") {
      entry = args[++i] ?? null;
    } else if (!args[i].startsWith("-")) {
      entry = args[i];
    }
  }

  if (entry && fs.existsSync(entry) && fs.statSync(entry).isFile()) {
    checkFile(entry);
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
    console.log(`Error: entry '${entryDir}' not found`);
    process.exit(1);
  }

  const stat = fs.statSync(entryDir);
  const files = stat.isFile()
    ? [entryDir]
    : findPurusFiles(entryDir, { skipConfig: true });

  if (files.length === 0) {
    console.log(`No .purus files found in ${entryDir}`);
    process.exit(0);
  }

  let errors = 0;
  for (const f of files) {
    if (!checkFile(f)) errors++;
  }

  if (errors > 0) {
    console.log(`\n${errors} file${errors === 1 ? "" : "s"} with errors.`);
    process.exit(1);
  } else {
    console.log(
      `${files.length} file${files.length === 1 ? "" : "s"} checked. No errors.`
    );
  }
}
