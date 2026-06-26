# Purus への貢献ガイド

Purus に興味を持っていただきありがとうございます！このガイドでは、貢献の方法を説明します。

[English version](https://github.com/puruslang/purus/blob/main/CONTRIBUTING.md)

## プロジェクト構成

```
purus/
├── core/            # コンパイラ (MoonBit → JavaScript)
├── linter/          # リンター (@puruslang/linter)
├── prettier-plugin/ # Prettier プラグイン (@puruslang/prettier-plugin-purus)
├── extension/       # VS Code 拡張機能
├── pages/           # ドキュメントサイト (Astro Starlight)
├── examples/        # サンプルコード
└── docs/            # ビルド済みドキュメント (自動生成)
```

## 必要な環境

- [Node.js >= 22
- [MoonBit](https://www.moonbitlang.com/) (コンパイラ開発の場合)
- [Git](https://git-scm.com/)

## 始め方

### 1. Fork & Clone

```sh
git clone https://github.com/<your-username>/purus.git
cd purus
```

### 2. コンパイラのビルド

```sh
cd core
npm install
npm run build
```

`moon build --target js` を実行し、出力をコピーします。

### 3. テストの実行

```sh
cd core
moon test
```

PR を提出する前に、すべてのテストがパスしていることを確認してください。

## 開発ワークフロー

### コンパイラ (`core/`)

コンパイラは [MoonBit](https://www.moonbitlang.com/) で書かれています。

| コマンド | 説明 |
|---|---|
| `moon test` | 全テストの実行 |
| `moon check` | 型チェック |
| `npm run build` | フルビルド (コンパイル + コピー) |

### リンター (`linter/`)

```sh
cd linter
npm install
```

### Prettier プラグイン (`prettier-plugin/`)

```sh
cd prettier-plugin
npm install
```

### VS Code 拡張機能 (`extension/`)

VS Code で `extension/` フォルダを開き、`F5` を押して拡張機能開発ホストを起動します。

### ドキュメント (`pages/`)

```sh
cd pages
npm install
npx astro dev
```

`http://localhost:4321` でサイトを確認できます。ドキュメントは英語と日本語の二言語対応です。

## 貢献の方法

### バグ報告

[Issue](https://github.com/puruslang/purus/issues) を作成し、以下を記載してください：

- 問題の明確な説明
- 再現手順
- 期待される動作と実際の動作
- Purus のバージョン (`purus version`)

### 機能提案

[Issue](https://github.com/puruslang/purus/issues) を作成し、以下を記載してください：

- 提案する機能の内容
- なぜその機能が有用か
- 構文を示す Purus コードの例

### プルリクエストの提出

1. `main` からフィーチャーブランチを作成
2. 変更を加える
3. 必要に応じてテストを追加
4. `moon test` を実行し、全テストがパスすることを確認
5. 明確な説明を添えて PR を提出

### ドキュメント

ドキュメントは `pages/src/content/docs/` にあります。二言語対応です：

- 英語: `pages/src/content/docs/`
- 日本語: `pages/src/content/docs/ja/`

ドキュメントを更新する際は、両方の言語を更新してください。

## コードスタイル

- **Purus コード**: 識別子にはケバブケースを使用（例: `my-variable`）
- **MoonBit コード**: 標準的な MoonBit の規約に従う
- **JavaScript**: 標準スタイル

## リリースプロセス

リリースは git タグで管理されます：

| パッケージ | タグ形式 |
|---|---|
| Core (purus) | `v*` (例: `v0.4.0`) |
| Linter | `linter-v*` (例: `linter-v0.3.0`) |
| Prettier Plugin | `prettier-plugin-v*` |
| VS Code 拡張機能 | ワークフローで管理 |
| ドキュメント | `main` へのプッシュで自動デプロイ |

## 行動規範

このプロジェクトは[行動規範 (Code of Conduct)](https://github.com/puruslang/purus/blob/main/CODE_OF_CONDUCT-ja.md) に従っています。参加することで、この規範を守ることが求められます。

## ライセンス

貢献していただいたコードは [Apache 2.0 ライセンス](https://github.com/puruslang/purus/blob/main/LICENSE) のもとで公開されます。
