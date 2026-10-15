import { Token, TokenKind } from "./token";
import { Scope, lookupSymbol, findScopeAtPosition, SymbolKind } from "./symbols";

export const TOKEN_TYPES = [
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
] as const;

export const TOKEN_MODIFIERS = [
  "declaration",
  "readonly",
  "async",
  "defaultLibrary",
] as const;

export type TokenTypeIndex = number;
export type TokenModifierBitset = number;

const typeIndex: Record<string, number> = {};
TOKEN_TYPES.forEach((t, i) => { typeIndex[t] = i; });

const modIndex: Record<string, number> = {};
TOKEN_MODIFIERS.forEach((m, i) => { modIndex[m] = 1 << i; });

export function computeSemanticTokens(tokens: Token[], rootScope: Scope): number[] {
  const data: number[] = [];
  let prevLine = 0;
  let prevCol = 0;

  for (const token of tokens) {
    const mapped = mapToken(token, rootScope);
    if (!mapped) continue;

    const [tokenType, tokenMods] = mapped;
    const line = token.span.start.line;
    const col = token.span.start.column;

    // Skip multi-line tokens (LSP requires single-line unless multilineTokenSupport is declared)
    if (token.span.end.line !== token.span.start.line) continue;

    const length = token.span.end.column - token.span.start.column;
    if (length <= 0) continue;

    const deltaLine = line - prevLine;
    const deltaCol = deltaLine === 0 ? col - prevCol : col;

    data.push(deltaLine, deltaCol, length, tokenType, tokenMods);
    prevLine = line;
    prevCol = col;
  }

  return data;
}

function mapToken(token: Token, rootScope: Scope): [TokenTypeIndex, TokenModifierBitset] | null {
  switch (token.kind) {
    // Keywords
    case TokenKind.Const:
    case TokenKind.Let:
    case TokenKind.Var:
    case TokenKind.Be:
    case TokenKind.Fn:
    case TokenKind.Return:
    case TokenKind.To:
    case TokenKind.If:
    case TokenKind.Elif:
    case TokenKind.Else:
    case TokenKind.Unless:
    case TokenKind.Then:
    case TokenKind.While:
    case TokenKind.Until:
    case TokenKind.For:
    case TokenKind.In:
    case TokenKind.Range:
    case TokenKind.Break:
    case TokenKind.Continue:
    case TokenKind.Match:
    case TokenKind.When:
    case TokenKind.Try:
    case TokenKind.Catch:
    case TokenKind.Finally:
    case TokenKind.Throw:
    case TokenKind.Import:
    case TokenKind.From:
    case TokenKind.Export:
    case TokenKind.Default:
    case TokenKind.Require:
    case TokenKind.Use:
    case TokenKind.Namespace:
    case TokenKind.Public:
    case TokenKind.All:
    case TokenKind.With:
    case TokenKind.Async:
    case TokenKind.Await:
    case TokenKind.New:
    case TokenKind.Delete:
    case TokenKind.This:
    case TokenKind.Class:
    case TokenKind.Extends:
    case TokenKind.Super:
    case TokenKind.Static:
    case TokenKind.Private:
    case TokenKind.Get:
    case TokenKind.Set:
    case TokenKind.Gives:
    case TokenKind.Type:
    case TokenKind.Yield:
    case TokenKind.Do:
    case TokenKind.Void:
    case TokenKind.Function:
    case TokenKind.Protected:
    case TokenKind.Switch:
    case TokenKind.Case:
    case TokenKind.Blank:
      return [typeIndex["keyword"], 0];

    // Operators
    case TokenKind.Add:
    case TokenKind.Sub:
    case TokenKind.Mul:
    case TokenKind.Div:
    case TokenKind.Mod:
    case TokenKind.Pow:
    case TokenKind.Neg:
    case TokenKind.Fdiv:
    case TokenKind.Band:
    case TokenKind.Bor:
    case TokenKind.Bxor:
    case TokenKind.Bnot:
    case TokenKind.Shl:
    case TokenKind.Shr:
    case TokenKind.Ushr:
    case TokenKind.Eq:
    case TokenKind.Neq:
    case TokenKind.Lt:
    case TokenKind.Gt:
    case TokenKind.Le:
    case TokenKind.Ge:
    case TokenKind.And:
    case TokenKind.Or:
    case TokenKind.Not:
    case TokenKind.Pipe:
    case TokenKind.Coal:
    case TokenKind.As:
    case TokenKind.Of:
    case TokenKind.Typeof:
    case TokenKind.Instanceof:
      return [typeIndex["operator"], 0];

    // Literals
    case TokenKind.Int:
    case TokenKind.Float:
    case TokenKind.BigInt:
      return [typeIndex["number"], 0];

    case TokenKind.Str:
      return [typeIndex["string"], 0];

    case TokenKind.Regex:
      return [typeIndex["regexp"], 0];

    case TokenKind.True:
    case TokenKind.False:
    case TokenKind.Null:
    case TokenKind.Nil:
    case TokenKind.Undefined:
    case TokenKind.Nan:
    case TokenKind.Infinity:
      return [typeIndex["enumMember"], 0];

    // Comments
    case TokenKind.Comment:
    case TokenKind.BlockComment:
      return [typeIndex["comment"], 0];

    // Collection keywords
    case TokenKind.List:
    case TokenKind.Object:
      return [typeIndex["keyword"], 0];

    // Identifiers - classify using symbol table
    case TokenKind.Ident: {
      const scope = findScopeAtPosition(rootScope, token.span.start.line, token.span.start.column);
      const sym = lookupSymbol(scope, token.text);
      if (sym) {
        switch (sym.kind) {
          case SymbolKind.Function:
            return [typeIndex["function"], 0];
          case SymbolKind.Parameter:
            return [typeIndex["parameter"], 0];
          case SymbolKind.Class:
            return [typeIndex["class"], 0];
          case SymbolKind.Method:
            return [typeIndex["function"], 0];
          case SymbolKind.Property:
            return [typeIndex["property"], 0];
          case SymbolKind.Namespace:
            return [typeIndex["namespace"], 0];
          case SymbolKind.Import:
            return [typeIndex["namespace"], 0];
          case SymbolKind.Type:
            return [typeIndex["type"], 0];
          case SymbolKind.Variable:
            return [typeIndex["variable"], 0];
        }
      }
      return [typeIndex["variable"], 0];
    }

    default:
      return null;
  }
}
