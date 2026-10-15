#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const diagnostics_1 = require("./diagnostics");
const format_1 = require("./format");
const document_cache_1 = require("./document-cache");
const semantic_tokens_1 = require("./semantic-tokens");
const document_symbols_1 = require("./document-symbols");
const definition_1 = require("./definition");
const references_1 = require("./references");
const signature_help_1 = require("./signature-help");
const completion_1 = require("./completion");
const hover_1 = require("./hover");
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
const cache = new document_cache_1.DocumentCache();
connection.onInitialize((_params) => {
    return {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Full,
            documentFormattingProvider: true,
            completionProvider: {
                resolveProvider: false,
                triggerCharacters: [".", "["],
            },
            hoverProvider: true,
            definitionProvider: true,
            referencesProvider: true,
            documentSymbolProvider: true,
            signatureHelpProvider: {
                triggerCharacters: ["[", ";"],
            },
            semanticTokensProvider: {
                legend: {
                    tokenTypes: [...semantic_tokens_1.TOKEN_TYPES],
                    tokenModifiers: [...semantic_tokens_1.TOKEN_MODIFIERS],
                },
                full: true,
                range: false,
            },
        },
    };
});
// Validate on open and change
documents.onDidOpen((event) => {
    cache.invalidate(event.document.uri);
    void validateDocument(event.document);
});
documents.onDidChangeContent((change) => {
    cache.invalidate(change.document.uri);
    void validateDocument(change.document);
});
// Clean up on close
documents.onDidClose((event) => {
    cache.invalidate(event.document.uri);
    connection.sendDiagnostics({ uri: event.document.uri, diagnostics: [] });
});
async function validateDocument(document) {
    const diagnostics = (0, diagnostics_1.getDiagnostics)(document.getText());
    connection.sendDiagnostics({ uri: document.uri, diagnostics });
}
function getDocData(uri) {
    const document = documents.get(uri);
    if (!document)
        return null;
    const source = document.getText();
    const data = cache.getOrParse(uri, document.version, source);
    return { document, source, data };
}
// Completion
connection.onCompletion((params) => {
    const info = getDocData(params.textDocument.uri);
    if (!info)
        return [];
    const { source, data } = info;
    return (0, completion_1.getCompletions)(data.rootScope, data.tokens, source, params.position.line, params.position.character);
});
// Hover
connection.onHover((params) => {
    const info = getDocData(params.textDocument.uri);
    if (!info)
        return null;
    const { source, data } = info;
    return (0, hover_1.getHoverInfo)(data.rootScope, source, params.position.line, params.position.character, data.tokens);
});
// Go to Definition
connection.onDefinition((params) => {
    const info = getDocData(params.textDocument.uri);
    if (!info)
        return null;
    const { source, data } = info;
    return (0, definition_1.getDefinition)(data.rootScope, params.textDocument.uri, params.position.line, params.position.character, source, data.tokens);
});
// Find References
connection.onReferences((params) => {
    const info = getDocData(params.textDocument.uri);
    if (!info)
        return [];
    const { source, data } = info;
    return (0, references_1.getReferences)(data.rootScope, params.textDocument.uri, params.position.line, params.position.character, source, params.context.includeDeclaration, data.tokens);
});
// Document Symbols
connection.onDocumentSymbol((params) => {
    const info = getDocData(params.textDocument.uri);
    if (!info)
        return [];
    return (0, document_symbols_1.getDocumentSymbols)(info.data.program);
});
// Signature Help
connection.onSignatureHelp((params) => {
    const info = getDocData(params.textDocument.uri);
    if (!info)
        return null;
    const { source, data } = info;
    return (0, signature_help_1.getSignatureHelp)(data.rootScope, data.tokens, source, params.position.line, params.position.character);
});
// Semantic Tokens
connection.languages.semanticTokens.on((params) => {
    const info = getDocData(params.textDocument.uri);
    if (!info)
        return { data: [] };
    return { data: (0, semantic_tokens_1.computeSemanticTokens)(info.data.tokens, info.data.rootScope) };
});
// Format
connection.onDocumentFormatting(async (params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document)
        return [];
    try {
        return await (0, format_1.formatDocument)(document);
    }
    catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        connection.console.error(`Format error: ${message}`);
        return [];
    }
});
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map