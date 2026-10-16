import { n as compile, r as version, t as check } from "./core-ChUCXzA1.mjs";
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
	compile,
	check,
	version
};
//#endregion
export { check, compile, purus as default, version };
