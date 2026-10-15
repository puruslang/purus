# 0001: Consolidate compiler tooling into one repository

- Status: accepted
- Date: 2026-10-16
- Tracking issue: #17

## Context

The `puruslang` organization has separate repositories for the compiler (`purus`), `linter`, `prettier-plugin`, `vscode-extension`, `docs`, `playground`, `get-started`, `assets` and `.github`. The language server and the MCP server exist as personal forks. A single language change (for example a new keyword) touches the compiler, linter, prettier plugin, editor grammar, language server and docs, in separate pull requests with separate versions. CI, release, contributing rules and issue templates are duplicated in every repository.

## Decision

Move the language-agnostic TypeScript/JavaScript tooling into `puruslang/purus` as npm workspaces under `packages/`:

| Package | Path |
|---|---|
| `@puruslang/linter` | `packages/linter` |
| `@puruslang/prettier-plugin-purus` | `packages/prettier-plugin` |
| language server (new, written in this repository) `@puruslang/language-server` | `packages/language-server` |
| MCP server (new, written in this repository) `@puruslang/mcp` | `packages/mcp` |

Keep these as separate repositories: `docs`, `playground`, `assets`, `.github`, `get-started`, and every editor integration (`vscode-extension`, the future `vim-purus` and `tree-sitter-purus`). Editor integrations consume the monorepo through published npm packages. Plugin managers, nvim-treesitter, Linguist and the Marketplace expect a repository root, and editor release cadence differs from the compiler's.

The compiler stays at the repository root for now. Moving it to `compiler/` changes `moon` paths and is a separate decision.

## Third-party code

The existing purus-lsp and purus-mcp packages are third-party (not owned by this project, and without a license upstream). They are not imported, forked into this repository or published under their npm names. The language server and the MCP server are written from scratch as @puruslang/language-server and @puruslang/mcp (issues #20 and #21), without copying code from those projects.

## Rules

- Versions are independent per package (semver). Tags are prefixed with the package name (`linter-v1.2.0`); the compiler keeps `vX.Y.Z`.
- npm package names do not change.
- History is preserved with `git subtree add` (merge commits). Migration pull requests must be merged with a merge commit, not squashed.
- One package per pull request. File moves and content changes are separate commits.
- After a package is merged and released from the monorepo, the old repository gets a "moved" notice in its README, its open issues are transferred, and it is archived (not deleted).
- CI uses path filters so that changes to one package do not rebuild the others.

## Consequences

- One pull request can change the compiler and every tool that depends on it.
- Shared CI, release workflow, repository rules and release bot.
- The release workflow and tags must handle multiple packages (tracked in #13).
- Contributors need Node and, for compiler work, the MoonBit toolchain.
