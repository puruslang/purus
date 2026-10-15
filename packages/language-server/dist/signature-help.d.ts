import { SignatureHelp } from "vscode-languageserver/node";
import { Scope } from "./symbols";
import { Token } from "./token";
export declare function getSignatureHelp(rootScope: Scope, tokens: Token[], source: string, line: number, col: number): SignatureHelp | null;
//# sourceMappingURL=signature-help.d.ts.map