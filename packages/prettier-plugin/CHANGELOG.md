# Changelog

Change history for `@puruslang/prettier-plugin-purus`.

---

## v1.1.0 (2026-10-16)

### Changes

- Rewritten in TypeScript and built with tsdown: ESM and CommonJS entry points with type declarations (`formatPurus`, `languages`, `parsers`, `printers`), `exports` map. `main` moved from `src/index.js` to `dist/index.cjs`. Deep imports into `src/` no longer exist.
- Moved into the Purus monorepo (`packages/prettier-plugin` in puruslang/purus).
- Removed unused internal code.

---
## v1.0.1 (2026-06-26)

### Bug Fixes

- Fixed logo URL in README (now references puruslang/assets)
- Fixed npm badge to show `@puruslang/prettier-plugin-purus` version
- Fixed `//;...;//` string formatting: semicolons inside strings no longer get extra spaces

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