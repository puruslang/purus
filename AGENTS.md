# Instructions for AI agents

This file is for AI agents (Claude Code, Codex, and others) working in this repository. Human contributors should read [CONTRIBUTING.md](CONTRIBUTING.md), which applies to agents as well.

## Project overview

Purus is a small language that compiles to JavaScript and lets you write code almost without the Shift key. This repository holds the compiler (MoonBit, built to the JS target), the npm wrapper (`bin/`, `pkg/`), the language specification ([RFC.md](RFC.md)) and examples. The linter, prettier plugin, VS Code extension, docs and playground live in other repositories under the `puruslang` organization (see [#17](https://github.com/puruslang/purus/issues/17) for the monorepo plan).

## Language

- Everything written into the repository is in English: code, identifiers, comments, commit messages, branch names, PR and issue text, test names.
- Documentation that has a Japanese counterpart (`*-ja.md`) must be updated in both languages.
- Do not break a sentence across lines in prose (Markdown and code comments). Wrap only at paragraph or list boundaries.
- Do not use full-width punctuation in prose, except `！` and `？`. Use half-width `()` and `:` instead.

## Commands

| Command | Purpose |
|---|---|
| `moon check` | Type check the compiler |
| `moon test` | Run compiler tests (use `moon test --update` to refresh snapshots) |
| `moon fmt` | Format MoonBit code |
| `moon info` | Regenerate `pkg.generated.mbti` interface files |
| `npm run build` | Build the JS compiler and copy it into `pkg/lib/` |
| `npm run check` | Lint, format check, build and typecheck |

Before finishing a change, run `moon info && moon fmt`, then `moon check` and `moon test`. Run `npm run build` when the compiler output or the npm wrapper changed.

## Workflow

- Work from a GitHub issue. Branch from `main` (`feat/...`, `fix/...`, `chore/...`, `docs/...`) and open a pull request. Never push to `main` directly and never merge a pull request unless the maintainer explicitly allows it.
- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`). Do not add `Co-Authored-By` or "Generated with" lines.
- Keep commits focused. Do not mix a file move with a content change, and do not mix a refactor with a behaviour change.
- A language change needs all of: the compiler change with tests, an update to [RFC.md](RFC.md), and a note for the other repositories (linter, prettier plugin, editor grammar, docs).
- When unsure about a design decision that belongs to the maintainer, ask instead of guessing.

## Do not

- Edit generated files by hand: `pkg.generated.mbti`, `pkg/lib/purus-compiler.js`, `_build/`.
- Commit secrets, tokens or personal data. `.env` is ignored.
- Use POSIX-only shell syntax in npm scripts (the maintainer develops on Windows). Use Node scripts instead.
- Add a dependency without a reason stated in the PR.

---

# MoonBit conventions
## Project Structure

- MoonBit packages are organized per directory; each directory contains a
  `moon.pkg` file listing its dependencies. Each package has its files and
  blackbox test files (ending in `_test.mbt`) and whitebox test files (ending in
  `_wbtest.mbt`).

- In the toplevel directory, there is a `moon.mod` file listing module
  metadata.

## Coding convention

- MoonBit code is organized in block style, each block is separated by `///|`,
  the order of each block is irrelevant. In some refactorings, you can process
  block by block independently.

- Try to keep deprecated blocks in file called `deprecated.mbt` in each
  directory.

## Tooling

- `moon fmt` is used to format your code properly.

- `moon ide` provides project navigation helpers like `peek-def`, `outline`, and
  `find-references`. See $moonbit-agent-guide for details.

- `moon info` is used to update the generated interface of the package, each
  package has a generated interface file `.mbti`, it is a brief formal
  description of the package. If nothing in `.mbti` changes, this means your
  change does not bring the visible changes to the external package users, it is
  typically a safe refactoring.

- In the last step, run `moon info && moon fmt` to update the interface and
  format the code. Check the diffs of `.mbti` file to see if the changes are
  expected.

- Run `moon test` to check tests pass. MoonBit supports snapshot testing; when
  changes affect outputs, run `moon test --update` to refresh snapshots.

- Prefer `assert_eq` or `assert_true(pattern is Pattern(...))` for results that
  are stable or very unlikely to change. Use snapshot tests to record current
  behavior. For solid, well-defined results (e.g. scientific computations),
  prefer assertion tests. You can use `moon coverage analyze > uncovered.log` to
  see which parts of your code are not covered by tests.

