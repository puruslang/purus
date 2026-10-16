#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { run as build } from "./commands/build.js";
import { run as check } from "./commands/check.js";
import { run as create } from "./commands/create.js";
import { run as generateConfig } from "./commands/generate-config.js";
import { run as init } from "./commands/init.js";
import { run as runFile } from "./commands/run.js";
import { version } from "./lib/core.js";
import { compilerPath } from "./lib/paths.js";

const HELP = [
  `Purus v${version} - A language that compiles to JavaScript`,
  "",
  "Usage:",
  "  purus build [file|dir]               Compile to JavaScript",
  "  purus build --entry <file|dir>       Specify entry file or directory",
  "  purus build --output <dir>           Specify output directory",
  "  purus build                          Compile using config.purus",
  "    .purus  -> .js",
  "    .cpurus -> .cjs (CommonJS)",
  "    .mpurus -> .mjs (ES Module)",
  "  purus build --no-header [file]       Compile without header comment",
  "  purus build --type <type>            Set module type (module|commonjs)",
  "  purus run [file|dir]                 Run without generating files",
  "  purus run --entry <file|dir>         Run entry file or directory",
  "  purus run                            Run using config.purus",
  "  purus check [file|dir]               Syntax check only",
  "  purus check --entry <file|dir>       Check entry file or directory",
  "  purus new [name] [-y]                Create a new project",
  "  purus init                           Initialize project in current directory",
  "  purus config                         Generate config.purus in current directory",
  "  purus version                        Show version",
  "  purus help                           Show this help",
  "",
  "Aliases: compile = build, create = new",
];

async function main(argv: string[]): Promise<void> {
  const [cmd, ...args] = argv;

  switch (cmd) {
    case "new":
    case "create":
      await create(args);
      break;
    case "init":
      init();
      break;
    case "config":
      await generateConfig();
      break;
    case "build":
    case "compile":
      build(args);
      break;
    case "run":
      runFile(args);
      break;
    case "check":
      check(args);
      break;
    case "version":
    case "--version":
    case "-v":
      console.log(`Purus v${version}`);
      break;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      console.log(HELP.join("\n"));
      break;
    default: {
      // Anything else goes straight to the MoonBit compiler CLI.
      const result = spawnSync(process.execPath, [compilerPath, cmd, ...args], {
        stdio: "inherit",
      });
      process.exit(result.status ?? 1);
    }
  }
}

main(process.argv.slice(2)).catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
