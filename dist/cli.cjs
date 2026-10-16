#!/usr/bin/env node
const require_core = require("./core-BBu7Zt9R.cjs");
let node_child_process = require("node:child_process");
let node_fs = require("node:fs");
node_fs = require_core.__toESM(node_fs, 1);
let node_os = require("node:os");
node_os = require_core.__toESM(node_os, 1);
let node_path = require("node:path");
node_path = require_core.__toESM(node_path, 1);
let node_module = require("node:module");
node_module = require_core.__toESM(node_module, 1);
let node_readline = require("node:readline");
node_readline = require_core.__toESM(node_readline, 1);
//#region ts/lib/files.ts
const PURUS_FILE = /\.(c|m)?purus$/;
function isPurusFile(file) {
	return PURUS_FILE.test(file);
}
/** Recursively collect `.purus`, `.cpurus` and `.mpurus` files. */
function findPurusFiles(dir, options = {}) {
	const results = [];
	for (const entry of node_fs.default.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = node_path.default.join(dir, entry.name);
		if (entry.isDirectory()) results.push(...findPurusFiles(fullPath, options));
		else if (PURUS_FILE.test(entry.name) && !(options.skipConfig && entry.name === "config.purus")) results.push(fullPath);
	}
	return results;
}
/** JavaScript output extension for a Purus source file. */
function outputExtension(file) {
	if (file.endsWith(".cpurus")) return ".cjs";
	if (file.endsWith(".mpurus")) return ".mjs";
	return ".js";
}
function toModuleType(value) {
	return value === "commonjs" ? "commonjs" : "module";
}
/**
* Resolve the module type for a file.
* `.cpurus` is always CommonJS and `.mpurus` always ESM. For `.purus`:
* CLI `--type` > config.purus `type` > package.json `type` > ESM.
*/
function resolveModuleType(filePath, cliModuleType, configResult) {
	if (filePath && filePath.endsWith(".cpurus")) return "commonjs";
	if (filePath && filePath.endsWith(".mpurus")) return "module";
	if (cliModuleType) return toModuleType(cliModuleType);
	if (configResult && configResult.config.type) return toModuleType(configResult.config.type);
	try {
		const pkgDir = configResult ? configResult.configDir : process.cwd();
		const pkgPath = node_path.default.join(pkgDir, "package.json");
		if (node_fs.default.existsSync(pkgPath)) {
			const pkg = JSON.parse(node_fs.default.readFileSync(pkgPath, "utf8"));
			if (pkg.type) return toModuleType(pkg.type);
		}
	} catch {}
	return "module";
}
/** Read a string setting from config.purus with a fallback. */
function configString(config, key, fallback) {
	const value = config[key];
	return typeof value === "string" && value ? value : fallback;
}
//#endregion
//#region ts/lib/config.ts
function parseConfig(configPath) {
	const content = node_fs.default.readFileSync(configPath, "utf8");
	const config = {};
	for (const line of content.split("\n")) {
		const trimmed = line.trim();
		if (trimmed === "" || trimmed.startsWith("--")) continue;
		const match = trimmed.match(/^const\s+([\w.-]+)\s+be\s+(.+)$/);
		if (!match) continue;
		const key = match[1];
		let value = match[2].trim();
		if (value.startsWith("///") && value.endsWith("///")) value = value.slice(3, -3);
		else if (value === "true") value = true;
		else if (value === "false") value = false;
		else if (/^\d+$/.test(value)) value = parseInt(value, 10);
		else if (/^\d+\.\d+$/.test(value)) value = parseFloat(value);
		const keys = key.split(".");
		let target = config;
		for (let i = 0; i < keys.length - 1; i++) {
			if (!target[keys[i]] || typeof target[keys[i]] !== "object") target[keys[i]] = {};
			target = target[keys[i]];
		}
		target[keys[keys.length - 1]] = value;
	}
	return config;
}
function findConfig(startDir) {
	let dir = startDir || process.cwd();
	for (;;) {
		const configPath = node_path.default.join(dir, "config.purus");
		if (node_fs.default.existsSync(configPath)) return configPath;
		const parent = node_path.default.dirname(dir);
		if (parent === dir) return null;
		dir = parent;
	}
}
function loadConfig(startDir) {
	const configPath = findConfig(startDir);
	if (!configPath) return null;
	return {
		config: parseConfig(configPath),
		configPath,
		configDir: node_path.default.dirname(configPath)
	};
}
//#endregion
//#region ts/commands/build.ts
function parseArgs$1(args) {
	const parsed = {
		entry: null,
		output: null,
		noHeader: false,
		toStdout: false,
		strict: null,
		moduleType: null
	};
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === "--no-header") parsed.noHeader = true;
		else if (arg === "--stdout") parsed.toStdout = true;
		else if (arg === "--strict") {
			if (i + 1 < args.length && (args[i + 1] === "true" || args[i + 1] === "false")) parsed.strict = args[++i] === "true";
			else parsed.strict = true;
		} else if (arg === "--type" || arg === "-t") {
			if (i + 1 < args.length) parsed.moduleType = args[++i];
		} else if (arg === "--entry" || arg === "-e") parsed.entry = args[++i] ?? null;
		else if (arg === "--output" || arg === "-o") parsed.output = args[++i] ?? null;
		else if (!arg.startsWith("-")) parsed.entry = arg;
	}
	return parsed;
}
function getOutputPath(inputFile, inputBase, outputBase) {
	const base = node_path.default.relative(inputBase, inputFile).replace(/\.(c|m)?purus$/, "");
	return node_path.default.join(outputBase, base + outputExtension(inputFile));
}
function buildSingleFile(entry, args) {
	const source = node_fs.default.readFileSync(entry, "utf8");
	const configResult = loadConfig();
	const js = require_core.compile(source, {
		header: !args.noHeader,
		strict: args.strict !== null ? args.strict : true,
		type: resolveModuleType(entry, args.moduleType, configResult)
	});
	if (args.toStdout) {
		process.stdout.write(js);
		return;
	}
	const base = entry.replace(/\.(c|m)?purus$/, "");
	const ext = outputExtension(entry);
	const outputFile = args.output ? node_path.default.join(node_path.default.resolve(args.output), node_path.default.basename(base) + ext) : base + ext;
	if (args.output) node_fs.default.mkdirSync(node_path.default.resolve(args.output), { recursive: true });
	node_fs.default.writeFileSync(outputFile, js);
	console.log(`Compiled ${entry} -> ${outputFile}`);
}
function printUsage$2() {
	console.log("Error: no input file specified and no config.purus found");
	console.log("");
	console.log("Usage:");
	console.log("  purus build <file|dir>           Compile a file or directory");
	console.log("  purus build --entry <file|dir>   Specify entry");
	console.log("  purus build                     Compile using config.purus");
}
function buildProject(args) {
	let entryDir;
	let outputDir;
	let useHeader;
	let useStrict;
	let configResult = null;
	if (args.entry) {
		entryDir = node_path.default.resolve(args.entry);
		outputDir = args.output ? node_path.default.resolve(args.output) : node_path.default.resolve("dist");
		useHeader = !args.noHeader;
		useStrict = args.strict !== null ? args.strict : true;
		configResult = loadConfig();
		if (configResult) {
			if (!args.output) outputDir = node_path.default.resolve(configResult.configDir, configString(configResult.config, "output", "dist"));
			useHeader = configResult.config.header !== false && !args.noHeader;
			if (args.strict === null) useStrict = configResult.config.strict !== false;
		}
	} else {
		configResult = loadConfig();
		if (!configResult) {
			printUsage$2();
			process.exit(1);
		}
		const { config, configDir } = configResult;
		entryDir = node_path.default.resolve(configDir, configString(config, "entry", "src"));
		outputDir = args.output ? node_path.default.resolve(args.output) : node_path.default.resolve(configDir, configString(config, "output", "dist"));
		useHeader = config.header !== false && !args.noHeader;
		useStrict = args.strict !== null ? args.strict : config.strict !== false;
	}
	if (!node_fs.default.existsSync(entryDir)) {
		console.log(`Error: entry directory '${entryDir}' not found`);
		process.exit(1);
	}
	const stat = node_fs.default.statSync(entryDir);
	let files;
	if (stat.isFile()) {
		files = [entryDir];
		if (!node_fs.default.existsSync(node_path.default.dirname(outputDir))) node_fs.default.mkdirSync(node_path.default.dirname(outputDir), { recursive: true });
	} else files = findPurusFiles(entryDir);
	if (files.length === 0) {
		console.log(`No .purus files found in ${entryDir}`);
		process.exit(0);
	}
	let count = 0;
	for (const f of files) {
		if (configResult && node_path.default.resolve(f) === node_path.default.resolve(configResult.configPath)) continue;
		const source = node_fs.default.readFileSync(f, "utf8");
		const js = require_core.compile(source, {
			header: useHeader,
			strict: useStrict,
			type: resolveModuleType(f, args.moduleType, configResult)
		});
		const outputPath = stat.isFile() ? outputDir : getOutputPath(f, entryDir, outputDir);
		node_fs.default.mkdirSync(node_path.default.dirname(outputPath), { recursive: true });
		node_fs.default.writeFileSync(outputPath, js);
		console.log(`Compiled ${node_path.default.relative(process.cwd(), f)} -> ${node_path.default.relative(process.cwd(), outputPath)}`);
		count++;
	}
	console.log(`\n${count} file${count === 1 ? "" : "s"} compiled.`);
}
/** `purus build [file|dir]` */
function run$5(rawArgs) {
	const args = parseArgs$1(rawArgs);
	if (args.entry && node_fs.default.existsSync(args.entry) && node_fs.default.statSync(args.entry).isFile() && isPurusFile(args.entry)) buildSingleFile(args.entry, args);
	else buildProject(args);
}
//#endregion
//#region ts/commands/check.ts
function checkFile(file) {
	try {
		const source = node_fs.default.readFileSync(file, "utf8");
		require_core.compile(source, { header: false });
		return true;
	} catch (err) {
		console.log(`${file}: ${err.message}`);
		return false;
	}
}
function printUsage$1() {
	console.log("Error: no input file specified and no config.purus found");
	console.log("");
	console.log("Usage:");
	console.log("  purus check <file|dir>           Check a file or directory");
	console.log("  purus check --entry <file|dir>   Specify entry");
	console.log("  purus check                      Check using config.purus");
}
/** `purus check [file|dir]` */
function run$4(args) {
	let entry = null;
	for (let i = 0; i < args.length; i++) if (args[i] === "--entry" || args[i] === "-e") entry = args[++i] ?? null;
	else if (!args[i].startsWith("-")) entry = args[i];
	if (entry && node_fs.default.existsSync(entry) && node_fs.default.statSync(entry).isFile()) {
		checkFile(entry);
		return;
	}
	let entryDir;
	if (entry) entryDir = node_path.default.resolve(entry);
	else {
		const result = loadConfig();
		if (!result) {
			printUsage$1();
			process.exit(1);
		}
		const { config, configDir } = result;
		entryDir = node_path.default.resolve(configDir, configString(config, "entry", "src"));
	}
	if (!node_fs.default.existsSync(entryDir)) {
		console.log(`Error: entry '${entryDir}' not found`);
		process.exit(1);
	}
	const files = node_fs.default.statSync(entryDir).isFile() ? [entryDir] : findPurusFiles(entryDir, { skipConfig: true });
	if (files.length === 0) {
		console.log(`No .purus files found in ${entryDir}`);
		process.exit(0);
	}
	let errors = 0;
	for (const f of files) if (!checkFile(f)) errors++;
	if (errors > 0) {
		console.log(`\n${errors} file${errors === 1 ? "" : "s"} with errors.`);
		process.exit(1);
	} else console.log(`${files.length} file${files.length === 1 ? "" : "s"} checked. No errors.`);
}
//#endregion
//#region ts/lib/templates.ts
const CONFIG_PURUS = `-- Purus Configuration
const entry be ///src///
const output be ///dist///
const type be ///module///
const header be true

-- Linter settings
const lint.no-var be ///warn///
const lint.no-nil be ///warn///
const lint.bare-assignment be ///error///
const lint.no-function be ///warn///
const lint.no-protected be ///warn///
const lint.no-else-if be ///warn///
const lint.no-js-chars be ///error///
const lint.no-js-operators be ///error///
const lint.no-for-range be ///warn///
const lint.bracket-match be ///error///
const lint.const-reassign be ///error///
const lint.duplicate-use be ///warn///
const lint.indent-size be 2
const lint.max-line-length be ///off///
const lint.no-trailing-whitespace be ///warn///
const lint.no-unused-import be ///warn///
const lint.consistent-naming be ///warn///
`;
const PRETTIERRC = JSON.stringify({
	tabWidth: 2,
	semi: false,
	plugins: ["@puruslang/prettier-plugin-purus"]
}, null, 2) + "\n";
const MAIN_PURUS = `-- main.purus

const message be ///Hello, World///
console.log[message]
`;
const GITIGNORE = `dist/
node_modules/
`;
//#endregion
//#region ts/lib/pm.ts
/**
* Package manager detection and command mapping.
*
* Nothing is hardcoded to npm: the manager is detected from how the CLI
* was launched (npm_config_user_agent — set by `npx`, `pnpm dlx`,
* `yarn dlx`, `bunx`, and by `<pm> run` scripts), then from a lockfile
* in the target directory, and only falls back to npm as a default.
*/
const KNOWN = /* @__PURE__ */ new Set([
	"npm",
	"pnpm",
	"yarn",
	"bun"
]);
const LOCKFILES = [
	["package-lock.json", "npm"],
	["pnpm-lock.yaml", "pnpm"],
	["yarn.lock", "yarn"],
	["bun.lock", "bun"],
	["bun.lockb", "bun"]
];
function fromUserAgent() {
	const name = (process.env.npm_config_user_agent || "").split(" ")[0].split("/")[0];
	return KNOWN.has(name) ? name : null;
}
function fromLockfile(dir) {
	for (const [file, name] of LOCKFILES) if (node_fs.default.existsSync(node_path.default.join(dir, file))) return name;
	return null;
}
/** Detect the package manager to use. */
function detect(dir = process.cwd()) {
	return fromUserAgent() || fromLockfile(dir) || "npm";
}
/**
* Command to initialize a package.json, or null when the manager's
* init scaffolds extra files (the caller should write a minimal
* package.json itself instead).
*/
function initCommand(pm, yes) {
	switch (pm) {
		case "pnpm": return {
			cmd: "pnpm",
			args: ["init"]
		};
		case "yarn": return {
			cmd: "yarn",
			args: yes ? ["init", "-y"] : ["init"]
		};
		case "bun": return null;
		default: return {
			cmd: "npm",
			args: yes ? ["init", "-y"] : ["init"]
		};
	}
}
/** Command to install packages as devDependencies. */
function addDevCommand(pm, deps) {
	switch (pm) {
		case "pnpm": return {
			cmd: "pnpm",
			args: [
				"add",
				"-D",
				...deps
			]
		};
		case "yarn": return {
			cmd: "yarn",
			args: [
				"add",
				"--dev",
				...deps
			]
		};
		case "bun": return {
			cmd: "bun",
			args: [
				"add",
				"--dev",
				...deps
			]
		};
		default: return {
			cmd: "npm",
			args: [
				"install",
				"--save-dev",
				...deps
			]
		};
	}
}
/** The plain "install dependencies" command shown in docs and hints. */
function installHint(pm) {
	return pm === "yarn" ? "yarn" : `${pm} install`;
}
//#endregion
//#region ts/commands/create.ts
function question$1(rl, text) {
	return new Promise((resolve) => rl.question(text, (a) => resolve(a.trim())));
}
function isDirEmpty(dir) {
	return node_fs.default.readdirSync(dir).length === 0;
}
function readmeFor(projectName, manager) {
	return `# ${projectName}

A [Purus](https://purus.work) project.

## Getting Started

\`\`\`sh
${installHint(manager)}
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
async function run$3(args) {
	const yesFlag = args.includes("-y") || args.includes("--yes");
	let projectName = args.filter((a) => !a.startsWith("-"))[0] || "";
	const rl = node_readline.default.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	try {
		if (!projectName) {
			projectName = await question$1(rl, "Project name: ");
			if (!projectName) {
				console.log("Error: project name required");
				process.exit(1);
			}
		}
		const projectDir = node_path.default.resolve(projectName);
		if (node_fs.default.existsSync(projectDir) && !isDirEmpty(projectDir)) {
			console.log(`Error: directory '${projectName}' already exists and is not empty`);
			process.exit(1);
		}
		console.log(`\nCreating project in ./${projectName}...`);
		node_fs.default.mkdirSync(node_path.default.join(projectDir, "src"), { recursive: true });
		node_fs.default.writeFileSync(node_path.default.join(projectDir, "config.purus"), CONFIG_PURUS);
		node_fs.default.writeFileSync(node_path.default.join(projectDir, ".prettierrc"), PRETTIERRC);
		node_fs.default.writeFileSync(node_path.default.join(projectDir, "src/main.purus"), MAIN_PURUS);
		const manager = detect(projectDir);
		node_fs.default.writeFileSync(node_path.default.join(projectDir, "README.md"), readmeFor(projectName, manager));
		node_fs.default.writeFileSync(node_path.default.join(projectDir, ".gitignore"), GITIGNORE);
		console.log("  config.purus");
		console.log("  .prettierrc");
		console.log("  .gitignore");
		console.log("  README.md");
		console.log("  src/main.purus");
		console.log("");
		const initCmd = initCommand(manager, yesFlag);
		if (initCmd) {
			console.log(`Running ${initCmd.cmd} ${initCmd.args.join(" ")}...`);
			(0, node_child_process.spawnSync)(initCmd.cmd, initCmd.args, {
				cwd: projectDir,
				stdio: "inherit",
				shell: true
			});
		} else {
			console.log("Creating package.json...");
			node_fs.default.writeFileSync(node_path.default.join(projectDir, "package.json"), JSON.stringify({
				name: node_path.default.basename(projectDir),
				version: "1.0.0"
			}, null, 2) + "\n");
		}
		const pkgPath = node_path.default.join(projectDir, "package.json");
		if (node_fs.default.existsSync(pkgPath)) {
			const pkg = JSON.parse(node_fs.default.readFileSync(pkgPath, "utf8"));
			pkg.main = "dist/main.js";
			pkg.type = "module";
			pkg.scripts = {
				...pkg.scripts || {},
				purus: "purus",
				build: "purus build",
				compile: "purus compile",
				exec: "purus run",
				format: "prettier --write ./src",
				lint: "purus-lint"
			};
			node_fs.default.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
			console.log("\nAdded scripts to package.json");
		}
		let installDeps;
		if (yesFlag) installDeps = true;
		else {
			const answer = await question$1(rl, "\nInstall dependencies? (Y/n) ");
			installDeps = answer === "" || answer.toLowerCase() === "y" || answer.toLowerCase() === "yes";
		}
		if (installDeps) {
			const devDeps = [
				"@puruslang/linter",
				"@puruslang/prettier-plugin-purus",
				"prettier",
				"purus"
			];
			console.log(`\nInstalling devDependencies with ${manager}...`);
			for (const dep of devDeps) console.log(`  ${dep}`);
			console.log("");
			const addCmd = addDevCommand(manager, devDeps);
			(0, node_child_process.spawnSync)(addCmd.cmd, addCmd.args, {
				cwd: projectDir,
				stdio: "inherit",
				shell: true
			});
		}
		console.log("\nDone! To get started:");
		console.log(`  cd ${projectName}`);
		if (!installDeps) console.log(`  ${installHint(manager)}`);
		console.log("  purus build");
	} finally {
		rl.close();
	}
}
//#endregion
//#region ts/commands/generate-config.ts
function question(rl, text) {
	return new Promise((resolve) => rl.question(text, (a) => resolve(a.trim())));
}
/** `purus config` */
async function run$2() {
	const configPath = node_path.default.join(process.cwd(), "config.purus");
	if (node_fs.default.existsSync(configPath)) {
		const rl = node_readline.default.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		const answer = await question(rl, "config.purus already exists. Overwrite? [y/N] ");
		rl.close();
		if (answer.toLowerCase() !== "y") {
			console.log("Aborted.");
			return;
		}
	}
	node_fs.default.writeFileSync(configPath, CONFIG_PURUS);
	console.log("Generated config.purus");
}
//#endregion
//#region ts/commands/init.ts
function writeIfMissing(file, label, content) {
	if (!node_fs.default.existsSync(file)) {
		node_fs.default.writeFileSync(file, content);
		console.log(`  ${label}`);
	} else console.log(`  ${label} (skipped: already exists)`);
}
/** `purus init` */
function run$1() {
	const cwd = process.cwd();
	writeIfMissing(node_path.default.join(cwd, "config.purus"), "config.purus", CONFIG_PURUS);
	writeIfMissing(node_path.default.join(cwd, ".prettierrc"), ".prettierrc", PRETTIERRC);
	writeIfMissing(node_path.default.join(cwd, ".gitignore"), ".gitignore", GITIGNORE);
	const srcDir = node_path.default.join(cwd, "src");
	if (!node_fs.default.existsSync(srcDir)) node_fs.default.mkdirSync(srcDir, { recursive: true });
	writeIfMissing(node_path.default.join(srcDir, "main.purus"), "src/main.purus", MAIN_PURUS);
	const pkgPath = node_path.default.join(cwd, "package.json");
	if (node_fs.default.existsSync(pkgPath)) {
		const pkg = JSON.parse(node_fs.default.readFileSync(pkgPath, "utf8"));
		let changed = false;
		if (!pkg.main) {
			pkg.main = "dist/main.js";
			changed = true;
		}
		if (!pkg.type) {
			pkg.type = "module";
			changed = true;
		}
		const scripts = pkg.scripts = pkg.scripts || {};
		for (const [k, v] of Object.entries({
			purus: "purus",
			build: "purus build",
			compile: "purus compile",
			exec: "purus run",
			format: "prettier --write ./src",
			lint: "purus-lint"
		})) if (!scripts[k]) {
			scripts[k] = v;
			changed = true;
		}
		if (changed) {
			node_fs.default.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
			console.log("  package.json (scripts updated)");
		} else console.log("  package.json (skipped: scripts already set)");
	} else {
		const manager = detect(cwd);
		console.log(`\nNo package.json found. Run \`${manager} init\` then \`purus init\` again to add scripts.`);
	}
	console.log("\nInitialized Purus project in current directory.");
	console.log("Run `purus build` to compile.");
}
//#endregion
//#region ts/commands/run.ts
function parseArgs(args) {
	const parsed = {
		entry: null,
		strict: null,
		moduleType: null
	};
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === "--no-header") {} else if (arg === "--strict") {
			if (i + 1 < args.length && (args[i + 1] === "true" || args[i + 1] === "false")) parsed.strict = args[++i] === "true";
			else parsed.strict = true;
		} else if (arg === "--type" || arg === "-t") {
			if (i + 1 < args.length) parsed.moduleType = args[++i];
		} else if (arg === "--entry" || arg === "-e") parsed.entry = args[++i] ?? null;
		else if (!arg.startsWith("-")) parsed.entry = arg;
	}
	return parsed;
}
function printUsage() {
	console.log("Error: no input file specified and no config.purus found");
	console.log("");
	console.log("Usage:");
	console.log("  purus run <file|dir>           Run a file or directory");
	console.log("  purus run --entry <file|dir>   Specify entry");
	console.log("  purus run                      Run using config.purus");
}
/** `purus run [file|dir]` */
function run(rawArgs) {
	const args = parseArgs(rawArgs);
	const { entry } = args;
	const useStrict = args.strict !== null ? args.strict : true;
	if (entry && node_fs.default.existsSync(entry) && node_fs.default.statSync(entry).isFile()) {
		const source = node_fs.default.readFileSync(entry, "utf8");
		const js = require_core.compile(source, {
			header: false,
			strict: useStrict,
			type: resolveModuleType(entry, args.moduleType, loadConfig())
		});
		new node_module.default(entry)._compile(js, entry);
		return;
	}
	let entryDir;
	if (entry) entryDir = node_path.default.resolve(entry);
	else {
		const result = loadConfig();
		if (!result) {
			printUsage();
			process.exit(1);
		}
		const { config, configDir } = result;
		entryDir = node_path.default.resolve(configDir, configString(config, "entry", "src"));
	}
	if (!node_fs.default.existsSync(entryDir)) {
		console.log(`Error: entry directory '${entryDir}' not found`);
		process.exit(1);
	}
	const files = node_fs.default.statSync(entryDir).isFile() ? [entryDir] : findPurusFiles(entryDir);
	if (files.length === 0) {
		console.log(`No .purus files found in ${entryDir}`);
		process.exit(0);
	}
	for (const f of files) {
		const source = node_fs.default.readFileSync(f, "utf8");
		const js = require_core.compile(source, {
			header: false,
			strict: useStrict,
			type: resolveModuleType(f, args.moduleType, loadConfig())
		});
		const tmpFile = node_path.default.join(node_os.default.tmpdir(), `purus_run_${Date.now()}_${Math.random().toString(36).slice(2)}.js`);
		try {
			node_fs.default.writeFileSync(tmpFile, js, "utf8");
			(0, node_child_process.execFileSync)(process.execPath, [tmpFile], {
				stdio: "inherit",
				cwd: node_path.default.dirname(f)
			});
		} finally {
			try {
				node_fs.default.unlinkSync(tmpFile);
			} catch {}
		}
	}
}
//#endregion
//#region ts/cli.ts
const HELP = [
	`Purus v${require_core.version} - A language that compiles to JavaScript`,
	"",
	"Usage:",
	"  purus build [file|dir]               Compile to JavaScript",
	"  purus build --entry <file|dir>       Specify entry file or directory",
	"  purus build --output <dir>           Specify output directory",
	"  purus build                          Compile using config.purus",
	"    .purus  -> .js",
	"    .cpurus -> .cjs (CommonJS)",
	"    .mpurus -> .mjs (ES Module)",
	"  purus build --no-header [file]       Compile without header comment",
	"  purus build --type <type>            Set module type (module|commonjs)",
	"  purus run [file|dir]                 Run without generating files",
	"  purus run --entry <file|dir>         Run entry file or directory",
	"  purus run                            Run using config.purus",
	"  purus check [file|dir]               Syntax check only",
	"  purus check --entry <file|dir>       Check entry file or directory",
	"  purus new [name] [-y]                Create a new project",
	"  purus init                           Initialize project in current directory",
	"  purus config                         Generate config.purus in current directory",
	"  purus version                        Show version",
	"  purus help                           Show this help",
	"",
	"Aliases: compile = build, create = new"
];
async function main(argv) {
	const [cmd, ...args] = argv;
	switch (cmd) {
		case "new":
		case "create":
			await run$3(args);
			break;
		case "init":
			run$1();
			break;
		case "config":
			await run$2();
			break;
		case "build":
		case "compile":
			run$5(args);
			break;
		case "run":
			run(args);
			break;
		case "check":
			run$4(args);
			break;
		case "version":
		case "--version":
		case "-v":
			console.log(`Purus v${require_core.version}`);
			break;
		case "help":
		case "--help":
		case "-h":
		case void 0:
			console.log(HELP.join("\n"));
			break;
		default: {
			const result = (0, node_child_process.spawnSync)(process.execPath, [
				require_core.compilerPath,
				cmd,
				...args
			], { stdio: "inherit" });
			process.exit(result.status ?? 1);
		}
	}
}
main(process.argv.slice(2)).catch((err) => {
	console.error(err instanceof Error ? err.message : String(err));
	process.exit(1);
});
//#endregion
