# 変更履歴

`@puruslang/linter` の変更履歴。

---

## v1.0.1 (2026-06-26)

### バグ修正

- README のロゴ URL を修正（puruslang/assets を参照するように）
- npm バッジを @puruslang/linter のバージョン表示に修正

---

## v1.0.0 (2026-06-26)

### 初回リリース

`otnc/purus` モノレポからスタンドアロンパッケージとして分離した最初の安定版リリース。

### 機能

- `.purus`・`.cpurus`・`.mpurus` ファイルの静的解析
- CLI: `purus-lint [ファイル|ディレクトリ]`
- `config.purus` によるルール設定

### ルール

| ルール | デフォルト | 説明 |
|---|---|---|
| `no-var` | `warn` | `var` を避け `const` または `let` を使用 |
| `bare-assignment` | `error` | 裸の識別子代入はサポートされていません |
| `no-nil` | `warn` | `nil` の代わりに `null` を使用 |
| `no-function` | `warn` | `function` は非推奨。`fn` を使用 |
| `no-protected` | `warn` | `protected` は非推奨。`private` を使用 |
| `no-else-if` | `warn` | `else if` の代わりに `elif` を使用 |
| `no-js-chars` | `error` | JavaScript 専用文字は使用不可 |
| `no-js-operators` | `error` | JavaScript 専用演算子は使用不可 |
| `no-for-range` | `warn` | `for ... in range` は非推奨 |
| `bracket-match` | `error` | `[` または `]` の対応が取れていない |
| `const-reassign` | `error` | `const` 変数への再代入は不可 |
| `duplicate-use` | `warn` | `use` インポートの重複 |
| `indent-size` | `warn` | インデントの一貫性 |
| `no-trailing-whitespace` | `warn` | 末尾空白なし |
| `no-unused-import` | `warn` | 未使用インポート |
| `consistent-naming` | `warn` | kebab-case 識別子の強制 |
| `max-line-length` | `off` | 最大行長 |

### 破壊的変更

- **Node.js ≥ 22 必須**