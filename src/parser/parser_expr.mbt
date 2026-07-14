///|
/// Expression parsing for purus parser.
/// Operator precedence (low to high):
///   pipe
///   or
///   bor
///   bxor
///   band
///   eq/neq/is/instanceof
///   lt/gt/le/ge
///   add/sub
///   shl/shr/ushr
///   mul/div/mod
///   pow
///   unary (not/neg/bnot/typeof/await/delete/new)
///   postfix (dot access, index access, method call, function call)
///   primary

///|
fn Parser::parse_expr(self : Parser) -> Expr {
  self.parse_pipe()
}

///|
fn Parser::parse_pipe(self : Parser) -> Expr {
  let mut left = self.parse_coal()
  while self.peek() == Pipe_ {
    self.pos += 1
    let right = self.parse_coal()
    left = Pipe(left, right)
  }
  left
}

///|
fn Parser::parse_coal(self : Parser) -> Expr {
  let mut left = self.parse_or()
  while self.peek() == Coal {
    // Lookahead: if Coal followed by Be, it's compound assignment (coal be)
    if self.pos + 1 < self.tokens.length() &&
      self.tokens[self.pos + 1].kind == Be {
      break
    }
    self.pos += 1
    let right = self.parse_or()
    left = BinOp(Coal, left, right)
  }
  left
}

///|
fn Parser::parse_or(self : Parser) -> Expr {
  let mut left = self.parse_and()
  while self.peek() == Or {
    // Lookahead: if Or followed by Be, it's compound assignment (or be)
    if self.pos + 1 < self.tokens.length() &&
      self.tokens[self.pos + 1].kind == Be {
      break
    }
    self.pos += 1
    let right = self.parse_and()
    left = BinOp(Or, left, right)
  }
  left
}

///|
fn Parser::parse_bor(self : Parser) -> Expr {
  let mut left = self.parse_bxor()
  while self.peek() == Bor {
    // Lookahead: if Bor followed by Be, it's compound assignment (bor be)
    if self.pos + 1 < self.tokens.length() &&
      self.tokens[self.pos + 1].kind == Be {
      break
    }
    self.pos += 1
    let right = self.parse_bxor()
    left = BinOp(Bor, left, right)
  }
  left
}

///|
fn Parser::parse_bxor(self : Parser) -> Expr {
  let mut left = self.parse_band()
  while self.peek() == Bxor {
    // Lookahead: if Bxor followed by Be, it's compound assignment (bxor be)
    if self.pos + 1 < self.tokens.length() &&
      self.tokens[self.pos + 1].kind == Be {
      break
    }
    self.pos += 1
    let right = self.parse_band()
    left = BinOp(Bxor, left, right)
  }
  left
}

///|
fn Parser::parse_band(self : Parser) -> Expr {
  let mut left = self.parse_equality()
  while self.peek() == Band {
    // Lookahead: if Band followed by Be, it's compound assignment (band be)
    if self.pos + 1 < self.tokens.length() &&
      self.tokens[self.pos + 1].kind == Be {
      break
    }
    self.pos += 1
    let right = self.parse_equality()
    left = BinOp(Band, left, right)
  }
  left
}

///|
fn Parser::parse_and(self : Parser) -> Expr {
  let mut left = self.parse_bor()
  while self.peek() == And {
    // Lookahead: if And followed by Be, it's compound assignment (and be)
    if self.pos + 1 < self.tokens.length() &&
      self.tokens[self.pos + 1].kind == Be {
      break
    }
    self.pos += 1
    let right = self.parse_bor()
    left = BinOp(And, left, right)
  }
  left
}

///|
fn Parser::parse_equality(self : Parser) -> Expr {
  let mut left = self.parse_comparison()
  while self.pos < self.tokens.length() {
    match self.peek() {
      Eq => {
        self.pos += 1
        let right = self.parse_comparison()
        left = BinOp(Eq, left, right)
      }
      Neq => {
        self.pos += 1
        let right = self.parse_comparison()
        left = BinOp(Neq, left, right)
      }
      Not =>
        // "not eq" ↁENeq
        if self.pos + 1 < self.tokens.length() {
          match self.tokens[self.pos + 1].kind {
            Eq => {
              self.pos += 2
              let right = self.parse_comparison()
              left = BinOp(Neq, left, right)
            }
            _ => break
          }
        } else {
          break
        }
      Instanceof_ => {
        self.pos += 1
        let right = self.parse_comparison()
        left = Instanceof(left, right)
      }
      _ => break
    }
  }
  left
}

///|
fn Parser::parse_comparison(self : Parser) -> Expr {
  let mut left = self.parse_shift()
  while self.pos < self.tokens.length() {
    match self.peek() {
      Lt => {
        // Check for "lt eq" ↁELe
        if self.pos + 1 < self.tokens.length() {
          match self.tokens[self.pos + 1].kind {
            Eq => {
              self.pos += 2
              let right = self.parse_shift()
              left = BinOp(Le, left, right)
              continue
            }
            _ => ()
          }
        }
        self.pos += 1
        let right = self.parse_shift()
        left = BinOp(Lt, left, right)
      }
      Gt => {
        // Check for "gt eq" ↁEGe
        if self.pos + 1 < self.tokens.length() {
          match self.tokens[self.pos + 1].kind {
            Eq => {
              self.pos += 2
              let right = self.parse_shift()
              left = BinOp(Ge, left, right)
              continue
            }
            _ => ()
          }
        }
        self.pos += 1
        let right = self.parse_shift()
        left = BinOp(Gt, left, right)
      }
      Le => {
        self.pos += 1
        let right = self.parse_shift()
        left = BinOp(Le, left, right)
      }
      Ge => {
        self.pos += 1
        let right = self.parse_shift()
        left = BinOp(Ge, left, right)
      }
      _ => break
    }
  }
  left
}

///|
fn Parser::parse_addition(self : Parser) -> Expr {
  let mut left = self.parse_multiplication()
  while self.pos < self.tokens.length() {
    match self.peek() {
      Add | Sub => {
        // Lookahead: if op followed by Be, it's compound assignment (add be / sub be)
        if self.pos + 1 < self.tokens.length() &&
          self.tokens[self.pos + 1].kind == Be {
          break
        }
        let op : BinOp = if self.peek() == Add { Add } else { Sub }
        self.pos += 1
        let right = self.parse_multiplication()
        left = BinOp(op, left, right)
      }
      _ => break
    }
  }
  left
}

///|
fn Parser::parse_shift(self : Parser) -> Expr {
  let mut left = self.parse_addition()
  while self.pos < self.tokens.length() {
    match self.peek() {
      Shl | Shr | Ushr => {
        // Lookahead: if shift op followed by Be, it's compound assignment
        if self.pos + 1 < self.tokens.length() &&
          self.tokens[self.pos + 1].kind == Be {
          break
        }
        let op : BinOp = match self.peek() {
          Shl => Shl
          Shr => Shr
          _ => Ushr
        }
        self.pos += 1
        let right = self.parse_addition()
        left = BinOp(op, left, right)
      }
      _ => break
    }
  }
  left
}

///|
fn Parser::parse_multiplication(self : Parser) -> Expr {
  let mut left = self.parse_power()
  while self.pos < self.tokens.length() {
    match self.peek() {
      Mul | Div | Mod | Fdiv => {
        // Lookahead: if op followed by Be, it's compound assignment
        if self.pos + 1 < self.tokens.length() &&
          self.tokens[self.pos + 1].kind == Be {
          break
        }
        let op : BinOp = match self.peek() {
          Mul => Mul
          Div => Div
          Fdiv => Fdiv
          _ => Mod
        }
        self.pos += 1
        let right = self.parse_power()
        left = BinOp(op, left, right)
      }
      _ => break
    }
  }
  left
}

///|
fn Parser::parse_power(self : Parser) -> Expr {
  let left = self.parse_unary()
  // pow is right-associative
  if self.pos < self.tokens.length() && self.peek() == Pow {
    // Lookahead: if pow followed by Be, it's compound assignment (pow be)
    if self.pos + 1 < self.tokens.length() &&
      self.tokens[self.pos + 1].kind == Be {
      return left
    }
    self.pos += 1
    let right = self.parse_power()
    return BinOp(Pow, left, right)
  }
  left
}

///|
fn Parser::parse_unary(self : Parser) -> Expr {
  match self.peek() {
    Not => {
      self.pos += 1
      UnaryNot(self.parse_unary())
    }
    Neg => {
      self.pos += 1
      // neg infinity ↁEInfinityLit(false) directly
      if self.peek() == Infinity_ {
        self.pos += 1
        InfinityLit(false)
      } else {
        UnaryNeg(self.parse_unary())
      }
    }
    Bnot => {
      self.pos += 1
      UnaryBnot(self.parse_unary())
    }
    Add =>
      // add\ x ↁE++x (prefix increment)
      if self.pos + 1 < self.tokens.length() &&
        self.tokens[self.pos + 1].kind == Backslash {
        self.pos += 2
        PreInc(self.parse_unary())
      } else {
        self.parse_postfix()
      }
    Sub =>
      // sub\ x ↁE--x (prefix decrement)
      if self.pos + 1 < self.tokens.length() &&
        self.tokens[self.pos + 1].kind == Backslash {
        self.pos += 2
        PreDec(self.parse_unary())
      } else {
        self.parse_postfix()
      }
    Typeof_ => {
      self.pos += 1
      UnaryTypeof(self.parse_unary())
    }
    Void_ => {
      self.pos += 1
      UnaryVoid(self.parse_unary())
    }
    Await_ => {
      self.pos += 1
      AwaitExpr(self.parse_unary())
    }
    Yield_ => {
      self.pos += 1
      match self.peek() {
        Newline | Eof | Indent(_) | RBracket => YieldExpr(None)
        _ => YieldExpr(Some(self.parse_unary()))
      }
    }
    New_ => {
      self.pos += 1
      let callee = self.parse_primary()
      // Parse args if present
      if self.peek() == LBracket {
        let args = self.parse_args()
        NewExpr(callee, args)
      } else {
        NewExpr(callee, [])
      }
    }
    _ => self.parse_postfix()
  }
}

///|
fn Parser::parse_postfix(self : Parser) -> Expr {
  let mut expr = self.parse_primary()
  while self.pos < self.tokens.length() {
    match self.peek() {
      Dot => {
        self.pos += 1
        let field = self.parse_property_name()
        if self.peek() == LBracket {
          if self.is_computed_bracket() {
            // Computed access on property: obj.field[\expr]
            self.pos += 1 // skip [
            self.skip_bracket_ws()
            self.pos += 1 // skip \
            self.skip_bracket_ws()
            let start_expr = self.parse_expr()
            match self.peek() {
              DotDot => {
                self.pos += 1
                let end_expr = self.parse_expr()
                if self.peek() == RBracket {
                  self.pos += 1
                }
                expr = Slice(DotAccess(expr, field), start_expr, end_expr, true)
              }
              DotDotDot => {
                self.pos += 1
                let end_expr = self.parse_expr()
                if self.peek() == RBracket {
                  self.pos += 1
                }
                expr = Slice(
                  DotAccess(expr, field),
                  start_expr,
                  end_expr,
                  false,
                )
              }
              _ => {
                if self.peek() == RBracket {
                  self.pos += 1
                }
                expr = ComputedAccess(DotAccess(expr, field), start_expr)
              }
            }
          } else {
            let args = self.parse_args()
            expr = MethodCall(expr, field, args)
          }
        } else {
          expr = DotAccess(expr, field)
        }
      }
      OptDot => {
        self.pos += 1
        let field = self.parse_property_name()
        if self.peek() == LBracket {
          if self.is_computed_bracket() {
            self.pos += 1 // skip [
            self.skip_bracket_ws()
            self.pos += 1 // skip \
            self.skip_bracket_ws()
            let key_expr = self.parse_expr()
            if self.peek() == RBracket {
              self.pos += 1
            }
            expr = ComputedAccess(OptDotAccess(expr, field), key_expr)
          } else {
            let args = self.parse_args()
            expr = OptMethodCall(expr, field, args)
          }
        } else {
          expr = OptDotAccess(expr, field)
        }
      }
      LBracket =>
        if self.is_computed_bracket() {
          // Computed access: expr[\key]
          self.pos += 1 // skip [
          self.skip_bracket_ws()
          self.pos += 1 // skip \
          self.skip_bracket_ws()
          let key_expr = self.parse_expr()
          match self.peek() {
            DotDot => {
              self.pos += 1
              let end_expr = self.parse_expr()
              if self.peek() == RBracket {
                self.pos += 1
              }
              expr = Slice(expr, key_expr, end_expr, true)
            }
            DotDotDot => {
              self.pos += 1
              let end_expr = self.parse_expr()
              if self.peek() == RBracket {
                self.pos += 1
              }
              expr = Slice(expr, key_expr, end_expr, false)
            }
            _ => {
              if self.peek() == RBracket {
                self.pos += 1
              }
              expr = ComputedAccess(expr, key_expr)
            }
          }
        } else {
          // Function call: expr[args]
          let args = self.parse_args()
          expr = Call(expr, args)
        }
      As => {
        self.pos += 1
        let type_name = self.parse_ident_name()
        expr = AsCast(expr, type_name)
      }
      Backslash =>
        // x \add ↁEx++ (postfix increment), x \sub ↁEx-- (postfix decrement)
        if self.pos + 1 < self.tokens.length() {
          match self.tokens[self.pos + 1].kind {
            Add => {
              self.pos += 2
              expr = PostInc(expr)
            }
            Sub => {
              self.pos += 2
              expr = PostDec(expr)
            }
            _ => break
          }
        } else {
          break
        }
      _ => break
    }
  }
  expr
}

///|
fn Parser::is_computed_bracket(self : Parser) -> Bool {
  let mut i = self.pos + 1
  while i < self.tokens.length() {
    match self.tokens[i].kind {
      Newline | Indent(_) | Comment(_) | BlockComment(_) => i += 1
      Backslash => return true
      _ => return false
    }
  }
  false
}

///|
fn Parser::parse_args(self : Parser) -> Array[Expr] {
  let args : Array[Expr] = []
  if self.peek() != LBracket {
    return args
  }
  self.pos += 1 // skip [
  self.skip_bracket_ws()
  while self.pos < self.tokens.length() && self.peek() != RBracket {
    args.push(self.parse_expr())
    self.skip_bracket_ws()
    if self.peek() == Semicolon {
      self.pos += 1
      self.skip_bracket_ws()
    }
    if self.peek() == Comma {
      self.pos += 1
      self.skip_bracket_ws()
    }
  }
  if self.peek() == RBracket {
    self.pos += 1
  }
  args
}

///|
fn Parser::parse_primary(self : Parser) -> Expr {
  match self.peek() {
    Int(n) => {
      self.pos += 1
      IntLit(n)
    }
    BigInt(s) => {
      self.pos += 1
      BigIntLit(s)
    }
    Float(n) => {
      self.pos += 1
      FloatLit(n)
    }
    Str(s) => {
      self.pos += 1
      StrLit(s)
    }
    InterpStr(segments) => {
      self.pos += 1
      let parts : Array[StrPart] = []
      let mut i = 0
      while i < segments.length() {
        if i % 2 == 0 {
          // Literal part
          if segments[i].length() > 0 {
            parts.push(Lit(segments[i]))
          }
        } else {
          // Expression part - lex and parse it
          let expr_tokens = @lexer.Lexer::new(segments[i]).tokenize()
          let sub_parser = Parser::new(expr_tokens)
          sub_parser.skip_newlines_and_indent() |> ignore
          let expr = sub_parser.parse_expr()
          parts.push(Interp(expr))
        }
        i += 1
      }
      StrInterp(parts)
    }
    Regex(pattern, flags) => {
      self.pos += 1
      RegexLit(pattern, flags)
    }
    True_ => {
      self.pos += 1
      BoolLit(true)
    }
    False_ => {
      self.pos += 1
      BoolLit(false)
    }
    Null_ | Nil_ => {
      self.pos += 1
      NullLit
    }
    Undefined_ => {
      self.pos += 1
      UndefinedLit
    }
    Nan_ => {
      self.pos += 1
      NanLit
    }
    Infinity_ => {
      self.pos += 1
      InfinityLit(true)
    }
    This_ => {
      self.pos += 1
      ThisExpr
    }
    Super_ => {
      self.pos += 1
      SuperExpr
    }
    Ident(s) => {
      self.pos += 1
      Ident(s)
    }
    List_ => {
      // list[...]
      self.pos += 1
      self.parse_list_literal()
    }
    Object_ => {
      // object[...]
      self.pos += 1
      self.parse_object_literal()
    }
    LBracket =>
      // Disambiguate: [] empty array, [be] empty object,
      // [k be v, ...] object, [expr, ...] array, [expr] grouping
      self.parse_bracket_expr()
    Fn =>
      // Anonymous function expression
      self.parse_fn_expr()
    If_ => {
      // Ternary: if COND then EXPR else EXPR
      self.pos += 1
      let cond = self.parse_expr()
      self.expect(Then_)
      let then_expr = self.parse_expr()
      self.expect(Else_)
      let else_expr = self.parse_expr()
      IfExpr(cond, then_expr, else_expr)
    }
    Match_ | Switch_ => {
      // Match/switch expression
      self.pos += 1
      let subject = self.parse_expr()
      let saved = self.pos
      let indent = self.skip_newlines_and_indent()
      let _ = saved
      let arms = self.parse_match_arms(indent)
      MatchExpr(subject, arms)
    }
    Try_ => {
      // Try expression
      self.pos += 1
      let saved_tr = self.pos
      let tr_indent = self.skip_newlines_and_indent()
      let _ = saved_tr
      let try_body = self.parse_block(tr_indent)
      let saved_ca = self.pos
      let _ = self.skip_newlines_and_indent()
      let catch_name : String = match self.peek() {
        Catch_ => {
          self.pos += 1
          match self.peek() {
            Ident(s) => {
              self.pos += 1
              s
            }
            _ => "e"
          }
        }
        _ => {
          self.pos = saved_ca
          "e"
        }
      }
      let ca_indent = self.skip_newlines_and_indent()
      let catch_body = self.parse_block(ca_indent)
      TryExpr(try_body, catch_name, catch_body)
    }
    Async_ => {
      self.pos += 1 // skip async
      if self.peek() == Fn {
        self.pos += 1 // skip fn
        let params = self.parse_param_list()
        if self.peek() == Gives {
          self.pos += 1
          self.skip_type_annotation()
        }
        if self.peek() == To {
          self.pos += 1
          if self.peek() == Return_ {
            self.pos += 1
            AsyncFnExprTo(params, self.parse_expr())
          } else {
            AsyncFnExprTo(params, self.parse_expr())
          }
        } else {
          let indent = self.skip_newlines_and_indent()
          AsyncFnExpr(params, self.parse_block(indent))
        }
      } else {
        Ident("async")
      }
    }
    _ => {
      // Unknown token - advance and return undefined
      self.pos += 1
      UndefinedLit
    }
  }
}

///|
fn Parser::parse_list_literal(self : Parser) -> Expr {
  if self.peek() != LBracket {
    return ArrayLit([])
  }
  self.pos += 1 // skip [
  self.skip_bracket_ws()
  let elements : Array[Expr] = []
  while self.pos < self.tokens.length() && self.peek() != RBracket {
    elements.push(self.parse_expr())
    self.skip_bracket_ws()
    if self.peek() == Comma {
      self.pos += 1
      self.skip_bracket_ws()
    }
    if self.peek() == Semicolon {
      self.pos += 1
      self.skip_bracket_ws()
    }
  }
  if self.peek() == RBracket {
    self.pos += 1
  }
  ArrayLit(elements)
}

///|
fn Parser::parse_object_literal(self : Parser) -> Expr {
  if self.peek() != LBracket {
    return ObjectLit([])
  }
  self.pos += 1 // skip [
  self.skip_bracket_ws()
  let pairs : Array[(String, Expr)] = []
  while self.pos < self.tokens.length() && self.peek() != RBracket {
    let key = self.parse_ident_name()
    if self.peek() == Be {
      self.pos += 1
      let value = self.parse_expr()
      pairs.push((key, value))
    } else {
      // shorthand: key only ↁEkey be key
      pairs.push((key, Ident(key)))
    }
    self.skip_bracket_ws()
    if self.peek() == Comma {
      self.pos += 1
      self.skip_bracket_ws()
    }
    if self.peek() == Semicolon {
      self.pos += 1
      self.skip_bracket_ws()
    }
  }
  if self.peek() == RBracket {
    self.pos += 1
  }
  ObjectLit(pairs)
}

///|
fn Parser::parse_bracket_expr(self : Parser) -> Expr {
  self.pos += 1 // skip [
  self.skip_bracket_ws()
  // Empty: [] ↁEempty array
  if self.peek() == RBracket {
    self.pos += 1
    return ArrayLit([])
  }
  // [be] ↁEempty object
  if self.peek() == Be {
    self.pos += 1
    self.skip_bracket_ws()
    if self.peek() == RBracket {
      self.pos += 1
      return ObjectLit([])
    }
    // If not ], put it back
    self.pos -= 1
  }
  // Parse first expression
  let first = self.parse_expr()
  self.skip_bracket_ws()
  // Check what follows
  match self.peek() {
    DotDot => {
      // Inclusive range: [start .. end]
      self.pos += 1
      let end_expr = self.parse_expr()
      self.skip_bracket_ws()
      if self.peek() == RBracket {
        self.pos += 1
      }
      RangeArray(first, end_expr, true)
    }
    DotDotDot => {
      // Exclusive range: [start ... end]
      self.pos += 1
      let end_expr = self.parse_expr()
      self.skip_bracket_ws()
      if self.peek() == RBracket {
        self.pos += 1
      }
      RangeArray(first, end_expr, false)
    }
    Be => {
      // Object literal: [key be value, ...]
      // Need to extract key name from first expr
      let key_name : String = match first {
        Ident(s) => s
        StrLit(s) => s
        _ => "unknown"
      }
      self.pos += 1
      let value = self.parse_expr()
      let pairs : Array[(String, Expr)] = [(key_name, value)]
      self.skip_bracket_ws()
      while self.peek() == Comma || self.peek() == Semicolon {
        self.pos += 1
        self.skip_bracket_ws()
        if self.peek() == RBracket {
          break
        }
        let k = self.parse_ident_name()
        self.expect(Be)
        let v = self.parse_expr()
        pairs.push((k, v))
        self.skip_bracket_ws()
      }
      if self.peek() == RBracket {
        self.pos += 1
      }
      ObjectLit(pairs)
    }
    Comma => {
      // Array literal: [a, b, ...]
      let elements : Array[Expr] = [first]
      while self.peek() == Comma {
        self.pos += 1
        self.skip_bracket_ws()
        if self.peek() == RBracket {
          break
        }
        elements.push(self.parse_expr())
        self.skip_bracket_ws()
      }
      if self.peek() == RBracket {
        self.pos += 1
      }
      ArrayLit(elements)
    }
    Semicolon => {
      // Function call args or array: [a; b; ...]
      let elements : Array[Expr] = [first]
      while self.peek() == Semicolon {
        self.pos += 1
        self.skip_bracket_ws()
        if self.peek() == RBracket {
          break
        }
        elements.push(self.parse_expr())
        self.skip_bracket_ws()
      }
      if self.peek() == RBracket {
        self.pos += 1
      }
      ArrayLit(elements)
    }
    RBracket => {
      // Single expression in brackets: grouping [expr]
      self.pos += 1
      first
    }
    _ => {
      // Likely just a grouping expression
      if self.peek() == RBracket {
        self.pos += 1
      }
      first
    }
  }
}

///|
fn Parser::parse_fn_expr(self : Parser) -> Expr {
  self.pos += 1 // skip fn
  let params = self.parse_param_list()
  if self.peek() == Gives {
    self.pos += 1
    self.skip_type_annotation()
  }
  if self.peek() == To {
    self.pos += 1
    if self.peek() == Return_ {
      self.pos += 1
      FnExprTo(params, self.parse_expr())
    } else {
      FnExprTo(params, self.parse_expr())
    }
  } else {
    let saved = self.pos
    let indent = self.skip_newlines_and_indent()
    let _ = saved
    let stmts = self.parse_block(indent)
    FnExpr(params, stmts)
  }
}
