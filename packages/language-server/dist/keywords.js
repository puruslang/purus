"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompletionItems = getCompletionItems;
exports.getKeywordInfo = getKeywordInfo;
const node_1 = require("vscode-languageserver/node");
const keywords = [
    // Variable Declaration
    { label: "const", detail: "const (immutable binding)", documentation: "定数を宣言する。`const x be 42` → `const x = 42`", kind: node_1.CompletionItemKind.Keyword },
    { label: "let", detail: "let (mutable binding)", documentation: "ブロックスコープの変数を宣言する。`let x be 0` → `let x = 0`", kind: node_1.CompletionItemKind.Keyword },
    { label: "var", detail: "var (function-scoped)", documentation: "関数スコープの変数を宣言する（非推奨、`const`/`let` を使用してください）", kind: node_1.CompletionItemKind.Keyword },
    { label: "be", detail: "= (assignment)", documentation: "代入演算子。`x be 1` → `x = 1`。オブジェクトリテラル内では `:` として機能する", kind: node_1.CompletionItemKind.Operator },
    // Functions
    { label: "fn", detail: "function", documentation: "関数を宣言する。`fn name[params] ...` → `function name(params) { ... }`", kind: node_1.CompletionItemKind.Keyword },
    { label: "async", detail: "async", documentation: "非同期関数を宣言する。`async fn name[...]` → `async function name(...)`", kind: node_1.CompletionItemKind.Keyword },
    { label: "return", detail: "return", documentation: "関数から値を返す", kind: node_1.CompletionItemKind.Keyword },
    { label: "to", detail: "=> (arrow body)", documentation: "簡潔な関数本体。`fn add[a b] to a add b` → `function add(a, b) { return a + b; }`", kind: node_1.CompletionItemKind.Keyword },
    { label: "gives", detail: "(return type annotation)", documentation: "戻り値の型注釈（コンパイル時に無視される）。`fn name[x] gives number`", kind: node_1.CompletionItemKind.Keyword },
    { label: "yield", detail: "yield (generator)", documentation: "ジェネレーター関数から値を生成する。`yield value` → `yield value`", kind: node_1.CompletionItemKind.Keyword },
    // Arithmetic Operators
    { label: "add", detail: "+ (addition)", documentation: "加算。`a add b` → `a + b`。複合代入: `x add be 5` → `x += 5`", kind: node_1.CompletionItemKind.Operator },
    { label: "sub", detail: "- (subtraction)", documentation: "減算。`a sub b` → `a - b`。複合代入: `x sub be 5` → `x -= 5`", kind: node_1.CompletionItemKind.Operator },
    { label: "mul", detail: "* (multiplication)", documentation: "乗算。`a mul b` → `a * b`。複合代入: `x mul be 2` → `x *= 2`", kind: node_1.CompletionItemKind.Operator },
    { label: "div", detail: "/ (division)", documentation: "除算。`a div b` → `a / b`。複合代入: `x div be 2` → `x /= 2`", kind: node_1.CompletionItemKind.Operator },
    { label: "fdiv", detail: "// (floor division)", documentation: "床除算（切り捨て除算）。`a fdiv b` → `Math.floor(a / b)`。複合代入: `x fdiv be 2`", kind: node_1.CompletionItemKind.Operator },
    { label: "mod", detail: "% (modulo)", documentation: "剰余。`a mod b` → `a % b`。複合代入: `x mod be 3` → `x %= 3`", kind: node_1.CompletionItemKind.Operator },
    { label: "pow", detail: "** (exponentiation)", documentation: "べき乗。`a pow b` → `a ** b`。複合代入: `x pow be 2` → `x **= 2`", kind: node_1.CompletionItemKind.Operator },
    { label: "neg", detail: "- (unary negation)", documentation: "単項否定。`neg x` → `-x`", kind: node_1.CompletionItemKind.Operator },
    // Bitwise Operators (v0.9.0)
    { label: "band", detail: "& (bitwise AND)", documentation: "ビット積。`a band b` → `a & b`。複合代入: `x band be mask`", kind: node_1.CompletionItemKind.Operator },
    { label: "bor", detail: "| (bitwise OR)", documentation: "ビット和。`a bor b` → `a | b`。複合代入: `x bor be flag`", kind: node_1.CompletionItemKind.Operator },
    { label: "bxor", detail: "^ (bitwise XOR)", documentation: "ビット排他的論理和。`a bxor b` → `a ^ b`。複合代入: `x bxor be mask`", kind: node_1.CompletionItemKind.Operator },
    { label: "bnot", detail: "~ (bitwise NOT)", documentation: "ビット否定。`bnot x` → `~x`", kind: node_1.CompletionItemKind.Operator },
    { label: "shl", detail: "<< (left shift)", documentation: "左シフト。`a shl b` → `a << b`。複合代入: `x shl be 1`", kind: node_1.CompletionItemKind.Operator },
    { label: "shr", detail: ">> (right shift)", documentation: "右シフト（符号あり）。`a shr b` → `a >> b`。複合代入: `x shr be 1`", kind: node_1.CompletionItemKind.Operator },
    { label: "ushr", detail: ">>> (unsigned right shift)", documentation: "右シフト（符号なし）。`a ushr b` → `a >>> b`。複合代入: `x ushr be 1`", kind: node_1.CompletionItemKind.Operator },
    // Comparison Operators
    { label: "eq", detail: "=== (strict equality)", documentation: "厳密等価。`a eq b` → `a === b`", kind: node_1.CompletionItemKind.Operator },
    { label: "neq", detail: "!== (strict inequality)", documentation: "厳密不等価。`a neq b` → `a !== b`", kind: node_1.CompletionItemKind.Operator },
    { label: "lt", detail: "< (less than)", documentation: "未満。`a lt b` → `a < b`", kind: node_1.CompletionItemKind.Operator },
    { label: "gt", detail: "> (greater than)", documentation: "超過。`a gt b` → `a > b`", kind: node_1.CompletionItemKind.Operator },
    { label: "le", detail: "<= (less or equal)", documentation: "以下。`a le b` → `a <= b`", kind: node_1.CompletionItemKind.Operator },
    { label: "ge", detail: ">= (greater or equal)", documentation: "以上。`a ge b` → `a >= b`", kind: node_1.CompletionItemKind.Operator },
    // Logical Operators
    { label: "and", detail: "&& (logical AND)", documentation: "論理積。`a and b` → `a && b`", kind: node_1.CompletionItemKind.Operator },
    { label: "or", detail: "|| (logical OR)", documentation: "論理和。`a or b` → `a || b`", kind: node_1.CompletionItemKind.Operator },
    { label: "not", detail: "! (logical NOT)", documentation: "論理否定。`not x` → `!x`", kind: node_1.CompletionItemKind.Operator },
    { label: "pipe", detail: "| (pipe operator)", documentation: "パイプ演算子。左の値を右の関数に渡す。`x pipe f` → `f(x)`", kind: node_1.CompletionItemKind.Operator },
    { label: "coal", detail: "?? (nullish coalescing)", documentation: "Null 合体演算子。`a coal b` → `a ?? b`", kind: node_1.CompletionItemKind.Operator },
    // Conditionals
    { label: "if", detail: "if", documentation: "条件分岐。後置形式も可: `stmt if cond`", kind: node_1.CompletionItemKind.Keyword },
    { label: "elif", detail: "else if", documentation: "else if 分岐。`elif cond` → `else if (cond)`", kind: node_1.CompletionItemKind.Keyword },
    { label: "else", detail: "else", documentation: "else 分岐", kind: node_1.CompletionItemKind.Keyword },
    { label: "unless", detail: "if (!(cond))", documentation: "反転条件分岐。条件が false のとき実行。`unless cond` → `if (!(cond))`", kind: node_1.CompletionItemKind.Keyword },
    { label: "then", detail: "? (ternary)", documentation: "三項演算子。`cond then a else b` → `cond ? a : b`", kind: node_1.CompletionItemKind.Keyword },
    // Loops
    { label: "while", detail: "while", documentation: "条件が true の間ループ。`while cond` → `while (cond)`", kind: node_1.CompletionItemKind.Keyword },
    { label: "until", detail: "while (!(cond))", documentation: "条件が true になるまでループ（while の逆）", kind: node_1.CompletionItemKind.Keyword },
    { label: "do", detail: "do...while", documentation: "do-while ループ。本体を先に実行してから条件を評価する。`do ... while cond`", kind: node_1.CompletionItemKind.Keyword },
    { label: "for", detail: "for...of", documentation: "イテラブルを反復。`for x in list` → `for (const x of list)`. インデックス付き: `for i; x in list`", kind: node_1.CompletionItemKind.Keyword },
    { label: "in", detail: "of (in for loop)", documentation: "for ループ内でイテラブルを指定。`for x in list`", kind: node_1.CompletionItemKind.Keyword },
    { label: "range", detail: "numeric range", documentation: "数値範囲ループ。`for x in range start; end` → `for (let x = start; x < end; x++)`", kind: node_1.CompletionItemKind.Keyword },
    { label: "break", detail: "break", documentation: "現在のループを抜ける", kind: node_1.CompletionItemKind.Keyword },
    { label: "continue", detail: "continue", documentation: "次のループ反復にスキップ", kind: node_1.CompletionItemKind.Keyword },
    // Pattern Matching
    { label: "match", detail: "match (pattern matching)", documentation: "パターンマッチ。`match expr` の後に `when` アームを記述", kind: node_1.CompletionItemKind.Keyword },
    { label: "when", detail: "when (match arm)", documentation: "マッチアーム。`when value` → `if (subject === value)`", kind: node_1.CompletionItemKind.Keyword },
    { label: "switch", detail: "switch", documentation: "switch 文。`switch expr` の後に `case` と `default` アームを記述", kind: node_1.CompletionItemKind.Keyword },
    { label: "case", detail: "case (switch arm)", documentation: "switch の case アーム。`case value`", kind: node_1.CompletionItemKind.Keyword },
    { label: "blank", detail: "_ (wildcard)", documentation: "ワイルドカードパターン。match の when アームや関数引数で「任意の値」を表す (v0.11.0)。`when blank`", kind: node_1.CompletionItemKind.Keyword },
    // Error Handling
    { label: "try", detail: "try", documentation: "try ブロック", kind: node_1.CompletionItemKind.Keyword },
    { label: "catch", detail: "catch", documentation: "catch ブロック。`catch err` → `catch (err)`", kind: node_1.CompletionItemKind.Keyword },
    { label: "finally", detail: "finally", documentation: "finally ブロック", kind: node_1.CompletionItemKind.Keyword },
    { label: "throw", detail: "throw", documentation: "例外をスローする", kind: node_1.CompletionItemKind.Keyword },
    // Modules
    { label: "import", detail: "import", documentation: "ES モジュールからインポート。`import name from ///path///` → `import name from \"path\"`", kind: node_1.CompletionItemKind.Keyword },
    { label: "from", detail: "from", documentation: "import/use 構文の一部", kind: node_1.CompletionItemKind.Keyword },
    { label: "export", detail: "export", documentation: "宣言をエクスポート。`export fn name` → `export function name`", kind: node_1.CompletionItemKind.Keyword },
    { label: "default", detail: "default", documentation: "デフォルトエクスポート。`export default fn name`", kind: node_1.CompletionItemKind.Keyword },
    { label: "require", detail: "require (CJS)", documentation: "CommonJS インポート。`import name require ///path///` → `const name = require(\"path\")`", kind: node_1.CompletionItemKind.Keyword },
    { label: "use", detail: "use (named import)", documentation: "名前付きインポート。`from mod.path use name1, name2`", kind: node_1.CompletionItemKind.Keyword },
    { label: "namespace", detail: "namespace (IIFE)", documentation: "名前空間を宣言。IIFE にコンパイルされる。`namespace mymod` → `const mymod = (() => { ... })()`", kind: node_1.CompletionItemKind.Keyword },
    { label: "public", detail: "export (public)", documentation: "宣言を公開/エクスポートする。`public fn name` → `export function name`", kind: node_1.CompletionItemKind.Keyword },
    { label: "all", detail: "* as (namespace import)", documentation: "名前空間インポート。`import all as ns from ///path///`", kind: node_1.CompletionItemKind.Keyword },
    { label: "with", detail: "import attributes", documentation: "インポート属性。`import data from ///data.json/// with [ type be ///json/// ]`", kind: node_1.CompletionItemKind.Keyword },
    // Type System
    { label: "as", detail: "(type cast)", documentation: "型キャスト注釈（コンパイル時に無視される）", kind: node_1.CompletionItemKind.Keyword },
    { label: "of", detail: "(type annotation)", documentation: "型注釈。`const x of number be 5`（コンパイル時に無視される）", kind: node_1.CompletionItemKind.Keyword },
    { label: "typeof", detail: "typeof", documentation: "JavaScript の typeof 演算子", kind: node_1.CompletionItemKind.Operator },
    { label: "instanceof", detail: "instanceof", documentation: "JavaScript の instanceof 演算子", kind: node_1.CompletionItemKind.Operator },
    { label: "type", detail: "type (alias)", documentation: "型エイリアスを宣言（JS出力なし）。`type MyNum be number`", kind: node_1.CompletionItemKind.Keyword },
    { label: "void", detail: "void (expression)", documentation: "void 式。`void expr` → `void expr`（undefined を返す）", kind: node_1.CompletionItemKind.Keyword },
    // Literals
    { label: "true", detail: "true", documentation: "真偽値 true", kind: node_1.CompletionItemKind.Value },
    { label: "false", detail: "false", documentation: "真偽値 false", kind: node_1.CompletionItemKind.Value },
    { label: "null", detail: "null", documentation: "null リテラル", kind: node_1.CompletionItemKind.Value },
    { label: "nil", detail: "null (alias)", documentation: "null のエイリアス（`null` の使用を推奨）", kind: node_1.CompletionItemKind.Value },
    { label: "undefined", detail: "undefined", documentation: "undefined リテラル", kind: node_1.CompletionItemKind.Value },
    { label: "nan", detail: "NaN", documentation: "NaN リテラル。`nan` → `NaN`", kind: node_1.CompletionItemKind.Value },
    { label: "infinity", detail: "Infinity", documentation: "無限大リテラル。`infinity` → `Infinity`", kind: node_1.CompletionItemKind.Value },
    // OOP / Reference
    { label: "new", detail: "new", documentation: "インスタンスを生成。`new Foo[args]` → `new Foo(args)`", kind: node_1.CompletionItemKind.Keyword },
    { label: "delete", detail: "delete", documentation: "プロパティを削除。`delete obj.key` → `delete obj.key`", kind: node_1.CompletionItemKind.Keyword },
    { label: "this", detail: "this", documentation: "現在のオブジェクトへの参照", kind: node_1.CompletionItemKind.Keyword },
    { label: "await", detail: "await", documentation: "async fn 内で Promise を待機する", kind: node_1.CompletionItemKind.Keyword },
    // Class
    { label: "class", detail: "class", documentation: "クラスを宣言する。`class Name` → `class Name { ... }`", kind: node_1.CompletionItemKind.Keyword },
    { label: "extends", detail: "extends", documentation: "クラスの継承。`class Dog extends Animal` → `class Dog extends Animal`", kind: node_1.CompletionItemKind.Keyword },
    { label: "super", detail: "super", documentation: "親クラスのコンストラクタ/メソッドを呼び出す。`super[args]` → `super(args)`", kind: node_1.CompletionItemKind.Keyword },
    { label: "static", detail: "static", documentation: "静的メソッドを宣言。`static fn name` → `static name() { ... }`", kind: node_1.CompletionItemKind.Keyword },
    { label: "private", detail: "# (private field)", documentation: "プライベートフィールドを宣言。`private name` → `#name`", kind: node_1.CompletionItemKind.Keyword },
    { label: "get", detail: "get (accessor)", documentation: "ゲッターアクセサ。`get fn name to expr` → `get name() { return expr; }`", kind: node_1.CompletionItemKind.Keyword },
    { label: "set", detail: "set (accessor)", documentation: "セッターアクセサ。`set fn name value` → `set name(value) { ... }`", kind: node_1.CompletionItemKind.Keyword },
    // Collection Literals
    { label: "list", detail: "[...] (array)", documentation: "配列リテラル。`list [a, b, c]` → `[a, b, c]`", kind: node_1.CompletionItemKind.Keyword },
    { label: "object", detail: "{...} (object)", documentation: "オブジェクトリテラル。`object [key be value]` → `{ key: value }`", kind: node_1.CompletionItemKind.Keyword },
];
function getCompletionItems() {
    return keywords.map((kw, i) => ({
        label: kw.label,
        kind: kw.kind,
        detail: kw.detail,
        documentation: kw.documentation,
        data: i,
    }));
}
function getKeywordInfo(word) {
    return keywords.find((kw) => kw.label === word);
}
//# sourceMappingURL=keywords.js.map