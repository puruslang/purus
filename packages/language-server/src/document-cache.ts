import { Token } from "./token";
import { Program } from "./ast";
import { ParseError } from "./parser";
import { Scope } from "./symbols";
import { tokenize } from "./lexer";
import { parse } from "./parser";
import { analyze } from "./analyzer";

export interface DocumentData {
  version: number;
  source: string;
  tokens: Token[];
  program: Program;
  parseErrors: ParseError[];
  rootScope: Scope;
}

export class DocumentCache {
  private cache = new Map<string, DocumentData>();

  getOrParse(uri: string, version: number, source: string): DocumentData {
    const cached = this.cache.get(uri);
    if (cached && cached.version === version) {
      return cached;
    }

    const tokens = tokenize(source);
    const { program, errors } = parse(tokens);
    const rootScope = analyze(program);

    const data: DocumentData = {
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

  invalidate(uri: string): void {
    this.cache.delete(uri);
  }

  get(uri: string): DocumentData | undefined {
    return this.cache.get(uri);
  }
}
