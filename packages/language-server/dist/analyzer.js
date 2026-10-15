"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = analyze;
const symbols_1 = require("./symbols");
function analyze(program) {
    const analyzer = new Analyzer();
    return analyzer.analyze(program);
}
class Analyzer {
    analyze(program) {
        this.currentScope = (0, symbols_1.createScope)(null, program.span);
        for (const stmt of program.stmts) {
            this.visitStmt(stmt);
        }
        return this.currentScope;
    }
    visitStmt(stmt) {
        switch (stmt.type) {
            case "VarDecl":
                this.declareSymbol(stmt.name, symbols_1.SymbolKind.Variable, stmt.span, stmt.nameSpan, { detail: `${stmt.declKind} ${stmt.name}${stmt.typeAnnotation ? ` of ${stmt.typeAnnotation}` : ""}` });
                this.visitExpr(stmt.init);
                break;
            case "ArrayDestruct":
                for (const n of stmt.names) {
                    this.declareSymbol(n.name, symbols_1.SymbolKind.Variable, stmt.span, n.span, {
                        detail: `${stmt.declKind} ${n.name} (destructured)`,
                    });
                }
                this.visitExpr(stmt.init);
                break;
            case "ObjectDestruct":
                for (const n of stmt.names) {
                    this.declareSymbol(n.name, symbols_1.SymbolKind.Variable, stmt.span, n.span, {
                        detail: `${stmt.declKind} ${n.name} (destructured)`,
                    });
                }
                this.visitExpr(stmt.init);
                break;
            case "Assign":
                this.visitExpr(stmt.target);
                this.visitExpr(stmt.value);
                break;
            case "CompoundAssign":
                this.visitExpr(stmt.target);
                this.visitExpr(stmt.value);
                break;
            case "FnDecl": {
                const params = stmt.params.map((p) => ({
                    name: p.name,
                    typeAnnotation: p.typeAnnotation,
                }));
                const paramStr = stmt.params.map((p) => p.typeAnnotation ? `${p.name} of ${p.typeAnnotation}` : p.name).join("; ");
                const sig = `${stmt.isAsync ? "async " : ""}fn ${stmt.name}${paramStr ? " " + paramStr : ""}${stmt.returnType ? " gives " + stmt.returnType : ""}`;
                this.declareSymbol(stmt.name, symbols_1.SymbolKind.Function, stmt.span, stmt.nameSpan, {
                    detail: sig,
                    params,
                    returnType: stmt.returnType,
                    isAsync: stmt.isAsync,
                });
                const fnScope = (0, symbols_1.createScope)(this.currentScope, stmt.span);
                const prevScope = this.currentScope;
                this.currentScope = fnScope;
                for (const p of stmt.params) {
                    this.declareSymbol(p.name, symbols_1.SymbolKind.Parameter, p.nameSpan, p.nameSpan, {
                        detail: `(parameter) ${p.name}${p.typeAnnotation ? " of " + p.typeAnnotation : ""}`,
                    });
                }
                this.visitFnBody(stmt.body);
                this.currentScope = prevScope;
                // Attach scope to symbol
                const sym = this.currentScope.symbols.get(stmt.name);
                if (sym)
                    sym.scope = fnScope;
                break;
            }
            case "ClassDecl": {
                this.declareSymbol(stmt.name, symbols_1.SymbolKind.Class, stmt.span, stmt.nameSpan, {
                    detail: `class ${stmt.name}${stmt.superClass ? " extends " + stmt.superClass : ""}`,
                });
                const classScope = (0, symbols_1.createScope)(this.currentScope, stmt.span);
                const prevScope = this.currentScope;
                this.currentScope = classScope;
                for (const member of stmt.members) {
                    this.visitClassMember(member);
                }
                this.currentScope = prevScope;
                const classSym = this.currentScope.symbols.get(stmt.name);
                if (classSym)
                    classSym.scope = classScope;
                break;
            }
            case "If":
                this.visitExpr(stmt.condition);
                this.visitBlock(stmt.body, stmt.span);
                for (const elif of stmt.elifs) {
                    this.visitExpr(elif.condition);
                    this.visitBlock(elif.body, stmt.span);
                }
                if (stmt.elseBody) {
                    this.visitBlock(stmt.elseBody, stmt.span);
                }
                break;
            case "Unless":
                this.visitExpr(stmt.condition);
                this.visitBlock(stmt.body, stmt.span);
                break;
            case "While":
                this.visitExpr(stmt.condition);
                this.visitBlock(stmt.body, stmt.span);
                break;
            case "Until":
                this.visitExpr(stmt.condition);
                this.visitBlock(stmt.body, stmt.span);
                break;
            case "DoWhile":
                this.visitBlock(stmt.body, stmt.span);
                this.visitExpr(stmt.condition);
                break;
            case "ForIn": {
                const forScope = (0, symbols_1.createScope)(this.currentScope, stmt.span);
                const prev = this.currentScope;
                this.currentScope = forScope;
                this.declareSymbol(stmt.variable, symbols_1.SymbolKind.Variable, stmt.variableSpan, stmt.variableSpan, {
                    detail: `(loop variable) ${stmt.variable}`,
                });
                if (stmt.index && stmt.indexSpan) {
                    this.declareSymbol(stmt.index, symbols_1.SymbolKind.Variable, stmt.indexSpan, stmt.indexSpan, {
                        detail: `(loop index) ${stmt.index}`,
                    });
                }
                this.visitExpr(stmt.iterable);
                for (const s of stmt.body)
                    this.visitStmt(s);
                this.currentScope = prev;
                break;
            }
            case "ForRange": {
                const forScope = (0, symbols_1.createScope)(this.currentScope, stmt.span);
                const prev = this.currentScope;
                this.currentScope = forScope;
                this.declareSymbol(stmt.variable, symbols_1.SymbolKind.Variable, stmt.variableSpan, stmt.variableSpan, {
                    detail: `(loop variable) ${stmt.variable}`,
                });
                this.visitExpr(stmt.start);
                this.visitExpr(stmt.end);
                for (const s of stmt.body)
                    this.visitStmt(s);
                this.currentScope = prev;
                break;
            }
            case "Match":
                this.visitExpr(stmt.subject);
                for (const arm of stmt.arms) {
                    this.visitMatchArm(arm);
                }
                break;
            case "Switch":
                this.visitExpr(stmt.subject);
                for (const c of stmt.cases) {
                    this.visitExpr(c.value);
                    if (c.body.kind === "block") {
                        this.visitBlock(c.body.stmts, c.span);
                    }
                    else {
                        this.visitExpr(c.body.expr);
                    }
                }
                if (stmt.defaultBody) {
                    this.visitBlock(stmt.defaultBody, stmt.span);
                }
                break;
            case "TryCatch": {
                this.visitBlock(stmt.tryBody, stmt.span);
                const catchScope = (0, symbols_1.createScope)(this.currentScope, stmt.span);
                const prev = this.currentScope;
                this.currentScope = catchScope;
                if (stmt.catchVar && stmt.catchVarSpan) {
                    this.declareSymbol(stmt.catchVar, symbols_1.SymbolKind.Variable, stmt.catchVarSpan, stmt.catchVarSpan, {
                        detail: `(catch) ${stmt.catchVar}`,
                    });
                }
                for (const s of stmt.catchBody)
                    this.visitStmt(s);
                this.currentScope = prev;
                if (stmt.finallyBody) {
                    this.visitBlock(stmt.finallyBody, stmt.span);
                }
                break;
            }
            case "Throw":
                this.visitExpr(stmt.expr);
                break;
            case "Return":
                if (stmt.expr)
                    this.visitExpr(stmt.expr);
                break;
            case "Import":
                if (stmt.defaultName && stmt.defaultNameSpan) {
                    this.declareSymbol(stmt.defaultName, symbols_1.SymbolKind.Import, stmt.span, stmt.defaultNameSpan, {
                        detail: `import ${stmt.defaultName} from "${stmt.source}"`,
                    });
                }
                if (stmt.names) {
                    for (const n of stmt.names) {
                        this.declareSymbol(n.name, symbols_1.SymbolKind.Import, stmt.span, n.span, {
                            detail: `import { ${n.name} } from "${stmt.source}"`,
                        });
                    }
                }
                if (stmt.namespaceName && stmt.namespaceNameSpan) {
                    this.declareSymbol(stmt.namespaceName, symbols_1.SymbolKind.Import, stmt.span, stmt.namespaceNameSpan, {
                        detail: `import * as ${stmt.namespaceName} from "${stmt.source}"`,
                    });
                }
                break;
            case "FromUse":
                for (const n of stmt.names) {
                    this.declareSymbol(n.name, symbols_1.SymbolKind.Import, stmt.span, n.span, {
                        detail: `from ${stmt.path} use ${n.name}`,
                    });
                }
                break;
            case "Namespace": {
                this.declareSymbol(stmt.name, symbols_1.SymbolKind.Namespace, stmt.span, stmt.nameSpan, {
                    detail: `namespace ${stmt.name}`,
                });
                const nsScope = (0, symbols_1.createScope)(this.currentScope, stmt.span);
                const prev = this.currentScope;
                this.currentScope = nsScope;
                for (const s of stmt.body)
                    this.visitStmt(s);
                this.currentScope = prev;
                const nsSym = this.currentScope.symbols.get(stmt.name);
                if (nsSym)
                    nsSym.scope = nsScope;
                break;
            }
            case "Export":
            case "ExportDefault":
            case "Public":
                this.visitStmt(stmt.decl);
                break;
            case "TypeDecl":
                this.declareSymbol(stmt.name, symbols_1.SymbolKind.Type, stmt.span, stmt.nameSpan, {
                    detail: `type ${stmt.name} be ${stmt.value}`,
                });
                break;
            case "Delete":
                this.visitExpr(stmt.expr);
                break;
            case "ExprStmt":
                this.visitExpr(stmt.expr);
                if (stmt.postfix) {
                    if (stmt.postfix.condition)
                        this.visitExpr(stmt.postfix.condition);
                    if (stmt.postfix.iterable)
                        this.visitExpr(stmt.postfix.iterable);
                }
                break;
            case "SideEffectImport":
            case "Use":
            case "Break":
            case "Continue":
                break;
        }
    }
    visitExpr(expr) {
        switch (expr.type) {
            case "Ident": {
                const sym = (0, symbols_1.lookupSymbol)(this.currentScope, expr.name);
                if (sym) {
                    sym.references.push(expr.span);
                }
                break;
            }
            case "BinOp":
                this.visitExpr(expr.left);
                this.visitExpr(expr.right);
                break;
            case "Unary":
                this.visitExpr(expr.operand);
                break;
            case "Call":
                this.visitExpr(expr.callee);
                for (const arg of expr.args)
                    this.visitExpr(arg);
                break;
            case "DotAccess":
            case "OptionalDot":
                this.visitExpr(expr.object);
                break;
            case "ComputedAccess":
                this.visitExpr(expr.object);
                this.visitExpr(expr.index);
                break;
            case "Slice":
                this.visitExpr(expr.object);
                this.visitExpr(expr.start);
                this.visitExpr(expr.end);
                break;
            case "ArrayLit":
                for (const el of expr.elements)
                    this.visitExpr(el);
                break;
            case "ObjectLit":
                for (const entry of expr.entries) {
                    if (entry.value)
                        this.visitExpr(entry.value);
                    else {
                        // Shorthand: look up identifier
                        const sym = (0, symbols_1.lookupSymbol)(this.currentScope, entry.key);
                        if (sym)
                            sym.references.push(entry.keySpan);
                    }
                }
                break;
            case "Range":
                this.visitExpr(expr.start);
                this.visitExpr(expr.end);
                break;
            case "FnExpr": {
                const fnScope = (0, symbols_1.createScope)(this.currentScope, expr.span);
                const prev = this.currentScope;
                this.currentScope = fnScope;
                for (const p of expr.params) {
                    this.declareSymbol(p.name, symbols_1.SymbolKind.Parameter, p.nameSpan, p.nameSpan, {
                        detail: `(parameter) ${p.name}${p.typeAnnotation ? " of " + p.typeAnnotation : ""}`,
                    });
                }
                this.visitFnBody(expr.body);
                this.currentScope = prev;
                break;
            }
            case "IfExpr":
                this.visitExpr(expr.condition);
                this.visitExpr(expr.thenBranch);
                this.visitExpr(expr.elseBranch);
                break;
            case "MatchExpr":
                this.visitExpr(expr.subject);
                for (const arm of expr.arms)
                    this.visitMatchArm(arm);
                break;
            case "TryExpr": {
                const tryScope = (0, symbols_1.createScope)(this.currentScope, expr.span);
                const prevTryScope = this.currentScope;
                this.currentScope = tryScope;
                for (const s of expr.tryBody)
                    this.visitStmt(s);
                this.currentScope = prevTryScope;
                const catchScope = (0, symbols_1.createScope)(this.currentScope, expr.span);
                this.currentScope = catchScope;
                if (expr.catchVar) {
                    this.declareSymbol(expr.catchVar, symbols_1.SymbolKind.Variable, expr.span, expr.span, {
                        detail: `(catch) ${expr.catchVar}`,
                    });
                }
                for (const s of expr.catchBody)
                    this.visitStmt(s);
                this.currentScope = prevTryScope;
                break;
            }
            case "Pipe":
            case "Coal":
                this.visitExpr(expr.left);
                this.visitExpr(expr.right);
                break;
            case "IsCheck":
                this.visitExpr(expr.expr);
                break;
            case "AsCast":
                this.visitExpr(expr.expr);
                break;
            case "Instanceof":
                this.visitExpr(expr.expr);
                break;
            case "Typeof":
                this.visitExpr(expr.expr);
                break;
            case "Await":
                this.visitExpr(expr.expr);
                break;
            case "New":
                this.visitExpr(expr.callee);
                break;
            case "DeleteExpr":
                this.visitExpr(expr.expr);
                break;
            case "Group":
                this.visitExpr(expr.expr);
                break;
            case "Yield":
                if (expr.expr)
                    this.visitExpr(expr.expr);
                break;
            case "Void":
                this.visitExpr(expr.expr);
                break;
            // Literals - nothing to visit
            case "IntLit":
            case "FloatLit":
            case "BigIntLit":
            case "StrLit":
            case "RegexLit":
            case "BoolLit":
            case "NullLit":
            case "UndefinedLit":
            case "NanLit":
            case "InfinityLit":
            case "Blank":
            case "This":
            case "Super":
                break;
        }
    }
    visitFnBody(body) {
        if (body.kind === "block") {
            for (const s of body.stmts)
                this.visitStmt(s);
        }
        else {
            this.visitExpr(body.expr);
        }
    }
    visitBlock(stmts, parentSpan) {
        const blockScope = (0, symbols_1.createScope)(this.currentScope, parentSpan);
        const prev = this.currentScope;
        this.currentScope = blockScope;
        for (const s of stmts)
            this.visitStmt(s);
        this.currentScope = prev;
    }
    visitClassMember(member) {
        switch (member.type) {
            case "Constructor": {
                const ctorScope = (0, symbols_1.createScope)(this.currentScope, member.span);
                const prev = this.currentScope;
                this.currentScope = ctorScope;
                for (const p of member.params) {
                    this.declareSymbol(p.name, symbols_1.SymbolKind.Parameter, p.nameSpan, p.nameSpan);
                }
                this.visitFnBody(member.body);
                this.currentScope = prev;
                break;
            }
            case "Method": {
                const params = member.params.map((p) => ({
                    name: p.name,
                    typeAnnotation: p.typeAnnotation,
                }));
                const paramStr = member.params.map((p) => p.name).join("; ");
                this.declareSymbol(member.name, symbols_1.SymbolKind.Method, member.span, member.nameSpan, {
                    detail: `${member.isStatic ? "static " : ""}${member.isAsync ? "async " : ""}fn ${member.name}${paramStr ? " " + paramStr : ""}`,
                    params,
                    returnType: member.returnType,
                    isAsync: member.isAsync,
                });
                const methodScope = (0, symbols_1.createScope)(this.currentScope, member.span);
                const prev = this.currentScope;
                this.currentScope = methodScope;
                for (const p of member.params) {
                    this.declareSymbol(p.name, symbols_1.SymbolKind.Parameter, p.nameSpan, p.nameSpan);
                }
                this.visitFnBody(member.body);
                this.currentScope = prev;
                break;
            }
            case "Getter": {
                this.declareSymbol(member.name, symbols_1.SymbolKind.Property, member.span, member.nameSpan, {
                    detail: `get fn ${member.name}`,
                });
                const getterScope = (0, symbols_1.createScope)(this.currentScope, member.span);
                const prevGetter = this.currentScope;
                this.currentScope = getterScope;
                this.visitFnBody(member.body);
                this.currentScope = prevGetter;
                break;
            }
            case "Setter": {
                this.declareSymbol(member.name, symbols_1.SymbolKind.Property, member.span, member.nameSpan, {
                    detail: `set fn ${member.name} ${member.paramName}`,
                });
                const setterScope = (0, symbols_1.createScope)(this.currentScope, member.span);
                const prevSetter = this.currentScope;
                this.currentScope = setterScope;
                this.declareSymbol(member.paramName, symbols_1.SymbolKind.Parameter, member.nameSpan, member.nameSpan, {
                    detail: `(parameter) ${member.paramName}`,
                });
                this.visitFnBody(member.body);
                this.currentScope = prevSetter;
                break;
            }
            case "PrivateField":
                this.declareSymbol(member.name, symbols_1.SymbolKind.Property, member.span, member.nameSpan, {
                    detail: `private ${member.name}`,
                    isPrivate: true,
                });
                if (member.init)
                    this.visitExpr(member.init);
                break;
        }
    }
    visitMatchArm(arm) {
        if (arm.pattern)
            this.visitExpr(arm.pattern);
        if (arm.guard)
            this.visitExpr(arm.guard);
        if (arm.body.kind === "block") {
            this.visitBlock(arm.body.stmts, arm.span);
        }
        else {
            this.visitExpr(arm.body.expr);
        }
    }
    declareSymbol(name, kind, declSpan, nameSpan, extra) {
        const sym = {
            name,
            kind,
            declSpan,
            nameSpan,
            references: [],
            ...extra,
        };
        this.currentScope.symbols.set(name, sym);
    }
}
//# sourceMappingURL=analyzer.js.map