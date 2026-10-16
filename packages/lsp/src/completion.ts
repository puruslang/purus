import { KEYWORDS, STDLIB_MODULES } from "./keywords.js";

export interface CompletionEntry {
  label: string;
  detail?: string;
  kind: "keyword" | "module";
}

/** The word being typed at `character` on `line`, and the text before it. */
export function wordBefore(
  lineText: string,
  character: number
): { prefix: string; before: string } {
  const head = lineText.slice(0, character);
  const match = head.match(/[A-Za-z0-9_-]*$/);
  const prefix = match ? match[0] : "";
  return { prefix, before: head.slice(0, head.length - prefix.length) };
}

export function completionsFor(
  lineText: string,
  character: number
): CompletionEntry[] {
  const { prefix, before } = wordBefore(lineText, character);
  if (/\buse\s+$/.test(before)) {
    return STDLIB_MODULES.filter((m) => m.startsWith(prefix)).map((label) => ({
      label,
      kind: "module" as const,
    }));
  }
  return KEYWORDS.filter((k) => k.name.startsWith(prefix)).map((k) => ({
    label: k.name,
    detail: k.detail,
    kind: "keyword" as const,
  }));
}
