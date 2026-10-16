import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
//#region package.json
var version$1 = "1.2.0-beta.0";
//#endregion
//#region ts/lib/paths.ts
function findPackageRoot(start) {
	let dir = start;
	for (;;) {
		const manifest = path.join(dir, "package.json");
		if (fs.existsSync(manifest)) try {
			if (JSON.parse(fs.readFileSync(manifest, "utf8")).name === "purus") return dir;
		} catch {}
		const parent = path.dirname(dir);
		if (parent === dir) throw new Error("Cannot locate the purus package root");
		dir = parent;
	}
}
/** Root of the installed purus package (works from dist/ and from ts/). */
const packageRoot = findPackageRoot(path.dirname(fileURLToPath(import.meta.url)));
/** The MoonBit-compiled compiler, copied here by `npm run build`. */
const compilerPath = path.join(packageRoot, "dist", "purus-compiler.js");
/** Standard library modules (`p-*.cjs`), read as text by the resolver. */
const stdlibDir = path.join(packageRoot, "stdlib");
//#endregion
//#region ts/lib/stdlib.ts
/**
* Purus stdlib resolver — replaces codegen markers with actual JS from stdlib/*.js
*
* Marker emitted by the MoonBit compiler:
*   // @purus-stdlib:whole:<module>:<binding>
*
* Tree-shaking: only properties actually referenced as `binding.xxx`
* in the rest of the code are included in the emitted object.
*/
const require = createRequire(import.meta.url);
const cache = {};
const GLOBALS = {
	Math,
	JSON
};
/** Load and cache a stdlib module. */
function load(name) {
	if (cache[name]) return cache[name];
	const fp = path.join(stdlibDir, name + ".cjs");
	const src = fs.readFileSync(fp, "utf8");
	const m = require(fp);
	cache[name] = {
		src,
		mod: m.mod,
		spread: m.spread || null,
		spreadObj: m.spread ? GLOBALS[m.spread] || null : null,
		constants: m.constants || {}
	};
	return cache[name];
}
/** Extract source of a single method from exports.mod block. */
function extractMethod(src, name) {
	const hit = new RegExp(`(?:^|[,\\n])\\s*(${name}\\([^)]*\\)\\s*\\{)`, "m").exec(src);
	if (!hit) return null;
	const start = src.indexOf(hit[1], hit.index);
	let depth = 0, end = start;
	let inBrace = false;
	for (let i = start; i < src.length; i++) {
		if (src[i] === "{") {
			depth++;
			inBrace = true;
		}
		if (src[i] === "}") depth--;
		if (inBrace && depth === 0) {
			end = i;
			break;
		}
	}
	return src.slice(start, end + 1);
}
/** Collect `this.xxx(` calls in a method body to find internal deps. */
function collectThisDeps(methodSrc) {
	const deps = /* @__PURE__ */ new Set();
	for (const m of methodSrc.matchAll(/this\.(\w+)\s*\(/g)) deps.add(m[1]);
	return deps;
}
/** Recursively collect all deps for a set of method names. */
function collectAllDeps(mod, src, names) {
	const all = new Set(names);
	const queue = [...names];
	while (queue.length) {
		const name = queue.pop();
		if (typeof mod[name] !== "function") continue;
		const body = extractMethod(src, name);
		if (!body) continue;
		for (const dep of collectThisDeps(body)) if (!all.has(dep) && dep in mod) {
			all.add(dep);
			queue.push(dep);
		}
	}
	return all;
}
/**
* Resolve a whole-module import with tree-shaking.
* Scans `restOfCode` for `binding.xxx` to determine used properties.
*/
function resolveWhole(moduleName, binding, restOfCode) {
	const m = load(moduleName);
	const re = new RegExp("\\b" + binding + "\\.(\\w+)\\b", "g");
	const used = /* @__PURE__ */ new Set();
	for (const match of restOfCode.matchAll(re)) used.add(match[1]);
	if (used.size === 0) return `const ${binding} = {};`;
	const expanded = collectAllDeps(m.mod, m.src, used);
	const props = [];
	for (const name of expanded) {
		if (m.constants[name]) {
			props.push(`${name}: ${m.spread}.${m.constants[name]}`);
			continue;
		}
		if (m.spreadObj && name in m.spreadObj) {
			props.push(`${name}: ${m.spread}.${name}`);
			continue;
		}
		if (typeof m.mod[name] === "function") {
			const body = extractMethod(m.src, name);
			if (body) {
				props.push(body);
				continue;
			}
		}
	}
	if (props.length === 0) return `const ${binding} = {};`;
	if (props.length <= 3) return `const ${binding} = { ${props.join(", ")} };`;
	return `const ${binding} = {\n  ${props.join(",\n  ")},\n};`;
}
/**
* Post-process compiler output: replace stdlib markers with actual JS.
*/
function postProcess(js) {
	return js.replace(/^(\s*)\/\/ @purus-stdlib:whole:([\w-]+):([\w-]+)$/gm, (match, indent, moduleName, binding) => {
		const markerEnd = js.indexOf(match) + match.length;
		return resolveWhole(moduleName, binding, js.slice(markerEnd)).split("\n").map((l) => indent + l).join("\n");
	});
}
//#endregion
//#region ts/lib/core.ts
/** The Purus compiler version. */
const version = version$1;
function detail(err) {
	return `${err.stdout || ""}${err.stderr || ""}`.trim();
}
function tempSourceFile() {
	return path.join(os.tmpdir(), `purus_${Date.now()}_${Math.random().toString(36).slice(2)}.purus`);
}
function removeQuietly(file) {
	try {
		fs.unlinkSync(file);
	} catch {}
}
function runCompiler(args) {
	return execFileSync(process.execPath, [compilerPath, ...args], {
		encoding: "utf8",
		stdio: [
			"pipe",
			"pipe",
			"pipe"
		],
		timeout: 3e4
	});
}
/** Compile Purus source code to JavaScript. */
function compile(source, options = {}) {
	const { header = true, strict = true, type } = options;
	const tmpFile = tempSourceFile();
	try {
		fs.writeFileSync(tmpFile, source, "utf8");
		const args = [
			"build",
			"--stdout",
			"--no-header"
		];
		if (!strict) args.push("--strict", "false");
		if (type === "commonjs") args.push("--type", "commonjs");
		args.push(tmpFile);
		let result;
		try {
			result = runCompiler(args);
		} catch (err) {
			const e = err;
			throw new Error(detail(e) || `Compile error: ${e.message}`);
		}
		result = postProcess(result);
		if (header) return `// Generated by Purus ${version}\n${result}`;
		return result;
	} finally {
		removeQuietly(tmpFile);
	}
}
/**
* Check Purus source code for syntax errors.
* @returns `true` if the syntax is valid
* @throws {Error} If the source contains syntax errors
*/
function check(source) {
	const tmpFile = tempSourceFile();
	try {
		fs.writeFileSync(tmpFile, source, "utf8");
		runCompiler(["check", tmpFile]);
		return true;
	} catch (err) {
		const e = err;
		throw new Error(`Syntax error: ${detail(e) || e.message}`);
	} finally {
		removeQuietly(tmpFile);
	}
}
//#endregion
export { compilerPath as i, compile as n, version as r, check as t };
