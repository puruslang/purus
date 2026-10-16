/**
 * Purus - A language that compiles to JavaScript
 *
 * Programmatic API for compiling Purus source code to JavaScript. Works in
 * both CommonJS and ES Module environments.
 *
 * @example
 * // ESM
 * import { compile } from "purus";
 * const js = compile("const x be 42");
 *
 * // CJS
 * const { compile } = require("purus");
 */

import { check, compile, version } from "./lib/core.js";

export { check, compile, version };
export type { CompileOptions, ModuleType } from "./lib/core.js";

const purus = { compile, check, version };

export default purus;
