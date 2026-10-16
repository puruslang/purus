/**
 * Copies the MoonBit JS-compiled purus compiler (moon build --target js)
 * to dist/purus-compiler.js, injecting the package version.
 */

import fs from "node:fs";
import path from "node:path";

const pkgRoot = path.join(import.meta.dirname, "..");
const repoRoot = path.join(pkgRoot, "..", "..");
const src = path.join(
  repoRoot,
  "_build",
  "js",
  "release",
  "build",
  "src",
  "cmd",
  "main",
  "main.js"
);
const dest = path.join(pkgRoot, "dist", "purus-compiler.js");

if (!fs.existsSync(src)) {
  console.error(
    "Error: MoonBit JS build not found. Run `moon build --target js` first."
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });

const { version } = JSON.parse(
  fs.readFileSync(path.join(pkgRoot, "package.json"), "utf8")
) as { version: string };
const content = fs
  .readFileSync(src, "utf8")
  .replace(/__PURUS_VERSION__/g, version);
fs.writeFileSync(dest, content, "utf8");
console.log(`Copied ${src} -> ${dest} (version: ${version})`);

// README and LICENSE live at the repository root; the npm package ships copies.
for (const name of ["README.md", "README-ja.md", "LICENSE"]) {
  fs.copyFileSync(path.join(repoRoot, name), path.join(pkgRoot, name));
}
