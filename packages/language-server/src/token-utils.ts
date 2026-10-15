import { Token, TokenKind } from "./token";

export function findIdentifierAtPosition(
  tokens: Token[],
  source: string,
  line: number,
  col: number
): string | null {
  for (const t of tokens) {
    if (t.kind !== TokenKind.Ident) continue;
    const s = t.span;
    if (s.start.line > line || s.end.line < line) continue;
    if (s.start.line === line && col < s.start.column) continue;
    if (s.end.line === line && col >= s.end.column) continue;
    return t.text;
  }
  return null;
}
