"use strict";

const fs = require("fs");
const path = require("path");
const { CONFIG_PURUS, PRETTIERRC, MAIN_PURUS, GITIGNORE } = require("./templates.js");

function run() {
  const cwd = process.cwd();

  // config.purus
  const configPath = path.join(cwd, "config.purus");
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, CONFIG_PURUS);
    console.log("  config.purus");
  } else {
    console.log("  config.purus (skipped: already exists)");
  }

  // .prettierrc
  const prettierrcPath = path.join(cwd, ".prettierrc");
  if (!fs.existsSync(prettierrcPath)) {
    fs.writeFileSync(prettierrcPath, PRETTIERRC);
    console.log("  .prettierrc");
  } else {
    console.log("  .prettierrc (skipped: already exists)");
  }

  // .gitignore
  const gitignorePath = path.join(cwd, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, GITIGNORE);
    console.log("  .gitignore");
  } else {
    console.log("  .gitignore (skipped: already exists)");
  }

  // src/main.purus
  const srcDir = path.join(cwd, "src");
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  const mainPurusPath = path.join(srcDir, "main.purus");
  if (!fs.existsSync(mainPurusPath)) {
    fs.writeFileSync(mainPurusPath, MAIN_PURUS);
    console.log("  src/main.purus");
  } else {
    console.log("  src/main.purus (skipped: already exists)");
  }

  // package.json — add scripts if it exists, skip if not
  const pkgPath = path.join(cwd, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    let changed = false;
    if (!pkg.main) { pkg.main = "dist/main.js"; changed = true; }
    if (!pkg.type) { pkg.type = "module"; changed = true; }
    pkg.scripts = pkg.scripts || {};
    const scripts = {
      purus: "purus",
      build: "purus build",
      compile: "purus compile",
      exec: "purus run",
      format: "prettier --write ./src",
      lint: "purus-lint",
    };
    for (const [k, v] of Object.entries(scripts)) {
      if (!pkg.scripts[k]) { pkg.scripts[k] = v; changed = true; }
    }
    if (changed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
      console.log("  package.json (scripts updated)");
    } else {
      console.log("  package.json (skipped: scripts already set)");
    }
  } else {
    console.log(
      "\nNo package.json found. Run `npm init` then `purus init` again to add scripts.",
    );
  }

  console.log("\nInitialized Purus project in current directory.");
  console.log("Run `purus build` to compile.");
}

run();
