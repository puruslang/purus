import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { findConfig, loadConfig, parseConfig } from "../ts/lib/config.js";
import {
  configString,
  findPurusFiles,
  outputExtension,
  resolveModuleType,
} from "../ts/lib/files.js";

describe("config", () => {
  let dir: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "purus-config-"));
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("parses values and dotted keys", () => {
    const file = path.join(dir, "config.purus");
    fs.writeFileSync(
      file,
      [
        "-- comment",
        "const entry be ///src///",
        "const header be true",
        "const strict be false",
        "const lint.indent-size be 2",
        "const lint.ratio be 1.5",
        "const lint.no-var be ///warn///",
      ].join("\n")
    );
    expect(parseConfig(file)).toEqual({
      entry: "src",
      header: true,
      strict: false,
      lint: { "indent-size": 2, ratio: 1.5, "no-var": "warn" },
    });
  });

  it("finds config.purus in a parent directory", () => {
    const nested = path.join(dir, "a", "b");
    fs.mkdirSync(nested, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "config.purus"),
      "const entry be ///x///\n"
    );
    expect(findConfig(nested)).toBe(path.join(dir, "config.purus"));
    const loaded = loadConfig(nested);
    expect(loaded?.configDir).toBe(dir);
    expect(configString(loaded!.config, "entry", "src")).toBe("x");
    expect(configString(loaded!.config, "output", "dist")).toBe("dist");
  });

  it("resolves the module type", () => {
    expect(resolveModuleType("a.cpurus", "module", null)).toBe("commonjs");
    expect(resolveModuleType("a.mpurus", "commonjs", null)).toBe("module");
    expect(resolveModuleType("a.purus", "commonjs", null)).toBe("commonjs");
    expect(
      resolveModuleType("a.purus", null, {
        config: { type: "commonjs" },
        configPath: "",
        configDir: dir,
      })
    ).toBe("commonjs");
    fs.writeFileSync(path.join(dir, "package.json"), '{"type":"commonjs"}');
    expect(
      resolveModuleType("a.purus", null, {
        config: {},
        configPath: "",
        configDir: dir,
      })
    ).toBe("commonjs");
    expect(
      resolveModuleType("a.purus", null, {
        config: {},
        configPath: "",
        configDir: os.tmpdir(),
      })
    ).toBe("module");
  });

  it("maps output extensions", () => {
    expect(outputExtension("a.purus")).toBe(".js");
    expect(outputExtension("a.cpurus")).toBe(".cjs");
    expect(outputExtension("a.mpurus")).toBe(".mjs");
  });

  it("finds Purus sources and can skip config.purus", () => {
    fs.mkdirSync(path.join(dir, "sub"));
    for (const f of [
      "a.purus",
      "b.cpurus",
      "sub/c.mpurus",
      "config.purus",
      "x.js",
    ]) {
      fs.writeFileSync(path.join(dir, f), "");
    }
    const all = findPurusFiles(dir)
      .map((f) => path.relative(dir, f).replaceAll("\\", "/"))
      .sort();
    expect(all).toEqual([
      "a.purus",
      "b.cpurus",
      "config.purus",
      "sub/c.mpurus",
    ]);
    const skipped = findPurusFiles(dir, { skipConfig: true })
      .map((f) => path.relative(dir, f).replaceAll("\\", "/"))
      .sort();
    expect(skipped).not.toContain("config.purus");
  });
});
