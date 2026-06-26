// Integration tests: full source ↁElex ↁEparse pipeline
// Run `moon test` to execute and `moon test --update` to refresh snapshots.

///|
test "integration: hello world" {
  let src = "console.log[///Hello, World///]"
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: variable + arithmetic" {
  let src =
    #|const x be 10
    #|const y be 20
    #|const z be x add y
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 3)
}

///|
test "integration: function definition" {
  let src =
    #|fn add a; b
    #|  return a add b
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: arrow function with to" {
  let src = "fn double x to x mul 2"
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: if-elif-else" {
  let src =
    #|if x lt 0
    #|  console.log[///negative///]
    #|elif x eq 0
    #|  console.log[///zero///]
    #|else
    #|  console.log[///positive///]
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: while loop" {
  let src =
    #|let i be 0
    #|while i lt 10
    #|  i be i add 1
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 2)
}

///|
test "integration: for-in loop" {
  let src =
    #|for item in items
    #|  console.log[item]
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: array and object" {
  let src =
    #|const arr be [1, 2, 3]
    #|const obj be [name be ///alice///, age be 30]
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 2)
}

///|
test "integration: pipe" {
  let src = "const result be data pipe filter pipe map"
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: try-catch" {
  let src =
    #|try
    #|  risky[]
    #|catch e
    #|  console.log[e]
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: postfix if" {
  let src = "console.log[///debug///] if verbose"
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: import" {
  let src = "import express from ///express///"
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: match" {
  let src =
    #|match x
    #|  when 1 then ///one///
    #|  when 2 then ///two///
    #|  else ///other///
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: class declaration" {
  let src =
    #|class Animal
    #|  private name
    #|  fn new name
    #|    this.name be name
    #|  fn speak
    #|    console.log[this.name]
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}

///|
test "integration: switch" {
  let src =
    #|switch x
    #|  case 1 then ///one///
    #|  case 2 then ///two///
    #|  default ///other///
  let tokens = @lexer.Lexer::new(src).tokenize()
  let stmts = @parser.Parser::new(tokens).parse()
  assert_eq(stmts.length(), 1)
}
