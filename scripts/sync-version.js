/**
 * Sync version from package.json to moon.mod.json
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const version = require(path.join(root, "package.json")).version;

const moonModPath = path.join(root, "moon.mod.json");
const moonMod = JSON.parse(fs.readFileSync(moonModPath, "utf8"));
const oldVersion = moonMod.version;
moonMod.version = version;
fs.writeFileSync(moonModPath, JSON.stringify(moonMod, null, "  ") + "\n", "utf8");

if (oldVersion !== version) {
  console.log(`moon.mod.json: ${oldVersion} -> ${version}`);
} else {
  console.log(`moon.mod.json: ${version} (no change)`);
}

console.log(`\nAll versions synced to ${version}`);