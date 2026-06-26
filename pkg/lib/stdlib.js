/**
 * Purus stdlib resolver — replaces codegen markers with actual JS from stdlib/*.js
 *
 * Marker emitted by the MoonBit compiler:
 *   // @purus-stdlib:whole:<module>:<binding>
 *
 * Tree-shaking: only properties actually referenced as `binding.xxx`
 * in the rest of the code are included in the emitted object.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const STDLIB_DIR = path.join(__dirname, "..", "stdlib");
const cache = {};

// Global objects reachable by spread name
const GLOBALS = { Math, JSON };

/** Load and cache a stdlib module. */
function load(name) {
  if (cache[name]) return cache[name];
  const fp = path.join(STDLIB_DIR, name + ".js");
  const src = fs.readFileSync(fp, "utf8");
  const m = require(fp);
  cache[name] = {
    src,
    mod: m.mod,
    spread: m.spread || null,
    spreadObj: m.spread ? GLOBALS[m.spread] || null : null,
    constants: m.constants || {},
  };
  return cache[name];
}

/** Extract source of a single method from exports.mod block. */
function extractMethod(src, name) {
  // Match:  name( ... ) { ... }  (balanced braces)
  const re = new RegExp(`(?:^|[,\\n])\\s*(${name}\\([^)]*\\)\\s*\\{)`, "m");
  const hit = re.exec(src);
  if (!hit) return null;
  const start = src.indexOf(hit[1], hit.index);
  let depth = 0,
    end = start;
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
  const deps = new Set();
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
    for (const dep of collectThisDeps(body)) {
      if (!all.has(dep) && dep in mod) {
        all.add(dep);
        queue.push(dep);
      }
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

  // Collect used property names
  const re = new RegExp("\\b" + binding + "\\.(\\w+)\\b", "g");
  const used = new Set();
  for (const match of restOfCode.matchAll(re)) used.add(match[1]);

  if (used.size === 0) return `const ${binding} = {};`;

  // Expand with internal `this.xxx()` dependencies
  const expanded = collectAllDeps(m.mod, m.src, used);

  const props = [];

  for (const name of expanded) {
    // 1. constant alias (pi → Math.PI)
    if (m.constants[name]) {
      props.push(`${name}: ${m.spread}.${m.constants[name]}`);
      continue;
    }
    // 2. spread member (abs → Math.abs)
    if (m.spreadObj && name in m.spreadObj) {
      props.push(`${name}: ${m.spread}.${name}`);
      continue;
    }
    // 3. custom function — extract from source
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
  return js.replace(
    /^(\s*)\/\/ @purus-stdlib:whole:([\w-]+):([\w-]+)$/gm,
    (match, indent, moduleName, binding) => {
      // Everything after this marker is "rest of code" for tree-shaking
      const markerEnd = js.indexOf(match) + match.length;
      const rest = js.slice(markerEnd);
      const code = resolveWhole(moduleName, binding, rest);
      return code
        .split("\n")
        .map((l) => indent + l)
        .join("\n");
    },
  );
}

module.exports = { postProcess, load };
