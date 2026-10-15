"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefinition = getDefinition;
const node_1 = require("vscode-languageserver/node");
const symbols_1 = require("./symbols");
const token_utils_1 = require("./token-utils");
function getDefinition(rootScope, uri, line, col, source, tokens) {
    const sym = (0, symbols_1.findSymbolAtPosition)(rootScope, line, col);
    if (!sym) {
        const word = (0, token_utils_1.findIdentifierAtPosition)(tokens, source, line, col);
        if (!word)
            return null;
        const scope = (0, symbols_1.findScopeAtPosition)(rootScope, line, col);
        const fallback = (0, symbols_1.lookupSymbol)(scope, word);
        if (!fallback)
            return null;
        return { uri, range: spanToRange(fallback.nameSpan) };
    }
    return {
        uri,
        range: spanToRange(sym.nameSpan),
    };
}
function spanToRange(span) {
    return node_1.Range.create(node_1.Position.create(span.start.line, span.start.column), node_1.Position.create(span.end.line, span.end.column));
}
//# sourceMappingURL=definition.js.map