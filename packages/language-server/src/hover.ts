import { Hover, MarkupKind } from "vscode-languageserver/node";
import { Scope, findSymbolAtPosition, findScopeAtPosition, lookupSymbol, SymbolKind } from "./symbols";
import { Token, TokenKind } from "./token";
import { getKeywordInfo } from "./keywords";
import { findIdentifierAtPosition } from "./token-utils";

export function getHoverInfo(
  rootScope: Scope,
  source: string,
  line: number,
  col: number,
  tokens: Token[]
): Hover | null {
  // Check keyword by finding the token at position (keywords are also tokens)
  const kwWord = findKeywordOrIdentAtPosition(tokens, line, col);
  if (kwWord) {
    const kwInfo = getKeywordInfo(kwWord);
    if (kwInfo) {
      return {
        contents: {
          kind: MarkupKind.Markdown,
          value: `**\`${kwInfo.label}\`** — ${kwInfo.detail}\n\n${kwInfo.documentation}`,
        },
      };
    }
  }

  // Look up user-defined symbol (position-based, then name-based fallback)
  let sym = findSymbolAtPosition(rootScope, line, col);
  if (!sym) {
    const word = findIdentifierAtPosition(tokens, source, line, col);
    if (!word) return null;
    const scope = findScopeAtPosition(rootScope, line, col);
    sym = lookupSymbol(scope, word);
    if (!sym) return null;
  }

  let markdown = "";

  switch (sym.kind) {
    case SymbolKind.Function:
      markdown = `**fn** \`${sym.name}\``;
      if (sym.params && sym.params.length > 0) {
        const paramStr = sym.params.map((p) =>
          p.typeAnnotation ? `${p.name} of ${p.typeAnnotation}` : p.name
        ).join("; ");
        markdown += ` ${paramStr}`;
      }
      if (sym.returnType) {
        markdown += ` gives ${sym.returnType}`;
      }
      if (sym.isAsync) {
        markdown = `**async** ${markdown}`;
      }
      break;

    case SymbolKind.Variable:
      markdown = `**${sym.detail || `variable \`${sym.name}\``}**`;
      break;

    case SymbolKind.Parameter:
      markdown = `**(parameter)** \`${sym.name}\``;
      if (sym.detail) {
        markdown = `**${sym.detail}**`;
      }
      break;

    case SymbolKind.Class:
      markdown = `**${sym.detail || `class \`${sym.name}\``}**`;
      break;

    case SymbolKind.Method:
      markdown = `**${sym.detail || `method \`${sym.name}\``}**`;
      break;

    case SymbolKind.Property:
      markdown = `**${sym.detail || `property \`${sym.name}\``}**`;
      break;

    case SymbolKind.Namespace:
      markdown = `**namespace** \`${sym.name}\``;
      break;

    case SymbolKind.Import:
      markdown = `**${sym.detail || `import \`${sym.name}\``}**`;
      break;

    case SymbolKind.Type:
      markdown = `**${sym.detail || `type \`${sym.name}\``}**`;
      break;
  }

  if (!markdown) return null;

  return {
    contents: {
      kind: MarkupKind.Markdown,
      value: markdown,
    },
  };
}

function findKeywordOrIdentAtPosition(tokens: Token[], line: number, col: number): string | null {
  for (const t of tokens) {
    if (t.kind === TokenKind.Ident ||
        t.kind === TokenKind.Comment || t.kind === TokenKind.BlockComment ||
        t.kind === TokenKind.Str) {
      // Skip non-keyword tokens for keyword lookup, but allow Ident
      if (t.kind !== TokenKind.Ident) continue;
    }
    const s = t.span;
    if (s.start.line > line || s.end.line < line) continue;
    if (s.start.line === line && col < s.start.column) continue;
    if (s.end.line === line && col >= s.end.column) continue;
    return t.text;
  }
  return null;
}
