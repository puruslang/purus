/**
 * Copies the MoonBit JS-compiled purus compiler (moon build --target js)
 * to dist/purus-compiler.js, injecting the package version.
 */

import fs from "node:fs";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const src = path.join(
  root,
  "_build",
  "js",
  "debug",
  "build",
  "src",
  "cmd",
  "main",
  "main.js"
);
const dest = path.join(root, "dist", "purus-compiler.js");

if (!fs.existsSync(src)) {
  console.error(
    "Error: MoonBit JS build not found. Run `moon build --target js` first."
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });

const { version } = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8")
) as { version: string };
const content = fs
  .readFileSync(src, "utf8")
  .replace(/__PURUS_VERSION__/g, version);
fs.writeFileSync(dest, content, "utf8");
console.log(`Copied ${src} -> ${dest} (version: ${version})`);
