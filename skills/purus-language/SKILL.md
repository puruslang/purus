---
name: purus-language
description: Write, read and fix Purus code (a Shift-free language that compiles to JavaScript). Use whenever the task involves .purus/.mpurus/.cpurus files, the purus CLI, p-* stdlib modules, or translating JavaScript to Purus.
---

# Purus language

Purus compiles to JavaScript. It avoids the Shift key: `[]` is the only bracket, operators are words, blocks are indentation (2 spaces). The full specification is `RFC.md` in the compiler repository; read it when this summary is not enough.

## Files and CLI

| Extension | Output |
|---|---|
| `.purus` | `.js` |
| `.mpurus` | `.mjs` (ES module) |
| `.cpurus` | `.cjs` (CommonJS) |

```sh
purus build file.purus          # writes file.js
purus build --stdout file.purus # prints JS
purus check file.purus          # parse only
purus run file.purus
```

## Core syntax

| JavaScript | Purus |
|---|---|
| `const x = 1` | `const x be 1` |
| `x += 1` | `x add be 1` |
| `f(a, b)` | `f[a; b]` (arguments are separated by `;`) |
| `[1, 2]` | `[1, 2]` or `list[1; 2]` |
| `{a: 1}` | `[a be 1]` or `object[a be 1]`; empty object is `[be]` |
| `"text"` | `//;text;//` (recommended) or `///text///` |
| `` `Hi ${n}` `` | `//;Hi [n];//` |
| `a ?? b` | `a coal b` |
| `a?.b` | `a\.b` |
| `a[i]` | `a\[i]` (backslash computed access) |
| `// comment` | `-- comment` (block: `--- ... ---`) |

Rules that are easy to get wrong:

- Identifiers may contain `-`; `my-var` and `my_var` are the same JS name, never define both.
- Reassigning needs a declaration keyword or compound form: bare `x be 1` is a compile error. Use `let` + `x add be 1`.
- Inside `//;...;//`, write `\;` for a literal semicolon and `\[` for a literal bracket.
- Functions: `fn name a; b` (block body), `fn name a to return expr` (one-liner). **A bare `to expr` does not return its value** (`fn double x to x mul 2` compiles to `{ x * 2; }`); always write `to return expr`, also for `get fn v to return this.c`. Anonymous arrow form `fn x to x mul 2` does return.
- Type annotations (`a of Number`, `gives Number`, `as Number`) are erased in the output.

## Operators (all words)

`add sub mul div mod pow neg`, `eq neq lt gt le ge` (`not eq`, `lt eq` also work), `and or not coal`, `band bor bxor bnot shl shr ushr`, `pipe` (`data pipe console.log`), `typeof`, `instanceof`, `x\add` / `x\sub` for increment/decrement.

## Control flow

```
if x gt 10
  console.log[//;big;//]
elif x gt 1
  console.log[//;medium;//]
else
  console.log[//;small;//]

const label be if x gt 0 then //;pos;// else //;neg;//
console.log[//;even;//] if x mod 2 eq 0
unless done
  work[]
for item in items
  console.log[item]
for i; item in items
  console.log[i; item]
for let i be 0; i lt 10; i\add
  console.log[i]
```

Also `while`, `until`, `switch`/`case`, `match`/`when`, `try`/`catch`/`finally`, `throw`, ranges `[1..5]` (inclusive) and `[1...5]` (exclusive).

## Classes and modules

```
class Dog extends Animal
  private name
  fn new name
    super[name]
  get fn label to this.name
  static fn create to new Dog[//;rex;//]
```

```
import [describe; it] from //;vitest;//
from //;react;// import [useState]
use p-array as a          -- stdlib import
public fn greet name to //;Hello, ;// add name
export default fn main
  console.log[//;hi;//]
```

## Standard library (`use p-<name> as alias`)

`p-array p-datetime p-error p-json p-map p-math p-number p-object p-promise p-random p-regexp p-set p-string`. Function names are lowercase without separators (`a.sortasc`, `s.startswith`, `o.fromentries`). See `references/stdlib.md` for the list per module.

## Workflow for agents

1. Write the code, then run `purus check` and `purus build --stdout` to confirm it compiles and to inspect the JS.
2. When unsure about a construct, search `examples/` and `RFC.md` instead of guessing JavaScript-like syntax.
3. Prefer `//;...;//` strings, 2-space indentation and keyword operators; never emit `()`, `{}`, `=`, `+` in Purus source.
4. Report compiler bugs with the minimal source and the expected JS (see the issue forms).
