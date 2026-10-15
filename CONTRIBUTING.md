# Contributing to Purus

Thank you for your interest in contributing!

[日本語版はこちら](https://github.com/puruslang/purus/blob/main/CONTRIBUTING-ja.md)

## Repository

This repository contains the **Purus compiler** (written in MoonBit) and **example code**.

```
puruslang/purus
├── src/          # Compiler source (MoonBit)
├── pkg/          # Published npm package output
├── bin/          # CLI entry point
├── scripts/      # Build & sync scripts
├── packages/     # Tooling workspaces (linter, ...), see docs/adr/0001-monorepo.md
├── examples/     # Sample .purus files
├── moon.mod # MoonBit module definition
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [MoonBit](https://www.moonbitlang.com/)
- [Git](https://git-scm.com/)

## Getting Started

```sh
git clone https://github.com/puruslang/purus.git
cd purus
moon update        # install MoonBit dependencies
moon build --target js
node scripts/build.js
```

## Development

| Command | Description |
|---|---|
| `moon test` | Run all tests |
| `moon check` | Type check |
| `npm run build` | Full build (compile + copy) |
| `npm run sync` | Sync version to moon.mod |

## Submitting Pull Requests

1. Fork the repository and create a branch from `main`
2. Make your changes
3. Run `moon test` — all tests must pass
4. Open a PR with a clear description

## Conventions

- Write code, comments, commit messages and PR text in English.
- Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`).
- Branch names: `feat/...`, `fix/...`, `chore/...`, `docs/...`. `main` is protected and changes land through pull requests.
- Keep commits focused: do not mix a file move with a content change, or a refactor with a behaviour change.
- Run `moon info && moon fmt` before committing and check the `.mbti` diff.
- A language change needs tests, an update to `RFC.md`, and follow-up issues for the linter, prettier plugin, editor grammar and docs.
- AI agents follow [AGENTS.md](AGENTS.md).

## Release

Releases are cut by maintainers. The release procedure is being moved to a manually triggered workflow with npm Trusted Publishing (see [#13](https://github.com/puruslang/purus/issues/13) and [#14](https://github.com/puruslang/purus/issues/14)). Until then, pushing a `v*` tag (for example `v1.1.0`) publishes to npm.
## Other Repositories

| Repo | Description |
|---|---|
| [puruslang/docs](https://github.com/puruslang/docs) | Documentation site |
| [puruslang/linter](https://github.com/puruslang/linter) | Static analysis tool |
| [puruslang/prettier-plugin](https://github.com/puruslang/prettier-plugin) | Code formatter |
| [puruslang/vscode-extension](https://github.com/puruslang/vscode-extension) | VS Code extension |

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the [Apache 2.0 License](LICENSE).