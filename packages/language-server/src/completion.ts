import {
  CompletionItem,
  CompletionItemKind,
} from "vscode-languageserver/node";
import { Scope, findScopeAtPosition, getSymbolsInScope, SymbolKind } from "./symbols";
import { Token, TokenKind } from "./token";
import { getCompletionItems as getKeywordCompletions } from "./keywords";

export function getCompletions(
  rootScope: Scope,
  tokens: Token[],
  source: string,
  line: number,
  col: number
): CompletionItem[] {
  const context = getCompletionContext(tokens, source, line, col);
  const items: CompletionItem[] = [];

  // After declaration keyword, don't suggest completions (user is typing a new name)
  if (context === "declaration") {
    return [];
  }

  // Get in-scope symbols (skip when after a dot - member access)
  if (context !== "member") {
    const scope = findScopeAtPosition(rootScope, line, col);
    const symbols = getSymbolsInScope(scope);

    for (const sym of symbols) {
      items.push({
        label: sym.name,
        kind: symbolKindToCompletionKind(sym.kind),
        detail: sym.detail,
        data: `sym:${sym.name}`,
      });
    }
  }

  // Add keyword completions
  if (context !== "member") {
    const keywords = getKeywordCompletions();
    for (const kw of keywords) {
      // Avoid duplicates with symbols
      if (!items.some((i) => i.label === kw.label)) {
        items.push(kw);
      }
    }
  }

  return items;
}

type CompletionContext = "declaration" | "member" | "general";

function getCompletionContext(
  tokens: Token[],
  source: string,
  line: number,
  col: number
): CompletionContext {
  // Find the previous non-trivia token
  let prev: Token | null = null;

  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i];
    if (t.kind === TokenKind.Newline || t.kind === TokenKind.Indent ||
        t.kind === TokenKind.Comment || t.kind === TokenKind.BlockComment ||
        t.kind === TokenKind.Eof) {
      continue;
    }

    // Token is before cursor
    if (t.span.end.line < line || (t.span.end.line === line && t.span.end.column <= col)) {
      prev = t;
      break;
    }
  }

  if (!prev) return "general";

  // After const/let/var -> user is typing a new name
  if (prev.kind === TokenKind.Const || prev.kind === TokenKind.Let ||
      prev.kind === TokenKind.Var || prev.kind === TokenKind.Fn) {
    return "declaration";
  }

  // After dot -> member access
  if (prev.kind === TokenKind.Dot || prev.kind === TokenKind.OptionalDot) {
    return "member";
  }

  return "general";
}

function symbolKindToCompletionKind(kind: SymbolKind): CompletionItemKind {
  switch (kind) {
    case SymbolKind.Function:
      return CompletionItemKind.Function;
    case SymbolKind.Variable:
      return CompletionItemKind.Variable;
    case SymbolKind.Parameter:
      return CompletionItemKind.Variable;
    case SymbolKind.Class:
      return CompletionItemKind.Class;
    case SymbolKind.Method:
      return CompletionItemKind.Method;
    case SymbolKind.Property:
      return CompletionItemKind.Property;
    case SymbolKind.Namespace:
      return CompletionItemKind.Module;
    case SymbolKind.Import:
      return CompletionItemKind.Module;
    case SymbolKind.Type:
      return CompletionItemKind.TypeParameter;
    default: {
      const _exhaustive: never = kind;
      return CompletionItemKind.Text;
    }
  }
}
