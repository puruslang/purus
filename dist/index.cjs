Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_core = require("./core-BBu7Zt9R.cjs");
//#region ts/index.ts
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
const purus = {
	compile: require_core.compile,
	check: require_core.check,
	version: require_core.version
};
//#endregion
exports.check = require_core.check;
exports.compile = require_core.compile;
exports.default = purus;
exports.version = require_core.version;
