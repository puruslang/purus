# 変更履歴

`@puruslang/prettier-plugin-purus` の変更履歴。

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