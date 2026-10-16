export interface RawDiagnostic {
  /** 0-based */
  line: number;
  /** 0-based */
  col: number;
  message: string;
  severity: "error" | "warning";
  source: "purus-lint" | "purus";
  code?: string;
}

interface LintDiagnostic {
  rule: string;
  severity: "error" | "warn";
  line: number;
  col: number;
  message: string;
}

export function fromLint(diagnostics: LintDiagnostic[]): RawDiagnostic[] {
  return diagnostics.map((d) => ({
    line: d.line - 1,
    col: Math.max(0, d.col - 1),
    message: d.message,
    severity: d.severity === "error" ? "error" : "warning",
    source: "purus-lint",
    code: d.rule,
  }));
}

/** Parse the output of `purus check` ("Error: 2:1: expected X but found Y"). */
export function fromCompilerError(message: string): RawDiagnostic[] {
  const found: RawDiagnostic[] = [];
  for (const line of message.split(/\r?\n/)) {
    const match = line.match(/(\d+):(\d+):\s*(.+)$/);
    if (match) {
      found.push({
        line: Number(match[1]) - 1,
        col: Math.max(0, Number(match[2]) - 1),
        message: match[3],
        severity: "error",
        source: "purus",
      });
    }
  }
  return found;
}

/** End column of the token starting at `col` (at least one character). */
export function tokenEnd(lineText: string, col: number): number {
  const match = lineText.slice(col).match(/^[A-Za-z0-9_-]+|^\S/);
  return col + (match ? match[0].length : 1);
}
