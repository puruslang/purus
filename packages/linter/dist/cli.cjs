#!/usr/bin/env node
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
const require_index = require("./index.cjs");
let node_fs = require("node:fs");
node_fs = __toESM(node_fs, 1);
let node_path = require("node:path");
node_path = __toESM(node_path, 1);
//#region src/config.ts
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
//#region src/cli.ts
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
	console.log("purus-lint - Linter for the Purus language");
	console.log("");
	console.log("Usage:");
	console.log("  purus-lint [file|dir...]             Lint specific files or directories");
	console.log("  purus-lint                           Lint using config.purus");
	console.log("");
	console.log("Options:");
	console.log("  --config <file>  Path to config JSON file");
	console.log("  --fix            (not yet implemented)");
	console.log("  --help           Show this help");
	process.exit(0);
}
let configPath = null;
const inputPaths = [];
for (let i = 0; i < args.length; i++) if (args[i] === "--config" && i + 1 < args.length) configPath = args[++i];
else if (!args[i].startsWith("-")) inputPaths.push(args[i]);
let ruleOverrides = {};
if (configPath) try {
	ruleOverrides = JSON.parse(node_fs.default.readFileSync(configPath, "utf8"));
} catch (err) {
	console.error(`Error reading config: ${err.message}`);
	process.exit(1);
}
else {
	const result = loadConfig();
	if (result && typeof result.config.lint === "object") {
		ruleOverrides = {};
		const lintConfig = result.config.lint;
		for (const [key, value] of Object.entries(lintConfig)) if (typeof value === "string") ruleOverrides[key] = { severity: value };
		else if (typeof value === "number") {
			if (key === "indent-size") ruleOverrides[key] = {
				severity: "warn",
				size: value
			};
			else if (key === "max-line-length") ruleOverrides[key] = {
				severity: "warn",
				max: value
			};
		} else if (typeof value === "object") ruleOverrides[key] = value;
	}
}
let filesToLint = [];
for (const p of inputPaths) {
	const resolved = node_path.default.resolve(p);
	if (!node_fs.default.existsSync(resolved)) {
		console.error(`Error: '${p}' not found`);
		process.exit(1);
	}
	if (node_fs.default.statSync(resolved).isDirectory()) filesToLint.push(...findPurusFiles(resolved));
	else filesToLint.push(resolved);
}
if (filesToLint.length === 0) {
	const result = loadConfig();
	if (result) {
		const entryDir = node_path.default.resolve(result.configDir, typeof result.config.entry === "string" && result.config.entry ? result.config.entry : "src");
		if (node_fs.default.existsSync(entryDir)) filesToLint = findPurusFiles(entryDir);
	}
}
if (filesToLint.length === 0) {
	console.log("purus-lint - Linter for the Purus language");
	console.log("");
	console.log("Usage:");
	console.log("  purus-lint [file|dir...]             Lint specific files or directories");
	console.log("  purus-lint                           Lint using config.purus");
	process.exit(0);
}
let totalIssues = 0;
for (const file of filesToLint) {
	let source;
	try {
		source = node_fs.default.readFileSync(file, "utf8");
	} catch (err) {
		console.error(`Error: ${err.message}`);
		continue;
	}
	const diagnostics = require_index.lint(source, ruleOverrides);
	totalIssues += diagnostics.length;
	for (const d of diagnostics) {
		const icon = d.severity === "error" ? "error" : "warn";
		console.log(`${file}:${d.line}:${d.col} ${icon} ${d.message} (${d.rule})`);
	}
}
if (totalIssues > 0) {
	console.log(`\n${totalIssues} issue${totalIssues === 1 ? "" : "s"} found.`);
	process.exit(1);
} else if (filesToLint.length > 0) console.log("No issues found.");
function findPurusFiles(dir) {
	const results = [];
	if (!node_fs.default.existsSync(dir)) return results;
	for (const entry of node_fs.default.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = node_path.default.join(dir, entry.name);
		if (entry.isDirectory()) results.push(...findPurusFiles(fullPath));
		else if (/\.(c|m)?purus$/.test(entry.name) && entry.name !== "config.purus") results.push(fullPath);
	}
	return results;
}
//#endregion
