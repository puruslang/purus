export type Severity = "error" | "warn" | "off";

export interface RuleConfig {
  severity?: Severity;
  message?: string;
  size?: number;
  max?: number;
  style?: string;
}

export type Rules = Record<string, RuleConfig>;

export type TokenType =
  | "newline"
  | "whitespace"
  | "block-comment"
  | "comment"
  | "string"
  | "punct"
  | "keyword"
  | "ident"
  | "number"
  | "shebang"
  | "other";

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  col: number;
}

export interface Diagnostic {
  rule: string;
  severity: Exclude<Severity, "off">;
  line: number;
  col: number;
  message: string;
}
const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "be",
  "fn",
  "async",
  "return",
  "to",
  "gives",
  "if",
  "elif",
  "else",
  "unless",
  "then",
  "while",
  "until",
  "do",
  "for",
  "in",
  "range",
  "match",
  "when",
  "switch",
  "case",
  "try",
  "catch",
  "finally",
  "throw",
  "import",
  "from",
  "export",
  "default",
  "require",
  "use",
  "namespace",
  "public",
  "all",
  "with",
  "add",
  "sub",
  "mul",
  "div",
  "fdiv",
  "mod",
  "neg",
  "pow",
  "eq",
  "neq",
  "lt",
  "gt",
  "le",
  "ge",
  "and",
  "or",
  "not",
  "pipe",
  "coal",
  "band",
  "bor",
  "bxor",
  "bnot",
  "shl",
  "shr",
  "ushr",
  "as",
  "of",
  "typeof",
  "instanceof",
  "type",
  "new",
  "delete",
  "this",
  "await",
  "yield",
  "void",
  "class",
  "extends",
  "super",
  "static",
  "private",
  "protected",
  "get",
  "set",
  "true",
  "false",
  "null",
  "nil",
  "undefined",
  "nan",
  "infinity",
  "break",
  "continue",
  "list",
  "object",
  "function",
  "blank",
]);

export function tokenize(source: string): Token[] {
  source = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const tokens: Token[] = [];
  let i = 0;
  let line = 1;
  let col = 1;
  const len = source.length;

  while (i < len) {
    const startLine = line;
    const startCol = col;

    // Newline
    if (source[i] === "\n") {
      tokens.push({
        type: "newline",
        value: "\n",
        line: startLine,
        col: startCol,
      });
      i++;
      line++;
      col = 1;
      continue;
    }
    if (source[i] === "\r") {
      i++;
      continue;
    }

    // Whitespace
    if (source[i] === " " || source[i] === "\t") {
      const start = i;
      while (i < len && (source[i] === " " || source[i] === "\t")) {
        i++;
        col++;
      }
      tokens.push({
        type: "whitespace",
        value: source.slice(start, i),
        line: startLine,
        col: startCol,
      });
      continue;
    }

    // Block comment ---
    if (source[i] === "-" && source[i + 1] === "-" && source[i + 2] === "-") {
      let end = source.indexOf("---", i + 3);
      if (end === -1) end = len;
      else end += 3;
      const val = source.slice(i, end);
      for (const ch of val) {
        if (ch === "\n") {
          line++;
          col = 1;
        } else {
          col++;
        }
      }
      tokens.push({
        type: "block-comment",
        value: val,
        line: startLine,
        col: startCol,
      });
      i = end;
      continue;
    }

    // Line comment --
    if (source[i] === "-" && source[i + 1] === "-") {
      let end = source.indexOf("\n", i);
      if (end === -1) end = len;
      tokens.push({
        type: "comment",
        value: source.slice(i, end),
        line: startLine,
        col: startCol,
      });
      col += end - i;
      i = end;
      continue;
    }

    // String ///
    if (source[i] === "/" && source[i + 1] === "/" && source[i + 2] === "/") {
      let j = i + 3;
      col += 3;
      while (j < len) {
        if (source[j] === "\\" && j + 1 < len) {
          j += 2;
          col += 2;
          continue;
        }
        if (
          source[j] === "/" &&
          source[j + 1] === "/" &&
          source[j + 2] === "/"
        ) {
          j += 3;
          col += 3;
          break;
        }
        if (source[j] === "\n") {
          line++;
          col = 1;
        } else {
          col++;
        }
        j++;
      }
      tokens.push({
        type: "string",
        value: source.slice(i, j),
        line: startLine,
        col: startCol,
      });
      i = j;
      continue;
    }

    // Semicolon string //;...;//
    if (source[i] === "/" && source[i + 1] === "/" && source[i + 2] === ";") {
      let j = i + 3;
      col += 3;
      while (j < len) {
        if (source[j] === "\\" && j + 1 < len) {
          j += 2;
          col += 2;
          continue;
        }
        if (
          source[j] === ";" &&
          source[j + 1] === "/" &&
          source[j + 2] === "/"
        ) {
          j += 3;
          col += 3;
          break;
        }
        if (source[j] === "\n") {
          line++;
          col = 1;
        } else {
          col++;
        }
        j++;
      }
      tokens.push({
        type: "string",
        value: source.slice(i, j),
        line: startLine,
        col: startCol,
      });
      i = j;
      continue;
    }

    // Punctuation
    if ("[],;".includes(source[i])) {
      tokens.push({
        type: "punct",
        value: source[i],
        line: startLine,
        col: startCol,
      });
      i++;
      col++;
      continue;
    }

    // Optional chaining \.
    if (source[i] === "\\" && source[i + 1] === ".") {
      tokens.push({
        type: "punct",
        value: "\\.",
        line: startLine,
        col: startCol,
      });
      i += 2;
      col += 2;
      continue;
    }

    // Backslash (computed access prefix)
    if (source[i] === "\\") {
      tokens.push({
        type: "punct",
        value: "\\",
        line: startLine,
        col: startCol,
      });
      i++;
      col++;
      continue;
    }

    // Dot
    if (source[i] === ".") {
      tokens.push({
        type: "punct",
        value: source[i],
        line: startLine,
        col: startCol,
      });
      i++;
      col++;
      continue;
    }

    // Word
    if (/[a-zA-Z_]/.test(source[i])) {
      const start = i;
      while (i < len && /[a-zA-Z0-9_-]/.test(source[i])) {
        i++;
        col++;
      }
      const word = source.slice(start, i);
      tokens.push({
        type: KEYWORDS.has(word) ? "keyword" : "ident",
        value: word,
        line: startLine,
        col: startCol,
      });
      continue;
    }

    // Number (decimal, 0b binary, 0x hex, BigInt n-suffix)
    if (/[0-9]/.test(source[i])) {
      const start = i;
      if (
        source[i] === "0" &&
        i + 1 < len &&
        (source[i + 1] === "b" || source[i + 1] === "B")
      ) {
        i += 2;
        col += 2;
        while (i < len && /[01]/.test(source[i])) {
          i++;
          col++;
        }
      } else if (
        source[i] === "0" &&
        i + 1 < len &&
        (source[i + 1] === "x" || source[i + 1] === "X")
      ) {
        i += 2;
        col += 2;
        while (i < len && /[0-9a-fA-F]/.test(source[i])) {
          i++;
          col++;
        }
      } else {
        while (i < len && /[0-9]/.test(source[i])) {
          i++;
          col++;
        }
        if (
          i < len &&
          source[i] === "." &&
          i + 1 < len &&
          /[0-9]/.test(source[i + 1])
        ) {
          i++;
          col++;
          while (i < len && /[0-9]/.test(source[i])) {
            i++;
            col++;
          }
        }
      }
      // BigInt suffix: n
      if (
        i < len &&
        source[i] === "n" &&
        (i + 1 >= len || !/[a-zA-Z0-9_]/.test(source[i + 1]))
      ) {
        i++;
        col++;
      }
      tokens.push({
        type: "number",
        value: source.slice(start, i),
        line: startLine,
        col: startCol,
      });
      continue;
    }

    // Shebang
    if (i === 0 && source[i] === "#" && source[i + 1] === "!") {
      let end = source.indexOf("\n", i);
      if (end === -1) end = len;
      tokens.push({
        type: "shebang",
        value: source.slice(i, end),
        line: startLine,
        col: startCol,
      });
      col += end - i;
      i = end;
      continue;
    }

    // Other
    tokens.push({
      type: "other",
      value: source[i],
      line: startLine,
      col: startCol,
    });
    i++;
    col++;
  }
  return tokens;
}

// --- Rules ---

export const defaultRules: Rules = {
  "no-var": {
    severity: "warn",
    message: "Avoid 'var'; use 'const' or 'let' instead",
  },
  "bare-assignment": {
    severity: "error",
    message:
      "Bare identifier assignment is not supported; use 'const x be ...' or 'let x be ...' instead",
  },
  "expression-body-no-return": {
    severity: "warn",
    message:
      "An expression body does not return its value; write `to return <expr>`",
  },
  "no-nil": { severity: "warn", message: "Use 'null' instead of 'nil'" },
  "no-function": {
    severity: "warn",
    message: "'function' is deprecated; use 'fn' instead",
  },
  "no-protected": {
    severity: "warn",
    message: "'protected' is deprecated; use 'private' instead",
  },
  "no-else-if": {
    severity: "warn",
    message: "Use 'elif' instead of 'else if'",
  },
  "no-js-chars": {
    severity: "error",
    message: "JavaScript characters are not allowed in Purus",
  },
  "no-js-operators": {
    severity: "error",
    message: "JavaScript operators are not allowed in Purus",
  },
  "no-for-range": {
    severity: "warn",
    message:
      "'for ... in range' is deprecated; use 'for let i be 0; i lt N; i\\add' instead",
  },
  "bracket-match": { severity: "error" },
  "const-reassign": {
    severity: "error",
    message: "Cannot reassign a 'const' variable",
  },
  "duplicate-use": { severity: "warn", message: "Duplicate 'use' import" },
  "indent-size": { severity: "warn", size: 2 },
  "no-trailing-whitespace": {
    severity: "warn",
    message: "Trailing whitespace",
  },
  "no-unused-import": { severity: "warn" },
  "consistent-naming": { severity: "warn", style: "kebab-case" },
  "max-line-length": { severity: "off", max: 100 },
};

const JS_FORBIDDEN_CHARS = new Set(["(", ")", "{", "}", "$", "#", "@", "`"]);
const JS_OPERATOR_MAP: Record<string, string> = {
  "===": "eq",
  "!==": "neq",
  "==": "eq",
  "!=": "neq",
  "&&": "and",
  "||": "or",
  "<<": "shl",
  ">>": "shr",
  ">>>": "ushr",
  "++": "\\add / add\\",
  "--": "\\sub / sub\\",
  "**": "pow",
  "+=": "add be",
  "-=": "sub be",
  "*=": "mul be",
  "/=": "div be",
  "%=": "mod be",
  "**=": "pow be",
  "&=": "band be",
  "|=": "bor be",
  "^=": "bxor be",
  "<<=": "shl be",
  ">>=": "shr be",
  ">>>=": "ushr be",
  "&&=": "and be",
  "||=": "or be",
  "??=": "coal be",
};

export function lint(source: string, ruleOverrides: Rules = {}): Diagnostic[] {
  const rules = { ...defaultRules, ...ruleOverrides };
  const diagnostics: Diagnostic[] = [];
  const tokens = tokenize(source);
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  function report(rule: string, line: number, col: number, message?: string) {
    const sev: Severity = rules[rule]?.severity || "warn";
    if (sev === "off") return;
    diagnostics.push({
      rule,
      severity: sev,
      line,
      col,
      message: message ?? defaultRules[rule]?.message ?? rule,
    });
  }

  // Track declarations for const-reassign
  const constVars = new Set();
  const letVars = new Set();
  // Track use imports for duplicate-use
  const useImports = new Set();
  // Track bracket matching
  const bracketStack: Token[] = [];

  // --- Token-level rules ---
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];

    // no-var
    if (
      rules["no-var"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "var"
    ) {
      report("no-var", tok.line, tok.col, rules["no-var"].message);
    }

    // expression-body-no-return: `fn name args to expr` (named fn or getter)
    // compiles to a statement, not a return. Anonymous `fn x to expr` returns.
    if (
      rules["expression-body-no-return"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "fn"
    ) {
      let p = i - 1;
      while (p >= 0 && tokens[p].type === "whitespace") p--;
      const prev = p >= 0 ? tokens[p] : null;
      const statementLevel =
        !prev ||
        prev.type === "newline" ||
        (prev.type === "keyword" &&
          [
            "async",
            "public",
            "export",
            "static",
            "get",
            "set",
            "default",
            "private",
          ].includes(prev.value));
      if (statementLevel) {
        let j = i + 1;
        while (j < tokens.length && tokens[j].type !== "newline") {
          if (tokens[j].type === "keyword" && tokens[j].value === "to") break;
          j++;
        }
        if (j < tokens.length && tokens[j].type === "keyword") {
          let k = j + 1;
          while (k < tokens.length && tokens[k].type === "whitespace") k++;
          const next = k < tokens.length ? tokens[k] : null;
          if (
            next &&
            next.type !== "newline" &&
            !(next.type === "keyword" && next.value === "return")
          ) {
            report(
              "expression-body-no-return",
              tokens[j].line,
              tokens[j].col,
              rules["expression-body-no-return"].message
            );
          }
        }
      }
    }
    // no-nil
    if (
      rules["no-nil"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "nil"
    ) {
      report("no-nil", tok.line, tok.col, rules["no-nil"].message);
    }

    // no-function
    if (
      rules["no-function"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "function"
    ) {
      report("no-function", tok.line, tok.col, rules["no-function"].message);
    }

    // no-protected
    if (
      rules["no-protected"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "protected"
    ) {
      report("no-protected", tok.line, tok.col, rules["no-protected"].message);
    }

    // no-else-if: detect 'else' followed by whitespace then 'if'
    if (
      rules["no-else-if"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "else"
    ) {
      let j = i + 1;
      while (j < tokens.length && tokens[j].type === "whitespace") j++;
      if (
        j < tokens.length &&
        tokens[j].type === "keyword" &&
        tokens[j].value === "if"
      ) {
        report("no-else-if", tok.line, tok.col, rules["no-else-if"].message);
      }
    }

    // no-js-chars
    if (
      rules["no-js-chars"]?.severity !== "off" &&
      tok.type === "other" &&
      JS_FORBIDDEN_CHARS.has(tok.value)
    ) {
      const charNames: Record<string, string> = {
        "(": "parenthesis",
        ")": "parenthesis",
        "{": "brace",
        "}": "brace",
        $: "'$'",
        "#": "'#'",
        "@": "'@'",
        "`": "backtick",
      };
      report(
        "no-js-chars",
        tok.line,
        tok.col,
        `JavaScript character ${charNames[tok.value] || `'${tok.value}'`} is not allowed in Purus`
      );
    }

    // no-js-chars: detect JS string quotes
    if (
      rules["no-js-chars"]?.severity !== "off" &&
      tok.type === "other" &&
      (tok.value === '"' || tok.value === "'")
    ) {
      report(
        "no-js-chars",
        tok.line,
        tok.col,
        `Use ///.../// strings instead of ${tok.value === '"' ? "double" : "single"} quotes`
      );
    }

    // no-js-operators
    if (rules["no-js-operators"]?.severity !== "off" && tok.type === "other") {
      // Check multi-char operators by peeking ahead
      const next1 = i + 1 < tokens.length ? tokens[i + 1] : null;
      const next2 = i + 2 < tokens.length ? tokens[i + 2] : null;
      const three = tok.value + (next1?.value || "") + (next2?.value || "");
      const two = tok.value + (next1?.value || "");
      if (JS_OPERATOR_MAP[three] && three.length === 3) {
        report(
          "no-js-operators",
          tok.line,
          tok.col,
          `Use '${JS_OPERATOR_MAP[three]}' instead of '${three}'`
        );
      } else if (JS_OPERATOR_MAP[two] && two.length === 2) {
        report(
          "no-js-operators",
          tok.line,
          tok.col,
          `Use '${JS_OPERATOR_MAP[two]}' instead of '${two}'`
        );
      }
    }

    // bracket-match (and always track bracket depth)
    if (tok.type === "punct") {
      if (tok.value === "[") {
        bracketStack.push(tok);
      } else if (tok.value === "]") {
        if (bracketStack.length === 0) {
          if (rules["bracket-match"]?.severity !== "off") {
            report(
              "bracket-match",
              tok.line,
              tok.col,
              "Unmatched closing bracket ']'"
            );
          }
        } else {
          bracketStack.pop();
        }
      }
    }

    // Track const/let declarations for const-reassign
    if (
      tok.type === "keyword" &&
      (tok.value === "const" || tok.value === "let")
    ) {
      let j = i + 1;
      while (j < tokens.length && tokens[j].type === "whitespace") j++;
      if (j < tokens.length && tokens[j].type === "ident") {
        if (tok.value === "const") constVars.add(tokens[j].value);
        else letVars.add(tokens[j].value);
      }
    }

    // const-reassign: ident be ... where ident is a known const
    if (
      rules["const-reassign"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "be" &&
      bracketStack.length === 0
    ) {
      let j = i - 1;
      while (j >= 0 && tokens[j].type === "whitespace") j--;
      if (
        j >= 0 &&
        tokens[j].type === "ident" &&
        constVars.has(tokens[j].value)
      ) {
        // Make sure it's not a declaration (const x be ...)
        let k = j - 1;
        while (k >= 0 && tokens[k].type === "whitespace") k--;
        // Skip type annotation: x of Type be ...
        if (
          k >= 0 &&
          tokens[k].type === "keyword" &&
          tokens[k].value === "of"
        ) {
          k--;
          while (k >= 0 && tokens[k].type === "whitespace") k--;
          if (
            k >= 0 &&
            (tokens[k].type === "ident" || tokens[k].type === "keyword")
          ) {
            k--;
            while (k >= 0 && tokens[k].type === "whitespace") k--;
          }
        }
        const isDecl =
          k >= 0 &&
          tokens[k].type === "keyword" &&
          (tokens[k].value === "const" ||
            tokens[k].value === "let" ||
            tokens[k].value === "var" ||
            tokens[k].value === "private" ||
            tokens[k].value === "protected" ||
            tokens[k].value === "static");
        if (!isDecl) {
          report(
            "const-reassign",
            tokens[j].line,
            tokens[j].col,
            `Cannot reassign const variable '${tokens[j].value}'`
          );
        }
      }
    }

    // duplicate-use
    if (
      rules["duplicate-use"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "use"
    ) {
      let j = i + 1;
      while (j < tokens.length && tokens[j].type === "whitespace") j++;
      if (
        j < tokens.length &&
        (tokens[j].type === "ident" || tokens[j].type === "keyword")
      ) {
        const moduleName = tokens[j].value;
        if (useImports.has(moduleName)) {
          report(
            "duplicate-use",
            tok.line,
            tok.col,
            `Duplicate 'use' import: '${moduleName}' is already imported`
          );
        } else {
          useImports.add(moduleName);
        }
      }
    }

    // bare-assignment: ident be <value> without const/let/var
    if (
      rules["bare-assignment"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "be" &&
      bracketStack.length === 0
    ) {
      // Walk backwards to find the statement start
      let j = i - 1;
      // Skip whitespace
      while (j >= 0 && tokens[j].type === "whitespace") j--;
      // The token before `be` should be an ident (the variable name)
      if (j >= 0 && tokens[j].type === "ident") {
        // Skip type annotations: ident of Type be ...
        let k = j - 1;
        while (k >= 0 && tokens[k].type === "whitespace") k--;
        if (
          k >= 0 &&
          tokens[k].type === "keyword" &&
          tokens[k].value === "of"
        ) {
          // Skip back past 'of' and its type
          k--;
          while (k >= 0 && tokens[k].type === "whitespace") k--;
          // Skip the identifier before 'of'
          if (k >= 0 && tokens[k].type === "ident") {
            k--;
            while (k >= 0 && tokens[k].type === "whitespace") k--;
          }
        } else {
          k = j - 1;
          while (k >= 0 && tokens[k].type === "whitespace") k--;
        }
        // Check if preceded by const/let/var/private/protected/static
        const hasDeclKeyword =
          k >= 0 &&
          tokens[k].type === "keyword" &&
          (tokens[k].value === "const" ||
            tokens[k].value === "let" ||
            tokens[k].value === "var" ||
            tokens[k].value === "private" ||
            tokens[k].value === "protected" ||
            tokens[k].value === "static");
        // Check if preceded by dot (property access: obj.field be ...)
        const isDotAccess =
          k >= 0 &&
          tokens[k].type === "punct" &&
          (tokens[k].value === "." || tokens[k].value === "\\.");
        // Check if preceded by ] (computed access: arr[\i] be ...)
        const isBracketAccess =
          k >= 0 && tokens[k].type === "punct" && tokens[k].value === "]";
        if (!hasDeclKeyword && !isDotAccess && !isBracketAccess) {
          report(
            "bare-assignment",
            tokens[j].line,
            tokens[j].col,
            rules["bare-assignment"].message
          );
        }
      }
    }

    // consistent-naming
    if (
      rules["consistent-naming"]?.severity !== "off" &&
      tok.type === "ident"
    ) {
      const style = rules["consistent-naming"].style || "kebab-case";
      if (style === "kebab-case") {
        if (/[A-Z]/.test(tok.value[0])) continue; // Allow PascalCase
      }
    }

    // no-for-range: for x in range ...
    if (
      rules["no-for-range"]?.severity !== "off" &&
      tok.type === "keyword" &&
      tok.value === "for"
    ) {
      let j = i + 1;
      while (j < tokens.length && tokens[j].type === "whitespace") j++;
      // skip ident
      if (j < tokens.length && tokens[j].type === "ident") {
        j++;
        while (j < tokens.length && tokens[j].type === "whitespace") j++;
        if (
          j < tokens.length &&
          tokens[j].type === "keyword" &&
          tokens[j].value === "in"
        ) {
          j++;
          while (j < tokens.length && tokens[j].type === "whitespace") j++;
          if (
            j < tokens.length &&
            tokens[j].type === "keyword" &&
            tokens[j].value === "range"
          ) {
            report(
              "no-for-range",
              tok.line,
              tok.col,
              rules["no-for-range"].message
            );
          }
        }
      }
    }
  }

  // bracket-match: report unclosed brackets
  if (rules["bracket-match"]?.severity !== "off") {
    for (const open of bracketStack) {
      report(
        "bracket-match",
        open.line,
        open.col,
        "Unmatched opening bracket '['"
      );
    }
  }

  // --- Line-level rules ---
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    const lineNum = li + 1;

    // no-trailing-whitespace
    if (rules["no-trailing-whitespace"]?.severity !== "off") {
      if (line.length > 0 && /\s+$/.test(line) && line.trim().length > 0) {
        report(
          "no-trailing-whitespace",
          lineNum,
          line.length,
          rules["no-trailing-whitespace"].message || "Trailing whitespace"
        );
      }
    }

    // indent-size
    if (rules["indent-size"]?.severity !== "off") {
      const match = line.match(/^( +)/);
      if (match) {
        const size = rules["indent-size"].size || 2;
        if (match[1].length % size !== 0) {
          report(
            "indent-size",
            lineNum,
            1,
            `Indentation should be a multiple of ${size} spaces (found ${match[1].length})`
          );
        }
      }
      // Warn on tabs if indent style is spaces
      if (/^\t/.test(line)) {
        report(
          "indent-size",
          lineNum,
          1,
          "Use spaces for indentation, not tabs"
        );
      }
    }

    // max-line-length
    if (rules["max-line-length"]?.severity !== "off") {
      const max = rules["max-line-length"].max || 100;
      if (line.length > max) {
        report(
          "max-line-length",
          lineNum,
          max + 1,
          `Line exceeds max length of ${max} (found ${line.length})`
        );
      }
    }
  }

  // Sort by line, then column
  diagnostics.sort((a, b) => a.line - b.line || a.col - b.col);
  return diagnostics;
}
