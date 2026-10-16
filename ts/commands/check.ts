"use strict";

const fs = require("fs");
const path = require("path");
const { loadConfig } = require("./config.js");
const { compile } = require("./purus-core.js");

const args = process.argv.slice(3);

let entry = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--entry" || args[i] === "-e") {
    entry = args[++i];
  } else if (!args[i].startsWith("-")) {
    entry = args[i];
  }
}

if (entry && fs.existsSync(entry) && fs.statSync(entry).isFile()) {
  checkFile(entry);
} else {
  let entryDir;

  if (entry) {
    entryDir = path.resolve(entry);
  } else {
    const result = loadConfig();
    if (!result) {
      console.log("Error: no input file specified and no config.purus found");
      console.log("");
      console.log("Usage:");
      console.log(
        "  purus check <file|dir>           Check a file or directory",
      );
      console.log("  purus check --entry <file|dir>   Specify entry");
      console.log(
        "  purus check                      Check using config.purus",
      );
      process.exit(1);
    }

    const { config, configDir } = result;
    entryDir = path.resolve(configDir, config.entry || "src");
  }

  if (!fs.existsSync(entryDir)) {
    console.log(`Error: entry '${entryDir}' not found`);
    process.exit(1);
  }

  const stat = fs.statSync(entryDir);
  let files;

  if (stat.isFile()) {
    files = [entryDir];
  } else {
    files = findPurusFiles(entryDir);
  }

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
      `${files.length} file${files.length === 1 ? "" : "s"} checked. No errors.`,
    );
  }
}

function checkFile(file) {
  try {
    const source = fs.readFileSync(file, "utf8");
    compile(source, { header: false });
    return true;
  } catch (err) {
    console.log(`${file}: ${err.message}`);
    return false;
  }
}

function findPurusFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPurusFiles(fullPath));
    } else if (
      /\.(c|m)?purus$/.test(entry.name) &&
      entry.name !== "config.purus"
    ) {
      results.push(fullPath);
    }
  }
  return results;
}
