/**
 * Sync version from package.json to moon.mod
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const version = require(path.join(root, "package.json")).version;

const moonModPath = path.join(root, "moon.mod");
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
  "utf8",
);

if (oldVersion !== version) {
  console.log(`moon.mod: ${oldVersion} -> ${version}`);
} else {
  console.log(`moon.mod: ${version} (no change)`);
}

console.log(`\nAll versions synced to ${version}`);
