"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiagnostics = getDiagnostics;
const node_1 = require("vscode-languageserver/node");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compile } = require("purus");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { lint } = require("@puruslang/linter");
function lintSeverityToLSP(severity) {
    switch (severity) {
        case "error":
            return node_1.DiagnosticSeverity.Error;
        case "warn":
            return node_1.DiagnosticSeverity.Warning;
        default:
            return node_1.DiagnosticSeverity.Information;
    }
}
function getDiagnostics(source) {
    const diagnostics = [];
    // 1. Compile check (purus build — detects more errors than purus check)
    try {
        compile(source);
    }
    catch (e) {
        const err = e;
        const raw = err.stderr?.trim() || (e instanceof Error ? e.message : String(e));
        diagnostics.push({
            severity: node_1.DiagnosticSeverity.Error,
            range: node_1.Range.create(node_1.Position.create(0, 0), node_1.Position.create(0, 0)),
            message: raw.replace(/^Syntax error:\s*/, "").trim(),
            source: "purus",
        });
    }
    // 2. Lint check (@puruslang/linter)
    try {
        const lintResults = lint(source);
        for (const result of lintResults) {
            const line = Math.max(0, result.line - 1); // 1-based -> 0-based
            const col = Math.max(0, result.col - 1);
            diagnostics.push({
                severity: lintSeverityToLSP(result.severity),
                range: node_1.Range.create(node_1.Position.create(line, col), node_1.Position.create(line, col)),
                message: result.message,
                source: `purus-lint(${result.rule})`,
            });
        }
    }
    catch {
        // lint failure should not crash the server
    }
    return diagnostics;
}
//# sourceMappingURL=diagnostics.js.map