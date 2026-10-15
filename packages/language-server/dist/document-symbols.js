"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentSymbols = getDocumentSymbols;
const node_1 = require("vscode-languageserver/node");
function getDocumentSymbols(program) {
    const symbols = [];
    for (const stmt of program.stmts) {
        const sym = stmtToSymbol(stmt);
        if (sym)
            symbols.push(sym);
    }
    return symbols;
}
function stmtToSymbol(stmt) {
    switch (stmt.type) {
        case "VarDecl":
            return {
                name: stmt.name,
                kind: node_1.SymbolKind.Variable,
                range: spanToRange(stmt.span),
                selectionRange: spanToRange(stmt.nameSpan),
            };
        case "FnDecl": {
            const paramStr = stmt.params.map((p) => p.name).join("; ");
            const children = [];
            if (stmt.body.kind === "block") {
                for (const s of stmt.body.stmts) {
                    const child = stmtToSymbol(s);
                    if (child)
                        children.push(child);
                }
            }
            return {
                name: stmt.name,
                detail: `fn ${stmt.name}${paramStr ? " " + paramStr : ""}`,
                kind: node_1.SymbolKind.Function,
                range: spanToRange(stmt.span),
                selectionRange: spanToRange(stmt.nameSpan),
                children: children.length > 0 ? children : undefined,
            };
        }
        case "ClassDecl": {
            const children = [];
            for (const member of stmt.members) {
                const child = classMemberToSymbol(member);
                if (child)
                    children.push(child);
            }
            return {
                name: stmt.name,
                detail: stmt.superClass ? `extends ${stmt.superClass}` : undefined,
                kind: node_1.SymbolKind.Class,
                range: spanToRange(stmt.span),
                selectionRange: spanToRange(stmt.nameSpan),
                children: children.length > 0 ? children : undefined,
            };
        }
        case "Namespace": {
            const children = [];
            for (const s of stmt.body) {
                const child = stmtToSymbol(s);
                if (child)
                    children.push(child);
            }
            return {
                name: stmt.name,
                kind: node_1.SymbolKind.Namespace,
                range: spanToRange(stmt.span),
                selectionRange: spanToRange(stmt.nameSpan),
                children: children.length > 0 ? children : undefined,
            };
        }
        case "Import":
            if (stmt.defaultName) {
                return {
                    name: stmt.defaultName,
                    detail: `from "${stmt.source}"`,
                    kind: node_1.SymbolKind.Module,
                    range: spanToRange(stmt.span),
                    selectionRange: stmt.defaultNameSpan
                        ? spanToRange(stmt.defaultNameSpan)
                        : spanToRange(stmt.span),
                };
            }
            return null;
        case "TypeDecl":
            return {
                name: stmt.name,
                detail: `type ${stmt.name} be ${stmt.value}`,
                kind: node_1.SymbolKind.TypeParameter,
                range: spanToRange(stmt.span),
                selectionRange: spanToRange(stmt.nameSpan),
            };
        case "Export":
        case "ExportDefault":
        case "Public":
            return stmtToSymbol(stmt.decl);
        default:
            return null;
    }
}
function classMemberToSymbol(member) {
    switch (member.type) {
        case "Constructor":
            return {
                name: "new",
                kind: node_1.SymbolKind.Constructor,
                range: spanToRange(member.span),
                selectionRange: spanToRange(member.span),
            };
        case "Method":
            return {
                name: member.name,
                detail: `${member.isStatic ? "static " : ""}${member.isAsync ? "async " : ""}fn`,
                kind: node_1.SymbolKind.Method,
                range: spanToRange(member.span),
                selectionRange: spanToRange(member.nameSpan),
            };
        case "Getter":
            return {
                name: member.name,
                detail: "get",
                kind: node_1.SymbolKind.Property,
                range: spanToRange(member.span),
                selectionRange: spanToRange(member.nameSpan),
            };
        case "Setter":
            return {
                name: member.name,
                detail: "set",
                kind: node_1.SymbolKind.Property,
                range: spanToRange(member.span),
                selectionRange: spanToRange(member.nameSpan),
            };
        case "PrivateField":
            return {
                name: member.name,
                detail: "private",
                kind: node_1.SymbolKind.Field,
                range: spanToRange(member.span),
                selectionRange: spanToRange(member.nameSpan),
            };
        default: {
            const _exhaustive = member;
            return null;
        }
    }
}
function spanToRange(span) {
    return node_1.Range.create(node_1.Position.create(span.start.line, span.start.column), node_1.Position.create(span.end.line, span.end.column));
}
//# sourceMappingURL=document-symbols.js.map