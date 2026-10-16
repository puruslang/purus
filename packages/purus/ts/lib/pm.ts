/**
 * Package manager detection and command mapping.
 *
 * Nothing is hardcoded to npm: the manager is detected from how the CLI
 * was launched (npm_config_user_agent — set by `npx`, `pnpm dlx`,
 * `yarn dlx`, `bunx`, and by `<pm> run` scripts), then from a lockfile
 * in the target directory, and only falls back to npm as a default.
 */

import fs from "node:fs";
import path from "node:path";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export interface Command {
  cmd: string;
  args: string[];
}

const KNOWN = new Set<string>(["npm", "pnpm", "yarn", "bun"]);

const LOCKFILES: [string, PackageManager][] = [
  ["package-lock.json", "npm"],
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
];

function fromUserAgent(): PackageManager | null {
  // e.g. "pnpm/9.12.0 npm/? node/v22.11.0 linux x64"
  const ua = process.env.npm_config_user_agent || "";
  const name = ua.split(" ")[0].split("/")[0];
  return KNOWN.has(name) ? (name as PackageManager) : null;
}

function fromLockfile(dir: string): PackageManager | null {
  for (const [file, name] of LOCKFILES) {
    if (fs.existsSync(path.join(dir, file))) return name;
  }
  return null;
}

/** Detect the package manager to use. */
export function detect(dir: string = process.cwd()): PackageManager {
  return fromUserAgent() || fromLockfile(dir) || "npm";
}

/**
 * Command to initialize a package.json, or null when the manager's
 * init scaffolds extra files (the caller should write a minimal
 * package.json itself instead).
 */
export function initCommand(pm: PackageManager, yes: boolean): Command | null {
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

/** Command to install packages as devDependencies. */
export function addDevCommand(pm: PackageManager, deps: string[]): Command {
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

/** The plain "install dependencies" command shown in docs and hints. */
export function installHint(pm: PackageManager): string {
  return pm === "yarn" ? "yarn" : `${pm} install`;
}
