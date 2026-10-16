# 変更履歴

`@puruslang/prettier-plugin-purus` の変更履歴。

---

## v1.1.0 (2026/10/16)

### Changes

- TypeScript で書き直し、tsdown でビルドします。ESM と CommonJS の入口、型定義(`formatPurus`、`languages`、`parsers`、`printers`)、`exports` マップに対応しました。`main` は `src/index.js` から `dist/index.cjs` に変わります。`src/` への深いインポートは使えなくなります。
- Purus のモノレポ(puruslang/purus の `packages/prettier-plugin`)に移動しました。
- 未使用の内部コードを削除しました。

---
## v1.0.1 (2026-06-26)

### バグ修正

- README のロゴ URL を修正（puruslang/assets を参照するように）
- npm バッジを `@puruslang/prettier-plugin-purus` のバージョン表示に修正
- `//;...;//` 文字列内のセミコロンに余分なスペースが入る問題を修正

---

## v1.0.0 (2026-06-26)

### 初回リリース

`otnc/purus` モノレポからスタンドアロンパッケージとして分離した最初の安定版リリース。

### 機能

- Prettier で Purus コード（`.purus`・`.cpurus`・`.mpurus`）をフォーマット
- インデント・スペース・末尾空白を正規化
- 文字列リテラル（`///...///` および `//;...;//`）の内容を保持
- `[expr]` 補完構文に対応
- `.prettierrc` での設定（`tabWidth`・`useTabs`）

### バグ修正

- `//;...;//` 文字列内のセミコロンに誤ってスペースが挿入される問題を修正

### 破壊的変更

- **Node.js ≥ 22 必須**
- **Prettier ≥ 3.0 必須**（peer dependency）