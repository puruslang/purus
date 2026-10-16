import { describe, it, expect } from "vitest";
import pluginModule from "../src/index.js";
const { formatPurus } = pluginModule;

describe("formatPurus()", () => {
  it("normalizes indentation to 2 spaces", () => {
    const result = formatPurus("fn greet name\n    console.log[name]");
    expect(result).toContain("  console.log[name]");
  });

  it("adds trailing newline", () => {
    const result = formatPurus("const x be 42");
    expect(result.endsWith("\n")).toBe(true);
  });

  it("normalizes spacing around be", () => {
    const result = formatPurus("const  x  be  42");
    expect(result).toBe("const x be 42\n");
  });

  it("preserves string content", () => {
    const result = formatPurus("const s be //;hello world;//");
    expect(result).toContain("//;hello world;//");
  });

  it("preserves triple-slash string content", () => {
    const result = formatPurus("const s be ///hello world///");
    expect(result).toContain("///hello world///");
  });

  it("removes trailing whitespace", () => {
    const result = formatPurus("const x be 42   ");
    expect(result).toBe("const x be 42\n");
  });

  it("normalizes spaces inside brackets", () => {
    const result = formatPurus("fn f[  a;  b  ]");
    expect(result).not.toMatch(/\[\s+/);
  });

  it("respects tabWidth option", () => {
    const result = formatPurus("fn greet name\n  console.log[name]", { tabWidth: 4 });
    expect(result).toContain("    console.log[name]");
  });
});