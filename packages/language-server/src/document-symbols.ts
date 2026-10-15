import {
  DocumentSymbol,
  SymbolKind as LSPSymbolKind,
  Range,
  Position,
} from "vscode-languageserver/node";
import { Program, Stmt, ClassMember } from "./ast";
import { Span } from "./token";

export function getDocumentSymbols(program: Program): DocumentSymbol[] {
  const symbols: DocumentSymbol[] = [];
  for (const stmt of program.stmts) {
    const sym = stmtToSymbol(stmt);
    if (sym) symbols.push(sym);
  }
  return symbols;
}

function stmtToSymbol(stmt: Stmt): DocumentSymbol | null {
  switch (stmt.type) {
    case "VarDecl":
      return {
        name: stmt.name,
        kind: LSPSymbolKind.Variable,
        range: spanToRange(stmt.span),
        selectionRange: spanToRange(stmt.nameSpan),
      };

    case "FnDecl": {
      const paramStr = stmt.params.map((p) => p.name).join("; ");
      const children: DocumentSymbol[] = [];
      if (stmt.body.kind === "block") {
        for (const s of stmt.body.stmts) {
          const child = stmtToSymbol(s);
          if (child) children.push(child);
        }
      }
      return {
        name: stmt.name,
        detail: `fn ${stmt.name}${paramStr ? " " + paramStr : ""}`,
        kind: LSPSymbolKind.Function,
        range: spanToRange(stmt.span),
        selectionRange: spanToRange(stmt.nameSpan),
        children: children.length > 0 ? children : undefined,
      };
    }

    case "ClassDecl": {
      const children: DocumentSymbol[] = [];
      for (const member of stmt.members) {
        const child = classMemberToSymbol(member);
        if (child) children.push(child);
      }
      return {
        name: stmt.name,
        detail: stmt.superClass ? `extends ${stmt.superClass}` : undefined,
        kind: LSPSymbolKind.Class,
        range: spanToRange(stmt.span),
        selectionRange: spanToRange(stmt.nameSpan),
        children: children.length > 0 ? children : undefined,
      };
    }

    case "Namespace": {
      const children: DocumentSymbol[] = [];
      for (const s of stmt.body) {
        const child = stmtToSymbol(s);
        if (child) children.push(child);
      }
      return {
        name: stmt.name,
        kind: LSPSymbolKind.Namespace,
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
          kind: LSPSymbolKind.Module,
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
        kind: LSPSymbolKind.TypeParameter,
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

function classMemberToSymbol(member: ClassMember): DocumentSymbol | null {
  switch (member.type) {
    case "Constructor":
      return {
        name: "new",
        kind: LSPSymbolKind.Constructor,
        range: spanToRange(member.span),
        selectionRange: spanToRange(member.span),
      };

    case "Method":
      return {
        name: member.name,
        detail: `${member.isStatic ? "static " : ""}${member.isAsync ? "async " : ""}fn`,
        kind: LSPSymbolKind.Method,
        range: spanToRange(member.span),
        selectionRange: spanToRange(member.nameSpan),
      };

    case "Getter":
      return {
        name: member.name,
        detail: "get",
        kind: LSPSymbolKind.Property,
        range: spanToRange(member.span),
        selectionRange: spanToRange(member.nameSpan),
      };

    case "Setter":
      return {
        name: member.name,
        detail: "set",
        kind: LSPSymbolKind.Property,
        range: spanToRange(member.span),
        selectionRange: spanToRange(member.nameSpan),
      };

    case "PrivateField":
      return {
        name: member.name,
        detail: "private",
        kind: LSPSymbolKind.Field,
        range: spanToRange(member.span),
        selectionRange: spanToRange(member.nameSpan),
      };
    default: {
      const _exhaustive: never = member;
      return null;
    }
  }
}

function spanToRange(span: Span): Range {
  return Range.create(
    Position.create(span.start.line, span.start.column),
    Position.create(span.end.line, span.end.column)
  );
}
