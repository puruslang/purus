# Purus への貢献ガイド

Purus に興味を持っていただきありがとうございます！

[English version](https://github.com/puruslang/purus/blob/main/CONTRIBUTING.md)

## このリポジトリについて

**Purus コンパイラ**（MoonBit 製）と**サンプルコード**を含むリポジトリです。

```
puruslang/purus
├── src/          # コンパイラソース (MoonBit)
├── pkg/          # npm パッケージ出力
├── bin/          # CLI エントリポイント
├── scripts/      # ビルド・同期スクリプト
├── examples/     # サンプル .purus ファイル
├── moon.mod.json # MoonBit モジュール定義
└── package.json
```

## 必要な環境

- [Node.js](https://nodejs.org/) >= 22
- [MoonBit](https://www.moonbitlang.com/)
- [Git](https://git-scm.com/)

## 始め方

```sh
git clone https://github.com/puruslang/purus.git
cd purus
moon update        # MoonBit 依存関係のインストール
moon build --target js
node scripts/build.js
```

## 開発

| コマンド | 説明 |
|---|---|
| `moon test` | 全テストの実行 |
| `moon check` | 型チェック |
| `npm run build` | フルビルド（コンパイル + コピー）|
| `npm run sync` | バージョンを moon.mod.json に同期 |

## プルリクエストの提出

1. リポジトリをフォークし、`main` からブランチを作成
2. 変更を加える
3. `moon test` を実行 — 全テストがパスすること
4. 明確な説明を添えて PR を提出

## リリース

`v*` タグ（例: `v1.1.0`）をプッシュすると、自動的に npm に公開されます。

## 関連リポジトリ

| リポジトリ | 説明 |
|---|---|
| [puruslang/docs](https://github.com/puruslang/docs) | ドキュメントサイト |
| [puruslang/linter](https://github.com/puruslang/linter) | 静的解析ツール |
| [puruslang/prettier-plugin](https://github.com/puruslang/prettier-plugin) | コードフォーマッター |
| [puruslang/vscode-extension](https://github.com/puruslang/vscode-extension) | VS Code 拡張機能 |

## 行動規範

[CODE_OF_CONDUCT-ja.md](CODE_OF_CONDUCT-ja.md) を参照してください。

## ライセンス

貢献いただいたコードは [Apache 2.0 ライセンス](LICENSE) のもとで公開されます。