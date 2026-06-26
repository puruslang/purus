// Whitebox lexer tests — internal helpers and invariants
// Run `moon test` to execute and `moon test --update` to refresh snapshots.

///|
test "lexer: integer literals" {
  let lexer = Lexer::new("42")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Int(42))
  assert_eq(tokens[2].kind, Eof)
}

///|
test "lexer: float literals" {
  let lexer = Lexer::new("3.14")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Float(3.14))
}

///|
test "lexer: negative integer" {
  let lexer = Lexer::new("-5")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Int(-5))
}

///|
test "lexer: binary literal" {
  let lexer = Lexer::new("0b1100")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Int(12))
}

///|
test "lexer: binary literal uppercase" {
  let lexer = Lexer::new("0B1010")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Int(10))
}

///|
test "lexer: hex literal" {
  let lexer = Lexer::new("0xff")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Int(255))
}

///|
test "lexer: hex literal uppercase" {
  let lexer = Lexer::new("0XAB")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Int(171))
}

///|
test "lexer: negative binary literal" {
  let lexer = Lexer::new("-0b1010")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Int(-10))
}

///|
test "lexer: negative hex literal" {
  let lexer = Lexer::new("-0xff")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Int(-255))
}

///|
test "lexer: bigint decimal literal" {
  let lexer = Lexer::new("100n")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, BigInt("100"))
}

///|
test "lexer: bigint binary literal" {
  let lexer = Lexer::new("0b1010n")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, BigInt("10"))
}

///|
test "lexer: bigint hex literal" {
  let lexer = Lexer::new("0xffn")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, BigInt("255"))
}

///|
test "lexer: string" {
  let lexer = Lexer::new("///hello world///")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Str("hello world"))
}

///|
test "lexer: string with escape" {
  let lexer = Lexer::new("///line1\\nline2///")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Str("line1\nline2"))
}

///|
test "lexer: regex" {
  let lexer = Lexer::new("/abc/gi")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Regex("abc", "gi"))
}

///|
test "lexer: keywords" {
  let lexer = Lexer::new("const let var be fn return if else")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Const_)
  assert_eq(tokens[2].kind, Let_)
  assert_eq(tokens[3].kind, Var_)
  assert_eq(tokens[4].kind, Be)
  assert_eq(tokens[5].kind, Fn)
  assert_eq(tokens[6].kind, Return_)
  assert_eq(tokens[7].kind, If_)
  assert_eq(tokens[8].kind, Else_)
}

///|
test "lexer: operators" {
  let lexer = Lexer::new(
    "add sub mul div mod pow eq neq lt gt le ge and or not neg",
  )
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Add)
  assert_eq(tokens[2].kind, Sub)
  assert_eq(tokens[3].kind, Mul)
  assert_eq(tokens[4].kind, Div)
  assert_eq(tokens[5].kind, Mod)
  assert_eq(tokens[6].kind, Pow)
  assert_eq(tokens[7].kind, Eq)
  assert_eq(tokens[8].kind, Neq)
  assert_eq(tokens[9].kind, Lt)
  assert_eq(tokens[10].kind, Gt)
  assert_eq(tokens[11].kind, Le)
  assert_eq(tokens[12].kind, Ge)
  assert_eq(tokens[13].kind, And)
  assert_eq(tokens[14].kind, Or)
  assert_eq(tokens[15].kind, Not)
  assert_eq(tokens[16].kind, Neg)
}

///|
test "lexer: punctuation" {
  let lexer = Lexer::new("[a, b; c]")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, LBracket)
  assert_eq(tokens[2].kind, Ident("a"))
  assert_eq(tokens[3].kind, Comma)
  assert_eq(tokens[4].kind, Ident("b"))
  assert_eq(tokens[5].kind, Semicolon)
  assert_eq(tokens[6].kind, Ident("c"))
  assert_eq(tokens[7].kind, RBracket)
}

///|
test "lexer: dot access" {
  let lexer = Lexer::new("console.log")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Ident("console"))
  assert_eq(tokens[2].kind, Dot)
  assert_eq(tokens[3].kind, Ident("log"))
}

///|
test "lexer: line comment" {
  let lexer = Lexer::new("x -- this is a comment")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Ident("x"))
  assert_eq(tokens[2].kind, Comment(" this is a comment"))
}

///|
test "lexer: block comment" {
  let lexer = Lexer::new("---block comment---")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, BlockComment("block comment"))
}

///|
test "lexer: indentation" {
  let lexer = Lexer::new("a\n  b\n    c\n  d\ne")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Ident("a"))
  assert_eq(tokens[2].kind, Newline)
  assert_eq(tokens[3].kind, Indent(2))
  assert_eq(tokens[4].kind, Ident("b"))
  assert_eq(tokens[5].kind, Newline)
  assert_eq(tokens[6].kind, Indent(4))
  assert_eq(tokens[7].kind, Ident("c"))
  assert_eq(tokens[8].kind, Newline)
  assert_eq(tokens[9].kind, Indent(2))
  assert_eq(tokens[10].kind, Ident("d"))
  assert_eq(tokens[11].kind, Newline)
  assert_eq(tokens[12].kind, Indent(0))
  assert_eq(tokens[13].kind, Ident("e"))
}

///|
test "lexer: var decl" {
  let lexer = Lexer::new("const x be 10")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Const_)
  assert_eq(tokens[2].kind, Ident("x"))
  assert_eq(tokens[3].kind, Be)
  assert_eq(tokens[4].kind, Int(10))
}

///|
test "lexer: true false null nil undefined" {
  let lexer = Lexer::new("true false null nil undefined")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, True_)
  assert_eq(tokens[2].kind, False_)
  assert_eq(tokens[3].kind, Null_)
  assert_eq(tokens[4].kind, Nil_)
  assert_eq(tokens[5].kind, Undefined_)
}

///|
test "lexer: list and object keywords" {
  let lexer = Lexer::new("list object")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, List_)
  assert_eq(tokens[2].kind, Object_)
}

///|
test "lexer: multiline function" {
  let src = "fn greet name\n  console.log[///hello///]"
  let lexer = Lexer::new(src)
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Fn)
  assert_eq(tokens[2].kind, Ident("greet"))
  assert_eq(tokens[3].kind, Ident("name"))
  assert_eq(tokens[4].kind, Newline)
  assert_eq(tokens[5].kind, Indent(2))
  assert_eq(tokens[6].kind, Ident("console"))
  assert_eq(tokens[7].kind, Dot)
  assert_eq(tokens[8].kind, Ident("log"))
  assert_eq(tokens[9].kind, LBracket)
  assert_eq(tokens[10].kind, Str("hello"))
  assert_eq(tokens[11].kind, RBracket)
}

///|
test "lexer: hyphenated ident" {
  let lexer = Lexer::new("my-var")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Ident("my-var"))
}

///|
test "lexer: negative after operator" {
  let lexer = Lexer::new("x -5")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Ident("x"))
}

///|
test "lexer: negative after be" {
  let lexer = Lexer::new("const x be -3")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Const_)
  assert_eq(tokens[2].kind, Ident("x"))
  assert_eq(tokens[3].kind, Be)
  assert_eq(tokens[4].kind, Int(-3))
}

///|
test "lexer: neq keyword" {
  let lexer = Lexer::new("neq")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, Neq)
}

///|
test "lexer: pow keyword" {
  let lexer = Lexer::new("pow")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, Pow)
}

///|
test "lexer: dot dot" {
  let lexer = Lexer::new("[0..10]")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, LBracket)
  assert_eq(tokens[2].kind, Int(0))
  assert_eq(tokens[3].kind, DotDot)
  assert_eq(tokens[4].kind, Int(10))
  assert_eq(tokens[5].kind, RBracket)
}

///|
test "lexer: dot dot dot" {
  let lexer = Lexer::new("[0...10]")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, LBracket)
  assert_eq(tokens[2].kind, Int(0))
  assert_eq(tokens[3].kind, DotDotDot)
  assert_eq(tokens[4].kind, Int(10))
  assert_eq(tokens[5].kind, RBracket)
}

///|
test "lexer: namespace keyword" {
  let lexer = Lexer::new("namespace")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, Mod_)
}

///|
test "lexer: backslash token" {
  let src = "x[\\y]"
  let tokens = Lexer::new(src).tokenize()
  assert_eq(tokens[1].kind, Ident("x"))
  assert_eq(tokens[2].kind, LBracket)
  assert_eq(tokens[3].kind, Backslash)
  assert_eq(tokens[4].kind, Ident("y"))
  assert_eq(tokens[5].kind, RBracket)
}

///|
test "lexer: optional dot token" {
  let src = "a\\.b"
  let tokens = Lexer::new(src).tokenize()
  assert_eq(tokens[1].kind, Ident("a"))
  assert_eq(tokens[2].kind, OptDot)
  assert_eq(tokens[3].kind, Ident("b"))
}

///|
test "lexer: is is no longer a keyword" {
  let lexer = Lexer::new("is")
  let tokens = lexer.tokenize()
  assert_eq(tokens[0].kind, Indent(0))
  assert_eq(tokens[1].kind, Ident("is"))
}

// ===== Semicolon string //;...;// =====

///|
test "lexer: semicolon string plain" {
  let tokens = Lexer::new("//;hello;//").tokenize()
  assert_eq(tokens[1].kind, Str("hello"))
}

///|
test "lexer: semicolon string with spaces" {
  let tokens = Lexer::new("//;hello world;//").tokenize()
  assert_eq(tokens[1].kind, Str("hello world"))
}

///|
test "lexer: semicolon string empty" {
  let tokens = Lexer::new("//;;//").tokenize()
  assert_eq(tokens[1].kind, Str(""))
}

///|
test "lexer: semicolon string with url" {
  let tokens = Lexer::new("//;https://example.com/api;//").tokenize()
  assert_eq(tokens[1].kind, Str("https://example.com/api"))
}

///|
test "lexer: semicolon string with double slash inside" {
  let tokens = Lexer::new("//;see // for details;//").tokenize()
  assert_eq(tokens[1].kind, Str("see // for details"))
}

///|
test "lexer: semicolon string interpolated" {
  let tokens = Lexer::new("//;hello [name]!;//").tokenize()
  match tokens[1].kind {
    InterpStr(segs) => {
      assert_eq(segs.length(), 3)
      assert_eq(segs[0], "hello ")
      assert_eq(segs[1], "name")
      assert_eq(segs[2], "!")
    }
    _ => fail("expected InterpStr")
  }
}

///|
test "lexer: semicolon string escape semicolon" {
  let tokens = Lexer::new("//;a\\;b;//").tokenize()
  assert_eq(tokens[1].kind, Str("a;b"))
}

///|
test "lexer: semicolon string does not affect triple slash" {
  let tokens = Lexer::new("///hello///").tokenize()
  assert_eq(tokens[1].kind, Str("hello"))
}

///|
test "lexer: semicolon string does not affect regex" {
  let tokens = Lexer::new("/[a-z]/gi").tokenize()
  match tokens[1].kind {
    Regex(pat, flags) => {
      assert_eq(pat, "[a-z]")
      assert_eq(flags, "gi")
    }
    _ => fail("expected Regex")
  }
}
