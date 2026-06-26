// Purus Programmatic API Example (TypeScript)
// Usage: npx tsx api.ts

import { compile, check, version, type CompileOptions } from "purus";

// Show compiler version
console.log(`Purus v${version}`);

// Compile Purus source code
const source: string = 'const greeting be ///Hello, World!///\nconsole.log[greeting]';
const js: string = compile(source);
console.log("--- Compiled Output ---");
console.log(js);

// Compile with options
const options: CompileOptions = { header: false, strict: true, type: "module" };
const jsWithOptions: string = compile(source, options);
console.log("--- With Options ---");
console.log(jsWithOptions);

// Compile as CommonJS
const cjsSource: string = 'import fs from ///fs///\nconsole.log[fs]';
const cjs: string = compile(cjsSource, { header: false, type: "commonjs" });
console.log("--- CommonJS Output ---");
console.log(cjs);

// Syntax check
const valid: true = check('const x be 42');
console.log(`Syntax check: ${valid}`);
