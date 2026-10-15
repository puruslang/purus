# purus-lsp

[Purus](https://github.com/otoneko1102/purus) 言語の Language Server Protocol (LSP) サーバー。

エディタ非依存で動作し、LSP 対応エディタすべてで Purus のエラー表示・フォーマットを提供します。

## 機能

- **診断 (Diagnostics)**: コンパイルエラー・lint 警告をリアルタイムに表示
- **フォーマット (Formatting)**: prettier-plugin-purus による自動整形

## インストール

```bash
npm install -g purus-lsp
```

または、リポジトリをクローンしてビルド：

```bash
git clone https://github.com/kqnade/purus-lsp.git
cd purus-lsp
npm install
npm run build
```

## エディタ設定

### Neovim (nvim-lspconfig)

```lua
local lspconfig = require("lspconfig")
local configs = require("lspconfig.configs")

if not configs["purus"] then
  configs["purus"] = {
    default_config = {
      cmd = { "purus-lsp", "--stdio" },
      filetypes = { "purus" },
      root_dir = function(fname)
        return lspconfig.util.find_git_ancestor(fname) or vim.fn.getcwd()
      end,
    },
  }
end

lspconfig["purus"].setup({})
```

`.purus` ファイルの filetype を設定：

```lua
vim.filetype.add({
  extension = {
    purus = "purus",
    cpurus = "purus",
    mpurus = "purus",
  },
})
```

### VS Code

`.vscode/settings.json` に以下を追加：

```json
{
  "languageserver": {
    "purus": {
      "command": "purus-lsp",
      "args": ["--stdio"],
      "filetypes": ["purus"]
    }
  }
}
```

### Cursor

Cursor は VS Code ベースのため、同様の設定が使えます。

### Zed

`settings.json` に以下を追加：

```json
{
  "lsp": {
    "purus-lsp": {
      "binary": {
        "path": "purus-lsp",
        "arguments": ["--stdio"]
      }
    }
  },
  "languages": {
    "Purus": {
      "language_servers": ["purus-lsp"]
    }
  }
}
```

## 関連プロジェクト

- [purus](https://github.com/otoneko1102/purus) - Purus コンパイラ本体
- [@puruslang/linter](https://www.npmjs.com/package/@puruslang/linter) - Purus リンター
- [@puruslang/prettier-plugin-purus](https://www.npmjs.com/package/@puruslang/prettier-plugin-purus) - Prettier プラグイン

## ライセンス

Apache-2.0
