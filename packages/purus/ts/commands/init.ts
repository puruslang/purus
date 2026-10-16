import fs from "node:fs";
import path from "node:path";
import {
  CONFIG_PURUS,
  GITIGNORE,
  MAIN_PURUS,
  PRETTIERRC,
} from "../lib/templates.js";
import * as pm from "../lib/pm.js";

type ScaffoldPackage = {
  main?: string;
  type?: string;
  scripts?: Record<string, string>;
  [key: string]: unknown;
};

function writeIfMissing(file: string, label: string, content: string): void {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    console.log(`  ${label}`);
  } else {
    console.log(`  ${label} (skipped: already exists)`);
  }
}

/** `purus init` */
export function run(): void {
  const cwd = process.cwd();

  writeIfMissing(path.join(cwd, "config.purus"), "config.purus", CONFIG_PURUS);
  writeIfMissing(path.join(cwd, ".prettierrc"), ".prettierrc", PRETTIERRC);
  writeIfMissing(path.join(cwd, ".gitignore"), ".gitignore", GITIGNORE);

  const srcDir = path.join(cwd, "src");
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  writeIfMissing(path.join(srcDir, "main.purus"), "src/main.purus", MAIN_PURUS);

  // package.json — add scripts if it exists, skip if not
  const pkgPath = path.join(cwd, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as ScaffoldPackage;
    let changed = false;
    if (!pkg.main) {
      pkg.main = "dist/main.js";
      changed = true;
    }
    if (!pkg.type) {
      pkg.type = "module";
      changed = true;
    }
    const scripts = (pkg.scripts = pkg.scripts || {});
    const wanted: Record<string, string> = {
      purus: "purus",
      build: "purus build",
      compile: "purus compile",
      exec: "purus run",
      format: "prettier --write ./src",
      lint: "purus-lint",
    };
    for (const [k, v] of Object.entries(wanted)) {
      if (!scripts[k]) {
        scripts[k] = v;
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
      console.log("  package.json (scripts updated)");
    } else {
      console.log("  package.json (skipped: scripts already set)");
    }
  } else {
    const manager = pm.detect(cwd);
    console.log(
      `\nNo package.json found. Run \`${manager} init\` then \`purus init\` again to add scripts.`
    );
  }

  console.log("\nInitialized Purus project in current directory.");
  console.log("Run `purus build` to compile.");
}
