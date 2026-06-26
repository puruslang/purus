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
├── examples/     # Sample .purus files
├── moon.mod.json # MoonBit module definition
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
| `npm run sync` | Sync version to moon.mod.json |

## Submitting Pull Requests

1. Fork the repository and create a branch from `main`
2. Make your changes
3. Run `moon test` — all tests must pass
4. Open a PR with a clear description

## Release

Releases are triggered by pushing a `v*` tag (e.g., `v1.1.0`), which publishes to npm automatically.

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