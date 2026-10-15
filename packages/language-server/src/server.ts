#!/usr/bin/env node

import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
  DocumentFormattingParams,
  TextEdit,
  CompletionParams,
  CompletionItem,
  HoverParams,
  Hover,
  DefinitionParams,
  ReferenceParams,
  DocumentSymbolParams,
  DocumentSymbol,
  SignatureHelpParams,
  SemanticTokensParams,
  SemanticTokens,
  Location,
  SignatureHelp,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getDiagnostics } from "./diagnostics";
import { formatDocument } from "./format";
import { DocumentCache } from "./document-cache";
import { TOKEN_TYPES, TOKEN_MODIFIERS, computeSemanticTokens } from "./semantic-tokens";
import { getDocumentSymbols } from "./document-symbols";
import { getDefinition } from "./definition";
import { getReferences } from "./references";
import { getSignatureHelp } from "./signature-help";
import { getCompletions } from "./completion";
import { getHoverInfo } from "./hover";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const cache = new DocumentCache();

connection.onInitialize((_params: InitializeParams): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Full,
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
          tokenTypes: [...TOKEN_TYPES],
          tokenModifiers: [...TOKEN_MODIFIERS],
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

async function validateDocument(document: TextDocument): Promise<void> {
  const diagnostics = getDiagnostics(document.getText());
  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

function getDocData(uri: string) {
  const document = documents.get(uri);
  if (!document) return null;
  const source = document.getText();
  const data = cache.getOrParse(uri, document.version, source);
  return { document, source, data };
}

// Completion
connection.onCompletion(
  (params: CompletionParams): CompletionItem[] => {
    const info = getDocData(params.textDocument.uri);
    if (!info) return [];
    const { source, data } = info;
    return getCompletions(
      data.rootScope,
      data.tokens,
      source,
      params.position.line,
      params.position.character
    );
  }
);

// Hover
connection.onHover((params: HoverParams): Hover | null => {
  const info = getDocData(params.textDocument.uri);
  if (!info) return null;
  const { source, data } = info;
  return getHoverInfo(
    data.rootScope,
    source,
    params.position.line,
    params.position.character,
    data.tokens
  );
});

// Go to Definition
connection.onDefinition((params: DefinitionParams): Location | null => {
  const info = getDocData(params.textDocument.uri);
  if (!info) return null;
  const { source, data } = info;
  return getDefinition(
    data.rootScope,
    params.textDocument.uri,
    params.position.line,
    params.position.character,
    source,
    data.tokens
  );
});

// Find References
connection.onReferences((params: ReferenceParams): Location[] => {
  const info = getDocData(params.textDocument.uri);
  if (!info) return [];
  const { source, data } = info;
  return getReferences(
    data.rootScope,
    params.textDocument.uri,
    params.position.line,
    params.position.character,
    source,
    params.context.includeDeclaration,
    data.tokens
  );
});

// Document Symbols
connection.onDocumentSymbol((params: DocumentSymbolParams): DocumentSymbol[] => {
  const info = getDocData(params.textDocument.uri);
  if (!info) return [];
  return getDocumentSymbols(info.data.program);
});

// Signature Help
connection.onSignatureHelp((params: SignatureHelpParams): SignatureHelp | null => {
  const info = getDocData(params.textDocument.uri);
  if (!info) return null;
  const { source, data } = info;
  return getSignatureHelp(
    data.rootScope,
    data.tokens,
    source,
    params.position.line,
    params.position.character
  );
});

// Semantic Tokens
connection.languages.semanticTokens.on((params: SemanticTokensParams): SemanticTokens => {
  const info = getDocData(params.textDocument.uri);
  if (!info) return { data: [] };
  return { data: computeSemanticTokens(info.data.tokens, info.data.rootScope) };
});

// Format
connection.onDocumentFormatting(
  async (params: DocumentFormattingParams): Promise<TextEdit[]> => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];

    try {
      return await formatDocument(document);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      connection.console.error(`Format error: ${message}`);
      return [];
    }
  }
);

documents.listen(connection);
connection.listen();
