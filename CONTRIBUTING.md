# Contributing to Purus

Thank you for your interest in contributing to Purus! This guide will help you get started.

[日本語版はこちら](https://github.com/puruslang/purus/blob/main/CONTRIBUTING-ja.md)

## Project Structure

```
purus/
├── core/           # Compiler (MoonBit → JavaScript)
├── linter/         # Linter (@puruslang/linter)
├── prettier-plugin/# Prettier plugin (@puruslang/prettier-plugin-purus)
├── extension/      # VS Code extension
├── pages/          # Documentation site (Astro Starlight)
├── examples/       # Sample Purus code
└── docs/           # Built documentation (auto-generated)
```

## Prerequisites

- [Node.js >= 22
- [MoonBit](https://www.moonbitlang.com/) (for compiler development)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Fork & Clone

```sh
git clone https://github.com/<your-username>/purus.git
cd purus
```

### 2. Build the Compiler

```sh
cd core
npm install
npm run build
```

This runs `moon build --target js` and then copies the output.

### 3. Run Tests

```sh
cd core
moon test
```

All tests must pass before submitting a PR.

## Development Workflows

### Compiler (`core/`)

The compiler is written in [MoonBit](https://www.moonbitlang.com/).

| Command | Description |
|---|---|
| `moon test` | Run all tests |
| `moon check` | Type check |
| `npm run build` | Full build (compile + copy) |

### Linter (`linter/`)

```sh
cd linter
npm install
```

### Prettier Plugin (`prettier-plugin/`)

```sh
cd prettier-plugin
npm install
```

### VS Code Extension (`extension/`)

Open the `extension/` folder in VS Code and press `F5` to launch the extension development host.

### Documentation (`pages/`)

```sh
cd pages
npm install
npx astro dev
```

The site is available at `http://localhost:4321`. Documentation is bilingual (English and Japanese).

## How to Contribute

### Reporting Bugs

Open an [issue](https://github.com/puruslang/purus/issues) with:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Purus version (`purus version`)

### Suggesting Features

Open an [issue](https://github.com/puruslang/purus/issues) describing:

- The feature you'd like
- Why it would be useful
- Example Purus code showing the syntax

### Submitting Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Add tests if applicable
4. Run `moon test` and make sure all tests pass
5. Submit a PR with a clear description

### Documentation

Documentation lives in `pages/src/content/docs/`. It is bilingual:

- English: `pages/src/content/docs/`
- Japanese: `pages/src/content/docs/ja/`

When updating docs, please update both languages.

## Code Style

- **Purus code**: Use kebab-case for identifiers (e.g., `my-variable`)
- **MoonBit code**: Follow standard MoonBit conventions
- **JavaScript**: Standard style

## Release Process

Releases are managed via git tags:

| Package | Tag Format |
|---|---|
| Core (purus) | `v*` (e.g., `v0.4.0`) |
| Linter | `linter-v*` (e.g., `linter-v0.3.0`) |
| Prettier Plugin | `prettier-plugin-v*` |
| VS Code Extension | via workflow |
| Documentation | auto-deployed on push to `main` |

## Code of Conduct

This project adheres to a [Code of Conduct](https://github.com/puruslang/purus/blob/main/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the [Apache 2.0 License](https://github.com/puruslang/purus/blob/main/LICENSE).
