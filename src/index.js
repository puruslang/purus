"use strict";

const KEYWORDS = new Set([
  "const", "let", "var", "be",
  "fn", "async", "return", "to", "gives",
  "if", "elif", "else", "unless", "then",
  "while", "until", "do", "for", "in", "range",
  "match", "when", "switch", "case",
  "try", "catch", "finally", "throw",
  "import", "from", "export", "default", "require", "use", "namespace", "public", "all", "with",
  "add", "sub", "mul", "div", "fdiv", "mod", "neg", "pow",
  "eq", "neq", "lt", "gt", "le", "ge",
  "and", "or", "not", "pipe", "coal",
  "band", "bor", "bxor", "bnot", "shl", "shr", "ushr",
  "as", "of", "typeof", "instanceof", "type",
  "new", "delete", "this", "await", "yield", "void",
  "class", "extends", "super", "static", "private", "protected", "get", "set",
  "true", "false", "null", "nil", "undefined", "nan", "infinity",
  "break", "continue",
  "list", "object",
  "function",
  "blank",
]);

const BLOCK_STARTERS = new Set([
  "fn", "if", "elif", "else", "unless",
  "while", "until", "do", "for",
  "match", "when", "switch", "case",
  "try", "catch", "finally", "class",
]);

function tokenize(source) {
  const tokens = [];
  let i = 0;
  const len = source.length;

  while (i < len) {
    // Shebang
    if (i === 0 && source[i] === "#" && source[i + 1] === "!") {
      let end = source.indexOf("\n", i);
      if (end === -1) end = len;
      tokens.push({ type: "shebang", value: source.slice(i, end) });
      i = end;
      continue;
    }

    // Newline
    if (source[i] === "\n") {
      tokens.push({ type: "newline", value: "\n" });
      i++;
      continue;
    }

    // Carriage return
    if (source[i] === "\r") {
      i++;
      continue;
    }

    // Whitespace (not newline)
    if (source[i] === " " || source[i] === "\t") {
      let start = i;
      while (i < len && (source[i] === " " || source[i] === "\t")) i++;
      tokens.push({ type: "whitespace", value: source.slice(start, i) });
      continue;
    }

    // Block comment ---
    if (source[i] === "-" && source[i + 1] === "-" && source[i + 2] === "-") {
      let end = source.indexOf("---", i + 3);
      if (end === -1) end = len;
      else end += 3;
      tokens.push({ type: "block-comment", value: source.slice(i, end) });
      i = end;
      continue;
    }

    // Line comment --
    if (source[i] === "-" && source[i + 1] === "-") {
      let end = source.indexOf("\n", i);
      if (end === -1) end = len;
      tokens.push({ type: "comment", value: source.slice(i, end) });
      i = end;
      continue;
    }

    // String ///
    if (source[i] === "/" && source[i + 1] === "/" && source[i + 2] === "/") {
      let j = i + 3;
      while (j < len) {
        if (source[j] === "\\" && j + 1 < len) {
          j += 2;
          continue;
        }
        if (source[j] === "/" && source[j + 1] === "/" && source[j + 2] === "/") {
          j += 3;
          break;
        }
        j++;
      }
      tokens.push({ type: "string", value: source.slice(i, j) });
      i = j;
      continue;
    }

    // Semicolon string //;...;//
    if (source[i] === "/" && source[i + 1] === "/" && source[i + 2] === ";") {
      let j = i + 3;
      while (j < len) {
        if (source[j] === "\\" && j + 1 < len) { j += 2; continue; }
        if (source[j] === ";" && source[j + 1] === "/" && source[j + 2] === "/") { j += 3; break; }
        j++;
      }
      tokens.push({ type: "string", value: source.slice(i, j) });
      i = j;
      continue;
    }

    // Punctuation
    if ("[],;".includes(source[i])) {
      tokens.push({ type: "punct", value: source[i] });
      i++;
      continue;
    }

    // Optional chaining \.
    if (source[i] === "\\" && source[i + 1] === ".") {
      tokens.push({ type: "punct", value: "\\." });
      i += 2;
      continue;
    }

    // Backslash (computed access prefix)
    if (source[i] === "\\") {
      tokens.push({ type: "punct", value: "\\" });
      i++;
      continue;
    }

    // Dot
    if (source[i] === ".") {
      tokens.push({ type: "punct", value: source[i] });
      i++;
      continue;
    }

    // Word (identifier or keyword)
    if (/[a-zA-Z_]/.test(source[i])) {
      let start = i;
      while (i < len && /[a-zA-Z0-9_-]/.test(source[i])) i++;
      const word = source.slice(start, i);
      tokens.push({ type: KEYWORDS.has(word) ? "keyword" : "ident", value: word });
      continue;
    }

    // Number (decimal, 0b binary, 0x hex, BigInt n-suffix)
    if (/[0-9]/.test(source[i])) {
      let start = i;
      if (source[i] === "0" && i + 1 < len && (source[i + 1] === "b" || source[i + 1] === "B")) {
        i += 2;
        while (i < len && /[01]/.test(source[i])) i++;
      } else if (source[i] === "0" && i + 1 < len && (source[i + 1] === "x" || source[i + 1] === "X")) {
        i += 2;
        while (i < len && /[0-9a-fA-F]/.test(source[i])) i++;
      } else {
        while (i < len && /[0-9]/.test(source[i])) i++;
        if (i < len && source[i] === "." && i + 1 < len && /[0-9]/.test(source[i + 1])) {
          i++;
          while (i < len && /[0-9]/.test(source[i])) i++;
        }
      }
      // BigInt suffix: n
      if (i < len && source[i] === "n" && (i + 1 >= len || !/[a-zA-Z0-9_]/.test(source[i + 1]))) {
        i++;
      }
      tokens.push({ type: "number", value: source.slice(start, i) });
      continue;
    }

    // Regex /pattern/flags
    if (source[i] === "/" && source[i + 1] !== "/") {
      let j = i + 1;
      while (j < len && source[j] !== "/" && source[j] !== "\n") {
        if (source[j] === "\\") j++;
        j++;
      }
      if (j < len && source[j] === "/") {
        j++;
        while (j < len && /[gimsuy]/.test(source[j])) j++;
        tokens.push({ type: "regex", value: source.slice(i, j) });
        i = j;
        continue;
      }
    }

    // Other characters
    tokens.push({ type: "other", value: source[i] });
    i++;
  }

  return tokens;
}

function parseLinesFromTokens(tokens) {
  const lines = [];
  let current = [];

  for (const tok of tokens) {
    if (tok.type === "newline") {
      lines.push(current);
      current = [];
    } else {
      current.push(tok);
    }
  }
  if (current.length > 0) lines.push(current);
  return lines;
}

function getLineIndent(lineTokens) {
  if (lineTokens.length === 0) return 0;
  if (lineTokens[0].type === "whitespace") {
    let count = 0;
    for (const ch of lineTokens[0].value) {
      count += ch === "\t" ? 2 : 1;
    }
    return count;
  }
  return 0;
}

function getFirstWord(lineTokens) {
  for (const tok of lineTokens) {
    if (tok.type === "whitespace") continue;
    if (tok.type === "keyword" || tok.type === "ident") return tok.value;
    return null;
  }
  return null;
}

function isEmptyLine(lineTokens) {
  return lineTokens.every(t => t.type === "whitespace");
}

/**
 * Returns "postfix", "prefix", or null for the backslash token at content[ti].
 * Postfix: (ident | ] | number) \ (add|sub keyword)  → x\add, x\sub
 * Prefix:  (add|sub keyword) \ ident                 → add\x, sub\x
 */
function isIncrDecrSlash(content, ti) {
  if (content[ti].value !== "\\") return null;
  let ni = ti + 1;
  while (ni < content.length && content[ni].type === "whitespace") ni++;
  let pi = ti - 1;
  while (pi >= 0 && content[pi].type === "whitespace") pi--;
  const nextTok = ni < content.length ? content[ni] : null;
  const prevTok = pi >= 0 ? content[pi] : null;
  if (nextTok && nextTok.type === "keyword" && (nextTok.value === "add" || nextTok.value === "sub")) {
    if (prevTok && (prevTok.type === "ident" || prevTok.value === "]" || prevTok.type === "number")) {
      return "postfix";
    }
  }
  if (prevTok && prevTok.type === "keyword" && (prevTok.value === "add" || prevTok.value === "sub")) {
    if (nextTok && nextTok.type === "ident") {
      return "prefix";
    }
  }
  return null;
}

function formatPurus(source, options = {}) {
  const indent = options.tabWidth || 2;
  const useTabs = options.useTabs || false;
  const indentStr = useTabs ? "\t" : " ".repeat(indent);

  const tokens = tokenize(source);
  const lines = parseLinesFromTokens(tokens);

  const result = [];

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];

    if (isEmptyLine(line)) {
      result.push("");
      continue;
    }

    // Get original indent level
    const origIndent = getLineIndent(line);
    const indentLevel = Math.round(origIndent / indent);

    // Remove leading whitespace from tokens
    const contentTokens = line.filter(t => t.type !== "whitespace" || line.indexOf(t) !== 0);
    // Actually, remove ALL leading whitespace
    let startIdx = 0;
    while (startIdx < line.length && line[startIdx].type === "whitespace") startIdx++;
    const content = line.slice(startIdx);

    if (content.length === 0) {
      result.push("");
      continue;
    }

    // Rebuild line with normalized indent
    const prefix = indentStr.repeat(indentLevel);

    // Normalize spacing within content
    let lineStr = "";
    for (let ti = 0; ti < content.length; ti++) {
      const tok = content[ti];
      if (tok.type === "whitespace") {
        // Normalize to single space between tokens, but not before [ or after [, or before ]
        const next = content[ti + 1];
        const prevChar = lineStr.length > 0 ? lineStr[lineStr.length - 1] : "";
        // Suppress space before an incr/decr backslash
        const nextIsIncrDecrSlash = next && next.value === "\\" && isIncrDecrSlash(content, ti + 1) !== null;
        // Suppress space after an incr/decr backslash
        let prevIsIncrDecrSlash = false;
        { let pi = ti - 1; while (pi >= 0 && content[pi].type === "whitespace") pi--;
          prevIsIncrDecrSlash = pi >= 0 && content[pi].value === "\\" && isIncrDecrSlash(content, pi) !== null; }
        if (lineStr.length > 0 && next && next.value !== "]" && next.value !== "[" && prevChar !== "[" && !nextIsIncrDecrSlash && !prevIsIncrDecrSlash) {
          lineStr += " ";
        }
      } else {
        if (ti > 0 && content[ti - 1].type !== "whitespace" && lineStr.length > 0) {
          // Adjacent non-whitespace tokens - check if space needed
          const prev = lineStr[lineStr.length - 1];
          let suppressSpace = false;
          if (tok.value === "." || prev === ".") {
            suppressSpace = true; // No space around dots
          } else if (tok.value === "," || tok.value === ";") {
            suppressSpace = true; // No space before comma/semicolon
          } else if (tok.value === "[" || tok.value === "]" || prev === "[") {
            suppressSpace = true; // No space around brackets
          } else if (tok.value === "\\" && isIncrDecrSlash(content, ti) !== null) {
            suppressSpace = true; // No space before incr/decr backslash
          } else {
            // No space after incr/decr backslash
            let pi = ti - 1;
            while (pi >= 0 && content[pi].type === "whitespace") pi--;
            if (pi >= 0 && content[pi].value === "\\" && isIncrDecrSlash(content, pi) !== null) {
              suppressSpace = true;
            }
          }
          if (!suppressSpace) lineStr += " ";
        }
        lineStr += tok.value;
      }
    }

    // Ensure space after comma/semicolon
    lineStr = lineStr.replace(/,(?!\s)/g, ", ");
    lineStr = lineStr.replace(/;(?!\s)/g, "; ");

    // No trailing whitespace
    lineStr = lineStr.trimEnd();

    result.push(prefix + lineStr);
  }

  // Ensure trailing newline
  let output = result.join("\n");
  if (!output.endsWith("\n")) output += "\n";

  return output;
}

// Prettier plugin interface
const languages = [
  {
    name: "Purus",
    parsers: ["purus"],
    extensions: [".purus", ".cpurus", ".mpurus"],
    vscodeLanguageIds: ["purus"],
  },
];

const parsers = {
  purus: {
    parse(text) {
      return { type: "purus-root", body: text };
    },
    astFormat: "purus-ast",
    locStart: () => 0,
    locEnd: (node) => (node.body ? node.body.length : 0),
  },
};

const printers = {
  "purus-ast": {
    print(path, options) {
      const node = path.getValue();
      return formatPurus(node.body, {
        tabWidth: options.tabWidth,
        useTabs: options.useTabs,
      });
    },
  },
};

module.exports = { languages, parsers, printers };
