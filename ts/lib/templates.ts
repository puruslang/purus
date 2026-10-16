"use strict";

const CONFIG_PURUS = `-- Purus Configuration
const entry be ///src///
const output be ///dist///
const type be ///module///
const header be true

-- Linter settings
const lint.no-var be ///warn///
const lint.no-nil be ///warn///
const lint.bare-assignment be ///error///
const lint.no-function be ///warn///
const lint.no-protected be ///warn///
const lint.no-else-if be ///warn///
const lint.no-js-chars be ///error///
const lint.no-js-operators be ///error///
const lint.no-for-range be ///warn///
const lint.bracket-match be ///error///
const lint.const-reassign be ///error///
const lint.duplicate-use be ///warn///
const lint.indent-size be 2
const lint.max-line-length be ///off///
const lint.no-trailing-whitespace be ///warn///
const lint.no-unused-import be ///warn///
const lint.consistent-naming be ///warn///
`;

const PRETTIERRC =
  JSON.stringify(
    {
      tabWidth: 2,
      semi: false,
      plugins: ["@puruslang/prettier-plugin-purus"],
    },
    null,
    2,
  ) + "\n";

const MAIN_PURUS = `-- main.purus

const message be ///Hello, World///
console.log[message]
`;

const GITIGNORE = `dist/
node_modules/
`;

module.exports = { CONFIG_PURUS, PRETTIERRC, MAIN_PURUS, GITIGNORE };
