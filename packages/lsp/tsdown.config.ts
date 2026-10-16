import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/server.ts"],
  format: ["esm", "cjs"],
  dts: { entry: ["src/index.ts"] },
  clean: true,
  target: "node22",
  platform: "node",
});
