---
name: purus-compiler-dev
description: Work on the Purus compiler (MoonBit) - add or change syntax, fix lexer/parser/codegen bugs, update tests and the language spec. Use when editing files under src/, RFC.md or the generated interfaces.
---

# Purus compiler development

## Layout

```
src/lexer/    tokens and the lexer (token.mbt, lexer.mbt)
src/parser/   AST (ast.mbt) and recursive-descent parser (parser.mbt, parser_expr.mbt)
src/codegen/  JavaScript generation (codegen.mbt, codegen_expr.mbt)
src/cmd/main/ CLI entry, built to JS and copied into packages/purus/dist/purus-compiler.js
packages/     npm packages (pnpm workspace; the repository root is the private purus-monorepo)
  purus/      CLI and API (ts/, bundled by tsdown into dist/) and the standard library (stdlib/*.cjs, read as text by ts/lib/stdlib.ts)
  linter/ prettier-plugin/ lsp/ mcp/
RFC.md        language specification
examples/     sample .purus files
```

Pipeline: source -> `Lexer::tokenize` -> `Parser::parse` -> `JsCodegen::generate`. The standard library (`p-*`) is not compiled: codegen emits a marker comment and `packages/purus/ts/lib/stdlib.ts` replaces it with code from `packages/purus/stdlib/*.cjs`.

## Commands

```sh
moon check                 # type check, must have 0 errors and 0 warnings
moon test --target js      # all tests (needs Node on PATH)
pnpm install               # dependencies (pnpm workspace: root, packages/linter, packages/prettier-plugin)
pnpm run test:packages     # tests of all packages (needs pnpm run build first)
moon info                  # regenerate pkg.generated.mbti; review the diff
pnpm run build             # moon build --target js + tsdown + copy the compiler to packages/purus/dist/
node packages/purus/dist/cli.cjs build --stdout file.purus   # inspect generated JS
```

Do not run `moon fmt` and commit its output together with a functional change: the formatter of recent toolchains rewrites many files (for example `Int` to `Int32`). Format in a dedicated commit.

## Adding or changing syntax (checklist)

1. Add tokens in `token.mbt` and lex them in `lexer.mbt` (keywords also go in the keyword table and in `keyword_text` in `parser.mbt` so they can be used as property names).
2. Extend the AST in `ast.mbt`; update every walker that matches on it (for example the `*_has_yield` functions in `codegen.mbt`). A missing arm silently drops the node.
3. Parse it in `parser.mbt` / `parser_expr.mbt`; report errors with `self.errors`, not by panicking.
4. Generate JS in `codegen.mbt` / `codegen_expr.mbt`.
5. Tests: lexer tests (`lexer_test.mbt`, `lexer_wbtest.mbt`), parser feature tests (`feature_wbtest.mbt`), codegen tests (`codegen_test.mbt`, `integration_test.mbt`). Prefer `assert_eq` on the generated JS for stable outputs; use snapshots only for large outputs.
6. Document it in `RFC.md` (keyword table, grammar summary) and add an example when useful.
7. Open follow-up issues for the other repositories: linter, prettier plugin, editor grammar, language server, docs.

## Pitfalls

- Test sources are Purus strings inside MoonBit: escape backslashes (`\\.` for the optional dot).
- Keywords are reserved: a test function named `add` or `range` will not parse as a name.
- `fn x to expr` does not return the value; tests that need a return use `to return expr` (see issue #60).
- The generated `dist/` and `_build/` are build outputs; never edit them.
- On Windows PowerShell, Node may be missing from PATH (fnm); run `fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression` first.
