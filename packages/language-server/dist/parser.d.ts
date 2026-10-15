import { Token, Span } from "./token";
import { Program } from "./ast";
export interface ParseError {
    message: string;
    span: Span;
}
export declare function parse(tokens: Token[]): {
    program: Program;
    errors: ParseError[];
};
//# sourceMappingURL=parser.d.ts.map