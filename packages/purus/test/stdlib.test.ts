import { describe, expect, it } from "vitest";
import { load, postProcess } from "../ts/lib/stdlib.js";

describe("stdlib", () => {
  it("loads a module and exposes its methods", () => {
    const m = load("p-array");
    expect(typeof m.mod.sum).toBe("function");
    expect(m.src).toContain("sum(");
  });

  it("inlines only the used methods of a module", () => {
    const js = postProcess(
      [
        "// @purus-stdlib:whole:p-array:a",
        "console.log(a.sum([1, 2, 3]));",
      ].join("\n")
    );
    expect(js).toContain("sum(");
    expect(js).not.toContain("product(");
    expect(js).not.toContain("@purus-stdlib");
  });

  it("emits an empty object when nothing is used", () => {
    expect(
      postProcess("// @purus-stdlib:whole:p-string:s\nconsole.log(1);")
    ).toContain("const s = {};");
  });

  it("maps spread modules to the JS global", () => {
    const js = postProcess("// @purus-stdlib:whole:p-json:j\nj.parse('{}');");
    expect(js).toContain("parse: JSON.parse");
  });

  it("pulls in internal this.xxx dependencies", () => {
    const js = postProcess(
      "// @purus-stdlib:whole:p-datetime:dt\ndt.tzyear(0);"
    );
    expect(js).toContain("_tzpart");
  });
});
