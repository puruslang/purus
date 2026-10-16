# Purus への貢献ガイド

Purus に興味を持っていただきありがとうございます！

[English version](https://github.com/puruslang/purus/blob/main/CONTRIBUTING.md)

## このリポジトリについて

**Purus コンパイラ**（MoonBit 製）と**サンプルコード**を含むリポジトリです。

```
puruslang/purus
├── src/          # コンパイラソース (MoonBit)
├── ts/           # npm ラッパー(CLI と API、TypeScript)
├── stdlib/       # 標準ライブラリ(p-*.cjs)
├── bin/          # CLI エントリポイント
├── scripts/      # ビルド・同期スクリプト
├── examples/     # サンプル .purus ファイル
├── moon.mod # MoonBit モジュール定義
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
npm run build
```

## 開発

| コマンド | 説明 |
|---|---|
| `moon test` | 全テストの実行 |
| `moon check` | 型チェック |
| `npm run build` | フルビルド（コンパイル + コピー）|
| `npm run sync` | バージョンを moon.mod に同期 |

## プルリクエストの提出

1. リポジトリをフォークし、`main` からブランチを作成
2. 変更を加える
3. `moon test` を実行 — 全テストがパスすること
4. 明確な説明を添えて PR を提出

## 規約

- コード、コメント、コミットメッセージ、PR の文章は英語で書きます。
- コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/) に従います(`feat:`、`fix:`、`refactor:`、`docs:`、`chore:`、`test:`)。
- ブランチ名は `feat/...`、`fix/...`、`chore/...`、`docs/...` にします。`main` は保護される予定で、変更はプルリクエストで取り込みます。
- コミットは関心ごとに分けます。ファイルの移動と中身の変更、リファクタと挙動の変更は混ぜません。
- コミットの前に `moon info && moon fmt` を実行し、`.mbti` の差分を確認します。
- 言語仕様を変えるときは、テスト、`RFC.md` の更新、linter、prettier plugin、エディタの文法、docs へのフォローアップ Issue が必要です。
- AI エージェントは [AGENTS.md](AGENTS.md) に従います。

## リリース

リリースはメンテナーが行います。手動実行のワークフローと npm Trusted Publishing に移行する予定です([#13](https://github.com/puruslang/purus/issues/13)、[#14](https://github.com/puruslang/purus/issues/14))。それまでは `v*` タグ(例: `v1.1.0`)をプッシュすると npm に公開されます。
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