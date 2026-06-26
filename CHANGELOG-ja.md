# Changelog

Purus の構文・仕様・予約語に関する変更履歴です。

---

## v0.11.0 (2026/06/26)

### New Features

- **`blank` キーワード（ワイルドカード）**: 関数パラメータやパターンマッチのアームで使用できるワイルドカードキーワードを追加しました。Purus の「Shiftキー不要の英語キーワード」という設計理念に基づき、他言語でよく使われる `_`（アンダースコア）の代替として導入されました。

  **関数パラメータとして使用：**
  ```purus
  -- コールバックの最初の引数（要素）を無視してインデックスだけ使う
  const indices be Array.from[[length be 5]; fn blank; i to i]
  ```
  ```js
  const indices = Array.from({ length: 5 }, (_, i) => i);
  ```

  複数の `blank` を使う場合、JSでは `_`・`_1`・`_2`… と連番になります（strictモードの重複パラメータエラーを回避）：
  ```purus
  fn f blank; blank; x to x
  ```
  ```js
  function f(_, _1, x) { return x; }
  ```

  **`switch` / `match` のcatch-allアームとして使用：**
  ```purus
  switch status
    case ///ok/// then ///good///
    case blank then ///unknown///
  ```

- **`//;text;//` セミコロン文字列構文**: `///text///` の代替として追加されました。URLとの視覚的な混乱を避けるために設計されています。`;` を内側のデリミタとして使うため、内部の `//`（例: `https://`）が終端デリミタ `;//` と衝突しません。補完 `[expr]` とも役割が明確に分離されています。`///...///` と同様に `[expr]` 補完とエスケープシーケンスをサポートします。

  ```purus
  const url be //;https://api.example.com/v1;//
  const msg be //;こんにちは、[name]さん！;//
  ```

  `;//` を内容に含める場合は `\;` でエスケープ：
  ```purus
  const s be //;end\;// here;//   -- "end;// here"
  ```

---

## v0.10.1 (2026/05/09)

### New Features

- **`purus config` コマンド**: 現在のディレクトリにデフォルト設定の `config.purus` を生成します。`config.purus` が既に存在する場合は上書きするか確認します。
  ```sh
  purus config
  ```

- **`purus init` の強化**: `src/main.purus` に加え、`config.purus`・`.prettierrc`・`.gitignore` も生成するようになりました。`package.json` が存在する場合はビルド・リント用スクリプトを自動追加します。既存ファイルはすべてスキップされます。

  | ファイル | 動作 |
  |---|---|
  | `config.purus` | 存在しない場合に作成 |
  | `.prettierrc` | 存在しない場合に作成 |
  | `.gitignore` | 存在しない場合に作成 |
  | `src/main.purus` | 存在しない場合に作成 |
  | `package.json` | 存在する場合にスクリプトを追加 |

---

## v0.10.0 (2026/05/09)

### Breaking Changes

- **Node.js ≥ 20 必須**: Node.js の最低サポートバージョンが v18 から v20 に引き上げられました。それ以前のバージョンはサポートされなくなりました。

- **裸の変数代入を廃止**: 宣言キーワード（`const`/`let`/`var`）なしの識別子代入（`x be 42`）はサポートされなくなりました。Node.js の `process` など実行環境が提供するグローバル変数との競合・暗黙のグローバル変数生成を防ぐための変更です。
  - プロパティ代入（`obj.field be val`、`this.x be val`）は引き続き有効
  - 配列インデックス代入（`arr[\i] be val`）は引き続き有効
  - 複合代入演算子（`x add be 1`、`x sub be 1` 等）は引き続き有効
  ```purus
  -- 廃止 (v0.9.x まで):
  x be 42

  -- 代わりに:
  const x be 42   -- 不変
  let x be 42     -- 可変

  -- これらは引き続き有効:
  obj.field be ///new value///
  arr[\i] be 0
  x add be 1
  ```

### New Features

- **宣言キーワード付きドット代入の自動オブジェクト初期化**: `const obj.prop be val`、`let obj.prop be val`、`var obj.prop be val` を使用した際に、`obj` がまだ宣言されていない場合は対応する宣言キーワードで `{}` に初期化します。同名変数に対する重複初期化は発生しません。宣言キーワードなし（`obj.prop be val`）の挙動は従来通りです。
  ```purus
  const p.x be 10
  const p.y be 20
  -- const p = {};
  -- p.x = 10;
  -- p.y = 20;

  let cfg.host be ///localhost///
  let cfg.port be 3000
  -- let cfg = {};
  -- cfg.host = "localhost";
  -- cfg.port = 3000;
  ```

---

## v0.9.1 (2026/05/07)

### バグ修正

- **`config.purus` のビルド除外**: ビルド処理において `config.purus` がソースファイルとして誤って処理されてしまう問題を修正しました。
- **宣言キーワード付きプロパティ代入**: `const obj.prop be val` のようにドット記法のプロパティへの代入を宣言キーワードと組み合わせて書けるよう修正しました。プロパティ代入 `obj.prop = val` にコンパイルされます。
  ```purus
  const this.x be 10    -- this.x = 10
  let obj.prop be 42    -- obj.prop = 42
  ```

### 内部変更

- **ディレクトリ構造の再編**: `core/` 内のソースファイルを `src/lexer/`、`src/parser/`、`src/codegen/`、`src/cmd/main/`、`pkg/` にそれぞれ移動しました。

---

## v0.9.0 (2026-04-21)

### Breaking Changes

- **`is` キーワード削除**: `is` キーワード（`eq` のエイリアス）を削除しました。代わりに `eq` を使用してください。`is` は予約語ではなくなりました。
  ```purus
  -- 変更前 (v0.8.x):
  x is y           -- x === y
  x is string      -- x === string

  -- 変更後 (v0.9.0):
  x eq y           -- x === y
  typeof x eq ///string///  -- typeof x === "string"
  ```

### New Features

- **`use ... [as ...]` による標準ライブラリ**: `use` キーワードで Purus 組み込み標準ライブラリモジュールをインポート。すべてのモジュール名に `p-` プレフィックスが付いており、予約語との競合を防止します。`as` は任意で、省略時はモジュール名がそのままバインディング名になります。ツリーシェイキングにより使用した関数のみが出力に含まれます。
  ```purus
  use p-random as r
  r.randint[1; 10]              -- 1〜10のランダムな整数
  r.gauss[0; 1]                 -- ガウス分布
  r.choice[list[1; 2; 3]]      -- 配列からランダムな要素
  r.shuffle[list[1; 2; 3]]     -- 配列のシャッフルコピー

  use p-math as m
  m.floor[3.7]                  -- 3
  m.pi                          -- 3.14159...
  m.abs[-5]                     -- 5

  use p-string as s
  s.upper[///hello///]           -- ///HELLO///
  s.reverse[///abc///]           -- ///cba///
  s.words[///foo bar baz///]     -- [///foo///; ///bar///; ///baz///]

  use p-datetime as dt
  dt.now[]                       -- 現在のタイムスタンプ（ms）
  dt.year[dt.now[]]              -- 現在の年
  dt.toiso[dt.now[]]             -- ISO 8601 文字列

  use p-json as j
  j.parse[///{ "a": 1 }///]     -- { a: 1 }
  j.stringify[obj]               -- JSON 文字列

  use p-object as o
  o.keys[obj]                    -- オブジェクトのキー
  o.merge[a; b]                  -- オブジェクトのマージ

  use p-number as n
  n.isinteger[42]                -- true
  n.clamp[15; 0; 10]             -- 10

  use p-array as a
  a.unique[list[1; 2; 2; 3]]    -- [1; 2; 3]
  a.chunk[list[1; 2; 3; 4]; 2]  -- [[1; 2]; [3; 4]]

  use p-error as e
  e.create[///何かがおかしい///]
  e.iserror[err]                 -- true
  ```

  利用可能な標準ライブラリモジュール:
  | モジュール | 説明 |
  |--------|-------------|
  | `p-random` | `random`, `randint`, `randrange`, `randbool`, `getrandbits`, `randbytes`, `uniform`, `triangular`, `gauss`, `normalvariate`, `expovariate`, `gammavariate`, `betavariate`, `lognormvariate`, `vonmisesvariate`, `paretovariate`, `weibullvariate`, `choice`, `choices`, `wchoices`, `shuffle`, `sample`, `binomial`, `poisson`, `geometric`, `clamp`, `lerp` |
  | `p-math` | JS `Math` エイリアス＋小文字の定数エイリアス（`pi`, `e`, `ln2`, `ln10`, `sqrt2` など） |
  | `p-string` | `len`, `contains`, `startswith`, `endswith`, `indexof`, `count`, `upper`, `lower`, `capitalize`, `title`, `trim`, `trimstart`, `trimend`, `reverse`, `repeat`, `replace`, `replacefirst`, `padstart`, `padend`, `split`, `lines`, `words`, `join`, `chars`, `slice`, `charat`, `codeat`, `fromcode` |
  | `p-datetime` | `now`, `today`, `timestamp`, `create`, `utccreate`, `fromiso`, `year`, `month`, `day`, `weekday`, `hour`, `minute`, `second`, `ms`, `utcyear`, `utcmonth`, `utcday`, `utcweekday`, `utchour`, `utcminute`, `utcsecond`, `utcms`, `tzyear`, `tzmonth`, `tzday`, `tzweekday`, `tzhour`, `tzminute`, `tzsecond`, `toiso`, `tolocale`, `todate`, `totime`, `format`, `addms`, `addseconds`, `addminutes`, `addhours`, `adddays`, `diff`, `diffdays`, `diffhours`, `diffminutes`, `diffseconds`, `offset`, `localtz` |
  | `p-json` | `parse`, `stringify`, `prettify` |
  | `p-object` | `keys`, `values`, `entries`, `fromentries`, `assign`, `freeze`, `seal`, `isfrozen`, `issealed`, `hasown`, `create`, `is`, `len`, `merge`, `clone`, `pick`, `omit` |
  | `p-number` | `isfinite`, `isinteger`, `isnan`, `issafe`, `parsefloat`, `parseint`, `tofixed`, `toprecision`, `toexponential`, `tostring`, `clamp` + 定数 |
  | `p-array` | `isarray`, `from`, `of`, `len`, `first`, `last`, `range`, `flatten`, `unique`, `zip`, `unzip`, `chunk`, `sum`, `product`, `min`, `max`, `sortasc`, `sortdesc`, `compact`, `count`, `groupby` |
  | `p-error` | `create`, `type`, `range`, `reference`, `syntax`, `uri`, `iserror`, `message`, `name`, `stack`, `cause`, `wrap` |

- **ツリーシェイキング**: コード中で実際に参照された stdlib 関数のみがコンパイル出力に含まれ、バンドルサイズを最小化します。

- **ビット演算子**: JavaScript のセマンティクスに対応する新しいキーワードベースのビット演算子:
  ```purus
  a band b    -- a & b   (ビットAND)
  a bor b     -- a | b   (ビットOR)
  a bxor b    -- a ^ b   (ビットXOR)
  bnot a      -- ~a      (ビットNOT)
  a shl b     -- a << b  (左シフト)
  a shr b     -- a >> b  (右シフト)
  a ushr b    -- a >>> b (符号なし右シフト)
  ```

- **`p-random` 標準ライブラリ追加**: `getrandbits`, `randbytes`, `normalvariate` 追加。`randbool` にオプションの確率パラメータを追加。

- **新標準ライブラリモジュール追加**: `p-object`（Objectユーティリティ）、`p-number`（Numberユーティリティ＋定数）、`p-array`（Arrayユーティリティ）、`p-error`（Error作成/検査）。

- **追加標準ライブラリモジュール**: `p-regexp`（RegExpユーティリティ）、`p-promise`（Promiseユーティリティ）、`p-set`（Setユーティリティ）、`p-map`（Mapユーティリティ）。

- **`infinity` / `-infinity` リテラル**: `infinity` を予約語として追加。`neg infinity` および `-infinity` はどちらも `-Infinity` にコンパイルされます。
  ```purus
  const x be infinity           -- Infinity
  const y be neg infinity       -- -Infinity
  const z be -infinity          -- -Infinity（特例）
  ```

- **`do...while` ループ**: ブロックを少なくとも一回実行し、条件が真の間繰り返します:
  ```purus
  do
    process-item[]
  while has-more[]
  ```

- **`yield` / ジェネレータ関数**: `yield` を含む関数は自動的にジェネレータ（`function*`）としてコンパイルされます:
  ```purus
  fn count-up limit
    let i be 0
    while i lt limit
      yield i
      i be i add 1
  ```

- **2進数 / 16進数リテラル**: `0b` および `0x` プレフィックスの数値リテラルをサポート:
  ```purus
  const mask be 0b1010
  const color be 0xFF00FF
  ```

- **`function` キーワード（非推奨エイリアス）**: `function` は受け入れられますが非推奨警告が出ます。代わりに `fn` を使用してください。

- **`protected` キーワード（非推奨エイリアス）**: クラス本体で `protected` は受け入れられますが非推奨警告が出ます。代わりに `private` を使用してください。

- **複合代入演算子**: 新しい `add be`, `sub be`, `mul be`, `div be`, `mod be`, `pow be` 複合代入構文:
  ```purus
  x add be 1        -- x += 1
  x sub be 1        -- x -= 1
  x mul be 2        -- x *= 2
  x div be 2        -- x /= 2
  x mod be 3        -- x %= 3
  x pow be 2        -- x **= 2
  obj.count add be 1   -- obj.count += 1
  arr[\i] mul be 2     -- arr[i] *= 2
  ```

- **JS スタイル `for` ループ**: 初期化・条件・更新を備えたCスタイルのforループ構文。複合代入演算子と組み合わせ可能:
  ```purus
  for let i be 0; i lt 10; i add be 1
    console.log[i]
  -- → for (let i = 0; i < 10; i += 1) { console.log(i); }

  for let x be 1; x lt 100; x mul be 2
    console.log[x]
  -- → for (let x = 1; x < 100; x *= 2) { console.log(x); }
  ```

- **後置・前置インクリメント/デクリメント**: `\add` と `\sub` でインクリメント/デクリメント。後置: `x\add` → `x++`, `x\sub` → `x--`。前置: `add\x` → `++x`, `sub\x` → `--x`。
  ```purus
  x\add             -- x++
  x\sub             -- x--
  add\x             -- ++x
  sub\x             -- --x
  for let i be 0; i lt 10; i\add
    console.log[i]  -- for (let i = 0; i < 10; i++) { ... }
  ```

- **切り捨て除算 (`fdiv`)**: 整数の切り捨て除算（`Math.floor` を使用）。`fdiv be` で複合代入:
  ```purus
  let q be 7 fdiv 2       -- Math.floor(7 / 2) → 3
  x fdiv be 10             -- x = Math.floor(x / 10)
  ```

- **ビット演算複合代入**: `band be`, `bor be`, `bxor be`, `shl be`, `shr be`, `ushr be`:
  ```purus
  x band be 255            -- x &= 255
  x bor be 1               -- x |= 1
  x bxor be mask           -- x ^= mask
  x shl be 2               -- x <<= 2
  x shr be 1               -- x >>= 1
  x ushr be 1              -- x >>>= 1
  ```

- **論理演算複合代入**: `and be`, `or be`, `coal be` — 論理演算子・ null 合体演算子の複合代入:
  ```purus
  x and be true            -- x &&= true
  x or be false            -- x ||= false
  x coal be 0              -- x ??= 0
  ```

- **BigInt リテラル**: 整数リテラルに `n` サフィックスを付けて BigInt を作成できます（2進数・16進数にも対応）:
  ```purus
  const big be 9007199254740993n     -- 9007199254740993n
  const hex be 0xFFFFFFFFFFFFFFFFn   -- 18446744073709551615n
  const bin be 0b11111111n           -- 255n
  big add 1n                         -- 9007199254740994n
  ```

- **`void` 式**: `void` キーワードはオペランドを評価して `undefined` を返します。副作用のみの呼び出しに便利:
  ```purus
  void f[]                 -- void f()
  const u be void 0        -- const u = void 0
  ```

### キーワード変更

| キーワード | 変更 |
|---|---|
| `is` | 削除（代わりに `eq` を使用） |
| `use` | 標準ライブラリインポート用に追加（`use p-... [as ...]`） |
| `from...use` | stdlib では削除（ES import は引き続き利用可: `from "mod" import ...`） |
| `band` `bor` `bxor` `bnot` `shl` `shr` `ushr` | 追加 — ビット演算子 |
| `infinity` | 追加 — `Infinity` リテラル（`neg infinity` / `-infinity` で負の値） |
| `do` | 追加 — do-whileループ（非推奨、`while`/`until` を推奨） |
| `yield` | 追加 — ジェネレータ関数用のyield式 |
| `function` | 追加 — `fn` の非推奨エイリアス |
| `protected` | 追加 — `private` の非推奨エイリアス |
| `add be` `sub be` `mul be` `div be` `mod be` `pow be` | 追加 — 複合代入演算子 |
| `fdiv` | 追加 — 切り捨て除算（`Math.floor(a / b)`） |
| `fdiv be` | 追加 — 切り捨て除算の複合代入 |
| `band be` `bor be` `bxor be` `shl be` `shr be` `ushr be` | 追加 — ビット演算複合代入 |
| `and be` `or be` `coal be` | 追加 — 論理/null合体複合代入（`&&=`, `\|\|=`, `??=`） |
| `\add` `\sub`（後置）、`add\` `sub\`（前置） | 追加 — インクリメント/デクリメント演算子 |
| `100n` / `0xFFn` / `0b1n` | 追加 — BigInt リテラルサフィックス `n` |
| `void` | 追加 — void 式（`void x` → `void x`） |

### Deprecations

- **裸の変数代入の非推奨化**: `const`/`let`/`var` なしの変数代入（例: `x be 10`）は非推奨です。暗黙のグローバル変数を避けるため、`const x be 10` または `let x be 10` を使用してください。プロパティアクセスへの代入（例: `obj.field be 10`）は引き続き有効です。

- **`for ... in range` ループの非推奨化**: `for x in range a; b` 構文は非推奨です。代わりに新しい JS スタイルの `for` ループを使用してください:
  ```purus
  -- 非推奨:
  for i in range 0; 10
    console.log[i]

  -- 代わりに:
  for let i be 0; i lt 10; i add be 1
    console.log[i]
  ```

### Tooling

- Linter (`@puruslang/linter`): `0.7.1` → `0.8.0` — `is` キーワード削除、キーワード同期（`do`, `yield`, `function`, `protected`, `infinity`, `void`）、2進数/16進数/BigIntサポート追加、ルール拡張 8→8 17（`bare-assignment`, `no-function`, `no-protected`, `no-else-if`, `no-js-chars`, `no-js-operators`, `bracket-match`, `const-reassign`, `duplicate-use`, `no-for-range`）、`JS_OPERATOR_MAP` に `&&=` → `and be`、`||=` → `or be`、`??=` → `coal be` を含む複合代入を追加
- Prettier Plugin (`@puruslang/prettier-plugin-purus`): `0.7.1` → `0.8.0` — `is` キーワード削除、キーワード同期（`do`, `yield`, `function`, `protected`, `infinity`, `void`）、`BLOCK_STARTERS` 追加（`do`, `try`, `catch`, `finally`, `class`）、2進数/16進数/BigIntサポート追加
- VS Code Extension (`purus`): `0.6.1` → `0.7.0` — `is` シンタックスハイライト削除、`use` 標準ライブラリ構文追加、リアルタイム診断機能追加（エラー、警告、非推奨通知）、ソースを `src/` に再編成、スニペット追加（`dowhile`, `yield`, `genfn`, `class`）、`use` スニペットに全 13 モジュール追加、言語設定更新（`do`, `class` インデント）、BigInt 数値ハイライト追加、`void` キーワードハイライト追加

---

## v0.8.1 (2026-03-22)

### バグ修正

- **`witch` → `switch` キーワード改名**: パターンマッチングのキーワード `witch` を `switch` に改名しました。以前の名前は誤りでした。`witch` を使用している既存のコードは `switch` に更新する必要があります。
  ```purus
  -- Before (v0.8.0):
  witch x
    case 1 then ///one///
    default ///other///

  -- After (v0.8.1):
  switch x
    case 1 then ///one///
    default ///other///
  ```

---

## v0.8.0 (2026-03-11)

### Breaking Changes

- **`pub` → `public`**: `pub` キーワードは削除されました。代わりに `public` を使用してください。
- **型名自動検出の削除**: `eq`/`is` と型名（例: `x is string`、`x eq number`）を併用した際の `typeof` 自動生成を削除。型名は通常の識別子として扱われます。
  ```purus
  -- 変更前 (v0.7.x):  x is string → typeof x === "string"
  -- 変更後 (v0.8.0):  x is string → x === string（識別子比較）
  -- 移行方法:      typeof x eq ///string///
  ```

### Deprecations

- **`match` / `when` 非推奨化**: `match` / `when` 構文は引き続き動作しますが、`witch` / `case` / `default` の使用を推奨。

- **`use` / `from...use` 非推奨化**: ドットパスインポート（`use std.math`、`from std.math use sin, cos`）は非推奨です。代わりに `import...from` または `from...import` を文字列パスで使用してください。

### New Features

- **`witch` / `case` / `default` 構文追加**: `match` / `when` / `else` の推奨代替として新しいパターンマッチング構文を追加。
  ```purus
  witch x
    case 1 then ///one///
    case 2 then ///two///
    default ///other///
  ```
  `match` と同様にif-elseチェーンにコンパイル。ガードもサポート: `case n if n gt 0`。

- **`to return` による明示的リターン**: 式本体の関数に明示的なreturnを付ける `to return` 構文を追加。
  ```purus
  fn double x to return x mul 2
  -- コンパイル結果: function double(x) { return x * 2; }
  ```
  名前付き関数、クラスメソッド、`static fn`、`get fn`、`set fn`、コンストラクタで使用可能。

- **モジュールタイプ設定**: `.purus` ファイルを ES Modules の代わりに CommonJS としてコンパイルできるようになりました。
  - CLIオプション: `purus build --type commonjs`
  - `config.purus`: `const type be ///commonjs///`
  - 解決順序: CLI `--type` > `config.purus` の `type` > `package.json` の `type` > デフォルト（`module`）
  - CJSモードでは `import`/`export` が `require()`/`module.exports`/`exports.*` に変換
  - `.cpurus` → 常にCJS、`.mpurus` → 常にESM（従来通り）

- **`purus new` 改善**: 生成される `config.purus` に `type` フィールドを追加。生成される `package.json` の `main` を `"dist/main.js"` に、`type` を `"module"` に設定。

- **TypeScript型定義追加**: `purus` npmパッケージに `index.d.ts` を追加。TypeScriptユーザーが `compile()`、`check()`、`version` の型情報を利用可能に。

- **`from...import` 構文追加**: モジュールパスを先に書くインポート構文を追加。
  ```purus
  from ///express/// import express
  from ///react/// import [useState, useEffect]
  from ///fs/// import all as fs
  ```

### Tooling

- Linter: `0.6.0` → `0.7.0` — `witch`、`case` キーワード追加
- Prettier Plugin: `0.6.0` → `0.7.0` — `witch`、`case` キーワード追加
- VS Code Extension: `0.5.0` → `0.6.0` — `witch`、`case` シンタックスハイライト追加

### Docs

- [コミュニティプロジェクト](https://purus.work/ja/community-projects/)ページを追加（非公式のコミュニティ製プロジェクト一覧）

---

## v0.7.0 (2026-03-08)

### Breaking Changes

- **名前付き関数の暗黙リターン廃止**: `fn name args to expr` が `{ return expr; }` ではなく `{ expr; }` にコンパイルされるように変更。値を返す場合はブロック本体 + 明示的 `return` が必要。無名関数 (`fn args to expr` → `(args) => expr`) には影響なし。

  ```purus
  -- 変更前 (v0.6.x): 暗黙リターン
  fn double x to x mul 2
  -- コンパイル結果: function double(x) { return x * 2; }

  -- 変更後 (v0.7.0): 暗黙リターンなし
  fn double x to x mul 2
  -- コンパイル結果: function double(x) { x * 2; }

  -- 移行方法: ブロック本体 + 明示的 return を使用
  fn double x
    return x mul 2
  -- コンパイル結果: function double(x) { return x * 2; }
  ```

  これはクラスメソッド、`static fn` / `get fn` / `set fn` にも適用されます。

### New Features

- **`nan` キーワード追加**: JavaScript の `NaN` に対応するリテラルキーワード `nan` を追加。
  ```purus
  const value be nan          -- const value = NaN;
  x eq nan                    -- x === NaN
  ```
- **`with` キーワード追加（Import Attributes）**: `import ... from ... with [ key be value ]` 構文によるインポート属性を追加。JavaScript の `import ... from "..." with { key: value }` にコンパイル。
  ```purus
  import data from ///./data.json/// with [ type be ///json/// ]
  -- import data from "./data.json" with { type: "json" };

  import [name; version] from ///./package.json/// with [ type be ///json/// ]
  -- import { name, version } from "./package.json" with { type: "json" };

  import ///./styles.css/// with [ type be ///css/// ]
  -- import "./styles.css" with { type: "css" };
  ```

### Bug Fixes

- **`match` ガード + `BindPat` 修正**: `when n if cond` パターンで `n` がバインド変数の場合、コード生成時にスコープエラーが発生していた問題を修正。変数 `n` が `if` ブロック内で宣言されていたがガード条件で参照されていた問題を、事前宣言方式に変更して解決。
  ```purus
  match value
    when n if n gt 0
      console.log[///positive///]
    when _
      console.log[///other///]
  ```
  ```js
  // 修正前 (不具合): n がガード条件のスコープ外
  // 修正後: const n = value; が事前宣言される
  {
    const n = value;
    if (n > 0) { console.log("positive"); }
    else { console.log("other"); }
  }
  ```

### Keywords Added

| キーワード | 用途 |
|---|---|
| `nan` | NaN リテラル |
| `with` | Import Attributes |

---

## v0.6.1 (2026-03-07)

### Changes

- パッケージメタデータ修正（npm publish 向け）。
- 構文・予約語の変更なし。

---

## v0.6.0 (2026-03-07)

### New Features

- **クラス構文**: `class` / `extends` / `super` / `static` / `private` / `get` / `set` キーワードを追加。JavaScript の ES6 クラスにコンパイル。
  ```purus
  class Animal
    private name
    fn constructor name
      this.name be name
    fn speak
      console.log[this.name]
    static fn create name
      return new Animal[name]
    get fn value
      return this.name
    set fn value v
      this.name be v
  ```
  ```js
  class Animal {
    #name;
    constructor(name) { this.#name = name; }
    speak() { console.log(this.#name); }
    static create(name) { return new Animal(name); }
    get value() { return this.#name; }
    set value(v) { this.#name = v; }
  }
  ```
- **`super` 式**: 親クラスのコンストラクタやメソッドを呼び出すための `super` 式を追加。
  ```purus
  class Dog extends Animal
    fn constructor name
      super[name]
  ```
- **継承**: `class Child extends Parent` が JavaScript の `class Child extends Parent` にコンパイル。

### Keywords Added

| キーワード | JS出力 | 用途 |
|---|---|---|
| `class` | `class` | クラス宣言 |
| `extends` | `extends` | 継承 |
| `super` | `super` | 親クラス参照 |
| `static` | `static` | 静的メソッド |
| `private` | `#` (private field) | プライベートフィールド |
| `get` | `get` | ゲッター |
| `set` | `set` | セッター |

---

## v0.5.0 (2026-03-07)

### New Features

- **`coal` （Nullish Coalescing）**: `a coal b` → `a ?? b` にコンパイル。
  ```purus
  const name be user.name coal ///anonymous///
  -- const name = user.name ?? "anonymous";
  ```
- **オプショナルチェイニング**: `obj\.field` → `obj?.field`、`obj\.method[args]` → `obj?.method(args)` にコンパイル。
  ```purus
  const name be user\.profile\.name
  -- const name = user?.profile?.name;
  user\.greet[///hello///]
  -- user?.greet("hello");
  ```
- **計算プロパティアクセス**: `obj[\key]` → `obj[key]` にコンパイル。
  ```purus
  const val be obj[\key]
  -- const val = obj[key];
  ```
- **文字列補間**: `///Hello [name]!///` → テンプレートリテラルにコンパイル。トリプルスラッシュ文字列内の角括弧 `[expr]` が補間される。
  ```purus
  const msg be ///Hello [name]! You are [age] years old.///
  -- const msg = `Hello ${name}! You are ${age} years old.`;
  ```
- **副作用インポート**: `import ///module///` → `import "module"` 副作用のみのインポート。
  ```purus
  import ///./polyfill.js///
  -- import "./polyfill.js";
  ```
- **`async fn` 式**: `async fn x to expr` および `async fn` ブロック本体を式として使用可能（変数割り当てなど）。
  ```purus
  const fetchData be async fn url to await fetch[url]
  -- const fetchData = async (url) => await fetch(url);
  ```
- **オブジェクト分割代入**: `const object[a; b] be expr` → `const { a, b } = expr`。配列分割代入と区別するため `object` キーワードプレフィックスを使用。
  ```purus
  const object[name; age] be person
  -- const { name, age } = person;
  ```
- **アンダースコア識別子**: `_variable`、`_private`、`__internal` のようなアンダースコア開始の識別子をサポート。

### Punctuation Added

| 記号 | 用途 |
|---|---|
| `\` | 計算プロパティアクセスプレフィックス |
| `\.` | オプショナルチェイニング |

### Keywords Added

| キーワード | JS出力 | 用途 |
|---|---|---|
| `coal` | `??` | Nullish Coalescing |

---

## v0.4.1 (2026-03-06)

### Changes

- パッケージ間のバージョンを統一するための同期スクリプトを追加。
- 構文・予約語の変更なし。

---

## v0.4.0 (2026-03-06)

### Breaking Changes

- **`ne` → `neq` に改名**: 不等価演算子のキーワードを `ne` から `neq` に変更。既存の `ne` を使用しているコードはすべて `neq` に更新が必要。
  ```purus
  -- 変更前 (v0.3.x)
  x ne y           -- x !== y

  -- 変更後 (v0.4.0)
  x neq y          -- x !== y
  x not eq y       -- x !== y (代替表記)
  ```

### New Features

- **`pow` 演算子**: `a pow b` → `a ** b` にコンパイル。右結合、`mul`/`div`/`mod` より高い優先順位。
  ```purus
  2 pow 10         -- 2 ** 10
  x pow y pow z    -- x ** (y ** z)  (右結合)
  ```
- **`not eq` 演算子合成**: `not eq` は `neq` (`!==`) として解析される。同様に `lt eq` → `le` (`<=`)、`gt eq` → `ge` (`>=`)。
  ```purus
  x not eq y       -- x !== y
  x lt eq y        -- x <= y
  x gt eq y        -- x >= y
  ```
- **範囲配列**: `[start..end]`（inclusive）/ `[start...end]`（exclusive）が `Array.from()` を使って配列を生成。
  ```purus
  [1..5]           -- Array.from({ length: 5 - 1 + 1 }, (_, i) => i + 1)  → [1,2,3,4,5]
  [0...5]          -- Array.from({ length: 5 - 0 }, (_, i) => i + 0)      → [0,1,2,3,4]
  ```
- **スライス**: `arr[start..end]` / `arr[start...end]` が `.slice()` にコンパイル。スライスへの代入は `.splice()` にコンパイル。
  ```purus
  arr[1..3]        -- arr.slice(1, 3 + 1)
  arr[1...3]       -- arr.slice(1, 3)
  arr[1..3] be [7; 8; 9]  -- arr.splice(1, 3 - 1 + 1, 7, 8, 9)
  ```
- **配列分割代入**: `const [a; b] be arr` → `const [a, b] = arr`。
  ```purus
  const [first; second] be arr
  -- const [first, second] = arr;
  ```
- **`namespace` キーワード**: `namespace name` ブロックが IIFE（即時実行関数式）にコンパイル。
  ```purus
  namespace Utils
    pub fn helper
      return 42
  ```
- **`purus check` コマンド**: 出力ファイルを生成せずに構文チェックを行う CLI コマンドを追加。

### Punctuation Added

| 記号 | 用途 |
|---|---|
| `..` | 包含範囲 (inclusive range) |
| `...` | 排他範囲 (exclusive range) |

### Keywords Added / Changed

| キーワード | 変更 |
|---|---|
| `pow` | 新規追加（べき乗演算子） |
| `neq` | `ne` から改名 |
| `namespace` | 新規追加（モジュール名前空間、`use` のエイリアス） |

---

## v0.3.0 (2026-03-06)

### Changes

- **`purus version` コマンド**: `version` / `--version` / `-v` CLI コマンドを追加。
- **ビルドリファクタリング**: 単一ファイルのビルドが MoonBit コンパイラに委譲する代わりにコンパイル API を直接使用するように変更。ヘッダーコメント生成を JS ラッパーレイヤーに移動。
- **`purus new` プロンプト変更**: "Install dependencies?" のデフォルト回答を No から Yes に変更。
- 構文・予約語の変更なし。

---

## v0.2.1 (2026-03-06)

### Changes

- パッケージメタデータ修正（README リンク）。
- 構文・予約語の変更なし。

---

## v0.2.0 (2026-03-06)

### New Features

- **CLI ツール**: 以下のコマンドを含む完全な CLI インターフェースを追加:
  - `purus build [file]` — JavaScript にコンパイル
  - `purus build --directory <dir>` — ディレクトリ内の全ファイルをコンパイル
  - `purus build --output <dir>` — 出力ディレクトリを指定
  - `purus build --no-header` — ヘッダーコメントなしでコンパイル
  - `purus build --stdout` — 標準出力に出力
  - `purus run [file]` — ファイルを生成せずに実行
  - `purus new [name] [-y]` / `purus create` — 新規プロジェクトを作成
  - `purus init` — 現在のディレクトリでプロジェクトを初期化
  - `purus help` — ヘルプを表示
- **設定ファイル**: プロジェクトレベルのビルド設定用 `config.purus` 設定ファイルサポートを追加。
- **ファイル拡張子マッピング**: `.purus` → `.js`、`.cpurus` → `.cjs`（CommonJS）、`.mpurus` → `.mjs`（ES Module）。
- `purus.json` プロジェクトファイルを削除（`config.purus` に置き換え）。

### Changes

- 構文・予約語の変更なし。

---

## v0.1.0 (2026-03-06)

### Bug Fixes

- **`eq` / `is` のパース修正**: 以前は `eq` と `is` で別々のパースパスがあり、`eq` は常にバイナリ等価演算（`===`）を生成し、`is` は `typeof` チェックを生成していた。`eq` も次のトークンが型名の場合に型チェック（`IsCheck`）を生成するよう修正。`eq` と `is` が同一の動作に統一。
  ```purus
  -- 修正前 (v0.0.x): eq は常に === を生成
  x eq string      -- x === string  (誤り — 変数と比較)

  -- 修正後 (v0.1.0): eq が型名を検出
  x eq string      -- typeof x === "string"  (型チェック)
  x is string      -- typeof x === "string"  (同じ動作)
  ```
  認識される型名: `string`、`number`、`boolean`、`undefined`、`function`、`symbol`、`bigint`、`null`、`object`、および PascalCase の識別子（例: `Array`、`Date`）。

### Changes

- 構文・予約語の変更なし。

---

## v0.0.3 (2026-03-06)

### Changes

- パッケージバージョン修正。
- 構文・予約語の変更なし。

---

## v0.0.2 (2026-03-06)

### Changes

- README リンク修正、パッケージファイル設定修正。
- 構文・予約語の変更なし。

---

## v0.0.1 (2026-03-06)

### Initial Release

Purus 言語の最初のリリース。

#### リテラル

- 整数、浮動小数点数、文字列（`///...///`）、正規表現（`///regex///`）、`true` / `false`、`null` / `nil` / `undefined`
- 配列 `[1; 2; 3]`、オブジェクト `[key be value]`

#### 変数宣言

- `const` / `let` / `var` + `be`（代入キーワード）
  ```purus
  const name be ///Purus///    -- const name = "Purus";
  let count be 0               -- let count = 0;
  ```

#### 演算子（キーワード形式）

| キーワード | JS出力 | 用途 |
|---|---|---|
| `add` | `+` | 加算 / 文字列結合 |
| `sub` | `-` | 減算 |
| `mul` | `*` | 乗算 |
| `div` | `/` | 除算 |
| `mod` | `%` | 剰余 |
| `neg` | `-` (単項) | 符号反転 |
| `eq` | `===` | 等価 |
| `ne` | `!==` | 不等価 |
| `lt` | `<` | 未満 |
| `gt` | `>` | 超過 |
| `le` | `<=` | 以下 |
| `ge` | `>=` | 以上 |
| `and` | `&&` | 論理 AND |
| `or` | `\|\|` | 論理 OR |
| `not` | `!` | 論理 NOT |

#### 関数

- `fn` / `return` / `to`（式本体） / `gives`（型注釈） / `async` / `await`
  ```purus
  fn greet name to console.log[name]
  -- function greet(name) { return console.log(name); }

  fn add a b
    return a add b
  -- function add(a, b) { return a + b; }
  ```

#### 制御フロー

- `if` / `elif` / `else` / `unless` / `then`（インライン）
- `while` / `until` / `for` / `in` / `range`
- `break` / `continue`
- `match` / `when`（パターンマッチ）
- `pipe`（パイプ演算子 `|>`）

#### 後置修飾

- `stmt if cond` / `stmt unless cond` / `stmt for x in arr`
  ```purus
  console.log[x] if x gt 0
  -- if (x > 0) { console.log(x); }
  ```

#### エラー処理

- `try` / `catch` / `finally` / `throw`

#### 型関連

- `is` / `as` / `of`（型注釈） / `typeof` / `instanceof` / `type`（型エイリアス）

#### オブジェクト

- `new` / `delete` / `this`

#### モジュール

- `import` / `from` / `export` / `default` / `require`
- `use`（ドットパスインポート）
- `pub`（公開エクスポート修飾子）
- `all`（名前空間インポート: `import all as name from ...`）

#### セパレータ

- `;`（セミコロン）と `,`（カンマ）はセパレータとして互換的に使用可能

#### 予約キーワード

- `list` / `object`（明示的コンストラクタ用に予約）

#### その他

- Shebang サポート（`#!` 行は保持される）
- `// comment` スタイルのコメントは `-- comment` で記述

#### 区切り文字

| 記号 | 用途 |
|---|---|
| `[` / `]` | 関数呼び出し / 配列 / オブジェクト |
| `,` | 配列 / オブジェクト区切り |
| `;` | 引数 / パラメータ / 分割代入区切り |
| `.` | プロパティアクセス |
