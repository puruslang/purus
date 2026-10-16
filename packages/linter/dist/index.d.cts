//#region src/index.d.ts
export type Severity = "error" | "warn" | "off";
export interface RuleConfig {
  severity?: Severity;
  message?: string;
  size?: number;
  max?: number;
  style?: string;
}
export type Rules = Record<string, RuleConfig>;
export type TokenType = "newline" | "whitespace" | "block-comment" | "comment" | "string" | "punct" | "keyword" | "ident" | "number" | "shebang" | "other";
export interface Token {
  type: TokenType;
  value: string;
  line: number;
  col: number;
}
export interface Diagnostic {
  rule: string;
  severity: Exclude<Severity, "off">;
  line: number;
  col: number;
  message: string;
}
export declare function tokenize(source: string): Token[];
export declare const defaultRules: Rules;
export declare function lint(source: string, ruleOverrides?: Rules): Diagnostic[];
//#endregion