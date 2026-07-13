# Purus Language Specification

**RFC — v1.0.0**

> Purus — _/ˈpuː.rus/_ — means _pure_ in Latin.
> A beautiful, simple, and easy-to-use language that compiles to JavaScript.
> **Write code without the Shift key.**

> v1.0.0 is the first stable release under the [puruslang](https://github.com/puruslang) organization.
> The language itself is unchanged from v0.11.0; this release covers the org migration and requires Node.js >= 22.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [File Extensions](#2-file-extensions)
3. [Lexical Structure](#3-lexical-structure)
   - 3.1 [Comments](#31-comments)
   - 3.2 [Identifiers](#32-identifiers)
   - 3.3 [Reserved Keywords](#33-reserved-keywords)
   - 3.4 [Literals](#34-literals)
   - 3.5 [Punctuation](#35-punctuation)
   - 3.6 [Shebang](#36-shebang)
4. [Types and Literals](#4-types-and-literals)
   - 4.1 [Numbers](#41-numbers)
   - 4.2 [Strings](#42-strings)
   - 4.3 [String Interpolation](#43-string-interpolation)
   - 4.4 [Booleans](#44-booleans)
   - 4.5 [Null Family](#45-null-family)
   - 4.6 [Regular Expressions](#46-regular-expressions)
   - 4.7 [Arrays](#47-arrays)
   - 4.8 [Objects](#48-objects)
5. [Operators](#5-operators)
   - 5.1 [Operator Precedence](#51-operator-precedence)
   - 5.2 [Arithmetic](#52-arithmetic)
   - 5.3 [Comparison](#53-comparison)
   - 5.4 [Logical](#54-logical)
   - 5.5 [Nullish Coalescing](#55-nullish-coalescing)
   - 5.6 [Pipeline](#56-pipeline)
   - 5.7 [Optional Chaining](#57-optional-chaining)
   - 5.8 [Type Check and Cast](#58-type-check-and-cast)
6. [Declarations](#6-declarations)
   - 6.1 [Variable Declaration](#61-variable-declaration)
   - 6.2 [Array Destructuring](#62-array-destructuring)
   - 6.3 [Object Destructuring](#63-object-destructuring)
   - 6.4 [Assignment](#64-assignment)
   - 6.5 [Type Alias](#65-type-alias)
7. [Functions](#7-functions)
   - 7.1 [Named Functions](#71-named-functions)
   - 7.2 [No-Argument Functions](#72-no-argument-functions)
   - 7.3 [Multiple Parameters](#73-multiple-parameters)
   - 7.4 [Expression Body](#74-expression-body)
   - 7.5 [Anonymous Functions](#75-anonymous-functions)
   - 7.6 [Async Functions](#76-async-functions)
   - 7.7 [Function Calls](#77-function-calls)
   - 7.8 [Computed Access](#78-computed-access)
   - 7.9 [Async Function Expressions](#79-async-function-expressions)
   - 7.10 [Inline Callbacks](#710-inline-callbacks)
   - 7.11 [Type Annotations](#711-type-annotations)
   - 7.12 [Ignored Parameters (`blank`)](#712-ignored-parameters-blank)
   - 7.13 [Generator Functions](#713-generator-functions)
8. [Control Flow](#8-control-flow)
   - 8.1 [If / Elif / Else](#81-if--elif--else)
   - 8.2 [Unless](#82-unless)
   - 8.3 [Inline If (Ternary)](#83-inline-if-ternary)
   - 8.4 [Postfix Modifiers](#84-postfix-modifiers)
   - 8.5 [While / Until](#85-while--until)
   - 8.6 [For-in](#86-for-in)
   - 8.7 [For-range](#87-for-range)
   - 8.8 [Switch / Case / Default](#88-switch--case--default)
   - 8.9 [Match / When (deprecated)](#89-match--when-deprecated)
   - 8.10 [Break / Continue / Return](#810-break--continue--return)
9. [Error Handling](#9-error-handling)
   - 9.1 [Try / Catch / Finally](#91-try--catch--finally)
   - 9.2 [Try as Expression](#92-try-as-expression)
   - 9.3 [Throw](#93-throw)
10. [Modules](#10-modules)
    - 10.1 [ESM Import](#101-esm-import)
    - 10.2 [From...Import](#102-fromimport)
    - 10.3 [Use (Dot-path Import, deprecated)](#103-use-dot-path-import-deprecated)
    - 10.4 [Export / Public](#104-export--public)
    - 10.5 [Namespace](#105-namespace)
    - 10.6 [Side-Effect Import](#106-side-effect-import)
    - 10.7 [Import Attributes](#107-import-attributes)
    - 10.8 [CommonJS](#108-commonjs)
    - 10.9 [Dynamic Import](#109-dynamic-import)
    - 10.10 [Module Type Configuration](#1010-module-type-configuration)
11. [Array Operations](#11-array-operations)
    - 11.1 [Ranges](#111-ranges)
    - 11.2 [Slicing](#112-slicing)
    - 11.3 [Splicing](#113-splicing)
12. [Multi-line Brackets](#12-multi-line-brackets)
13. [Indentation and Block Structure](#13-indentation-and-block-structure)
14. [Code Generation](#14-code-generation)
    - 14.1 [Identifier Mapping](#141-identifier-mapping)
    - 14.2 [Type Erasure](#142-type-erasure)
    - 14.3 [Strict Mode](#143-strict-mode)
    - 14.4 [Private Fields](#144-private-fields)
15. [Classes](#15-classes)
    - 15.1 [Class Declaration](#151-class-declaration)
    - 15.2 [Constructor](#152-constructor)
    - 15.3 [Methods](#153-methods)
    - 15.4 [Static Methods](#154-static-methods)
    - 15.5 [Async Methods](#155-async-methods)
    - 15.6 [Getters and Setters](#156-getters-and-setters)
    - 15.7 [Inheritance](#157-inheritance)
    - 15.8 [Private Fields](#158-private-fields)
16. [Keyword Reference Table](#16-keyword-reference-table)
17. [Grammar Summary (EBNF-like)](#17-grammar-summary-ebnf-like)

---

## 1. Design Principles

Purus is designed with the following principles:

- **No Shift key required.** Most syntax uses lowercase keywords and `[]` brackets. No `()`, `{}`, `<>`, `!`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, `+`, `=`, `|`, `:`, `"`, `'`, `?` required in Purus source.
- **Brackets only.** `[]` is the universal bracket — used for function calls, arrays, objects, grouping, and destructuring.
- **Keyword-based operators.** All operators are English words: `add`, `sub`, `eq`, `and`, `or`, etc.
- **Indentation-based blocks.** No braces. Blocks are delimited by indentation (2 spaces recommended).
- **Clean JavaScript output.** Compiles to readable, idiomatic JavaScript.
- **US/JIS keyboard layout friendly.** The entire language can be typed without modifier keys besides Shift for uppercase (which is also rarely needed).

---

## 2. File Extensions

| Extension | JS Output | Description |
|-----------|-----------|-------------|
| `.purus`  | `.js`     | Standard JavaScript |
| `.cpurus` | `.cjs`    | CommonJS module |
| `.mpurus` | `.mjs`    | ES Module |

---

## 3. Lexical Structure

### 3.1 Comments

**Line comment** — starts with `--`, extends to end of line:

```
-- this is a comment
```

**Block comment** — enclosed in `---`:

```
--- this is a
block comment ---
```

### 3.2 Identifiers

Identifiers start with a letter (`a`-`z`, `A`-`Z`) or underscore (`_`), followed by any combination of letters, digits (`0`-`9`), hyphens (`-`), and underscores (`_`).

```
valid-name
my_var
_private
camelCase
data-2
```

**Identifier normalization:** Both hyphens and underscores map to `_` in the JavaScript output. Therefore `my-var` and `my_var` reference the same JavaScript identifier `my_var`.

> **Caution:** Do not define both `my-var` and `my_var` in the same scope. They will alias to the same JavaScript variable.

### 3.3 Reserved Keywords

The following words are reserved and cannot be used as identifiers:

**Declaration:** `const`, `let`, `var`, `be`

**Function:** `fn`, `return`, `to`, `gives`, `async`, `await`

**Control:** `if`, `elif`, `else`, `unless`, `then`, `while`, `until`, `for`, `in`, `range`, `break`, `continue`, `switch`, `case`, `match`, `when`

**Operator:** `add`, `sub`, `mul`, `div`, `mod`, `pow`, `neg`, `eq`, `neq`, `lt`, `gt`, `le`, `ge`, `and`, `or`, `not`, `coal`, `pipe`, `band`, `bor`, `bxor`, `bnot`, `shl`, `shr`, `ushr`

**Type:** `as`, `of`, `typeof`, `instanceof`, `type`

**Module:** `import`, `from`, `export`, `default`, `require`, `use`, `namespace`, `public`, `all`

**Value:** `true`, `false`, `null`, `nil`, `undefined`, `nan`, `infinity`

**Constructor:** `list`, `object`

**Error handling:** `try`, `catch`, `finally`, `throw`

**Class:** `class`, `extends`, `super`, `static`, `private`, `get`, `set`

**Wildcard:** `blank`

**Other:** `new`, `delete`, `this`

### 3.4 Literals

| Type | Syntax | Example |
|------|--------|---------|
| Integer | Decimal digits | `42`, `-3` |
| Float | Digits with `.` | `3.14`, `-0.5` |
| String | `///` delimiters | `///hello///` |
| Interpolated string | `///...[expr]...///` | `///Hello, [name]!///` |
| Regex | `/pattern/flags` | `/[a-z]+/gi` |
| Boolean | `true` / `false` | `true` |
| Null | `null` / `nil` | `null` |
| Undefined | `undefined` | `undefined` |
| NaN | `nan` | `NaN` |
| Infinity | `infinity` | `Infinity` |
| -Infinity | `neg infinity` / `-infinity` | `-Infinity` |

**Negative number literals** are recognized after these tokens: `[`, `,`, `;`, `be`, `\`, newline, indent, `return`, `to`, `then`, `coal`.

### 3.5 Punctuation

| Symbol | Name | Role |
|--------|------|------|
| `[` | Left bracket | Call, array, object, grouping, destructuring |
| `]` | Right bracket | Closing bracket |
| `,` | Comma | Separator (arrays, objects) |
| `;` | Semicolon | Separator (function args, params, destructuring) |
| `.` | Dot | Property access |
| `\.` | Optional dot | Optional chaining (`?.`) |
| `\` | Backslash | Computed access prefix (`[...]`) |
| `..` | Double dot | Inclusive range |
| `...` | Triple dot | Exclusive range |

### 3.6 Shebang

A `#!` line at the beginning of a file is recognized and preserved:

```
#!/usr/bin/env node
const message be //;Hello;//
```

---

## 4. Types and Literals

### 4.1 Numbers

```
const i be 42      -- integer
const f be 3.14    -- float
const n be -7      -- negative integer
```

Binary and hexadecimal literals:

```
const mask be 0b1010      -- 10
const color be 0xFF00FF   -- 16711935
```

BigInt literals — append `n` suffix to any integer (decimal, binary, or hex):

```
const big be 9007199254740993n
const hex be 0xFFFFFFFFFFFFFFFFn
const bin be 0b11111111n
big add 1n                         -- 9007199254740994n
```

BigInt compiles directly to JavaScript BigInt literals. Arithmetic on BigInt requires both operands to be BigInt.

### 4.2 Strings

Purus has two string syntaxes that produce identical output. The semicolon form `//;...;//` is **recommended**; the triple-slash form `///...///` remains fully supported for backward compatibility.

**Semicolon strings** `//;...;//` (recommended, since v0.11.0):

```
const greeting be //;Hello, World;//
const url be //;https://api.example.com;//
```

**Triple-slash strings** `///...///` (original, fully supported):

```
const greeting be ///Hello, World///
const url be ///https://api.example.com///
```

Both compile to identical JavaScript string literals. The semicolon form is preferred because:
- `;` as delimiter does not conflict with `[expr]` interpolation
- `//` inside the content (e.g. in URLs) cannot be confused with the closing delimiter `;//`

```js
const greeting = "Hello, World";
const url = "https://api.example.com";
```

**Escape sequences** (apply to both syntaxes):

| Escape | Result |
|--------|--------|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\/` | `/` |
| `\[` | `[` (literal bracket, prevents interpolation) |
| `\]` | `]` (literal bracket) |
| `\;` | `;` (literal semicolon; in `//;...;//` also prevents early `;//` close) |

### 4.3 String Interpolation

Embed expressions inside strings using `[expr]`:

```
const name be //;Alice;//
const age be 30
const msg be //;Hello, [name]! You are [age] years old.;//
```

Compiles to:

```js
const name = "Alice";
const age = 30;
const msg = `Hello, ${name}! You are ${age} years old.`;
```

Any valid Purus expression can appear inside brackets:

```
const result be //;[x] times 2 is [x mul 2];//
```

Nested brackets are correctly handled — the lexer tracks bracket depth:

```
const msg be //;first: [arr[0]];//
```

Both string syntaxes support interpolation:

```
const msg be //;Hello, [name]! You are [age] years old.;//
```

To include a literal `[` or `]` in a string, use `\[` and `\]`.

When a string contains no interpolated expressions, it is compiled to a regular JS string (`"..."`). When interpolation is present, it is compiled to a template literal (`` `...` ``).

### 4.4 Booleans

```
const a be true
const b be false
```

### 4.5 Null Family

```
const a be null
const b be nil         -- alias for null
const c be undefined
const d be nan         -- NaN
const e be infinity    -- Infinity
const f be neg infinity -- -Infinity
const g be -infinity   -- -Infinity (special case)
```

Both `null` and `nil` compile to JavaScript `null`.
`nan` compiles to JavaScript `NaN`.
`infinity` compiles to JavaScript `Infinity`. `neg infinity` and `-infinity` both compile to `-Infinity`.

### 4.6 Regular Expressions

Regex literals use `/pattern/flags` syntax:

```
const pattern be /[a-z]+/gi
```

Supported flags: `g`, `i`, `m`, `s`, `u`, `y`.

### 4.7 Arrays

**Explicit array:**

```
const arr be [1, 2, 3]
const arr2 be [1; 2; 3]     -- semicolons also work
const empty be []
```

**Explicit constructor:** `list[...]` is identical to `[...]`:

```
const items be list[1; 2; 3]
```

**Range arrays:** See [Section 11.1](#111-ranges).

### 4.8 Objects

**Bracket syntax:**

```
const obj be [name be //;Alice;//, age be 30]
const empty-obj be [be]    -- empty object
```

**Explicit constructor:** `object[...]`:

```
const person be object[name be //;Alice;//, age be 30]
```

**Shorthand properties:**

```
const x be 10
const y be 20
const point be object[x, y]
-- compiles to: { x, y }
```

Compiles to:

```js
const obj = { name: "Alice", age: 30 };
const emptyObj = {};
const person = { name: "Alice", age: 30 };
const point = { x, y };
```

---

## 5. Operators

### 5.1 Operator Precedence

From lowest to highest:

| Level | Operator(s) | Description |
|-------|-------------|-------------|
| 1 | `pipe` | Pipeline |
| 2 | `coal` | Nullish coalescing |
| 3 | `or` | Logical OR |
| 4 | `and` | Logical AND |
| 5 | `bor` | Bitwise OR |
| 6 | `bxor` | Bitwise XOR |
| 7 | `band` | Bitwise AND |
| 8 | `eq` / `neq` / `not eq` / `instanceof` | Equality |
| 9 | `lt` / `gt` / `le` (`lt eq`) / `ge` (`gt eq`) | Comparison |
| 10 | `shl` / `shr` / `ushr` | Bitwise shift |
| 11 | `add` / `sub` | Addition / Subtraction |
| 12 | `mul` / `div` / `mod` | Multiplication / Division / Modulo |
| 13 | `pow` | Exponentiation (right-associative) |
| 14 | `not` / `neg` / `bnot` / `typeof` / `void` / `await` / `delete` / `new` | Unary |
| 15 | `.` access / `\.` optional / `[args]` call / `[\expr]` access / `as` cast | Postfix |
| 16 | Literals, identifiers, brackets | Primary |

### 5.2 Arithmetic

| Purus | JS | Description |
|-------|----|-------------|
| `a add b` | `a + b` | Addition |
| `a sub b` | `a - b` | Subtraction |
| `a mul b` | `a * b` | Multiplication |
| `a div b` | `a / b` | Division |
| `a mod b` | `a % b` | Modulo |
| `a pow b` | `a ** b` | Exponentiation |
| `neg x` | `-x` | Unary negation |

`pow` is **right-associative**: `a pow b pow c` → `a ** (b ** c)`.

### 5.3 Comparison

| Purus | JS | Description |
|-------|----|-------------|
| `a eq b` | `a === b` | Strict equality |
| `a neq b` | `a !== b` | Strict inequality |
| `a not eq b` | `a !== b` | Alternative inequality |
| `a lt b` | `a < b` | Less than |
| `a gt b` | `a > b` | Greater than |
| `a le b` | `a <= b` | Less than or equal |
| `a lt eq b` | `a <= b` | Alternative LE |
| `a ge b` | `a >= b` | Greater than or equal |
| `a gt eq b` | `a >= b` | Alternative GE |

**Note:** `not eq` is an alias for `neq`, `lt eq` is an alias for `le`, and `gt eq` is an alias for `ge`. Both forms compile to the same JavaScript output.

### 5.4 Logical

| Purus | JS | Description |
|-------|----|-------------|
| `a and b` | `a && b` | Logical AND |
| `a or b` | `a \|\| b` | Logical OR |
| `not x` | `!x` | Logical NOT |

### 5.5 Bitwise

| Purus | JS | Description |
|-------|----|-------------|
| `a band b` | `a & b` | Bitwise AND |
| `a bor b` | `a \| b` | Bitwise OR |
| `a bxor b` | `a ^ b` | Bitwise XOR |
| `bnot x` | `~x` | Bitwise NOT (unary) |
| `a shl b` | `a << b` | Left shift |
| `a shr b` | `a >> b` | Right shift (sign-preserving) |
| `a ushr b` | `a >>> b` | Unsigned right shift |

### 5.6 Nullish Coalescing

The `coal` operator returns the right-hand side when the left-hand side is `null` or `undefined`:

| Purus | JS |
|-------|----|
| `a coal b` | `a ?? b` |
| `a coal b coal c` | `a ?? b ?? c` |

Unlike `or`, which treats all falsy values (`false`, `0`, `""`) as false, `coal` only treats `null` and `undefined` as "empty":

```
const port be config.port coal 3000
-- uses 3000 only if port is null/undefined; 0 would be preserved
```

### 5.7 Pipeline

The `pipe` operator passes the left operand as the first argument to the right operand:

```
data pipe filter                     -- filter(data)
data pipe filter pipe map            -- map(filter(data))
data pipe transform[extra-arg]       -- transform(data, extra_arg)
data pipe .method[arg]               -- data.method(arg)
```

Compilation rules:
- `a pipe f` → `f(a)`
- `a pipe f[x; y]` → `f(a, x, y)` (prepends `a` as first argument)
- `a pipe .method[x]` → `a.method(x)` (method call on `a`)

### 5.8 Optional Chaining

The `\.` operator provides safe property access on potentially null/undefined values. It compiles to JavaScript's optional chaining operator `?.`:

```
const name be user\.profile\.name
const result be obj\.method[arg]
```

```js
const name = user?.profile?.name;
const result = obj?.method(arg);
```

`\.` can be used for:
- **Property access:** `obj\.prop` → `obj?.prop`
- **Method calls:** `obj\.method[args]` → `obj?.method(args)`

Combine with `coal` for default values:

```
const display be user\.name coal //;anonymous;//
```

### 5.9 Type Check and Cast

**Type check with `typeof`:**

| Purus | JS |
|-------|----|
| `typeof x` | `typeof x` |
| `typeof x eq ///string///` | `typeof x === "string"` |
| `x instanceof Y` | `x instanceof Y` |

**Type cast with `as`:**

```
x as number    -- erased in JS output (passes through x)
```

---

## 6. Declarations

### 6.1 Variable Declaration

```
const x be 42          -- const x = 42;
let y be 10            -- let y = 10;
var z be 0             -- var z = 0;  (discouraged)
```

Optional type annotation with `of` (erased in JS):

```
const x of Number be 42
```

### 6.2 Array Destructuring

```
const [a; b; c] be arr
let [first; second] be list[1; 2]
```

Compiles to:

```js
const [a, b, c] = arr;
let [first, second] = [1, 2];
```

Variable swap:

```
[a; b] be [b; a]
```

### 6.3 Object Destructuring

Use `object[...]` before `be`:

```
const object[name; age] be person
let object[host; port] be config
```

Compiles to:

```js
const { name, age } = person;
let { host, port } = config;
```

### 6.4 Assignment

Property and index assignments use `be` without a declaration keyword:

```
obj.field be //;new value;//
this.x be 10
arr[\i] be 0
```

Compiles to:

```js
obj.field = "new value";
this.x = 10;
arr[i] = 0;
```

> **Note:** Bare identifier assignment (`x be 42`) is **not supported**. Use `const x be 42` or `let x be 42` instead. This restriction prevents accidental implicit global creation and conflicts with runtime-provided globals (e.g. `process` in Node.js).

A declaration keyword may be used with dotted property access. When `obj` has not yet been declared in the current scope, it is automatically initialized to `{}` with the same keyword before the assignment. Subsequent dotted declarations on the same name reuse the existing binding.

```
const p.x be 10    -- const p = {}; p.x = 10;
const p.y be 20    -- p.y = 20;  (no re-init)

let cfg.host be //;localhost;//   -- let cfg = {}; cfg.host = "localhost";
let cfg.port be 3000              -- cfg.port = 3000;

var state.count be 0              -- var state = {}; state.count = 0;
```

**Compound assignment** combines an operation with assignment. Supported operators:

| Purus | JS | Category |
|-------|-----|----------|
| `x add be n` | `x += n` | Arithmetic |
| `x sub be n` | `x -= n` | Arithmetic |
| `x mul be n` | `x *= n` | Arithmetic |
| `x div be n` | `x /= n` | Arithmetic |
| `x mod be n` | `x %= n` | Arithmetic |
| `x pow be n` | `x **= n` | Arithmetic |
| `x band be n` | `x &= n` | Bitwise |
| `x bor be n` | `x \|= n` | Bitwise |
| `x bxor be n` | `x ^= n` | Bitwise |
| `x shl be n` | `x <<= n` | Bitwise |
| `x shr be n` | `x >>= n` | Bitwise |
| `x ushr be n` | `x >>>= n` | Bitwise |
| `x and be v` | `x &&= v` | Logical |
| `x or be v` | `x \|\|= v` | Logical |
| `x coal be v` | `x ??= v` | Nullish |

### 6.5 Type Alias

```
type UserId be Number
```

Type aliases are erased in JavaScript output.

---

## 7. Functions

### 7.1 Named Functions

**Block body:**

```
fn greet name
  console.log[name]
```

```js
function greet(name) {
  console.log(name);
}
```

### 7.2 No-Argument Functions

Simply omit the parameter list:

```
fn say-hello
  console.log[//;Hello!;//]
```

```js
function say_hello() {
  console.log("Hello!");
}
```

With expression body:

```
fn say-hello to console.log[//;Hello!;//]
```

```js
function say_hello() { console.log("Hello!"); }
```

### 7.3 Multiple Parameters

Use `;` to separate parameters:

```
fn add a; b
  return a add b
```

```js
function add(a, b) {
  return a + b;
}
```

### 7.4 Expression Body

Use `to` for single-expression function bodies. Named functions do not have implicit return — use `to return` for explicit return.

```
fn greet name to console.log[name]
```

```js
function greet(name) { console.log(name); }
```

**Explicit return with `to return`:**

```
fn double x to return x mul 2
```

```js
function double(x) { return x * 2; }
```

### 7.5 Anonymous Functions

**Arrow expression:**

```
const double be fn x to x mul 2
```

```js
const double = (x) => x * 2;
```

**Arrow with no arguments:**

```
const get-time be fn to Date.now[]
```

```js
const get_time = () => Date.now();
```

**Arrow with block body:**

```
const process be fn data
  console.log[data]
  return data
```

```js
const process = (data) => {
  console.log(data);
  return data;
};
```

### 7.6 Async Functions

```
async fn fetch-data url
  const res be await fetch[url]
  return res
```

```js
async function fetch_data(url) {
  const res = await fetch(url);
  return res;
}
```

### 7.7 Function Calls

Use `[]` instead of `()`:

```
greet[//;world;//]        -- greet("world")
add[1; 2]                -- add(1, 2)
console.log[//;hello;//]  -- console.log("hello")
```

**Nested calls:** Use `;` to separate arguments to distinguish from nested function calls:

```
a[b[c]; d]               -- a(b(c), d)
outer[inner1[x]; inner2[y; z]]  -- outer(inner1(x), inner2(y, z))
```

### 7.8 Computed Access

To access array elements or object properties with a computed key, use `\` inside brackets to distinguish from function calls:

```
const item be arr[\index]
const value be obj[\key]
const first be arr[\0]
```

```js
const item = arr[index];
const value = obj[key];
const first = arr[0];
```

Without the `\` prefix, brackets are interpreted as a function call: `arr[index]` → `arr(index)`.

### 7.9 Async Function Expressions

Async anonymous functions can be used as expressions:

**Expression body:**

```
const fetch-data be async fn url to await fetch[url]
```

```js
const fetch_data = async (url) => await fetch(url);
```

**Block body:**

```
const process be async fn data
  const result be await transform[data]
  return result
```

```js
const process = async (data) => {
  const result = await transform(data);
  return result;
};
```

### 7.10 Inline Callbacks

Anonymous functions (including async) can be passed directly as arguments in function calls, enabling method chaining with callbacks:

```
promise.then[fn result
  console.log[result]
].catch[fn err
  console.error[err]
]
```

```js
promise.then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

With multi-line brackets, complex callback patterns become natural:

```
app.get[//;path;//; async fn req; res
  const data be await fetch-data[]
  res.json[data]
]
```

### 7.11 Type Annotations

Type annotations are erased in JavaScript:

```
fn add a of Number; b of Number gives Number to a add b
```

- `of Type` — parameter type annotation
- `gives Type` — return type annotation

### 7.12 Ignored Parameters (`blank`)

Use `blank` as a parameter name to explicitly ignore that argument position. This is the Purus equivalent of the common `_` convention in JavaScript, chosen because `_` requires the Shift key.

```
-- Ignore the first argument (element), use only the index
const indices be Array.from[[length be 5]; fn blank; i to i]
```

```js
const indices = Array.from({ length: 5 }, (_, i) => i);
```

Multiple `blank` parameters receive unique JavaScript names (`_`, `_1`, `_2`, …) to avoid strict-mode duplicate-parameter errors:

```
fn f blank; blank; x to x
```

```js
function f(_, _1, x) { return x; }
```

Works in all function forms: named, anonymous, async, and class methods.

### 7.13 Generator Functions

A function that contains `yield` is automatically compiled as a generator (`function*`):

```
fn count-up limit
  let i be 0
  while i lt limit
    yield i
    i be i add 1
```

```js
function* countUp(limit) {
  let i = 0;
  while (i < limit) {
    yield i;
    i = i + 1;
  }
}
```

`yield` can also be used with no value or in expressions:

```
fn infinite-ids
  let id be 1
  while true
    yield id
    id be id add 1
```

---

## 8. Control Flow

### 8.1 If / Elif / Else

```
if x lt 0
  console.log[//;negative;//]
elif x eq 0
  console.log[//;zero;//]
else
  console.log[//;positive;//]
```

`else if` is also accepted as an alternative to `elif`.

### 8.2 Unless

Negated conditional:

```
unless done
  keep-going[]
```

```js
if (!(done)) {
  keep_going();
}
```

### 8.3 Inline If (Ternary)

```
const result be if condition then 1 else 2
```

```js
const result = condition ? 1 : 2;
```

### 8.4 Postfix Modifiers

Statements can have postfix `if`, `unless`, or `for`:

```
console.log[//;debug;//] if verbose
console.log[//;skip;//] unless done
console.log[item] for item in list
```

```js
if (verbose) console.log("debug");
if (!(done)) console.log("skip");
for (const item of list) console.log(item);
```

### 8.5 While / Until

```
while i lt 10
  i be i add 1

until finished
  do-work[]
```

`until COND` compiles to `while (!(COND))`.

### 8.6 Do-While

`do...while` executes the body at least once before checking the condition:

```
do
  process-item[]
while has-more[]
```

```js
do {
  processItem();
} while (hasMore());
```

> **Note:** `do` is a deprecated keyword. Prefer `while` or `until` with appropriate initialization.

### 8.7 For-in

**Basic iteration:**

```
for item in items
  console.log[item]
```

```js
for (const item of items) {
  console.log(item);
}
```

**With index:**

```
for i; item in items
  console.log[i; item]
```

```js
for (let [i, item] of items.entries()) {
  console.log(i, item);
}
```

### 8.8 For-range

```
for i in range 0; 10
  console.log[i]
```

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

### 8.9 Switch / Case / Default

**Statement form:**

```
switch x
  case 1 then //;one;//
  case 2 then //;two;//
  default //;other;//
```

**Block body in arms:**

```
switch value
  case n if n gt 0
    console.log[//;positive;//]
  default
    console.log[//;non-positive;//]
```

**Expression form** (compiled to IIFE):

```
const label be switch status
  case 200 then //;ok;//
  case 404 then //;not found;//
  default //;unknown;//
```

Switch arms support:
- **Literal patterns:** `case 1`, `case ///hello///`, `case true`
- **Binding patterns:** `case n` (binds the value to `n`)
- **Wildcard:** `default` (default arm, matches anything) or `case blank` (anonymous wildcard, no binding)
- **Guards:** `case n if n gt 0` (additional condition)
- **Body:** `then EXPR` (expression) or indented block

`blank` in a `case` arm acts as a wildcard: it matches any value without creating a binding.

```
switch status
  case //;ok;// then //;good;//
  case blank then //;unknown;//
```

### 8.10 Match / When (deprecated)

> **Deprecated:** Use `switch` / `case` / `default` instead.
> `match` / `when` is kept for backward compatibility.

**Statement form:**

```
match x
  when 1 then //;one;//
  when 2 then //;two;//
  else //;other;//
```

**Block body in arms:**

```
match value
  when n if n gt 0
    console.log[//;positive;//]
  else
    console.log[//;non-positive;//]
```

**Expression form** (compiled to IIFE):

```
const label be match status
  when 200 then //;ok;//
  when 404 then //;not found;//
  else //;unknown;//
```

Match arms support:
- **Literal patterns:** `when 1`, `when ///hello///`, `when true`
- **Binding patterns:** `when n` (binds the value to `n`)
- **Wildcard:** `else` (default arm, matches anything)
- **Guards:** `when n if n gt 0` (additional condition)
- **Body:** `then EXPR` (expression) or indented block

### 8.11 Break / Continue / Return

```
break
continue
return
return value
```

---

## 9. Error Handling

### 9.1 Try / Catch / Finally

```
try
  risky[]
catch e
  console.log[e]
finally
  cleanup[]
```

The catch variable name is optional; defaults to `e` if omitted.

### 9.2 Try as Expression

```
const result be try
  risky[]
catch e
  default-value
```

Compiles to an IIFE with try/catch.

### 9.3 Throw

```
throw new Error[//;something went wrong;//]
throw err if condition    -- postfix if
```

---

## 10. Modules

### 10.1 ESM Import

```
import express from //;express;//
import [Hono] from //;hono;//
import [describe; it; expect] from //;vitest;//
import axios, [AxiosError] from //;axios;//
import all as fs from //;fs;//
```

```js
import express from "express";
import { Hono } from "hono";
import { describe, it, expect } from "vitest";
import axios, { AxiosError } from "axios";
import * as fs from "fs";
```

### 10.2 From...Import

The `from...import` syntax places the module path first, followed by the import bindings:

```
from //;express;// import express
from //;react;// import [useState, useEffect]
from //;fs;// import all as fs
from //;axios;// import axios, [AxiosError]
```

```js
import express from "express";
import { useState, useEffect } from "react";
import * as fs from "fs";
import axios, { AxiosError } from "axios";
```

This is equivalent to the `import...from` syntax in §10.1 with reversed order.

### 10.3 Use (Standard Library Import)

The `use` keyword imports Purus built-in standard library modules. All module names are prefixed with `p-` to avoid keyword conflicts. The `as` keyword is optional — when omitted, the module name is used as the binding name (with `-` converted to `_` in the JS output).

Tree-shaking ensures only the functions you actually reference are included in the compiled output.

**Syntax:**

```
use p-random as r
use p-math as m
use p-math                 -- equivalent to: use p-math as p-math (binding: p_math)
use p-string as s
use p-datetime as dt
use p-json as j
use p-json                 -- equivalent to: use p-json as p-json (binding: p_json)
use p-object as o
use p-number as n
use p-array as a
use p-error as e
```

```js
// Only used functions are emitted (tree-shaking)
const r = { randint(a, b) { ... }, choice(arr) { ... } };
const m = { floor: Math.floor, pi: Math.PI };
const s = { upper(str) { ... }, reverse(str) { ... } };
```

The `p-math` module is a direct alias for JS `Math` — all standard `Math` methods (e.g. `abs`, `floor`, `sin`, `sqrt`) are available, plus lowercase constant aliases (`pi`, `e`, `ln2`, etc.).

**Available standard library modules:**

| Module | Contents |
|--------|----------|
| `p-random` | `random`, `randint`, `randrange`, `randbool`, `uniform`, `triangular`, `gauss`, `expovariate`, `gammavariate`, `betavariate`, `lognormvariate`, `vonmisesvariate`, `paretovariate`, `weibullvariate`, `choice`, `choices`, `wchoices`, `shuffle`, `sample`, `binomial`, `poisson`, `geometric`, `clamp`, `lerp` |
| `p-math` | JS `Math` alias + lowercase constant aliases (`pi`, `e`, `ln2`, `ln10`, `log2e`, `log10e`, `sqrt2`, `sqrt1_2`) |
| `p-string` | `len`, `contains`, `startswith`, `endswith`, `indexof`, `count`, `upper`, `lower`, `capitalize`, `title`, `trim`, `trimstart`, `trimend`, `reverse`, `repeat`, `replace`, `replacefirst`, `padstart`, `padend`, `split`, `lines`, `words`, `join`, `chars`, `slice`, `charat`, `codeat`, `fromcode` |
| `p-datetime` | `now`, `today`, `timestamp`, `create`, `utccreate`, `fromiso`, `year`, `month`, `day`, `weekday`, `hour`, `minute`, `second`, `ms`, `utcyear`, `utcmonth`, `utcday`, `utcweekday`, `utchour`, `utcminute`, `utcsecond`, `utcms`, `tzyear`, `tzmonth`, `tzday`, `tzweekday`, `tzhour`, `tzminute`, `tzsecond`, `toiso`, `tolocale`, `todate`, `totime`, `format`, `addms`, `addseconds`, `addminutes`, `addhours`, `adddays`, `diff`, `diffdays`, `diffhours`, `diffminutes`, `diffseconds`, `offset`, `localtz` |
| `p-json` | `parse`, `stringify`, `prettify` |
| `p-object` | `keys`, `values`, `entries`, `fromentries`, `assign`, `freeze`, `seal`, `isfrozen`, `issealed`, `hasown`, `create`, `is`, `len`, `merge`, `clone`, `pick`, `omit` |
| `p-number` | `isfinite`, `isinteger`, `isnan`, `issafe`, `parsefloat`, `parseint`, `tofixed`, `toprecision`, `toexponential`, `tostring`, `clamp` + constants: `maxsafe`, `minsafe`, `epsilon`, `maxvalue`, `minvalue`, `posinf`, `neginf` |
| `p-array` | `isarray`, `from`, `of`, `len`, `first`, `last`, `range`, `flatten`, `unique`, `zip`, `unzip`, `chunk`, `sum`, `product`, `min`, `max`, `sortasc`, `sortdesc`, `compact`, `count`, `groupby` |
| `p-error` | `create`, `type`, `range`, `reference`, `syntax`, `uri`, `iserror`, `message`, `name`, `stack`, `cause`, `wrap` |
| `p-regexp` | `create`, `test`, `exec`, `match`, `matchall`, `search`, `replace`, `replaceall`, `split`, `flags`, `source`, `escape` |
| `p-promise` | `create`, `resolve`, `reject`, `all`, `allsettled`, `any`, `race`, `delay`, `timeout`, `retry`, `map`, `each`, `filter`, `reduce`, `props` |
| `p-set` | `create`, `from`, `add`, `delete`, `has`, `clear`, `size`, `values`, `union`, `intersection`, `difference`, `symmetric`, `issubset`, `issuperset`, `isdisjoint`, `toarray`, `map`, `filter` |
| `p-map` | `create`, `from`, `entries`, `get`, `set`, `delete`, `has`, `clear`, `size`, `keys`, `values`, `toentries`, `toobject`, `merge`, `map`, `filter`, `find`, `groupby` |

**`p-random` module API:**

| Function | Description | Example |
|----------|-------------|---------|
| `random[]` | Random float 0–1 | `r.random[]` → `0.7234...` |
| `randint[a; b]` | Random integer (inclusive) | `r.randint[1; 10]` → `7` |
| `randrange[stop]` | Random int in range | `r.randrange[10]` → `7` |
| `randrange[start; stop; step]` | Random int with step | `r.randrange[0; 100; 5]` → `45` |
| `randbool[]` | Random boolean | `r.randbool[]` → `true` |
| `uniform[a; b]` | Random float in range | `r.uniform[0.0; 1.0]` → `0.583...` |
| `triangular[lo; hi; mode]` | Triangular distribution | `r.triangular[0; 10; 3]` → `4.2...` |
| `gauss[mu; sigma]` | Gaussian (normal) distribution | `r.gauss[0; 1]` → `-0.42...` |
| `expovariate[lambd]` | Exponential distribution | `r.expovariate[1.5]` → `0.73...` |
| `gammavariate[alpha; beta]` | Gamma distribution | `r.gammavariate[2; 1]` → `1.58...` |
| `betavariate[alpha; beta]` | Beta distribution | `r.betavariate[2; 5]` → `0.27...` |
| `lognormvariate[mu; sigma]` | Log-normal distribution | `r.lognormvariate[0; 1]` → `1.42...` |
| `vonmisesvariate[mu; kappa]` | Von Mises distribution | `r.vonmisesvariate[0; 4]` → `0.31...` |
| `paretovariate[alpha]` | Pareto distribution | `r.paretovariate[1]` → `1.82...` |
| `weibullvariate[alpha; beta]` | Weibull distribution | `r.weibullvariate[1; 1.5]` → `0.63...` |
| `choice[arr]` | Random element from array | `r.choice[list[1; 2; 3]]` → `2` |
| `choices[arr; k]` | Pick k with replacement | `r.choices[list[1; 2; 3]; 5]` → `[2, 3, 1, 3, 2]` |
| `wchoices[arr; weights; k]` | Weighted pick k with replacement | `r.wchoices[list[1; 2; 3]; list[1; 2; 7]; 3]` → `[3, 3, 2]` |
| `shuffle[arr]` | Shuffled copy of array | `r.shuffle[list[1; 2; 3]]` → `[3, 1, 2]` |
| `sample[arr; k]` | Pick k without replacement | `r.sample[list[1; 2; 3]; 2]` → `[3, 1]` |
| `binomial[n; p]` | Binomial distribution | `r.binomial[10; 0.5]` → `6` |
| `poisson[lambda]` | Poisson distribution | `r.poisson[4]` → `3` |
| `geometric[p]` | Geometric distribution | `r.geometric[0.5]` → `2` |
| `clamp[val; lo; hi]` | Clamp value to range | `r.clamp[15; 0; 10]` → `10` |
| `lerp[a; b; t]` | Linear interpolation | `r.lerp[0; 100; 0.5]` → `50` |

**`p-string` module API:**

| Function | Description | Example |
|----------|-------------|---------|
| `len[str]` | String length | `s.len[///hello///]` → `5` |
| `contains[str; sub]` | Check if contains substring | `s.contains[///hello///; ///ell///]` → `true` |
| `startswith[str; prefix]` | Check prefix | `s.startswith[///hello///; ///he///]` → `true` |
| `endswith[str; suffix]` | Check suffix | `s.endswith[///hello///; ///lo///]` → `true` |
| `indexof[str; sub]` | First index of substring | `s.indexof[///hello///; ///ll///]` → `2` |
| `count[str; sub]` | Count occurrences | `s.count[///banana///; ///an///]` → `2` |
| `upper[str]` | Uppercase | `s.upper[///hello///]` → `///HELLO///` |
| `lower[str]` | Lowercase | `s.lower[///HELLO///]` → `///hello///` |
| `capitalize[str]` | Capitalize first char | `s.capitalize[///hello///]` → `///Hello///` |
| `title[str]` | Title case | `s.title[///hello world///]` → `///Hello World///` |
| `trim[str]` | Trim whitespace | `s.trim[/// hello ///]` → `///hello///` |
| `reverse[str]` | Reverse string | `s.reverse[///abc///]` → `///cba///` |
| `repeat[str; n]` | Repeat n times | `s.repeat[///ab///; 3]` → `///ababab///` |
| `replace[str; old; new]` | Replace all occurrences | `s.replace[///aabb///; ///a///; ///x///]` → `///xxbb///` |
| `padstart[str; len; fill]` | Pad start | `s.padstart[///5///; 3; ///0///]` → `///005///` |
| `padend[str; len; fill]` | Pad end | `s.padend[///5///; 3; ///0///]` → `///500///` |
| `split[str; sep]` | Split string | `s.split[///a,b,c///; ///,///]` → `[///a///; ///b///; ///c///]` |
| `lines[str]` | Split by newlines | `s.lines[///a\nb///]` → `[///a///; ///b///]` |
| `words[str]` | Split by whitespace | `s.words[///foo bar///]` → `[///foo///; ///bar///]` |
| `join[arr; sep]` | Join array | `s.join[list[///a///; ///b///]; ///,///]` → `///a,b///` |
| `chars[str]` | Split into chars | `s.chars[///abc///]` → `[///a///; ///b///; ///c///]` |
| `slice[str; start; end]` | Slice substring | `s.slice[///hello///; 1; 3]` → `///el///` |
| `charat[str; i]` | Char at index | `s.charat[///hello///; 0]` → `///h///` |
| `codeat[str; i]` | Code point at index | `s.codeat[///A///; 0]` → `65` |
| `fromcode[code]` | String from code point | `s.fromcode[65]` → `///A///` |

**`p-datetime` module API:**

| Function | Description | Example |
|----------|-------------|---------|
| `now[]` | Current timestamp (ms) | `dt.now[]` → `1712000000000` |
| `today[]` | Start of today (ms) | `dt.today[]` → `1711929600000` |
| `timestamp[]` | Unix timestamp (seconds) | `dt.timestamp[]` → `1712000000` |
| `create[y; m; d; h; min; s; ms]` | Create local timestamp | `dt.create[2026; 4; 2]` → `...` |
| `utccreate[y; m; d; h; min; s; ms]` | Create UTC timestamp | `dt.utccreate[2026; 4; 2]` → `...` |
| `fromiso[str]` | Parse ISO 8601 | `dt.fromiso[///2026-04-02T00:00:00Z///]` → `...` |
| `year[t]` | Extract year (local) | `dt.year[dt.now[]]` → `2026` |
| `month[t]` | Extract month 1–12 (local) | `dt.month[dt.now[]]` → `4` |
| `day[t]` | Extract day 1–31 (local) | `dt.day[dt.now[]]` → `2` |
| `weekday[t]` | Day of week 0=Sun (local) | `dt.weekday[dt.now[]]` → `4` |
| `hour[t]` / `minute[t]` / `second[t]` / `ms[t]` | Extract time parts (local) | `dt.hour[dt.now[]]` → `14` |
| `utcyear[t]` | Extract year (UTC) | `dt.utcyear[dt.now[]]` → `2026` |
| `utcmonth[t]` / `utcday[t]` / `utcweekday[t]` | Extract date parts (UTC) | `dt.utcmonth[dt.now[]]` → `4` |
| `utchour[t]` / `utcminute[t]` / `utcsecond[t]` / `utcms[t]` | Extract time parts (UTC) | `dt.utchour[dt.now[]]` → `5` |
| `tzyear[t; tz]` | Extract year in timezone | `dt.tzyear[dt.now[]; ///America/New_York///]` → `2026` |
| `tzmonth[t; tz]` / `tzday[t; tz]` / `tzweekday[t; tz]` | Extract date parts in timezone | `dt.tzday[dt.now[]; ///Asia/Tokyo///]` → `2` |
| `tzhour[t; tz]` / `tzminute[t; tz]` / `tzsecond[t; tz]` | Extract time parts in timezone | `dt.tzhour[dt.now[]; ///America/New_York///]` → `10` |
| `toiso[t]` | Format as ISO 8601 | `dt.toiso[dt.now[]]` → `///2026-04-02T...Z///` |
| `tolocale[t; locale; options]` | Locale string | `dt.tolocale[dt.now[]; ///ja-JP///]` → `...` |
| `todate[t; locale; options]` | Date string | `dt.todate[dt.now[]; ///en-US///]` → `///4/2/2026///` |
| `totime[t; locale; options]` | Time string | `dt.totime[dt.now[]; ///en-US///]` → `///2:30:00 PM///` |
| `format[t; tz; locale; options]` | Format in timezone | `dt.format[dt.now[]; ///America/New_York///]` → `...` |
| `adddays[t; n]` | Add days | `dt.adddays[dt.now[]; 7]` → `...` |
| `addhours[t; n]` | Add hours | `dt.addhours[dt.now[]; 2]` → `...` |
| `addminutes[t; n]` / `addseconds[t; n]` / `addms[t; n]` | Add time | ... |
| `diff[a; b]` | Difference in ms | `dt.diff[t1; t2]` → `86400000` |
| `diffdays[a; b]` / `diffhours[a; b]` / `diffminutes[a; b]` / `diffseconds[a; b]` | Difference in units | ... |
| `offset[t]` | Local UTC offset (minutes) | `dt.offset[dt.now[]]` → `-540` |
| `localtz[]` | Local timezone name | `dt.localtz[]` → `///Asia/Tokyo///` |

**`p-json` module API:**

| Function | Description | Example |
|----------|-------------|---------|
| `parse[str]` | Parse JSON string | `j.parse[///{"a":1}///]` → `{ a: 1 }` |
| `stringify[val]` | Convert to JSON string | `j.stringify[obj]` → `///{"a":1}///` |
| `prettify[val; indent]` | Pretty-print JSON | `j.prettify[obj; 2]` → formatted string |

**`p-math` module — lowercase constant aliases:**

| Alias | Original | Value |
|-------|----------|-------|
| `pi` | `Math.PI` | `3.14159...` |
| `e` | `Math.E` | `2.71828...` |
| `ln2` | `Math.LN2` | `0.69314...` |
| `ln10` | `Math.LN10` | `2.30258...` |
| `sqrt2` | `Math.SQRT2` | `1.41421...` |

**`p-object` module API:**

| Function | Description | Example |
|----------|-------------|---------|
| `keys[obj]` | Object keys | `o.keys[obj]` → `[///a///; ///b///]` |
| `values[obj]` | Object values | `o.values[obj]` → `[1; 2]` |
| `entries[obj]` | Key-value pairs | `o.entries[obj]` → `[[///a///; 1]; [///b///; 2]]` |
| `fromentries[arr]` | Object from entries | `o.fromentries[list[list[///a///; 1]]]` → `{ a: 1 }` |
| `assign[target; ...sources]` | Merge objects | `o.assign[a; b]` → merged object |
| `freeze[obj]` | Freeze object | `o.freeze[obj]` |
| `seal[obj]` | Seal object | `o.seal[obj]` |
| `isfrozen[obj]` | Check if frozen | `o.isfrozen[obj]` → `true` |
| `issealed[obj]` | Check if sealed | `o.issealed[obj]` → `true` |
| `hasown[obj; key]` | Check own property | `o.hasown[obj; ///a///]` → `true` |
| `is[a; b]` | Object.is comparison | `o.is[nan; nan]` → `true` |
| `len[obj]` | Number of keys | `o.len[obj]` → `2` |
| `merge[...objs]` | Merge into new object | `o.merge[a; b]` → new merged object |
| `clone[obj]` | Deep clone | `o.clone[obj]` → deep copy |
| `pick[obj; keys]` | Pick keys | `o.pick[obj; list[///a///]]` → `{ a: 1 }` |
| `omit[obj; keys]` | Omit keys | `o.omit[obj; list[///a///]]` → `{ b: 2 }` |

**`p-number` module API:**

| Function | Description | Example |
|----------|-------------|---------|
| `isfinite[val]` | Check finite | `n.isfinite[42]` → `true` |
| `isinteger[val]` | Check integer | `n.isinteger[3.5]` → `false` |
| `isnan[val]` | Check NaN | `n.isnan[nan]` → `true` |
| `issafe[val]` | Safe integer check | `n.issafe[42]` → `true` |
| `parsefloat[str]` | Parse float | `n.parsefloat[///3.14///]` → `3.14` |
| `parseint[str; radix]` | Parse integer | `n.parseint[///ff///; 16]` → `255` |
| `tofixed[num; digits]` | Fixed decimals | `n.tofixed[3.14159; 2]` → `///3.14///` |
| `toprecision[num; digits]` | Precision string | `n.toprecision[123.456; 4]` → `///123.5///` |
| `toexponential[num; digits]` | Exponential notation | `n.toexponential[12345; 2]` → `///1.23e+4///` |
| `tostring[num; radix]` | Number to string | `n.tostring[255; 16]` → `///ff///` |
| `clamp[num; min; max]` | Clamp to range | `n.clamp[15; 0; 10]` → `10` |

**`p-number` module — constants:**

| Constant | Original | Value |
|----------|----------|-------|
| `maxsafe` | `Number.MAX_SAFE_INTEGER` | `9007199254740991` |
| `minsafe` | `Number.MIN_SAFE_INTEGER` | `-9007199254740991` |
| `epsilon` | `Number.EPSILON` | `2.220446049250313e-16` |
| `maxvalue` | `Number.MAX_VALUE` | `1.7976931348623157e+308` |
| `minvalue` | `Number.MIN_VALUE` | `5e-324` |
| `posinf` | `Number.POSITIVE_INFINITY` | `Infinity` |
| `neginf` | `Number.NEGATIVE_INFINITY` | `-Infinity` |

**`p-array` module API:**

| Function | Description | Example |
|----------|-------------|---------|
| `isarray[val]` | Check if array | `a.isarray[list[1; 2]]` → `true` |
| `from[val]` | Array from iterable | `a.from[///abc///]` → `[///a///; ///b///; ///c///]` |
| `of[...args]` | Create array | `a.of[1; 2; 3]` → `[1; 2; 3]` |
| `len[arr]` | Array length | `a.len[list[1; 2; 3]]` → `3` |
| `first[arr]` | First element | `a.first[list[1; 2; 3]]` → `1` |
| `last[arr]` | Last element | `a.last[list[1; 2; 3]]` → `3` |
| `range[start; end; step]` | Number range | `a.range[0; 5]` → `[0; 1; 2; 3; 4]` |
| `flatten[arr; depth]` | Flatten nested | `a.flatten[list[list[1; 2]; list[3]]]` → `[1; 2; 3]` |
| `unique[arr]` | Remove duplicates | `a.unique[list[1; 2; 2; 3]]` → `[1; 2; 3]` |
| `zip[...arrs]` | Zip arrays | `a.zip[list[1; 2]; list[///a///; ///b///]]` → `[[1; ///a///]; [2; ///b///]]` |
| `chunk[arr; size]` | Split into chunks | `a.chunk[list[1; 2; 3; 4]; 2]` → `[[1; 2]; [3; 4]]` |
| `sum[arr]` | Sum numbers | `a.sum[list[1; 2; 3]]` → `6` |
| `product[arr]` | Product of numbers | `a.product[list[2; 3; 4]]` → `24` |
| `min[arr]` | Minimum value | `a.min[list[3; 1; 2]]` → `1` |
| `max[arr]` | Maximum value | `a.max[list[3; 1; 2]]` → `3` |
| `sortasc[arr]` | Sort ascending | `a.sortasc[list[3; 1; 2]]` → `[1; 2; 3]` |
| `sortdesc[arr]` | Sort descending | `a.sortdesc[list[3; 1; 2]]` → `[3; 2; 1]` |
| `compact[arr]` | Remove falsy | `a.compact[list[0; 1; null; 2]]` → `[1; 2]` |
| `groupby[arr; fn]` | Group by function | `a.groupby[list[1; 2; 3]; fn x to x mod 2]` |

**`p-error` module API:**

| Function | Description | Example |
|----------|-------------|---------|
| `create[msg]` | Create Error | `e.create[///oops///]` |
| `type[msg]` | Create TypeError | `e.type[///bad type///]` |
| `range[msg]` | Create RangeError | `e.range[///out of range///]` |
| `reference[msg]` | Create ReferenceError | `e.reference[///not defined///]` |
| `syntax[msg]` | Create SyntaxError | `e.syntax[///bad syntax///]` |
| `uri[msg]` | Create URIError | `e.uri[///bad uri///]` |
| `iserror[val]` | Check if Error | `e.iserror[err]` → `true` |
| `message[err]` | Get message | `e.message[err]` → `///oops///` |
| `name[err]` | Get name | `e.name[err]` → `///Error///` |
| `stack[err]` | Get stack trace | `e.stack[err]` → stack string |
| `cause[err]` | Get cause | `e.cause[err]` → underlying error |
| `wrap[msg; cause]` | Wrap with cause | `e.wrap[///failed///; original-err]` |

### 10.4 Export / Public

```
public fn helper to 42
public const VERSION be //;1.0;//
export default fn main
  console.log[//;hi;//]
```

```js
export function helper() { return 42; }
export const VERSION = "1.0";
export default function main() {
  console.log("hi");
}
```

### 10.5 Namespace

```
namespace utils
  fn helper to 42
```

```js
const utils = (() => {
  function helper() { return 42; }
})();
```

Compiles to an IIFE (Immediately Invoked Function Expression).

### 10.6 Side-Effect Import

Import a module purely for its side effects (e.g., polyfills, configuration):

```
import //;dotenv/config;//
import //;./setup;//
```

```js
import "dotenv/config";
import "./setup";
```

No bindings are introduced — the module is simply executed.

### 10.7 Import Attributes

Import attributes allow specifying additional metadata for module imports using the `with` keyword:

```
import package from //;./package.json;// with [ type be //;json;// ]
import [name; version] from //;./package.json;// with [ type be //;json;// ]
```

```js
import package from "./package.json" with { type: "json" };
import { name, version } from "./package.json" with { type: "json" };
```

The `with` clause uses Purus's bracket syntax `[ key be value ]`, which compiles to JavaScript's `with { key: value }`. Multiple attributes can be separated by `;` or `,`.

### 10.8 CommonJS

```
const fs be require[//;fs;//]
```

```js
const fs = require("fs");
```

### 10.9 Dynamic Import

Dynamic imports are supported through standard function call syntax:

```
const mod be await import[//;./module.js;//]
```

### 10.10 Module Type Configuration

By default, `.purus` files compile as ES Modules (ESM). This can be configured to CommonJS via `--type` CLI option, `config.purus`, or `package.json`.

**Resolution order** (highest priority first):

1. CLI: `purus build --type commonjs`
2. `config.purus`: `const type be ///commonjs///`
3. `package.json`: `{ "type": "commonjs" }`
4. Default: `module` (ESM)

Values match `package.json`'s `type` field: `module` or `commonjs`.

**CommonJS output examples:**

```
import express from //;express;//
import [Hono] from //;hono;//
import all as fs from //;fs;//
import //;dotenv/config;//
```

```js
const express = require("express");
const { Hono } = require("hono");
const fs = require("fs");
require("dotenv/config");
```

```
public const VERSION be //;1.0;//
export default 42
```

```js
const VERSION = "1.0";
exports.VERSION = VERSION;
module.exports = 42;
```

File extension overrides: `.cpurus` → always CJS, `.mpurus` → always ESM, regardless of configuration.

---

## 11. Array Operations

### 11.1 Ranges

Generate arrays from numeric ranges:

```
const inclusive be [0..5]     -- [0, 1, 2, 3, 4, 5]
const exclusive be [0...5]   -- [0, 1, 2, 3, 4]
```

Compiles to `Array.from`:

```js
const inclusive = Array.from({ length: 5 - 0 + 1 }, (_, i) => i + 0);
const exclusive = Array.from({ length: 5 - 0 }, (_, i) => i + 0);
```

- `..` — inclusive (both start and end included)
- `...` — exclusive (end excluded)

### 11.2 Slicing

Extract a portion of an array:

```
const middle be numbers[\2..4]     -- numbers.slice(2, 5)  — inclusive
const partial be numbers[\1...4]   -- numbers.slice(1, 4)  — exclusive
```

### 11.3 Splicing

Assign to a slice to replace elements:

```
numbers[\2..4] be [//;a;//; //;b;//; //;c;//]
```

```js
numbers.splice(2, 4 - 2 + 1, "a", "b", "c");
```

---

## 12. Multi-line Brackets

Bracket expressions (function calls, arrays, objects) can span multiple lines. Newlines, indentation, and comments inside brackets are treated as whitespace:

**Multi-line array:**

```
const items be [
  //;apple;//,
  //;banana;//,
  //;cherry;//
]
```

**Multi-line function call:**

```
server.listen[
  port;
  fn to console.log[//;started;//]
]
```

**Multi-line object:**

```
const config be object[
  host be //;localhost;//,
  port be 3000,
  debug be true
]
```

This enables naturally readable code for complex data structures and function calls with multiple arguments or inline callbacks.

---

## 13. Indentation and Block Structure

Purus uses **indentation-based block structure** (off-side rule):

- Blocks are introduced by keywords like `fn`, `if`, `else`, `elif`, `while`, `for`, `match`, `when`, `try`, `catch`, `finally`, `namespace`.
- The block body must be indented more than the introducing keyword.
- The block ends when indentation returns to the parent level.
- Recommended indentation: **2 spaces**.
- Tabs are treated as 2 spaces.

```
fn example x
  if x gt 0                -- block level 1
    console.log[//;pos;//] -- block level 2
  else
    console.log[//;neg;//] -- block level 2
```

---

## 14. Code Generation

### 14.1 Identifier Mapping

All hyphens in Purus identifiers are replaced with underscores in JavaScript output:

| Purus | JavaScript |
|-------|-----------|
| `my-variable` | `my_variable` |
| `my_variable` | `my_variable` |
| `get-user-name` | `get_user_name` |

### 14.2 Type Erasure

The following constructs are removed during code generation:
- `of Type` — parameter type annotations
- `gives Type` — return type annotations
- `as Type` — type casts (the expression value is preserved)
- `type Name be Type` — type alias declarations

### 14.3 Strict Mode

By default, the Purus compiler emits `"use strict";` at the top of every generated JavaScript file. This can be controlled via:

**CLI flag:**

```
purus build --strict true    -- enables strict mode (default)
purus build --strict false   -- disables strict mode
```

**Configuration file** (`config.purus`):

```
const strict be true         -- enables strict mode (default)
const strict be false        -- disables strict mode
```

### 14.4 Module Type

The output module format for `.purus` files can be configured. Values are the same as `package.json`'s `type` field.

**CLI flag:**

```
purus build --type module      -- ES Modules (default)
purus build --type commonjs    -- CommonJS
```

**Configuration file** (`config.purus`):

```
const type be //;module;//       -- ES Modules (default)
const type be //;commonjs;//     -- CommonJS
```

Resolution order: CLI `--type` > `config.purus` `type` > `package.json` `type` > default (`module`).

File extension overrides: `.cpurus` always produces CJS, `.mpurus` always produces ESM.

When strict mode is enabled, the generated output begins with:

```js
"use strict";
```

The CLI flag takes precedence over the configuration file setting.

### 14.4 Private Fields

Inside a class body, fields declared with `private` are tracked by the compiler. When any dot access (e.g., `this.field-name`) references a private field name, the compiler automatically emits a `#` prefix in the JavaScript output:

| Purus | JavaScript |
|-------|-----------|
| `this.secret` (private) | `this.#secret` |
| `this.name` (public) | `this.name` |

This mapping is scoped to the enclosing class — private field names from one class do not affect another.

---

## 15. Classes

Purus supports JavaScript class declarations with an indentation-based syntax.

### 15.1 Class Declaration

```
class Animal
  fn new[name]
    this.name be name

  fn speak
    console.log[this.name]
```

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name);
  }
}
```

### 15.2 Constructor

Constructors are declared with `fn new`. Parameters use `[]` brackets with `;` separators:

```
class Point
  fn new[x; y]
    this.x be x
    this.y be y
```

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

Expression body with `to`:

```
class Wrapper
  fn new[value] to this.value be value
```

```js
class Wrapper {
  constructor(value) { this.value = value; }
}
```

### 15.3 Methods

Methods use the same `fn` syntax as regular functions:

```
class Calculator
  fn add a; b to a add b

  fn multiply a; b
    return a mul b
```

```js
class Calculator {
  add(a, b) { return a + b; }
  multiply(a, b) {
    return a * b;
  }
}
```

### 15.4 Static Methods

Prefix method declarations with `static`:

```
class MathUtils
  static fn square x to x mul x

  static fn cube x
    return x pow 3
```

```js
class MathUtils {
  static square(x) { return x * x; }
  static cube(x) {
    return x ** 3;
  }
}
```

### 15.5 Async Methods

Prefix method declarations with `async`:

```
class Api
  async fn fetch-data url
    const res be await fetch[url]
    return res.json[]
```

```js
class Api {
  async fetch_data(url) {
    const res = await fetch(url);
    return res.json();
  }
}
```

Static async methods combine both prefixes:

```
class Service
  static async fn load to await fetch[//;data;//]
```

```js
class Service {
  static async load() { return await fetch("data"); }
}
```

### 15.6 Getters and Setters

Use `get fn` and `set fn` to declare accessors:

```
class Person
  fn new[name]
    this.internal-name be name

  get fn name to this.internal-name

  set fn name value
    this.internal-name be value
```

```js
class Person {
  constructor(name) {
    this.internal_name = name;
  }
  get name() { return this.internal_name; }
  set name(value) {
    this.internal_name = value;
  }
}
```

### 15.7 Inheritance

Use `extends` to inherit from a parent class. Use `super` to call the parent constructor or methods:

```
class Animal
  fn new[name]
    this.name be name

  fn speak
    console.log[this.name]

class Dog extends Animal
  fn new[name; breed]
    super[name]
    this.breed be breed

  fn speak
    super.speak[]
    console.log[//;Woof!;//]
```

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name);
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    super.speak();
    console.log("Woof!");
  }
}
```

### 15.8 Private Fields

Use `private` to declare private fields. Private fields are prefixed with `#` in JavaScript output:

```
class Account
  private balance be 0

  fn new[initial]
    this.balance be initial

  fn deposit amount
    this.balance be this.balance add amount

  get fn balance to this.balance
```

```js
class Account {
  #balance = 0;
  constructor(initial) {
    this.#balance = initial;
  }
  deposit(amount) {
    this.#balance = this.#balance + amount;
  }
  get balance() { return this.#balance; }
}
```

Private fields without a default value:

```
class Secret
  private data
```

```js
class Secret {
  #data;
}
```

---

## 16. Keyword Reference Table

### Declaration

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `const` | `const` | Constant declaration |
| `let` | `let` | Variable declaration |
| `var` | `var` | Var declaration (discouraged) |
| `be` | `=` | Assignment operator |

### Functions

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `fn` | `function` / `=>` | Function declaration/expression |
| `return` | `return` | Return value |
| `to` | `{ expr; }` / `=> expr` | Expression body |
| `to return` | `{ return expr; }` | Explicit return expression body |
| `gives` | _(erased)_ | Return type annotation |
| `async` | `async` | Async function modifier |
| `await` | `await` | Await expression |
| `yield` | `yield` | Yield expression (generator) |
| `function` | _(deprecated)_ | Deprecated alias for `fn` |

### Conditional

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `if` | `if` | Conditional |
| `elif` | `else if` | Else-if branch |
| `else` | `else` | Else branch |
| `unless` | `if (!(...))` | Negated conditional |
| `then` | _(ternary)_ | Inline conditional |

### Loops

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `while` | `while` | While loop |
| `until` | `while (!(...))` | Negated while |
| `for` | `for` | For loop |
| `in` | `of` / `in` | Iterator keyword |
| `range` | _(numeric range)_ | Range-based loop |
| `break` | `break` | Break out of loop |
| `continue` | `continue` | Continue to next iteration |
| `do` | `do` | Do-while loop (deprecated) |

### Pattern Matching

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `switch` | if-else chain / IIFE | Switch expression/statement |
| `case` | _(switch arm)_ | Switch case |
| `default` | _(switch default)_ | Default arm |
| `match` | if-else chain / IIFE | Match expression/statement (deprecated) |
| `when` | _(match arm)_ | Match case (deprecated) |
| `blank` | `_` | Wildcard — ignored parameter or anonymous catch-all pattern |

### Modules

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `import` | `import` | ESM import |
| `import ///mod///` | `import "mod"` | Side-effect import |
| `from` | `from` | Import source |
| `export` | `export` | ESM export |
| `default` | `default` | Default export |
| `require` | `require()` | CommonJS require |
| `use` | _(inline JS)_ | Standard library import |
| `namespace` | IIFE | Module namespace |
| `public` | `export` | Public export |
| `all` | `* as` | Namespace import |

### Arithmetic Operators

| Keyword | JS Output |
|---------|-----------|
| `add` | `+` |
| `sub` | `-` |
| `mul` | `*` |
| `div` | `/` |
| `mod` | `%` |
| `pow` | `**` |
| `neg` | `-` (unary) |

### Comparison Operators

| Keyword | JS Output |
|---------|-----------|
| `eq` | `===` |
| `neq` / `not eq` | `!==` |
| `lt` | `<` |
| `gt` | `>` |
| `le` / `lt eq` | `<=` |
| `ge` / `gt eq` | `>=` |

### Logical Operators

| Keyword | JS Output |
|---------|-----------|
| `and` | `&&` |
| `or` | `\|\|` |
| `not` | `!` |
| `and be` | `&&=` |
| `or be` | `\|\|=` |
| `coal be` | `??=` |

### Bitwise Operators

| Keyword | JS Output |
|---------|-----------|
| `band` | `&` |
| `bor` | `\|` |
| `bxor` | `^` |
| `bnot` | `~` (unary) |
| `shl` | `<<` |
| `shr` | `>>` |
| `ushr` | `>>>` |

### Nullish Coalescing

| Keyword | JS Output |
|---------|-----------|
| `coal` | `??` |

### Pipeline

| Keyword | JS Output |
|---------|-----------|
| `pipe` | `f(a)` |

### Type Keywords

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `as` | _(erased)_ | Type cast |
| `of` | _(erased)_ | Type annotation |
| `typeof` | `typeof` | Typeof operator |
| `instanceof` | `instanceof` | Instance check |
| `type` | _(erased)_ | Type alias |
| `void` | `void` | Void expression |

### Class

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `class` | `class` | Class declaration |
| `extends` | `extends` | Class inheritance |
| `super` | `super` | Parent class reference |
| `static` | `static` | Static method modifier |
| `private` | `#` (prefix) | Private field declaration |
| `get` | `get` | Getter accessor |
| `set` | `set` | Setter accessor |

### Other

| Keyword | JS Output | Description |
|---------|-----------|-------------|
| `new` | `new` | Constructor |
| `delete` | `delete` | Delete property |
| `this` | `this` | This reference |
| `throw` | `throw` | Throw exception |
| `try` | `try` | Try block |
| `catch` | `catch` | Catch block |
| `finally` | `finally` | Finally block |
| `void` | `void` | Void expression (evaluates operand, returns `undefined`) |
| `list` | `[…]` | Array literal |
| `object` | `{…}` | Object literal |
| `null` | `null` | Null value |
| `nil` | `null` | Null alias |
| `undefined` | `undefined` | Undefined value |
| `nan` | `NaN` | NaN value |
| `infinity` | `Infinity` | Infinity value |
| `-infinity` | `-Infinity` | Negative infinity (special case) |
| `100n` / `0xFFn` / `0b1n` | `100n` / `255n` / `1n` | BigInt literal (integer with `n` suffix) |

### String Syntax

| Syntax | Description |
|--------|-------------|
| `///text///` | String literal (triple-slash) |
| `//;text;//` | String literal (semicolon form — preferred when content contains `//`) |
| `///text [expr] text///` | Interpolated string |
| `//;text [expr] text;//` | Interpolated string (semicolon form) |

### Punctuation

| Symbol | JS Output | Description |
|--------|-----------|-------------|
| `\.` | `?.` | Optional chaining |
| `\` | _(computed prefix)_ | Computed access marker |
| `.` | `.` | Property access |
| `..` | _(inclusive range)_ | Inclusive range |
| `...` | _(exclusive range)_ | Exclusive range |

---

## 17. Grammar Summary (EBNF-like)

```ebnf
Program       = { Statement } ;

Statement     = VarDecl | FnDecl | ClassDecl | IfStmt | UnlessStmt
              | WhileStmt | UntilStmt | DoWhileStmt | ForStmt | SwitchStmt | MatchStmt
              | TryCatch | Throw | Return | Break | Continue
              | ImportDecl | FromImportDecl | UseDecl | ModDecl | ExportDecl | PublicDecl
              | TypeDecl | DeleteStmt
              | Expr "be" Expr              (* assignment *)
              | Expr ("add"|"sub"|"mul"|"div"|"mod"|"pow"|"band"|"bor"|"bxor"|"shl"|"shr"|"ushr"|"and"|"or"|"coal") "be" Expr  (* compound assignment *)
              | Expr                         (* expression statement *)
              ;

VarDecl       = ("const" | "let" | "var")
                ( "object" "[" IdentList "]" "be" Expr   (* object destructuring *)
                | "[" IdentList "]" "be" Expr            (* array destructuring *)
                | Ident ["of" Type] "be" Expr            (* simple binding *)
                )
                [PostfixMod] ;

IdentList     = Ident { (";" | ",") Ident } ;

FnDecl        = ["async"] "fn" [Ident] ParamList ["gives" Type]
                ( "to" ["return"] Expr | INDENT Block DEDENT ) ;

ParamList     = { ("blank" | Ident ["of" Type]) ";" } [("blank" | Ident ["of" Type])] ;

IfStmt        = "if" Expr (INDENT Block DEDENT | "then" Expr "else" Expr)
                { ("elif" | "else" "if") Expr INDENT Block DEDENT }
                [ "else" INDENT Block DEDENT ] ;

UnlessStmt    = "unless" Expr INDENT Block DEDENT ;

WhileStmt     = "while" Expr INDENT Block DEDENT ;

UntilStmt     = "until" Expr INDENT Block DEDENT ;

DoWhileStmt   = "do" INDENT Block DEDENT "while" Expr ;

ForStmt       = "for" Ident [";" Ident] "in"
                ( "range" Primary ";" Primary
                | Expr
                ) INDENT Block DEDENT ;

SwitchStmt     = "switch" Expr INDENT { SwitchArm } DEDENT ;

SwitchArm      = "case" Pattern ["if" Expr]
                ( "then" Expr | INDENT Block DEDENT )
              | "default" ( Expr | INDENT Block DEDENT )
              ;

MatchStmt     = "match" Expr INDENT { MatchArm } DEDENT ;

MatchArm      = "when" Pattern ["if" Expr]
                ( "then" Expr | INDENT Block DEDENT )
              | "else" ( Expr | INDENT Block DEDENT )
              ;

Pattern       = IntLit | FloatLit | BigIntLit | StrLit | BoolLit | "null" | "nil" | "blank" | Ident ;

TryCatch      = "try" INDENT Block DEDENT
                "catch" [Ident] INDENT Block DEDENT
                ["finally" INDENT Block DEDENT] ;

ImportDecl    = "import" String                          (* side-effect import *)
              | "import" ("all" "as" Ident | "[" IdentList "]" | Ident ["," "[" IdentList "]"])
                "from" String ;

FromImportDecl = "from" String "import"
              ("all" "as" Ident | "[" IdentList "]" | Ident ["," "[" IdentList "]"])
              ;

UseDecl       = "use" Ident ["as" Ident]                              (* stdlib import *)
              ;

ModDecl       = "namespace" Ident INDENT Block DEDENT ;

ClassDecl     = "class" Ident ["extends" Ident]
                INDENT { ClassMember } DEDENT ;

ClassMember   = "private" Ident ["be" Expr]                          (* private field *)
              | "protected" Ident ["be" Expr]                        (* deprecated alias for private *)
              | "fn" "new" ["[" ParamList "]"]
                ( "to" Expr | INDENT Block DEDENT )                  (* constructor *)
              | ["static"] ["async"] "fn" Ident ParamList ["gives" Type]
                ( "to" Expr | INDENT Block DEDENT )                  (* method *)
              | "get" "fn" Ident ["gives" Type]
                ( "to" Expr | INDENT Block DEDENT )                  (* getter *)
              | "set" "fn" Ident Ident
                ( "to" Expr | INDENT Block DEDENT )                  (* setter *)
              ;

PostfixMod    = "if" Expr | "unless" Expr | "for" Ident "in" Expr ;

Expr          = Pipe ;

Pipe          = Coal { "pipe" Coal } ;
Coal          = Or { "coal" Or } ;
Or            = And { "or" And } ;
And           = Equality { "and" Equality } ;
Equality      = Comparison { ("eq" | "neq" | "not" "eq" | "instanceof") Comparison } ;
Comparison    = Addition { ("lt" ["eq"] | "gt" ["eq"] | "le" | "ge") Addition } ;
Addition      = Multiplication { ("add" | "sub") Multiplication } ;
Multiplication = Power { ("mul" | "div" | "mod") Power } ;
Power         = Unary [ "pow" Power ] ;     (* right-associative *)
Unary         = ("not" | "neg" | "typeof" | "void" | "await" | "yield" | "new") Unary | Postfix ;
Postfix       = Primary { "." Ident ["[" ArgList "]"]
              | "\." Ident ["[" ArgList "]"]
              | "[" ArgList "]"
              | "[\\" Expr "]"
              | "as" Ident } ;
Primary       = IntLit | FloatLit | BigIntLit | StrLit | InterpStr | Regex
              | "true" | "false" | "null" | "nil" | "undefined" | "this" | "super"
              | Ident
              | "list" "[" ExprList "]"
              | "object" "[" ObjEntries "]"
              | "[" BracketExpr "]"
              | "fn" ParamList ("to" Expr | INDENT Block DEDENT)
              | "async" "fn" ParamList ("to" Expr | INDENT Block DEDENT)
              | "if" Expr "then" Expr "else" Expr
              | "match" Expr INDENT { MatchArm } DEDENT
              | "try" INDENT Block DEDENT "catch" [Ident] INDENT Block DEDENT
              ;

BracketExpr   = (* empty → empty array *)
              | "be" "]"                               (* empty object *)
              | Expr ".." Expr                          (* inclusive range *)
              | Expr "..." Expr                         (* exclusive range *)
              | Expr "be" Expr { ("," | ";") Expr "be" Expr }  (* object *)
              | Expr { "," Expr }                       (* array *)
              | Expr { ";" Expr }                       (* array / args *)
              | Expr                                    (* grouping *)
              ;

ArgList       = Expr { (";" | ",") Expr } ;
ExprList      = Expr { (";" | ",") Expr } ;
ObjEntries    = Ident ["be" Expr] { ("," | ";") Ident ["be" Expr] } ;

DottedName    = Ident { "." Ident } ;
```

---

_Purus is licensed under the Apache 2.0 License._
