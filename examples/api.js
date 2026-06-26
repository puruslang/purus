// Purus Programmatic API Example (JavaScript)
// Usage: node api.js

const { compile, check, version } = require("purus");

// Show compiler version
console.log(`Purus v${version}`);

// Compile Purus source code
const source = 'const greeting be ///Hello, World!///\nconsole.log[greeting]';
const js = compile(source);
console.log("--- Compiled Output ---");
console.log(js);

// Compile without header comment
const jsNoHeader = compile(source, { header: false });
console.log("--- Without Header ---");
console.log(jsNoHeader);

// Compile with strict mode disabled
const jsNoStrict = compile(source, { header: false, strict: false });
console.log("--- Without Strict Mode ---");
console.log(jsNoStrict);

// Compile as CommonJS
const cjsSource = 'import fs from ///fs///\nconsole.log[fs]';
const cjs = compile(cjsSource, { header: false, type: "commonjs" });
console.log("--- CommonJS Output ---");
console.log(cjs);

// Syntax check
try {
  check('const x be 42');
  console.log("Syntax check passed!");
} catch (err) {
  console.error("Syntax error:", err.message);
}
