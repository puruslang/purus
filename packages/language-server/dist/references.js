"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReferences = getReferences;
const node_1 = require("vscode-languageserver/node");
const symbols_1 = require("./symbols");
const token_utils_1 = require("./token-utils");
function getReferences(rootScope, uri, line, col, source, includeDeclaration, tokens) {
    let sym = (0, symbols_1.findSymbolAtPosition)(rootScope, line, col);
    if (!sym) {
        const word = (0, token_utils_1.findIdentifierAtPosition)(tokens, source, line, col);
        if (!word)
            return [];
        const scope = (0, symbols_1.findScopeAtPosition)(rootScope, line, col);
        sym = (0, symbols_1.lookupSymbol)(scope, word);
        if (!sym)
            return [];
    }
    const locations = [];
    if (includeDeclaration) {
        locations.push({ uri, range: spanToRange(sym.nameSpan) });
    }
    for (const ref of sym.references) {
        locations.push({ uri, range: spanToRange(ref) });
    }
    return locations;
}
function spanToRange(span) {
    return node_1.Range.create(node_1.Position.create(span.start.line, span.start.column), node_1.Position.create(span.end.line, span.end.column));
}
//# sourceMappingURL=references.js.map