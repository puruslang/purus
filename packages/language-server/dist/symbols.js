"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolKind = void 0;
exports.createScope = createScope;
exports.lookupSymbol = lookupSymbol;
exports.findScopeAtPosition = findScopeAtPosition;
exports.isPositionInSpan = isPositionInSpan;
exports.findSymbolAtPosition = findSymbolAtPosition;
exports.getAllSymbols = getAllSymbols;
exports.getSymbolsInScope = getSymbolsInScope;
var SymbolKind;
(function (SymbolKind) {
    SymbolKind[SymbolKind["Variable"] = 0] = "Variable";
    SymbolKind[SymbolKind["Function"] = 1] = "Function";
    SymbolKind[SymbolKind["Parameter"] = 2] = "Parameter";
    SymbolKind[SymbolKind["Class"] = 3] = "Class";
    SymbolKind[SymbolKind["Method"] = 4] = "Method";
    SymbolKind[SymbolKind["Property"] = 5] = "Property";
    SymbolKind[SymbolKind["Namespace"] = 6] = "Namespace";
    SymbolKind[SymbolKind["Import"] = 7] = "Import";
    SymbolKind[SymbolKind["Type"] = 8] = "Type";
})(SymbolKind || (exports.SymbolKind = SymbolKind = {}));
function createScope(parent, span) {
    const scope = {
        parent,
        symbols: new Map(),
        children: [],
        span,
    };
    if (parent) {
        parent.children.push(scope);
    }
    return scope;
}
function lookupSymbol(scope, name) {
    const found = scope.symbols.get(name);
    if (found)
        return found;
    if (scope.parent)
        return lookupSymbol(scope.parent, name);
    return undefined;
}
function findScopeAtPosition(scope, line, col) {
    for (const child of scope.children) {
        if (isPositionInSpan(line, col, child.span)) {
            return findScopeAtPosition(child, line, col);
        }
    }
    return scope;
}
function isPositionInSpan(line, col, span) {
    if (line < span.start.line || line > span.end.line)
        return false;
    if (line === span.start.line && col < span.start.column)
        return false;
    if (line === span.end.line && col >= span.end.column)
        return false;
    return true;
}
function findSymbolAtPosition(scope, line, col) {
    const innerScope = findScopeAtPosition(scope, line, col);
    return findSymbolInScopeAtPosition(innerScope, line, col);
}
function findSymbolInScopeAtPosition(scope, line, col) {
    let current = scope;
    while (current) {
        for (const sym of current.symbols.values()) {
            if (isPositionInSpan(line, col, sym.nameSpan)) {
                return sym;
            }
            for (const ref of sym.references) {
                if (isPositionInSpan(line, col, ref)) {
                    return sym;
                }
            }
        }
        current = current.parent;
    }
    return undefined;
}
function getAllSymbols(scope) {
    const symbols = [];
    for (const sym of scope.symbols.values()) {
        symbols.push(sym);
    }
    for (const child of scope.children) {
        symbols.push(...getAllSymbols(child));
    }
    return symbols;
}
function getSymbolsInScope(scope) {
    const symbols = [];
    const seen = new Set();
    let current = scope;
    while (current) {
        for (const sym of current.symbols.values()) {
            if (!seen.has(sym.name)) {
                seen.add(sym.name);
                symbols.push(sym);
            }
        }
        current = current.parent;
    }
    return symbols;
}
//# sourceMappingURL=symbols.js.map