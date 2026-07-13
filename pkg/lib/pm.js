"use strict";

/**
 * Package manager detection and command mapping.
 *
 * Nothing is hardcoded to npm: the manager is detected from how the CLI
 * was launched (npm_config_user_agent — set by `npx`, `pnpm dlx`,
 * `yarn dlx`, `bunx`, and by `<pm> run` scripts), then from a lockfile
 * in the target directory, and only falls back to npm as a default.
 */

const fs = require("fs");
const path = require("path");

const KNOWN = new Set(["npm", "pnpm", "yarn", "bun"]);

const LOCKFILES = [
  ["package-lock.json", "npm"],
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
];

function fromUserAgent() {
  // e.g. "pnpm/9.12.0 npm/? node/v22.11.0 linux x64"
  const ua = process.env.npm_config_user_agent || "";
  const name = ua.split(" ")[0].split("/")[0];
  return KNOWN.has(name) ? name : null;
}

function fromLockfile(dir) {
  for (const [file, name] of LOCKFILES) {
    if (fs.existsSync(path.join(dir, file))) return name;
  }
  return null;
}

/**
 * Detect the package manager to use.
 *
 * @param {string} [dir] - Directory to check for lockfiles
 * @returns {"npm"|"pnpm"|"yarn"|"bun"}
 */
function detect(dir = process.cwd()) {
  return fromUserAgent() || fromLockfile(dir) || "npm";
}

/**
 * Command to initialize a package.json, or null when the manager's
 * init scaffolds extra files (the caller should write a minimal
 * package.json itself instead).
 *
 * @param {string} pm
 * @param {boolean} yes - Non-interactive mode
 * @returns {{ cmd: string, args: string[] } | null}
 */
function initCommand(pm, yes) {
  switch (pm) {
    case "pnpm":
      // pnpm init is always non-interactive
      return { cmd: "pnpm", args: ["init"] };
    case "yarn":
      return { cmd: "yarn", args: yes ? ["init", "-y"] : ["init"] };
    case "bun":
      // bun init scaffolds index.ts/tsconfig — not wanted here
      return null;
    default:
      return { cmd: "npm", args: yes ? ["init", "-y"] : ["init"] };
  }
}

/**
 * Command to install packages as devDependencies.
 *
 * @param {string} pm
 * @param {string[]} deps
 * @returns {{ cmd: string, args: string[] }}
 */
function addDevCommand(pm, deps) {
  switch (pm) {
    case "pnpm":
      return { cmd: "pnpm", args: ["add", "-D", ...deps] };
    case "yarn":
      return { cmd: "yarn", args: ["add", "--dev", ...deps] };
    case "bun":
      return { cmd: "bun", args: ["add", "--dev", ...deps] };
    default:
      return { cmd: "npm", args: ["install", "--save-dev", ...deps] };
  }
}

/**
 * The plain "install dependencies" command shown in docs and hints.
 *
 * @param {string} pm
 * @returns {string}
 */
function installHint(pm) {
  return pm === "yarn" ? "yarn" : `${pm} install`;
}

module.exports = { detect, initCommand, addDevCommand, installHint };
