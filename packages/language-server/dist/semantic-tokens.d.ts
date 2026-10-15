import { Token } from "./token";
import { Scope } from "./symbols";
export declare const TOKEN_TYPES: readonly ["keyword", "variable", "function", "parameter", "string", "number", "operator", "comment", "type", "namespace", "regexp", "class", "property", "enumMember"];
export declare const TOKEN_MODIFIERS: readonly ["declaration", "readonly", "async", "defaultLibrary"];
export type TokenTypeIndex = number;
export type TokenModifierBitset = number;
export declare function computeSemanticTokens(tokens: Token[], rootScope: Scope): number[];
//# sourceMappingURL=semantic-tokens.d.ts.map