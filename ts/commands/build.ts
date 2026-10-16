import fs from "node:fs";
import path from "node:path";
import { compile } from "../lib/core.js";
import {
  configString,
  findPurusFiles,
  isPurusFile,
  outputExtension,
  resolveModuleType,
} from "../lib/files.js";
import { loadConfig, type LoadedConfig } from "../lib/config.js";

interface BuildArgs {
  entry: string | null;
  output: string | null;
  noHeader: boolean;
  toStdout: boolean;
  /** null = use config or default (true) */
  strict: boolean | null;
  /** null = resolve from config/package.json/default */
  moduleType: string | null;
}

function parseArgs(args: string[]): BuildArgs {
  const parsed: BuildArgs = {
    entry: null,
    output: null,
    noHeader: false,
    toStdout: false,
    strict: null,
    moduleType: null,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--no-header") {
      parsed.noHeader = true;
    } else if (arg === "--stdout") {
      parsed.toStdout = true;
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
    } else if (arg === "--output" || arg === "-o") {
      parsed.output = args[++i] ?? null;
    } else if (!arg.startsWith("-")) {
      parsed.entry = arg;
    }
  }

  return parsed;
}

function getOutputPath(
  inputFile: string,
  inputBase: string,
  outputBase: string
): string {
  const relative = path.relative(inputBase, inputFile);
  const base = relative.replace(/\.(c|m)?purus$/, "");
  return path.join(outputBase, base + outputExtension(inputFile));
}

function buildSingleFile(entry: string, args: BuildArgs): void {
  const source = fs.readFileSync(entry, "utf8");
  const configResult = loadConfig();
  const js = compile(source, {
    header: !args.noHeader,
    strict: args.strict !== null ? args.strict : true,
    type: resolveModuleType(entry, args.moduleType, configResult),
  });

  if (args.toStdout) {
    process.stdout.write(js);
    return;
  }

  const base = entry.replace(/\.(c|m)?purus$/, "");
  const ext = outputExtension(entry);
  const outputFile = args.output
    ? path.join(path.resolve(args.output), path.basename(base) + ext)
    : base + ext;
  if (args.output) {
    fs.mkdirSync(path.resolve(args.output), { recursive: true });
  }
  fs.writeFileSync(outputFile, js);
  console.log(`Compiled ${entry} -> ${outputFile}`);
}

function printUsage(): void {
  console.log("Error: no input file specified and no config.purus found");
  console.log("");
  console.log("Usage:");
  console.log("  purus build <file|dir>           Compile a file or directory");
  console.log("  purus build --entry <file|dir>   Specify entry");
  console.log("  purus build                     Compile using config.purus");
}

function buildProject(args: BuildArgs): void {
  let entryDir: string;
  let outputDir: string;
  let useHeader: boolean;
  let useStrict: boolean;
  let configResult: LoadedConfig | null = null;

  if (args.entry) {
    entryDir = path.resolve(args.entry);
    outputDir = args.output ? path.resolve(args.output) : path.resolve("dist");
    useHeader = !args.noHeader;
    useStrict = args.strict !== null ? args.strict : true;

    configResult = loadConfig();
    if (configResult) {
      if (!args.output) {
        outputDir = path.resolve(
          configResult.configDir,
          configString(configResult.config, "output", "dist")
        );
      }
      useHeader = configResult.config.header !== false && !args.noHeader;
      if (args.strict === null) {
        useStrict = configResult.config.strict !== false;
      }
    }
  } else {
    configResult = loadConfig();
    if (!configResult) {
      printUsage();
      process.exit(1);
    }

    const { config, configDir } = configResult;
    entryDir = path.resolve(configDir, configString(config, "entry", "src"));
    outputDir = args.output
      ? path.resolve(args.output)
      : path.resolve(configDir, configString(config, "output", "dist"));
    useHeader = config.header !== false && !args.noHeader;
    useStrict = args.strict !== null ? args.strict : config.strict !== false;
  }

  if (!fs.existsSync(entryDir)) {
    console.log(`Error: entry directory '${entryDir}' not found`);
    process.exit(1);
  }

  const stat = fs.statSync(entryDir);
  let files: string[];

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
    if (
      configResult &&
      path.resolve(f) === path.resolve(configResult.configPath)
    ) {
      continue;
    }
    const source = fs.readFileSync(f, "utf8");
    const js = compile(source, {
      header: useHeader,
      strict: useStrict,
      type: resolveModuleType(f, args.moduleType, configResult),
    });

    const outputPath = stat.isFile()
      ? outputDir
      : getOutputPath(f, entryDir, outputDir);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, js);
    console.log(
      `Compiled ${path.relative(process.cwd(), f)} -> ${path.relative(process.cwd(), outputPath)}`
    );
    count++;
  }
  console.log(`\n${count} file${count === 1 ? "" : "s"} compiled.`);
}

/** `purus build [file|dir]` */
export function run(rawArgs: string[]): void {
  const args = parseArgs(rawArgs);
  if (
    args.entry &&
    fs.existsSync(args.entry) &&
    fs.statSync(args.entry).isFile() &&
    isPurusFile(args.entry)
  ) {
    buildSingleFile(args.entry, args);
  } else {
    buildProject(args);
  }
}
