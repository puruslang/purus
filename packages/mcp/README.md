# purus-mcp

[Purus](https://github.com/otoneko1102/purus) 言語のための MCP (Model Context Protocol) サーバーです。
Claude Desktop や Claude Code から Purus コードをコンパイル・実行できます。

> **注意:** このサーバーはローカル専用です。一時ファイルへの書き込みとNode.jsプロセスの実行を行うため、信頼できる環境でのみ使用してください。

## インストール

```bash
git clone https://github.com/kqnade/purus-mcp
cd purus-mcp
npm install
npm run build
```

## Claude Desktop への登録

`~/Library/Application Support/Claude/claude_desktop_config.json`（macOS）または
`%APPDATA%\Claude\claude_desktop_config.json`（Windows）に以下を追加します:

```json
{
  "mcpServers": {
    "purus": {
      "command": "node",
      "args": ["/path/to/purus-mcp/dist/index.js"]
    }
  }
}
```

`/path/to/purus-mcp` は実際のクローン先パスに変更してください。

## ツール一覧

### `compile`

Purus コードを JavaScript にコンパイルします。

**入力:**
- `code` (string, 必須): Purus ソースコード

**例:**
```purus
const x be 42
console.log[x]
```

### `run`

Purus コードをコンパイルして実行し、標準出力を返します。

**入力:**
- `code` (string, 必須): Purus ソースコード
- `timeout` (number, 省略可): タイムアウト（ミリ秒）。デフォルト 5000、最大 10000

**例:**
```purus
console.log[1 add 2]
```
→ 出力: `3`

### `version`

インストールされている Purus のバージョンを返します。

## Purus 言語サンプル

Purus は Shift キー不要で書ける JavaScript の代替言語です。

```purus
-- 変数宣言
const x be 42
let name be ///world///

-- 演算子（記号なし）
console.log[1 add 2]  -- 3
console.log[10 sub 3] -- 7
console.log[4 mul 5]  -- 20
console.log[10 div 2] -- 5

-- 比較
if x eq 42
  console.log[///yes///]

-- 配列
const arr be [1, 2, 3]
arr.forEach[
  fn item
    console.log[item]
]
```

## 開発

```bash
npm run dev   # ts-node で直接実行
npm run build # TypeScript をコンパイル
npm start     # ビルド済みサーバーを起動
```
