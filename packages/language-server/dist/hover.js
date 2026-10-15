"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHoverInfo = getHoverInfo;
const node_1 = require("vscode-languageserver/node");
const symbols_1 = require("./symbols");
const token_1 = require("./token");
const keywords_1 = require("./keywords");
const token_utils_1 = require("./token-utils");
function getHoverInfo(rootScope, source, line, col, tokens) {
    // Check keyword by finding the token at position (keywords are also tokens)
    const kwWord = findKeywordOrIdentAtPosition(tokens, line, col);
    if (kwWord) {
        const kwInfo = (0, keywords_1.getKeywordInfo)(kwWord);
        if (kwInfo) {
            return {
                contents: {
                    kind: node_1.MarkupKind.Markdown,
                    value: `**\`${kwInfo.label}\`** — ${kwInfo.detail}\n\n${kwInfo.documentation}`,
                },
            };
        }
    }
    // Look up user-defined symbol (position-based, then name-based fallback)
    let sym = (0, symbols_1.findSymbolAtPosition)(rootScope, line, col);
    if (!sym) {
        const word = (0, token_utils_1.findIdentifierAtPosition)(tokens, source, line, col);
        if (!word)
            return null;
        const scope = (0, symbols_1.findScopeAtPosition)(rootScope, line, col);
        sym = (0, symbols_1.lookupSymbol)(scope, word);
        if (!sym)
            return null;
    }
    let markdown = "";
    switch (sym.kind) {
        case symbols_1.SymbolKind.Function:
            markdown = `**fn** \`${sym.name}\``;
            if (sym.params && sym.params.length > 0) {
                const paramStr = sym.params.map((p) => p.typeAnnotation ? `${p.name} of ${p.typeAnnotation}` : p.name).join("; ");
                markdown += ` ${paramStr}`;
            }
            if (sym.returnType) {
                markdown += ` gives ${sym.returnType}`;
            }
            if (sym.isAsync) {
                markdown = `**async** ${markdown}`;
            }
            break;
        case symbols_1.SymbolKind.Variable:
            markdown = `**${sym.detail || `variable \`${sym.name}\``}**`;
            break;
        case symbols_1.SymbolKind.Parameter:
            markdown = `**(parameter)** \`${sym.name}\``;
            if (sym.detail) {
                markdown = `**${sym.detail}**`;
            }
            break;
        case symbols_1.SymbolKind.Class:
            markdown = `**${sym.detail || `class \`${sym.name}\``}**`;
            break;
        case symbols_1.SymbolKind.Method:
            markdown = `**${sym.detail || `method \`${sym.name}\``}**`;
            break;
        case symbols_1.SymbolKind.Property:
            markdown = `**${sym.detail || `property \`${sym.name}\``}**`;
            break;
        case symbols_1.SymbolKind.Namespace:
            markdown = `**namespace** \`${sym.name}\``;
            break;
        case symbols_1.SymbolKind.Import:
            markdown = `**${sym.detail || `import \`${sym.name}\``}**`;
            break;
        case symbols_1.SymbolKind.Type:
            markdown = `**${sym.detail || `type \`${sym.name}\``}**`;
            break;
    }
    if (!markdown)
        return null;
    return {
        contents: {
            kind: node_1.MarkupKind.Markdown,
            value: markdown,
        },
    };
}
function findKeywordOrIdentAtPosition(tokens, line, col) {
    for (const t of tokens) {
        if (t.kind === token_1.TokenKind.Ident ||
            t.kind === token_1.TokenKind.Comment || t.kind === token_1.TokenKind.BlockComment ||
            t.kind === token_1.TokenKind.Str) {
            // Skip non-keyword tokens for keyword lookup, but allow Ident
            if (t.kind !== token_1.TokenKind.Ident)
                continue;
        }
        const s = t.span;
        if (s.start.line > line || s.end.line < line)
            continue;
        if (s.start.line === line && col < s.start.column)
            continue;
        if (s.end.line === line && col >= s.end.column)
            continue;
        return t.text;
    }
    return null;
}
//# sourceMappingURL=hover.js.map