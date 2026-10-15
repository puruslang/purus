import {
  SignatureHelp,
  SignatureInformation,
  ParameterInformation,
} from "vscode-languageserver/node";
import { Scope, findScopeAtPosition, lookupSymbol, PurusSymbol, SymbolKind } from "./symbols";
import { Token, TokenKind } from "./token";

export function getSignatureHelp(
  rootScope: Scope,
  tokens: Token[],
  source: string,
  line: number,
  col: number
): SignatureHelp | null {
  // Find the function call context at cursor
  const ctx = findCallContext(tokens, source, line, col);
  if (!ctx) return null;

  const scope = findScopeAtPosition(rootScope, line, col);
  const sym = lookupSymbol(scope, ctx.funcName);
  if (!sym || !sym.params || sym.params.length === 0) return null;

  const paramLabels = sym.params.map((p) =>
    p.typeAnnotation ? `${p.name} of ${p.typeAnnotation}` : p.name
  );

  const label = `${sym.name}[${paramLabels.join("; ")}]`;

  const parameters: ParameterInformation[] = sym.params.map((p) => ({
    label: p.typeAnnotation ? `${p.name} of ${p.typeAnnotation}` : p.name,
    documentation: p.typeAnnotation
      ? `Parameter \`${p.name}\` of type \`${p.typeAnnotation}\``
      : `Parameter \`${p.name}\``,
  }));

  const sig: SignatureInformation = {
    label,
    parameters,
  };

  if (sym.returnType) {
    sig.documentation = `Returns: ${sym.returnType}`;
  }

  return {
    signatures: [sig],
    activeSignature: 0,
    activeParameter: ctx.argIndex,
  };
}

interface CallContext {
  funcName: string;
  argIndex: number;
}

function findCallContext(
  tokens: Token[],
  source: string,
  line: number,
  col: number
): CallContext | null {
  // Find the token position at cursor
  let tokenIdx = -1;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.span.start.line > line || (t.span.start.line === line && t.span.start.column > col)) {
      tokenIdx = i - 1;
      break;
    }
    tokenIdx = i;
  }

  if (tokenIdx < 0) return null;

  // Walk backwards to find enclosing [
  let depth = 0;
  let argIndex = 0;

  for (let i = tokenIdx; i >= 0; i--) {
    const t = tokens[i];

    if (t.kind === TokenKind.RBracket) {
      depth++;
    } else if (t.kind === TokenKind.LBracket) {
      if (depth > 0) {
        depth--;
      } else {
        // Found the opening bracket
        // Look at the token before [ for the function name
        if (i > 0) {
          const before = tokens[i - 1];
          if (before.kind === TokenKind.Ident) {
            return { funcName: before.text, argIndex };
          }
        }
        return null;
      }
    } else if (t.kind === TokenKind.Semicolon && depth === 0) {
      argIndex++;
    } else if (t.kind === TokenKind.Comma && depth === 0) {
      argIndex++;
    }
  }

  return null;
}
