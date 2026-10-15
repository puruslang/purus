"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIdentifierAtPosition = findIdentifierAtPosition;
const token_1 = require("./token");
function findIdentifierAtPosition(tokens, source, line, col) {
    for (const t of tokens) {
        if (t.kind !== token_1.TokenKind.Ident)
            continue;
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
//# sourceMappingURL=token-utils.js.map