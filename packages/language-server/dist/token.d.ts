export interface Position {
    line: number;
    column: number;
    offset: number;
}
export interface Span {
    start: Position;
    end: Position;
}
export declare enum TokenKind {
    Int = 0,
    Float = 1,
    BigInt = 2,// 100n, 0xFFn, 0b1010n
    Str = 3,
    Regex = 4,
    True = 5,
    False = 6,
    Ident = 7,
    Const = 8,
    Let = 9,
    Var = 10,
    Be = 11,
    Add = 12,
    Sub = 13,
    Mul = 14,
    Div = 15,
    Fdiv = 16,// fdiv (floor division)
    Mod = 17,
    Neg = 18,
    Pow = 19,
    Band = 20,
    Bor = 21,
    Bxor = 22,
    Bnot = 23,
    Shl = 24,
    Shr = 25,
    Ushr = 26,
    Eq = 27,
    Neq = 28,
    Lt = 29,
    Gt = 30,
    Le = 31,
    Ge = 32,
    And = 33,
    Or = 34,
    Not = 35,
    Fn = 36,
    Function = 37,// deprecated alias for fn
    Return = 38,
    To = 39,
    Gives = 40,
    Yield = 41,// generators
    If = 42,
    Elif = 43,
    Else = 44,
    Unless = 45,
    Then = 46,
    While = 47,
    Until = 48,
    Do = 49,// do-while
    For = 50,
    In = 51,
    Range = 52,
    Break = 53,
    Continue = 54,
    Match = 55,
    When = 56,
    Switch = 57,
    Case = 58,
    Default = 59,
    Blank = 60,
    Pipe = 61,
    Coal = 62,
    As = 63,
    Of = 64,
    Typeof = 65,
    Instanceof = 66,
    Type = 67,
    New = 68,
    Delete = 69,
    This = 70,
    Class = 71,
    Extends = 72,
    Super = 73,
    Static = 74,
    Private = 75,
    Protected = 76,// deprecated alias for private
    Get = 77,
    Set = 78,
    Async = 79,
    Await = 80,
    Void = 81,// void expression
    Try = 82,
    Catch = 83,
    Finally = 84,
    Throw = 85,
    Import = 86,
    From = 87,
    Export = 88,
    Default2 = 89,// reuse Default above; kept for clarity — see KEYWORDS
    Require = 90,
    Use = 91,
    Namespace = 92,
    Public = 93,// keyword is "public" (not "pub")
    All = 94,
    With = 95,
    Null = 96,
    Nil = 97,
    Undefined = 98,
    Nan = 99,
    Infinity = 100,
    List = 101,
    Object = 102,
    LBracket = 103,
    RBracket = 104,
    Comma = 105,
    Semicolon = 106,
    Dot = 107,
    OptionalDot = 108,
    Backslash = 109,
    DotDot = 110,
    DotDotDot = 111,
    Newline = 112,
    Indent = 113,
    Shebang = 114,
    Comment = 115,
    BlockComment = 116,
    Eof = 117,
    Error = 118
}
export interface Token {
    kind: TokenKind;
    text: string;
    value?: string | number;
    span: Span;
}
export declare const KEYWORDS: ReadonlyMap<string, TokenKind>;
//# sourceMappingURL=token.d.ts.map