"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { loadConfig } = require("./config.js");
const { compile } = require("./purus-core.js");

const args = process.argv.slice(3);

let entry = null;
let noHeader = false;
let strict = null;
let moduleType = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--no-header") {
    noHeader = true;
  } else if (args[i] === "--strict") {
    if (
      i + 1 < args.length &&
      (args[i + 1] === "true" || args[i + 1] === "false")
    ) {
      strict = args[++i] === "true";
    } else {
      strict = true;
    }
  } else if (args[i] === "--type" || args[i] === "-t") {
    if (i + 1 < args.length) {
      moduleType = args[++i];
    }
  } else if (args[i] === "--entry" || args[i] === "-e") {
    entry = args[++i];
  } else if (!args[i].startsWith("-")) {
    entry = args[i];
  }
}

function resolveModuleType(filePath, cliModuleType) {
  if (filePath && filePath.endsWith(".cpurus")) return "commonjs";
  if (filePath && filePath.endsWith(".mpurus")) return "module";
  if (cliModuleType) return cliModuleType;

  const configResult = loadConfig();
  if (configResult && configResult.config.type) return configResult.config.type;

  try {
    const pkgDir = configResult ? configResult.configDir : process.cwd();
    const pkgPath = path.join(pkgDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      if (pkg.type) return pkg.type;
    }
  } catch {
    // ignore
  }

  return "module";
}

if (entry && fs.existsSync(entry) && fs.statSync(entry).isFile()) {
  // Single file - compile and run
  const source = fs.readFileSync(entry, "utf8");
  const useStrict = strict !== null ? strict : true;
  const resolvedModule = resolveModuleType(entry, moduleType);
  const js = compile(source, {
    header: false,
    strict: useStrict,
    module: resolvedModule,
  });
  const m = new (require("module"))();
  m._compile(js, entry);
} else {
  let entryDir;
  let useHeader;

  if (entry) {
    entryDir = path.resolve(entry);
    useHeader = false;
  } else {
    const result = loadConfig();
    if (!result) {
      console.log("Error: no input file specified and no config.purus found");
      console.log("");
      console.log("Usage:");
      console.log("  purus run <file|dir>           Run a file or directory");
      console.log("  purus run --entry <file|dir>   Specify entry");
      console.log("  purus run                      Run using config.purus");
      process.exit(1);
    }

    const { config, configDir } = result;
    entryDir = path.resolve(configDir, config.entry || "src");
    useHeader = false;
  }

  if (!fs.existsSync(entryDir)) {
    console.log(`Error: entry directory '${entryDir}' not found`);
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

  for (const f of files) {
    const source = fs.readFileSync(f, "utf8");
    const useStrict2 = strict !== null ? strict : true;
    const resolvedModule = resolveModuleType(f, moduleType);
    const js = compile(source, {
      header: false,
      strict: useStrict2,
      module: resolvedModule,
    });

    const tmpFile = path.join(
      require("os").tmpdir(),
      `purus_run_${Date.now()}_${Math.random().toString(36).slice(2)}.js`,
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

function findPurusFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPurusFiles(fullPath));
    } else if (/\.(c|m)?purus$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}
