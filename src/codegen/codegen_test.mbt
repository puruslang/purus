// Codegen tests: purus source ↁEJavaScript output
// Run `moon test` to execute and `moon test --update` to refresh snapshots.

///|
fn compile(src : String) -> String {
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  @codegen.JsCodegen::new().generate(stmts, strict=false)
}

///|
fn compile_cjs(src : String) -> String {
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  @codegen.JsCodegen::new(cjs=true).generate(stmts, strict=false)
}

// ===== Basic declarations =====

///|
test "codegen: const declaration" {
  let js = compile("const x be 42")
  assert_eq(js, "const x = 42;\n")
}

///|
test "codegen: let declaration" {
  let js = compile("let name be ///hello///")
  assert_eq(js, "let name = \"hello\";\n")
}

///|
test "codegen: var declaration" {
  let js = compile("var count be 0")
  assert_eq(js, "var count = 0;\n")
}

///|
test "codegen: arithmetic operators" {
  let js = compile("const z be x add y")
  assert_eq(js, "const z = x + y;\n")
}

///|
test "codegen: comparison operators" {
  let js = compile("const r be a lt b")
  assert_eq(js, "const r = a < b;\n")
}

///|
test "codegen: function call" {
  let js = compile("console.log[///Hello, World///]")
  assert_eq(js, "console.log(\"Hello, World\");\n")
}

///|
test "codegen: named function" {
  let src =
    #|fn greet a; b
    #|  return a add b
  let js = compile(src)
  assert_true(js.contains("function greet"))
  assert_true(js.contains("return a + b;"))
}

///|
test "codegen: arrow function with to" {
  let js = compile("fn double x to x mul 2")
  assert_true(js.contains("function double(x) { x * 2; }"))
}

///|
test "codegen: if-else" {
  let src =
    #|if x gt 0
    #|  console.log[///positive///]
    #|else
    #|  console.log[///negative///]
  let js = compile(src)
  assert_true(js.contains("if (x > 0)"))
  assert_true(js.contains("} else {"))
}

///|
test "codegen: while loop" {
  let src =
    #|while i lt 10
    #|  i be i add 1
  let js = compile(src)
  assert_true(js.contains("while (i < 10)"))
}

///|
test "codegen: for-in loop" {
  let src =
    #|for item in items
    #|  console.log[item]
  let js = compile(src)
  assert_true(js.contains("for (const item of items)"))
}

///|
test "codegen: pipe" {
  let js = compile("const result be data pipe filter")
  assert_eq(js, "const result = filter(data);\n")
}

///|
test "codegen: try-catch" {
  let src =
    #|try
    #|  risky[]
    #|catch e
    #|  console.log[e]
  let js = compile(src)
  assert_true(js.contains("try {"))
  assert_true(js.contains("} catch (e) {"))
}

///|
test "codegen: postfix if" {
  let js = compile("console.log[///debug///] if verbose")
  assert_true(js.contains("if (verbose)"))
  assert_true(js.contains("console.log(\"debug\")"))
}

// ===== Import codegen =====

///|
test "codegen: import default" {
  let js = compile("import express from ///express///")
  assert_eq(js, "import express from \"express\";\n")
}

///|
test "codegen: import with attributes" {
  let js = compile(
    "import pkg from ///./package.json/// with [ type be ///json/// ]",
  )
  assert_eq(js, "import pkg from \"./package.json\" with { type: \"json\" };\n")
}

///|
test "codegen: named import with attributes" {
  let js = compile(
    "import [name; version] from ///./package.json/// with [ type be ///json/// ]",
  )
  assert_eq(
    js, "import { name, version } from \"./package.json\" with { type: \"json\" };\n",
  )
}

///|
test "codegen: side-effect import" {
  let js = compile("import ///dotenv/config///")
  assert_eq(js, "import \"dotenv/config\";\n")
}

///|
test "codegen: from import default" {
  let js = compile("from ///express/// import express")
  assert_true(js.contains("import express from \"express\";"))
}

///|
test "codegen: from import named" {
  let js = compile("from ///react/// import [useState, useEffect]")
  assert_true(js.contains("import { useState, useEffect } from \"react\";"))
}

///|
test "codegen: from import namespace" {
  let js = compile("from ///fs/// import all as fs")
  assert_true(js.contains("import * as fs from \"fs\";"))
}

///|
test "codegen: from import default and named" {
  let js = compile("from ///react/// import React, [useState]")
  assert_true(js.contains("import React, { useState } from \"react\";"))
}

///|
test "codegen: from import with attributes" {
  let js = compile(
    "from ///./data.json/// import data with [ type be ///json/// ]",
  )
  assert_true(
    js.contains("import data from \"./data.json\" with { type: \"json\" };"),
  )
}

///|
test "codegen: from import named with attributes" {
  let js = compile(
    "from ///./package.json/// import [name, version] with [ type be ///json/// ]",
  )
  assert_true(
    js.contains(
      "import { name, version } from \"./package.json\" with { type: \"json\" };",
    ),
  )
}

// ===== Literals =====

///|
test "codegen: array literal" {
  let js = compile("const arr be [1, 2, 3]")
  assert_eq(js, "const arr = [1, 2, 3];\n")
}

///|
test "codegen: object literal" {
  let js = compile("const obj be [name be ///alice///, age be 30]")
  assert_true(js.contains("name: \"alice\""))
  assert_true(js.contains("age: 30"))
}

///|
test "codegen: boolean and null" {
  let js = compile("const a be true")
  assert_eq(js, "const a = true;\n")
  let js2 = compile("const b be null")
  assert_eq(js2, "const b = null;\n")
}

///|
test "codegen: nan literal" {
  let js = compile("const x be nan")
  assert_eq(js, "const x = NaN;\n")
}

///|
test "codegen: infinity literal" {
  let js = compile("const x be infinity")
  assert_eq(js, "const x = Infinity;\n")
}

///|
test "codegen: neg infinity via keyword" {
  let js = compile("const x be neg infinity")
  assert_eq(js, "const x = -Infinity;\n")
}

///|
test "codegen: -infinity literal" {
  let js = compile("const x be -infinity")
  assert_eq(js, "const x = -Infinity;\n")
}

///|
test "codegen: return statement" {
  let src =
    #|fn foo
    #|  return 42
  let js = compile(src)
  assert_true(js.contains("return 42;"))
}

///|
test "codegen: hyphenated ident becomes underscore" {
  let js = compile("const my-var be 10")
  assert_eq(js, "const my_var = 10;\n")
}

///|
test "codegen: bare ident assignment is discarded" {
  let js = compile("x be 42")
  assert_eq(js, "x;\n") // bare ident assignment is not supported; emits identifier as expression
}

///|
test "codegen: property assignment" {
  let js = compile("obj.field be 42")
  assert_eq(js, "obj.field = 42;\n")
}

///|
test "codegen: unary not" {
  let js = compile("const r be not x")
  assert_eq(js, "const r = !x;\n")
}

///|
test "codegen: unary neg" {
  let js = compile("const r be neg x")
  assert_eq(js, "const r = -x;\n")
}

// ===== Header / strict mode =====

///|
test "codegen: header comment" {
  let stmts = @parser.Parser::new(@lexer.Lexer::new("const x be 1").tokenize()).parse()
  let js = @codegen.JsCodegen::new().generate(
    stmts,
    header="// Generated by Purus 0.1.0",
  )
  assert_true(js.has_prefix("// Generated by Purus 0.1.0\n\"use strict\";\n"))
  assert_true(js.contains("const x = 1;"))
}

///|
test "codegen: shebang before header" {
  let stmts = @parser.Parser::new(@lexer.Lexer::new("const x be 1").tokenize()).parse()
  let js = @codegen.JsCodegen::new().generate(
    stmts,
    header="// Generated by Purus 0.1.0",
    shebang="#!/usr/bin/env node",
  )
  assert_true(
    js.has_prefix(
      "#!/usr/bin/env node\n// Generated by Purus 0.1.0\n\"use strict\";\n",
    ),
  )
}

///|
test "codegen: no header when empty" {
  let js = compile("const x be 1")
  assert_eq(js, "const x = 1;\n")
}

///|
test "codegen: strict mode default" {
  let src = "const x be 42"
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  let js = @codegen.JsCodegen::new().generate(stmts)
  assert_true(js.contains("\"use strict\";"))
}

///|
test "codegen: strict mode disabled" {
  let src = "const x be 42"
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  let js = @codegen.JsCodegen::new().generate(stmts, strict=false)
  assert_false(js.contains("use strict"))
}

///|
test "codegen: strict mode with header" {
  let src = "const x be 42"
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  let js = @codegen.JsCodegen::new().generate(
    stmts,
    header="// Generated by Purus",
  )
  assert_true(js.contains("// Generated by Purus"))
  assert_true(js.contains("\"use strict\";"))
}

// ===== Operators =====

///|
test "codegen: neq operator" {
  let js = compile("const r be x neq y")
  assert_eq(js, "const r = x !== y;\n")
}

///|
test "codegen: not eq operator" {
  let js = compile("const r be x not eq y")
  assert_eq(js, "const r = x !== y;\n")
}

///|
test "codegen: pow operator" {
  let js = compile("const r be 2 pow 3")
  assert_eq(js, "const r = 2 ** 3;\n")
}

///|
test "codegen: lt eq operator" {
  let js = compile("const r be x lt eq y")
  assert_eq(js, "const r = x <= y;\n")
}

///|
test "codegen: gt eq operator" {
  let js = compile("const r be x gt eq y")
  assert_eq(js, "const r = x >= y;\n")
}

// ===== Range =====

///|
test "codegen: inclusive range" {
  let js = compile("const r be [0..5]")
  assert_true(js.contains("Array.from"))
  assert_true(js.contains("+ 1"))
}

///|
test "codegen: exclusive range" {
  let js = compile("const r be [0...5]")
  assert_true(js.contains("Array.from"))
  assert_true(!js.contains("+ 1"))
}

// ===== Namespace =====

///|
test "codegen: namespace declaration" {
  let src =
    #|namespace utils
    #|  const x be 1
  let js = compile(src)
  assert_true(js.contains("const utils = (() => {"))
}

// ===== Slice =====

///|
test "codegen: inclusive slice" {
  let js = compile("const mid be numbers[\\2..4]")
  assert_true(js.contains("numbers.slice(2, 4 + 1)"))
}

///|
test "codegen: exclusive slice" {
  let js = compile("const mid be numbers[\\2...4]")
  assert_true(js.contains("numbers.slice(2, 4)"))
}

///|
test "codegen: splice with array literal" {
  let js = compile("numbers[\\2..4] be [///a///; ///b///; ///c///]")
  assert_true(js.contains("numbers.splice(2, 4 - 2 + 1, \"a\", \"b\", \"c\")"))
}

///|
test "codegen: splice exclusive" {
  let js = compile("numbers[\\2...4] be [///a///; ///b///]")
  assert_true(js.contains("numbers.splice(2, 4 - 2, \"a\", \"b\")"))
}

///|
test "codegen: splice with variable" {
  let js = compile("numbers[\\2..4] be replacement")
  assert_true(js.contains("numbers.splice(2, 4 - 2 + 1, ...replacement)"))
}

// ===== Destructuring =====

///|
test "codegen: const destructuring" {
  let js = compile("const [today; tomorrow] be weather")
  assert_true(js.contains("const [today, tomorrow] = weather"))
}

///|
test "codegen: let destructuring" {
  let js = compile("let [x; y; z] be arr")
  assert_true(js.contains("let [x, y, z] = arr"))
}

///|
test "codegen: destructuring swap" {
  let js = compile("[a; b] be [b; a]")
  assert_true(js.contains("[a, b] = [b, a]"))
}

///|
test "codegen: destructuring from array" {
  let js = compile("const [first; second] be [1; 2]")
  assert_true(js.contains("const [first, second] = [1, 2]"))
}

// ===== Optional chaining =====

///|
test "codegen: optional dot access" {
  let js = compile("const val be obj\\.name")
  assert_true(js.contains("obj?.name"))
}

///|
test "codegen: optional method call" {
  let js = compile("const val be obj\\.method[1; 2]")
  assert_true(js.contains("obj?.method(1, 2)"))
}

// ===== Computed access =====

///|
test "codegen: computed access" {
  let js = compile("const val be arr[\\i]")
  assert_true(js.contains("arr[i]"))
}

///|
test "codegen: computed access string key" {
  let js = compile("const val be obj[\\///key///]")
  assert_true(js.contains("obj[\"key\"]"))
}

// ===== Async fn expression =====

///|
test "codegen: async fn expression to" {
  let js = compile("const handler be async fn x to x add 1")
  assert_true(js.contains("async (x) => x + 1"))
}

///|
test "codegen: async fn expression block" {
  let src =
    #|const handler be async fn x
    #|  return x add 1
  let js = compile(src)
  assert_true(js.contains("async (x) => {"))
  assert_true(js.contains("return x + 1;"))
}

// ===== Class =====

///|
test "codegen: basic class" {
  let src =
    #|class Animal
    #|  fn speak
    #|    console.log[///hello///]
  let js = compile(src)
  assert_true(js.contains("class Animal {"))
  assert_true(js.contains("speak()"))
  assert_true(js.contains("console.log(\"hello\")"))
}

///|
test "codegen: class with constructor" {
  let src =
    #|class Animal
    #|  fn new name
    #|    this.name be name
  let js = compile(src)
  assert_true(js.contains("class Animal {"))
  assert_true(js.contains("constructor(name)"))
  assert_true(js.contains("this.name = name"))
}

///|
test "codegen: class with private fields" {
  let src =
    #|class Counter
    #|  private count be 0
    #|  fn increment
    #|    this.count be this.count add 1
    #|  fn get-count to this.count
  let js = compile(src)
  assert_true(js.contains("class Counter {"))
  assert_true(js.contains("#count = 0"))
  assert_true(js.contains("this.#count = this.#count + 1"))
  assert_true(js.contains("get_count()"))
}

///|
test "codegen: class with extends" {
  let src =
    #|class Dog extends Animal
    #|  fn new name
    #|    super[name]
    #|  fn speak
    #|    console.log[///woof///]
  let js = compile(src)
  assert_true(js.contains("class Dog extends Animal {"))
  assert_true(js.contains("constructor(name)"))
  assert_true(js.contains("super(name)"))
  assert_true(js.contains("speak()"))
}

///|
test "codegen: class with static method" {
  let src =
    #|class MathUtil
    #|  static fn sum a; b to a add b
  let js = compile(src)
  assert_true(js.contains("class MathUtil {"))
  assert_true(js.contains("static sum(a, b)"))
}

///|
test "codegen: class with getter and setter" {
  let src =
    #|class Person
    #|  private name
    #|  fn new name
    #|    this.name be name
    #|  get fn name to this.name
    #|  set fn name value
    #|    this.name be value
  let js = compile(src)
  assert_true(js.contains("class Person {"))
  assert_true(js.contains("#name;"))
  assert_true(js.contains("get name()"))
  assert_true(js.contains("this.#name"))
  assert_true(js.contains("set name(value)"))
  assert_true(js.contains("this.#name = value"))
}

///|
test "codegen: class with async method" {
  let src =
    #|class Api
    #|  async fn fetch-data url
    #|    const res be await fetch[url]
    #|    return res.json[]
  let js = compile(src)
  assert_true(js.contains("class Api {"))
  assert_true(js.contains("async fetch_data(url)"))
}

///|
test "codegen: class super expression" {
  let js = compile("const x be super.method[]")
  assert_true(js.contains("super.method()"))
}

// ===== Switch/case =====

///|
test "codegen: switch/case/default" {
  let src =
    #|switch x
    #|  case 1 then ///one///
    #|  case 2 then ///two///
    #|  default ///other///
  let js = compile(src)
  assert_true(js.contains("if (x === 1)"))
  assert_true(js.contains("\"one\""))
  assert_true(js.contains("\"two\""))
  assert_true(js.contains("\"other\""))
}

///|
test "codegen: switch with block body" {
  let src =
    #|switch status
    #|  case ///ok///
    #|    console.log[///success///]
    #|  case ///error///
    #|    console.log[///failure///]
    #|  default
    #|    console.log[///unknown///]
  let js = compile(src)
  assert_true(js.contains("if (status === \"ok\")"))
  assert_true(js.contains("console.log(\"success\")"))
  assert_true(js.contains("console.log(\"unknown\")"))
}

// ===== to return =====

///|
test "codegen: fn to return" {
  let js = compile("fn double x to return x mul 2")
  assert_true(js.contains("function double(x) { return x * 2; }"))
}

///|
test "codegen: class method to return" {
  let src =
    #|class Calc
    #|  fn sum a; b to return a add b
  let js = compile(src)
  assert_true(js.contains("sum(a, b) { return a + b; }"))
}

// ===== Public keyword =====

///|
test "codegen: public const" {
  let js = compile("public const name be ///hello///")
  assert_true(js.contains("export const name = \"hello\";"))
}

///|
test "codegen: public fn" {
  let js = compile("public fn greet x to console.log[x]")
  assert_true(js.contains("export function greet(x)"))
}

// ===== Type check =====

///|
test "codegen: typeof type check" {
  let js = compile("if typeof x eq ///string/// then console.log[x]")
  assert_true(js.contains("typeof x === \"string\""))
}

// ===== CJS module type =====

///|
test "cjs: default import" {
  let js = compile_cjs("import express from ///express///")
  assert_eq(js, "const express = require(\"express\");\n")
}

///|
test "cjs: named import" {
  let js = compile_cjs("import [Hono] from ///hono///")
  assert_eq(js, "const { Hono } = require(\"hono\");\n")
}

///|
test "cjs: default + named import" {
  let js = compile_cjs("import axios, [AxiosError] from ///axios///")
  assert_eq(
    js, "const axios = require(\"axios\");\nconst { AxiosError } = axios;\n",
  )
}

///|
test "cjs: namespace import" {
  let js = compile_cjs("import all as fs from ///fs///")
  assert_eq(js, "const fs = require(\"fs\");\n")
}

///|
test "cjs: side-effect import" {
  let js = compile_cjs("import ///dotenv/config///")
  assert_eq(js, "require(\"dotenv/config\");\n")
}

///|
test "cjs: export default expression" {
  let js = compile_cjs("export default 42")
  assert_eq(js, "module.exports = 42;\n")
}

///|
test "cjs: public const" {
  let js = compile_cjs("public const name be ///hello///")
  assert_eq(js, "const name = \"hello\";\nexports.name = name;\n")
}

///|
test "cjs: public fn" {
  let js = compile_cjs("public fn greet x to console.log[x]")
  assert_eq(
    js, "function greet(x) { console.log(x); }\nexports.greet = greet;\n",
  )
}

///|
test "do while basic" {
  let js = compile("do\n  console.log[i]\nwhile i lt 10")
  assert_eq(js, "do {\n  console.log(i);\n} while (i < 10);\n")
}

///|
test "do while multi-line body" {
  let js = compile("do\n  x add be 1\n  console.log[x]\nwhile x lt 100")
  assert_eq(js, "do {\n  x += 1;\n  console.log(x);\n} while (x < 100);\n")
}

///|
test "yield basic" {
  let js = compile("fn gen\n  yield 1\n  yield 2")
  assert_eq(js, "function* gen() {\n  yield 1;\n  yield 2;\n}\n")
}

///|
test "yield without value" {
  let js = compile("fn gen\n  yield\n  yield 42")
  assert_eq(js, "function* gen() {\n  yield;\n  yield 42;\n}\n")
}

///|
test "yield in async generator" {
  let js = compile("async fn gen\n  yield await fetch[url]")
  assert_eq(js, "async function* gen() {\n  yield await fetch(url);\n}\n")
}

///|
test "cjs: require keyword unchanged" {
  let stmts : Array[@parser.Stmt] = [
    @parser.ImportDecl(@parser.CjsRequire("lodash", "lodash")),
  ]
  let js = @codegen.JsCodegen::new(cjs=true).generate(stmts, strict=false)
  assert_eq(js, "const lodash = require(\"lodash\");\n")
}

///|
test "cjs: from import default" {
  let js = compile_cjs("from ///express/// import express")
  assert_eq(js, "const express = require(\"express\");\n")
}

// ===== stdlib codegen =====

///|
test "codegen: use p-math as m emits marker" {
  let js = compile("use p-math as m")
  assert_true(js.contains("// @purus-stdlib:whole:p-math:m"))
}

///|
test "codegen: use p-random as r emits marker" {
  let js = compile("use p-random as r")
  assert_true(js.contains("// @purus-stdlib:whole:p-random:r"))
}

///|
test "codegen: use p-math without alias emits js_ident binding" {
  let js = compile("use p-math")
  assert_true(js.contains("// @purus-stdlib:whole:p-math:p_math"))
}

///|
test "codegen: from...use is removed" {
  let js = compile("from p-math use abs")
  assert_true(js.contains("removed"))
}

// ===== Bitwise operators =====

///|
test "codegen: band operator" {
  let js = compile("const r be 5 band 3")
  assert_true(js.contains("5 & 3"))
}

///|
test "codegen: bor operator" {
  let js = compile("const r be 5 bor 3")
  assert_true(js.contains("5 | 3"))
}

///|
test "codegen: bxor operator" {
  let js = compile("const r be 5 bxor 3")
  assert_true(js.contains("5 ^ 3"))
}

///|
test "codegen: shl operator" {
  let js = compile("const r be 1 shl 4")
  assert_true(js.contains("1 << 4"))
}

///|
test "codegen: shr operator" {
  let js = compile("const r be 16 shr 2")
  assert_true(js.contains("16 >> 2"))
}

///|
test "codegen: ushr operator" {
  let js = compile("const r be -1 ushr 0")
  assert_true(js.contains(">>> 0"))
}

///|
test "codegen: bnot operator" {
  let js = compile("const r be bnot 5")
  assert_true(js.contains("~5"))
}

///|
test "codegen: binary literal in expression" {
  let js = compile("const r be 0b1100 band 0b1010")
  assert_true(js.contains("12 & 10"))
}

///|
test "codegen: hex literal in expression" {
  let js = compile("const r be 0xff")
  assert_true(js.contains("255"))
}

///|
test "codegen: function keyword as fn alias" {
  let js = compile("function greet name to console.log[name]")
  assert_true(js.contains("function greet(name)"))
  assert_true(js.contains("console.log(name)"))
}

///|
test "codegen: function keyword anonymous" {
  let js = compile("const square be function x to x mul 2")
  assert_true(js.contains("const square ="))
  assert_true(js.contains("(x) =>"))
  assert_true(js.contains("x * 2"))
}

///|
test "codegen: async function keyword" {
  let js = compile(
    "async function fetch-data url\n  const res be await fetch[url]\n  return res",
  )
  assert_true(js.contains("async function fetch_data(url)"))
  assert_true(js.contains("await fetch(url)"))
}

///|
test "codegen: protected keyword as private alias" {
  let src =
    #|class Foo
    #|  protected bar be 0
    #|  fn new
    #|    this.bar be 1
  let js = compile(src)
  assert_true(js.contains("#bar = 0"))
  assert_true(js.contains("this.#bar = 1"))
}

// ===== Compound assignment operators =====

///|
test "codegen: add be" {
  let js = compile("x add be 1")
  assert_eq(js, "x += 1;\n")
}

///|
test "codegen: sub be" {
  let js = compile("x sub be 1")
  assert_eq(js, "x -= 1;\n")
}

///|
test "codegen: mul be" {
  let js = compile("x mul be 2")
  assert_eq(js, "x *= 2;\n")
}

///|
test "codegen: div be" {
  let js = compile("x div be 2")
  assert_eq(js, "x /= 2;\n")
}

///|
test "codegen: mod be" {
  let js = compile("x mod be 3")
  assert_eq(js, "x %= 3;\n")
}

///|
test "codegen: pow be" {
  let js = compile("x pow be 2")
  assert_eq(js, "x **= 2;\n")
}

///|
test "codegen: compound assign dot access" {
  let js = compile("obj.count add be 1")
  assert_eq(js, "obj.count += 1;\n")
}

///|
test "codegen: compound assign computed" {
  let js = compile("arr[\\i] add be 1")
  assert_eq(js, "arr[i] += 1;\n")
}

// ===== JS-style for loop =====

///|
test "codegen: for classic" {
  let src =
    #|for let i be 0; i lt 10; i add be 1
    #|  console.log[i]
  let js = compile(src)
  assert_eq(js, "for (let i = 0; i < 10; i += 1) {\n  console.log(i);\n}\n")
}

///|
test "codegen: for classic with mul be" {
  let src =
    #|for let x be 1; x lt 100; x mul be 2
    #|  console.log[x]
  let js = compile(src)
  assert_eq(js, "for (let x = 1; x < 100; x *= 2) {\n  console.log(x);\n}\n")
}

///|
test "codegen: for classic with plain assign" {
  let src =
    #|for let i be 0; i lt 5; i be i add 1
    #|  console.log[i]
  let js = compile(src)
  assert_eq(js, "for (let i = 0; i < 5; i = i + 1) {\n  console.log(i);\n}\n")
}

// ===== Postfix / prefix increment & decrement =====

///|
test "codegen: postfix increment" {
  let js = compile("x\\add")
  assert_eq(js, "x++;\n")
}

///|
test "codegen: postfix decrement" {
  let js = compile("x\\sub")
  assert_eq(js, "x--;\n")
}

///|
test "codegen: prefix increment" {
  let js = compile("add\\x")
  assert_eq(js, "++x;\n")
}

///|
test "codegen: prefix decrement" {
  let js = compile("sub\\x")
  assert_eq(js, "--x;\n")
}

///|
test "codegen: postfix inc in for classic" {
  let src =
    #|for let i be 0; i lt 10; i\add
    #|  console.log[i]
  let js = compile(src)
  assert_eq(js, "for (let i = 0; i < 10; i++) {\n  console.log(i);\n}\n")
}

///|
test "codegen: prefix inc in expression" {
  let js = compile("let y be add\\x")
  assert_eq(js, "let y = ++x;\n")
}

// ===== Floor division =====

///|
test "codegen: fdiv" {
  let js = compile("let r be a fdiv b")
  assert_eq(js, "let r = Math.floor(a / b);\n")
}

///|
test "codegen: fdiv be" {
  let js = compile("x fdiv be 3")
  assert_eq(js, "x = Math.floor(x / 3);\n")
}

///|
test "codegen: fdiv expression" {
  let js = compile("let q be 7 fdiv 2")
  assert_eq(js, "let q = Math.floor(7 / 2);\n")
}

// ===== Bitwise compound assignments =====

///|
test "codegen: band be" {
  let js = compile("x band be 0xFF")
  assert_eq(js, "x &= 255;\n")
}

///|
test "codegen: bor be" {
  let js = compile("x bor be 1")
  assert_eq(js, "x |= 1;\n")
}

///|
test "codegen: bxor be" {
  let js = compile("x bxor be mask")
  assert_eq(js, "x ^= mask;\n")
}

///|
test "codegen: shl be" {
  let js = compile("x shl be 2")
  assert_eq(js, "x <<= 2;\n")
}

///|
test "codegen: shr be" {
  let js = compile("x shr be 1")
  assert_eq(js, "x >>= 1;\n")
}

///|
test "codegen: ushr be" {
  let js = compile("x ushr be 1")
  assert_eq(js, "x >>>= 1;\n")
}

///|
test "codegen: bitwise compound after binary" {
  let js = compile("let y be a band b\ny bor be 1")
  assert_eq(js, "let y = a & b;\ny |= 1;\n")
}

///|
test "codegen: fdiv be in for classic" {
  let src =
    #|for let n be 1000; n gt 0; n fdiv be 10
    #|  console.log[n]
  let js = compile(src)
  assert_eq(
    js, "for (let n = 1000; n > 0; n = Math.floor(n / 10)) {\n  console.log(n);\n}\n",
  )
}

///|
test "codegen: and be (&&=)" {
  let js = compile("x and be true")
  assert_eq(js, "x &&= true;\n")
}

///|
test "codegen: or be (||=)" {
  let js = compile("x or be false")
  assert_eq(js, "x ||= false;\n")
}

///|
test "codegen: coal be (??=)" {
  let js = compile("x coal be 0")
  assert_eq(js, "x ??= 0;\n")
}

///|
test "codegen: bigint literal" {
  let js = compile("const n be 100n")
  assert_eq(js, "const n = 100n;\n")
}

///|
test "codegen: bigint expression" {
  let js = compile("const big be 9007199254740993n add 1n")
  assert_eq(js, "const big = 9007199254740993n + 1n;\n")
}

///|
test "codegen: void expression" {
  let js = compile("void f[]")
  assert_eq(js, "void f();\n")
}

///|
test "codegen: void 0" {
  let js = compile("const u be void 0")
  assert_eq(js, "const u = void 0;\n")
}

///|
test "codegen: dotted var init - auto declares obj" {
  let js = compile("const obj.x be 42")
  assert_eq(js, "const obj = {};\nobj.x = 42;\n")
}

///|
test "codegen: dotted var init - let" {
  let js = compile("let cfg.host be ///localhost///")
  assert_eq(js, "let cfg = {};\ncfg.host = \"localhost\";\n")
}

///|
test "codegen: dotted var init - var" {
  let js = compile("var state.count be 0")
  assert_eq(js, "var state = {};\nstate.count = 0;\n")
}

///|
test "codegen: dotted var init - no duplicate decl" {
  let src =
    #|const opts.a be 1
    #|const opts.b be 2
  let js = compile(src)
  assert_eq(js, "const opts = {};\nopts.a = 1;\nopts.b = 2;\n")
}

///|
test "codegen: dotted var init - after explicit decl no re-init" {
  let src =
    #|const opts be [a be 1]
    #|const opts.b be 2
  let js = compile(src)
  assert_eq(js, "const opts = { a: 1 };\nopts.b = 2;\n")
}

// ===== blank wildcard =====

///|
test "codegen: blank as single fn param" {
  let js = compile("fn f blank to 0")
  assert_true(js.contains("function f(_)"))
}

///|
test "codegen: blank as first of two fn params" {
  let js = compile("fn f blank; x to x")
  assert_true(js.contains("function f(_, x)"))
}

///|
test "codegen: multiple blank fn params get unique names" {
  let js = compile("fn f blank; blank; x to x")
  assert_true(js.contains("function f(_, _1, x)"))
}

///|
test "codegen: blank in fn expression" {
  let js = compile("const f be fn blank; x to x add 1")
  assert_true(js.contains("(_, x) => x + 1"))
}

///|
test "codegen: blank in async fn expression" {
  let js = compile("const f be async fn blank; x to x")
  assert_true(js.contains("async (_, x) => x"))
}

///|
test "codegen: blank in match wildcard arm" {
  let src =
    #|match x
    #|  when 1 then ///one///
    #|  when blank then ///other///
  let js = compile(src)
  assert_true(js.contains("if (x === 1)"))
  assert_true(js.contains("\"other\""))
  assert_false(js.contains("blank"))
}

// ===== Semicolon string //;...;// =====

///|
test "codegen: semicolon string plain" {
  let js = compile("const s be //;hello;//")
  assert_eq(js, "const s = \"hello\";\n")
}

///|
test "codegen: semicolon string with url" {
  let js = compile("const url be //;https://example.com/api;//")
  assert_eq(js, "const url = \"https://example.com/api\";\n")
}

///|
test "codegen: semicolon string interpolated" {
  let js = compile("const s be //;hello [name]!;//")
  assert_true(js.contains("`hello ${name}!`"))
}

///|
test "codegen: semicolon string with double slash inside" {
  let js = compile("const s be //;see // for details;//")
  assert_eq(js, "const s = \"see // for details\";\n")
}

///|
test "codegen: semicolon string in function arg" {
  let js = compile("console.log[//;hello world;//]")
  assert_true(js.contains("console.log(\"hello world\")"))
}

///|
test "codegen: semicolon string empty" {
  let js = compile("const s be //;;//")
  assert_eq(js, "const s = \"\";\n")
}
