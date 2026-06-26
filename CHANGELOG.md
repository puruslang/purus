# Changelog

Change history for `@puruslang/linter`.

---

## v1.0.0 (2026-06-26)

### Initial Release

First stable release as a standalone package, migrated from the `otnc/purus` monorepo.

### Features

- Static analysis for `.purus`, `.cpurus`, and `.mpurus` files
- CLI: `purus-lint [files|dirs]`
- Configurable rules via `config.purus`

### Rules

| Rule | Default | Description |
|---|---|---|
| `no-var` | `warn` | Avoid `var`; use `const` or `let` |
| `bare-assignment` | `error` | Bare identifier assignment is not supported |
| `no-nil` | `warn` | Use `null` instead of `nil` |
| `no-function` | `warn` | `function` is deprecated; use `fn` |
| `no-protected` | `warn` | `protected` is deprecated; use `private` |
| `no-else-if` | `warn` | Use `elif` instead of `else if` |
| `no-js-chars` | `error` | JavaScript-only characters are not allowed |
| `no-js-operators` | `error` | JavaScript-only operators are not allowed |
| `no-for-range` | `warn` | `for ... in range` is deprecated |
| `bracket-match` | `error` | Unmatched `[` or `]` |
| `const-reassign` | `error` | Cannot reassign a `const` variable |
| `duplicate-use` | `warn` | Duplicate `use` import |
| `indent-size` | `warn` | Indentation must be consistent |
| `no-trailing-whitespace` | `warn` | No trailing whitespace |
| `no-unused-import` | `warn` | Unused imports |
| `consistent-naming` | `warn` | Enforce kebab-case identifiers |
| `max-line-length` | `off` | Maximum line length |

### Breaking Changes

- **Node.js ≥ 22 required**