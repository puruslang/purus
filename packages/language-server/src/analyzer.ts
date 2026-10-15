import { Program, Stmt, Expr, Param, FnBody, ClassMember, MatchArm } from "./ast";
import { Span } from "./token";
import {
  PurusSymbol, Scope, SymbolKind, ParamInfo,
  createScope, lookupSymbol,
} from "./symbols";

export function analyze(program: Program): Scope {
  const analyzer = new Analyzer();
  return analyzer.analyze(program);
}

class Analyzer {
  private currentScope!: Scope;

  analyze(program: Program): Scope {
    this.currentScope = createScope(null, program.span);
    for (const stmt of program.stmts) {
      this.visitStmt(stmt);
    }
    return this.currentScope;
  }

  private visitStmt(stmt: Stmt): void {
    switch (stmt.type) {
      case "VarDecl":
        this.declareSymbol(
          stmt.name,
          SymbolKind.Variable,
          stmt.span,
          stmt.nameSpan,
          { detail: `${stmt.declKind} ${stmt.name}${stmt.typeAnnotation ? ` of ${stmt.typeAnnotation}` : ""}` }
        );
        this.visitExpr(stmt.init);
        break;

      case "ArrayDestruct":
        for (const n of stmt.names) {
          this.declareSymbol(n.name, SymbolKind.Variable, stmt.span, n.span, {
            detail: `${stmt.declKind} ${n.name} (destructured)`,
          });
        }
        this.visitExpr(stmt.init);
        break;

      case "ObjectDestruct":
        for (const n of stmt.names) {
          this.declareSymbol(n.name, SymbolKind.Variable, stmt.span, n.span, {
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
        const params: ParamInfo[] = stmt.params.map((p) => ({
          name: p.name,
          typeAnnotation: p.typeAnnotation,
        }));
        const paramStr = stmt.params.map((p) =>
          p.typeAnnotation ? `${p.name} of ${p.typeAnnotation}` : p.name
        ).join("; ");
        const sig = `${stmt.isAsync ? "async " : ""}fn ${stmt.name}${paramStr ? " " + paramStr : ""}${stmt.returnType ? " gives " + stmt.returnType : ""}`;

        this.declareSymbol(stmt.name, SymbolKind.Function, stmt.span, stmt.nameSpan, {
          detail: sig,
          params,
          returnType: stmt.returnType,
          isAsync: stmt.isAsync,
        });

        const fnScope = createScope(this.currentScope, stmt.span);
        const prevScope = this.currentScope;
        this.currentScope = fnScope;

        for (const p of stmt.params) {
          this.declareSymbol(p.name, SymbolKind.Parameter, p.nameSpan, p.nameSpan, {
            detail: `(parameter) ${p.name}${p.typeAnnotation ? " of " + p.typeAnnotation : ""}`,
          });
        }

        this.visitFnBody(stmt.body);
        this.currentScope = prevScope;

        // Attach scope to symbol
        const sym = this.currentScope.symbols.get(stmt.name);
        if (sym) sym.scope = fnScope;
        break;
      }

      case "ClassDecl": {
        this.declareSymbol(stmt.name, SymbolKind.Class, stmt.span, stmt.nameSpan, {
          detail: `class ${stmt.name}${stmt.superClass ? " extends " + stmt.superClass : ""}`,
        });

        const classScope = createScope(this.currentScope, stmt.span);
        const prevScope = this.currentScope;
        this.currentScope = classScope;

        for (const member of stmt.members) {
          this.visitClassMember(member);
        }

        this.currentScope = prevScope;

        const classSym = this.currentScope.symbols.get(stmt.name);
        if (classSym) classSym.scope = classScope;
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
        const forScope = createScope(this.currentScope, stmt.span);
        const prev = this.currentScope;
        this.currentScope = forScope;

        this.declareSymbol(stmt.variable, SymbolKind.Variable, stmt.variableSpan, stmt.variableSpan, {
          detail: `(loop variable) ${stmt.variable}`,
        });
        if (stmt.index && stmt.indexSpan) {
          this.declareSymbol(stmt.index, SymbolKind.Variable, stmt.indexSpan, stmt.indexSpan, {
            detail: `(loop index) ${stmt.index}`,
          });
        }

        this.visitExpr(stmt.iterable);
        for (const s of stmt.body) this.visitStmt(s);

        this.currentScope = prev;
        break;
      }

      case "ForRange": {
        const forScope = createScope(this.currentScope, stmt.span);
        const prev = this.currentScope;
        this.currentScope = forScope;

        this.declareSymbol(stmt.variable, SymbolKind.Variable, stmt.variableSpan, stmt.variableSpan, {
          detail: `(loop variable) ${stmt.variable}`,
        });

        this.visitExpr(stmt.start);
        this.visitExpr(stmt.end);
        for (const s of stmt.body) this.visitStmt(s);

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
          } else {
            this.visitExpr(c.body.expr);
          }
        }
        if (stmt.defaultBody) {
          this.visitBlock(stmt.defaultBody, stmt.span);
        }
        break;

      case "TryCatch": {
        this.visitBlock(stmt.tryBody, stmt.span);

        const catchScope = createScope(this.currentScope, stmt.span);
        const prev = this.currentScope;
        this.currentScope = catchScope;

        if (stmt.catchVar && stmt.catchVarSpan) {
          this.declareSymbol(stmt.catchVar, SymbolKind.Variable, stmt.catchVarSpan, stmt.catchVarSpan, {
            detail: `(catch) ${stmt.catchVar}`,
          });
        }

        for (const s of stmt.catchBody) this.visitStmt(s);
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
        if (stmt.expr) this.visitExpr(stmt.expr);
        break;

      case "Import":
        if (stmt.defaultName && stmt.defaultNameSpan) {
          this.declareSymbol(stmt.defaultName, SymbolKind.Import, stmt.span, stmt.defaultNameSpan, {
            detail: `import ${stmt.defaultName} from "${stmt.source}"`,
          });
        }
        if (stmt.names) {
          for (const n of stmt.names) {
            this.declareSymbol(n.name, SymbolKind.Import, stmt.span, n.span, {
              detail: `import { ${n.name} } from "${stmt.source}"`,
            });
          }
        }
        if (stmt.namespaceName && stmt.namespaceNameSpan) {
          this.declareSymbol(stmt.namespaceName, SymbolKind.Import, stmt.span, stmt.namespaceNameSpan, {
            detail: `import * as ${stmt.namespaceName} from "${stmt.source}"`,
          });
        }
        break;

      case "FromUse":
        for (const n of stmt.names) {
          this.declareSymbol(n.name, SymbolKind.Import, stmt.span, n.span, {
            detail: `from ${stmt.path} use ${n.name}`,
          });
        }
        break;

      case "Namespace": {
        this.declareSymbol(stmt.name, SymbolKind.Namespace, stmt.span, stmt.nameSpan, {
          detail: `namespace ${stmt.name}`,
        });

        const nsScope = createScope(this.currentScope, stmt.span);
        const prev = this.currentScope;
        this.currentScope = nsScope;

        for (const s of stmt.body) this.visitStmt(s);

        this.currentScope = prev;

        const nsSym = this.currentScope.symbols.get(stmt.name);
        if (nsSym) nsSym.scope = nsScope;
        break;
      }

      case "Export":
      case "ExportDefault":
      case "Public":
        this.visitStmt(stmt.decl);
        break;

      case "TypeDecl":
        this.declareSymbol(stmt.name, SymbolKind.Type, stmt.span, stmt.nameSpan, {
          detail: `type ${stmt.name} be ${stmt.value}`,
        });
        break;

      case "Delete":
        this.visitExpr(stmt.expr);
        break;

      case "ExprStmt":
        this.visitExpr(stmt.expr);
        if (stmt.postfix) {
          if (stmt.postfix.condition) this.visitExpr(stmt.postfix.condition);
          if (stmt.postfix.iterable) this.visitExpr(stmt.postfix.iterable);
        }
        break;

      case "SideEffectImport":
      case "Use":
      case "Break":
      case "Continue":
        break;
    }
  }

  private visitExpr(expr: Expr): void {
    switch (expr.type) {
      case "Ident": {
        const sym = lookupSymbol(this.currentScope, expr.name);
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
        for (const arg of expr.args) this.visitExpr(arg);
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
        for (const el of expr.elements) this.visitExpr(el);
        break;

      case "ObjectLit":
        for (const entry of expr.entries) {
          if (entry.value) this.visitExpr(entry.value);
          else {
            // Shorthand: look up identifier
            const sym = lookupSymbol(this.currentScope, entry.key);
            if (sym) sym.references.push(entry.keySpan);
          }
        }
        break;

      case "Range":
        this.visitExpr(expr.start);
        this.visitExpr(expr.end);
        break;

      case "FnExpr": {
        const fnScope = createScope(this.currentScope, expr.span);
        const prev = this.currentScope;
        this.currentScope = fnScope;

        for (const p of expr.params) {
          this.declareSymbol(p.name, SymbolKind.Parameter, p.nameSpan, p.nameSpan, {
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
        for (const arm of expr.arms) this.visitMatchArm(arm);
        break;

      case "TryExpr": {
        const tryScope = createScope(this.currentScope, expr.span);
        const prevTryScope = this.currentScope;
        this.currentScope = tryScope;
        for (const s of expr.tryBody) this.visitStmt(s);
        this.currentScope = prevTryScope;

        const catchScope = createScope(this.currentScope, expr.span);
        this.currentScope = catchScope;

        if (expr.catchVar) {
          this.declareSymbol(expr.catchVar, SymbolKind.Variable, expr.span, expr.span, {
            detail: `(catch) ${expr.catchVar}`,
          });
        }

        for (const s of expr.catchBody) this.visitStmt(s);
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
        if (expr.expr) this.visitExpr(expr.expr);
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

  private visitFnBody(body: FnBody): void {
    if (body.kind === "block") {
      for (const s of body.stmts) this.visitStmt(s);
    } else {
      this.visitExpr(body.expr);
    }
  }

  private visitBlock(stmts: Stmt[], parentSpan: Span): void {
    const blockScope = createScope(this.currentScope, parentSpan);
    const prev = this.currentScope;
    this.currentScope = blockScope;
    for (const s of stmts) this.visitStmt(s);
    this.currentScope = prev;
  }

  private visitClassMember(member: ClassMember): void {
    switch (member.type) {
      case "Constructor": {
        const ctorScope = createScope(this.currentScope, member.span);
        const prev = this.currentScope;
        this.currentScope = ctorScope;
        for (const p of member.params) {
          this.declareSymbol(p.name, SymbolKind.Parameter, p.nameSpan, p.nameSpan);
        }
        this.visitFnBody(member.body);
        this.currentScope = prev;
        break;
      }

      case "Method": {
        const params: ParamInfo[] = member.params.map((p) => ({
          name: p.name,
          typeAnnotation: p.typeAnnotation,
        }));
        const paramStr = member.params.map((p) => p.name).join("; ");
        this.declareSymbol(member.name, SymbolKind.Method, member.span, member.nameSpan, {
          detail: `${member.isStatic ? "static " : ""}${member.isAsync ? "async " : ""}fn ${member.name}${paramStr ? " " + paramStr : ""}`,
          params,
          returnType: member.returnType,
          isAsync: member.isAsync,
        });

        const methodScope = createScope(this.currentScope, member.span);
        const prev = this.currentScope;
        this.currentScope = methodScope;
        for (const p of member.params) {
          this.declareSymbol(p.name, SymbolKind.Parameter, p.nameSpan, p.nameSpan);
        }
        this.visitFnBody(member.body);
        this.currentScope = prev;
        break;
      }

      case "Getter": {
        this.declareSymbol(member.name, SymbolKind.Property, member.span, member.nameSpan, {
          detail: `get fn ${member.name}`,
        });
        const getterScope = createScope(this.currentScope, member.span);
        const prevGetter = this.currentScope;
        this.currentScope = getterScope;
        this.visitFnBody(member.body);
        this.currentScope = prevGetter;
        break;
      }

      case "Setter": {
        this.declareSymbol(member.name, SymbolKind.Property, member.span, member.nameSpan, {
          detail: `set fn ${member.name} ${member.paramName}`,
        });
        const setterScope = createScope(this.currentScope, member.span);
        const prevSetter = this.currentScope;
        this.currentScope = setterScope;
        this.declareSymbol(member.paramName, SymbolKind.Parameter, member.nameSpan, member.nameSpan, {
          detail: `(parameter) ${member.paramName}`,
        });
        this.visitFnBody(member.body);
        this.currentScope = prevSetter;
        break;
      }

      case "PrivateField":
        this.declareSymbol(member.name, SymbolKind.Property, member.span, member.nameSpan, {
          detail: `private ${member.name}`,
          isPrivate: true,
        });
        if (member.init) this.visitExpr(member.init);
        break;
    }
  }

  private visitMatchArm(arm: MatchArm): void {
    if (arm.pattern) this.visitExpr(arm.pattern);
    if (arm.guard) this.visitExpr(arm.guard);
    if (arm.body.kind === "block") {
      this.visitBlock(arm.body.stmts, arm.span);
    } else {
      this.visitExpr(arm.body.expr);
    }
  }

  private declareSymbol(
    name: string,
    kind: SymbolKind,
    declSpan: Span,
    nameSpan: Span,
    extra?: Partial<PurusSymbol>
  ): void {
    const sym: PurusSymbol = {
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
