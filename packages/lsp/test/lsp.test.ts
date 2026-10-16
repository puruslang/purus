import { describe, expect, it } from "vitest";
import {
  completionsFor,
  fromCompilerError,
  fromLint,
  keywordInfo,
  tokenEnd,
  wordBefore,
} from "../src/index.js";

describe("completion", () => {
  it("completes keywords by prefix", () => {
    const labels = completionsFor("  eli", 5).map((e) => e.label);
    expect(labels).toContain("elif");
    expect(labels).not.toContain("const");
  });

  it("completes stdlib modules after `use`", () => {
    const entries = completionsFor("use p-ar", 8);
    expect(entries.map((e) => e.label)).toEqual(["p-array"]);
    expect(entries[0].kind).toBe("module");
  });

  it("finds the word before the cursor", () => {
    expect(wordBefore("const my-var", 12)).toEqual({
      prefix: "my-var",
      before: "const ",
    });
  });
});

describe("diagnostics", () => {
  it("converts linter diagnostics to 0-based positions", () => {
    expect(
      fromLint([
        { rule: "no-var", severity: "warn", line: 2, col: 1, message: "m" },
      ])
    ).toEqual([
      {
        line: 1,
        col: 0,
        message: "m",
        severity: "warning",
        source: "purus-lint",
        code: "no-var",
      },
    ]);
  });

  it("parses compiler errors", () => {
    expect(
      fromCompilerError("Error: 3:5: expected Else_ but found Eof\nOK")
    ).toEqual([
      {
        line: 2,
        col: 4,
        message: "expected Else_ but found Eof",
        severity: "error",
        source: "purus",
      },
    ]);
  });

  it("computes token ends", () => {
    expect(tokenEnd("const x be 1", 0)).toBe(5);
    expect(tokenEnd("a (b)", 2)).toBe(3);
  });
});

describe("keywords", () => {
  it("describes known keywords only", () => {
    expect(keywordInfo("elif")?.detail).toMatch(/Else-if/);
    expect(keywordInfo("nope")).toBeUndefined();
  });
});
