"use strict";

const fs = require("fs");
const path = require("path");
const { loadConfig } = require("./config.js");
const { compile } = require("./purus-core.js");

const args = process.argv.slice(3);

let entry = null;
let output = null;
let noHeader = false;
let toStdout = false;
let strict = null; // null = use config or default (true)
let moduleType = null; // null = resolve from config/package.json/default

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--no-header") {
    noHeader = true;
  } else if (args[i] === "--stdout") {
    toStdout = true;
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
  } else if (args[i] === "--output" || args[i] === "-o") {
    output = args[++i];
  } else if (!args[i].startsWith("-")) {
    entry = args[i];
  }
}

/**
 * Resolve module type for a file.
 * For .cpurus → always "commonjs", .mpurus → always "module".
 * For .purus → CLI --type > config.purus type > package.json type > "module" (default).
 */
function resolveModuleType(filePath, cliModuleType, configResult) {
  if (filePath && filePath.endsWith(".cpurus")) return "commonjs";
  if (filePath && filePath.endsWith(".mpurus")) return "module";

  // CLI option takes highest priority
  if (cliModuleType) return cliModuleType;

  // config.purus type
  if (configResult && configResult.config.type) return configResult.config.type;

  // package.json type
  try {
    const pkgPath = configResult
      ? path.join(configResult.configDir, "package.json")
      : path.resolve("package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      if (pkg.type) return pkg.type;
    }
  } catch {
    // ignore
  }

  // default: ESM
  return "module";
}

if (
  entry &&
  fs.existsSync(entry) &&
  fs.statSync(entry).isFile() &&
  /\.(c|m)?purus$/.test(entry)
) {
  // Single file - handle directly via compile API
  const source = fs.readFileSync(entry, "utf8");
  const useHeader = !noHeader;
  const useStrict = strict !== null ? strict : true;
  const configResult = loadConfig();
  const resolvedModule = resolveModuleType(entry, moduleType, configResult);
  const js = compile(source, {
    header: useHeader,
    strict: useStrict,
    module: resolvedModule,
  });

  if (toStdout) {
    process.stdout.write(js);
  } else {
    let ext = ".js";
    if (entry.endsWith(".cpurus")) ext = ".cjs";
    else if (entry.endsWith(".mpurus")) ext = ".mjs";
    const base = entry.replace(/\.(c|m)?purus$/, "");
    const outputFile = output
      ? path.join(path.resolve(output), path.basename(base) + ext)
      : base + ext;
    if (output) {
      fs.mkdirSync(path.resolve(output), { recursive: true });
    }
    fs.writeFileSync(outputFile, js);
    console.log(`Compiled ${entry} -> ${outputFile}`);
  }
} else {
  let entryDir;
  let outputDir;
  let useHeader;
  let useStrict;
  let configResult = null;

  if (entry) {
    entryDir = path.resolve(entry);
    outputDir = output ? path.resolve(output) : path.resolve("dist");
    useHeader = !noHeader;
    useStrict = strict !== null ? strict : true;

    configResult = loadConfig();
    if (configResult) {
      if (!output) {
        outputDir = path.resolve(
          configResult.configDir,
          configResult.config.output || "dist",
        );
      }
      useHeader = configResult.config.header !== false && !noHeader;
      if (strict === null) {
        useStrict = configResult.config.strict !== false;
      }
    }
  } else {
    configResult = loadConfig();
    if (!configResult) {
      console.log("Error: no input file specified and no config.purus found");
      console.log("");
      console.log("Usage:");
      console.log(
        "  purus build <file|dir>           Compile a file or directory",
      );
      console.log("  purus build --entry <file|dir>   Specify entry");
      console.log(
        "  purus build                     Compile using config.purus",
      );
      process.exit(1);
    }

    const { config, configDir } = configResult;
    entryDir = path.resolve(configDir, config.entry || "src");
    outputDir = output
      ? path.resolve(output)
      : path.resolve(configDir, config.output || "dist");
    useHeader = config.header !== false && !noHeader;
    useStrict = strict !== null ? strict : config.strict !== false;
  }

  if (!fs.existsSync(entryDir)) {
    console.log(`Error: entry directory '${entryDir}' not found`);
    process.exit(1);
  }

  const stat = fs.statSync(entryDir);
  let files;

  if (stat.isFile()) {
    files = [entryDir];
    // For single file entry, output is a file too
    if (!fs.existsSync(path.dirname(outputDir))) {
      fs.mkdirSync(path.dirname(outputDir), { recursive: true });
    }
  } else {
    files = findPurusFiles(entryDir);
  }

  if (files.length === 0) {
    console.log(`No .purus files found in ${entryDir}`);
    process.exit(0);
  }

  let count = 0;
  for (const f of files) {
    // Skip config.purus itself - it's the build config, not a source file
    if (configResult && path.resolve(f) === path.resolve(configResult.configPath)) {
      continue;
    }
    const source = fs.readFileSync(f, "utf8");
    const resolvedModule = resolveModuleType(f, moduleType, configResult);
    const js = compile(source, {
      header: useHeader,
      strict: useStrict,
      module: resolvedModule,
    });
    let outputPath;

    if (stat.isFile()) {
      outputPath = outputDir;
    } else {
      outputPath = getOutputPath(f, entryDir, outputDir);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, js);
    console.log(
      `Compiled ${path.relative(process.cwd(), f)} -> ${path.relative(process.cwd(), outputPath)}`,
    );
    count++;
  }
  console.log(`\n${count} file${count === 1 ? "" : "s"} compiled.`);
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

function getOutputPath(inputFile, inputBase, outputBase) {
  const relative = path.relative(inputBase, inputFile);
  let ext = ".js";
  if (inputFile.endsWith(".cpurus")) ext = ".cjs";
  else if (inputFile.endsWith(".mpurus")) ext = ".mjs";
  const base = relative.replace(/\.(c|m)?purus$/, "");
  return path.join(outputBase, base + ext);
}
