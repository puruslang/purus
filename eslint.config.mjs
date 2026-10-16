import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/coverage/**",
      "**/node_modules/**",
      "_build/**",
      ".mooncakes/**",
      "pkg/**",
      "bin/**",
      "scripts/**",
      "src/**",
      "examples/**",
      "skills/**",
      ".agents/**",
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  { languageOptions: { globals: globals.node } },
  eslintConfigPrettier
);
