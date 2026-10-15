import { Span } from "./token";
export declare enum SymbolKind {
    Variable = 0,
    Function = 1,
    Parameter = 2,
    Class = 3,
    Method = 4,
    Property = 5,
    Namespace = 6,
    Import = 7,
    Type = 8
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
export declare function createScope(parent: Scope | null, span: Span): Scope;
export declare function lookupSymbol(scope: Scope, name: string): PurusSymbol | undefined;
export declare function findScopeAtPosition(scope: Scope, line: number, col: number): Scope;
export declare function isPositionInSpan(line: number, col: number, span: Span): boolean;
export declare function findSymbolAtPosition(scope: Scope, line: number, col: number): PurusSymbol | undefined;
export declare function getAllSymbols(scope: Scope): PurusSymbol[];
export declare function getSymbolsInScope(scope: Scope): PurusSymbol[];
//# sourceMappingURL=symbols.d.ts.map