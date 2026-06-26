"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { spawnSync } = require("child_process");
const { CONFIG_PURUS, PRETTIERRC, MAIN_PURUS, GITIGNORE } = require("./templates.js");

function question(rl, text) {
  return new Promise((resolve) => rl.question(text, (a) => resolve(a.trim())));
}

function isDirEmpty(dir) {
  return fs.readdirSync(dir).length === 0;
}

async function run() {
  const args = process.argv.slice(3);
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
        `Error: directory '${projectName}' already exists and is not empty`,
      );
      process.exit(1);
    }

    console.log(`\nCreating project in ./${projectName}...`);
    fs.mkdirSync(path.join(projectDir, "src"), { recursive: true });

    // config.purus
    fs.writeFileSync(path.join(projectDir, "config.purus"), CONFIG_PURUS);

    // .prettierrc
    fs.writeFileSync(path.join(projectDir, ".prettierrc"), PRETTIERRC);

    // src/main.purus
    fs.writeFileSync(path.join(projectDir, "src/main.purus"), MAIN_PURUS);

    // README.md
    const readme = `# ${projectName}

A [Purus](https://purus.work) project.

## Getting Started

\`\`\`sh
npm install
purus build
\`\`\`

## Scripts

| Script | Description |
|---|---|
| \`npm run build\` | Compile Purus to JavaScript |
| \`npm run exec\` | Run without compiling to files |
| \`npm run format\` | Format with Prettier |
| \`npm run lint\` | Lint with purus-lint |
`;
    fs.writeFileSync(path.join(projectDir, "README.md"), readme);

    // .gitignore
    fs.writeFileSync(path.join(projectDir, ".gitignore"), GITIGNORE);

    console.log("  config.purus");
    console.log("  .prettierrc");
    console.log("  .gitignore");
    console.log("  README.md");
    console.log("  src/main.purus");

    // npm init
    console.log("");
    if (yesFlag) {
      console.log("Running npm init -y...");
      spawnSync("npm", ["init", "-y"], {
        cwd: projectDir,
        stdio: "inherit",
        shell: true,
      });
    } else {
      console.log("Running npm init...");
      spawnSync("npm", ["init"], {
        cwd: projectDir,
        stdio: "inherit",
        shell: true,
      });
    }

    // Add scripts to package.json and set main/type
    const pkgPath = path.join(projectDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
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
    let installDeps;
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
      console.log("\nInstalling devDependencies...");
      for (const dep of devDeps) {
        console.log(`  ${dep}`);
      }
      console.log("");
      spawnSync("npm", ["install", "--save-dev", ...devDeps], {
        cwd: projectDir,
        stdio: "inherit",
        shell: true,
      });
    }

    console.log("\nDone! To get started:");
    console.log(`  cd ${projectName}`);
    if (!installDeps) {
      console.log("  npm install");
    }
    console.log("  purus build");
  } finally {
    rl.close();
  }
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
