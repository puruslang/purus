import { CompletionItem } from "vscode-languageserver/node";
import { Scope } from "./symbols";
import { Token } from "./token";
export declare function getCompletions(rootScope: Scope, tokens: Token[], source: string, line: number, col: number): CompletionItem[];
//# sourceMappingURL=completion.d.ts.map