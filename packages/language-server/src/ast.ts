import { Span } from "./token";

// --- Program ---
export interface Program {
  type: "Program";
  stmts: Stmt[];
  span: Span;
}

// --- Statements ---
export type Stmt =
  | VarDeclStmt
  | ArrayDestructStmt
  | ObjectDestructStmt
  | AssignStmt
  | CompoundAssignStmt
  | FnDeclStmt
  | ClassDeclStmt
  | IfStmt
  | UnlessStmt
  | WhileStmt
  | UntilStmt
  | DoWhileStmt
  | ForInStmt
  | ForRangeStmt
  | MatchStmt
  | SwitchStmt
  | TryCatchStmt
  | ThrowStmt
  | ReturnStmt
  | BreakStmt
  | ContinueStmt
  | ImportStmt
  | SideEffectImportStmt
  | UseStmt
  | FromUseStmt
  | ExportStmt
  | ExportDefaultStmt
  | PubStmt
  | NamespaceStmt
  | TypeDeclStmt
  | DeleteStmt
  | ExprStmt;

export interface VarDeclStmt {
  type: "VarDecl";
  declKind: "const" | "let" | "var";
  name: string;
  nameSpan: Span;
  typeAnnotation?: string;
  init: Expr;
  span: Span;
}

export interface ArrayDestructStmt {
  type: "ArrayDestruct";
  declKind: "const" | "let" | "var";
  names: { name: string; span: Span }[];
  init: Expr;
  span: Span;
}

export interface ObjectDestructStmt {
  type: "ObjectDestruct";
  declKind: "const" | "let" | "var";
  names: { name: string; span: Span }[];
  init: Expr;
  span: Span;
}

export interface AssignStmt {
  type: "Assign";
  target: Expr;
  value: Expr;
  span: Span;
}

export type CompoundAssignOp = "add" | "sub" | "mul" | "div" | "mod" | "pow" | "fdiv"
  | "band" | "bor" | "bxor" | "shl" | "shr" | "ushr";

export interface CompoundAssignStmt {
  type: "CompoundAssign";
  target: Expr;
  op: CompoundAssignOp;
  value: Expr;
  span: Span;
}

export interface FnDeclStmt {
  type: "FnDecl";
  name: string;
  nameSpan: Span;
  params: Param[];
  returnType?: string;
  body: FnBody;
  isAsync: boolean;
  span: Span;
}

export interface Param {
  name: string;
  nameSpan: Span;
  typeAnnotation?: string;
}

export type FnBody =
  | { kind: "block"; stmts: Stmt[] }
  | { kind: "expr"; expr: Expr };

export interface ClassDeclStmt {
  type: "ClassDecl";
  name: string;
  nameSpan: Span;
  superClass?: string;
  members: ClassMember[];
  span: Span;
}

export type ClassMember =
  | PrivateFieldMember
  | ConstructorMember
  | MethodMember
  | GetterMember
  | SetterMember;

export interface PrivateFieldMember {
  type: "PrivateField";
  name: string;
  nameSpan: Span;
  init?: Expr;
  span: Span;
}

export interface ConstructorMember {
  type: "Constructor";
  params: Param[];
  body: FnBody;
  span: Span;
}

export interface MethodMember {
  type: "Method";
  name: string;
  nameSpan: Span;
  params: Param[];
  returnType?: string;
  body: FnBody;
  isStatic: boolean;
  isAsync: boolean;
  span: Span;
}

export interface GetterMember {
  type: "Getter";
  name: string;
  nameSpan: Span;
  returnType?: string;
  body: FnBody;
  span: Span;
}

export interface SetterMember {
  type: "Setter";
  name: string;
  nameSpan: Span;
  paramName: string;
  body: FnBody;
  span: Span;
}

export interface IfStmt {
  type: "If";
  condition: Expr;
  body: Stmt[];
  elifs: { condition: Expr; body: Stmt[] }[];
  elseBody?: Stmt[];
  span: Span;
}

export interface UnlessStmt {
  type: "Unless";
  condition: Expr;
  body: Stmt[];
  span: Span;
}

export interface WhileStmt {
  type: "While";
  condition: Expr;
  body: Stmt[];
  span: Span;
}

export interface UntilStmt {
  type: "Until";
  condition: Expr;
  body: Stmt[];
  span: Span;
}

export interface DoWhileStmt {
  type: "DoWhile";
  body: Stmt[];
  condition: Expr;
  span: Span;
}

export interface ForInStmt {
  type: "ForIn";
  variable: string;
  variableSpan: Span;
  index?: string;
  indexSpan?: Span;
  iterable: Expr;
  body: Stmt[];
  span: Span;
}

export interface ForRangeStmt {
  type: "ForRange";
  variable: string;
  variableSpan: Span;
  start: Expr;
  end: Expr;
  body: Stmt[];
  span: Span;
}

export interface MatchStmt {
  type: "Match";
  subject: Expr;
  arms: MatchArm[];
  span: Span;
}

export interface SwitchCase {
  value: Expr;
  body: MatchArmBody;
  span: Span;
}

export interface SwitchStmt {
  type: "Switch";
  subject: Expr;
  cases: SwitchCase[];
  defaultBody?: Stmt[];
  span: Span;
}

export interface MatchArm {
  pattern?: Expr; // undefined = else arm
  guard?: Expr;
  body: MatchArmBody;
  span: Span;
}

export type MatchArmBody =
  | { kind: "expr"; expr: Expr }
  | { kind: "block"; stmts: Stmt[] };

export interface TryCatchStmt {
  type: "TryCatch";
  tryBody: Stmt[];
  catchVar?: string;
  catchVarSpan?: Span;
  catchBody: Stmt[];
  finallyBody?: Stmt[];
  span: Span;
}

export interface ThrowStmt {
  type: "Throw";
  expr: Expr;
  span: Span;
}

export interface ReturnStmt {
  type: "Return";
  expr?: Expr;
  span: Span;
}

export interface BreakStmt {
  type: "Break";
  span: Span;
}

export interface ContinueStmt {
  type: "Continue";
  span: Span;
}

export interface ImportAttribute {
  key: string;
  value: string;
  span: Span;
}

export interface ImportStmt {
  type: "Import";
  defaultName?: string;
  defaultNameSpan?: Span;
  names?: { name: string; span: Span }[];
  namespaceName?: string;
  namespaceNameSpan?: Span;
  source: string;
  attributes?: ImportAttribute[];
  span: Span;
}

export interface SideEffectImportStmt {
  type: "SideEffectImport";
  source: string;
  attributes?: ImportAttribute[];
  span: Span;
}

export interface UseStmt {
  type: "Use";
  path: string;
  span: Span;
}

export interface FromUseStmt {
  type: "FromUse";
  path: string;
  names: { name: string; span: Span }[];
  span: Span;
}

export interface ExportStmt {
  type: "Export";
  decl: Stmt;
  span: Span;
}

export interface ExportDefaultStmt {
  type: "ExportDefault";
  decl: Stmt;
  span: Span;
}

export interface PubStmt {
  type: "Public";
  decl: Stmt;
  span: Span;
}

export interface NamespaceStmt {
  type: "Namespace";
  name: string;
  nameSpan: Span;
  body: Stmt[];
  span: Span;
}

export interface TypeDeclStmt {
  type: "TypeDecl";
  name: string;
  nameSpan: Span;
  value: string;
  span: Span;
}

export interface DeleteStmt {
  type: "Delete";
  expr: Expr;
  span: Span;
}

export interface ExprStmt {
  type: "ExprStmt";
  expr: Expr;
  postfix?: PostfixModifier;
  span: Span;
}

export interface PostfixModifier {
  kind: "if" | "unless" | "for";
  condition?: Expr;
  variable?: string;
  iterable?: Expr;
}

// --- Expressions ---
export type Expr =
  | IntLitExpr
  | FloatLitExpr
  | BigIntLitExpr
  | StrLitExpr
  | RegexLitExpr
  | BoolLitExpr
  | NullLitExpr
  | UndefinedLitExpr
  | NanLitExpr
  | InfinityLitExpr
  | BlankExpr
  | IdentExpr
  | ThisExpr
  | SuperExpr
  | ArrayLitExpr
  | ObjectLitExpr
  | RangeExpr
  | BinOpExpr
  | UnaryExpr
  | CallExpr
  | DotAccessExpr
  | OptionalDotExpr
  | ComputedAccessExpr
  | SliceExpr
  | FnExpr
  | IfExpr
  | MatchExpr
  | TryExpr
  | PipeExpr
  | CoalExpr
  | YieldExpr
  | VoidExpr
  | IsCheckExpr
  | AsCastExpr
  | InstanceofExpr
  | TypeofExpr
  | AwaitExpr
  | NewExpr
  | DeleteExpr
  | GroupExpr;

export interface IntLitExpr {
  type: "IntLit";
  value: number;
  span: Span;
}

export interface FloatLitExpr {
  type: "FloatLit";
  value: number;
  span: Span;
}

export interface StrLitExpr {
  type: "StrLit";
  value: string;
  raw: string;
  span: Span;
}

export interface RegexLitExpr {
  type: "RegexLit";
  pattern: string;
  flags: string;
  span: Span;
}

export interface BoolLitExpr {
  type: "BoolLit";
  value: boolean;
  span: Span;
}

export interface NullLitExpr {
  type: "NullLit";
  span: Span;
}

export interface UndefinedLitExpr {
  type: "UndefinedLit";
  span: Span;
}

export interface NanLitExpr {
  type: "NanLit";
  span: Span;
}

export interface BigIntLitExpr {
  type: "BigIntLit";
  value: string;
  span: Span;
}

export interface InfinityLitExpr {
  type: "InfinityLit";
  span: Span;
}

export interface BlankExpr {
  type: "Blank";
  span: Span;
}

export interface IdentExpr {
  type: "Ident";
  name: string;
  span: Span;
}

export interface ThisExpr {
  type: "This";
  span: Span;
}

export interface SuperExpr {
  type: "Super";
  span: Span;
}

export interface ArrayLitExpr {
  type: "ArrayLit";
  elements: Expr[];
  span: Span;
}

export interface ObjectLitExpr {
  type: "ObjectLit";
  entries: ObjectEntry[];
  span: Span;
}

export interface ObjectEntry {
  key: string;
  keySpan: Span;
  value?: Expr; // shorthand if undefined
}

export interface RangeExpr {
  type: "Range";
  start: Expr;
  end: Expr;
  inclusive: boolean;
  span: Span;
}

export type BinaryOp =
  | "add" | "sub" | "mul" | "div" | "mod" | "pow" | "fdiv"
  | "eq" | "neq" | "lt" | "gt" | "le" | "ge"
  | "and" | "or"
  | "band" | "bor" | "bxor" | "shl" | "shr" | "ushr";

export interface BinOpExpr {
  type: "BinOp";
  op: BinaryOp;
  left: Expr;
  right: Expr;
  span: Span;
}

export interface UnaryExpr {
  type: "Unary";
  op: "not" | "neg" | "bnot";
  operand: Expr;
  span: Span;
}

export interface CallExpr {
  type: "Call";
  callee: Expr;
  args: Expr[];
  span: Span;
}

export interface DotAccessExpr {
  type: "DotAccess";
  object: Expr;
  member: string;
  memberSpan: Span;
  span: Span;
}

export interface OptionalDotExpr {
  type: "OptionalDot";
  object: Expr;
  member: string;
  memberSpan: Span;
  span: Span;
}

export interface ComputedAccessExpr {
  type: "ComputedAccess";
  object: Expr;
  index: Expr;
  span: Span;
}

export interface SliceExpr {
  type: "Slice";
  object: Expr;
  start: Expr;
  end: Expr;
  inclusive: boolean;
  span: Span;
}

export interface FnExpr {
  type: "FnExpr";
  params: Param[];
  returnType?: string;
  body: FnBody;
  isAsync: boolean;
  span: Span;
}

export interface IfExpr {
  type: "IfExpr";
  condition: Expr;
  thenBranch: Expr;
  elseBranch: Expr;
  span: Span;
}

export interface MatchExpr {
  type: "MatchExpr";
  subject: Expr;
  arms: MatchArm[];
  span: Span;
}

export interface TryExpr {
  type: "TryExpr";
  tryBody: Stmt[];
  catchVar?: string;
  catchBody: Stmt[];
  span: Span;
}

export interface PipeExpr {
  type: "Pipe";
  left: Expr;
  right: Expr;
  span: Span;
}

export interface CoalExpr {
  type: "Coal";
  left: Expr;
  right: Expr;
  span: Span;
}

export interface YieldExpr {
  type: "Yield";
  expr?: Expr;
  span: Span;
}

export interface VoidExpr {
  type: "Void";
  expr: Expr;
  span: Span;
}

export interface IsCheckExpr {
  type: "IsCheck";
  expr: Expr;
  typeName: string;
  span: Span;
}

export interface AsCastExpr {
  type: "AsCast";
  expr: Expr;
  typeName: string;
  span: Span;
}

export interface InstanceofExpr {
  type: "Instanceof";
  expr: Expr;
  className: string;
  span: Span;
}

export interface TypeofExpr {
  type: "Typeof";
  expr: Expr;
  span: Span;
}

export interface AwaitExpr {
  type: "Await";
  expr: Expr;
  span: Span;
}

export interface NewExpr {
  type: "New";
  callee: Expr;
  span: Span;
}

export interface DeleteExpr {
  type: "DeleteExpr";
  expr: Expr;
  span: Span;
}

export interface GroupExpr {
  type: "Group";
  expr: Expr;
  span: Span;
}
