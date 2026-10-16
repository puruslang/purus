/**
 * Sync the version from package.json into moon.mod.
 */

import fs from "node:fs";
import path from "node:path";

const pkgRoot = path.join(import.meta.dirname, "..");
const repoRoot = path.join(pkgRoot, "..", "..");
const { version } = JSON.parse(
  fs.readFileSync(path.join(pkgRoot, "package.json"), "utf8")
) as { version: string };

const moonModPath = path.join(repoRoot, "moon.mod");
const content = fs.readFileSync(moonModPath, "utf8");

const versionLine = /^version\s*=\s*"([^"]*)"/m;
const match = content.match(versionLine);
if (!match) {
  console.error("Error: no version field found in moon.mod");
  process.exit(1);
}
const oldVersion = match[1];
fs.writeFileSync(
  moonModPath,
  content.replace(versionLine, `version = "${version}"`),
  "utf8"
);

if (oldVersion !== version) {
  console.log(`moon.mod: ${oldVersion} -> ${version}`);
} else {
  console.log(`moon.mod: ${version} (no change)`);
}

console.log(`\nAll versions synced to ${version}`);
