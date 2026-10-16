import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import {
  CONFIG_PURUS,
  GITIGNORE,
  MAIN_PURUS,
  PRETTIERRC,
} from "../lib/templates.js";
import * as pm from "../lib/pm.js";

function question(rl: readline.Interface, text: string): Promise<string> {
  return new Promise((resolve) => rl.question(text, (a) => resolve(a.trim())));
}

function isDirEmpty(dir: string): boolean {
  return fs.readdirSync(dir).length === 0;
}

function readmeFor(projectName: string, manager: pm.PackageManager): string {
  return `# ${projectName}

A [Purus](https://purus.work) project.

## Getting Started

\`\`\`sh
${pm.installHint(manager)}
purus build
\`\`\`

## Scripts

| Script | Description |
|---|---|
| \`${manager} run build\` | Compile Purus to JavaScript |
| \`${manager} run exec\` | Run without compiling to files |
| \`${manager} run format\` | Format with Prettier |
| \`${manager} run lint\` | Lint with purus-lint |
`;
}

/** `purus new [name] [-y]` */
export async function run(args: string[]): Promise<void> {
  const yesFlag = args.includes("-y") || args.includes("--yes");
  const positionalArgs = args.filter((a) => !a.startsWith("-"));

  let projectName = positionalArgs[0] || "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    if (!projectName) {
      projectName = await question(rl, "Project name: ");
      if (!projectName) {
        console.log("Error: project name required");
        process.exit(1);
      }
    }

    const projectDir = path.resolve(projectName);

    if (fs.existsSync(projectDir) && !isDirEmpty(projectDir)) {
      console.log(
        `Error: directory '${projectName}' already exists and is not empty`
      );
      process.exit(1);
    }

    console.log(`\nCreating project in ./${projectName}...`);
    fs.mkdirSync(path.join(projectDir, "src"), { recursive: true });

    fs.writeFileSync(path.join(projectDir, "config.purus"), CONFIG_PURUS);
    fs.writeFileSync(path.join(projectDir, ".prettierrc"), PRETTIERRC);
    fs.writeFileSync(path.join(projectDir, "src/main.purus"), MAIN_PURUS);

    // Detect the package manager from how we were launched (npx /
    // pnpm dlx / yarn dlx / bunx), falling back to npm.
    const manager = pm.detect(projectDir);

    fs.writeFileSync(
      path.join(projectDir, "README.md"),
      readmeFor(projectName, manager)
    );
    fs.writeFileSync(path.join(projectDir, ".gitignore"), GITIGNORE);

    console.log("  config.purus");
    console.log("  .prettierrc");
    console.log("  .gitignore");
    console.log("  README.md");
    console.log("  src/main.purus");

    // Initialize package.json with the detected package manager
    console.log("");
    const initCmd = pm.initCommand(manager, yesFlag);
    if (initCmd) {
      console.log(`Running ${initCmd.cmd} ${initCmd.args.join(" ")}...`);
      spawnSync(initCmd.cmd, initCmd.args, {
        cwd: projectDir,
        stdio: "inherit",
        shell: true,
      });
    } else {
      // Managers whose init scaffolds extra files (e.g. bun) get a
      // minimal package.json instead.
      console.log("Creating package.json...");
      fs.writeFileSync(
        path.join(projectDir, "package.json"),
        JSON.stringify(
          { name: path.basename(projectDir), version: "1.0.0" },
          null,
          2
        ) + "\n"
      );
    }

    // Add scripts to package.json and set main/type
    const pkgPath = path.join(projectDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as Record<
        string,
        unknown
      > & { scripts?: Record<string, string> };
      pkg.main = "dist/main.js";
      pkg.type = "module";
      pkg.scripts = {
        ...(pkg.scripts || {}),
        purus: "purus",
        build: "purus build",
        compile: "purus compile",
        exec: "purus run",
        format: "prettier --write ./src",
        lint: "purus-lint",
      };
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
      console.log("\nAdded scripts to package.json");
    }

    // Ask about dependencies
    let installDeps: boolean;
    if (yesFlag) {
      installDeps = true;
    } else {
      const answer = await question(rl, "\nInstall dependencies? (Y/n) ");
      installDeps =
        answer === "" ||
        answer.toLowerCase() === "y" ||
        answer.toLowerCase() === "yes";
    }

    if (installDeps) {
      const devDeps = [
        "@puruslang/linter",
        "@puruslang/prettier-plugin-purus",
        "prettier",
        "purus",
      ];
      console.log(`\nInstalling devDependencies with ${manager}...`);
      for (const dep of devDeps) {
        console.log(`  ${dep}`);
      }
      console.log("");
      const addCmd = pm.addDevCommand(manager, devDeps);
      spawnSync(addCmd.cmd, addCmd.args, {
        cwd: projectDir,
        stdio: "inherit",
        shell: true,
      });
    }

    console.log("\nDone! To get started:");
    console.log(`  cd ${projectName}`);
    if (!installDeps) {
      console.log(`  ${pm.installHint(manager)}`);
    }
    console.log("  purus build");
  } finally {
    rl.close();
  }
}
