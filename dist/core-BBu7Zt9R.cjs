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
let node_child_process = require("node:child_process");
let node_fs = require("node:fs");
node_fs = __toESM(node_fs, 1);
let node_os = require("node:os");
node_os = __toESM(node_os, 1);
let node_path = require("node:path");
node_path = __toESM(node_path, 1);
let node_url = require("node:url");
let node_module = require("node:module");
//#region package.json
var version$1 = "1.2.0-beta.0";
//#endregion
//#region ts/lib/paths.ts
function findPackageRoot(start) {
	let dir = start;
	for (;;) {
		const manifest = node_path.default.join(dir, "package.json");
		if (node_fs.default.existsSync(manifest)) try {
			if (JSON.parse(node_fs.default.readFileSync(manifest, "utf8")).name === "purus") return dir;
		} catch {}
		const parent = node_path.default.dirname(dir);
		if (parent === dir) throw new Error("Cannot locate the purus package root");
		dir = parent;
	}
}
/** Root of the installed purus package (works from dist/ and from ts/). */
const packageRoot = findPackageRoot(node_path.default.dirname((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href)));
/** The MoonBit-compiled compiler, copied here by `npm run build`. */
const compilerPath = node_path.default.join(packageRoot, "dist", "purus-compiler.js");
/** Standard library modules (`p-*.cjs`), read as text by the resolver. */
const stdlibDir = node_path.default.join(packageRoot, "stdlib");
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
const require$1 = (0, node_module.createRequire)(require("url").pathToFileURL(__filename).href);
const cache = {};
const GLOBALS = {
	Math,
	JSON
};
/** Load and cache a stdlib module. */
function load(name) {
	if (cache[name]) return cache[name];
	const fp = node_path.default.join(stdlibDir, name + ".cjs");
	const src = node_fs.default.readFileSync(fp, "utf8");
	const m = require$1(fp);
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
	return node_path.default.join(node_os.default.tmpdir(), `purus_${Date.now()}_${Math.random().toString(36).slice(2)}.purus`);
}
function removeQuietly(file) {
	try {
		node_fs.default.unlinkSync(file);
	} catch {}
}
function runCompiler(args) {
	return (0, node_child_process.execFileSync)(process.execPath, [compilerPath, ...args], {
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
		node_fs.default.writeFileSync(tmpFile, source, "utf8");
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
		node_fs.default.writeFileSync(tmpFile, source, "utf8");
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
Object.defineProperty(exports, "__toESM", {
	enumerable: true,
	get: function() {
		return __toESM;
	}
});
Object.defineProperty(exports, "check", {
	enumerable: true,
	get: function() {
		return check;
	}
});
Object.defineProperty(exports, "compile", {
	enumerable: true,
	get: function() {
		return compile;
	}
});
Object.defineProperty(exports, "compilerPath", {
	enumerable: true,
	get: function() {
		return compilerPath;
	}
});
Object.defineProperty(exports, "version", {
	enumerable: true,
	get: function() {
		return version;
	}
});
