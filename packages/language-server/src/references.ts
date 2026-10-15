import { Location, Position, Range } from "vscode-languageserver/node";
import { Scope, findSymbolAtPosition, findScopeAtPosition, lookupSymbol } from "./symbols";
import { Token } from "./token";
import { Span } from "./token";
import { findIdentifierAtPosition } from "./token-utils";

export function getReferences(
  rootScope: Scope,
  uri: string,
  line: number,
  col: number,
  source: string,
  includeDeclaration: boolean,
  tokens: Token[]
): Location[] {
  let sym = findSymbolAtPosition(rootScope, line, col);
  if (!sym) {
    const word = findIdentifierAtPosition(tokens, source, line, col);
    if (!word) return [];
    const scope = findScopeAtPosition(rootScope, line, col);
    sym = lookupSymbol(scope, word);
    if (!sym) return [];
  }

  const locations: Location[] = [];

  if (includeDeclaration) {
    locations.push({ uri, range: spanToRange(sym.nameSpan) });
  }

  for (const ref of sym.references) {
    locations.push({ uri, range: spanToRange(ref) });
  }

  return locations;
}

function spanToRange(span: Span): Range {
  return Range.create(
    Position.create(span.start.line, span.start.column),
    Position.create(span.end.line, span.end.column)
  );
}
