/**
 * Purus - A language that compiles to JavaScript (ESM entry point)
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const purus = require("./index.js");

export const compile = purus.compile;
export const check = purus.check;
export const version = purus.version;
export default purus;
