///|
/// AST node types for the purus language.
pub(all) enum Expr {
  // Literals
  IntLit(Int)
  BigIntLit(String) // BigInt literal e.g. 100n → 100n
  FloatLit(Double)
  StrLit(String) // raw string content
  StrInterp(Array[StrPart]) // interpolated string
  RegexLit(String, String) // pattern, flags
  BoolLit(Bool)
  NullLit // null / nil
  UndefinedLit
  NanLit // nan → NaN
  InfinityLit(Bool) // true = Infinity, false = -Infinity
  ArrayLit(Array[Expr])
  RangeArray(Expr, Expr, Bool) // [start..end] (inclusive=true) or [start...end] (inclusive=false)
  Slice(Expr, Expr, Expr, Bool) // obj[start..end] (inclusive) or obj[start...end] (exclusive)
  ObjectLit(Array[(String, Expr)])

  // Identifiers & access
  Ident(String)
  DotAccess(Expr, String) // obj.field
  IndexAccess(Expr, Int) // arr.0

  // Operators
  BinOp(BinOp, Expr, Expr)
  UnaryNeg(Expr) // neg x
  UnaryNot(Expr) // not x
  UnaryBnot(Expr) // bnot x (bitwise NOT)
  UnaryTypeof(Expr) // typeof x
  UnaryVoid(Expr) // void x

  // Comparison / type
  AsCast(Expr, String) // x as number
  Instanceof(Expr, Expr) // x instanceof Y

  // Function
  FnExpr(Array[String], Array[Stmt]) // anonymous fn
  FnExprTo(Array[String], Expr) // anonymous fn x to EXPR
  Call(Expr, Array[Expr]) // f(a, b)
  MethodCall(Expr, String, Array[Expr]) // obj.method(a, b)
  NewExpr(Expr, Array[Expr]) // new X
  Pipe(Expr, Expr) // a pipe b

  // Ternary
  IfExpr(Expr, Expr, Expr) // if COND then A else B

  // Try as expression
  TryExpr(Array[Stmt], String, Array[Stmt]) // try { ... } catch e { ... }

  // Match expression
  MatchExpr(Expr, Array[MatchArm])

  // Await
  AwaitExpr(Expr)

  // Delete
  DeleteExpr(Expr)

  // This
  ThisExpr

  // Super
  SuperExpr

  // Optional chaining
  OptDotAccess(Expr, String) // obj\.field
  OptMethodCall(Expr, String, Array[Expr]) // obj\.method[args]

  // Computed access
  ComputedAccess(Expr, Expr) // expr[\key]

  // Async function expressions
  AsyncFnExpr(Array[String], Array[Stmt]) // async fn (block)
  AsyncFnExprTo(Array[String], Expr) // async fn to EXPR

  // Generator
  YieldExpr(Expr?) // yield / yield expr

  // Increment / Decrement
  PostInc(Expr) // x\add → x++
  PostDec(Expr) // x\sub → x--
  PreInc(Expr) // add\x → ++x
  PreDec(Expr) // sub\x → --x
}

///|
pub(all) enum StrPart {
  Lit(String)
  Interp(Expr)
}

///|
pub(all) enum BinOp {
  Add
  Sub
  Mul
  Div
  Mod
  Pow
  Eq
  Neq
  Lt
  Gt
  Le
  Ge
  And
  Or
  Coal
  Band
  Bor
  Bxor
  Shl
  Shr
  Ushr
  Fdiv
} derive(Debug)

///|
pub(all) struct MatchArm {
  pattern : MatchPattern
  cond : Expr?
  body : MatchBody
}

///|
pub(all) enum MatchPattern {
  LitPat(Expr)
  BindPat(String)
}

///|
pub(all) enum MatchBody {
  ExprBody(Expr)
  BlockBody(Array[Stmt])
}

///|
pub(all) enum Stmt {
  // Variable declarations
  VarDecl(DeclKind, String, Expr)
  DestructDecl(DeclKind, Array[String], Expr) // const/let/var [a, b] = expr
  ObjDestructDecl(DeclKind, Array[String], Expr) // const/let/var object[a, b] = expr
  DottedVarInit(DeclKind, String, String, Expr) // const/let/var obj.prop be val → auto-declare obj if needed

  // Assignment
  Assign(Expr, Expr)
  CompoundAssign(BinOp, Expr, Expr) // x add be 1 → x += 1

  // Function declaration
  FnDecl(FnDecl)

  // Control flow
  If(Expr, Array[Stmt], Array[ElIfBranch], Array[Stmt]?)
  Unless(Expr, Array[Stmt])
  While(Expr, Array[Stmt])
  Until(Expr, Array[Stmt])
  DoWhile(Expr, Array[Stmt])
  ForIn(String, String?, Expr, Array[Stmt]) // for x in coll / for i; x in coll
  ForRange(String, Expr, Expr, Array[Stmt]) // for i in range a; b
  ForClassic(Stmt, Expr, Stmt, Array[Stmt]) // for let i be 0; i lt 10; i add be 1

  // Match statement
  MatchStmt(Expr, Array[MatchArm])

  // Postfix
  PostfixIf(Stmt, Expr)
  PostfixUnless(Stmt, Expr)
  PostfixFor(Stmt, String, Expr)

  // Error handling
  TryCatch(Array[Stmt], String?, Array[Stmt], Array[Stmt]?) // try/catch/finally
  Throw(Expr)

  // Return
  Return(Expr?)
  Break
  Continue

  // Expression statement
  ExprStmt(Expr)

  // Module / Import
  ImportDecl(ImportDecl)
  UseStdlib(String, String) // use <module> as <binding>
  ModDecl(String, Array[Stmt])
  ExportDefault(Stmt)
  PublicDecl(Stmt)
  TypeDecl(String, Expr) // type alias

  // Class declaration
  ClassDecl(ClassDecl)

  // Delete
  DeleteStmt(Expr)
}

///|
pub(all) enum DeclKind {
  Const_
  Let_
  Var_
}

///|
pub(all) struct FnDecl {
  name : String?
  params : Array[String]
  body : FnBody
  is_async : Bool
  is_generator : Bool
}

///|
pub(all) enum FnBody {
  Block(Array[Stmt])
  ToExpr(Expr)
  ToReturnExpr(Expr)
}

///|
pub(all) struct ElIfBranch {
  cond : Expr
  body : Array[Stmt]
}

///|
pub(all) enum ImportDecl {
  EsImport(String?, Array[String]?, String?, String, Array[(String, Expr)]?) // default, named, namespace, from, attributes
  CjsRequire(String, String) // name, module
  DynImport(String) // dynamic import
  SideEffectImport(String, Array[(String, Expr)]?) // import ///module///, attributes
}

///|
pub(all) struct ClassDecl {
  name : String
  parent : String? // extends
  members : Array[ClassMember]
}

///|
pub(all) enum ClassMember {
  Field(Bool, String, Expr?) // private?, name, default value?
  Constructor(Array[String], FnBody) // params, body
  Method(Bool, Bool, String, Array[String], FnBody) // static?, async?, name, params, body
  Getter(String, FnBody) // name, body
  Setter(String, String, FnBody) // name, param, body
}
