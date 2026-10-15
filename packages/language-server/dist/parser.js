"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
const token_1 = require("./token");
function parse(tokens) {
    const parser = new Parser(tokens);
    return parser.parse();
}
class Parser {
    constructor(tokens) {
        this.pos = 0;
        this.errors = [];
        this.currentIndent = 0;
        // Filter out trivia for parsing, but keep them in original for semantic tokens
        this.tokens = tokens.filter((t) => t.kind !== token_1.TokenKind.Comment && t.kind !== token_1.TokenKind.BlockComment && t.kind !== token_1.TokenKind.Shebang);
    }
    parse() {
        const stmts = [];
        this.skipNewlines();
        while (!this.isAtEnd()) {
            try {
                const stmt = this.parseStatement();
                if (stmt)
                    stmts.push(stmt);
            }
            catch {
                this.synchronize();
            }
            this.skipNewlines();
        }
        const span = stmts.length > 0
            ? this.mergeSpans(stmts[0].span, stmts[stmts.length - 1].span)
            : this.currentSpan();
        return {
            program: { type: "Program", stmts, span },
            errors: this.errors,
        };
    }
    // --- Statement Parsing ---
    parseStatement() {
        this.skipNewlines();
        if (this.isAtEnd())
            return null;
        const token = this.peek();
        // Handle indent tokens (skip if at expected level)
        if (token.kind === token_1.TokenKind.Indent) {
            this.advance();
            return this.parseStatement();
        }
        switch (token.kind) {
            case token_1.TokenKind.Const:
            case token_1.TokenKind.Let:
            case token_1.TokenKind.Var:
                return this.parseVarDecl();
            case token_1.TokenKind.Fn:
                return this.parseFnDecl(false);
            case token_1.TokenKind.Async: {
                const next = this.peekAt(1)?.kind;
                if (next === token_1.TokenKind.Fn || next === token_1.TokenKind.Function) {
                    return this.parseFnDecl(true);
                }
                return this.parseExprStatement();
            }
            case token_1.TokenKind.If:
                return this.parseIfStmt();
            case token_1.TokenKind.Unless:
                return this.parseUnlessStmt();
            case token_1.TokenKind.While:
                return this.parseWhileStmt();
            case token_1.TokenKind.Until:
                return this.parseUntilStmt();
            case token_1.TokenKind.Do:
                return this.parseDoWhile();
            case token_1.TokenKind.For:
                return this.parseForStmt();
            case token_1.TokenKind.Match:
                return this.parseMatchStmt();
            case token_1.TokenKind.Switch:
                return this.parseSwitchStmt();
            case token_1.TokenKind.Function:
                return this.parseFnDecl(false);
            case token_1.TokenKind.Try:
                return this.parseTryCatch();
            case token_1.TokenKind.Throw:
                return this.parseThrow();
            case token_1.TokenKind.Return:
                return this.parseReturn();
            case token_1.TokenKind.Break:
                return this.parseBreak();
            case token_1.TokenKind.Continue:
                return this.parseContinue();
            case token_1.TokenKind.Import:
                return this.parseImport();
            case token_1.TokenKind.Use:
                return this.parseUse();
            case token_1.TokenKind.From:
                return this.parseFromUse();
            case token_1.TokenKind.Export:
                return this.parseExport();
            case token_1.TokenKind.Public:
                return this.parsePublic();
            case token_1.TokenKind.Namespace:
                return this.parseNamespace();
            case token_1.TokenKind.Class:
                return this.parseClassDecl();
            case token_1.TokenKind.Type:
                return this.parseTypeDecl();
            case token_1.TokenKind.Delete:
                return this.parseDeleteStmt();
            default:
                return this.parseExprStatement();
        }
    }
    parseVarDecl() {
        const start = this.peek().span.start;
        const declToken = this.advance();
        const declKind = declToken.text;
        // Array destructuring: const [a; b] be expr
        if (this.check(token_1.TokenKind.LBracket)) {
            return this.parseArrayDestruct(declKind, start);
        }
        // Object destructuring: const object[a; b] be expr
        if (this.check(token_1.TokenKind.Object)) {
            return this.parseObjectDestruct(declKind, start);
        }
        // Simple binding: const x [of Type] be expr
        const nameToken = this.expect(token_1.TokenKind.Ident, "Expected identifier");
        const name = nameToken.text;
        const nameSpan = nameToken.span;
        let typeAnnotation;
        if (this.check(token_1.TokenKind.Of)) {
            this.advance();
            typeAnnotation = this.expect(token_1.TokenKind.Ident, "Expected type name").text;
        }
        this.expect(token_1.TokenKind.Be, "Expected 'be'");
        const init = this.parseExpression();
        const stmt = {
            type: "VarDecl",
            declKind,
            name,
            nameSpan,
            typeAnnotation,
            init,
            span: this.spanFrom(start),
        };
        return this.maybePostfix(stmt);
    }
    parseArrayDestruct(declKind, start) {
        this.advance(); // [
        const names = this.parseIdentList();
        this.expect(token_1.TokenKind.RBracket, "Expected ']'");
        this.expect(token_1.TokenKind.Be, "Expected 'be'");
        const init = this.parseExpression();
        return {
            type: "ArrayDestruct",
            declKind,
            names,
            init,
            span: this.spanFrom(start),
        };
    }
    parseObjectDestruct(declKind, start) {
        this.advance(); // object
        this.expect(token_1.TokenKind.LBracket, "Expected '['");
        const names = this.parseIdentList();
        this.expect(token_1.TokenKind.RBracket, "Expected ']'");
        this.expect(token_1.TokenKind.Be, "Expected 'be'");
        const init = this.parseExpression();
        return {
            type: "ObjectDestruct",
            declKind,
            names,
            init,
            span: this.spanFrom(start),
        };
    }
    parseFnDecl(isAsync) {
        const start = this.peek().span.start;
        if (isAsync)
            this.advance(); // async
        this.advance(); // fn / function
        // Named function: fn name params body
        const nameToken = this.expect(token_1.TokenKind.Ident, "Expected function name");
        const params = this.parseParamList();
        let returnType;
        if (this.check(token_1.TokenKind.Gives)) {
            this.advance();
            returnType = this.expect(token_1.TokenKind.Ident, "Expected return type").text;
        }
        const body = this.parseFnBody();
        return {
            type: "FnDecl",
            name: nameToken.text,
            nameSpan: nameToken.span,
            params,
            returnType,
            body,
            isAsync,
            span: this.spanFrom(start),
        };
    }
    parseParamList() {
        const params = [];
        while (!this.isAtEnd() && !this.check(token_1.TokenKind.To) && !this.check(token_1.TokenKind.Gives) &&
            !this.check(token_1.TokenKind.Newline) && !this.check(token_1.TokenKind.Indent) &&
            !this.isBlockStart()) {
            if (this.check(token_1.TokenKind.Ident)) {
                const nameToken = this.advance();
                let typeAnnotation;
                if (this.check(token_1.TokenKind.Of)) {
                    this.advance();
                    typeAnnotation = this.expect(token_1.TokenKind.Ident, "Expected type name").text;
                }
                params.push({
                    name: nameToken.text,
                    nameSpan: nameToken.span,
                    typeAnnotation,
                });
                if (this.check(token_1.TokenKind.Semicolon)) {
                    this.advance();
                }
            }
            else {
                break;
            }
        }
        return params;
    }
    parseFnBody() {
        if (this.check(token_1.TokenKind.To)) {
            this.advance();
            const expr = this.parseExpression();
            return { kind: "expr", expr };
        }
        const stmts = this.parseBlock();
        return { kind: "block", stmts };
    }
    parseBlock() {
        const stmts = [];
        this.skipNewlines();
        // Determine block indent level
        const blockIndent = this.getIndentLevel();
        if (blockIndent <= this.currentIndent) {
            return stmts;
        }
        const prevIndent = this.currentIndent;
        this.currentIndent = blockIndent;
        while (!this.isAtEnd()) {
            this.skipNewlines();
            if (this.isAtEnd())
                break;
            const indent = this.getIndentLevel();
            if (indent < this.currentIndent)
                break;
            if (this.check(token_1.TokenKind.Indent)) {
                this.advance();
            }
            const stmt = this.parseStatement();
            if (stmt)
                stmts.push(stmt);
        }
        this.currentIndent = prevIndent;
        return stmts;
    }
    parseIfStmt() {
        const start = this.peek().span.start;
        this.advance(); // if
        const condition = this.parseExpression();
        // Inline if: if cond then expr else expr (handled as expression)
        if (this.check(token_1.TokenKind.Then)) {
            // This is actually an inline if expression used as statement
            this.advance();
            const thenExpr = this.parseExpression();
            this.expect(token_1.TokenKind.Else, "Expected 'else' in inline if");
            const elseExpr = this.parseExpression();
            return {
                type: "ExprStmt",
                expr: {
                    type: "IfExpr",
                    condition,
                    thenBranch: thenExpr,
                    elseBranch: elseExpr,
                    span: this.spanFrom(start),
                },
                span: this.spanFrom(start),
            };
        }
        const body = this.parseBlock();
        const elifs = [];
        let elseBody;
        while (true) {
            this.skipNewlines();
            if (this.isAtEnd())
                break;
            const savedPos = this.pos;
            if (this.check(token_1.TokenKind.Indent)) {
                const indentVal = this.peek().value;
                if (indentVal !== this.currentIndent)
                    break;
                this.advance();
            }
            if (this.check(token_1.TokenKind.Elif)) {
                this.advance();
                const elifCond = this.parseExpression();
                const elifBody = this.parseBlock();
                elifs.push({ condition: elifCond, body: elifBody });
            }
            else if (this.check(token_1.TokenKind.Else)) {
                this.advance();
                if (this.check(token_1.TokenKind.If)) {
                    // else if
                    this.advance();
                    const elifCond = this.parseExpression();
                    const elifBody = this.parseBlock();
                    elifs.push({ condition: elifCond, body: elifBody });
                }
                else {
                    elseBody = this.parseBlock();
                    break;
                }
            }
            else {
                this.pos = savedPos;
                break;
            }
        }
        return {
            type: "If",
            condition,
            body,
            elifs,
            elseBody,
            span: this.spanFrom(start),
        };
    }
    parseUnlessStmt() {
        const start = this.peek().span.start;
        this.advance(); // unless
        const condition = this.parseExpression();
        const body = this.parseBlock();
        return { type: "Unless", condition, body, span: this.spanFrom(start) };
    }
    parseWhileStmt() {
        const start = this.peek().span.start;
        this.advance(); // while
        const condition = this.parseExpression();
        const body = this.parseBlock();
        return { type: "While", condition, body, span: this.spanFrom(start) };
    }
    parseUntilStmt() {
        const start = this.peek().span.start;
        this.advance(); // until
        const condition = this.parseExpression();
        const body = this.parseBlock();
        return { type: "Until", condition, body, span: this.spanFrom(start) };
    }
    parseDoWhile() {
        const start = this.peek().span.start;
        this.advance(); // do
        const body = this.parseBlock();
        this.skipNewlines();
        if (this.check(token_1.TokenKind.Indent))
            this.advance();
        this.expect(token_1.TokenKind.While, "Expected 'while'");
        const condition = this.parseExpression();
        return { type: "DoWhile", body, condition, span: this.spanFrom(start) };
    }
    parseSwitchStmt() {
        const start = this.peek().span.start;
        this.advance(); // switch
        const subject = this.parseExpression();
        this.skipNewlines();
        const cases = [];
        let defaultBody;
        const blockIndent = this.getIndentLevel();
        if (blockIndent <= this.currentIndent) {
            return { type: "Switch", subject, cases, span: this.spanFrom(start) };
        }
        const prevIndent = this.currentIndent;
        this.currentIndent = blockIndent;
        while (!this.isAtEnd()) {
            this.skipNewlines();
            if (this.isAtEnd())
                break;
            const savedPos = this.pos;
            const indent = this.getIndentLevel();
            if (indent < this.currentIndent)
                break;
            if (this.check(token_1.TokenKind.Indent))
                this.advance();
            if (this.check(token_1.TokenKind.Case)) {
                const caseStart = this.peek().span.start;
                this.advance(); // case
                const value = this.parseExpression();
                const body = this.parseMatchArmBody();
                cases.push({ value, body, span: this.spanFrom(caseStart) });
            }
            else if (this.check(token_1.TokenKind.Default)) {
                this.advance(); // default
                defaultBody = this.parseBlock();
                break;
            }
            else {
                this.pos = savedPos;
                break;
            }
        }
        this.currentIndent = prevIndent;
        return { type: "Switch", subject, cases, defaultBody, span: this.spanFrom(start) };
    }
    parseForStmt() {
        const start = this.peek().span.start;
        this.advance(); // for
        const firstIdent = this.expect(token_1.TokenKind.Ident, "Expected variable name");
        // for i; item in ... (with index)
        if (this.check(token_1.TokenKind.Semicolon)) {
            this.advance();
            const secondIdent = this.expect(token_1.TokenKind.Ident, "Expected variable name");
            this.expect(token_1.TokenKind.In, "Expected 'in'");
            if (this.check(token_1.TokenKind.Range)) {
                this.addError("Range iteration does not support index variable");
                this.advance();
                const rangeStart = this.parseExpression();
                this.expect(token_1.TokenKind.Semicolon, "Expected ';'");
                const rangeEnd = this.parseExpression();
                const body = this.parseBlock();
                return {
                    type: "ForRange",
                    variable: firstIdent.text,
                    variableSpan: firstIdent.span,
                    start: rangeStart,
                    end: rangeEnd,
                    body,
                    span: this.spanFrom(start),
                };
            }
            const iterable = this.parseExpression();
            const body = this.parseBlock();
            return {
                type: "ForIn",
                variable: secondIdent.text,
                variableSpan: secondIdent.span,
                index: firstIdent.text,
                indexSpan: firstIdent.span,
                iterable,
                body,
                span: this.spanFrom(start),
            };
        }
        this.expect(token_1.TokenKind.In, "Expected 'in'");
        // for i in range start; end
        if (this.check(token_1.TokenKind.Range)) {
            this.advance();
            const rangeStart = this.parseExpression();
            this.expect(token_1.TokenKind.Semicolon, "Expected ';'");
            const rangeEnd = this.parseExpression();
            const body = this.parseBlock();
            return {
                type: "ForRange",
                variable: firstIdent.text,
                variableSpan: firstIdent.span,
                start: rangeStart,
                end: rangeEnd,
                body,
                span: this.spanFrom(start),
            };
        }
        // for item in iterable
        const iterable = this.parseExpression();
        const body = this.parseBlock();
        return {
            type: "ForIn",
            variable: firstIdent.text,
            variableSpan: firstIdent.span,
            iterable,
            body,
            span: this.spanFrom(start),
        };
    }
    parseMatchStmt() {
        const start = this.peek().span.start;
        this.advance(); // match
        const subject = this.parseExpression();
        this.skipNewlines();
        const arms = [];
        const blockIndent = this.getIndentLevel();
        if (blockIndent <= this.currentIndent) {
            return { type: "Match", subject, arms, span: this.spanFrom(start) };
        }
        const prevIndent = this.currentIndent;
        this.currentIndent = blockIndent;
        while (!this.isAtEnd()) {
            this.skipNewlines();
            if (this.isAtEnd())
                break;
            const savedPos = this.pos;
            const indent = this.getIndentLevel();
            if (indent < this.currentIndent)
                break;
            if (this.check(token_1.TokenKind.Indent))
                this.advance();
            if (this.check(token_1.TokenKind.When)) {
                arms.push(this.parseWhenArm());
            }
            else if (this.check(token_1.TokenKind.Else)) {
                arms.push(this.parseElseArm());
                break;
            }
            else {
                this.pos = savedPos;
                break;
            }
        }
        this.currentIndent = prevIndent;
        return { type: "Match", subject, arms, span: this.spanFrom(start) };
    }
    parseWhenArm() {
        const start = this.peek().span.start;
        this.advance(); // when
        const pattern = this.parseExpression();
        let guard;
        if (this.check(token_1.TokenKind.If)) {
            this.advance();
            guard = this.parseExpression();
        }
        const body = this.parseMatchArmBody();
        return { pattern, guard, body, span: this.spanFrom(start) };
    }
    parseElseArm() {
        const start = this.peek().span.start;
        this.advance(); // else
        const body = this.parseMatchArmBody();
        return { body, span: this.spanFrom(start) };
    }
    parseMatchArmBody() {
        if (this.check(token_1.TokenKind.Then)) {
            this.advance();
            const expr = this.parseExpression();
            return { kind: "expr", expr };
        }
        const stmts = this.parseBlock();
        if (stmts.length > 0) {
            return { kind: "block", stmts };
        }
        // If no block, try to parse expression on same line
        const expr = this.parseExpression();
        return { kind: "expr", expr };
    }
    parseTryCatch() {
        const start = this.peek().span.start;
        this.advance(); // try
        const tryBody = this.parseBlock();
        this.skipNewlines();
        if (this.check(token_1.TokenKind.Indent))
            this.advance();
        this.expect(token_1.TokenKind.Catch, "Expected 'catch'");
        let catchVar;
        let catchVarSpan;
        if (this.check(token_1.TokenKind.Ident)) {
            const v = this.advance();
            catchVar = v.text;
            catchVarSpan = v.span;
        }
        const catchBody = this.parseBlock();
        let finallyBody;
        this.skipNewlines();
        const savedPos = this.pos;
        if (this.check(token_1.TokenKind.Indent))
            this.advance();
        if (this.check(token_1.TokenKind.Finally)) {
            this.advance();
            finallyBody = this.parseBlock();
        }
        else {
            this.pos = savedPos;
        }
        return {
            type: "TryCatch",
            tryBody,
            catchVar,
            catchVarSpan,
            catchBody,
            finallyBody,
            span: this.spanFrom(start),
        };
    }
    parseThrow() {
        const start = this.peek().span.start;
        this.advance(); // throw
        const expr = this.parseExpression();
        const stmt = { type: "Throw", expr, span: this.spanFrom(start) };
        return this.maybePostfix(stmt);
    }
    parseReturn() {
        const start = this.peek().span.start;
        this.advance(); // return
        if (this.isStatementEnd()) {
            return { type: "Return", span: this.spanFrom(start) };
        }
        const expr = this.parseExpression();
        return { type: "Return", expr, span: this.spanFrom(start) };
    }
    parseBreak() {
        const start = this.peek().span.start;
        this.advance();
        return { type: "Break", span: this.spanFrom(start) };
    }
    parseContinue() {
        const start = this.peek().span.start;
        this.advance();
        return { type: "Continue", span: this.spanFrom(start) };
    }
    parseImport() {
        const start = this.peek().span.start;
        this.advance(); // import
        // Side-effect import: import ///path///
        if (this.check(token_1.TokenKind.Str)) {
            const source = this.advance().value;
            const attributes = this.parseImportAttributes();
            return { type: "SideEffectImport", source, attributes, span: this.spanFrom(start) };
        }
        // import all as name from ///path///
        if (this.check(token_1.TokenKind.All)) {
            this.advance();
            this.expect(token_1.TokenKind.As, "Expected 'as'");
            const nameToken = this.expect(token_1.TokenKind.Ident, "Expected identifier");
            this.expect(token_1.TokenKind.From, "Expected 'from'");
            const source = this.expect(token_1.TokenKind.Str, "Expected string").value;
            const attributes = this.parseImportAttributes();
            return {
                type: "Import",
                namespaceName: nameToken.text,
                namespaceNameSpan: nameToken.span,
                source,
                attributes,
                span: this.spanFrom(start),
            };
        }
        // import [names] from ///path///
        if (this.check(token_1.TokenKind.LBracket)) {
            this.advance();
            const names = this.parseIdentList();
            this.expect(token_1.TokenKind.RBracket, "Expected ']'");
            this.expect(token_1.TokenKind.From, "Expected 'from'");
            const source = this.expect(token_1.TokenKind.Str, "Expected string").value;
            const attributes = this.parseImportAttributes();
            return {
                type: "Import",
                names,
                source,
                attributes,
                span: this.spanFrom(start),
            };
        }
        // import name from ///path/// or import name, [names] from ///path///
        const defaultNameToken = this.expect(token_1.TokenKind.Ident, "Expected identifier");
        let names;
        if (this.check(token_1.TokenKind.Comma)) {
            this.advance();
            this.expect(token_1.TokenKind.LBracket, "Expected '['");
            names = this.parseIdentList();
            this.expect(token_1.TokenKind.RBracket, "Expected ']'");
        }
        this.expect(token_1.TokenKind.From, "Expected 'from'");
        const source = this.expect(token_1.TokenKind.Str, "Expected string").value;
        const attributes = this.parseImportAttributes();
        return {
            type: "Import",
            defaultName: defaultNameToken.text,
            defaultNameSpan: defaultNameToken.span,
            names,
            source,
            attributes,
            span: this.spanFrom(start),
        };
    }
    parseImportAttributes() {
        if (!this.check(token_1.TokenKind.With))
            return undefined;
        this.advance(); // with
        this.expect(token_1.TokenKind.LBracket, "Expected '['");
        const attrs = [];
        while (!this.check(token_1.TokenKind.RBracket) && !this.check(token_1.TokenKind.Eof)) {
            const attrStart = this.peek().span.start;
            const keyToken = this.expect(token_1.TokenKind.Ident, "Expected attribute key");
            this.expect(token_1.TokenKind.Be, "Expected 'be'");
            const valueToken = this.expect(token_1.TokenKind.Str, "Expected string value");
            attrs.push({
                key: keyToken.text,
                value: valueToken.value,
                span: this.spanFrom(attrStart),
            });
        }
        this.expect(token_1.TokenKind.RBracket, "Expected ']'");
        return attrs.length > 0 ? attrs : undefined;
    }
    parseUse() {
        const start = this.peek().span.start;
        this.advance(); // use
        const path = this.parseDottedName();
        return { type: "Use", path, span: this.spanFrom(start) };
    }
    parseFromUse() {
        const start = this.peek().span.start;
        this.advance(); // from
        // Check: from path use names OR from path import ...
        const path = this.parseDottedName();
        this.expect(token_1.TokenKind.Use, "Expected 'use'");
        const names = [];
        do {
            const nameToken = this.expect(token_1.TokenKind.Ident, "Expected identifier");
            names.push({ name: nameToken.text, span: nameToken.span });
        } while (this.check(token_1.TokenKind.Comma) && this.advance());
        return { type: "FromUse", path, names, span: this.spanFrom(start) };
    }
    parseExport() {
        const start = this.peek().span.start;
        this.advance(); // export
        if (this.check(token_1.TokenKind.Default)) {
            this.advance();
            const decl = this.parseStatement();
            if (!decl) {
                this.addError("Expected declaration after 'export default'");
                return { type: "ExprStmt", expr: this.dummyExpr(), span: this.spanFrom(start) };
            }
            return { type: "ExportDefault", decl, span: this.spanFrom(start) };
        }
        const decl = this.parseStatement();
        if (!decl) {
            this.addError("Expected declaration after 'export'");
            return { type: "ExprStmt", expr: this.dummyExpr(), span: this.spanFrom(start) };
        }
        return { type: "Export", decl, span: this.spanFrom(start) };
    }
    parsePublic() {
        const start = this.peek().span.start;
        this.advance(); // public
        const decl = this.parseStatement();
        if (!decl) {
            this.addError("Expected declaration after 'public'");
            return { type: "ExprStmt", expr: this.dummyExpr(), span: this.spanFrom(start) };
        }
        return { type: "Public", decl, span: this.spanFrom(start) };
    }
    parseNamespace() {
        const start = this.peek().span.start;
        this.advance(); // namespace
        const nameToken = this.expect(token_1.TokenKind.Ident, "Expected namespace name");
        const body = this.parseBlock();
        return {
            type: "Namespace",
            name: nameToken.text,
            nameSpan: nameToken.span,
            body,
            span: this.spanFrom(start),
        };
    }
    parseClassDecl() {
        const start = this.peek().span.start;
        this.advance(); // class
        const nameToken = this.expect(token_1.TokenKind.Ident, "Expected class name");
        let superClass;
        if (this.check(token_1.TokenKind.Extends)) {
            this.advance();
            superClass = this.expect(token_1.TokenKind.Ident, "Expected superclass name").text;
        }
        const members = this.parseClassBody();
        return {
            type: "ClassDecl",
            name: nameToken.text,
            nameSpan: nameToken.span,
            superClass,
            members,
            span: this.spanFrom(start),
        };
    }
    parseClassBody() {
        const members = [];
        this.skipNewlines();
        const blockIndent = this.getIndentLevel();
        if (blockIndent <= this.currentIndent)
            return members;
        const prevIndent = this.currentIndent;
        this.currentIndent = blockIndent;
        while (!this.isAtEnd()) {
            this.skipNewlines();
            if (this.isAtEnd())
                break;
            const indent = this.getIndentLevel();
            if (indent < this.currentIndent)
                break;
            if (this.check(token_1.TokenKind.Indent))
                this.advance();
            const member = this.parseClassMember();
            if (member)
                members.push(member);
        }
        this.currentIndent = prevIndent;
        return members;
    }
    parseClassMember() {
        const start = this.peek().span.start;
        // private field (protected is a deprecated alias)
        if (this.check(token_1.TokenKind.Private) || this.check(token_1.TokenKind.Protected)) {
            this.advance();
            const nameToken = this.expect(token_1.TokenKind.Ident, "Expected field name");
            let init;
            if (this.check(token_1.TokenKind.Be)) {
                this.advance();
                init = this.parseExpression();
            }
            return {
                type: "PrivateField",
                name: nameToken.text,
                nameSpan: nameToken.span,
                init,
                span: this.spanFrom(start),
            };
        }
        // getter: get fn name ...
        if (this.check(token_1.TokenKind.Get) &&
            (this.peekAt(1)?.kind === token_1.TokenKind.Fn || this.peekAt(1)?.kind === token_1.TokenKind.Function)) {
            this.advance(); // get
            this.advance(); // fn / function
            const nameToken = this.expect(token_1.TokenKind.Ident, "Expected getter name");
            let returnType;
            if (this.check(token_1.TokenKind.Gives)) {
                this.advance();
                returnType = this.expect(token_1.TokenKind.Ident, "Expected return type").text;
            }
            const body = this.parseFnBody();
            return {
                type: "Getter",
                name: nameToken.text,
                nameSpan: nameToken.span,
                returnType,
                body,
                span: this.spanFrom(start),
            };
        }
        // setter: set fn name param ...
        if (this.check(token_1.TokenKind.Set) &&
            (this.peekAt(1)?.kind === token_1.TokenKind.Fn || this.peekAt(1)?.kind === token_1.TokenKind.Function)) {
            this.advance(); // set
            this.advance(); // fn / function
            const nameToken = this.expect(token_1.TokenKind.Ident, "Expected setter name");
            const paramName = this.expect(token_1.TokenKind.Ident, "Expected parameter name").text;
            const body = this.parseFnBody();
            return {
                type: "Setter",
                name: nameToken.text,
                nameSpan: nameToken.span,
                paramName,
                body,
                span: this.spanFrom(start),
            };
        }
        // static [async] fn name ...
        let isStatic = false;
        let isAsync = false;
        if (this.check(token_1.TokenKind.Static)) {
            isStatic = true;
            this.advance();
        }
        if (this.check(token_1.TokenKind.Async)) {
            isAsync = true;
            this.advance();
        }
        if (this.check(token_1.TokenKind.Fn) || this.check(token_1.TokenKind.Function)) {
            this.advance();
            // Constructor: fn new[params]
            if (this.check(token_1.TokenKind.New)) {
                this.advance();
                let params = [];
                if (this.check(token_1.TokenKind.LBracket)) {
                    this.advance();
                    params = this.parseBracketParams();
                    this.expect(token_1.TokenKind.RBracket, "Expected ']'");
                }
                const body = this.parseFnBody();
                return {
                    type: "Constructor",
                    params,
                    body,
                    span: this.spanFrom(start),
                };
            }
            // Method: fn name params body
            const nameToken = this.expect(token_1.TokenKind.Ident, "Expected method name");
            const params = this.parseParamList();
            let returnType;
            if (this.check(token_1.TokenKind.Gives)) {
                this.advance();
                returnType = this.expect(token_1.TokenKind.Ident, "Expected return type").text;
            }
            const body = this.parseFnBody();
            return {
                type: "Method",
                name: nameToken.text,
                nameSpan: nameToken.span,
                params,
                returnType,
                body,
                isStatic,
                isAsync,
                span: this.spanFrom(start),
            };
        }
        this.addError("Expected class member");
        this.advance();
        return null;
    }
    parseTypeDecl() {
        const start = this.peek().span.start;
        this.advance(); // type
        const nameToken = this.expect(token_1.TokenKind.Ident, "Expected type name");
        this.expect(token_1.TokenKind.Be, "Expected 'be'");
        const valueToken = this.expect(token_1.TokenKind.Ident, "Expected type value");
        return {
            type: "TypeDecl",
            name: nameToken.text,
            nameSpan: nameToken.span,
            value: valueToken.text,
            span: this.spanFrom(start),
        };
    }
    parseDeleteStmt() {
        const start = this.peek().span.start;
        this.advance(); // delete
        const expr = this.parseExpression();
        return { type: "Delete", expr, span: this.spanFrom(start) };
    }
    isCompoundOp(kind) {
        return [
            token_1.TokenKind.Add, token_1.TokenKind.Sub, token_1.TokenKind.Mul, token_1.TokenKind.Div,
            token_1.TokenKind.Mod, token_1.TokenKind.Pow, token_1.TokenKind.Fdiv,
            token_1.TokenKind.Band, token_1.TokenKind.Bor, token_1.TokenKind.Bxor,
            token_1.TokenKind.Shl, token_1.TokenKind.Shr, token_1.TokenKind.Ushr,
        ].includes(kind);
    }
    parseExprStatement() {
        const start = this.peek().span.start;
        const expr = this.parseExpression();
        // Check for assignment: expr be expr
        if (this.check(token_1.TokenKind.Be)) {
            this.advance();
            const value = this.parseExpression();
            const stmt = {
                type: "Assign",
                target: expr,
                value,
                span: this.spanFrom(start),
            };
            return this.maybePostfix(stmt);
        }
        // Compound assignment: target op be value (e.g. x add be 5 → x += 5)
        if (this.isCompoundOp(this.peek().kind) && this.peekAt(1)?.kind === token_1.TokenKind.Be) {
            const opToken = this.advance(); // the op
            this.advance(); // be
            const value = this.parseExpression();
            return {
                type: "CompoundAssign",
                target: expr,
                op: opToken.text,
                value,
                span: this.spanFrom(start),
            };
        }
        const stmt = {
            type: "ExprStmt",
            expr,
            span: this.spanFrom(start),
        };
        return this.maybePostfix(stmt);
    }
    // --- Expression Parsing (Pratt) ---
    parseExpression() {
        return this.parsePipe();
    }
    parsePipe() {
        let left = this.parseCoal();
        while (this.check(token_1.TokenKind.Pipe)) {
            this.advance();
            const right = this.parseCoal();
            left = {
                type: "Pipe",
                left,
                right,
                span: this.mergeSpans(left.span, right.span),
            };
        }
        return left;
    }
    parseCoal() {
        let left = this.parseOr();
        while (this.check(token_1.TokenKind.Coal)) {
            this.advance();
            const right = this.parseOr();
            left = {
                type: "Coal",
                left,
                right,
                span: this.mergeSpans(left.span, right.span),
            };
        }
        return left;
    }
    parseOr() {
        let left = this.parseAnd();
        while (this.check(token_1.TokenKind.Or)) {
            this.advance();
            const right = this.parseAnd();
            left = {
                type: "BinOp",
                op: "or",
                left,
                right,
                span: this.mergeSpans(left.span, right.span),
            };
        }
        return left;
    }
    parseAnd() {
        let left = this.parseBitOr();
        while (this.check(token_1.TokenKind.And)) {
            this.advance();
            const right = this.parseBitOr();
            left = {
                type: "BinOp",
                op: "and",
                left,
                right,
                span: this.mergeSpans(left.span, right.span),
            };
        }
        return left;
    }
    parseBitOr() {
        let left = this.parseBitXor();
        while (this.check(token_1.TokenKind.Bor) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
            this.advance();
            const right = this.parseBitXor();
            left = { type: "BinOp", op: "bor", left, right, span: this.mergeSpans(left.span, right.span) };
        }
        return left;
    }
    parseBitXor() {
        let left = this.parseBitAnd();
        while (this.check(token_1.TokenKind.Bxor) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
            this.advance();
            const right = this.parseBitAnd();
            left = { type: "BinOp", op: "bxor", left, right, span: this.mergeSpans(left.span, right.span) };
        }
        return left;
    }
    parseBitAnd() {
        let left = this.parseEquality();
        while (this.check(token_1.TokenKind.Band) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
            this.advance();
            const right = this.parseEquality();
            left = { type: "BinOp", op: "band", left, right, span: this.mergeSpans(left.span, right.span) };
        }
        return left;
    }
    parseEquality() {
        let left = this.parseComparison();
        while (true) {
            if (this.check(token_1.TokenKind.Eq)) {
                this.advance();
                const right = this.parseComparison();
                left = { type: "BinOp", op: "eq", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Neq)) {
                this.advance();
                const right = this.parseComparison();
                left = { type: "BinOp", op: "neq", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Not) && this.peekAt(1)?.kind === token_1.TokenKind.Eq) {
                this.advance(); // not
                this.advance(); // eq
                const right = this.parseComparison();
                left = { type: "BinOp", op: "neq", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Instanceof)) {
                this.advance();
                const classToken = this.expect(token_1.TokenKind.Ident, "Expected class name");
                left = { type: "Instanceof", expr: left, className: classToken.text, span: this.mergeSpans(left.span, classToken.span) };
            }
            else {
                break;
            }
        }
        return left;
    }
    parseComparison() {
        let left = this.parseShift();
        while (true) {
            if (this.check(token_1.TokenKind.Lt)) {
                this.advance();
                if (this.check(token_1.TokenKind.Eq)) {
                    this.advance();
                    const right = this.parseShift();
                    left = { type: "BinOp", op: "le", left, right, span: this.mergeSpans(left.span, right.span) };
                }
                else {
                    const right = this.parseShift();
                    left = { type: "BinOp", op: "lt", left, right, span: this.mergeSpans(left.span, right.span) };
                }
            }
            else if (this.check(token_1.TokenKind.Gt)) {
                this.advance();
                if (this.check(token_1.TokenKind.Eq)) {
                    this.advance();
                    const right = this.parseShift();
                    left = { type: "BinOp", op: "ge", left, right, span: this.mergeSpans(left.span, right.span) };
                }
                else {
                    const right = this.parseShift();
                    left = { type: "BinOp", op: "gt", left, right, span: this.mergeSpans(left.span, right.span) };
                }
            }
            else if (this.check(token_1.TokenKind.Le)) {
                this.advance();
                const right = this.parseShift();
                left = { type: "BinOp", op: "le", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Ge)) {
                this.advance();
                const right = this.parseShift();
                left = { type: "BinOp", op: "ge", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else {
                break;
            }
        }
        return left;
    }
    parseShift() {
        let left = this.parseAddition();
        while (true) {
            if (this.check(token_1.TokenKind.Shl) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parseAddition();
                left = { type: "BinOp", op: "shl", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Shr) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parseAddition();
                left = { type: "BinOp", op: "shr", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Ushr) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parseAddition();
                left = { type: "BinOp", op: "ushr", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else {
                break;
            }
        }
        return left;
    }
    parseAddition() {
        let left = this.parseMultiplication();
        while (true) {
            if (this.check(token_1.TokenKind.Add) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parseMultiplication();
                left = { type: "BinOp", op: "add", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Sub) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parseMultiplication();
                left = { type: "BinOp", op: "sub", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else {
                break;
            }
        }
        return left;
    }
    parseMultiplication() {
        let left = this.parsePower();
        while (true) {
            if (this.check(token_1.TokenKind.Mul) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parsePower();
                left = { type: "BinOp", op: "mul", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Div) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parsePower();
                left = { type: "BinOp", op: "div", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Mod) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parsePower();
                left = { type: "BinOp", op: "mod", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else if (this.check(token_1.TokenKind.Fdiv) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
                this.advance();
                const right = this.parsePower();
                left = { type: "BinOp", op: "fdiv", left, right, span: this.mergeSpans(left.span, right.span) };
            }
            else {
                break;
            }
        }
        return left;
    }
    parsePower() {
        const base = this.parseUnary();
        if (this.check(token_1.TokenKind.Pow) && this.peekAt(1)?.kind !== token_1.TokenKind.Be) {
            this.advance();
            const exp = this.parsePower(); // right-associative
            return { type: "BinOp", op: "pow", left: base, right: exp, span: this.mergeSpans(base.span, exp.span) };
        }
        return base;
    }
    parseUnary() {
        const start = this.peek().span.start;
        if (this.check(token_1.TokenKind.Not)) {
            this.advance();
            const operand = this.parseUnary();
            return { type: "Unary", op: "not", operand, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.Neg)) {
            this.advance();
            const operand = this.parseUnary();
            return { type: "Unary", op: "neg", operand, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.Bnot)) {
            this.advance();
            const operand = this.parseUnary();
            return { type: "Unary", op: "bnot", operand, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.Typeof)) {
            this.advance();
            const expr = this.parseUnary();
            return { type: "Typeof", expr, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.Await)) {
            this.advance();
            const expr = this.parseUnary();
            return { type: "Await", expr, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.Yield)) {
            this.advance();
            if (this.isStatementEnd()) {
                return { type: "Yield", span: this.spanFrom(start) };
            }
            const expr = this.parseExpression();
            return { type: "Yield", expr, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.Void)) {
            this.advance();
            const expr = this.parseUnary();
            return { type: "Void", expr, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.New)) {
            this.advance();
            const callee = this.parsePostfix();
            return { type: "New", callee, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.Delete)) {
            this.advance();
            const expr = this.parseUnary();
            return { type: "DeleteExpr", expr, span: this.spanFrom(start) };
        }
        return this.parsePostfix();
    }
    parsePostfix() {
        let expr = this.parsePrimary();
        while (true) {
            // Dot access: expr.member
            if (this.check(token_1.TokenKind.Dot)) {
                this.advance();
                const memberToken = this.expect(token_1.TokenKind.Ident, "Expected member name");
                expr = {
                    type: "DotAccess",
                    object: expr,
                    member: memberToken.text,
                    memberSpan: memberToken.span,
                    span: this.mergeSpans(expr.span, memberToken.span),
                };
                continue;
            }
            // Optional chaining: expr\.member
            if (this.check(token_1.TokenKind.OptionalDot)) {
                this.advance();
                const memberToken = this.expect(token_1.TokenKind.Ident, "Expected member name");
                expr = {
                    type: "OptionalDot",
                    object: expr,
                    member: memberToken.text,
                    memberSpan: memberToken.span,
                    span: this.mergeSpans(expr.span, memberToken.span),
                };
                continue;
            }
            // Function call or computed access: expr[...]
            if (this.check(token_1.TokenKind.LBracket)) {
                this.advance(); // [
                // Computed access: expr[\index] or expr[\start..end]
                if (this.check(token_1.TokenKind.Backslash)) {
                    this.advance();
                    const index = this.parseExpression();
                    // Slice: expr[\start..end] or expr[\start...end]
                    if (this.check(token_1.TokenKind.DotDot)) {
                        this.advance();
                        const endExpr = this.parseExpression();
                        this.expect(token_1.TokenKind.RBracket, "Expected ']'");
                        expr = {
                            type: "Slice",
                            object: expr,
                            start: index,
                            end: endExpr,
                            inclusive: true,
                            span: this.mergeSpans(expr.span, this.prevSpan()),
                        };
                        continue;
                    }
                    if (this.check(token_1.TokenKind.DotDotDot)) {
                        this.advance();
                        const endExpr = this.parseExpression();
                        this.expect(token_1.TokenKind.RBracket, "Expected ']'");
                        expr = {
                            type: "Slice",
                            object: expr,
                            start: index,
                            end: endExpr,
                            inclusive: false,
                            span: this.mergeSpans(expr.span, this.prevSpan()),
                        };
                        continue;
                    }
                    this.expect(token_1.TokenKind.RBracket, "Expected ']'");
                    expr = {
                        type: "ComputedAccess",
                        object: expr,
                        index,
                        span: this.mergeSpans(expr.span, this.prevSpan()),
                    };
                    continue;
                }
                // Function call: expr[args]
                const args = this.parseArgList();
                this.expect(token_1.TokenKind.RBracket, "Expected ']'");
                expr = {
                    type: "Call",
                    callee: expr,
                    args,
                    span: this.mergeSpans(expr.span, this.prevSpan()),
                };
                continue;
            }
            // Type cast: expr as Type
            if (this.check(token_1.TokenKind.As)) {
                this.advance();
                const typeToken = this.expect(token_1.TokenKind.Ident, "Expected type name");
                expr = {
                    type: "AsCast",
                    expr,
                    typeName: typeToken.text,
                    span: this.mergeSpans(expr.span, typeToken.span),
                };
                continue;
            }
            break;
        }
        return expr;
    }
    parsePrimary() {
        const token = this.peek();
        switch (token.kind) {
            case token_1.TokenKind.Int: {
                this.advance();
                return { type: "IntLit", value: token.value, span: token.span };
            }
            case token_1.TokenKind.Float: {
                this.advance();
                return { type: "FloatLit", value: token.value, span: token.span };
            }
            case token_1.TokenKind.Str: {
                this.advance();
                return { type: "StrLit", value: token.value, raw: token.text, span: token.span };
            }
            case token_1.TokenKind.Regex: {
                this.advance();
                const text = token.text;
                const lastSlash = text.lastIndexOf("/");
                const flags = text.slice(lastSlash + 1);
                return { type: "RegexLit", pattern: token.value, flags, span: token.span };
            }
            case token_1.TokenKind.True: {
                this.advance();
                return { type: "BoolLit", value: true, span: token.span };
            }
            case token_1.TokenKind.False: {
                this.advance();
                return { type: "BoolLit", value: false, span: token.span };
            }
            case token_1.TokenKind.Null:
            case token_1.TokenKind.Nil: {
                this.advance();
                return { type: "NullLit", span: token.span };
            }
            case token_1.TokenKind.Undefined: {
                this.advance();
                return { type: "UndefinedLit", span: token.span };
            }
            case token_1.TokenKind.Nan: {
                this.advance();
                return { type: "NanLit", span: token.span };
            }
            case token_1.TokenKind.BigInt: {
                this.advance();
                return { type: "BigIntLit", value: token.text, span: token.span };
            }
            case token_1.TokenKind.Infinity: {
                this.advance();
                return { type: "InfinityLit", span: token.span };
            }
            case token_1.TokenKind.Blank: {
                this.advance();
                return { type: "Blank", span: token.span };
            }
            case token_1.TokenKind.This: {
                this.advance();
                return { type: "This", span: token.span };
            }
            case token_1.TokenKind.Super: {
                this.advance();
                return { type: "Super", span: token.span };
            }
            case token_1.TokenKind.Ident: {
                this.advance();
                return { type: "Ident", name: token.text, span: token.span };
            }
            // list[...] constructor
            case token_1.TokenKind.List: {
                const start = token.span.start;
                this.advance();
                this.expect(token_1.TokenKind.LBracket, "Expected '['");
                const elements = this.parseExprList();
                this.expect(token_1.TokenKind.RBracket, "Expected ']'");
                return { type: "ArrayLit", elements, span: this.spanFrom(start) };
            }
            // object[...] constructor
            case token_1.TokenKind.Object: {
                const start = token.span.start;
                this.advance();
                this.expect(token_1.TokenKind.LBracket, "Expected '['");
                const entries = this.parseObjectEntries();
                this.expect(token_1.TokenKind.RBracket, "Expected ']'");
                return { type: "ObjectLit", entries, span: this.spanFrom(start) };
            }
            // Bracket expression: [], [be], [a, b], [a..b], [key be val]
            case token_1.TokenKind.LBracket: {
                return this.parseBracketExpr();
            }
            // Function expression: fn params to expr | fn params block
            case token_1.TokenKind.Fn:
            case token_1.TokenKind.Function: {
                return this.parseFnExpr(false);
            }
            // Async function expression: async fn ...
            case token_1.TokenKind.Async: {
                const next = this.peekAt(1)?.kind;
                if (next === token_1.TokenKind.Fn || next === token_1.TokenKind.Function) {
                    return this.parseFnExpr(true);
                }
                this.advance();
                return { type: "Ident", name: "async", span: token.span };
            }
            // Inline if expression: if cond then a else b
            case token_1.TokenKind.If: {
                return this.parseIfExpr();
            }
            // Match expression
            case token_1.TokenKind.Match: {
                return this.parseMatchExpr();
            }
            // Try expression
            case token_1.TokenKind.Try: {
                return this.parseTryExpr();
            }
            default: {
                this.addError(`Unexpected token: ${token.text}`);
                this.advance();
                return this.dummyExpr();
            }
        }
    }
    parseBracketExpr() {
        const start = this.peek().span.start;
        this.advance(); // [
        // Empty array: []
        if (this.check(token_1.TokenKind.RBracket)) {
            this.advance();
            return { type: "ArrayLit", elements: [], span: this.spanFrom(start) };
        }
        // Empty object: [be]
        if (this.check(token_1.TokenKind.Be)) {
            this.advance();
            this.expect(token_1.TokenKind.RBracket, "Expected ']'");
            return { type: "ObjectLit", entries: [], span: this.spanFrom(start) };
        }
        // Parse first expression
        const first = this.parseExpression();
        // Range: [a..b] or [a...b]
        if (this.check(token_1.TokenKind.DotDot)) {
            this.advance();
            const end = this.parseExpression();
            this.expect(token_1.TokenKind.RBracket, "Expected ']'");
            return { type: "Range", start: first, end, inclusive: true, span: this.spanFrom(start) };
        }
        if (this.check(token_1.TokenKind.DotDotDot)) {
            this.advance();
            const end = this.parseExpression();
            this.expect(token_1.TokenKind.RBracket, "Expected ']'");
            return { type: "Range", start: first, end, inclusive: false, span: this.spanFrom(start) };
        }
        // Object: [key be val, ...]
        if (this.check(token_1.TokenKind.Be) && first.type === "Ident") {
            this.advance();
            const val = this.parseExpression();
            const entries = [{
                    key: first.name,
                    keySpan: first.span,
                    value: val,
                }];
            while ((this.check(token_1.TokenKind.Comma) || this.check(token_1.TokenKind.Semicolon)) && !this.isAtEnd()) {
                this.advance();
                this.skipNewlines();
                if (this.check(token_1.TokenKind.RBracket))
                    break;
                const keyToken = this.expect(token_1.TokenKind.Ident, "Expected key");
                if (this.check(token_1.TokenKind.Be)) {
                    this.advance();
                    const v = this.parseExpression();
                    entries.push({ key: keyToken.text, keySpan: keyToken.span, value: v });
                }
                else {
                    entries.push({ key: keyToken.text, keySpan: keyToken.span });
                }
            }
            this.expect(token_1.TokenKind.RBracket, "Expected ']'");
            return { type: "ObjectLit", entries, span: this.spanFrom(start) };
        }
        // Array or grouping
        const elements = [first];
        if (this.check(token_1.TokenKind.Comma) || this.check(token_1.TokenKind.Semicolon)) {
            while ((this.check(token_1.TokenKind.Comma) || this.check(token_1.TokenKind.Semicolon)) && !this.isAtEnd()) {
                this.advance();
                this.skipNewlines();
                if (this.check(token_1.TokenKind.RBracket))
                    break;
                elements.push(this.parseExpression());
            }
            this.expect(token_1.TokenKind.RBracket, "Expected ']'");
            return { type: "ArrayLit", elements, span: this.spanFrom(start) };
        }
        // Single expression = grouping
        this.expect(token_1.TokenKind.RBracket, "Expected ']'");
        if (elements.length === 1) {
            return { type: "Group", expr: first, span: this.spanFrom(start) };
        }
        return { type: "ArrayLit", elements, span: this.spanFrom(start) };
    }
    parseFnExpr(isAsync) {
        const start = this.peek().span.start;
        if (isAsync)
            this.advance(); // async
        this.advance(); // fn / function
        const params = this.parseParamList();
        let returnType;
        if (this.check(token_1.TokenKind.Gives)) {
            this.advance();
            returnType = this.expect(token_1.TokenKind.Ident, "Expected return type").text;
        }
        const body = this.parseFnBody();
        return {
            type: "FnExpr",
            params,
            returnType,
            body,
            isAsync,
            span: this.spanFrom(start),
        };
    }
    parseIfExpr() {
        const start = this.peek().span.start;
        this.advance(); // if
        const condition = this.parseExpression();
        this.expect(token_1.TokenKind.Then, "Expected 'then'");
        const thenExpr = this.parseExpression();
        this.expect(token_1.TokenKind.Else, "Expected 'else'");
        const elseExpr = this.parseExpression();
        return {
            type: "IfExpr",
            condition,
            thenBranch: thenExpr,
            elseBranch: elseExpr,
            span: this.spanFrom(start),
        };
    }
    parseMatchExpr() {
        const start = this.peek().span.start;
        this.advance(); // match
        const subject = this.parseExpression();
        this.skipNewlines();
        const arms = [];
        const blockIndent = this.getIndentLevel();
        if (blockIndent > this.currentIndent) {
            const prevIndent = this.currentIndent;
            this.currentIndent = blockIndent;
            while (!this.isAtEnd()) {
                this.skipNewlines();
                if (this.isAtEnd())
                    break;
                const savedPos = this.pos;
                const indent = this.getIndentLevel();
                if (indent < this.currentIndent)
                    break;
                if (this.check(token_1.TokenKind.Indent))
                    this.advance();
                if (this.check(token_1.TokenKind.When)) {
                    arms.push(this.parseWhenArm());
                }
                else if (this.check(token_1.TokenKind.Else)) {
                    arms.push(this.parseElseArm());
                    break;
                }
                else {
                    this.pos = savedPos;
                    break;
                }
            }
            this.currentIndent = prevIndent;
        }
        return {
            type: "MatchExpr",
            subject,
            arms,
            span: this.spanFrom(start),
        };
    }
    parseTryExpr() {
        const start = this.peek().span.start;
        this.advance(); // try
        const tryBody = this.parseBlock();
        this.skipNewlines();
        if (this.check(token_1.TokenKind.Indent))
            this.advance();
        this.expect(token_1.TokenKind.Catch, "Expected 'catch'");
        let catchVar;
        if (this.check(token_1.TokenKind.Ident)) {
            catchVar = this.advance().text;
        }
        const catchBody = this.parseBlock();
        return {
            type: "TryExpr",
            tryBody,
            catchVar,
            catchBody,
            span: this.spanFrom(start),
        };
    }
    // --- Helper Methods ---
    parseArgList() {
        const args = [];
        this.skipNewlines();
        if (this.check(token_1.TokenKind.RBracket))
            return args;
        args.push(this.parseArgExpr());
        while ((this.check(token_1.TokenKind.Semicolon) || this.check(token_1.TokenKind.Comma)) && !this.isAtEnd()) {
            this.advance();
            this.skipNewlines();
            if (this.check(token_1.TokenKind.RBracket))
                break;
            args.push(this.parseArgExpr());
        }
        this.skipNewlines();
        return args;
    }
    parseArgExpr() {
        // An argument can be a fn expression (inline callback)
        if (this.check(token_1.TokenKind.Fn) || this.check(token_1.TokenKind.Function)) {
            return this.parseFnExpr(false);
        }
        if (this.check(token_1.TokenKind.Async)) {
            const next = this.peekAt(1)?.kind;
            if (next === token_1.TokenKind.Fn || next === token_1.TokenKind.Function) {
                return this.parseFnExpr(true);
            }
        }
        return this.parseExpression();
    }
    parseExprList() {
        const exprs = [];
        this.skipNewlines();
        if (this.check(token_1.TokenKind.RBracket))
            return exprs;
        exprs.push(this.parseExpression());
        while ((this.check(token_1.TokenKind.Semicolon) || this.check(token_1.TokenKind.Comma)) && !this.isAtEnd()) {
            this.advance();
            this.skipNewlines();
            if (this.check(token_1.TokenKind.RBracket))
                break;
            exprs.push(this.parseExpression());
        }
        this.skipNewlines();
        return exprs;
    }
    parseObjectEntries() {
        const entries = [];
        this.skipNewlines();
        if (this.check(token_1.TokenKind.RBracket))
            return entries;
        entries.push(this.parseObjectEntry());
        while ((this.check(token_1.TokenKind.Comma) || this.check(token_1.TokenKind.Semicolon)) && !this.isAtEnd()) {
            this.advance();
            this.skipNewlines();
            if (this.check(token_1.TokenKind.RBracket))
                break;
            entries.push(this.parseObjectEntry());
        }
        this.skipNewlines();
        return entries;
    }
    parseObjectEntry() {
        const keyToken = this.expect(token_1.TokenKind.Ident, "Expected key");
        if (this.check(token_1.TokenKind.Be)) {
            this.advance();
            const value = this.parseExpression();
            return { key: keyToken.text, keySpan: keyToken.span, value };
        }
        return { key: keyToken.text, keySpan: keyToken.span };
    }
    parseIdentList() {
        const names = [];
        if (this.check(token_1.TokenKind.RBracket))
            return names;
        const first = this.expect(token_1.TokenKind.Ident, "Expected identifier");
        names.push({ name: first.text, span: first.span });
        while ((this.check(token_1.TokenKind.Semicolon) || this.check(token_1.TokenKind.Comma)) && !this.isAtEnd()) {
            this.advance();
            if (this.check(token_1.TokenKind.RBracket))
                break;
            const next = this.expect(token_1.TokenKind.Ident, "Expected identifier");
            names.push({ name: next.text, span: next.span });
        }
        return names;
    }
    parseBracketParams() {
        const params = [];
        while (!this.isAtEnd() && !this.check(token_1.TokenKind.RBracket)) {
            const nameToken = this.expect(token_1.TokenKind.Ident, "Expected parameter name");
            let typeAnnotation;
            if (this.check(token_1.TokenKind.Of)) {
                this.advance();
                typeAnnotation = this.expect(token_1.TokenKind.Ident, "Expected type name").text;
            }
            params.push({ name: nameToken.text, nameSpan: nameToken.span, typeAnnotation });
            if (this.check(token_1.TokenKind.Semicolon))
                this.advance();
        }
        return params;
    }
    parseDottedName() {
        let name = this.expect(token_1.TokenKind.Ident, "Expected identifier").text;
        while (this.check(token_1.TokenKind.Dot)) {
            this.advance();
            name += "." + this.expect(token_1.TokenKind.Ident, "Expected identifier").text;
        }
        return name;
    }
    maybePostfix(stmt) {
        if (stmt.type !== "ExprStmt")
            return stmt;
        const exprStmt = stmt;
        if (this.check(token_1.TokenKind.If)) {
            this.advance();
            const condition = this.parseExpression();
            exprStmt.postfix = { kind: "if", condition };
            exprStmt.span = this.mergeSpans(exprStmt.span, condition.span);
            return exprStmt;
        }
        if (this.check(token_1.TokenKind.Unless)) {
            this.advance();
            const condition = this.parseExpression();
            exprStmt.postfix = { kind: "unless", condition };
            exprStmt.span = this.mergeSpans(exprStmt.span, condition.span);
            return exprStmt;
        }
        if (this.check(token_1.TokenKind.For)) {
            this.advance();
            const variable = this.expect(token_1.TokenKind.Ident, "Expected variable").text;
            this.expect(token_1.TokenKind.In, "Expected 'in'");
            const iterable = this.parseExpression();
            exprStmt.postfix = { kind: "for", variable, iterable };
            exprStmt.span = this.mergeSpans(exprStmt.span, iterable.span);
            return exprStmt;
        }
        return stmt;
    }
    // --- Token Navigation ---
    peek() {
        if (this.pos >= this.tokens.length) {
            return this.tokens[this.tokens.length - 1]; // EOF
        }
        return this.tokens[this.pos];
    }
    peekAt(offset) {
        const idx = this.pos + offset;
        if (idx >= this.tokens.length)
            return undefined;
        return this.tokens[idx];
    }
    advance() {
        const token = this.peek();
        if (this.pos < this.tokens.length)
            this.pos++;
        return token;
    }
    check(kind) {
        return this.peek().kind === kind;
    }
    expect(kind, message) {
        if (this.check(kind)) {
            return this.advance();
        }
        this.addError(message + `, got '${this.peek().text}'`);
        // Return a dummy token
        const span = this.currentSpan();
        return { kind, text: "", value: "", span };
    }
    isAtEnd() {
        return this.pos >= this.tokens.length || this.peek().kind === token_1.TokenKind.Eof;
    }
    skipNewlines() {
        while (!this.isAtEnd() && this.peek().kind === token_1.TokenKind.Newline) {
            this.advance();
        }
    }
    isStatementEnd() {
        return this.isAtEnd() || this.check(token_1.TokenKind.Newline) || this.check(token_1.TokenKind.Eof);
    }
    isBlockStart() {
        return this.isAtEnd() || this.check(token_1.TokenKind.Newline);
    }
    getIndentLevel() {
        if (this.check(token_1.TokenKind.Indent)) {
            return this.peek().value;
        }
        return 0;
    }
    prevSpan() {
        if (this.pos > 0) {
            return this.tokens[this.pos - 1].span;
        }
        return this.currentSpan();
    }
    currentSpan() {
        const pos = this.peek().span.start;
        return { start: pos, end: pos };
    }
    spanFrom(start) {
        const end = this.pos > 0 ? this.tokens[this.pos - 1].span.end : start;
        return { start, end };
    }
    mergeSpans(a, b) {
        return { start: a.start, end: b.end };
    }
    dummyExpr() {
        const span = this.currentSpan();
        return { type: "Ident", name: "<error>", span };
    }
    addError(message) {
        this.errors.push({ message, span: this.currentSpan() });
    }
    synchronize() {
        while (!this.isAtEnd()) {
            if (this.check(token_1.TokenKind.Newline)) {
                this.advance();
                return;
            }
            const k = this.peek().kind;
            if (k === token_1.TokenKind.Const || k === token_1.TokenKind.Let || k === token_1.TokenKind.Var ||
                k === token_1.TokenKind.Fn || k === token_1.TokenKind.Function ||
                k === token_1.TokenKind.If || k === token_1.TokenKind.While || k === token_1.TokenKind.Do ||
                k === token_1.TokenKind.For || k === token_1.TokenKind.Match || k === token_1.TokenKind.Switch ||
                k === token_1.TokenKind.Import || k === token_1.TokenKind.Export || k === token_1.TokenKind.Public ||
                k === token_1.TokenKind.Return || k === token_1.TokenKind.Class || k === token_1.TokenKind.Try) {
                return;
            }
            this.advance();
        }
    }
}
//# sourceMappingURL=parser.js.map