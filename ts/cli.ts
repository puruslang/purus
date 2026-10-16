#!/usr/bin/env node
"use strict";

const VERSION = require("../package.json").version;
const cmd = process.argv[2];

function printHelp() {
  console.log(`Purus v${VERSION} - A language that compiles to JavaScript`);
  console.log("");
  console.log("Usage:");
  console.log("  purus build [file|dir]               Compile to JavaScript");
  console.log(
    "  purus build --entry <file|dir>       Specify entry file or directory",
  );
  console.log(
    "  purus build --output <dir>           Specify output directory",
  );
  console.log(
    "  purus build                          Compile using config.purus",
  );
  console.log("    .purus  -> .js");
  console.log("    .cpurus -> .cjs (CommonJS)");
  console.log("    .mpurus -> .mjs (ES Module)");
  console.log(
    "  purus build --no-header [file]       Compile without header comment",
  );
  console.log(
    "  purus build --type <type>            Set module type (module|commonjs)",
  );
  console.log(
    "  purus run [file|dir]                 Run without generating files",
  );
  console.log(
    "  purus run --entry <file|dir>         Run entry file or directory",
  );
  console.log("  purus run                            Run using config.purus");
  console.log("  purus check [file|dir]               Syntax check only");
  console.log(
    "  purus check --entry <file|dir>       Check entry file or directory",
  );
  console.log("  purus new [name] [-y]                Create a new project");
  console.log(
    "  purus init                           Initialize project in current directory",
  );
  console.log(
    "  purus config                         Generate config.purus in current directory",
  );
  console.log("  purus version                        Show version");
  console.log("  purus help                           Show this help");
  console.log("");
  console.log("Aliases: compile = build, create = new");
}

switch (cmd) {
  case "new":
  case "create":
    require("../pkg/lib/create.js");
    break;
  case "init":
    require("../pkg/lib/init.js");
    break;
  case "config":
    require("../pkg/lib/generate-config.js");
    break;
  case "build":
  case "compile":
    require("../pkg/lib/build-wrapper.js");
    break;
  case "run":
    require("../pkg/lib/run-wrapper.js");
    break;
  case "check":
    require("../pkg/lib/check-wrapper.js");
    break;
  case "version":
  case "--version":
  case "-v":
    console.log(`Purus v${VERSION}`);
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    printHelp();
    break;
  default:
    require("../pkg/lib/purus-compiler.js");
    break;
}
