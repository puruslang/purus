///|
/// Parser for the purus language.
/// Converts a token stream into an AST.
pub(all) struct Parser {
  tokens : Array[@lexer.Token]
  mut pos : Int
  errors : Array[String]
}

///|
pub fn Parser::new(tokens : Array[@lexer.Token]) -> Parser {
  { tokens, pos: 0, errors: [] }
}

///|
fn Parser::peek(self : Parser) -> @lexer.TokenKind {
  if self.pos >= self.tokens.length() {
    Eof
  } else {
    self.tokens[self.pos].kind
  }
}

///|
fn Parser::advance(self : Parser) -> @lexer.TokenKind {
  let tok = self.peek()
  self.pos += 1
  tok
}

///|
fn Parser::expect(self : Parser, expected : @lexer.TokenKind) -> Unit {
  let got = self.advance()
  // We just skip if it doesn't match for now (permissive parsing)
  let _ = got
  let _ = expected
}

///|
fn Parser::skip_newlines_and_indent(self : Parser) -> Int {
  let mut indent = 0
  while self.pos < self.tokens.length() {
    match self.peek() {
      Newline | Comment(_) | BlockComment(_) => self.pos += 1
      Indent(n) => {
        indent = n
        self.pos += 1
      }
      _ => break
    }
  }
  indent
}

///|
/// Skip whitespace (newlines, indentation, comments) inside brackets.
fn Parser::skip_bracket_ws(self : Parser) -> Unit {
  while self.pos < self.tokens.length() {
    match self.peek() {
      Newline | Indent(_) | Comment(_) | BlockComment(_) => self.pos += 1
      _ => break
    }
  }
}

///|
/// Parse the entire program
pub fn Parser::parse(self : Parser) -> Array[Stmt] {
  let stmts : Array[Stmt] = []
  self.skip_newlines_and_indent() |> ignore
  while self.pos < self.tokens.length() && self.peek() != Eof {
    match self.parse_stmt() {
      Some(s) => stmts.push(s)
      None =>
        // Skip token if we can't parse
        self.pos += 1
    }
    self.skip_newlines_and_indent() |> ignore
  }
  stmts
}

///|
fn Parser::parse_block(self : Parser, min_indent : Int) -> Array[Stmt] {
  let stmts : Array[Stmt] = []
  // Parse the first statement (indent was already consumed by caller)
  match self.parse_stmt() {
    Some(s) => stmts.push(s)
    None => ()
  }
  // Parse subsequent statements at the same or greater indent level
  while self.pos < self.tokens.length() && self.peek() != Eof {
    let saved = self.pos
    let indent = self.skip_newlines_and_indent()
    if indent < min_indent {
      // Dedent - end of block
      self.pos = saved
      break
    }
    match self.parse_stmt() {
      Some(s) => stmts.push(s)
      None => self.pos += 1
    }
  }
  stmts
}

///|
fn Parser::parse_stmt(self : Parser) -> Stmt? {
  // Skip comments
  match self.peek() {
    Comment(_) | BlockComment(_) => {
      self.pos += 1
      return None
    }
    Indent(_) => self.pos += 1
    _ => ()
  }
  match self.peek() {
    Const_ => Some(self.parse_var_decl(DeclKind::Const_))
    Let_ => Some(self.parse_var_decl(DeclKind::Let_))
    Var_ => Some(self.parse_var_decl(DeclKind::Var_))
    Fn => self.parse_fn_decl(false)
    Async_ => {
      self.pos += 1
      if self.peek() == Fn {
        self.parse_fn_decl(true)
      } else {
        Some(ExprStmt(self.parse_expr()))
      }
    }
    If_ => Some(self.parse_if_stmt())
    Unless => Some(self.parse_unless_stmt())
    While_ => Some(self.parse_while_stmt())
    Until => Some(self.parse_until_stmt())
    Do_ => Some(self.parse_do_while_stmt())
    For_ => Some(self.parse_for_stmt())
    Match_ | Switch_ => Some(self.parse_match_stmt())
    Return_ => {
      self.pos += 1
      match self.peek() {
        Newline | Eof | Indent(_) => Some(Return(None))
        _ => Some(Return(Some(self.parse_expr())))
      }
    }
    Break_ => {
      self.pos += 1
      Some(Break)
    }
    Continue_ => {
      self.pos += 1
      Some(Continue)
    }
    Try_ => Some(self.parse_try_stmt())
    Throw_ => {
      self.pos += 1
      let expr = self.parse_expr()
      Some(self.maybe_postfix(Throw(expr)))
    }
    Import_ => Some(self.parse_import_stmt())
    Use_ => Some(self.parse_use_stmt())
    From_ => Some(self.parse_from_use_stmt())
    Mod_ => Some(self.parse_mod_stmt())
    Export_ => Some(self.parse_export_stmt())
    Public_ => {
      self.pos += 1
      match self.parse_stmt() {
        Some(s) => Some(PublicDecl(s))
        None => None
      }
    }
    Delete_ => {
      self.pos += 1
      Some(DeleteStmt(self.parse_expr()))
    }
    Type_ => Some(self.parse_type_decl())
    Class_ => Some(self.parse_class_decl())
    _ => {
      let expr = self.parse_expr()
      // Check for compound assignment: EXPR add be EXPR, etc.
      match self.peek() {
        Add
        | Sub
        | Mul
        | Div
        | Mod
        | Pow
        | Fdiv
        | Band
        | Bor
        | Bxor
        | Shl
        | Shr
        | Ushr
        | And
        | Or
        | Coal => {
          let op = match self.peek() {
            Add => BinOp::Add
            Sub => BinOp::Sub
            Mul => BinOp::Mul
            Div => BinOp::Div
            Mod => BinOp::Mod
            Pow => BinOp::Pow
            Fdiv => BinOp::Fdiv
            Band => BinOp::Band
            Bor => BinOp::Bor
            Bxor => BinOp::Bxor
            Shl => BinOp::Shl
            Shr => BinOp::Shr
            Ushr => BinOp::Ushr
            And => BinOp::And
            Or => BinOp::Or
            _ => BinOp::Coal // Coal
          }
          self.pos += 1
          self.expect(Be)
          let value = self.parse_expr()
          Some(self.maybe_postfix(CompoundAssign(op, expr, value)))
        }
        Be => {
          self.pos += 1
          let value = self.parse_expr()
          // Bare identifier assignment (x be val) is not supported.
          // Use const/let/var for declarations. Property and index access assignments remain valid.
          match expr {
            Ident(name) => {
              self.errors.push(
                "bare identifier assignment ('" +
                name +
                " be ...') is not supported. Declare with 'const " +
                name +
                " be ...' or 'let " +
                name +
                " be ...', or use compound assignment such as '" +
                name +
                " add be 1'",
              )
              Some(ExprStmt(expr))
            }
            _ => Some(self.maybe_postfix(Assign(expr, value)))
          }
        }
        _ => Some(self.maybe_postfix(ExprStmt(expr)))
      }
    }
  }
}

///|
fn Parser::maybe_postfix(self : Parser, stmt : Stmt) -> Stmt {
  match self.peek() {
    If_ => {
      self.pos += 1
      let cond = self.parse_expr()
      PostfixIf(stmt, cond)
    }
    Unless => {
      self.pos += 1
      let cond = self.parse_expr()
      PostfixUnless(stmt, cond)
    }
    For_ => {
      self.pos += 1
      // postfix for: STMT for NAME in EXPR
      let name = self.parse_ident_name()
      self.expect(In_)
      let iter = self.parse_expr()
      PostfixFor(stmt, name, iter)
    }
    _ => stmt
  }
}

///|
fn Parser::parse_ident_name(self : Parser) -> String {
  match self.advance() {
    Ident(s) => s
    // Allow keywords as property names (e.g. obj.from, obj.default, obj.delete)
    From_ => "from"
    Default_ => "default"
    Delete_ => "delete"
    Get_ => "get"
    Set_ => "set"
    New_ => "new"
    In_ => "in"
    Of => "of"
    As => "as"
    Type_ => "type"
    All_ => "all"
    List_ => "list"
    Object_ => "object"
    Return_ => "return"
    Export_ => "export"
    Import_ => "import"
    Static_ => "static"
    Private_ => "private"
    Public_ => "public"
    Class_ => "class"
    Super_ => "super"
    Extends_ => "extends"
    This_ => "this"
    _ => "unknown"
  }
}

///|
/// Map a keyword token back to its source text. Returns None for
/// non-keyword tokens (identifiers, literals, punctuation).
fn keyword_text(tok : @lexer.TokenKind) -> String? {
  match tok {
    Const_ => Some("const")
    Let_ => Some("let")
    Var_ => Some("var")
    Be => Some("be")
    Add => Some("add")
    Sub => Some("sub")
    Mul => Some("mul")
    Div => Some("div")
    Fdiv => Some("fdiv")
    Mod => Some("mod")
    Neg => Some("neg")
    Pow => Some("pow")
    Eq => Some("eq")
    Neq => Some("neq")
    Lt => Some("lt")
    Gt => Some("gt")
    Le => Some("le")
    Ge => Some("ge")
    And => Some("and")
    Or => Some("or")
    Not => Some("not")
    Coal => Some("coal")
    Band => Some("band")
    Bor => Some("bor")
    Bxor => Some("bxor")
    Bnot => Some("bnot")
    Shl => Some("shl")
    Shr => Some("shr")
    Ushr => Some("ushr")
    Fn => Some("fn")
    Return_ => Some("return")
    To => Some("to")
    If_ => Some("if")
    Elif => Some("elif")
    Else_ => Some("else")
    Unless => Some("unless")
    Then_ => Some("then")
    While_ => Some("while")
    Until => Some("until")
    Do_ => Some("do")
    Yield_ => Some("yield")
    For_ => Some("for")
    In_ => Some("in")
    Range_ => Some("range")
    Break_ => Some("break")
    Continue_ => Some("continue")
    Match_ => Some("match")
    When_ => Some("when")
    Switch_ => Some("switch")
    Case_ => Some("case")
    Pipe_ => Some("pipe")
    As => Some("as")
    Of => Some("of")
    Gives => Some("gives")
    Typeof_ => Some("typeof")
    Void_ => Some("void")
    Instanceof_ => Some("instanceof")
    New_ => Some("new")
    Delete_ => Some("delete")
    This_ => Some("this")
    Async_ => Some("async")
    Await_ => Some("await")
    Try_ => Some("try")
    Catch_ => Some("catch")
    Finally_ => Some("finally")
    Throw_ => Some("throw")
    Import_ => Some("import")
    From_ => Some("from")
    Export_ => Some("export")
    Default_ => Some("default")
    Require_ => Some("require")
    Use_ => Some("use")
    Mod_ => Some("namespace")
    Public_ => Some("public")
    All_ => Some("all")
    Type_ => Some("type")
    With_ => Some("with")
    True_ => Some("true")
    False_ => Some("false")
    Null_ => Some("null")
    Nil_ => Some("nil")
    Undefined_ => Some("undefined")
    Nan_ => Some("nan")
    Infinity_ => Some("infinity")
    List_ => Some("list")
    Object_ => Some("object")
    Class_ => Some("class")
    Extends_ => Some("extends")
    Super_ => Some("super")
    Static_ => Some("static")
    Private_ => Some("private")
    Get_ => Some("get")
    Set_ => Some("set")
    Blank => Some("blank")
    _ => None
  }
}

///|
/// Parse a name in property position (after `.` or `\.`).
/// Any keyword is a valid property name there, matching JavaScript,
/// which allows reserved words after `.` (e.g. `promise.then`,
/// `promise.catch`, `promise.finally`).
fn Parser::parse_property_name(self : Parser) -> String {
  match keyword_text(self.peek()) {
    Some(name) => {
      self.pos += 1
      name
    }
    None => self.parse_ident_name()
  }
}

///|
fn Parser::parse_var_decl(self : Parser, kind : DeclKind) -> Stmt {
  self.pos += 1 // skip const/let/var
  // Check for object destructuring: const/let/var object[a; b] be expr
  if self.peek() == Object_ {
    self.pos += 1 // skip 'object'
    if self.peek() == LBracket {
      self.pos += 1 // skip [
      self.skip_bracket_ws()
      let names : Array[String] = []
      while self.pos < self.tokens.length() && self.peek() != RBracket {
        let name = self.parse_ident_name()
        names.push(name)
        self.skip_bracket_ws()
        if self.peek() == Semicolon || self.peek() == Comma {
          self.pos += 1
          self.skip_bracket_ws()
        }
      }
      if self.peek() == RBracket {
        self.pos += 1
      }
      self.expect(Be)
      let value = self.parse_expr()
      return self.maybe_postfix(ObjDestructDecl(kind, names, value))
    }
    // Not followed by [, treat 'object' as variable name
    let name = "object"
    if self.peek() == Of {
      self.pos += 1
      self.skip_type_annotation()
    }
    self.expect(Be)
    let value = self.parse_expr()
    return self.maybe_postfix(VarDecl(kind, name, value))
  }
  // Check for destructuring: const/let/var [a; b] be expr
  if self.peek() == LBracket {
    self.pos += 1 // skip [
    self.skip_bracket_ws()
    let names : Array[String] = []
    while self.pos < self.tokens.length() && self.peek() != RBracket {
      let name = self.parse_ident_name()
      names.push(name)
      self.skip_bracket_ws()
      if self.peek() == Semicolon || self.peek() == Comma {
        self.pos += 1
        self.skip_bracket_ws()
      }
    }
    if self.peek() == RBracket {
      self.pos += 1
    }
    self.expect(Be)
    let value = self.parse_expr()
    return self.maybe_postfix(DestructDecl(kind, names, value))
  }
  let name = self.parse_ident_name()
  // Handle dotted declaration: const x.y be val → auto-declare x if needed, then x.y = val
  if self.peek() == Dot {
    self.pos += 1 // skip .
    let prop = self.parse_ident_name()
    if self.peek() == Of {
      self.pos += 1
      self.skip_type_annotation()
    }
    self.expect(Be)
    let value = self.parse_expr()
    return self.maybe_postfix(DottedVarInit(kind, name, prop, value))
  }
  // Optional type annotation: of TYPE
  if self.peek() == Of {
    // Skip type annotation for now
    self.pos += 1
    self.skip_type_annotation()
  }
  self.expect(Be)
  let value = self.parse_expr()
  self.maybe_postfix(VarDecl(kind, name, value))
}

///|
fn Parser::skip_type_annotation(self : Parser) -> Unit {
  // Skip type tokens until we hit 'be' or newline
  while self.pos < self.tokens.length() {
    match self.peek() {
      Be | Newline | Eof => break
      _ => self.pos += 1
    }
  }
}

///|
fn Parser::parse_fn_decl(self : Parser, is_async : Bool) -> Stmt? {
  self.pos += 1 // skip fn
  // Check if next token is a name or parameter
  let name : String? = match self.peek() {
    Ident(s) => {
      self.pos += 1
      Some(s)
    }
    _ => None
  }
  let params = self.parse_param_list()
  // Check for 'gives' return type annotation  
  if self.peek() == Gives {
    self.pos += 1
    self.skip_type_annotation()
  }
  let body : FnBody = self.parse_to_body()
  let decl : FnDecl = { name, params, body, is_async, is_generator: false }
  Some(FnDecl(decl))
}

///|
fn Parser::parse_param_list(self : Parser) -> Array[String] {
  let params : Array[String] = []
  while self.pos < self.tokens.length() {
    match self.peek() {
      Blank => {
        self.pos += 1
        params.push("blank")
        if self.peek() == Semicolon {
          self.pos += 1
        } else {
          break
        }
      }
      Ident(s) => {
        self.pos += 1
        params.push(s)
        // Optional type annotation: of TYPE
        if self.peek() == Of {
          self.pos += 1
          // Skip type name
          while self.pos < self.tokens.length() {
            match self.peek() {
              Semicolon | Newline | Eof | To | Gives | Ident(_) => break
              _ => self.pos += 1
            }
          }
        }
        // ; separates params
        if self.peek() == Semicolon {
          self.pos += 1
        } else {
          break
        }
      }
      _ => break
    }
  }
  params
}

///|
fn Parser::parse_if_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip if
  let cond = self.parse_expr()
  // Check for inline then
  if self.peek() == Then_ {
    self.pos += 1
    let then_expr = self.parse_expr()
    self.expect(Else_)
    let else_expr = self.parse_expr()
    return ExprStmt(IfExpr(cond, then_expr, else_expr))
  }
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let body = self.parse_block(indent)
  // Check for elif / else
  let elifs : Array[ElIfBranch] = []
  let mut else_body : Array[Stmt]? = None
  // Continue looking for elif/else at the parent indent level
  let mut keep_going = true
  while keep_going {
    let saved2 = self.pos
    let _ = self.skip_newlines_and_indent()
    match self.peek() {
      Elif => {
        self.pos += 1
        let elif_cond = self.parse_expr()
        let elif_indent = self.skip_newlines_and_indent()
        let elif_body = self.parse_block(elif_indent)
        elifs.push({ cond: elif_cond, body: elif_body })
      }
      Else_ => {
        self.pos += 1
        // Check for "else if"
        if self.peek() == If_ {
          self.pos += 1
          let elif_cond = self.parse_expr()
          let elif_indent = self.skip_newlines_and_indent()
          let elif_body = self.parse_block(elif_indent)
          elifs.push({ cond: elif_cond, body: elif_body })
        } else {
          let else_indent = self.skip_newlines_and_indent()
          else_body = Some(self.parse_block(else_indent))
          keep_going = false
        }
      }
      _ => {
        self.pos = saved2
        keep_going = false
      }
    }
  }
  let else_result : Array[Stmt]? = else_body
  If(cond, body, elifs, else_result)
}

///|
fn Parser::parse_unless_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip unless
  let cond = self.parse_expr()
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let body = self.parse_block(indent)
  Unless(cond, body)
}

///|
fn Parser::parse_while_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip while
  let cond = self.parse_expr()
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let body = self.parse_block(indent)
  While(cond, body)
}

///|
fn Parser::parse_until_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip until
  let cond = self.parse_expr()
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let body = self.parse_block(indent)
  Until(cond, body)
}

///|
fn Parser::parse_do_while_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip do
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let body = self.parse_block(indent)
  // After body, skip whitespace and expect `while`
  self.skip_newlines_and_indent() |> ignore
  self.expect(While_)
  let cond = self.parse_expr()
  DoWhile(cond, body)
}

///|
fn Parser::parse_for_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip for
  // Check for JS-style for: for let/const/var i be 0; cond; update
  match self.peek() {
    Const_ | Let_ | Var_ => return self.parse_for_classic()
    _ => ()
  }
  let first = self.parse_ident_name()
  // Check for index; element pattern
  if self.peek() == Semicolon {
    self.pos += 1
    let second = self.parse_ident_name()
    self.expect(In_)
    let iter = self.parse_expr()
    if self.peek() == Eof || self.peek() == Newline {
      // Parse block
      let saved = self.pos
      let indent = self.skip_newlines_and_indent()
      let _ = saved
      let body = self.parse_block(indent)
      return ForIn(second, Some(first), iter, body)
    }
    let saved = self.pos
    let indent = self.skip_newlines_and_indent()
    let _ = saved
    let body = self.parse_block(indent)
    return ForIn(second, Some(first), iter, body)
  }
  self.expect(In_)
  // Check for range
  if self.peek() == Range_ {
    self.pos += 1
    let start = self.parse_primary()
    self.expect(Semicolon)
    let end = self.parse_primary()
    let saved = self.pos
    let indent = self.skip_newlines_and_indent()
    let _ = saved
    let body = self.parse_block(indent)
    return ForRange(first, start, end, body)
  }
  let iter = self.parse_expr()
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let body = self.parse_block(indent)
  ForIn(first, None, iter, body)
}

///|
fn Parser::parse_for_classic(self : Parser) -> Stmt {
  // Parse init: let/const/var name be expr
  let init = match self.peek() {
    Const_ => self.parse_var_decl(DeclKind::Const_)
    Let_ => self.parse_var_decl(DeclKind::Let_)
    _ => self.parse_var_decl(DeclKind::Var_)
  }
  self.expect(Semicolon)
  // Parse condition
  let cond = self.parse_expr()
  self.expect(Semicolon)
  // Parse update: expr (add be / sub be / be / etc.)
  let update_expr = self.parse_expr()
  let update : Stmt = match self.peek() {
    Add
    | Sub
    | Mul
    | Div
    | Mod
    | Pow
    | Fdiv
    | Band
    | Bor
    | Bxor
    | Shl
    | Shr
    | Ushr => {
      let op = match self.peek() {
        Add => BinOp::Add
        Sub => BinOp::Sub
        Mul => BinOp::Mul
        Div => BinOp::Div
        Mod => BinOp::Mod
        Pow => BinOp::Pow
        Fdiv => BinOp::Fdiv
        Band => BinOp::Band
        Bor => BinOp::Bor
        Bxor => BinOp::Bxor
        Shl => BinOp::Shl
        Shr => BinOp::Shr
        _ => BinOp::Ushr
      }
      self.pos += 1
      self.expect(Be)
      let value = self.parse_expr()
      CompoundAssign(op, update_expr, value)
    }
    Be => {
      self.pos += 1
      let value = self.parse_expr()
      Assign(update_expr, value)
    }
    _ => ExprStmt(update_expr)
  }
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let body = self.parse_block(indent)
  ForClassic(init, cond, update, body)
}

///|
fn Parser::parse_match_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip match
  let subject = self.parse_expr()
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let arms = self.parse_match_arms(indent)
  MatchStmt(subject, arms)
}

///|
fn Parser::parse_match_arms(self : Parser, min_indent : Int) -> Array[MatchArm] {
  let arms : Array[MatchArm] = []
  // Parse the first arm (indent already consumed by caller)
  self.parse_one_match_arm(arms) |> ignore
  // Parse subsequent arms at the same indent level
  while self.pos < self.tokens.length() {
    let saved = self.pos
    let indent = self.skip_newlines_and_indent()
    if indent < min_indent {
      self.pos = saved
      break
    }
    if !self.parse_one_match_arm(arms) {
      self.pos = saved
      break
    }
  }
  arms
}

///|
/// Try to parse a single match arm (when/else). Returns true if successful.
fn Parser::parse_one_match_arm(self : Parser, arms : Array[MatchArm]) -> Bool {
  match self.peek() {
    When_ | Case_ => {
      self.pos += 1
      let pattern = self.parse_match_pattern()
      let cond_val : Expr? = if self.peek() == If_ {
        self.pos += 1
        Some(self.parse_expr())
      } else {
        None
      }
      let body : MatchBody = if self.peek() == Then_ {
        self.pos += 1
        ExprBody(self.parse_expr())
      } else {
        let bi = self.skip_newlines_and_indent()
        BlockBody(self.parse_block(bi))
      }
      arms.push({ pattern, cond: cond_val, body })
      true
    }
    Else_ | Default_ => {
      self.pos += 1
      let body : MatchBody = if self.peek() == Then_ || self.peek() != Newline {
        ExprBody(self.parse_expr())
      } else {
        let bi = self.skip_newlines_and_indent()
        BlockBody(self.parse_block(bi))
      }
      arms.push({ pattern: BindPat("_"), cond: None, body })
      true
    }
    _ => false
  }
}

///|
fn Parser::parse_match_pattern(self : Parser) -> MatchPattern {
  match self.peek() {
    Int(n) => {
      self.pos += 1
      LitPat(IntLit(n))
    }
    Float(n) => {
      self.pos += 1
      LitPat(FloatLit(n))
    }
    Str(s) => {
      self.pos += 1
      LitPat(StrLit(s))
    }
    True_ => {
      self.pos += 1
      LitPat(BoolLit(true))
    }
    False_ => {
      self.pos += 1
      LitPat(BoolLit(false))
    }
    Null_ | Nil_ => {
      self.pos += 1
      LitPat(NullLit)
    }
    Blank => {
      self.pos += 1
      BindPat("blank")
    }
    Ident(s) => {
      self.pos += 1
      BindPat(s)
    }
    _ => {
      self.pos += 1
      BindPat("_")
    }
  }
}

///|
fn Parser::parse_try_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip try
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let try_body = self.parse_block(indent)
  // Look for catch
  let saved2 = self.pos
  let _ = self.skip_newlines_and_indent()
  let mut catch_name : String? = None
  let mut catch_body : Array[Stmt] = []
  let mut finally_body : Array[Stmt]? = None
  if self.peek() == Catch_ {
    self.pos += 1
    catch_name = match self.peek() {
      Ident(s) => {
        self.pos += 1
        Some(s)
      }
      _ => None
    }
    let s3 = self.pos
    let ci = self.skip_newlines_and_indent()
    let _ = s3
    catch_body = self.parse_block(ci)
  } else {
    self.pos = saved2
  }
  // Look for finally
  let saved3 = self.pos
  let _ = self.skip_newlines_and_indent()
  if self.peek() == Finally_ {
    self.pos += 1
    let s4 = self.pos
    let fi = self.skip_newlines_and_indent()
    let _ = s4
    finally_body = Some(self.parse_block(fi))
  } else {
    self.pos = saved3
  }
  TryCatch(try_body, catch_name, catch_body, finally_body)
}

///|
fn Parser::parse_import_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip import
  // Side-effect import: import ///module///
  match self.peek() {
    Str(s) => {
      self.pos += 1
      let attrs = self.parse_import_attributes()
      return ImportDecl(SideEffectImport(s, attrs))
    }
    _ => ()
  }
  // import X from ///...///
  // import [X, Y] from ///...///
  // import X, [Y, Z] from ///...///
  // import all as X from ///...///
  if self.peek() == All_ {
    self.pos += 1
    self.expect(As)
    let ns = self.parse_ident_name()
    self.expect(From_)
    let module_name = self.parse_string_value()
    let attrs = self.parse_import_attributes()
    return ImportDecl(EsImport(None, None, Some(ns), module_name, attrs))
  }
  if self.peek() == LBracket {
    // named imports
    let named = self.parse_bracket_names()
    self.expect(From_)
    let module_name = self.parse_string_value()
    let attrs = self.parse_import_attributes()
    return ImportDecl(EsImport(None, Some(named), None, module_name, attrs))
  }
  let default_name = self.parse_ident_name()
  if self.peek() == Comma {
    self.pos += 1
    let named = self.parse_bracket_names()
    self.expect(From_)
    let module_name = self.parse_string_value()
    let attrs = self.parse_import_attributes()
    return ImportDecl(
      EsImport(Some(default_name), Some(named), None, module_name, attrs),
    )
  }
  self.expect(From_)
  let module_name = self.parse_string_value()
  let attrs = self.parse_import_attributes()
  ImportDecl(EsImport(Some(default_name), None, None, module_name, attrs))
}

///|
fn Parser::parse_import_attributes(self : Parser) -> Array[(String, Expr)]? {
  if self.peek() != With_ {
    return None
  }
  self.pos += 1 // skip with
  self.expect(LBracket)
  let attrs : Array[(String, Expr)] = []
  self.skip_bracket_ws()
  while self.pos < self.tokens.length() && self.peek() != RBracket {
    let key = match self.advance() {
      Ident(s) => s
      Type_ => "type"
      _ => "unknown"
    }
    self.expect(Be)
    let value = self.parse_expr()
    attrs.push((key, value))
    self.skip_bracket_ws()
    if self.peek() == Comma || self.peek() == Semicolon {
      self.pos += 1
    }
    self.skip_bracket_ws()
  }
  if self.peek() == RBracket {
    self.pos += 1
  }
  Some(attrs)
}

///|
fn Parser::parse_bracket_names(self : Parser) -> Array[String] {
  let names : Array[String] = []
  self.expect(LBracket)
  self.skip_bracket_ws()
  while self.pos < self.tokens.length() && self.peek() != RBracket {
    match self.peek() {
      Ident(s) => {
        self.pos += 1
        names.push(s)
      }
      Comma => self.pos += 1
      _ => self.pos += 1
    }
    self.skip_bracket_ws()
  }
  if self.peek() == RBracket {
    self.pos += 1
  }
  names
}

///|
fn Parser::parse_string_value(self : Parser) -> String {
  match self.advance() {
    Str(s) => s
    _ => ""
  }
}

///|
fn Parser::parse_use_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip use
  let module_name = self.parse_ident_name()
  // `as` is optional: `use p-math` is equivalent to `use p-math as p-math`
  if self.peek() == As {
    self.pos += 1 // skip as
    let binding = self.parse_ident_name()
    UseStdlib(module_name, binding)
  } else {
    UseStdlib(module_name, module_name)
  }
}

///|
fn Parser::parse_from_use_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip from
  // from ///module/// import ...  EES import with reversed syntax
  match self.peek() {
    Str(module_name) => {
      self.pos += 1
      self.expect(Import_)
      // from ///mod/// import all as X
      if self.peek() == All_ {
        self.pos += 1
        self.expect(As)
        let ns = self.parse_ident_name()
        let attrs = self.parse_import_attributes()
        return ImportDecl(EsImport(None, None, Some(ns), module_name, attrs))
      }
      // from ///mod/// import [X, Y]
      if self.peek() == LBracket {
        let named = self.parse_bracket_names()
        let attrs = self.parse_import_attributes()
        return ImportDecl(EsImport(None, Some(named), None, module_name, attrs))
      }
      // from ///mod/// import X, [Y, Z]
      let default_name = self.parse_ident_name()
      if self.peek() == Comma {
        self.pos += 1
        let named = self.parse_bracket_names()
        let attrs = self.parse_import_attributes()
        return ImportDecl(
          EsImport(Some(default_name), Some(named), None, module_name, attrs),
        )
      }
      let attrs = self.parse_import_attributes()
      return ImportDecl(
        EsImport(Some(default_name), None, None, module_name, attrs),
      )
    }
    _ => ()
  }
  // from <ident> is no longer valid for stdlib  Eonly from "mod" import ... is allowed
  let name = self.parse_ident_name()
  // skip remaining tokens: use, names, commas
  while self.peek() != Newline && self.peek() != Eof {
    self.pos += 1
  }
  ExprStmt(
    StrLit(
      "from " + name + " use ... is removed. Use: use " + name + " as <alias>",
    ),
  )
}

///|
fn Parser::parse_mod_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip mod
  let name = self.parse_ident_name()
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let body = self.parse_block(indent)
  ModDecl(name, body)
}

///|
fn Parser::parse_export_stmt(self : Parser) -> Stmt {
  self.pos += 1 // skip export
  if self.peek() == Default_ {
    self.pos += 1
  }
  match self.parse_stmt() {
    Some(s) => ExportDefault(s)
    None => ExportDefault(ExprStmt(UndefinedLit))
  }
}

///|
fn Parser::parse_type_decl(self : Parser) -> Stmt {
  self.pos += 1 // skip type
  let name = self.parse_ident_name()
  self.expect(Be)
  let value = self.parse_expr()
  TypeDecl(name, value)
}

///|
fn Parser::parse_class_decl(self : Parser) -> Stmt {
  self.pos += 1 // skip class
  let name = self.parse_ident_name()
  let parent : String? = if self.peek() == Extends_ {
    self.pos += 1
    Some(self.parse_ident_name())
  } else {
    None
  }
  let saved = self.pos
  let indent = self.skip_newlines_and_indent()
  let _ = saved
  let members : Array[ClassMember] = []
  match self.parse_class_member() {
    Some(m) => members.push(m)
    None => ()
  }
  while self.pos < self.tokens.length() && self.peek() != Eof {
    let saved2 = self.pos
    let next_indent = self.skip_newlines_and_indent()
    if next_indent < indent {
      self.pos = saved2
      break
    }
    match self.parse_class_member() {
      Some(m) => members.push(m)
      None => self.pos += 1
    }
  }
  ClassDecl({ name, parent, members })
}

///|
fn Parser::parse_to_body(self : Parser) -> FnBody {
  if self.peek() == To {
    self.pos += 1
    if self.peek() == Return_ {
      self.pos += 1
      ToReturnExpr(self.parse_expr())
    } else {
      ToExpr(self.parse_expr())
    }
  } else {
    let saved = self.pos
    let indent = self.skip_newlines_and_indent()
    let _ = saved
    Block(self.parse_block(indent))
  }
}

///|
fn Parser::parse_class_member(self : Parser) -> ClassMember? {
  match self.peek() {
    Private_ => {
      self.pos += 1
      let field_name = self.parse_ident_name()
      let default_val : Expr? = if self.peek() == Be {
        self.pos += 1
        Some(self.parse_expr())
      } else {
        None
      }
      Some(Field(true, field_name, default_val))
    }
    Static_ => {
      self.pos += 1
      if self.peek() == Fn {
        self.pos += 1
        let meth_name = self.parse_ident_name()
        let params = self.parse_param_list()
        if self.peek() == Gives {
          self.pos += 1
          self.skip_type_annotation()
        }
        let body = self.parse_to_body()
        Some(Method(true, false, meth_name, params, body))
      } else if self.peek() == Async_ {
        self.pos += 1
        if self.peek() == Fn {
          self.pos += 1
          let meth_name = self.parse_ident_name()
          let params = self.parse_param_list()
          if self.peek() == Gives {
            self.pos += 1
            self.skip_type_annotation()
          }
          let body = self.parse_to_body()
          Some(Method(true, true, meth_name, params, body))
        } else {
          None
        }
      } else {
        None
      }
    }
    Get_ => {
      self.pos += 1
      if self.peek() == Fn {
        self.pos += 1
        let getter_name = self.parse_ident_name()
        let body = self.parse_to_body()
        Some(Getter(getter_name, body))
      } else {
        None
      }
    }
    Set_ => {
      self.pos += 1
      if self.peek() == Fn {
        self.pos += 1
        let setter_name = self.parse_ident_name()
        let param = self.parse_ident_name()
        let body = self.parse_to_body()
        Some(Setter(setter_name, param, body))
      } else {
        None
      }
    }
    Fn => {
      self.pos += 1
      // Check for constructor: fn new
      if self.peek() == New_ {
        self.pos += 1
        let params = self.parse_param_list()
        let body = self.parse_to_body()
        Some(Constructor(params, body))
      } else {
        let meth_name = self.parse_ident_name()
        let params = self.parse_param_list()
        if self.peek() == Gives {
          self.pos += 1
          self.skip_type_annotation()
        }
        let body = self.parse_to_body()
        Some(Method(false, false, meth_name, params, body))
      }
    }
    Async_ => {
      self.pos += 1
      if self.peek() == Fn {
        self.pos += 1
        let meth_name = self.parse_ident_name()
        let params = self.parse_param_list()
        if self.peek() == Gives {
          self.pos += 1
          self.skip_type_annotation()
        }
        let body = self.parse_to_body()
        Some(Method(false, true, meth_name, params, body))
      } else {
        None
      }
    }
    _ => None
  }
}
