import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function findPackageRoot(start: string): string {
  let dir = start;
  for (;;) {
    const manifest = path.join(dir, "package.json");
    if (fs.existsSync(manifest)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(manifest, "utf8")) as {
          name?: string;
        };
        if (parsed.name === "purus") return dir;
      } catch {
        // not a readable manifest, keep looking upwards
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error("Cannot locate the purus package root");
    }
    dir = parent;
  }
}

/** Root of the installed purus package (works from dist/ and from ts/). */
export const packageRoot = findPackageRoot(
  path.dirname(fileURLToPath(import.meta.url))
);

/** The MoonBit-compiled compiler, copied here by `npm run build`. */
export const compilerPath = path.join(packageRoot, "dist", "purus-compiler.js");

/** Standard library modules (`p-*.cjs`), read as text by the resolver. */
export const stdlibDir = path.join(packageRoot, "stdlib");
