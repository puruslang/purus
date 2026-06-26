// Whitebox feature tests  Eoperators, range, slice, destructuring,
// optional chaining, computed access, imports, async, stdlib
// Run `moon test` to execute and `moon test --update` to refresh snapshots.

///|
fn tokenize_f(src : String) -> Array[@lexer.Token] {
  @lexer.Lexer::new(src).tokenize()
}

///|
fn parse_f(src : String) -> Array[Stmt] {
  Parser::new(tokenize_f(src)).parse()
}

// ===== Operator tests =====

///|
test "parser: neq operator" {
  let stmts = parse_f("const r be x neq y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Neq, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Neq")
  }
}

///|
test "parser: not eq operator" {
  let stmts = parse_f("const r be x not eq y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Neq, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Neq from not eq")
  }
}

///|
test "parser: lt eq becomes Le" {
  let stmts = parse_f("const r be x lt eq y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Le, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Le from lt eq")
  }
}

///|
test "parser: gt eq becomes Ge" {
  let stmts = parse_f("const r be x gt eq y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Ge, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Ge from gt eq")
  }
}

///|
test "parser: pow operator" {
  let stmts = parse_f("const r be 2 pow 3")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Pow, IntLit(2), IntLit(3))) => ()
    _ => fail("expected BinOp Pow")
  }
}

///|
test "parser: pow right-associative" {
  let stmts = parse_f("const r be 2 pow 3 pow 4")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Pow, IntLit(2), BinOp(Pow, IntLit(3), IntLit(4)))) =>
      ()
    _ => fail("expected right-associative Pow")
  }
}

// ===== Range tests =====

///|
test "parser: inclusive range [0..5]" {
  let stmts = parse_f("const r be [0..5]")
  match stmts[0] {
    VarDecl(Const_, _, RangeArray(IntLit(0), IntLit(5), inclusive)) =>
      assert_true(inclusive)
    _ => fail("expected RangeArray inclusive")
  }
}

///|
test "parser: exclusive range [0...5]" {
  let stmts = parse_f("const r be [0...5]")
  match stmts[0] {
    VarDecl(Const_, _, RangeArray(IntLit(0), IntLit(5), inclusive)) =>
      assert_true(!inclusive)
    _ => fail("expected RangeArray exclusive")
  }
}

// ===== Slice tests =====

///|
test "parser: inclusive slice" {
  let stmts = Parser::new(@lexer.Lexer::new("numbers[\\2..4]").tokenize()).parse()
  match stmts[0] {
    ExprStmt(Slice(Ident(name), IntLit(2), IntLit(4), inclusive)) => {
      assert_eq(name, "numbers")
      assert_true(inclusive)
    }
    _ => fail("expected Slice inclusive")
  }
}

///|
test "parser: exclusive slice" {
  let stmts = Parser::new(@lexer.Lexer::new("numbers[\\2...4]").tokenize()).parse()
  match stmts[0] {
    ExprStmt(Slice(Ident(name), IntLit(2), IntLit(4), inclusive)) => {
      assert_eq(name, "numbers")
      assert_true(!inclusive)
    }
    _ => fail("expected Slice exclusive")
  }
}

///|
test "parser: slice with dot access" {
  let stmts = Parser::new(@lexer.Lexer::new("obj.arr[\\1..3]").tokenize()).parse()
  match stmts[0] {
    ExprStmt(Slice(DotAccess(Ident(obj), field), IntLit(1), IntLit(3), _)) => {
      assert_eq(obj, "obj")
      assert_eq(field, "arr")
    }
    _ => fail("expected Slice on dot access")
  }
}

///|
test "parser: splice assignment" {
  let stmts = Parser::new(
    @lexer.Lexer::new("numbers[\\2..4] be [///a///; ///b///]").tokenize(),
  ).parse()
  match stmts[0] {
    Assign(Slice(Ident(name), IntLit(2), IntLit(4), inclusive), ArrayLit(elems)) => {
      assert_eq(name, "numbers")
      assert_true(inclusive)
      assert_eq(elems.length(), 2)
    }
    _ => fail("expected Assign with Slice target")
  }
}

// ===== Destructuring tests =====

///|
test "parser: const destructuring" {
  let stmts = Parser::new(@lexer.Lexer::new("const [a; b] be weather").tokenize()).parse()
  match stmts[0] {
    DestructDecl(Const_, names, Ident(src)) => {
      assert_eq(names.length(), 2)
      assert_eq(names[0], "a")
      assert_eq(names[1], "b")
      assert_eq(src, "weather")
    }
    _ => fail("expected DestructDecl")
  }
}

///|
test "parser: let destructuring" {
  let stmts = Parser::new(@lexer.Lexer::new("let [x; y; z] be arr").tokenize()).parse()
  match stmts[0] {
    DestructDecl(Let_, names, Ident(src)) => {
      assert_eq(names.length(), 3)
      assert_eq(names[0], "x")
      assert_eq(names[1], "y")
      assert_eq(names[2], "z")
      assert_eq(src, "arr")
    }
    _ => fail("expected DestructDecl let")
  }
}

///|
test "parser: destructuring swap" {
  let stmts = Parser::new(@lexer.Lexer::new("[a; b] be [b; a]").tokenize()).parse()
  match stmts[0] {
    Assign(ArrayLit(lhs), ArrayLit(rhs)) => {
      assert_eq(lhs.length(), 2)
      assert_eq(rhs.length(), 2)
    }
    _ => fail("expected Assign with ArrayLit swap")
  }
}

// ===== Optional chaining tests =====

///|
test "parser: optional dot access" {
  let stmts = Parser::new(@lexer.Lexer::new("obj\\.name").tokenize()).parse()
  match stmts[0] {
    ExprStmt(OptDotAccess(Ident(obj), field)) => {
      assert_eq(obj, "obj")
      assert_eq(field, "name")
    }
    _ => fail("expected OptDotAccess")
  }
}

///|
test "parser: optional method call" {
  let stmts = Parser::new(@lexer.Lexer::new("obj\\.method[1; 2]").tokenize()).parse()
  match stmts[0] {
    ExprStmt(OptMethodCall(Ident(obj), meth, args)) => {
      assert_eq(obj, "obj")
      assert_eq(meth, "method")
      assert_eq(args.length(), 2)
    }
    _ => fail("expected OptMethodCall")
  }
}

// ===== Computed access tests =====

///|
test "parser: computed access" {
  let stmts = Parser::new(@lexer.Lexer::new("arr[\\i]").tokenize()).parse()
  match stmts[0] {
    ExprStmt(ComputedAccess(Ident(name), Ident(key))) => {
      assert_eq(name, "arr")
      assert_eq(key, "i")
    }
    _ => fail("expected ComputedAccess")
  }
}

///|
test "parser: computed access with number" {
  let stmts = Parser::new(@lexer.Lexer::new("arr[\\0]").tokenize()).parse()
  match stmts[0] {
    ExprStmt(ComputedAccess(Ident(name), IntLit(0))) => assert_eq(name, "arr")
    _ => fail("expected ComputedAccess with number")
  }
}

// ===== Side-effect import tests =====

///|
test "parser: side-effect import" {
  let stmts = Parser::new(@lexer.Lexer::new("import ///dotenv/config///").tokenize()).parse()
  match stmts[0] {
    ImportDecl(SideEffectImport(path, _)) => assert_eq(path, "dotenv/config")
    _ => fail("expected SideEffectImport")
  }
}

// ===== Import attributes tests =====

///|
test "parser: import with attributes" {
  let stmts = Parser::new(
    @lexer.Lexer::new(
      "import pkg from ///./package.json/// with [ type be ///json/// ]",
    ).tokenize(),
  ).parse()
  match stmts[0] {
    ImportDecl(
      EsImport(Some(default_name), None, None, module_name, Some(attrs))
    ) => {
      assert_eq(default_name, "pkg")
      assert_eq(module_name, "./package.json")
      assert_eq(attrs.length(), 1)
      assert_eq(attrs[0].0, "type")
    }
    _ => fail("expected EsImport with attributes")
  }
}

///|
test "parser: named import with attributes" {
  let stmts = Parser::new(
    @lexer.Lexer::new(
      "import [name; version] from ///./package.json/// with [ type be ///json/// ]",
    ).tokenize(),
  ).parse()
  match stmts[0] {
    ImportDecl(EsImport(None, Some(names), None, module_name, Some(attrs))) => {
      assert_eq(names.length(), 2)
      assert_eq(module_name, "./package.json")
      assert_eq(attrs.length(), 1)
    }
    _ => fail("expected named EsImport with attributes")
  }
}

// ===== Async fn expression tests =====

///|
test "parser: async fn expression to" {
  let stmts = Parser::new(
    @lexer.Lexer::new("const h be async fn x to x add 1").tokenize(),
  ).parse()
  match stmts[0] {
    VarDecl(_, _, AsyncFnExprTo(params, _)) => {
      assert_eq(params.length(), 1)
      assert_eq(params[0], "x")
    }
    _ => fail("expected AsyncFnExprTo")
  }
}

// ===== Bitwise operator tests =====

///|
test "parser: band operator" {
  let stmts = parse_f("const r be x band y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Band, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Band")
  }
}

///|
test "parser: bor operator" {
  let stmts = parse_f("const r be x bor y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Bor, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Bor")
  }
}

///|
test "parser: bxor operator" {
  let stmts = parse_f("const r be x bxor y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Bxor, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Bxor")
  }
}

///|
test "parser: shl operator" {
  let stmts = parse_f("const r be x shl y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Shl, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Shl")
  }
}

///|
test "parser: shr operator" {
  let stmts = parse_f("const r be x shr y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Shr, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Shr")
  }
}

///|
test "parser: ushr operator" {
  let stmts = parse_f("const r be x ushr y")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Ushr, Ident(l), Ident(r))) => {
      assert_eq(l, "x")
      assert_eq(r, "y")
    }
    _ => fail("expected BinOp Ushr")
  }
}

///|
test "parser: bnot unary operator" {
  let stmts = parse_f("const r be bnot x")
  match stmts[0] {
    VarDecl(Const_, _, UnaryBnot(Ident(name))) => assert_eq(name, "x")
    _ => fail("expected UnaryBnot")
  }
}

///|
test "parser: bitwise precedence band before bor" {
  let stmts = parse_f("const r be a bor b band c")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Bor, Ident(_), BinOp(Band, Ident(_), Ident(_)))) =>
      ()
    _ => fail("expected bor(a, band(b, c))")
  }
}

///|
test "parser: shift lower than addition" {
  let stmts = parse_f("const r be a add b shl c")
  match stmts[0] {
    VarDecl(Const_, _, BinOp(Shl, BinOp(Add, Ident(_), Ident(_)), Ident(_))) =>
      ()
    _ => fail("expected shl(add(a, b), c)")
  }
}

// ===== use stdlib tests =====

///|
test "parser: use stdlib module with alias" {
  let stmts = parse_f("use p-random as r")
  assert_eq(stmts.length(), 1)
  match stmts[0] {
    UseStdlib(module_name, binding) => {
      assert_eq(module_name, "p-random")
      assert_eq(binding, "r")
    }
    _ => fail("expected UseStdlib with alias")
  }
}

///|
test "parser: use stdlib module without alias" {
  let stmts = parse_f("use p-math")
  assert_eq(stmts.length(), 1)
  match stmts[0] {
    UseStdlib(module_name, binding) => {
      assert_eq(module_name, "p-math")
      assert_eq(binding, "p-math")
    }
    _ => fail("expected UseStdlib without alias")
  }
}

///|
test "parser: from...use is rejected" {
  let stmts = parse_f("from p-random use randint, choice")
  assert_eq(stmts.length(), 1)
  match stmts[0] {
    UseStdlib(_, _) => fail("from...use should be rejected")
    _ => ()
  }
}

// ===== blank wildcard =====

///|
test "parser: blank as fn param" {
  let stmts = parse_f("fn f blank; x to x")
  match stmts[0] {
    FnDecl(decl) => {
      assert_eq(decl.params.length(), 2)
      assert_eq(decl.params[0], "blank")
      assert_eq(decl.params[1], "x")
    }
    _ => fail("expected FnDecl with blank param")
  }
}

///|
test "parser: blank in match pattern" {
  let stmts = parse_f("match x\n  when blank then 0")
  match stmts[0] {
    MatchStmt(_, arms) => {
      assert_eq(arms.length(), 1)
      match arms[0].pattern {
        BindPat(name) => assert_eq(name, "blank")
        _ => fail("expected BindPat blank")
      }
    }
    _ => fail("expected MatchStmt")
  }
}

///|
test "parser: multiple blank params" {
  let stmts = parse_f("fn f blank; blank; x to x")
  match stmts[0] {
    FnDecl(decl) => {
      assert_eq(decl.params.length(), 3)
      assert_eq(decl.params[0], "blank")
      assert_eq(decl.params[1], "blank")
      assert_eq(decl.params[2], "x")
    }
    _ => fail("expected FnDecl with multiple blank params")
  }
}
