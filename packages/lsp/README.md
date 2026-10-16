# @puruslang/lsp

Language Server (LSP over stdio) for [Purus](https://purus.work).

```sh
npx @puruslang/lsp --stdio   # or the `puruslang-lsp` binary
```

Features: diagnostics (linter rules plus compiler syntax errors with line and column), keyword and `use p-*` completion, keyword hover, document formatting (the Prettier plugin). Written from scratch for this project.

Neovim (0.11+):

```lua
vim.lsp.config("purus", { cmd = { "puruslang-lsp", "--stdio" }, filetypes = { "purus" } })
vim.lsp.enable("purus")
```

Planned: go to definition, references, rename, semantic tokens (see puruslang/purus#20).
