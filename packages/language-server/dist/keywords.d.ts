import { CompletionItem, CompletionItemKind } from "vscode-languageserver/node";
interface KeywordInfo {
    label: string;
    detail: string;
    documentation: string;
    kind: CompletionItemKind;
}
export declare function getCompletionItems(): CompletionItem[];
export declare function getKeywordInfo(word: string): KeywordInfo | undefined;
export {};
//# sourceMappingURL=keywords.d.ts.map