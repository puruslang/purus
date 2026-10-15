import { Token } from "./token";
import { Program } from "./ast";
import { ParseError } from "./parser";
import { Scope } from "./symbols";
export interface DocumentData {
    version: number;
    source: string;
    tokens: Token[];
    program: Program;
    parseErrors: ParseError[];
    rootScope: Scope;
}
export declare class DocumentCache {
    private cache;
    getOrParse(uri: string, version: number, source: string): DocumentData;
    invalidate(uri: string): void;
    get(uri: string): DocumentData | undefined;
}
//# sourceMappingURL=document-cache.d.ts.map