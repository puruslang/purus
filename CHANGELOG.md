# Changelog

Change history for `@puruslang/prettier-plugin-purus`.

---

## v1.0.0 (2026-06-26)

### Initial Release

First stable release as a standalone package, migrated from the `otnc/purus` monorepo.

### Features

- Format Purus code (`.purus`, `.cpurus`, `.mpurus`) using Prettier
- Normalizes indentation, spacing, and trailing whitespace
- Preserves string literal contents (`///...///` and `//;...;//`)
- Supports `[expr]` interpolation syntax
- Configurable via `.prettierrc` (`tabWidth`, `useTabs`)

### Bug Fixes

- Fixed: semicolons inside `//;...;//` strings were incorrectly spaced

### Breaking Changes

- **Node.js ≥ 22 required**
- **Prettier ≥ 3.0 required** (peer dependency)