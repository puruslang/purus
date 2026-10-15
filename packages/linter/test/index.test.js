import { describe, it, expect } from "vitest";
import { lint } from "../src/index.js";

describe("lint()", () => {
  it("returns no diagnostics for valid code", () => {
    const diags = lint("const x be 42");
    expect(diags).toHaveLength(0);
  });

  it("warns on var usage (no-var)", () => {
    const diags = lint("var x be 42");
    expect(diags.some(d => d.rule === "no-var")).toBe(true);
  });

  it("errors on bare assignment (bare-assignment)", () => {
    const diags = lint("x be 42");
    expect(diags.some(d => d.rule === "bare-assignment")).toBe(true);
  });

  it("warns on nil usage (no-nil)", () => {
    const diags = lint("const x be nil");
    expect(diags.some(d => d.rule === "no-nil")).toBe(true);
  });

  it("errors on JS chars (no-js-chars)", () => {
    const diags = lint('const x be (1 + 2)');
    expect(diags.some(d => d.rule === "no-js-chars")).toBe(true);
  });

  it("errors on JS operators (no-js-operators)", () => {
    const diags = lint("const r be x === y");
    expect(diags.some(d => d.rule === "no-js-operators")).toBe(true);
  });

  it("warns on deprecated function keyword (no-function)", () => {
    const diags = lint("function greet name\n  console.log[name]");
    expect(diags.some(d => d.rule === "no-function")).toBe(true);
  });

  it("errors on unmatched bracket (bracket-match)", () => {
    const diags = lint("const x be [1; 2");
    expect(diags.some(d => d.rule === "bracket-match")).toBe(true);
  });

  it("allows rule overrides to disable rules", () => {
    const diags = lint("var x be 42", { "no-var": { severity: "off" } });
    expect(diags.some(d => d.rule === "no-var")).toBe(false);
  });

  it("diagnostic has required fields", () => {
    const diags = lint("var x be 42");
    const d = diags[0];
    expect(d).toHaveProperty("rule");
    expect(d).toHaveProperty("severity");
    expect(d).toHaveProperty("line");
    expect(d).toHaveProperty("col");
    expect(d).toHaveProperty("message");
  });

  it("blank keyword is valid (no errors)", () => {
    const diags = lint("fn f blank; x to x");
    expect(diags.filter(d => d.severity === "error")).toHaveLength(0);
  });

  it("//;text;// string is valid (no errors)", () => {
    const diags = lint("const s be //;hello;//");
    expect(diags.filter(d => d.severity === "error")).toHaveLength(0);
  });
});