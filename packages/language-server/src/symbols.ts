import { Span } from "./token";

export enum SymbolKind {
  Variable,
  Function,
  Parameter,
  Class,
  Method,
  Property,
  Namespace,
  Import,
  Type,
}

export interface ParamInfo {
  name: string;
  typeAnnotation?: string;
}

export interface PurusSymbol {
  name: string;
  kind: SymbolKind;
  declSpan: Span;
  nameSpan: Span;
  references: Span[];
  detail?: string;
  params?: ParamInfo[];
  returnType?: string;
  isAsync?: boolean;
  isExported?: boolean;
  isPrivate?: boolean;
  scope?: Scope;
}

export interface Scope {
  parent: Scope | null;
  symbols: Map<string, PurusSymbol>;
  children: Scope[];
  span: Span;
}

export function createScope(parent: Scope | null, span: Span): Scope {
  const scope: Scope = {
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

export function lookupSymbol(scope: Scope, name: string): PurusSymbol | undefined {
  const found = scope.symbols.get(name);
  if (found) return found;
  if (scope.parent) return lookupSymbol(scope.parent, name);
  return undefined;
}

export function findScopeAtPosition(scope: Scope, line: number, col: number): Scope {
  for (const child of scope.children) {
    if (isPositionInSpan(line, col, child.span)) {
      return findScopeAtPosition(child, line, col);
    }
  }
  return scope;
}

export function isPositionInSpan(line: number, col: number, span: Span): boolean {
  if (line < span.start.line || line > span.end.line) return false;
  if (line === span.start.line && col < span.start.column) return false;
  if (line === span.end.line && col >= span.end.column) return false;
  return true;
}

export function findSymbolAtPosition(scope: Scope, line: number, col: number): PurusSymbol | undefined {
  const innerScope = findScopeAtPosition(scope, line, col);
  return findSymbolInScopeAtPosition(innerScope, line, col);
}

function findSymbolInScopeAtPosition(scope: Scope | null, line: number, col: number): PurusSymbol | undefined {
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

export function getAllSymbols(scope: Scope): PurusSymbol[] {
  const symbols: PurusSymbol[] = [];
  for (const sym of scope.symbols.values()) {
    symbols.push(sym);
  }
  for (const child of scope.children) {
    symbols.push(...getAllSymbols(child));
  }
  return symbols;
}

export function getSymbolsInScope(scope: Scope): PurusSymbol[] {
  const symbols: PurusSymbol[] = [];
  const seen = new Set<string>();
  let current: Scope | null = scope;
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
