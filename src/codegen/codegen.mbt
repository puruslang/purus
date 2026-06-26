///|
/// JavaScript code generator for the purus language.
/// Traverses the AST and emits JavaScript source code.
pub(all) struct JsCodegen {
  buf : StringBuilder
  mut indent_level : Int
  mut private_fields : Array[String] // tracks private field names in current class
  mut declared_vars : Array[String] // tracks declared variable names for auto-init
  cjs : Bool // CommonJS mode
}

///|
pub fn JsCodegen::new(cjs? : Bool = false) -> JsCodegen {
  { buf: StringBuilder::new(), indent_level: 0, private_fields: [], declared_vars: [], cjs }
}

///|
fn body_has_yield(body : @parser.FnBody) -> Bool {
  match body {
    Block(stmts) => stmts_have_yield(stmts)
    ToExpr(expr) | ToReturnExpr(expr) => expr_has_yield(expr)
  }
}

///|
fn stmts_have_yield(stmts : Array[@parser.Stmt]) -> Bool {
  for s in stmts {
    if stmt_has_yield(s) {
      return true
    }
  }
  false
}

///|
fn stmt_has_yield(stmt : @parser.Stmt) -> Bool {
  match stmt {
    ExprStmt(e) | Return(Some(e)) | Throw(e) | DeleteStmt(e) =>
      expr_has_yield(e)
    VarDecl(_, _, e) | Assign(_, e) => expr_has_yield(e)
    DottedVarInit(_, _, _, e) => expr_has_yield(e)
    If(cond, body, elifs, else_body) => {
      if expr_has_yield(cond) || stmts_have_yield(body) {
        return true
      }
      for b in elifs {
        if expr_has_yield(b.cond) || stmts_have_yield(b.body) {
          return true
        }
      }
      match else_body {
        Some(eb) => stmts_have_yield(eb)
        None => false
      }
    }
    While(cond, body) | Until(cond, body) | DoWhile(cond, body) =>
      expr_has_yield(cond) || stmts_have_yield(body)
    ForIn(_, _, iter, body) => expr_has_yield(iter) || stmts_have_yield(body)
    ForRange(_, start, end, body) =>
      expr_has_yield(start) || expr_has_yield(end) || stmts_have_yield(body)
    TryCatch(try_body, _, catch_body, finally_body) => {
      if stmts_have_yield(try_body) || stmts_have_yield(catch_body) {
        return true
      }
      match finally_body {
        Some(fb) => stmts_have_yield(fb)
        None => false
      }
    }
    PostfixIf(s, cond) | PostfixUnless(s, cond) =>
      stmt_has_yield(s) || expr_has_yield(cond)
    PostfixFor(s, _, _) => stmt_has_yield(s)
    ExportDefault(s) | PublicDecl(s) => stmt_has_yield(s)
    // Don't recurse into nested @parser.FnDecl/@parser.ClassDecl - yield in nested functions is separate
    _ => false
  }
}

///|
fn expr_has_yield(expr : @parser.Expr) -> Bool {
  match expr {
    YieldExpr(_) => true
    BinOp(_, l, r) => expr_has_yield(l) || expr_has_yield(r)
    UnaryNot(e) | UnaryNeg(e) | UnaryBnot(e) | UnaryTypeof(e) | AwaitExpr(e) =>
      expr_has_yield(e)
    Call(callee, args) => {
      if expr_has_yield(callee) {
        return true
      }
      for a in args {
        if expr_has_yield(a) {
          return true
        }
      }
      false
    }
    MethodCall(obj, _, args) | OptMethodCall(obj, _, args) => {
      if expr_has_yield(obj) {
        return true
      }
      for a in args {
        if expr_has_yield(a) {
          return true
        }
      }
      false
    }
    ArrayLit(elems) => {
      for e in elems {
        if expr_has_yield(e) {
          return true
        }
      }
      false
    }
    ObjectLit(pairs) => {
      for p in pairs {
        if expr_has_yield(p.1) {
          return true
        }
      }
      false
    }
    DotAccess(e, _) | ComputedAccess(e, _) | OptDotAccess(e, _) =>
      expr_has_yield(e)
    IfExpr(c, t, e) =>
      expr_has_yield(c) || expr_has_yield(t) || expr_has_yield(e)
    _ => false
  }
}

///|
fn JsCodegen::write(self : JsCodegen, s : String) -> Unit {
  self.buf.write_string(s)
}

///|
fn JsCodegen::writeln(self : JsCodegen, s : String) -> Unit {
  self.write_indent()
  self.buf.write_string(s)
  self.buf.write_char('\n')
}

///|
fn JsCodegen::write_indent(self : JsCodegen) -> Unit {
  let mut i = 0
  while i < self.indent_level {
    self.buf.write_string("  ")
    i += 1
  }
}

///|
pub fn JsCodegen::generate(
  self : JsCodegen,
  stmts : Array[@parser.Stmt],
  header? : String = "",
  shebang? : String = "",
  strict? : Bool = true,
) -> String {
  if shebang.length() > 0 {
    self.buf.write_string(shebang)
    self.buf.write_char('\n')
  }
  if header.length() > 0 {
    self.buf.write_string(header)
    self.buf.write_char('\n')
  }
  if strict {
    self.buf.write_string("\"use strict\";\n")
  }
  for stmt in stmts {
    self.gen_stmt(stmt)
  }
  self.buf.to_string()
}

///|
fn JsCodegen::gen_stmt(self : JsCodegen, stmt : @parser.Stmt) -> Unit {
  match stmt {
    VarDecl(kind, name, value) => {
      let kw = match kind {
        Const_ => "const"
        Let_ => "let"
        Var_ => "var"
      }
      self.write_indent()
      self.write(kw)
      self.write(" ")
      self.write(js_ident(name))
      self.write(" = ")
      self.gen_expr(value)
      self.write(";\n")
      self.declared_vars.push(name)
    }
    DottedVarInit(kind, obj_name, prop, value) => {
      let kw = match kind {
        Const_ => "const"
        Let_ => "let"
        Var_ => "var"
      }
      // Auto-declare obj as {} if not yet declared in this scope
      let mut is_declared = false
      for v in self.declared_vars {
        if v == obj_name {
          is_declared = true
          break
        }
      }
      if !is_declared {
        self.write_indent()
        self.write(kw)
        self.write(" ")
        self.write(js_ident(obj_name))
        self.write(" = {};\n")
        self.declared_vars.push(obj_name)
      }
      self.write_indent()
      self.write(js_ident(obj_name))
      self.write(".")
      self.write(js_ident(prop))
      self.write(" = ")
      self.gen_expr(value)
      self.write(";\n")
    }
    DestructDecl(kind, names, value) => {
      let kw = match kind {
        Const_ => "const"
        Let_ => "let"
        Var_ => "var"
      }
      self.write_indent()
      self.write(kw)
      self.write(" [")
      let mut first = true
      for n in names {
        if !first {
          self.write(", ")
        }
        self.write(js_ident(n))
        first = false
      }
      self.write("] = ")
      self.gen_expr(value)
      self.write(";\n")
    }
    ObjDestructDecl(kind, names, value) => {
      let kw = match kind {
        Const_ => "const"
        Let_ => "let"
        Var_ => "var"
      }
      self.write_indent()
      self.write(kw)
      self.write(" { ")
      let mut first = true
      for n in names {
        if !first {
          self.write(", ")
        }
        self.write(js_ident(n))
        first = false
      }
      self.write(" } = ")
      self.gen_expr(value)
      self.write(";\n")
    }
    Assign(target, value) =>
      match target {
        Slice(obj, start, end, inclusive) => {
          // Splice: arr[start..end] be value ↁEarr.splice(start, end - start + 1, ...value)
          self.write_indent()
          self.gen_expr(obj)
          self.write(".splice(")
          self.gen_expr(start)
          self.write(", ")
          self.gen_expr_wrap(end)
          self.write(" - ")
          self.gen_expr_wrap(start)
          if inclusive {
            self.write(" + 1")
          }
          match value {
            ArrayLit(elems) =>
              for e in elems {
                self.write(", ")
                self.gen_expr(e)
              }
            _ => {
              self.write(", ...")
              self.gen_expr(value)
            }
          }
          self.write(");\n")
        }
        _ => {
          self.write_indent()
          self.gen_expr(target)
          self.write(" = ")
          self.gen_expr(value)
          self.write(";\n")
        }
      }
    CompoundAssign(op, target, value) => {
      self.write_indent()
      match op {
        Fdiv => {
          self.gen_expr(target)
          self.write(" = Math.floor(")
          self.gen_expr(target)
          self.write(" / ")
          self.gen_expr(value)
          self.write(");\n")
        }
        _ => {
          self.gen_expr(target)
          self.write(compound_op_str(op))
          self.gen_expr(value)
          self.write(";\n")
        }
      }
    }
    @parser.FnDecl(decl) => self.gen_fn_decl(decl)
    If(cond, body, elifs, else_body) =>
      self.gen_if(cond, body, elifs, else_body)
    Unless(cond, body) => {
      self.write_indent()
      self.write("if (!(")
      self.gen_expr(cond)
      self.write(")) {\n")
      self.indent_level += 1
      for s in body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
    While(cond, body) => {
      self.write_indent()
      self.write("while (")
      self.gen_expr(cond)
      self.write(") {\n")
      self.indent_level += 1
      for s in body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
    Until(cond, body) => {
      self.write_indent()
      self.write("while (!(")
      self.gen_expr(cond)
      self.write(")) {\n")
      self.indent_level += 1
      for s in body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
    DoWhile(cond, body) => {
      self.write_indent()
      self.write("do {\n")
      self.indent_level += 1
      for s in body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.write_indent()
      self.write("} while (")
      self.gen_expr(cond)
      self.write(");\n")
    }
    ForIn(name, index, iter, body) => {
      match index {
        Some(idx) => {
          self.write_indent()
          self.write("for (let [")
          self.write(js_ident(idx))
          self.write(", ")
          self.write(js_ident(name))
          self.write("] of ")
          self.gen_expr(iter)
          self.write(".entries()) {\n")
        }
        None => {
          self.write_indent()
          self.write("for (const ")
          self.write(js_ident(name))
          self.write(" of ")
          self.gen_expr(iter)
          self.write(") {\n")
        }
      }
      self.indent_level += 1
      for s in body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
    ForRange(name, start, end, body) => {
      self.write_indent()
      self.write("for (let ")
      self.write(js_ident(name))
      self.write(" = ")
      self.gen_expr(start)
      self.write("; ")
      self.write(js_ident(name))
      self.write(" < ")
      self.gen_expr(end)
      self.write("; ")
      self.write(js_ident(name))
      self.write("++) {\n")
      self.indent_level += 1
      for s in body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
    ForClassic(init, cond, update, body) => {
      self.write_indent()
      self.write("for (")
      self.gen_for_part(init)
      self.write("; ")
      self.gen_expr(cond)
      self.write("; ")
      self.gen_for_part(update)
      self.write(") {\n")
      self.indent_level += 1
      for s in body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
    MatchStmt(subject, arms) => self.gen_match(subject, arms)
    PostfixIf(inner, cond) => {
      self.write_indent()
      self.write("if (")
      self.gen_expr(cond)
      self.write(") ")
      self.gen_stmt_inline(inner)
      self.write("\n")
    }
    PostfixUnless(inner, cond) => {
      self.write_indent()
      self.write("if (!(")
      self.gen_expr(cond)
      self.write(")) ")
      self.gen_stmt_inline(inner)
      self.write("\n")
    }
    PostfixFor(inner, name, iter) => {
      self.write_indent()
      self.write("for (const ")
      self.write(js_ident(name))
      self.write(" of ")
      self.gen_expr(iter)
      self.write(") ")
      self.gen_stmt_inline(inner)
      self.write("\n")
    }
    TryCatch(try_body, catch_name, catch_body, finally_body) => {
      self.writeln("try {")
      self.indent_level += 1
      for s in try_body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.write_indent()
      self.write("} catch (")
      self.write(
        match catch_name {
          Some(n) => js_ident(n)
          None => "e"
        },
      )
      self.write(") {\n")
      self.indent_level += 1
      for s in catch_body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      match finally_body {
        Some(fb) => {
          self.writeln("} finally {")
          self.indent_level += 1
          for s in fb {
            self.gen_stmt(s)
          }
          self.indent_level -= 1
          self.writeln("}")
        }
        None => self.writeln("}")
      }
    }
    Throw(expr) => {
      self.write_indent()
      self.write("throw ")
      self.gen_expr(expr)
      self.write(";\n")
    }
    Return(value) => {
      self.write_indent()
      match value {
        Some(v) => {
          self.write("return ")
          self.gen_expr(v)
          self.write(";\n")
        }
        None => self.write("return;\n")
      }
    }
    Break => self.writeln("break;")
    Continue => self.writeln("continue;")
    ExprStmt(expr) => {
      self.write_indent()
      self.gen_expr(expr)
      self.write(";\n")
    }
    @parser.ImportDecl(decl) => self.gen_import(decl)
    UseStdlib(module_name, binding) => {
      self.write_indent()
      self.write("// @purus-stdlib:whole:")
      self.write(module_name)
      self.write(":")
      self.write(js_ident(binding))
      self.write("\n")
    }
    ModDecl(name, body) => {
      self.write_indent()
      self.write("const ")
      self.write(js_ident(name))
      self.write(" = (() => {\n")
      self.indent_level += 1
      for s in body {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("})();")
    }
    ExportDefault(inner) => {
      self.write_indent()
      if self.cjs {
        self.write("module.exports = ")
      } else {
        self.write("export default ")
      }
      self.gen_stmt_inline(inner)
      self.write("\n")
    }
    PublicDecl(inner) =>
      if self.cjs {
        self.gen_stmt(inner)
        // Add exports assignment after the declaration
        match inner {
          VarDecl(_, name, _) => {
            self.write_indent()
            self.write("exports.")
            self.write(js_ident(name))
            self.write(" = ")
            self.write(js_ident(name))
            self.write(";\n")
          }
          @parser.FnDecl(decl) =>
            match decl.name {
              Some(n) => {
                self.write_indent()
                self.write("exports.")
                self.write(js_ident(n))
                self.write(" = ")
                self.write(js_ident(n))
                self.write(";\n")
              }
              None => ()
            }
          @parser.ClassDecl(decl) => {
            self.write_indent()
            self.write("exports.")
            self.write(js_ident(decl.name))
            self.write(" = ")
            self.write(js_ident(decl.name))
            self.write(";\n")
          }
          _ => ()
        }
      } else {
        self.write_indent()
        self.write("export ")
        self.gen_stmt_inline(inner)
        self.write("\n")
      }
    TypeDecl(_, _) => () // Type declarations are erased at runtime
    @parser.ClassDecl(decl) => self.gen_class_decl(decl)
    DeleteStmt(expr) => {
      self.write_indent()
      self.write("delete ")
      self.gen_expr(expr)
      self.write(";\n")
    }
  }
}

///|
/// Generate a statement inline (without leading indent, without trailing newline)
fn JsCodegen::gen_stmt_inline(self : JsCodegen, stmt : @parser.Stmt) -> Unit {
  match stmt {
    VarDecl(kind, name, value) => {
      let kw = match kind {
        Const_ => "const"
        Let_ => "let"
        Var_ => "var"
      }
      self.write(kw)
      self.write(" ")
      self.write(js_ident(name))
      self.write(" = ")
      self.gen_expr(value)
      self.write(";")
    }
    ExprStmt(expr) => {
      self.gen_expr(expr)
      self.write(";")
    }
    Return(Some(v)) => {
      self.write("return ")
      self.gen_expr(v)
      self.write(";")
    }
    Return(None) => self.write("return;")
    Throw(expr) => {
      self.write("throw ")
      self.gen_expr(expr)
      self.write(";")
    }
    Assign(target, value) =>
      match target {
        Slice(obj, start, end, inclusive) => {
          self.gen_expr(obj)
          self.write(".splice(")
          self.gen_expr(start)
          self.write(", ")
          self.gen_expr_wrap(end)
          self.write(" - ")
          self.gen_expr_wrap(start)
          if inclusive {
            self.write(" + 1")
          }
          match value {
            ArrayLit(elems) =>
              for e in elems {
                self.write(", ")
                self.gen_expr(e)
              }
            _ => {
              self.write(", ...")
              self.gen_expr(value)
            }
          }
          self.write(");")
        }
        _ => {
          self.gen_expr(target)
          self.write(" = ")
          self.gen_expr(value)
          self.write(";")
        }
      }
    CompoundAssign(op, target, value) =>
      match op {
        Fdiv => {
          self.gen_expr(target)
          self.write(" = Math.floor(")
          self.gen_expr(target)
          self.write(" / ")
          self.gen_expr(value)
          self.write(");")
        }
        _ => {
          self.gen_expr(target)
          self.write(compound_op_str(op))
          self.gen_expr(value)
          self.write(";")
        }
      }
    _ => self.gen_stmt(stmt) // fallback
  }
}

///|
fn JsCodegen::gen_for_part(self : JsCodegen, stmt : @parser.Stmt) -> Unit {
  match stmt {
    VarDecl(kind, name, value) => {
      let kw = match kind {
        Const_ => "const"
        Let_ => "let"
        Var_ => "var"
      }
      self.write(kw)
      self.write(" ")
      self.write(js_ident(name))
      self.write(" = ")
      self.gen_expr(value)
    }
    Assign(target, value) => {
      self.gen_expr(target)
      self.write(" = ")
      self.gen_expr(value)
    }
    CompoundAssign(op, target, value) =>
      match op {
        Fdiv => {
          self.gen_expr(target)
          self.write(" = Math.floor(")
          self.gen_expr(target)
          self.write(" / ")
          self.gen_expr(value)
          self.write(")")
        }
        _ => {
          self.gen_expr(target)
          self.write(compound_op_str(op))
          self.gen_expr(value)
        }
      }
    ExprStmt(expr) => self.gen_expr(expr)
    _ => self.gen_stmt(stmt) // fallback
  }
}

///|
fn JsCodegen::gen_params(self : JsCodegen, params : Array[String]) -> Unit {
  let mut blank_count = 0
  let mut first = true
  for p in params {
    if !first {
      self.write(", ")
    }
    if p == "blank" {
      if blank_count == 0 {
        self.write("_")
      } else {
        self.write("_" + blank_count.to_string())
      }
      blank_count += 1
    } else {
      self.write(js_ident(p))
    }
    first = false
  }
}

///|
fn is_blank(name : String) -> Bool {
  name == "blank" || name == "_"
}

///|
fn JsCodegen::gen_fn_decl(self : JsCodegen, decl : @parser.FnDecl) -> Unit {
  self.write_indent()
  if decl.is_async {
    self.write("async ")
  }
  if decl.is_generator || body_has_yield(decl.body) {
    self.write("function*")
  } else {
    self.write("function")
  }
  match decl.name {
    Some(n) => {
      self.write(" ")
      self.write(js_ident(n))
    }
    None => ()
  }
  self.write("(")
  self.gen_params(decl.params)
  self.write(") ")
  match decl.body {
    ToExpr(expr) => {
      self.write("{ ")
      self.gen_expr(expr)
      self.write("; }\n")
    }
    ToReturnExpr(expr) => {
      self.write("{ return ")
      self.gen_expr(expr)
      self.write("; }\n")
    }
    Block(stmts) => {
      self.write("{\n")
      self.indent_level += 1
      for s in stmts {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
  }
}

///|
fn JsCodegen::gen_class_decl(self : JsCodegen, decl : @parser.ClassDecl) -> Unit {
  let saved_private = self.private_fields
  self.private_fields = []
  // Collect private field names
  for mbr in decl.members {
    match mbr {
      Field(true, name, _) => self.private_fields.push(name)
      _ => ()
    }
  }
  self.write_indent()
  self.write("class ")
  self.write(js_ident(decl.name))
  match decl.parent {
    Some(p) => {
      self.write(" extends ")
      self.write(js_ident(p))
    }
    None => ()
  }
  self.write(" {\n")
  self.indent_level += 1
  for mbr in decl.members {
    match mbr {
      Field(is_private, name, default_val) => {
        self.write_indent()
        if is_private {
          self.write("#")
        }
        self.write(js_ident(name))
        match default_val {
          Some(v) => {
            self.write(" = ")
            self.gen_expr(v)
          }
          None => ()
        }
        self.write(";\n")
      }
      Constructor(params, body) => {
        self.write_indent()
        self.write("constructor(")
        self.gen_params(params)
        self.write(") ")
        self.gen_class_body(body)
      }
      Method(is_static, is_async, name, params, body) => {
        self.write_indent()
        if is_static {
          self.write("static ")
        }
        if is_async {
          self.write("async ")
        }
        self.write(js_ident(name))
        self.write("(")
        self.gen_params(params)
        self.write(") ")
        self.gen_class_body(body)
      }
      Getter(name, body) => {
        self.write_indent()
        self.write("get ")
        self.write(js_ident(name))
        self.write("() ")
        self.gen_class_body(body)
      }
      Setter(name, param, body) => {
        self.write_indent()
        self.write("set ")
        self.write(js_ident(name))
        self.write("(")
        self.write(js_ident(param))
        self.write(") ")
        self.gen_class_body(body)
      }
    }
  }
  self.indent_level -= 1
  self.writeln("}")
  self.private_fields = saved_private
}

///|
fn JsCodegen::gen_class_body(self : JsCodegen, body : @parser.FnBody) -> Unit {
  match body {
    ToExpr(expr) => {
      self.write("{ ")
      self.gen_expr(expr)
      self.write("; }\n")
    }
    ToReturnExpr(expr) => {
      self.write("{ return ")
      self.gen_expr(expr)
      self.write("; }\n")
    }
    Block(stmts) => {
      self.write("{\n")
      self.indent_level += 1
      for s in stmts {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
  }
}

///|
fn JsCodegen::gen_if(
  self : JsCodegen,
  cond : @parser.Expr,
  body : Array[@parser.Stmt],
  elifs : Array[@parser.ElIfBranch],
  else_body : Array[@parser.Stmt]?,
) -> Unit {
  self.write_indent()
  self.write("if (")
  self.gen_expr(cond)
  self.write(") {\n")
  self.indent_level += 1
  for s in body {
    self.gen_stmt(s)
  }
  self.indent_level -= 1
  for elif in elifs {
    self.write_indent()
    self.write("} else if (")
    self.gen_expr(elif.cond)
    self.write(") {\n")
    self.indent_level += 1
    for s in elif.body {
      self.gen_stmt(s)
    }
    self.indent_level -= 1
  }
  match else_body {
    Some(eb) => {
      self.writeln("} else {")
      self.indent_level += 1
      for s in eb {
        self.gen_stmt(s)
      }
      self.indent_level -= 1
      self.writeln("}")
    }
    None => self.writeln("}")
  }
}

///|
fn JsCodegen::gen_match(
  self : JsCodegen,
  subject : @parser.Expr,
  arms : Array[@parser.MatchArm],
) -> Unit {
  // Check if any arm has named BindPat with guard (needs pre-declaration)
  let mut has_bind_guard = false
  for arm in arms {
    match arm.pattern {
      BindPat(name) =>
        match arm.cond {
          Some(_) => if !is_blank(name) { has_bind_guard = true }
          None => ()
        }
      _ => ()
    }
  }
  if has_bind_guard {
    // Wrap in block scope and pre-declare bindings
    self.write_indent()
    self.write("{\n")
    self.indent_level += 1
    for arm in arms {
      match arm.pattern {
        BindPat(name) =>
          match arm.cond {
            Some(_) =>
              if !is_blank(name) {
                self.write_indent()
                self.write("const ")
                self.write(js_ident(name))
                self.write(" = ")
                self.gen_expr(subject)
                self.write(";\n")
              }
            None => ()
          }
        _ => ()
      }
    }
  }
  // Compile match to if-else chain
  self.write_indent()
  let mut first = true
  for arm in arms {
    if !first {
      self.write(" else ")
    }
    match arm.pattern {
      LitPat(lit) => {
        self.write("if (")
        self.gen_expr(subject)
        self.write(" === ")
        self.gen_expr(lit)
        match arm.cond {
          Some(c) => {
            self.write(" && ")
            self.gen_expr(c)
          }
          None => ()
        }
        self.write(") {\n")
      }
      BindPat(name) =>
        if is_blank(name) {
          match arm.cond {
            Some(c) => {
              self.write("if (")
              self.gen_expr(c)
              self.write(") {\n")
            }
            None => self.write("{\n")
          }
        } else {
          match arm.cond {
            Some(c) => {
              // Binding pre-declared, use guard as condition
              self.write("if (")
              self.gen_expr(c)
              self.write(") {\n")
            }
            None => {
              self.write("if (true) { const ")
              self.write(js_ident(name))
              self.write(" = ")
              self.gen_expr(subject)
              self.write(";\n")
            }
          }
        }
    }
    self.indent_level += 1
    match arm.body {
      ExprBody(expr) => {
        self.write_indent()
        self.gen_expr(expr)
        self.write(";\n")
      }
      BlockBody(stmts) =>
        for s in stmts {
          self.gen_stmt(s)
        }
    }
    self.indent_level -= 1
    self.write_indent()
    self.write("}")
    first = false
  }
  self.write("\n")
  if has_bind_guard {
    self.indent_level -= 1
    self.write_indent()
    self.write("}\n")
  }
}

///|
fn JsCodegen::gen_import(self : JsCodegen, decl : @parser.ImportDecl) -> Unit {
  match decl {
    EsImport(default_name, named, ns_name, module_name, attrs) =>
      if self.cjs {
        // CJS mode: convert to require()
        match (default_name, named, ns_name) {
          (Some(n), None, None) => {
            // import x from "mod" ↁEconst x = require("mod");
            self.write_indent()
            self.write("const ")
            self.write(n)
            self.write(" = require(\"")
            self.write(module_name)
            self.write("\");\n")
          }
          (None, Some(names), None) => {
            // import { a, b } from "mod" ↁEconst { a, b } = require("mod");
            self.write_indent()
            self.write("const { ")
            let mut first = true
            for n in names {
              if !first {
                self.write(", ")
              }
              self.write(n)
              first = false
            }
            self.write(" } = require(\"")
            self.write(module_name)
            self.write("\");\n")
          }
          (Some(n), Some(names), None) => {
            // import x, { a, b } from "mod" ↁEconst x = require("mod"); const { a, b } = x;
            self.write_indent()
            self.write("const ")
            self.write(n)
            self.write(" = require(\"")
            self.write(module_name)
            self.write("\");\n")
            self.write_indent()
            self.write("const { ")
            let mut first = true
            for nm in names {
              if !first {
                self.write(", ")
              }
              self.write(nm)
              first = false
            }
            self.write(" } = ")
            self.write(n)
            self.write(";\n")
          }
          (None, None, Some(ns)) => {
            // import * as fs from "fs" ↁEconst fs = require("fs");
            self.write_indent()
            self.write("const ")
            self.write(ns)
            self.write(" = require(\"")
            self.write(module_name)
            self.write("\");\n")
          }
          _ => {
            // fallback: just require
            self.write_indent()
            self.write("require(\"")
            self.write(module_name)
            self.write("\");\n")
          }
        }
      } else {
        // ESM mode
        self.write_indent()
        self.write("import ")
        let mut has_prev = false
        match default_name {
          Some(n) => {
            self.write(n)
            has_prev = true
          }
          None => ()
        }
        match named {
          Some(names) => {
            if has_prev {
              self.write(", ")
            }
            self.write("{ ")
            let mut first = true
            for n in names {
              if !first {
                self.write(", ")
              }
              self.write(n)
              first = false
            }
            self.write(" }")
            has_prev = true
          }
          None => ()
        }
        match ns_name {
          Some(ns) => {
            if has_prev {
              self.write(", ")
            }
            self.write("* as ")
            self.write(ns)
          }
          None => ()
        }
        self.write(" from \"")
        self.write(module_name)
        self.write("\"")
        self.gen_import_attributes(attrs)
        self.write(";\n")
      }
    CjsRequire(name, module_name) => {
      self.write_indent()
      self.write("const ")
      self.write(js_ident(name))
      self.write(" = require(\"")
      self.write(module_name)
      self.write("\");\n")
    }
    DynImport(module_name) => {
      self.write_indent()
      self.write("import(\"")
      self.write(module_name)
      self.write("\");\n")
    }
    SideEffectImport(module_name, attrs) =>
      if self.cjs {
        // CJS mode: import "mod" ↁErequire("mod");
        self.write_indent()
        self.write("require(\"")
        self.write(module_name)
        self.write("\");\n")
      } else {
        self.write_indent()
        self.write("import \"")
        self.write(module_name)
        self.write("\"")
        self.gen_import_attributes(attrs)
        self.write(";\n")
      }
  }
}

///|
fn JsCodegen::gen_import_attributes(
  self : JsCodegen,
  attrs : Array[(String, @parser.Expr)]?,
) -> Unit {
  match attrs {
    Some(pairs) => {
      self.write(" with { ")
      let mut first = true
      for pair in pairs {
        if !first {
          self.write(", ")
        }
        self.write(pair.0)
        self.write(": ")
        self.gen_expr(pair.1)
        first = false
      }
      self.write(" }")
    }
    None => ()
  }
}
