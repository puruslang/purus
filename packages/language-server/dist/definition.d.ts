import { Location } from "vscode-languageserver/node";
import { Scope } from "./symbols";
import { Token } from "./token";
export declare function getDefinition(rootScope: Scope, uri: string, line: number, col: number, source: string, tokens: Token[]): Location | null;
//# sourceMappingURL=definition.d.ts.map