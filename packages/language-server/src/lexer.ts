import { Token, TokenKind, Position, Span, KEYWORDS } from "./token";

export function tokenize(source: string): Token[] {
  const lexer = new Lexer(source);
  return lexer.tokenize();
}

class Lexer {
  private source: string;
  private pos: number = 0;
  private line: number = 0;
  private col: number = 0;
  private tokens: Token[] = [];
  private bracketDepth: number = 0;
  private atLineStart: boolean = true;

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    // Shebang
    if (this.source.startsWith("#!")) {
      this.readShebang();
    }

    while (this.pos < this.source.length) {
      if (this.atLineStart && this.bracketDepth === 0) {
        this.readIndent();
        this.atLineStart = false;
      }
      this.readToken();
    }

    this.pushToken(TokenKind.Eof, "", this.makePos(), this.makePos());
    return this.tokens;
  }

  private readToken(): void {
    if (this.pos >= this.source.length) return;

    const ch = this.source[this.pos];

    // Newline
    if (ch === "\n") {
      const start = this.makePos();
      this.advance();
      const end = this.makePos();
      if (this.bracketDepth === 0) {
        this.pushToken(TokenKind.Newline, "\n", start, end);
      }
      this.atLineStart = true;
      return;
    }

    // Carriage return
    if (ch === "\r") {
      this.advance();
      return;
    }

    // Whitespace (non-newline)
    if (ch === " " || ch === "\t") {
      this.skipWhitespace();
      return;
    }

    // Block comment --- ... ---
    if (this.match("---")) {
      this.readBlockComment();
      return;
    }

    // Line comment --
    if (this.match("--")) {
      this.readLineComment();
      return;
    }

    // String literal ///...///
    if (this.match("///")) {
      this.readString("///", "///");
      return;
    }

    // Semicolon string //;...;// (v0.11.0)
    if (this.match("//;")) {
      this.readString("//;", ";//");
      return;
    }

    // Regex literal /pattern/flags
    if (ch === "/" && this.isRegexStart()) {
      this.readRegex();
      return;
    }

    // Optional chaining \.
    if (ch === "\\" && this.pos + 1 < this.source.length && this.source[this.pos + 1] === ".") {
      const start = this.makePos();
      this.advance();
      this.advance();
      this.pushToken(TokenKind.OptionalDot, "\\.", start, this.makePos());
      return;
    }

    // Backslash (computed access)
    if (ch === "\\") {
      const start = this.makePos();
      this.advance();
      this.pushToken(TokenKind.Backslash, "\\", start, this.makePos());
      return;
    }

    // Triple dot ...
    if (this.match("...")) {
      const start = this.makePos();
      this.advance();
      this.advance();
      this.advance();
      this.pushToken(TokenKind.DotDotDot, "...", start, this.makePos());
      return;
    }

    // Double dot ..
    if (this.match("..")) {
      const start = this.makePos();
      this.advance();
      this.advance();
      this.pushToken(TokenKind.DotDot, "..", start, this.makePos());
      return;
    }

    // Dot
    if (ch === ".") {
      const start = this.makePos();
      this.advance();
      this.pushToken(TokenKind.Dot, ".", start, this.makePos());
      return;
    }

    // Brackets
    if (ch === "[") {
      const start = this.makePos();
      this.advance();
      this.bracketDepth++;
      this.pushToken(TokenKind.LBracket, "[", start, this.makePos());
      return;
    }
    if (ch === "]") {
      const start = this.makePos();
      this.advance();
      if (this.bracketDepth > 0) this.bracketDepth--;
      this.pushToken(TokenKind.RBracket, "]", start, this.makePos());
      return;
    }

    // Comma
    if (ch === ",") {
      const start = this.makePos();
      this.advance();
      this.pushToken(TokenKind.Comma, ",", start, this.makePos());
      return;
    }

    // Semicolon
    if (ch === ";") {
      const start = this.makePos();
      this.advance();
      this.pushToken(TokenKind.Semicolon, ";", start, this.makePos());
      return;
    }

    // Number (digit or negative number after certain tokens)
    if (this.isDigit(ch) || (ch === "-" && this.isNegativeNumberStart())) {
      this.readNumber();
      return;
    }

    // Identifier / keyword
    if (this.isIdentStart(ch)) {
      this.readWord();
      return;
    }

    // Unknown character
    const start = this.makePos();
    const text = ch;
    this.advance();
    this.pushToken(TokenKind.Error, text, start, this.makePos());
  }

  private readShebang(): void {
    const start = this.makePos();
    while (this.pos < this.source.length && this.source[this.pos] !== "\n") {
      this.advance();
    }
    this.pushToken(TokenKind.Shebang, this.source.slice(start.offset, this.pos), start, this.makePos());
    if (this.pos < this.source.length) {
      this.advance(); // consume newline
      this.atLineStart = true;
    }
  }

  private readIndent(): void {
    const start = this.makePos();
    let spaces = 0;
    while (this.pos < this.source.length) {
      const ch = this.source[this.pos];
      if (ch === " ") {
        spaces++;
        this.advance();
      } else if (ch === "\t") {
        spaces += 2;
        this.advance();
      } else {
        break;
      }
    }
    // Skip empty/comment-only lines
    if (this.pos < this.source.length && this.source[this.pos] !== "\n" && this.source[this.pos] !== "\r" &&
        !this.match("--")) {
      if (spaces > 0) {
        const token: Token = {
          kind: TokenKind.Indent,
          text: this.source.slice(start.offset, this.pos),
          value: spaces,
          span: { start, end: this.makePos() },
        };
        this.tokens.push(token);
      }
    }
  }

  private readBlockComment(): void {
    const start = this.makePos();
    this.advance(); // -
    this.advance(); // -
    this.advance(); // -

    while (this.pos < this.source.length) {
      if (this.match("---")) {
        this.advance();
        this.advance();
        this.advance();
        this.pushToken(TokenKind.BlockComment, this.source.slice(start.offset, this.pos), start, this.makePos());
        return;
      }
      if (this.source[this.pos] === "\n") {
        this.advance();
        this.atLineStart = true;
      } else {
        this.advance();
      }
    }
    // Unterminated block comment
    this.pushToken(TokenKind.BlockComment, this.source.slice(start.offset, this.pos), start, this.makePos());
  }

  private readLineComment(): void {
    const start = this.makePos();
    this.advance(); // -
    this.advance(); // -
    while (this.pos < this.source.length && this.source[this.pos] !== "\n") {
      this.advance();
    }
    this.pushToken(TokenKind.Comment, this.source.slice(start.offset, this.pos), start, this.makePos());
  }

  /**
   * Read a string with given open/close delimiters.
   *   open  = "///" | "//;"
   *   close = "///" | ";//"
   */
  private readString(open: string, close: string): void {
    const start = this.makePos();
    for (let i = 0; i < open.length; i++) this.advance();

    let value = "";

    while (this.pos < this.source.length) {
      if (this.match(close)) {
        for (let i = 0; i < close.length; i++) this.advance();
        this.pushToken(TokenKind.Str, this.source.slice(start.offset, this.pos), start, this.makePos(), value);
        return;
      }

      const ch = this.source[this.pos];

      if (ch === "\\") {
        this.advance();
        if (this.pos < this.source.length) {
          const esc = this.source[this.pos];
          switch (esc) {
            case "n":  value += "\n"; break;
            case "t":  value += "\t"; break;
            case "\\": value += "\\"; break;
            case "/":  value += "/";  break;
            case ";":  value += ";";  break;
            case "[":  value += "[";  break;
            case "]":  value += "]";  break;
            default:   value += "\\" + esc; break;
          }
          this.advance();
        }
        continue;
      }

      // [expr] interpolation — track depth to avoid closing string on ]
      if (ch === "[") {
        let depth = 1;
        value += "[";
        this.advance();
        while (this.pos < this.source.length && depth > 0) {
          const c = this.source[this.pos];
          if (c === "[") depth++;
          if (c === "]") depth--;
          if (depth > 0) value += c;
          this.advance();
        }
        value += "]";
        continue;
      }

      value += ch;
      this.advance();
    }

    // Unterminated string
    this.pushToken(TokenKind.Str, this.source.slice(start.offset, this.pos), start, this.makePos(), value);
  }

  private readRegex(): void {
    const start = this.makePos();
    this.advance(); // /

    let pattern = "";
    let escaped = false;
    let inCharClass = false;

    while (this.pos < this.source.length) {
      const ch = this.source[this.pos];
      if (escaped) {
        pattern += ch;
        escaped = false;
        this.advance();
        continue;
      }
      if (ch === "\\") {
        pattern += ch;
        escaped = true;
        this.advance();
        continue;
      }
      if (ch === "[") {
        inCharClass = true;
        pattern += ch;
        this.advance();
        continue;
      }
      if (ch === "]" && inCharClass) {
        inCharClass = false;
        pattern += ch;
        this.advance();
        continue;
      }
      if (ch === "/" && !inCharClass) {
        this.advance(); // consume closing /
        break;
      }
      if (ch === "\n") break; // unterminated
      pattern += ch;
      this.advance();
    }

    // Read flags
    let flags = "";
    while (this.pos < this.source.length && /[gimsuy]/.test(this.source[this.pos])) {
      flags += this.source[this.pos];
      this.advance();
    }

    const text = this.source.slice(start.offset, this.pos);
    const token: Token = {
      kind: TokenKind.Regex,
      text,
      value: pattern,
      span: { start, end: this.makePos() },
    };
    this.tokens.push(token);
  }

  private readNumber(): void {
    const start = this.makePos();
    let text = "";

    // Optional leading minus (negative literal)
    if (this.source[this.pos] === "-") {
      text += "-";
      this.advance();
    }

    // Hex literal: 0x...
    if (this.source[this.pos] === "0" &&
        this.pos + 1 < this.source.length &&
        (this.source[this.pos + 1] === "x" || this.source[this.pos + 1] === "X")) {
      text += this.source[this.pos]; this.advance(); // 0
      text += this.source[this.pos]; this.advance(); // x/X
      const hexDigitStart = text.length;
      while (this.pos < this.source.length && /[0-9a-fA-F]/.test(this.source[this.pos])) {
        text += this.source[this.pos];
        this.advance();
      }
      const hexDigits = text.slice(hexDigitStart);
      if (hexDigits.length === 0) {
        this.pushToken(TokenKind.Error, text, start, this.makePos());
        return;
      }
      // BigInt suffix n
      if (this.pos < this.source.length && this.source[this.pos] === "n") {
        text += "n";
        this.advance();
        this.pushToken(TokenKind.BigInt, text, start, this.makePos(), text);
      } else {
        const sign = text.startsWith("-") ? -1 : 1;
        this.pushToken(TokenKind.Int, text, start, this.makePos(), sign * parseInt(hexDigits, 16));
      }
      return;
    }

    // Binary literal: 0b...
    if (this.source[this.pos] === "0" &&
        this.pos + 1 < this.source.length &&
        (this.source[this.pos + 1] === "b" || this.source[this.pos + 1] === "B")) {
      text += this.source[this.pos]; this.advance(); // 0
      text += this.source[this.pos]; this.advance(); // b/B
      const binDigitStart = text.length;
      while (this.pos < this.source.length && (this.source[this.pos] === "0" || this.source[this.pos] === "1")) {
        text += this.source[this.pos];
        this.advance();
      }
      const binDigits = text.slice(binDigitStart);
      if (binDigits.length === 0) {
        this.pushToken(TokenKind.Error, text, start, this.makePos());
        return;
      }
      // BigInt suffix n
      if (this.pos < this.source.length && this.source[this.pos] === "n") {
        text += "n";
        this.advance();
        this.pushToken(TokenKind.BigInt, text, start, this.makePos(), text);
      } else {
        const sign = text.startsWith("-") ? -1 : 1;
        this.pushToken(TokenKind.Int, text, start, this.makePos(), sign * parseInt(binDigits, 2));
      }
      return;
    }

    // Decimal integer or float
    let isFloat = false;
    while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
      text += this.source[this.pos];
      this.advance();
    }

    if (this.pos < this.source.length && this.source[this.pos] === "." &&
        this.pos + 1 < this.source.length && this.isDigit(this.source[this.pos + 1])) {
      isFloat = true;
      text += ".";
      this.advance();
      while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
        text += this.source[this.pos];
        this.advance();
      }
    }

    // BigInt suffix n (decimal only, not float)
    if (!isFloat && this.pos < this.source.length && this.source[this.pos] === "n") {
      text += "n";
      this.advance();
      this.pushToken(TokenKind.BigInt, text, start, this.makePos(), text);
      return;
    }

    const kind = isFloat ? TokenKind.Float : TokenKind.Int;
    const value = isFloat ? parseFloat(text) : parseInt(text, 10);
    this.pushToken(kind, text, start, this.makePos(), value);
  }

  private readWord(): void {
    const start = this.makePos();
    let text = "";

    while (this.pos < this.source.length) {
      const ch = this.source[this.pos];
      if (this.isIdentChar(ch)) {
        text += ch;
        this.advance();
      } else {
        break;
      }
    }

    // Remove trailing hyphens (e.g., identifier followed by negative number)
    while (text.endsWith("-")) {
      text = text.slice(0, -1);
      this.pos--;
      this.col--;
    }

    const keywordKind = KEYWORDS.get(text);
    if (keywordKind !== undefined) {
      this.pushToken(keywordKind, text, start, this.makePos());
    } else {
      this.pushToken(TokenKind.Ident, text, start, this.makePos());
    }
  }

  // --- Helpers ---

  private makePos(): Position {
    return { line: this.line, column: this.col, offset: this.pos };
  }

  private advance(): void {
    if (this.pos < this.source.length) {
      if (this.source[this.pos] === "\n") {
        this.line++;
        this.col = 0;
      } else {
        this.col++;
      }
      this.pos++;
    }
  }

  private match(s: string): boolean {
    return this.source.startsWith(s, this.pos);
  }

  private skipWhitespace(): void {
    while (this.pos < this.source.length) {
      const ch = this.source[this.pos];
      if (ch === " " || ch === "\t") {
        this.advance();
      } else {
        break;
      }
    }
  }

  private pushToken(kind: TokenKind, text: string, start: Position, end: Position, value?: string | number): void {
    const token: Token = {
      kind,
      text,
      span: { start, end },
    };
    if (value !== undefined) {
      token.value = value;
    }
    this.tokens.push(token);
  }

  private isDigit(ch: string): boolean {
    return ch >= "0" && ch <= "9";
  }

  private isIdentStart(ch: string): boolean {
    return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_";
  }

  private isIdentChar(ch: string): boolean {
    return this.isIdentStart(ch) || this.isDigit(ch) || ch === "-";
  }

  // Token kinds after which `-` or `/` starts a new expression
  // (negative number literal or regex literal) rather than an
  // infix operator (subtraction or division).
  private static readonly EXPR_START_KINDS = new Set([
    TokenKind.LBracket, TokenKind.Comma, TokenKind.Semicolon,
    TokenKind.Be, TokenKind.Backslash, TokenKind.Newline,
    TokenKind.Indent, TokenKind.Return, TokenKind.To,
    TokenKind.Then, TokenKind.Coal, TokenKind.Pipe,
    TokenKind.Eq, TokenKind.Neq, TokenKind.And, TokenKind.Or,
    TokenKind.Not, TokenKind.If, TokenKind.Elif, TokenKind.Else,
    TokenKind.Unless, TokenKind.While, TokenKind.Until,
    TokenKind.For, TokenKind.In,
    TokenKind.Match, TokenKind.When, TokenKind.Throw, TokenKind.Await,
    // v0.9.0: bitwise/shift operators, yield, void, do
    TokenKind.Band, TokenKind.Bor, TokenKind.Bxor, TokenKind.Bnot,
    TokenKind.Shl, TokenKind.Shr, TokenKind.Ushr, TokenKind.Fdiv,
    TokenKind.Yield, TokenKind.Void, TokenKind.Do,
    // switch/case
    TokenKind.Case, TokenKind.Switch,
  ]);

  private isExprStartAfter(prev: Token | undefined): boolean {
    if (!prev) return true;
    return Lexer.EXPR_START_KINDS.has(prev.kind);
  }

  private isNegativeNumberStart(): boolean {
    if (this.pos + 1 >= this.source.length) return false;
    if (!this.isDigit(this.source[this.pos + 1])) return false;
    return this.isExprStartAfter(this.lastNonTriviaToken());
  }

  private isRegexStart(): boolean {
    // Regex starts with / but not /// (which is a string)
    if (this.match("///")) return false;
    // Must have content before closing /
    if (this.pos + 1 >= this.source.length) return false;
    const next = this.source[this.pos + 1];
    if (next === " " || next === "\n" || next === "\r") return false;
    return this.isExprStartAfter(this.lastNonTriviaToken());
  }

  private lastNonTriviaToken(): Token | undefined {
    for (let i = this.tokens.length - 1; i >= 0; i--) {
      const t = this.tokens[i];
      if (
        t.kind !== TokenKind.Comment &&
        t.kind !== TokenKind.BlockComment &&
        t.kind !== TokenKind.Shebang
      ) {
        return t;
      }
    }
    return undefined;
  }
}
