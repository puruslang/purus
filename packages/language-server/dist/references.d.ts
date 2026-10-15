import { Location } from "vscode-languageserver/node";
import { Scope } from "./symbols";
import { Token } from "./token";
export declare function getReferences(rootScope: Scope, uri: string, line: number, col: number, source: string, includeDeclaration: boolean, tokens: Token[]): Location[];
//# sourceMappingURL=references.d.ts.map