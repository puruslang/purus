import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "ts/index.ts", cli: "ts/cli.ts" },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  shims: true,
  target: "node22",
  platform: "node",
});
