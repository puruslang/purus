export interface Position {
  line: number;
  column: number;
  offset: number;
}

export interface Span {
  start: Position;
  end: Position;
}

export enum TokenKind {
  // Literals
  Int,
  Float,
  BigInt,   // 100n, 0xFFn, 0b1010n
  Str,
  Regex,
  True,
  False,

  // Identifiers
  Ident,

  // Declaration
  Const,
  Let,
  Var,
  Be,

  // Arithmetic
  Add,
  Sub,
  Mul,
  Div,
  Fdiv,   // fdiv (floor division)
  Mod,
  Neg,
  Pow,

  // Bitwise
  Band,
  Bor,
  Bxor,
  Bnot,
  Shl,
  Shr,
  Ushr,

  // Comparison
  Eq,
  Neq,
  Lt,
  Gt,
  Le,
  Ge,

  // Logical
  And,
  Or,
  Not,

  // Function
  Fn,
  Function,   // deprecated alias for fn
  Return,
  To,
  Gives,
  Yield,      // generators

  // Conditional
  If,
  Elif,
  Else,
  Unless,
  Then,

  // Loop
  While,
  Until,
  Do,         // do-while
  For,
  In,
  Range,
  Break,
  Continue,

  // Pattern matching
  Match,
  When,
  Switch,
  Case,
  Default,

  // Wildcard (v0.11.0)
  Blank,

  // Pipe / Nullish
  Pipe,
  Coal,

  // Type system
  As,
  Of,
  Typeof,
  Instanceof,
  Type,

  // OOP
  New,
  Delete,
  This,
  Class,
  Extends,
  Super,
  Static,
  Private,
  Protected,  // deprecated alias for private
  Get,
  Set,

  // Async
  Async,
  Await,
  Void,       // void expression

  // Error handling
  Try,
  Catch,
  Finally,
  Throw,

  // Module
  Import,
  From,
  Export,
  Default2,   // reuse Default above; kept for clarity — see KEYWORDS
  Require,
  Use,
  Namespace,
  Public,     // keyword is "public" (not "pub")
  All,
  With,

  // Null / literal family
  Null,
  Nil,
  Undefined,
  Nan,
  Infinity,

  // Collection
  List,
  Object,

  // Punctuation
  LBracket,
  RBracket,
  Comma,
  Semicolon,
  Dot,
  OptionalDot,
  Backslash,
  DotDot,
  DotDotDot,

  // Whitespace-significant
  Newline,
  Indent,

  // Trivia
  Shebang,
  Comment,
  BlockComment,

  // Special
  Eof,
  Error,
}

export interface Token {
  kind: TokenKind;
  text: string;
  value?: string | number;
  span: Span;
}

export const KEYWORDS: ReadonlyMap<string, TokenKind> = new Map([
  // Declaration
  ["const",     TokenKind.Const],
  ["let",       TokenKind.Let],
  ["var",       TokenKind.Var],
  ["be",        TokenKind.Be],

  // Arithmetic
  ["add",       TokenKind.Add],
  ["sub",       TokenKind.Sub],
  ["mul",       TokenKind.Mul],
  ["div",       TokenKind.Div],
  ["fdiv",      TokenKind.Fdiv],
  ["mod",       TokenKind.Mod],
  ["neg",       TokenKind.Neg],
  ["pow",       TokenKind.Pow],

  // Bitwise
  ["band",      TokenKind.Band],
  ["bor",       TokenKind.Bor],
  ["bxor",      TokenKind.Bxor],
  ["bnot",      TokenKind.Bnot],
  ["shl",       TokenKind.Shl],
  ["shr",       TokenKind.Shr],
  ["ushr",      TokenKind.Ushr],

  // Comparison
  ["eq",        TokenKind.Eq],
  ["neq",       TokenKind.Neq],
  ["lt",        TokenKind.Lt],
  ["gt",        TokenKind.Gt],
  ["le",        TokenKind.Le],
  ["ge",        TokenKind.Ge],

  // Logical
  ["and",       TokenKind.And],
  ["or",        TokenKind.Or],
  ["not",       TokenKind.Not],

  // Function
  ["fn",        TokenKind.Fn],
  ["function",  TokenKind.Function],
  ["return",    TokenKind.Return],
  ["to",        TokenKind.To],
  ["gives",     TokenKind.Gives],
  ["yield",     TokenKind.Yield],

  // Conditional
  ["if",        TokenKind.If],
  ["elif",      TokenKind.Elif],
  ["else",      TokenKind.Else],
  ["unless",    TokenKind.Unless],
  ["then",      TokenKind.Then],

  // Loop
  ["while",     TokenKind.While],
  ["until",     TokenKind.Until],
  ["do",        TokenKind.Do],
  ["for",       TokenKind.For],
  ["in",        TokenKind.In],
  ["range",     TokenKind.Range],
  ["break",     TokenKind.Break],
  ["continue",  TokenKind.Continue],

  // Pattern matching
  ["match",     TokenKind.Match],
  ["when",      TokenKind.When],
  ["switch",    TokenKind.Switch],
  ["case",      TokenKind.Case],
  ["default",   TokenKind.Default],

  // Wildcard (v0.11.0)
  ["blank",     TokenKind.Blank],

  // Pipe / Nullish
  ["pipe",      TokenKind.Pipe],
  ["coal",      TokenKind.Coal],

  // Type system
  ["as",        TokenKind.As],
  ["of",        TokenKind.Of],
  ["typeof",    TokenKind.Typeof],
  ["instanceof",TokenKind.Instanceof],
  ["type",      TokenKind.Type],

  // OOP
  ["new",       TokenKind.New],
  ["delete",    TokenKind.Delete],
  ["this",      TokenKind.This],
  ["class",     TokenKind.Class],
  ["extends",   TokenKind.Extends],
  ["super",     TokenKind.Super],
  ["static",    TokenKind.Static],
  ["private",   TokenKind.Private],
  ["protected", TokenKind.Protected],
  ["get",       TokenKind.Get],
  ["set",       TokenKind.Set],

  // Async / void
  ["async",     TokenKind.Async],
  ["await",     TokenKind.Await],
  ["void",      TokenKind.Void],

  // Error handling
  ["try",       TokenKind.Try],
  ["catch",     TokenKind.Catch],
  ["finally",   TokenKind.Finally],
  ["throw",     TokenKind.Throw],

  // Module
  ["import",    TokenKind.Import],
  ["from",      TokenKind.From],
  ["export",    TokenKind.Export],
  ["require",   TokenKind.Require],
  ["use",       TokenKind.Use],
  ["namespace", TokenKind.Namespace],
  ["public",    TokenKind.Public],
  ["all",       TokenKind.All],
  ["with",      TokenKind.With],

  // Null / literal family
  ["true",      TokenKind.True],
  ["false",     TokenKind.False],
  ["null",      TokenKind.Null],
  ["nil",       TokenKind.Nil],
  ["undefined", TokenKind.Undefined],
  ["nan",       TokenKind.Nan],
  ["infinity",  TokenKind.Infinity],

  // Collection
  ["list",      TokenKind.List],
  ["object",    TokenKind.Object],
]);
