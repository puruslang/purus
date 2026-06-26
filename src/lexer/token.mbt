///|
/// Token types for the purus language lexer.
pub(all) enum TokenKind {
  // Literals
  Int(Int)
  BigInt(String) // BigInt literal e.g. 100n
  Float(Double)
  Str(String) // already-parsed string content (no ///)
  Regex(String, String) // pattern, flags
  True_
  False_

  // Identifiers & keywords
  Ident(String)
  // Variable declarations
  Const_
  Let_
  Var_
  Be

  // Operators (keyword-style)
  Add
  Sub
  Mul
  Div
  Fdiv
  Mod
  Neg
  Pow

  // Comparison
  Eq
  Neq
  Lt
  Gt
  Le
  Ge

  // Logic
  And
  Or
  Not

  // Nullish coalescing
  Coal

  // Bitwise
  Band
  Bor
  Bxor
  Bnot
  Shl
  Shr
  Ushr

  // Special keywords
  Fn
  Return_
  To
  If_
  Elif
  Else_
  Unless
  Then_
  While_
  Until
  Do_
  Yield_
  For_
  In_
  Range_
  Break_
  Continue_
  Match_
  When_
  Switch_
  Case_
  Pipe_
  As
  Of
  Gives
  Typeof_
  Void_
  Instanceof_
  New_
  Delete_
  This_
  Async_
  Await_
  Try_
  Catch_
  Finally_
  Throw_
  Import_
  From_
  Export_
  Default_
  Require_
  Use_
  Mod_
  Public_
  All_
  Type_
  With_

  // Class-related
  Class_
  Extends_
  Super_
  Static_
  Private_
  Get_
  Set_

  // Null-family
  Null_
  Nil_
  Undefined_
  Nan_
  Infinity_

  // Explicit constructors (reserved keywords)
  List_
  Object_

  // Punctuation
  LBracket // [
  RBracket // ]
  Comma // ,
  Semicolon // ;
  Dot // .
  DotDot // ..   (inclusive range)
  DotDotDot // ...  (exclusive range)
  Backslash // \    (computed access prefix)
  OptDot // \.   (optional chaining)

  // Line-related
  Newline
  Indent(Int) // indentation level (number of spaces)

  // Interpolated string
  InterpStr(Array[String]) // alternating: lit, expr, lit, expr, ..., lit

  // Wildcard
  Blank

  // Special
  Shebang(String) // #!...
  Comment(String)
  BlockComment(String)
  Eof
} derive(Debug, Eq)

///|
pub impl Show for TokenKind with output(self, logger) {
  logger.write_string(Show::to_string(self))
}

///|
pub(all) struct Token {
  kind : TokenKind
  line : Int
  col : Int
} derive(Debug)

///|
pub impl Show for Token with output(self, logger) {
  logger.write_string(Show::to_string(self))
}
