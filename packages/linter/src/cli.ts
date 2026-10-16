#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { lint } from "./index.js";
import type { Rules, Severity } from "./index.js";
import { loadConfig } from "./config.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log("purus-lint - Linter for the Purus language");
  console.log("");
  console.log("Usage:");
  console.log(
    "  purus-lint [file|dir...]             Lint specific files or directories"
  );
  console.log("  purus-lint                           Lint using config.purus");
  console.log("");
  console.log("Options:");
  console.log("  --config <file>  Path to config JSON file");
  console.log("  --fix            (not yet implemented)");
  console.log("  --help           Show this help");
  process.exit(0);
}

// Collect files and options
let configPath: string | null = null;
const inputPaths: string[] = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--config" && i + 1 < args.length) {
    configPath = args[++i];
  } else if (!args[i].startsWith("-")) {
    inputPaths.push(args[i]);
  }
}

// Load rule overrides
let ruleOverrides: Rules = {};

if (configPath) {
  try {
    ruleOverrides = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (err) {
    console.error(`Error reading config: ${(err as Error).message}`);
    process.exit(1);
  }
} else {
  // Try config.purus for lint settings
  const result = loadConfig();
  if (result && typeof result.config.lint === "object") {
    ruleOverrides = {};
    const lintConfig = result.config.lint;
    for (const [key, value] of Object.entries(lintConfig)) {
      if (typeof value === "string") {
        ruleOverrides[key] = { severity: value as Severity };
      } else if (typeof value === "number") {
        // For numeric values like indent-size, set as the relevant property
        if (key === "indent-size") {
          ruleOverrides[key] = { severity: "warn", size: value };
        } else if (key === "max-line-length") {
          ruleOverrides[key] = { severity: "warn", max: value };
        }
      } else if (typeof value === "object") {
        ruleOverrides[key] = value;
      }
    }
  }
}

// Determine files to lint
let filesToLint: string[] = [];

for (const p of inputPaths) {
  const resolved = path.resolve(p);
  if (!fs.existsSync(resolved)) {
    console.error(`Error: '${p}' not found`);
    process.exit(1);
  }
  const stat = fs.statSync(resolved);
  if (stat.isDirectory()) {
    filesToLint.push(...findPurusFiles(resolved));
  } else {
    filesToLint.push(resolved);
  }
}

if (filesToLint.length === 0) {
  // Try config.purus entry
  const result = loadConfig();
  if (result) {
    const entryDir = path.resolve(
      result.configDir,
      typeof result.config.entry === "string" && result.config.entry
        ? result.config.entry
        : "src"
    );
    if (fs.existsSync(entryDir)) {
      filesToLint = findPurusFiles(entryDir);
    }
  }
}

if (filesToLint.length === 0) {
  console.log("purus-lint - Linter for the Purus language");
  console.log("");
  console.log("Usage:");
  console.log(
    "  purus-lint [file|dir...]             Lint specific files or directories"
  );
  console.log("  purus-lint                           Lint using config.purus");
  process.exit(0);
}

let totalIssues = 0;

for (const file of filesToLint) {
  let source: string;
  try {
    source = fs.readFileSync(file, "utf8");
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    continue;
  }

  const diagnostics = lint(source, ruleOverrides);
  totalIssues += diagnostics.length;

  for (const d of diagnostics) {
    const icon = d.severity === "error" ? "error" : "warn";
    console.log(`${file}:${d.line}:${d.col} ${icon} ${d.message} (${d.rule})`);
  }
}

if (totalIssues > 0) {
  console.log(`\n${totalIssues} issue${totalIssues === 1 ? "" : "s"} found.`);
  process.exit(1);
} else if (filesToLint.length > 0) {
  console.log("No issues found.");
}

function findPurusFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
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
