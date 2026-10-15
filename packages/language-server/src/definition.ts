import { Location, Position, Range } from "vscode-languageserver/node";
import { Scope, findSymbolAtPosition, findScopeAtPosition, lookupSymbol } from "./symbols";
import { Token, TokenKind } from "./token";
import { Span } from "./token";
import { findIdentifierAtPosition } from "./token-utils";

export function getDefinition(
  rootScope: Scope,
  uri: string,
  line: number,
  col: number,
  source: string,
  tokens: Token[]
): Location | null {
  const sym = findSymbolAtPosition(rootScope, line, col);
  if (!sym) {
    const word = findIdentifierAtPosition(tokens, source, line, col);
    if (!word) return null;
    const scope = findScopeAtPosition(rootScope, line, col);
    const fallback = lookupSymbol(scope, word);
    if (!fallback) return null;
    return { uri, range: spanToRange(fallback.nameSpan) };
  }

  return {
    uri,
    range: spanToRange(sym.nameSpan),
  };
}

function spanToRange(span: Span): Range {
  return Range.create(
    Position.create(span.start.line, span.start.column),
    Position.create(span.end.line, span.end.column)
  );
}
