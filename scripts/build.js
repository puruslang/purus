/**
 * Build script: copies the MoonBit JS-compiled purus compiler
 * from core/_build/js/debug/build/src/cmd/main/main.js to pkg/lib/purus-compiler.js
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(
  root,
  "_build",
  "js",
  "debug",
  "build",
  "src",
  "cmd",
  "main",
  "main.js",
);
const dest = path.join(root, "pkg", "lib", "purus-compiler.js");

if (!fs.existsSync(src)) {
  console.error(
    "Error: MoonBit JS build not found. Run `moon build --target js` in core/ first.",
  );
  process.exit(1);
}

// Ensure lib/ exists
fs.mkdirSync(path.dirname(dest), { recursive: true });

// Read, inject version, and write
const version = require(path.join(root, "package.json")).version;
let content = fs.readFileSync(src, "utf8");
content = content.replace(/__PURUS_VERSION__/g, version);
fs.writeFileSync(dest, content, "utf8");
console.log(`Copied ${src} -> ${dest} (version: ${version})`);
