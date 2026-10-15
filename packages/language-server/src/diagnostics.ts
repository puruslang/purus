import {
  Diagnostic,
  DiagnosticSeverity,
  Range,
  Position,
} from "vscode-languageserver/node";

interface LintDiagnostic {
  rule: string;
  severity: string;
  line: number;
  col: number;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compile } = require("purus");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { lint } = require("@puruslang/linter");

function lintSeverityToLSP(severity: string): DiagnosticSeverity {
  switch (severity) {
    case "error":
      return DiagnosticSeverity.Error;
    case "warn":
      return DiagnosticSeverity.Warning;
    default:
      return DiagnosticSeverity.Information;
  }
}

export function getDiagnostics(source: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  // 1. Compile check (purus build — detects more errors than purus check)
  try {
    compile(source);
  } catch (e: unknown) {
    const err = e as { stderr?: string; message?: string };
    const raw = err.stderr?.trim() || (e instanceof Error ? e.message : String(e));
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: Range.create(Position.create(0, 0), Position.create(0, 0)),
      message: raw.replace(/^Syntax error:\s*/, "").trim(),
      source: "purus",
    });
  }

  // 2. Lint check (@puruslang/linter)
  try {
    const lintResults: LintDiagnostic[] = lint(source);
    for (const result of lintResults) {
      const line = Math.max(0, result.line - 1); // 1-based -> 0-based
      const col = Math.max(0, result.col - 1);
      diagnostics.push({
        severity: lintSeverityToLSP(result.severity),
        range: Range.create(
          Position.create(line, col),
          Position.create(line, col)
        ),
        message: result.message,
        source: `purus-lint(${result.rule})`,
      });
    }
  } catch {
    // lint failure should not crash the server
  }

  return diagnostics;
}
