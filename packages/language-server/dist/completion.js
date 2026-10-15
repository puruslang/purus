"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompletions = getCompletions;
const node_1 = require("vscode-languageserver/node");
const symbols_1 = require("./symbols");
const token_1 = require("./token");
const keywords_1 = require("./keywords");
function getCompletions(rootScope, tokens, source, line, col) {
    const context = getCompletionContext(tokens, source, line, col);
    const items = [];
    // After declaration keyword, don't suggest completions (user is typing a new name)
    if (context === "declaration") {
        return [];
    }
    // Get in-scope symbols (skip when after a dot - member access)
    if (context !== "member") {
        const scope = (0, symbols_1.findScopeAtPosition)(rootScope, line, col);
        const symbols = (0, symbols_1.getSymbolsInScope)(scope);
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
        const keywords = (0, keywords_1.getCompletionItems)();
        for (const kw of keywords) {
            // Avoid duplicates with symbols
            if (!items.some((i) => i.label === kw.label)) {
                items.push(kw);
            }
        }
    }
    return items;
}
function getCompletionContext(tokens, source, line, col) {
    // Find the previous non-trivia token
    let prev = null;
    for (let i = tokens.length - 1; i >= 0; i--) {
        const t = tokens[i];
        if (t.kind === token_1.TokenKind.Newline || t.kind === token_1.TokenKind.Indent ||
            t.kind === token_1.TokenKind.Comment || t.kind === token_1.TokenKind.BlockComment ||
            t.kind === token_1.TokenKind.Eof) {
            continue;
        }
        // Token is before cursor
        if (t.span.end.line < line || (t.span.end.line === line && t.span.end.column <= col)) {
            prev = t;
            break;
        }
    }
    if (!prev)
        return "general";
    // After const/let/var -> user is typing a new name
    if (prev.kind === token_1.TokenKind.Const || prev.kind === token_1.TokenKind.Let ||
        prev.kind === token_1.TokenKind.Var || prev.kind === token_1.TokenKind.Fn) {
        return "declaration";
    }
    // After dot -> member access
    if (prev.kind === token_1.TokenKind.Dot || prev.kind === token_1.TokenKind.OptionalDot) {
        return "member";
    }
    return "general";
}
function symbolKindToCompletionKind(kind) {
    switch (kind) {
        case symbols_1.SymbolKind.Function:
            return node_1.CompletionItemKind.Function;
        case symbols_1.SymbolKind.Variable:
            return node_1.CompletionItemKind.Variable;
        case symbols_1.SymbolKind.Parameter:
            return node_1.CompletionItemKind.Variable;
        case symbols_1.SymbolKind.Class:
            return node_1.CompletionItemKind.Class;
        case symbols_1.SymbolKind.Method:
            return node_1.CompletionItemKind.Method;
        case symbols_1.SymbolKind.Property:
            return node_1.CompletionItemKind.Property;
        case symbols_1.SymbolKind.Namespace:
            return node_1.CompletionItemKind.Module;
        case symbols_1.SymbolKind.Import:
            return node_1.CompletionItemKind.Module;
        case symbols_1.SymbolKind.Type:
            return node_1.CompletionItemKind.TypeParameter;
        default: {
            const _exhaustive = kind;
            return node_1.CompletionItemKind.Text;
        }
    }
}
//# sourceMappingURL=completion.js.map