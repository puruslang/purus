"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_MODIFIERS = exports.TOKEN_TYPES = void 0;
exports.computeSemanticTokens = computeSemanticTokens;
const token_1 = require("./token");
const symbols_1 = require("./symbols");
exports.TOKEN_TYPES = [
    "keyword",
    "variable",
    "function",
    "parameter",
    "string",
    "number",
    "operator",
    "comment",
    "type",
    "namespace",
    "regexp",
    "class",
    "property",
    "enumMember",
];
exports.TOKEN_MODIFIERS = [
    "declaration",
    "readonly",
    "async",
    "defaultLibrary",
];
const typeIndex = {};
exports.TOKEN_TYPES.forEach((t, i) => { typeIndex[t] = i; });
const modIndex = {};
exports.TOKEN_MODIFIERS.forEach((m, i) => { modIndex[m] = 1 << i; });
function computeSemanticTokens(tokens, rootScope) {
    const data = [];
    let prevLine = 0;
    let prevCol = 0;
    for (const token of tokens) {
        const mapped = mapToken(token, rootScope);
        if (!mapped)
            continue;
        const [tokenType, tokenMods] = mapped;
        const line = token.span.start.line;
        const col = token.span.start.column;
        // Skip multi-line tokens (LSP requires single-line unless multilineTokenSupport is declared)
        if (token.span.end.line !== token.span.start.line)
            continue;
        const length = token.span.end.column - token.span.start.column;
        if (length <= 0)
            continue;
        const deltaLine = line - prevLine;
        const deltaCol = deltaLine === 0 ? col - prevCol : col;
        data.push(deltaLine, deltaCol, length, tokenType, tokenMods);
        prevLine = line;
        prevCol = col;
    }
    return data;
}
function mapToken(token, rootScope) {
    switch (token.kind) {
        // Keywords
        case token_1.TokenKind.Const:
        case token_1.TokenKind.Let:
        case token_1.TokenKind.Var:
        case token_1.TokenKind.Be:
        case token_1.TokenKind.Fn:
        case token_1.TokenKind.Return:
        case token_1.TokenKind.To:
        case token_1.TokenKind.If:
        case token_1.TokenKind.Elif:
        case token_1.TokenKind.Else:
        case token_1.TokenKind.Unless:
        case token_1.TokenKind.Then:
        case token_1.TokenKind.While:
        case token_1.TokenKind.Until:
        case token_1.TokenKind.For:
        case token_1.TokenKind.In:
        case token_1.TokenKind.Range:
        case token_1.TokenKind.Break:
        case token_1.TokenKind.Continue:
        case token_1.TokenKind.Match:
        case token_1.TokenKind.When:
        case token_1.TokenKind.Try:
        case token_1.TokenKind.Catch:
        case token_1.TokenKind.Finally:
        case token_1.TokenKind.Throw:
        case token_1.TokenKind.Import:
        case token_1.TokenKind.From:
        case token_1.TokenKind.Export:
        case token_1.TokenKind.Default:
        case token_1.TokenKind.Require:
        case token_1.TokenKind.Use:
        case token_1.TokenKind.Namespace:
        case token_1.TokenKind.Public:
        case token_1.TokenKind.All:
        case token_1.TokenKind.With:
        case token_1.TokenKind.Async:
        case token_1.TokenKind.Await:
        case token_1.TokenKind.New:
        case token_1.TokenKind.Delete:
        case token_1.TokenKind.This:
        case token_1.TokenKind.Class:
        case token_1.TokenKind.Extends:
        case token_1.TokenKind.Super:
        case token_1.TokenKind.Static:
        case token_1.TokenKind.Private:
        case token_1.TokenKind.Get:
        case token_1.TokenKind.Set:
        case token_1.TokenKind.Gives:
        case token_1.TokenKind.Type:
        case token_1.TokenKind.Yield:
        case token_1.TokenKind.Do:
        case token_1.TokenKind.Void:
        case token_1.TokenKind.Function:
        case token_1.TokenKind.Protected:
        case token_1.TokenKind.Switch:
        case token_1.TokenKind.Case:
        case token_1.TokenKind.Blank:
            return [typeIndex["keyword"], 0];
        // Operators
        case token_1.TokenKind.Add:
        case token_1.TokenKind.Sub:
        case token_1.TokenKind.Mul:
        case token_1.TokenKind.Div:
        case token_1.TokenKind.Mod:
        case token_1.TokenKind.Pow:
        case token_1.TokenKind.Neg:
        case token_1.TokenKind.Fdiv:
        case token_1.TokenKind.Band:
        case token_1.TokenKind.Bor:
        case token_1.TokenKind.Bxor:
        case token_1.TokenKind.Bnot:
        case token_1.TokenKind.Shl:
        case token_1.TokenKind.Shr:
        case token_1.TokenKind.Ushr:
        case token_1.TokenKind.Eq:
        case token_1.TokenKind.Neq:
        case token_1.TokenKind.Lt:
        case token_1.TokenKind.Gt:
        case token_1.TokenKind.Le:
        case token_1.TokenKind.Ge:
        case token_1.TokenKind.And:
        case token_1.TokenKind.Or:
        case token_1.TokenKind.Not:
        case token_1.TokenKind.Pipe:
        case token_1.TokenKind.Coal:
        case token_1.TokenKind.As:
        case token_1.TokenKind.Of:
        case token_1.TokenKind.Typeof:
        case token_1.TokenKind.Instanceof:
            return [typeIndex["operator"], 0];
        // Literals
        case token_1.TokenKind.Int:
        case token_1.TokenKind.Float:
        case token_1.TokenKind.BigInt:
            return [typeIndex["number"], 0];
        case token_1.TokenKind.Str:
            return [typeIndex["string"], 0];
        case token_1.TokenKind.Regex:
            return [typeIndex["regexp"], 0];
        case token_1.TokenKind.True:
        case token_1.TokenKind.False:
        case token_1.TokenKind.Null:
        case token_1.TokenKind.Nil:
        case token_1.TokenKind.Undefined:
        case token_1.TokenKind.Nan:
        case token_1.TokenKind.Infinity:
            return [typeIndex["enumMember"], 0];
        // Comments
        case token_1.TokenKind.Comment:
        case token_1.TokenKind.BlockComment:
            return [typeIndex["comment"], 0];
        // Collection keywords
        case token_1.TokenKind.List:
        case token_1.TokenKind.Object:
            return [typeIndex["keyword"], 0];
        // Identifiers - classify using symbol table
        case token_1.TokenKind.Ident: {
            const scope = (0, symbols_1.findScopeAtPosition)(rootScope, token.span.start.line, token.span.start.column);
            const sym = (0, symbols_1.lookupSymbol)(scope, token.text);
            if (sym) {
                switch (sym.kind) {
                    case symbols_1.SymbolKind.Function:
                        return [typeIndex["function"], 0];
                    case symbols_1.SymbolKind.Parameter:
                        return [typeIndex["parameter"], 0];
                    case symbols_1.SymbolKind.Class:
                        return [typeIndex["class"], 0];
                    case symbols_1.SymbolKind.Method:
                        return [typeIndex["function"], 0];
                    case symbols_1.SymbolKind.Property:
                        return [typeIndex["property"], 0];
                    case symbols_1.SymbolKind.Namespace:
                        return [typeIndex["namespace"], 0];
                    case symbols_1.SymbolKind.Import:
                        return [typeIndex["namespace"], 0];
                    case symbols_1.SymbolKind.Type:
                        return [typeIndex["type"], 0];
                    case symbols_1.SymbolKind.Variable:
                        return [typeIndex["variable"], 0];
                }
            }
            return [typeIndex["variable"], 0];
        }
        default:
            return null;
    }
}
//# sourceMappingURL=semantic-tokens.js.map