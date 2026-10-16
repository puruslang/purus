#!/usr/bin/env node
import { lint } from "@puruslang/linter";
import { formatPurus } from "@puruslang/prettier-plugin-purus";
import { check } from "purus";
import {
  CompletionItemKind,
  createConnection,
  DiagnosticSeverity,
  ProposedFeatures,
  TextDocumentSyncKind,
  TextDocuments,
} from "vscode-languageserver/node";
import type { Diagnostic } from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { completionsFor, wordBefore } from "./completion.js";
import { fromCompilerError, fromLint, tokenEnd } from "./diagnostics.js";
import type { RawDiagnostic } from "./diagnostics.js";
import { keywordInfo } from "./keywords.js";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function toDiagnostic(doc: TextDocument, raw: RawDiagnostic): Diagnostic {
  const text = doc.getText().split("\n")[raw.line] ?? "";
  return {
    range: {
      start: { line: raw.line, character: raw.col },
      end: { line: raw.line, character: tokenEnd(text, raw.col) },
    },
    message: raw.message,
    severity:
      raw.severity === "error"
        ? DiagnosticSeverity.Error
        : DiagnosticSeverity.Warning,
    source: raw.source,
    code: raw.code,
  };
}

function validate(doc: TextDocument): void {
  const source = doc.getText();
  const raw: RawDiagnostic[] = fromLint(lint(source));
  try {
    check(source);
  } catch (err) {
    raw.push(...fromCompilerError((err as Error).message));
  }
  void connection.sendDiagnostics({
    uri: doc.uri,
    diagnostics: raw.map((r) => toDiagnostic(doc, r)),
  });
}

connection.onInitialize(() => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
    completionProvider: { triggerCharacters: [" "] },
    hoverProvider: true,
    documentFormattingProvider: true,
  },
}));

connection.onCompletion((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const line =
    doc.getText().split("\n")[params.position.line]?.replace(/\r$/, "") ?? "";
  return completionsFor(line, params.position.character).map((e) => ({
    label: e.label,
    detail: e.detail,
    kind:
      e.kind === "module"
        ? CompletionItemKind.Module
        : CompletionItemKind.Keyword,
  }));
});

connection.onHover((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;
  const line =
    doc.getText().split("\n")[params.position.line]?.replace(/\r$/, "") ?? "";
  const end = tokenEnd(line, params.position.character);
  const { prefix } = wordBefore(line, params.position.character);
  const rest = line.slice(params.position.character, end);
  const info = keywordInfo(prefix + rest.replace(/[^A-Za-z0-9_-].*$/, ""));
  return info
    ? {
        contents: {
          kind: "markdown",
          value: `**${info.name}**: ${info.detail}`,
        },
      }
    : null;
});

connection.onDocumentFormatting((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const formatted = formatPurus(doc.getText(), {
    tabWidth: params.options.tabSize,
    useTabs: !params.options.insertSpaces,
  });
  return [
    {
      range: {
        start: { line: 0, character: 0 },
        end: doc.positionAt(doc.getText().length),
      },
      newText: formatted,
    },
  ];
});

documents.onDidChangeContent((change) => {
  const uri = change.document.uri;
  const pending = timers.get(uri);
  if (pending) clearTimeout(pending);
  timers.set(
    uri,
    setTimeout(() => validate(change.document), 300)
  );
});

documents.onDidClose((event) => {
  void connection.sendDiagnostics({ uri: event.document.uri, diagnostics: [] });
});

documents.listen(connection);
connection.listen();
