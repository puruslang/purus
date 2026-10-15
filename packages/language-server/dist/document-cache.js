"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentCache = void 0;
const lexer_1 = require("./lexer");
const parser_1 = require("./parser");
const analyzer_1 = require("./analyzer");
class DocumentCache {
    constructor() {
        this.cache = new Map();
    }
    getOrParse(uri, version, source) {
        const cached = this.cache.get(uri);
        if (cached && cached.version === version) {
            return cached;
        }
        const tokens = (0, lexer_1.tokenize)(source);
        const { program, errors } = (0, parser_1.parse)(tokens);
        const rootScope = (0, analyzer_1.analyze)(program);
        const data = {
            version,
            source,
            tokens,
            program,
            parseErrors: errors,
            rootScope,
        };
        this.cache.set(uri, data);
        return data;
    }
    invalidate(uri) {
        this.cache.delete(uri);
    }
    get(uri) {
        return this.cache.get(uri);
    }
}
exports.DocumentCache = DocumentCache;
//# sourceMappingURL=document-cache.js.map