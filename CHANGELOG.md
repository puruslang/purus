# Changelog

Change history for Purus syntax, specifications, and reserved keywords.

---

## v0.11.0 (2026-06-26)

### New Features

- **`blank` keyword (wildcard)**: A new keyword for explicitly ignoring a function parameter or writing a catch-all pattern match arm. Chosen as the Purus-idiomatic replacement for the `_` (underscore) convention, which requires the Shift key — contrary to Purus's "no Shift key" design principle.

  **As a function parameter:**
  ```purus
  -- Ignore the first argument (element), use only the index
  const indices be Array.from[[length be 5]; fn blank; i to i]
  ```
  ```js
  const indices = Array.from({ length: 5 }, (_, i) => i);
  ```

  Multiple `blank` parameters become `_`, `_1`, `_2`, … in JS output to avoid strict-mode duplicate parameter errors:
  ```purus
  fn f blank; blank; x to x
  ```
  ```js
  function f(_, _1, x) { return x; }
  ```

  **As a `switch` / `match` catch-all arm:**
  ```purus
  switch status
    case ///ok/// then ///good///
    case blank then ///unknown///
  ```

- **`//;text;//` semicolon string syntax**: An alternative to `///text///` that avoids visual confusion with URLs. `;` serves as the inner delimiter, so `//` inside (e.g. `https://`) never conflicts with the closing `;//`. Supports the same `[expr]` interpolation and escape sequences as `///...///`.

  ```purus
  const url be //;https://api.example.com/v1;//
  const msg be //;Hello, [name]!;//
  ```

  Use `\;` to include a literal `;` followed by `//`:
  ```purus
  const s be //;end\;// here;//   -- "end;// here"
  ```

---

## v0.10.1 (2026-05-09)

### New Features

- **`purus config` command**: Generates a `config.purus` file with default settings in the current directory. If `config.purus` already exists, prompts for confirmation before overwriting.
  ```sh
  purus config
  ```

- **Enhanced `purus init`**: `purus init` now creates `config.purus`, `.prettierrc`, and `.gitignore` in addition to `src/main.purus`. If `package.json` already exists, build and lint scripts are added automatically. All files are skipped if they already exist.

  | File | Behavior |
  |---|---|
  | `config.purus` | Created if missing |
  | `.prettierrc` | Created if missing |
  | `.gitignore` | Created if missing |
  | `src/main.purus` | Created if missing |
  | `package.json` | Scripts updated if present |

---

## v0.10.0 (2026-05-09)

### Breaking Changes

- **Node.js ≥ 20 required**: The minimum supported Node.js version has been raised from v18 to v20. Older versions are no longer supported.

- **Bare variable assignment removed**: Assignment to a bare identifier without a declaration keyword (`x be 42`) is no longer supported. This prevents accidental implicit global variable creation and conflicts with runtime-provided globals such as Node.js's `process`.
  - Property assignments (`obj.field be val`, `this.x be val`) remain valid
  - Index assignments (`arr[\i] be val`) remain valid
  - Compound assignment operators (`x add be 1`, `x sub be 1`, etc.) remain valid
  ```purus
  -- Removed (was valid in v0.9.x):
  x be 42

  -- Use instead:
  const x be 42   -- immutable
  let x be 42     -- mutable

  -- Still valid:
  obj.field be ///new value///
  arr[\i] be 0
  x add be 1
  ```

### New Features

- **Auto-initialize object for dotted declaration**: When using `const obj.prop be val`, `let obj.prop be val`, or `var obj.prop be val`, if `obj` has not yet been declared, it is automatically initialized to `{}` with the corresponding keyword. Subsequent dotted declarations on the same name do not re-initialize. Bare assignment (`obj.prop be val` without a keyword) behaves as before.
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

## v0.9.1 (2026-05-07)

### Bug Fixes

- **`config.purus` excluded from build**: Fixed an issue where `config.purus` was incorrectly processed as a source file during the build.
- **Dotted declaration support**: Fixed parsing of property assignments written with a declaration keyword. `const obj.prop be val` now correctly compiles to `obj.prop = val`.
  ```purus
  const this.x be 10    -- this.x = 10
  let obj.prop be 42    -- obj.prop = 42
  ```

### Internal

- **Directory restructure**: Reorganized `core/` source files into `src/lexer/`, `src/parser/`, `src/codegen/`, `src/cmd/main/`, and `pkg/`.

---

## v0.9.0 (2026-04-21)

### Breaking Changes

- **`is` keyword removed**: The `is` keyword (alias for `eq`) has been removed. Use `eq` instead. `is` is no longer a reserved word.
  ```purus
  -- Before (v0.8.x):
  x is y           -- x === y
  x is string      -- x === string

  -- After (v0.9.0):
  x eq y           -- x === y
  typeof x eq ///string///  -- typeof x === "string"
  ```

### New Features

- **`use ... [as ...]` for standard library**: The `use` keyword imports built-in Purus standard library modules. All modules are prefixed with `p-` to avoid keyword conflicts. The `as` keyword is optional — when omitted, the module name is used as the binding. Tree-shaking ensures only used functions are included in the output.
  ```purus
  use p-random as r
  r.randint[1; 10]              -- random integer between 1 and 10
  r.gauss[0; 1]                 -- gaussian distribution
  r.choice[list[1; 2; 3]]      -- random element from array
  r.shuffle[list[1; 2; 3]]     -- shuffled copy of array

  use p-math as m
  m.floor[3.7]                  -- 3
  m.pi                          -- 3.14159...
  m.abs[-5]                     -- 5

  use p-string as s
  s.upper[///hello///]           -- ///HELLO///
  s.reverse[///abc///]           -- ///cba///
  s.words[///foo bar baz///]     -- [///foo///; ///bar///; ///baz///]

  use p-datetime as dt
  dt.now[]                       -- current timestamp (ms)
  dt.year[dt.now[]]              -- current year
  dt.toiso[dt.now[]]             -- ISO 8601 string
  dt.utchour[dt.now[]]           -- current hour (UTC)
  dt.tzhour[dt.now[]; ///America/New_York///]  -- hour in New York
  dt.format[dt.now[]; ///Asia/Tokyo///]        -- formatted in Tokyo tz
  dt.localtz[]                   -- local timezone name

  use p-json as j
  j.parse[///{ "a": 1 }///]     -- { a: 1 }
  j.stringify[obj]               -- JSON string

  use p-object as o
  o.keys[obj]                    -- object keys
  o.merge[a; b]                  -- merge objects

  use p-number as n
  n.isinteger[42]                -- true
  n.clamp[15; 0; 10]             -- 10

  use p-array as a
  a.unique[list[1; 2; 2; 3]]    -- [1; 2; 3]
  a.chunk[list[1; 2; 3; 4]; 2]  -- [[1; 2]; [3; 4]]

  use p-error as e
  e.create[///something went wrong///]
  e.iserror[err]                 -- true
  ```

  Available stdlib modules:
  | Module | Description |
  |--------|-------------|
  | `p-random` | `random`, `randint`, `randrange`, `randbool`, `getrandbits`, `randbytes`, `uniform`, `triangular`, `gauss`, `normalvariate`, `expovariate`, `gammavariate`, `betavariate`, `lognormvariate`, `vonmisesvariate`, `paretovariate`, `weibullvariate`, `choice`, `choices`, `wchoices`, `shuffle`, `sample`, `binomial`, `poisson`, `geometric`, `clamp`, `lerp` |
  | `p-math` | JS `Math` alias + lowercase constant aliases (`pi`, `e`, `ln2`, `ln10`, `sqrt2`, etc.) |
  | `p-string` | `len`, `contains`, `startswith`, `endswith`, `indexof`, `count`, `upper`, `lower`, `capitalize`, `title`, `trim`, `trimstart`, `trimend`, `reverse`, `repeat`, `replace`, `replacefirst`, `padstart`, `padend`, `split`, `lines`, `words`, `join`, `chars`, `slice`, `charat`, `codeat`, `fromcode` |
  | `p-datetime` | `now`, `today`, `timestamp`, `create`, `utccreate`, `fromiso`, `year`, `month`, `day`, `weekday`, `hour`, `minute`, `second`, `ms`, `utcyear`, `utcmonth`, `utcday`, `utcweekday`, `utchour`, `utcminute`, `utcsecond`, `utcms`, `tzyear`, `tzmonth`, `tzday`, `tzweekday`, `tzhour`, `tzminute`, `tzsecond`, `toiso`, `tolocale`, `todate`, `totime`, `format`, `addms`, `addseconds`, `addminutes`, `addhours`, `adddays`, `diff`, `diffdays`, `diffhours`, `diffminutes`, `diffseconds`, `offset`, `localtz` |
  | `p-json` | `parse`, `stringify`, `prettify` |
  | `p-object` | `keys`, `values`, `entries`, `fromentries`, `assign`, `freeze`, `seal`, `isfrozen`, `issealed`, `hasown`, `create`, `is`, `len`, `merge`, `clone`, `pick`, `omit` |
  | `p-number` | `isfinite`, `isinteger`, `isnan`, `issafe`, `parsefloat`, `parseint`, `tofixed`, `toprecision`, `toexponential`, `tostring`, `clamp` + constants |
  | `p-array` | `isarray`, `from`, `of`, `len`, `first`, `last`, `range`, `flatten`, `unique`, `zip`, `unzip`, `chunk`, `sum`, `product`, `min`, `max`, `sortasc`, `sortdesc`, `compact`, `count`, `groupby` |
  | `p-error` | `create`, `type`, `range`, `reference`, `syntax`, `uri`, `iserror`, `message`, `name`, `stack`, `cause`, `wrap` |

- **Tree-shaking**: Only the stdlib functions actually referenced in your code are included in the compiled output, keeping bundle size minimal.

- **Bitwise operators**: New keyword-based bitwise operators, matching JavaScript semantics:
  ```purus
  a band b    -- a & b   (bitwise AND)
  a bor b     -- a | b   (bitwise OR)
  a bxor b    -- a ^ b   (bitwise XOR)
  bnot a      -- ~a      (bitwise NOT)
  a shl b     -- a << b  (left shift)
  a shr b     -- a >> b  (right shift)
  a ushr b    -- a >>> b (unsigned right shift)
  ```

- **`random` stdlib additions**: `getrandbits`, `randbytes`, `normalvariate` added. `randbool` now accepts optional probability parameter.

- **New stdlib modules**: `p-object` (Object utility), `p-number` (Number utility + constants), `p-array` (Array utility), `p-error` (Error creation/inspection).

- **Additional stdlib modules**: `p-regexp` (RegExp utility), `p-promise` (Promise utility), `p-set` (Set utility), `p-map` (Map utility).

- **`infinity` / `-infinity` literals**: Added `infinity` as a reserved keyword. `neg infinity` and `-infinity` both compile to `-Infinity`.
  ```purus
  const x be infinity           -- Infinity
  const y be neg infinity       -- -Infinity
  const z be -infinity          -- -Infinity (special case)
  ```

- **`do...while` loop**: Execute a block at least once, then repeat while condition is true:
  ```purus
  do
    process-item[]
  while has-more[]
  ```

- **`yield` / Generator functions**: Functions containing `yield` are automatically compiled as generators (`function*`):
  ```purus
  fn count-up limit
    let i be 0
    while i lt limit
      yield i
      i be i add 1
  ```

- **Binary / Hexadecimal number literals**: `0b` and `0x` prefixed numbers are now supported:
  ```purus
  const mask be 0b1010
  const color be 0xFF00FF
  ```

- **`function` keyword (deprecated alias)**: `function` is accepted but emits a deprecation warning. Use `fn` instead.

- **`protected` keyword (deprecated alias)**: `protected` is accepted in class bodies but emits a deprecation warning. Use `private` instead.

- **Compound assignment operators**: New `add be`, `sub be`, `mul be`, `div be`, `mod be`, `pow be` compound assignment syntax:
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

- **JS-style `for` loop**: New C-style for loop syntax with init, condition, and update clauses. Works with compound assignment operators:
  ```purus
  for let i be 0; i lt 10; i add be 1
    console.log[i]
  -- → for (let i = 0; i < 10; i += 1) { console.log(i); }

  for let x be 1; x lt 100; x mul be 2
    console.log[x]
  -- → for (let x = 1; x < 100; x *= 2) { console.log(x); }
  ```

- **Postfix / prefix increment & decrement**: `\add` and `\sub` for increment and decrement. Postfix: `x\add` → `x++`, `x\sub` → `x--`. Prefix: `add\x` → `++x`, `sub\x` → `--x`.
  ```purus
  x\add             -- x++
  x\sub             -- x--
  add\x             -- ++x
  sub\x             -- --x
  for let i be 0; i lt 10; i\add
    console.log[i]  -- for (let i = 0; i < 10; i++) { ... }
  ```

- **Floor division (`fdiv`)**: Integer floor division using `Math.floor`. `fdiv be` for compound assignment:
  ```purus
  let q be 7 fdiv 2       -- Math.floor(7 / 2) → 3
  x fdiv be 10             -- x = Math.floor(x / 10)
  ```

- **Bitwise compound assignments**: `band be`, `bor be`, `bxor be`, `shl be`, `shr be`, `ushr be`:
  ```purus
  x band be 255            -- x &= 255
  x bor be 1               -- x |= 1
  x bxor be mask           -- x ^= mask
  x shl be 2               -- x <<= 2
  x shr be 1               -- x >>= 1
  x ushr be 1              -- x >>>= 1
  ```

- **Logical compound assignments**: `and be`, `or be`, `coal be` — new compound assignment for logical and nullish operators:
  ```purus
  x and be true            -- x &&= true
  x or be false            -- x ||= false
  x coal be 0              -- x ??= 0
  ```

- **BigInt literals**: Append `n` to any integer literal (decimal, binary, or hex) to create a BigInt:
  ```purus
  const big be 9007199254740993n     -- 9007199254740993n
  const hex be 0xFFFFFFFFFFFFFFFFn   -- 18446744073709551615n
  const bin be 0b11111111n           -- 255n
  big add 1n                         -- 9007199254740994n
  ```

- **`void` expression**: The `void` keyword evaluates its operand and returns `undefined`. Useful for side-effect-only calls:
  ```purus
  void f[]                 -- void f()
  const u be void 0        -- const u = void 0
  ```

### Keywords Changed

| Keyword | Change |
|---|---|
| `is` | Removed (use `eq` instead) |
| `use` | Added for standard library imports (`use p-... [as ...]`) |
| `from...use` | Removed for stdlib (still works for ES imports: `from "mod" import ...`) |
| `band` `bor` `bxor` `bnot` `shl` `shr` `ushr` | Added — bitwise operators |
| `infinity` | Added — `Infinity` literal (`neg infinity` / `-infinity` for negative) |
| `do` | Added — do-while loop (deprecated, prefer `while`/`until`) |
| `yield` | Added — yield expression for generator functions |
| `function` | Added — deprecated alias for `fn` |
| `protected` | Added — deprecated alias for `private` |
| `add be` `sub be` `mul be` `div be` `mod be` `pow be` | Added — compound assignment operators |
| `fdiv` | Added — floor division (`Math.floor(a / b)`) |
| `fdiv be` | Added — floor division compound assignment |
| `band be` `bor be` `bxor be` `shl be` `shr be` `ushr be` | Added — bitwise compound assignment operators |
| `and be` `or be` `coal be` | Added — logical/nullish compound assignment operators (`&&=`, `\|\|=`, `??=`) |
| `\add` `\sub` (postfix), `add\` `sub\` (prefix) | Added — increment/decrement operators |
| `100n` / `0xFFn` / `0b1n` | Added — BigInt literal suffix `n` |
| `void` | Added — void expression (`void x` → `void x`) |

### Deprecations

- **Bare variable assignment**: Using `x be value` without a declaration keyword (`const`/`let`) is now deprecated. Property assignments (`obj.field be value`, `arr[\i] be value`) are not affected.
  ```purus
  -- Deprecated:
  x be 42

  -- Use instead:
  const x be 42
  let x be 42
  ```

- **`for ... in range` loop (deprecated)**: The `for x in range a; b` syntax is deprecated. Use the new JS-style `for` loop instead:
  ```purus
  -- Deprecated:
  for i in range 0; 10
    console.log[i]

  -- Use instead:
  for let i be 0; i lt 10; i add be 1
    console.log[i]
  ```

### Tooling

- Linter (`@puruslang/linter`): `0.7.1` → `0.8.0` — removed `is` keyword, synced keywords (`do`, `yield`, `function`, `protected`, `infinity`, `void`), added binary/hex/BigInt number support, expanded rules from 8 to 17 (`bare-assignment`, `no-function`, `no-protected`, `no-else-if`, `no-js-chars`, `no-js-operators`, `bracket-match`, `const-reassign`, `duplicate-use`, `no-for-range`), updated `JS_OPERATOR_MAP` with compound assignment suggestions including `&&=` → `and be`, `||=` → `or be`, `??=` → `coal be`
- Prettier Plugin (`@puruslang/prettier-plugin-purus`): `0.7.1` → `0.8.0` — removed `is` keyword, synced keywords (`do`, `yield`, `function`, `protected`, `infinity`, `void`), added `BLOCK_STARTERS` (`do`, `try`, `catch`, `finally`, `class`), added binary/hex/BigInt number support
- VS Code Extension (`purus`): `0.6.1` → `0.7.0` — removed `is` from syntax highlighting, added `use` stdlib syntax, added real-time diagnostics (errors, warnings, deprecation notices), reorganized source into `src/`, added snippets (`dowhile`, `yield`, `genfn`, `class`), updated `use` snippet with all 13 stdlib modules, updated language configuration (`do`, `class` indent patterns), added BigInt numeric highlighting, added `void` keyword highlight

---

## v0.8.1 (2026-03-22)

### Bug Fixes

- **`witch` → `switch` keyword rename**: The pattern matching keyword `witch` has been renamed to `switch`. The previous name was a typo/misnaming. Existing code using `witch` must be updated to `switch`.
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

- **`pub` → `public`**: The `pub` keyword has been removed. Use `public` instead.

- **Removed automatic type name detection**: `eq`/`is` with type names (e.g. `x is string`, `x eq number`) no longer auto-generates `typeof` checks. Type names are now treated as regular identifiers.
  ```purus
  -- Before (v0.7.x):  x is string → typeof x === "string"
  -- After (v0.8.0):   x is string → x === string (identifier comparison)
  -- Migration:        typeof x eq ///string///
  ```

### Deprecations

- **`match` / `when` deprecated**: The `match` / `when` syntax still works but is deprecated in favor of `witch` / `case` / `default`.

- **`use` / `from...use` deprecated**: Dot-path imports (`use std.math`, `from std.math use sin, cos`) are deprecated. Use `import...from` or `from...import` with string paths instead.

### New Features

- **`witch` / `case` / `default` syntax**: Added a new pattern matching syntax as the recommended replacement for `match` / `when` / `else`.
  ```purus
  witch x
    case 1 then ///one///
    case 2 then ///two///
    default ///other///
  ```
  Compiles identically to `match` — generates an if-else chain. Guards are supported: `case n if n gt 0`.

- **`to return` for explicit return**: Added `to return` syntax for single-expression function bodies with explicit return.
  ```purus
  fn double x to return x mul 2
  -- Compiled: function double(x) { return x * 2; }
  ```
  Works with named functions, class methods, `static fn`, `get fn`, `set fn`, and constructors.

- **Module type configuration**: `.purus` files can now be compiled as CommonJS instead of ES Modules.
  - CLI option: `purus build --type commonjs`
  - `config.purus`: `const type be ///commonjs///`
  - Resolution order: CLI `--type` > `config.purus` `type` > `package.json` `type` > default (`module`)
  - CJS mode converts `import`/`export` to `require()`/`module.exports`/`exports.*`
  - `.cpurus` → always CJS, `.mpurus` → always ESM (unchanged)

- **`purus new` improvements**: Generated `config.purus` now includes a `type` field. Generated `package.json` sets `main` to `"dist/main.js"` and `type` to `"module"`.

- **TypeScript type definitions**: Added `index.d.ts` for the `purus` npm package. TypeScript users now get type information for `compile()`, `check()`, and `version`.

- **`from...import` syntax**: Added reversed import syntax with module path first.
  ```purus
  from ///express/// import express
  from ///react/// import [useState, useEffect]
  from ///fs/// import all as fs
  ```

### Tooling

- Linter: `0.6.0` → `0.7.0` — added `witch`, `case` keywords
- Prettier Plugin: `0.6.0` → `0.7.0` — added `witch`, `case` keywords
- VS Code Extension: `0.5.0` → `0.6.0` — added `witch`, `case` syntax highlighting

### Docs

- Added [Community Projects](https://purus.work/community-projects/) page listing unofficial community-created projects

---

## v0.7.0 (2026-03-08)

### Breaking Changes

- **Removed implicit return from named functions**: `fn name args to expr` now compiles to `{ expr; }` instead of `{ return expr; }`. Use block body + explicit `return` to return values. Anonymous functions (`fn args to expr` → `(args) => expr`) are not affected.

  ```purus
  -- Before (v0.6.x): implicit return
  fn double x to x mul 2
  -- Compiled: function double(x) { return x * 2; }

  -- After (v0.7.0): no implicit return
  fn double x to x mul 2
  -- Compiled: function double(x) { x * 2; }

  -- Migration: use block body + explicit return
  fn double x
    return x mul 2
  -- Compiled: function double(x) { return x * 2; }
  ```

  This also applies to class methods and `static fn` / `get fn` / `set fn`.

### New Features

- **`nan` keyword**: Added the `nan` literal keyword, which compiles to JavaScript's `NaN`.
  ```purus
  const value be nan          -- const value = NaN;
  x eq nan                    -- x === NaN
  ```
- **`with` keyword (Import Attributes)**: Added import attributes via `import ... from ... with [ key be value ]` syntax. Compiles to JavaScript's `import ... from "..." with { key: value }`.
  ```purus
  import data from ///./data.json/// with [ type be ///json/// ]
  -- import data from "./data.json" with { type: "json" };

  import [name; version] from ///./package.json/// with [ type be ///json/// ]
  -- import { name, version } from "./package.json" with { type: "json" };

  import ///./styles.css/// with [ type be ///css/// ]
  -- import "./styles.css" with { type: "css" };
  ```

### Bug Fixes

- **`match` guard + `BindPat` fix**: Fixed a scoping error in code generation when `when n if cond` pattern used `n` as a binding variable. The variable `n` was being declared inside the `if` block but referenced in the guard condition. Changed to pre-declaration approach: binding variables are declared before the `if-else` chain.
  ```purus
  match value
    when n if n gt 0
      console.log[///positive///]
    when _
      console.log[///other///]
  ```
  ```js
  // Before (broken): n was not in scope for the guard
  // After (fixed): const n = value; is pre-declared
  {
    const n = value;
    if (n > 0) { console.log("positive"); }
    else { console.log("other"); }
  }
  ```

### Keywords Added

| Keyword | Purpose |
|---|---|
| `nan` | NaN literal |
| `with` | Import Attributes |

---

## v0.6.1 (2026-03-07)

### Changes

- Package metadata fix (for npm publish).
- No syntax or keyword changes.

---

## v0.6.0 (2026-03-07)

### New Features

- **Class syntax**: Added `class` / `extends` / `super` / `static` / `private` / `get` / `set` keywords. Compiles to JavaScript ES6 classes.
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
- **`super` expression**: Added `super` as an expression for calling parent class constructors and methods.
  ```purus
  class Dog extends Animal
    fn constructor name
      super[name]
  ```
- **Inheritance**: `class Child extends Parent` compiles to JavaScript's `class Child extends Parent`.

### Keywords Added

| Keyword | JS Output | Purpose |
|---|---|---|
| `class` | `class` | Class declaration |
| `extends` | `extends` | Inheritance |
| `super` | `super` | Parent class reference |
| `static` | `static` | Static method |
| `private` | `#` (private field) | Private field |
| `get` | `get` | Getter |
| `set` | `set` | Setter |

---

## v0.5.0 (2026-03-07)

### New Features

- **`coal` (Nullish Coalescing)**: `a coal b` compiles to `a ?? b`.
  ```purus
  const name be user.name coal ///anonymous///
  -- const name = user.name ?? "anonymous";
  ```
- **Optional chaining**: `obj\.field` → `obj?.field`, `obj\.method[args]` → `obj?.method(args)`.
  ```purus
  const name be user\.profile\.name
  -- const name = user?.profile?.name;
  user\.greet[///hello///]
  -- user?.greet("hello");
  ```
- **Computed property access**: `obj[\key]` → `obj[key]`.
  ```purus
  const val be obj[\key]
  -- const val = obj[key];
  ```
- **String interpolation**: `///Hello [name]!///` compiles to template literals. Square brackets `[expr]` inside triple-slash strings are interpolated.
  ```purus
  const msg be ///Hello [name]! You are [age] years old.///
  -- const msg = `Hello ${name}! You are ${age} years old.`;
  ```
- **Side-effect import**: `import ///module///` → `import "module"` for imports that only execute side effects.
  ```purus
  import ///./polyfill.js///
  -- import "./polyfill.js";
  ```
- **`async fn` expression**: Support for `async fn x to expr` and `async fn` block body as expressions (e.g., in variable assignment).
  ```purus
  const fetchData be async fn url to await fetch[url]
  -- const fetchData = async (url) => await fetch(url);
  ```
- **Object destructuring**: `const object[a; b] be expr` → `const { a, b } = expr`. Uses the `object` keyword prefix to distinguish from array destructuring.
  ```purus
  const object[name; age] be person
  -- const { name, age } = person;
  ```
- **Underscore identifiers**: Support for identifiers starting with underscore like `_variable`, `_private`, `__internal`.

### Punctuation Added

| Symbol | Purpose |
|---|---|
| `\` | Computed property access prefix |
| `\.` | Optional chaining |

### Keywords Added

| Keyword | JS Output | Purpose |
|---|---|---|
| `coal` | `??` | Nullish Coalescing |

---

## v0.4.1 (2026-03-06)

### Changes

- Added version sync script for consistent versioning across packages.
- No syntax or keyword changes.

---

## v0.4.0 (2026-03-06)

### Breaking Changes

- **`ne` → `neq` renamed**: The inequality operator keyword was renamed from `ne` to `neq`. All existing code using `ne` must be updated to `neq`.
  ```purus
  -- Before (v0.3.x)
  x ne y           -- x !== y

  -- After (v0.4.0)
  x neq y          -- x !== y
  x not eq y       -- x !== y (alternative)
  ```

### New Features

- **`pow` operator**: `a pow b` compiles to `a ** b`. Right-associative precedence, higher than `mul`/`div`/`mod`.
  ```purus
  2 pow 10         -- 2 ** 10
  x pow y pow z    -- x ** (y ** z)  (right-associative)
  ```
- **`not eq` operator composition**: `not eq` is parsed as `neq` (`!==`). Similarly, `lt eq` → `le` (`<=`) and `gt eq` → `ge` (`>=`).
  ```purus
  x not eq y       -- x !== y
  x lt eq y        -- x <= y
  x gt eq y        -- x >= y
  ```
- **Range arrays**: `[start..end]` (inclusive) / `[start...end]` (exclusive) generates arrays using `Array.from()`.
  ```purus
  [1..5]           -- Array.from({ length: 5 - 1 + 1 }, (_, i) => i + 1)  → [1,2,3,4,5]
  [0...5]          -- Array.from({ length: 5 - 0 }, (_, i) => i + 0)      → [0,1,2,3,4]
  ```
- **Slicing**: `arr[start..end]` / `arr[start...end]` compiles to `.slice()`. Slice assignment compiles to `.splice()`.
  ```purus
  arr[1..3]        -- arr.slice(1, 3 + 1)
  arr[1...3]       -- arr.slice(1, 3)
  arr[1..3] be [7; 8; 9]  -- arr.splice(1, 3 - 1 + 1, 7, 8, 9)
  ```
- **Array destructuring**: `const [a; b] be arr` → `const [a, b] = arr`.
  ```purus
  const [first; second] be arr
  -- const [first, second] = arr;
  ```
- **`namespace` keyword**: `namespace name` block compiles to an IIFE (Immediately Invoked Function Expression).
  ```purus
  namespace Utils
    pub fn helper
      return 42
  ```
- **`purus check` command**: Added CLI command for syntax checking without generating output files.

### Punctuation Added

| Symbol | Purpose |
|---|---|
| `..` | Inclusive range |
| `...` | Exclusive range |

### Keywords Added / Changed

| Keyword | Change |
|---|---|
| `pow` | Added (exponentiation operator) |
| `neq` | Renamed from `ne` |
| `namespace` | Added (module namespace, alias for `use`) |

---

## v0.3.0 (2026-03-06)

### Changes

- **`purus version` command**: Added `version` / `--version` / `-v` CLI commands.
- **Build refactoring**: Single-file build now uses the compile API directly instead of delegating to the MoonBit compiler. Header comment generation moved to the JS wrapper layer.
- **`purus new` prompt change**: Default answer for "Install dependencies?" changed from No to Yes.
- No syntax or keyword changes.

---

## v0.2.1 (2026-03-06)

### Changes

- Package metadata fix (README links).
- No syntax or keyword changes.

---

## v0.2.0 (2026-03-06)

### New Features

- **CLI tools**: Added full CLI interface with the following commands:
  - `purus build [file]` — Compile to JavaScript
  - `purus build --directory <dir>` — Compile all files in a directory
  - `purus build --output <dir>` — Specify output directory
  - `purus build --no-header` — Compile without header comment
  - `purus build --stdout` — Output to stdout
  - `purus run [file]` — Run without generating files
  - `purus new [name] [-y]` / `purus create` — Create a new project
  - `purus init` — Initialize project in current directory
  - `purus help` — Show help
- **Config file**: Added `config.purus` configuration file support for project-level build settings.
- **File extension mapping**: `.purus` → `.js`, `.cpurus` → `.cjs` (CommonJS), `.mpurus` → `.mjs` (ES Module).
- Removed `purus.json` project file (replaced by `config.purus`).

### Changes

- No syntax or keyword changes.

---

## v0.1.0 (2026-03-06)

### Bug Fixes

- **`eq` / `is` parse fix**: Previously, `eq` and `is` had separate parse paths — `eq` always produced a binary equality (`===`), while `is` produced a `typeof` check. Fixed `eq` to also generate a type check (`IsCheck`) when the next token is a recognized type name. Both `eq` and `is` now behave identically.
  ```purus
  -- Before (v0.0.x): eq always produced ===
  x eq string      -- x === string  (wrong — compared to variable)

  -- After (v0.1.0): eq detects type names
  x eq string      -- typeof x === "string"  (type check)
  x is string      -- typeof x === "string"  (same behavior)
  ```
  Recognized type names: `string`, `number`, `boolean`, `undefined`, `function`, `symbol`, `bigint`, `null`, `object`, and PascalCase identifiers (e.g., `Array`, `Date`).

### Changes

- No syntax or keyword changes.

---

## v0.0.3 (2026-03-06)

### Changes

- Package version fix.
- No syntax or keyword changes.

---

## v0.0.2 (2026-03-06)

### Changes

- README link fix, package file configuration fix.
- No syntax or keyword changes.

---

## v0.0.1 (2026-03-06)

### Initial Release

First release of the Purus language.

#### Literals

- Integer, float, string (`///...///`), regex (`///regex///`), `true` / `false`, `null` / `nil` / `undefined`
- Array `[1; 2; 3]`, object `[key be value]`

#### Variable Declaration

- `const` / `let` / `var` + `be` (assignment keyword)
  ```purus
  const name be ///Purus///    -- const name = "Purus";
  let count be 0               -- let count = 0;
  ```

#### Operators (keyword-style)

| Keyword | JS Output | Purpose |
|---|---|---|
| `add` | `+` | Addition / string concatenation |
| `sub` | `-` | Subtraction |
| `mul` | `*` | Multiplication |
| `div` | `/` | Division |
| `mod` | `%` | Modulo |
| `neg` | `-` (unary) | Negation |
| `eq` | `===` | Equality |
| `ne` | `!==` | Inequality |
| `lt` | `<` | Less than |
| `gt` | `>` | Greater than |
| `le` | `<=` | Less than or equal |
| `ge` | `>=` | Greater than or equal |
| `and` | `&&` | Logical AND |
| `or` | `\|\|` | Logical OR |
| `not` | `!` | Logical NOT |

#### Functions

- `fn` / `return` / `to` (expression body) / `gives` (type annotation) / `async` / `await`
  ```purus
  fn greet name to console.log[name]
  -- function greet(name) { return console.log(name); }

  fn add a b
    return a add b
  -- function add(a, b) { return a + b; }
  ```

#### Control Flow

- `if` / `elif` / `else` / `unless` / `then` (inline)
- `while` / `until` / `for` / `in` / `range`
- `break` / `continue`
- `match` / `when` (pattern matching)
- `pipe` (pipe operator `|>`)

#### Postfix Modifiers

- `stmt if cond` / `stmt unless cond` / `stmt for x in arr`
  ```purus
  console.log[x] if x gt 0
  -- if (x > 0) { console.log(x); }
  ```

#### Error Handling

- `try` / `catch` / `finally` / `throw`

#### Type-related

- `is` / `as` / `of` (type annotation) / `typeof` / `instanceof` / `type` (type alias)

#### Objects

- `new` / `delete` / `this`

#### Modules

- `import` / `from` / `export` / `default` / `require`
- `use` (dot-path import)
- `pub` (public export modifier)
- `all` (namespace import: `import all as name from ...`)

#### Separators

- `;` (semicolon) and `,` (comma) are interchangeable as separators

#### Reserved Keywords

- `list` / `object` (reserved for explicit constructors)

#### Other

- Shebang support (`#!` line is preserved)
- `// comment` style comments via `-- comment`

#### Separators

| Symbol | Purpose |
|---|---|
| `[` / `]` | Function calls / arrays / objects |
| `,` | Array / object separator |
| `;` | Arguments / parameters / destructuring separator |
| `.` | Property access |
