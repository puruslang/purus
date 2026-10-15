"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYWORDS = exports.TokenKind = void 0;
var TokenKind;
(function (TokenKind) {
    // Literals
    TokenKind[TokenKind["Int"] = 0] = "Int";
    TokenKind[TokenKind["Float"] = 1] = "Float";
    TokenKind[TokenKind["BigInt"] = 2] = "BigInt";
    TokenKind[TokenKind["Str"] = 3] = "Str";
    TokenKind[TokenKind["Regex"] = 4] = "Regex";
    TokenKind[TokenKind["True"] = 5] = "True";
    TokenKind[TokenKind["False"] = 6] = "False";
    // Identifiers
    TokenKind[TokenKind["Ident"] = 7] = "Ident";
    // Declaration
    TokenKind[TokenKind["Const"] = 8] = "Const";
    TokenKind[TokenKind["Let"] = 9] = "Let";
    TokenKind[TokenKind["Var"] = 10] = "Var";
    TokenKind[TokenKind["Be"] = 11] = "Be";
    // Arithmetic
    TokenKind[TokenKind["Add"] = 12] = "Add";
    TokenKind[TokenKind["Sub"] = 13] = "Sub";
    TokenKind[TokenKind["Mul"] = 14] = "Mul";
    TokenKind[TokenKind["Div"] = 15] = "Div";
    TokenKind[TokenKind["Fdiv"] = 16] = "Fdiv";
    TokenKind[TokenKind["Mod"] = 17] = "Mod";
    TokenKind[TokenKind["Neg"] = 18] = "Neg";
    TokenKind[TokenKind["Pow"] = 19] = "Pow";
    // Bitwise
    TokenKind[TokenKind["Band"] = 20] = "Band";
    TokenKind[TokenKind["Bor"] = 21] = "Bor";
    TokenKind[TokenKind["Bxor"] = 22] = "Bxor";
    TokenKind[TokenKind["Bnot"] = 23] = "Bnot";
    TokenKind[TokenKind["Shl"] = 24] = "Shl";
    TokenKind[TokenKind["Shr"] = 25] = "Shr";
    TokenKind[TokenKind["Ushr"] = 26] = "Ushr";
    // Comparison
    TokenKind[TokenKind["Eq"] = 27] = "Eq";
    TokenKind[TokenKind["Neq"] = 28] = "Neq";
    TokenKind[TokenKind["Lt"] = 29] = "Lt";
    TokenKind[TokenKind["Gt"] = 30] = "Gt";
    TokenKind[TokenKind["Le"] = 31] = "Le";
    TokenKind[TokenKind["Ge"] = 32] = "Ge";
    // Logical
    TokenKind[TokenKind["And"] = 33] = "And";
    TokenKind[TokenKind["Or"] = 34] = "Or";
    TokenKind[TokenKind["Not"] = 35] = "Not";
    // Function
    TokenKind[TokenKind["Fn"] = 36] = "Fn";
    TokenKind[TokenKind["Function"] = 37] = "Function";
    TokenKind[TokenKind["Return"] = 38] = "Return";
    TokenKind[TokenKind["To"] = 39] = "To";
    TokenKind[TokenKind["Gives"] = 40] = "Gives";
    TokenKind[TokenKind["Yield"] = 41] = "Yield";
    // Conditional
    TokenKind[TokenKind["If"] = 42] = "If";
    TokenKind[TokenKind["Elif"] = 43] = "Elif";
    TokenKind[TokenKind["Else"] = 44] = "Else";
    TokenKind[TokenKind["Unless"] = 45] = "Unless";
    TokenKind[TokenKind["Then"] = 46] = "Then";
    // Loop
    TokenKind[TokenKind["While"] = 47] = "While";
    TokenKind[TokenKind["Until"] = 48] = "Until";
    TokenKind[TokenKind["Do"] = 49] = "Do";
    TokenKind[TokenKind["For"] = 50] = "For";
    TokenKind[TokenKind["In"] = 51] = "In";
    TokenKind[TokenKind["Range"] = 52] = "Range";
    TokenKind[TokenKind["Break"] = 53] = "Break";
    TokenKind[TokenKind["Continue"] = 54] = "Continue";
    // Pattern matching
    TokenKind[TokenKind["Match"] = 55] = "Match";
    TokenKind[TokenKind["When"] = 56] = "When";
    TokenKind[TokenKind["Switch"] = 57] = "Switch";
    TokenKind[TokenKind["Case"] = 58] = "Case";
    TokenKind[TokenKind["Default"] = 59] = "Default";
    // Wildcard (v0.11.0)
    TokenKind[TokenKind["Blank"] = 60] = "Blank";
    // Pipe / Nullish
    TokenKind[TokenKind["Pipe"] = 61] = "Pipe";
    TokenKind[TokenKind["Coal"] = 62] = "Coal";
    // Type system
    TokenKind[TokenKind["As"] = 63] = "As";
    TokenKind[TokenKind["Of"] = 64] = "Of";
    TokenKind[TokenKind["Typeof"] = 65] = "Typeof";
    TokenKind[TokenKind["Instanceof"] = 66] = "Instanceof";
    TokenKind[TokenKind["Type"] = 67] = "Type";
    // OOP
    TokenKind[TokenKind["New"] = 68] = "New";
    TokenKind[TokenKind["Delete"] = 69] = "Delete";
    TokenKind[TokenKind["This"] = 70] = "This";
    TokenKind[TokenKind["Class"] = 71] = "Class";
    TokenKind[TokenKind["Extends"] = 72] = "Extends";
    TokenKind[TokenKind["Super"] = 73] = "Super";
    TokenKind[TokenKind["Static"] = 74] = "Static";
    TokenKind[TokenKind["Private"] = 75] = "Private";
    TokenKind[TokenKind["Protected"] = 76] = "Protected";
    TokenKind[TokenKind["Get"] = 77] = "Get";
    TokenKind[TokenKind["Set"] = 78] = "Set";
    // Async
    TokenKind[TokenKind["Async"] = 79] = "Async";
    TokenKind[TokenKind["Await"] = 80] = "Await";
    TokenKind[TokenKind["Void"] = 81] = "Void";
    // Error handling
    TokenKind[TokenKind["Try"] = 82] = "Try";
    TokenKind[TokenKind["Catch"] = 83] = "Catch";
    TokenKind[TokenKind["Finally"] = 84] = "Finally";
    TokenKind[TokenKind["Throw"] = 85] = "Throw";
    // Module
    TokenKind[TokenKind["Import"] = 86] = "Import";
    TokenKind[TokenKind["From"] = 87] = "From";
    TokenKind[TokenKind["Export"] = 88] = "Export";
    TokenKind[TokenKind["Default2"] = 89] = "Default2";
    TokenKind[TokenKind["Require"] = 90] = "Require";
    TokenKind[TokenKind["Use"] = 91] = "Use";
    TokenKind[TokenKind["Namespace"] = 92] = "Namespace";
    TokenKind[TokenKind["Public"] = 93] = "Public";
    TokenKind[TokenKind["All"] = 94] = "All";
    TokenKind[TokenKind["With"] = 95] = "With";
    // Null / literal family
    TokenKind[TokenKind["Null"] = 96] = "Null";
    TokenKind[TokenKind["Nil"] = 97] = "Nil";
    TokenKind[TokenKind["Undefined"] = 98] = "Undefined";
    TokenKind[TokenKind["Nan"] = 99] = "Nan";
    TokenKind[TokenKind["Infinity"] = 100] = "Infinity";
    // Collection
    TokenKind[TokenKind["List"] = 101] = "List";
    TokenKind[TokenKind["Object"] = 102] = "Object";
    // Punctuation
    TokenKind[TokenKind["LBracket"] = 103] = "LBracket";
    TokenKind[TokenKind["RBracket"] = 104] = "RBracket";
    TokenKind[TokenKind["Comma"] = 105] = "Comma";
    TokenKind[TokenKind["Semicolon"] = 106] = "Semicolon";
    TokenKind[TokenKind["Dot"] = 107] = "Dot";
    TokenKind[TokenKind["OptionalDot"] = 108] = "OptionalDot";
    TokenKind[TokenKind["Backslash"] = 109] = "Backslash";
    TokenKind[TokenKind["DotDot"] = 110] = "DotDot";
    TokenKind[TokenKind["DotDotDot"] = 111] = "DotDotDot";
    // Whitespace-significant
    TokenKind[TokenKind["Newline"] = 112] = "Newline";
    TokenKind[TokenKind["Indent"] = 113] = "Indent";
    // Trivia
    TokenKind[TokenKind["Shebang"] = 114] = "Shebang";
    TokenKind[TokenKind["Comment"] = 115] = "Comment";
    TokenKind[TokenKind["BlockComment"] = 116] = "BlockComment";
    // Special
    TokenKind[TokenKind["Eof"] = 117] = "Eof";
    TokenKind[TokenKind["Error"] = 118] = "Error";
})(TokenKind || (exports.TokenKind = TokenKind = {}));
exports.KEYWORDS = new Map([
    // Declaration
    ["const", TokenKind.Const],
    ["let", TokenKind.Let],
    ["var", TokenKind.Var],
    ["be", TokenKind.Be],
    // Arithmetic
    ["add", TokenKind.Add],
    ["sub", TokenKind.Sub],
    ["mul", TokenKind.Mul],
    ["div", TokenKind.Div],
    ["fdiv", TokenKind.Fdiv],
    ["mod", TokenKind.Mod],
    ["neg", TokenKind.Neg],
    ["pow", TokenKind.Pow],
    // Bitwise
    ["band", TokenKind.Band],
    ["bor", TokenKind.Bor],
    ["bxor", TokenKind.Bxor],
    ["bnot", TokenKind.Bnot],
    ["shl", TokenKind.Shl],
    ["shr", TokenKind.Shr],
    ["ushr", TokenKind.Ushr],
    // Comparison
    ["eq", TokenKind.Eq],
    ["neq", TokenKind.Neq],
    ["lt", TokenKind.Lt],
    ["gt", TokenKind.Gt],
    ["le", TokenKind.Le],
    ["ge", TokenKind.Ge],
    // Logical
    ["and", TokenKind.And],
    ["or", TokenKind.Or],
    ["not", TokenKind.Not],
    // Function
    ["fn", TokenKind.Fn],
    ["function", TokenKind.Function],
    ["return", TokenKind.Return],
    ["to", TokenKind.To],
    ["gives", TokenKind.Gives],
    ["yield", TokenKind.Yield],
    // Conditional
    ["if", TokenKind.If],
    ["elif", TokenKind.Elif],
    ["else", TokenKind.Else],
    ["unless", TokenKind.Unless],
    ["then", TokenKind.Then],
    // Loop
    ["while", TokenKind.While],
    ["until", TokenKind.Until],
    ["do", TokenKind.Do],
    ["for", TokenKind.For],
    ["in", TokenKind.In],
    ["range", TokenKind.Range],
    ["break", TokenKind.Break],
    ["continue", TokenKind.Continue],
    // Pattern matching
    ["match", TokenKind.Match],
    ["when", TokenKind.When],
    ["switch", TokenKind.Switch],
    ["case", TokenKind.Case],
    ["default", TokenKind.Default],
    // Wildcard (v0.11.0)
    ["blank", TokenKind.Blank],
    // Pipe / Nullish
    ["pipe", TokenKind.Pipe],
    ["coal", TokenKind.Coal],
    // Type system
    ["as", TokenKind.As],
    ["of", TokenKind.Of],
    ["typeof", TokenKind.Typeof],
    ["instanceof", TokenKind.Instanceof],
    ["type", TokenKind.Type],
    // OOP
    ["new", TokenKind.New],
    ["delete", TokenKind.Delete],
    ["this", TokenKind.This],
    ["class", TokenKind.Class],
    ["extends", TokenKind.Extends],
    ["super", TokenKind.Super],
    ["static", TokenKind.Static],
    ["private", TokenKind.Private],
    ["protected", TokenKind.Protected],
    ["get", TokenKind.Get],
    ["set", TokenKind.Set],
    // Async / void
    ["async", TokenKind.Async],
    ["await", TokenKind.Await],
    ["void", TokenKind.Void],
    // Error handling
    ["try", TokenKind.Try],
    ["catch", TokenKind.Catch],
    ["finally", TokenKind.Finally],
    ["throw", TokenKind.Throw],
    // Module
    ["import", TokenKind.Import],
    ["from", TokenKind.From],
    ["export", TokenKind.Export],
    ["require", TokenKind.Require],
    ["use", TokenKind.Use],
    ["namespace", TokenKind.Namespace],
    ["public", TokenKind.Public],
    ["all", TokenKind.All],
    ["with", TokenKind.With],
    // Null / literal family
    ["true", TokenKind.True],
    ["false", TokenKind.False],
    ["null", TokenKind.Null],
    ["nil", TokenKind.Nil],
    ["undefined", TokenKind.Undefined],
    ["nan", TokenKind.Nan],
    ["infinity", TokenKind.Infinity],
    // Collection
    ["list", TokenKind.List],
    ["object", TokenKind.Object],
]);
//# sourceMappingURL=token.js.map