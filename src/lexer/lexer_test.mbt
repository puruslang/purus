// Blackbox lexer tests
// Run `moon test` to execute and `moon test --update` to refresh snapshots.

///|
test "lexer: shebang at start of file" {
  let src = "#!/usr/bin/env node\nconst x be 1"
  let tokens = @lexer.Lexer::new(src).tokenize()
  match tokens[0].kind {
    @lexer.Shebang(s) => assert_eq(s, "#!/usr/bin/env node")
    _ => fail("expected Shebang token")
  }
}

///|
test "lexer: no shebang without #!" {
  let src = "const x be 1"
  let tokens = @lexer.Lexer::new(src).tokenize()
  match tokens[0].kind {
    @lexer.Shebang(_) => fail("should not have shebang")
    _ => () // ok
  }
}

///|
test "lexer: class keyword" {
  let lexer = @lexer.Lexer::new("class")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Class_)
}

///|
test "lexer: extends keyword" {
  let lexer = @lexer.Lexer::new("extends")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Extends_)
}

///|
test "lexer: super keyword" {
  let lexer = @lexer.Lexer::new("super")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Super_)
}

///|
test "lexer: static keyword" {
  let lexer = @lexer.Lexer::new("static")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Static_)
}

///|
test "lexer: private keyword" {
  let lexer = @lexer.Lexer::new("private")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Private_)
}

///|
test "lexer: get keyword" {
  let lexer = @lexer.Lexer::new("get")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Get_)
}

///|
test "lexer: set keyword" {
  let lexer = @lexer.Lexer::new("set")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Set_)
}

///|
test "lexer: switch keyword" {
  let lexer = @lexer.Lexer::new("switch")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Switch_)
}

///|
test "lexer: case keyword" {
  let lexer = @lexer.Lexer::new("case")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Case_)
}

///|
test "lexer: public keyword" {
  let lexer = @lexer.Lexer::new("public")
  let tokens = lexer.tokenize()
  assert_eq(tokens[1].kind, @lexer.Public_)
}
