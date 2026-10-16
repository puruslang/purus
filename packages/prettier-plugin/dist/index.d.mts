import { Parser, Printer, SupportLanguage } from "prettier";
//#region src/index.d.ts
export interface FormatOptions {
  tabWidth?: number;
  useTabs?: boolean;
}
interface PurusRoot {
  type: "purus-root";
  body: string;
}
export declare function formatPurus(source: string, options?: FormatOptions): string;
export declare const languages: SupportLanguage[];
export declare const parsers: Record<string, Parser<PurusRoot>>;
export declare const printers: Record<string, Printer<PurusRoot>>;
//#endregion
export {};