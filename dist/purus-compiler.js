import { writeFileSync as writeFileSync$3559, readFileSync as readFileSync$3554 } from "node:fs";
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function $oob() {
  throw new Error("Index out of bounds");
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
function _M0TPB4IterGsE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
function _M0TPB9ArrayViewGsE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
const $bytes_literal$0 = new Uint8Array();
const _M0MPB7JSArray12append__view = (dst, src, src_offset, len) => {
   for (let i = 0; i < len; i++) {
     dst.push(src[src_offset + i]);
   }
 };
function _M0TPB9ArrayViewGRPC16string10StringViewE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC15debug4Repr7UnitLit() {}
_M0DTPC15debug4Repr7UnitLit.prototype.$tag = 0;
function _M0DTPC15debug4Repr7Integer(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7Integer.prototype.$tag = 1;
function _M0DTPC15debug4Repr9DoubleLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr9DoubleLit.prototype.$tag = 2;
function _M0DTPC15debug4Repr8FloatLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr8FloatLit.prototype.$tag = 3;
function _M0DTPC15debug4Repr7BoolLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7BoolLit.prototype.$tag = 4;
function _M0DTPC15debug4Repr7CharLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7CharLit.prototype.$tag = 5;
function _M0DTPC15debug4Repr9StringLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr9StringLit.prototype.$tag = 6;
function _M0DTPC15debug4Repr5Tuple(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr5Tuple.prototype.$tag = 7;
function _M0DTPC15debug4Repr5Array(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr5Array.prototype.$tag = 8;
function _M0DTPC15debug4Repr6Record(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr6Record.prototype.$tag = 9;
function _M0DTPC15debug4Repr4Enum(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr4Enum.prototype.$tag = 10;
function _M0DTPC15debug4Repr3Map(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr3Map.prototype.$tag = 11;
function _M0DTPC15debug4Repr11RecordField(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr11RecordField.prototype.$tag = 12;
function _M0DTPC15debug4Repr14EnumLabeledArg(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr14EnumLabeledArg.prototype.$tag = 13;
function _M0DTPC15debug4Repr6Opaque(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr6Opaque.prototype.$tag = 14;
function _M0DTPC15debug4Repr7Literal(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7Literal.prototype.$tag = 15;
function _M0DTPC15debug4Repr8MapEntry(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr8MapEntry.prototype.$tag = 16;
function _M0DTPC15debug4Repr7Omitted() {}
_M0DTPC15debug4Repr7Omitted.prototype.$tag = 17;
const _M0DTPC15debug4Repr7Omitted__ = new _M0DTPC15debug4Repr7Omitted();
function _M0TPC15debug13ContentParens(param0, param1) {
  this.size = param0;
  this.lines = param1;
}
function _M0TPC15debug7Content(param0, param1, param2) {
  this.size = param0;
  this.lines = param1;
  this.needs_parens = param2;
}
const _M0FPC13env19get__cli__args__ffi = function() {
  if (typeof process !== "undefined" && typeof process.argv !== "undefined") {
    return process.argv;
  } else {
    return [];
  }
 };
function _M0TPB9ArrayViewGyE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGcE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
const _M0MP311moonbitlang1x2fs13FsBytesResult6is__ok = (res) => res.ok;
const _M0MP311moonbitlang1x2fs13FsBytesResult7content = (res) => res.content;
const _M0MP311moonbitlang1x2fs13FsBytesResult14error__message = (res) => res.content;
const _M0MP311moonbitlang1x2fs12FsUnitResult6is__ok = (res) => res.ok;
const _M0MP311moonbitlang1x2fs12FsUnitResult14error__message = (res) => res.content;
const _M0FP311moonbitlang1x2fs15read__file__ffi = function(readFile, path) {
   try {
     const content = readFile(path);
     return { ok: true, content };
   } catch (error) {
     return { ok: false, content: error.message };
   }
 };
const _M0FP311moonbitlang1x2fs16write__file__ffi = function(writeFile, path, content) {
   try {
     writeFile(path, Buffer.from(content));
     return { ok: true, content: "" };
   } catch (error) {
     return { ok: false, content: error.message };
   }
 };
function _M0DTPC16result6ResultGzRP311moonbitlang1x2fs7IOErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGzRP311moonbitlang1x2fs7IOErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGzRP311moonbitlang1x2fs7IOErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGzRP311moonbitlang1x2fs7IOErrorE2Ok.prototype.$tag = 1;
function _M0DTPC15error5Error40moonbitlang_2fx_2ffs_2eIOError_2eIOError(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error40moonbitlang_2fx_2ffs_2eIOError_2eIOError.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRP311moonbitlang1x2fs7IOErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP311moonbitlang1x2fs7IOErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRP311moonbitlang1x2fs7IOErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP311moonbitlang1x2fs7IOErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP311moonbitlang1x2fs7IOErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP311moonbitlang1x2fs7IOErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP311moonbitlang1x2fs7IOErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP311moonbitlang1x2fs7IOErrorE2Ok.prototype.$tag = 1;
const _M0FP511moonbitlang1x3sys8internal3ffi4exit = function(code) {
   process.exit(code);
 };
function _M0TP49puruslang5purus3src5lexer5Lexer(param0, param1, param2, param3, param4) {
  this.chars = param0;
  this.pos = param1;
  this.line = param2;
  this.col = param3;
  this.tokens = param4;
}
function _M0TP49puruslang5purus3src5lexer5Token(param0, param1, param2) {
  this.kind = param0;
  this.line = param1;
  this.col = param2;
}
function _M0TPB8MutLocalGdE(param0) {
  this.val = param0;
}
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Int(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Int.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src5lexer9TokenKind6BigInt(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind6BigInt.prototype.$tag = 1;
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Float(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Float.prototype.$tag = 2;
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Str(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Str.prototype.$tag = 3;
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Regex(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Regex.prototype.$tag = 4;
function _M0DTP49puruslang5purus3src5lexer9TokenKind6True__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6True__.prototype.$tag = 5;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6True____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6True__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7False__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7False__.prototype.$tag = 6;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7False____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7False__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Ident(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Ident.prototype.$tag = 7;
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Const__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Const__.prototype.$tag = 8;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Const____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Const__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Let__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Let__.prototype.$tag = 9;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Let____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Let__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Var__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Var__.prototype.$tag = 10;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Var____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Var__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Be() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Be.prototype.$tag = 11;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Be();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Add() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Add.prototype.$tag = 12;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Add__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Add();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Sub() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Sub.prototype.$tag = 13;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Sub__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Sub();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Mul() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Mul.prototype.$tag = 14;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Mul__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Mul();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Div() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Div.prototype.$tag = 15;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Div__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Div();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4Fdiv() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4Fdiv.prototype.$tag = 16;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4Fdiv__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4Fdiv();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Mod() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Mod.prototype.$tag = 17;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Mod__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Mod();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Neg() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Neg.prototype.$tag = 18;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Neg__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Neg();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Pow() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Pow.prototype.$tag = 19;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Pow__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Pow();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Eq() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Eq.prototype.$tag = 20;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Eq__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Eq();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Neq() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Neq.prototype.$tag = 21;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Neq__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Neq();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Lt() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Lt.prototype.$tag = 22;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Lt__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Lt();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Gt() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Gt.prototype.$tag = 23;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Gt__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Gt();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Le() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Le.prototype.$tag = 24;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Le__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Le();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Ge() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Ge.prototype.$tag = 25;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Ge__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Ge();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3And() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3And.prototype.$tag = 26;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3And__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3And();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Or() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Or.prototype.$tag = 27;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Or__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Or();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Not() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Not.prototype.$tag = 28;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Not__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Not();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4Coal() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4Coal.prototype.$tag = 29;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4Coal__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4Coal();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4Band() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4Band.prototype.$tag = 30;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4Band__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4Band();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Bor() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Bor.prototype.$tag = 31;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Bor__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Bor();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4Bxor() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4Bxor.prototype.$tag = 32;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4Bxor__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4Bxor();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4Bnot() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4Bnot.prototype.$tag = 33;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4Bnot__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4Bnot();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Shl() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Shl.prototype.$tag = 34;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Shl__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Shl();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Shr() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Shr.prototype.$tag = 35;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Shr__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Shr();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4Ushr() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4Ushr.prototype.$tag = 36;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4Ushr__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4Ushr();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Fn.prototype.$tag = 37;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Return__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Return__.prototype.$tag = 38;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Return____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Return__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2To() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2To.prototype.$tag = 39;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2To__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2To();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4If__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4If__.prototype.$tag = 40;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4If____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4If__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4Elif() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4Elif.prototype.$tag = 41;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4Elif__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4Elif();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Else__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Else__.prototype.$tag = 42;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6Else____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6Else__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Unless() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Unless.prototype.$tag = 43;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6Unless__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6Unless();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Then__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Then__.prototype.$tag = 44;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6Then____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6Then__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7While__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7While__.prototype.$tag = 45;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7While____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7While__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Until() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Until.prototype.$tag = 46;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Until__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Until();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4Do__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4Do__.prototype.$tag = 47;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4Do____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4Do__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Yield__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Yield__.prototype.$tag = 48;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Yield____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Yield__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5For__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5For__.prototype.$tag = 49;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5For____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5For__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind4In__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind4In__.prototype.$tag = 50;
const _M0DTP49puruslang5purus3src5lexer9TokenKind4In____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind4In__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Range__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Range__.prototype.$tag = 51;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Range____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Range__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Break__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Break__.prototype.$tag = 52;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Break____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Break__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind10Continue__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind10Continue__.prototype.$tag = 53;
const _M0DTP49puruslang5purus3src5lexer9TokenKind10Continue____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind10Continue__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Match__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Match__.prototype.$tag = 54;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Match____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Match__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6When__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6When__.prototype.$tag = 55;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6When____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6When__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Switch__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Switch__.prototype.$tag = 56;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Switch____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Switch__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Case__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Case__.prototype.$tag = 57;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6Case____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6Case__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Pipe__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Pipe__.prototype.$tag = 58;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6Pipe____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6Pipe__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2As() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2As.prototype.$tag = 59;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2As__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2As();
function _M0DTP49puruslang5purus3src5lexer9TokenKind2Of() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind2Of.prototype.$tag = 60;
const _M0DTP49puruslang5purus3src5lexer9TokenKind2Of__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind2Of();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Gives.prototype.$tag = 61;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Typeof__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Typeof__.prototype.$tag = 62;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Typeof____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Typeof__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Void__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Void__.prototype.$tag = 63;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6Void____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6Void__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind12Instanceof__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind12Instanceof__.prototype.$tag = 64;
const _M0DTP49puruslang5purus3src5lexer9TokenKind12Instanceof____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind12Instanceof__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5New__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5New__.prototype.$tag = 65;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5New____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5New__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Delete__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Delete__.prototype.$tag = 66;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Delete____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Delete__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6This__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6This__.prototype.$tag = 67;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6This____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6This__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Async__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Async__.prototype.$tag = 68;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Async____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Async__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Await__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Await__.prototype.$tag = 69;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Await____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Await__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Try__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Try__.prototype.$tag = 70;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Try____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Try__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Catch__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Catch__.prototype.$tag = 71;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Catch____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Catch__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind9Finally__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind9Finally__.prototype.$tag = 72;
const _M0DTP49puruslang5purus3src5lexer9TokenKind9Finally____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind9Finally__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Throw__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Throw__.prototype.$tag = 73;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Throw____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Throw__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Import__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Import__.prototype.$tag = 74;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Import____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Import__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6From__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6From__.prototype.$tag = 75;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6From____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6From__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Export__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Export__.prototype.$tag = 76;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Export____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Export__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind9Default__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind9Default__.prototype.$tag = 77;
const _M0DTP49puruslang5purus3src5lexer9TokenKind9Default____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind9Default__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind9Require__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind9Require__.prototype.$tag = 78;
const _M0DTP49puruslang5purus3src5lexer9TokenKind9Require____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind9Require__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Use__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Use__.prototype.$tag = 79;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Use____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Use__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Mod__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Mod__.prototype.$tag = 80;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Mod____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Mod__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Public__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Public__.prototype.$tag = 81;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Public____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Public__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5All__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5All__.prototype.$tag = 82;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5All____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5All__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Type__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Type__.prototype.$tag = 83;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6Type____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6Type__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6With__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6With__.prototype.$tag = 84;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6With____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6With__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Class__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Class__.prototype.$tag = 85;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Class____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Class__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind9Extends__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind9Extends__.prototype.$tag = 86;
const _M0DTP49puruslang5purus3src5lexer9TokenKind9Extends____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind9Extends__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Super__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Super__.prototype.$tag = 87;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Super____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Super__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Static__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Static__.prototype.$tag = 88;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Static____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Static__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind9Private__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind9Private__.prototype.$tag = 89;
const _M0DTP49puruslang5purus3src5lexer9TokenKind9Private____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind9Private__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Get__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Get__.prototype.$tag = 90;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Get____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Get__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Set__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Set__.prototype.$tag = 91;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Set____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Set__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Null__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Null__.prototype.$tag = 92;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6Null____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6Null__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Nil__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Nil__.prototype.$tag = 93;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Nil____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Nil__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind11Undefined__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind11Undefined__.prototype.$tag = 94;
const _M0DTP49puruslang5purus3src5lexer9TokenKind11Undefined____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind11Undefined__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Nan__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Nan__.prototype.$tag = 95;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Nan____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Nan__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind10Infinity__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind10Infinity__.prototype.$tag = 96;
const _M0DTP49puruslang5purus3src5lexer9TokenKind10Infinity____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind10Infinity__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6List__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6List__.prototype.$tag = 97;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6List____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6List__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8Object__() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8Object__.prototype.$tag = 98;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8Object____ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8Object__();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket.prototype.$tag = 99;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket();
function _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket.prototype.$tag = 100;
const _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket();
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Comma.prototype.$tag = 101;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma();
function _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon.prototype.$tag = 102;
const _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon();
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Dot() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Dot.prototype.$tag = 103;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Dot__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Dot();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6DotDot() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6DotDot.prototype.$tag = 104;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6DotDot__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6DotDot();
function _M0DTP49puruslang5purus3src5lexer9TokenKind9DotDotDot() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind9DotDotDot.prototype.$tag = 105;
const _M0DTP49puruslang5purus3src5lexer9TokenKind9DotDotDot__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind9DotDotDot();
function _M0DTP49puruslang5purus3src5lexer9TokenKind9Backslash() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind9Backslash.prototype.$tag = 106;
const _M0DTP49puruslang5purus3src5lexer9TokenKind9Backslash__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind9Backslash();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6OptDot() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind6OptDot.prototype.$tag = 107;
const _M0DTP49puruslang5purus3src5lexer9TokenKind6OptDot__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind6OptDot();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Newline() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Newline.prototype.$tag = 108;
const _M0DTP49puruslang5purus3src5lexer9TokenKind7Newline__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind7Newline();
function _M0DTP49puruslang5purus3src5lexer9TokenKind6Indent(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind6Indent.prototype.$tag = 109;
function _M0DTP49puruslang5purus3src5lexer9TokenKind9InterpStr(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind9InterpStr.prototype.$tag = 110;
function _M0DTP49puruslang5purus3src5lexer9TokenKind5Blank() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind5Blank.prototype.$tag = 111;
const _M0DTP49puruslang5purus3src5lexer9TokenKind5Blank__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Blank();
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Shebang(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Shebang.prototype.$tag = 112;
function _M0DTP49puruslang5purus3src5lexer9TokenKind7Comment(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind7Comment.prototype.$tag = 113;
function _M0DTP49puruslang5purus3src5lexer9TokenKind12BlockComment(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src5lexer9TokenKind12BlockComment.prototype.$tag = 114;
function _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof() {}
_M0DTP49puruslang5purus3src5lexer9TokenKind3Eof.prototype.$tag = 115;
const _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof__ = new _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof();
function _M0TPB8MutLocalGRPB13StringBuilderE(param0) {
  this.val = param0;
}
function _M0TPB8MutLocalGbE(param0) {
  this.val = param0;
}
function _M0TP49puruslang5purus3src6parser6Parser(param0, param1, param2) {
  this.tokens = param0;
  this.pos = param1;
  this.errors = param2;
}
function _M0DTP49puruslang5purus3src6parser12MatchPattern6LitPat(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser12MatchPattern6LitPat.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src6parser12MatchPattern7BindPat(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser12MatchPattern7BindPat.prototype.$tag = 1;
function _M0DTP49puruslang5purus3src6parser4Expr6IntLit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr6IntLit.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src6parser4Expr9BigIntLit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr9BigIntLit.prototype.$tag = 1;
function _M0DTP49puruslang5purus3src6parser4Expr8FloatLit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr8FloatLit.prototype.$tag = 2;
function _M0DTP49puruslang5purus3src6parser4Expr6StrLit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr6StrLit.prototype.$tag = 3;
function _M0DTP49puruslang5purus3src6parser4Expr9StrInterp(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr9StrInterp.prototype.$tag = 4;
function _M0DTP49puruslang5purus3src6parser4Expr8RegexLit(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr8RegexLit.prototype.$tag = 5;
function _M0DTP49puruslang5purus3src6parser4Expr7BoolLit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr7BoolLit.prototype.$tag = 6;
function _M0DTP49puruslang5purus3src6parser4Expr7NullLit() {}
_M0DTP49puruslang5purus3src6parser4Expr7NullLit.prototype.$tag = 7;
const _M0DTP49puruslang5purus3src6parser4Expr7NullLit__ = new _M0DTP49puruslang5purus3src6parser4Expr7NullLit();
function _M0DTP49puruslang5purus3src6parser4Expr12UndefinedLit() {}
_M0DTP49puruslang5purus3src6parser4Expr12UndefinedLit.prototype.$tag = 8;
const _M0DTP49puruslang5purus3src6parser4Expr12UndefinedLit__ = new _M0DTP49puruslang5purus3src6parser4Expr12UndefinedLit();
function _M0DTP49puruslang5purus3src6parser4Expr6NanLit() {}
_M0DTP49puruslang5purus3src6parser4Expr6NanLit.prototype.$tag = 9;
const _M0DTP49puruslang5purus3src6parser4Expr6NanLit__ = new _M0DTP49puruslang5purus3src6parser4Expr6NanLit();
function _M0DTP49puruslang5purus3src6parser4Expr11InfinityLit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr11InfinityLit.prototype.$tag = 10;
function _M0DTP49puruslang5purus3src6parser4Expr8ArrayLit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr8ArrayLit.prototype.$tag = 11;
function _M0DTP49puruslang5purus3src6parser4Expr10RangeArray(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Expr10RangeArray.prototype.$tag = 12;
function _M0DTP49puruslang5purus3src6parser4Expr5Slice(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP49puruslang5purus3src6parser4Expr5Slice.prototype.$tag = 13;
function _M0DTP49puruslang5purus3src6parser4Expr9ObjectLit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr9ObjectLit.prototype.$tag = 14;
function _M0DTP49puruslang5purus3src6parser4Expr5Ident(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr5Ident.prototype.$tag = 15;
function _M0DTP49puruslang5purus3src6parser4Expr9DotAccess(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr9DotAccess.prototype.$tag = 16;
function _M0DTP49puruslang5purus3src6parser4Expr11IndexAccess(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr11IndexAccess.prototype.$tag = 17;
function _M0DTP49puruslang5purus3src6parser4Expr5BinOp(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Expr5BinOp.prototype.$tag = 18;
function _M0DTP49puruslang5purus3src6parser4Expr8UnaryNeg(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr8UnaryNeg.prototype.$tag = 19;
function _M0DTP49puruslang5purus3src6parser4Expr8UnaryNot(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr8UnaryNot.prototype.$tag = 20;
function _M0DTP49puruslang5purus3src6parser4Expr9UnaryBnot(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr9UnaryBnot.prototype.$tag = 21;
function _M0DTP49puruslang5purus3src6parser4Expr11UnaryTypeof(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr11UnaryTypeof.prototype.$tag = 22;
function _M0DTP49puruslang5purus3src6parser4Expr9UnaryVoid(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr9UnaryVoid.prototype.$tag = 23;
function _M0DTP49puruslang5purus3src6parser4Expr6AsCast(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr6AsCast.prototype.$tag = 24;
function _M0DTP49puruslang5purus3src6parser4Expr10Instanceof(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr10Instanceof.prototype.$tag = 25;
function _M0DTP49puruslang5purus3src6parser4Expr6FnExpr(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr6FnExpr.prototype.$tag = 26;
function _M0DTP49puruslang5purus3src6parser4Expr8FnExprTo(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr8FnExprTo.prototype.$tag = 27;
function _M0DTP49puruslang5purus3src6parser4Expr4Call(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr4Call.prototype.$tag = 28;
function _M0DTP49puruslang5purus3src6parser4Expr10MethodCall(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Expr10MethodCall.prototype.$tag = 29;
function _M0DTP49puruslang5purus3src6parser4Expr7NewExpr(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr7NewExpr.prototype.$tag = 30;
function _M0DTP49puruslang5purus3src6parser4Expr4Pipe(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr4Pipe.prototype.$tag = 31;
function _M0DTP49puruslang5purus3src6parser4Expr6IfExpr(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Expr6IfExpr.prototype.$tag = 32;
function _M0DTP49puruslang5purus3src6parser4Expr7TryExpr(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Expr7TryExpr.prototype.$tag = 33;
function _M0DTP49puruslang5purus3src6parser4Expr9MatchExpr(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr9MatchExpr.prototype.$tag = 34;
function _M0DTP49puruslang5purus3src6parser4Expr9AwaitExpr(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr9AwaitExpr.prototype.$tag = 35;
function _M0DTP49puruslang5purus3src6parser4Expr10DeleteExpr(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr10DeleteExpr.prototype.$tag = 36;
function _M0DTP49puruslang5purus3src6parser4Expr8ThisExpr() {}
_M0DTP49puruslang5purus3src6parser4Expr8ThisExpr.prototype.$tag = 37;
const _M0DTP49puruslang5purus3src6parser4Expr8ThisExpr__ = new _M0DTP49puruslang5purus3src6parser4Expr8ThisExpr();
function _M0DTP49puruslang5purus3src6parser4Expr9SuperExpr() {}
_M0DTP49puruslang5purus3src6parser4Expr9SuperExpr.prototype.$tag = 38;
const _M0DTP49puruslang5purus3src6parser4Expr9SuperExpr__ = new _M0DTP49puruslang5purus3src6parser4Expr9SuperExpr();
function _M0DTP49puruslang5purus3src6parser4Expr12OptDotAccess(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr12OptDotAccess.prototype.$tag = 39;
function _M0DTP49puruslang5purus3src6parser4Expr13OptMethodCall(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Expr13OptMethodCall.prototype.$tag = 40;
function _M0DTP49puruslang5purus3src6parser4Expr14ComputedAccess(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr14ComputedAccess.prototype.$tag = 41;
function _M0DTP49puruslang5purus3src6parser4Expr11AsyncFnExpr(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr11AsyncFnExpr.prototype.$tag = 42;
function _M0DTP49puruslang5purus3src6parser4Expr13AsyncFnExprTo(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Expr13AsyncFnExprTo.prototype.$tag = 43;
function _M0DTP49puruslang5purus3src6parser4Expr9YieldExpr(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr9YieldExpr.prototype.$tag = 44;
function _M0DTP49puruslang5purus3src6parser4Expr7PostInc(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr7PostInc.prototype.$tag = 45;
function _M0DTP49puruslang5purus3src6parser4Expr7PostDec(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr7PostDec.prototype.$tag = 46;
function _M0DTP49puruslang5purus3src6parser4Expr6PreInc(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr6PreInc.prototype.$tag = 47;
function _M0DTP49puruslang5purus3src6parser4Expr6PreDec(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Expr6PreDec.prototype.$tag = 48;
function _M0DTP49puruslang5purus3src6parser4Stmt7VarDecl(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Stmt7VarDecl.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src6parser4Stmt12DestructDecl(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Stmt12DestructDecl.prototype.$tag = 1;
function _M0DTP49puruslang5purus3src6parser4Stmt15ObjDestructDecl(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Stmt15ObjDestructDecl.prototype.$tag = 2;
function _M0DTP49puruslang5purus3src6parser4Stmt13DottedVarInit(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP49puruslang5purus3src6parser4Stmt13DottedVarInit.prototype.$tag = 3;
function _M0DTP49puruslang5purus3src6parser4Stmt6Assign(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt6Assign.prototype.$tag = 4;
function _M0DTP49puruslang5purus3src6parser4Stmt14CompoundAssign(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Stmt14CompoundAssign.prototype.$tag = 5;
function _M0DTP49puruslang5purus3src6parser4Stmt6FnDecl(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt6FnDecl.prototype.$tag = 6;
function _M0DTP49puruslang5purus3src6parser4Stmt2If(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP49puruslang5purus3src6parser4Stmt2If.prototype.$tag = 7;
function _M0DTP49puruslang5purus3src6parser4Stmt6Unless(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt6Unless.prototype.$tag = 8;
function _M0DTP49puruslang5purus3src6parser4Stmt5While(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt5While.prototype.$tag = 9;
function _M0DTP49puruslang5purus3src6parser4Stmt5Until(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt5Until.prototype.$tag = 10;
function _M0DTP49puruslang5purus3src6parser4Stmt7DoWhile(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt7DoWhile.prototype.$tag = 11;
function _M0DTP49puruslang5purus3src6parser4Stmt5ForIn(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP49puruslang5purus3src6parser4Stmt5ForIn.prototype.$tag = 12;
function _M0DTP49puruslang5purus3src6parser4Stmt8ForRange(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP49puruslang5purus3src6parser4Stmt8ForRange.prototype.$tag = 13;
function _M0DTP49puruslang5purus3src6parser4Stmt10ForClassic(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP49puruslang5purus3src6parser4Stmt10ForClassic.prototype.$tag = 14;
function _M0DTP49puruslang5purus3src6parser4Stmt9MatchStmt(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt9MatchStmt.prototype.$tag = 15;
function _M0DTP49puruslang5purus3src6parser4Stmt9PostfixIf(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt9PostfixIf.prototype.$tag = 16;
function _M0DTP49puruslang5purus3src6parser4Stmt13PostfixUnless(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt13PostfixUnless.prototype.$tag = 17;
function _M0DTP49puruslang5purus3src6parser4Stmt10PostfixFor(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser4Stmt10PostfixFor.prototype.$tag = 18;
function _M0DTP49puruslang5purus3src6parser4Stmt8TryCatch(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP49puruslang5purus3src6parser4Stmt8TryCatch.prototype.$tag = 19;
function _M0DTP49puruslang5purus3src6parser4Stmt5Throw(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt5Throw.prototype.$tag = 20;
function _M0DTP49puruslang5purus3src6parser4Stmt6Return(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt6Return.prototype.$tag = 21;
function _M0DTP49puruslang5purus3src6parser4Stmt5Break() {}
_M0DTP49puruslang5purus3src6parser4Stmt5Break.prototype.$tag = 22;
const _M0DTP49puruslang5purus3src6parser4Stmt5Break__ = new _M0DTP49puruslang5purus3src6parser4Stmt5Break();
function _M0DTP49puruslang5purus3src6parser4Stmt8Continue() {}
_M0DTP49puruslang5purus3src6parser4Stmt8Continue.prototype.$tag = 23;
const _M0DTP49puruslang5purus3src6parser4Stmt8Continue__ = new _M0DTP49puruslang5purus3src6parser4Stmt8Continue();
function _M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt.prototype.$tag = 24;
function _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl.prototype.$tag = 25;
function _M0DTP49puruslang5purus3src6parser4Stmt9UseStdlib(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt9UseStdlib.prototype.$tag = 26;
function _M0DTP49puruslang5purus3src6parser4Stmt7ModDecl(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt7ModDecl.prototype.$tag = 27;
function _M0DTP49puruslang5purus3src6parser4Stmt13ExportDefault(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt13ExportDefault.prototype.$tag = 28;
function _M0DTP49puruslang5purus3src6parser4Stmt10PublicDecl(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt10PublicDecl.prototype.$tag = 29;
function _M0DTP49puruslang5purus3src6parser4Stmt8TypeDecl(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser4Stmt8TypeDecl.prototype.$tag = 30;
function _M0DTP49puruslang5purus3src6parser4Stmt9ClassDecl(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt9ClassDecl.prototype.$tag = 31;
function _M0DTP49puruslang5purus3src6parser4Stmt10DeleteStmt(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser4Stmt10DeleteStmt.prototype.$tag = 32;
function _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(param0) {
  this.val = param0;
}
function _M0DTP49puruslang5purus3src6parser7StrPart3Lit(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser7StrPart3Lit.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src6parser7StrPart6Interp(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser7StrPart6Interp.prototype.$tag = 1;
function _M0TP49puruslang5purus3src6parser9ClassDecl(param0, param1, param2) {
  this.name = param0;
  this.parent = param1;
  this.members = param2;
}
function _M0DTP49puruslang5purus3src6parser11ClassMember5Field(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser11ClassMember5Field.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src6parser11ClassMember11Constructor(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser11ClassMember11Constructor.prototype.$tag = 1;
function _M0DTP49puruslang5purus3src6parser11ClassMember6Method(param0, param1, param2, param3, param4) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
  this._4 = param4;
}
_M0DTP49puruslang5purus3src6parser11ClassMember6Method.prototype.$tag = 2;
function _M0DTP49puruslang5purus3src6parser11ClassMember6Getter(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser11ClassMember6Getter.prototype.$tag = 3;
function _M0DTP49puruslang5purus3src6parser11ClassMember6Setter(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP49puruslang5purus3src6parser11ClassMember6Setter.prototype.$tag = 4;
function _M0DTP49puruslang5purus3src6parser6FnBody5Block(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser6FnBody5Block.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src6parser6FnBody6ToExpr(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser6FnBody6ToExpr.prototype.$tag = 1;
function _M0DTP49puruslang5purus3src6parser6FnBody12ToReturnExpr(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser6FnBody12ToReturnExpr.prototype.$tag = 2;
function _M0TP49puruslang5purus3src6parser6FnDecl(param0, param1, param2, param3, param4) {
  this.name = param0;
  this.params = param1;
  this.body = param2;
  this.is_async = param3;
  this.is_generator = param4;
}
function _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(param0, param1, param2, param3, param4) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
  this._4 = param4;
}
_M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src6parser10ImportDecl10CjsRequire(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser10ImportDecl10CjsRequire.prototype.$tag = 1;
function _M0DTP49puruslang5purus3src6parser10ImportDecl9DynImport(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser10ImportDecl9DynImport.prototype.$tag = 2;
function _M0DTP49puruslang5purus3src6parser10ImportDecl16SideEffectImport(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP49puruslang5purus3src6parser10ImportDecl16SideEffectImport.prototype.$tag = 3;
function _M0DTPC16option6OptionGRPB5ArrayGsEE4None() {}
_M0DTPC16option6OptionGRPB5ArrayGsEE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRPB5ArrayGsEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGsEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGsEE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRPB5ArrayGsEE4Some.prototype.$tag = 1;
function _M0DTPC16option6OptionGRPB5ArrayGUsRP49puruslang5purus3src6parser4ExprEEE4None() {}
_M0DTPC16option6OptionGRPB5ArrayGUsRP49puruslang5purus3src6parser4ExprEEE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRPB5ArrayGUsRP49puruslang5purus3src6parser4ExprEEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGUsRP49puruslang5purus3src6parser4ExprEEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGUsRP49puruslang5purus3src6parser4ExprEEE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRPB5ArrayGUsRP49puruslang5purus3src6parser4ExprEEE4Some.prototype.$tag = 1;
function _M0TPB8MutLocalGORPB5ArrayGRP49puruslang5purus3src6parser4StmtEE(param0) {
  this.val = param0;
}
function _M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4None() {}
_M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4Some.prototype.$tag = 1;
function _M0TP49puruslang5purus3src6parser10ElIfBranch(param0, param1) {
  this.cond = param0;
  this.body = param1;
}
function _M0DTP49puruslang5purus3src6parser9MatchBody8ExprBody(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser9MatchBody8ExprBody.prototype.$tag = 0;
function _M0DTP49puruslang5purus3src6parser9MatchBody9BlockBody(param0) {
  this._0 = param0;
}
_M0DTP49puruslang5purus3src6parser9MatchBody9BlockBody.prototype.$tag = 1;
function _M0TP49puruslang5purus3src6parser8MatchArm(param0, param1, param2) {
  this.pattern = param0;
  this.cond = param1;
  this.body = param2;
}
function _M0TPB8MutLocalGOsE(param0) {
  this.val = param0;
}
function _M0TPB8MutLocalGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE(param0) {
  this.val = param0;
}
function _M0TP49puruslang5purus3src7codegen9JsCodegen(param0, param1, param2, param3, param4) {
  this.buf = param0;
  this.indent_level = param1;
  this.private_fields = param2;
  this.declared_vars = param3;
  this.cjs = param4;
}
function _M0TPB8MutLocalGsE(param0) {
  this.val = param0;
}
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
const _M0MPB4Iter4nextN6constrS143GsE = 0;
const _M0MPB4Iter4nextN6constrS144GsE = 0;
const _M0MPB4Iter3newN6constrS153GsE = 0;
const _M0MPC16string10StringView4findN6constrS313 = 0;
const _M0FPC15debug14print__contentN7_2abindS989 = "\n";
const _M0MPC16string6String4trimN7_2abindS478 = "\t\n\r ";
const _M0FPC15debug15compact__middleN7_2abindS868 = "";
const _M0FPC15debug15compact__middleN7_2abindS869 = " ";
const _M0FPC15debug15compact__middleN7_2abindS870 = ",";
const _M0FPC15debug14compact__linesN7_2abindS881 = " ";
const _M0FPC15debug14compact__linesN7_2abindS882 = " ";
const _M0FPC15debug14compact__linesN7_2abindS883 = "";
const _M0FPC15debug14compact__linesN7_2abindS884 = "(";
const _M0FPC15debug14compact__linesN7_2abindS885 = " ";
const _M0FPC15debug19bracket__seq__linesN7_2abindS911 = "";
const _M0FPC15debug6renderN6constrS1100 = 16;
function _M0FPC15abort5abortGRPC16string10StringViewE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGOiE(msg) {
  return $panic();
}
function _M0FPB13clamp__offset(offset, len) {
  return offset < 0 ? 0 : offset > len ? len : offset;
}
function _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGsEE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    while (true) {
      const i = _tmp;
      if (i >= 0) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGyEE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    while (true) {
      const i = _tmp;
      if (i >= 0) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPB18UninitializedArray12unsafe__blitGsE(dst, dst_offset, src, src_offset, len) {
  _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGsEE(dst, dst_offset, src, src_offset, len);
}
function _M0MPB18UninitializedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, len) {
  _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGyEE(dst, dst_offset, src, src_offset, len);
}
function _M0MPB18UninitializedArray23unsafe__make__and__blitGyE(src, allocate_len, src_offset, dst_offset, blit_len) {
  const dst = new Uint8Array(allocate_len);
  _M0MPB18UninitializedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, blit_len);
  return dst;
}
function _M0MPB13StringBuilder13write__objectGsE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGsE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(self, obj) {
  _M0IPC16string10StringViewPB4Show6output(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC13int3Int16unsafe__to__char(self) {
  return self;
}
function _M0MPC14byte4Byte8to__char(self) {
  return self;
}
function _M0MPB13StringBuilder21StringBuilder_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0MPB13StringBuilder10to__string(self) {
  return self.val;
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return self >= 55296 && self <= 56319;
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return self >= 56320 && self <= 57343;
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPC16uint166UInt1616unsafe__to__char(self) {
  return self;
}
function _M0MPC16string6String16unsafe__char__at(self, index) {
  const c1 = self.charCodeAt(index);
  if (_M0MPC16uint166UInt1622is__leading__surrogate(c1)) {
    const c2 = self.charCodeAt(index + 1 | 0);
    return _M0FPB32code__point__of__surrogate__pair(c1, c2);
  } else {
    return _M0MPC16uint166UInt1616unsafe__to__char(c1);
  }
}
function _M0IPC14byte4BytePB3Add3add(self, that) {
  return (self + that | 0) & 255;
}
function _M0IPC14byte4BytePB3Div3div(self, that) {
  if (that === 0) {
    $panic();
  }
  return (self / that | 0) & 255;
}
function _M0IPC14byte4BytePB3Mod3mod(self, that) {
  if (that === 0) {
    $panic();
  }
  return (self % that | 0) & 255;
}
function _M0IPC14byte4BytePB3Sub3sub(self, that) {
  return (self - that | 0) & 255;
}
function _M0MPC14byte4Byte7to__hexN14to__hex__digitS71(i) {
  return i < 10 ? _M0MPC14byte4Byte8to__char(_M0IPC14byte4BytePB3Add3add(i, 48)) : _M0MPC14byte4Byte8to__char(_M0IPC14byte4BytePB3Sub3sub(_M0IPC14byte4BytePB3Add3add(i, 97), 10));
}
function _M0MPC14byte4Byte7to__hex(b) {
  const _self = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS71(_M0IPC14byte4BytePB3Div3div(b, 16)));
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS71(_M0IPC14byte4BytePB3Mod3mod(b, 16)));
  return _M0MPB13StringBuilder10to__string(_self);
}
function _M0MPC16string10StringView21clamped__view_2einner(self, start, end) {
  const len = self.end - self.start | 0;
  let lo = start < 0 ? 0 : start > len ? len : start;
  let hi;
  if (end === undefined) {
    hi = len;
  } else {
    const _Some = end;
    const _e = _Some;
    hi = _e < 0 ? 0 : _e > len ? len : _e;
  }
  const str = self.str;
  const base = self.start;
  if (lo > 0 && (lo < len && (_M0MPC16uint166UInt1623is__trailing__surrogate(str.charCodeAt(base + lo | 0)) && _M0MPC16uint166UInt1622is__leading__surrogate(str.charCodeAt((base + lo | 0) - 1 | 0))))) {
    lo = lo + 1 | 0;
  }
  if (hi > 0 && (hi < len && (_M0MPC16uint166UInt1623is__trailing__surrogate(str.charCodeAt(base + hi | 0)) && _M0MPC16uint166UInt1622is__leading__surrogate(str.charCodeAt((base + hi | 0) - 1 | 0))))) {
    hi = hi - 1 | 0;
  }
  return lo >= hi ? new _M0TPC16string10StringView(str, base + lo | 0, base + lo | 0) : new _M0TPC16string10StringView(str, base + lo | 0, base + hi | 0);
}
function _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS85(_env, seg, i) {
  const logger = _env._1;
  const self = _env._0;
  if (i > seg) {
    logger.method_table.method_2(logger.self, _M0MPC16string10StringView21clamped__view_2einner(self, seg, i));
    return;
  } else {
    return;
  }
}
function _M0MPC16string10StringView18escape__to_2einner(self, logger, quote) {
  if (quote) {
    logger.method_table.method_3(logger.self, 34);
  }
  const len = self.end - self.start | 0;
  const _env = { _0: self, _1: logger };
  let _tmp = 0;
  let _tmp$2 = 0;
  _L: while (true) {
    const i = _tmp;
    const seg = _tmp$2;
    if (i >= len) {
      _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS85(_env, seg, i);
      break;
    }
    const code = self.str.charCodeAt(self.start + i | 0);
    let c;
    _L$2: {
      switch (code) {
        case 34: {
          c = code;
          break _L$2;
        }
        case 92: {
          c = code;
          break _L$2;
        }
        case 10: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS85(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\n");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 13: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS85(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\r");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 8: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS85(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\b");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 9: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS85(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\t");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        default: {
          if (code < 32) {
            _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS85(_env, seg, i);
            logger.method_table.method_0(logger.self, "\\u{");
            logger.method_table.method_0(logger.self, _M0MPC14byte4Byte7to__hex(code & 255));
            logger.method_table.method_0(logger.self, "}");
            _tmp = i + 1 | 0;
            _tmp$2 = i + 1 | 0;
            continue _L;
          } else {
            _tmp = i + 1 | 0;
            continue _L;
          }
        }
      }
    }
    _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS85(_env, seg, i);
    logger.method_table.method_3(logger.self, 92);
    logger.method_table.method_3(logger.self, _M0MPC16uint166UInt1616unsafe__to__char(c));
    _tmp = i + 1 | 0;
    _tmp$2 = i + 1 | 0;
    continue;
  }
  if (quote) {
    logger.method_table.method_3(logger.self, 34);
    return;
  } else {
    return;
  }
}
function _M0MPC16string6String14escape_2einner(self, quote) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0MPC16string10StringView18escape__to_2einner(new _M0TPC16string10StringView(self, 0, self.length), { self: buf, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger }, quote);
  return _M0MPB13StringBuilder10to__string(buf);
}
function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0) : _M0FPC15abort5abortGRPC16string10StringViewE("Invalid index for View");
}
function _M0IPC16uint166UInt16PB2Eq5equal(self, that) {
  return self === that;
}
function _M0IPC16uint166UInt16PB2Eq10not__equal(self, that) {
  return self !== that;
}
function _M0MPC16uint166UInt168to__uint(self) {
  return self;
}
function _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(x, y) {
  return !_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB2Eq10not__equalGsE(x, y) {
  return !(x === y);
}
function _M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(x, y) {
  return !_M0IPC16string10StringViewPB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC16string6String21clamped__view_2einner(self, start, end) {
  const len = self.length;
  let lo = start < 0 ? 0 : start > len ? len : start;
  let hi;
  if (end === undefined) {
    hi = len;
  } else {
    const _Some = end;
    const _e = _Some;
    hi = _e < 0 ? 0 : _e > len ? len : _e;
  }
  if (lo > 0 && (lo < len && (_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(lo)) && _M0MPC16uint166UInt1622is__leading__surrogate(self.charCodeAt(lo - 1 | 0))))) {
    lo = lo + 1 | 0;
  }
  if (hi > 0 && (hi < len && (_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(hi)) && _M0MPC16uint166UInt1622is__leading__surrogate(self.charCodeAt(hi - 1 | 0))))) {
    hi = hi - 1 | 0;
  }
  return lo >= hi ? new _M0TPC16string10StringView(self, lo, lo) : new _M0TPC16string10StringView(self, lo, hi);
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String21clamped__view_2einner(value, start, start + len | 0));
}
function _M0MPC16string10StringView4data(self) {
  return self.str;
}
function _M0MPC16string10StringView13start__offset(self) {
  return self.start;
}
function _M0IP016_24default__implPB4Show6outputGsE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC16string6StringPB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show10to__stringGRP49puruslang5purus3src5lexer9TokenKindE(self) {
  const logger = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IP49puruslang5purus3src5lexer9TokenKindPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return _M0MPB13StringBuilder10to__string(logger);
}
function _M0MPB4Iter4nextGsE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === undefined) {
    self.size_hint = _M0MPB4Iter4nextN6constrS144GsE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS143GsE;
    }
  }
  return result;
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0MPB4Iter3newGsE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS153GsE;
  }
  return new _M0TPB4IterGsE(f, size_hint$2);
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0IPC16string10StringViewPB4Show6output(self, logger) {
  logger.method_table.method_2(logger.self, self);
}
function _M0MPC16string10StringView3all(self, f) {
  const _bind = self.str;
  const _bind$2 = self.start;
  const _bind$3 = self.end;
  let _tmp = _bind$2;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = _bind.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = _bind.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$4);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$4);
          break _L;
        }
      }
      if (!f(_decoded_char)) {
        return false;
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0MPC16string6String20unsafe__range__equal(self, self_off, other, other_off, len) {
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(self.charCodeAt(self_off + i | 0), other.charCodeAt(other_off + i | 0))) {
      } else {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0IPC16string10StringViewPB2Eq5equal(self, other) {
  const len = self.end - self.start | 0;
  if (len === (other.end - other.start | 0)) {
    if (self.str === other.str && self.start === other.start) {
      return true;
    }
    return _M0MPC16string6String20unsafe__range__equal(self.str, self.start, other.str, other.start, len);
  } else {
    return false;
  }
}
function _M0MPC16string6String11from__array(chars) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(Math.imul(chars.end - chars.start | 0, 4) | 0);
  const _bind = chars.end - chars.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const c = chars.buf[chars.start + _ | 0];
      _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPB13StringBuilder10to__string(buf);
}
function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
  let _tmp = end_offset;
  let _tmp$2 = 0;
  while (true) {
    const utf16_offset = _tmp;
    const char_count = _tmp$2;
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const c = self.charCodeAt(utf16_offset - 1 | 0);
      if (_M0MPC16uint166UInt1623is__trailing__surrogate(c)) {
        _tmp = utf16_offset - 2 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      } else {
        _tmp = utf16_offset - 1 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      }
    } else {
      return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
    }
  }
}
function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let _tmp = start_offset;
    let _tmp$2 = 0;
    while (true) {
      const utf16_offset = _tmp;
      const char_count = _tmp$2;
      if (utf16_offset < end_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset);
        if (_M0MPC16uint166UInt1622is__leading__surrogate(c)) {
          _tmp = utf16_offset + 2 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        } else {
          _tmp = utf16_offset + 1 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        }
      } else {
        return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
      }
    }
  } else {
    return _M0FPC15abort5abortGOiE("Invalid start index");
  }
}
function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start_offset, end_offset$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start_offset, end_offset$2);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
}
function _M0FPB19kmp__failure__table(pattern) {
  const m = pattern.end - pattern.start | 0;
  const table = $make_array_len_and_init(m, 0);
  let k = 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < m) {
      const c = pattern.str.charCodeAt(pattern.start + i | 0);
      while (true) {
        if (k > 0 && _M0IPC16uint166UInt16PB2Eq10not__equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
          const _tmp$2 = k - 1 | 0;
          k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
          continue;
        } else {
          break;
        }
      }
      if (_M0IPC16uint166UInt16PB2Eq5equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
        k = k + 1 | 0;
      }
      if (i >>> 0 < table.length) {
        table[i] = k;
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return table;
}
function _M0FPB24find__pattern__kmp__from(target, pattern, start) {
  const n = target.end - target.start | 0;
  const m = pattern.end - pattern.start | 0;
  const table = _M0FPB19kmp__failure__table(pattern);
  let k = 0;
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < n) {
      const c = target.str.charCodeAt(target.start + i | 0);
      while (true) {
        if (k > 0 && _M0IPC16uint166UInt16PB2Eq10not__equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
          const _tmp$2 = k - 1 | 0;
          k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
          continue;
        } else {
          break;
        }
      }
      if (_M0IPC16uint166UInt16PB2Eq5equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
        k = k + 1 | 0;
      }
      if (k === m) {
        return (i - m | 0) + 1 | 0;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0FPB36find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < candidate_end) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos), first) && _M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos + last_offset | 0), last)) {
        return pos;
      }
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB42find__two__anchor__candidate__from__string(data, start, candidate_end, first, last_offset, last) {
  return _M0FPB36find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last);
}
function _M0FPB21string__ranges__equal(left, left_start, right, right_start, length) {
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < length) {
      if (_M0IPC16uint166UInt16PB2Eq10not__equal(left.charCodeAt(left_start + i | 0), right.charCodeAt(right_start + i | 0))) {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0FPB29two__anchor__should__fallback(failures, scanned) {
  if (failures > 64) {
    return true;
  } else {
    if (8 === 0) {
      $panic();
    }
    return failures > (4 + (scanned / 8 | 0) | 0);
  }
}
function _M0FPB22find__by__two__anchors(target, pattern) {
  const target_len = target.end - target.start | 0;
  const pattern_len = pattern.end - pattern.start | 0;
  const target_start = _M0MPC16string10StringView13start__offset(target);
  const pattern_start = _M0MPC16string10StringView13start__offset(pattern);
  const last_offset = pattern_len - 1 | 0;
  const candidate_end = ((target_start + target_len | 0) - pattern_len | 0) + 1 | 0;
  const first = pattern.str.charCodeAt(pattern.start);
  const last = pattern.str.charCodeAt(pattern.start + last_offset | 0);
  const middle_len = last_offset - 1 | 0;
  let _tmp = target_start;
  let _tmp$2 = 0;
  while (true) {
    const pos = _tmp;
    const failures = _tmp$2;
    if (pos < candidate_end) {
      const found = _M0FPB42find__two__anchor__candidate__from__string(_M0MPC16string10StringView4data(target), pos, candidate_end, first, last_offset, last);
      if (found < 0) {
        return undefined;
      }
      if (_M0FPB21string__ranges__equal(_M0MPC16string10StringView4data(target), found + 1 | 0, _M0MPC16string10StringView4data(pattern), pattern_start + 1 | 0, middle_len)) {
        return found - target_start | 0;
      }
      const failures$2 = failures + 1 | 0;
      const scanned = found - target_start | 0;
      if (_M0FPB29two__anchor__should__fallback(failures$2, scanned)) {
        return _M0FPB24find__pattern__kmp__from(target, pattern, scanned + 1 | 0);
      }
      _tmp = found + 1 | 0;
      _tmp$2 = failures$2;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB24find__code__unit__scalar(data, start, end, code) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < end) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos), code)) {
        return pos;
      }
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB30find__code__unit__from__string(data, start, end, code) {
  return _M0FPB24find__code__unit__scalar(data, start, end, code);
}
function _M0FPB28find__code__unit__from__view(target, start, end, code) {
  const target_start = _M0MPC16string10StringView13start__offset(target);
  const found = _M0FPB30find__code__unit__from__string(_M0MPC16string10StringView4data(target), target_start + start | 0, target_start + end | 0, code);
  return found < 0 ? -1 : found - target_start | 0;
}
function _M0MPC16string10StringView4find(self, str) {
  const pattern_len = str.end - str.start | 0;
  switch (pattern_len) {
    case 0: {
      return _M0MPC16string10StringView4findN6constrS313;
    }
    case 1: {
      const found = _M0FPB28find__code__unit__from__view(self, 0, self.end - self.start | 0, str.str.charCodeAt(str.start));
      return found < 0 ? undefined : found;
    }
    default: {
      return pattern_len > (self.end - self.start | 0) ? undefined : _M0FPB22find__by__two__anchors(self, str);
    }
  }
}
function _M0MPC16string6String4find(self, str) {
  return _M0MPC16string10StringView4find(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0IPC16string6StringPB4Show10to__string(self) {
  return self;
}
function _M0MPC16string6String6repeat(self, n) {
  if (n < 0) {
    return _M0FPC15abort5abortGRPC16string10StringViewE("negative repeat count");
  } else {
    if (n === 0) {
      return "";
    } else {
      if (n === 1) {
        return self;
      } else {
        const len = self.length;
        const total = Math.imul(len, n) | 0;
        let _tmp;
        if (len === 0) {
          _tmp = true;
        } else {
          if (n === 0) {
            $panic();
          }
          _tmp = (total / n | 0) === len;
        }
        if (_tmp) {
          const buf = _M0MPB13StringBuilder21StringBuilder_2einner(total);
          const str = _M0IPC16string6StringPB4Show10to__string(self);
          let _tmp$2 = 0;
          while (true) {
            const _ = _tmp$2;
            if (_ < n) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, str);
              _tmp$2 = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return _M0MPB13StringBuilder10to__string(buf);
        } else {
          return _M0FPC15abort5abortGRPC16string10StringViewE("repeat result too large");
        }
      }
    }
  }
}
function _M0MPC16string10StringView11has__suffix(self, str) {
  const self_len = self.end - self.start | 0;
  const str_len = str.end - str.start | 0;
  if (str_len <= self_len) {
    const start = self_len - str_len | 0;
    return str_len === 0 || _M0IPC16uint166UInt16PB2Eq5equal(self.str.charCodeAt(self.start + start | 0), str.str.charCodeAt(str.start)) ? _M0MPC16string6String20unsafe__range__equal(self.str, self.start + start | 0, str.str, str.start, str_len) : false;
  } else {
    return false;
  }
}
function _M0MPC16string6String11has__suffix(self, str) {
  return _M0MPC16string10StringView11has__suffix(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0MPC16string10StringView13strip__suffix(self, suffix) {
  const self_len = self.end - self.start | 0;
  const suffix_len = suffix.end - suffix.start | 0;
  return self_len >= suffix_len && _M0IPC16string10StringViewPB2Eq5equal(_M0MPC16string10StringView12view_2einner(self, self_len - suffix_len | 0, undefined), suffix) ? _M0MPC16string10StringView12view_2einner(self, 0, self_len - suffix_len | 0) : undefined;
}
function _M0MPC16string6String13strip__suffix(self, suffix) {
  return _M0MPC16string10StringView13strip__suffix(new _M0TPC16string10StringView(self, 0, self.length), suffix);
}
function _M0MPC16string10StringView13strip__prefix(self, prefix) {
  const prefix_len = prefix.end - prefix.start | 0;
  return (self.end - self.start | 0) >= prefix_len && _M0IPC16string10StringViewPB2Eq5equal(_M0MPC16string10StringView12view_2einner(self, 0, prefix_len), prefix) ? _M0MPC16string10StringView12view_2einner(self, prefix_len, undefined) : undefined;
}
function _M0MPC15array5Array13Array_2einnerGcE(capacity) {
  return [];
}
function _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGcE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGyE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0FPB36string__contains__code__unit__scalar(str, start, end, code) {
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < end) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(str.charCodeAt(i), code)) {
        return true;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FPB28string__contains__code__unit(str, start, end, code) {
  return _M0FPB36string__contains__code__unit__scalar(str, start, end, code);
}
function _M0MPC16string10StringView20contains__code__unit(self, code) {
  return _M0FPB28string__contains__code__unit(self.str, self.start, self.end, code);
}
function _M0MPC14char4Char8to__uint(self) {
  return self;
}
function _M0FPB23build__ascii__char__set(chars) {
  let bits0 = 0;
  let bits1 = 0;
  let bits2 = 0;
  let bits3 = 0;
  const _bind = chars.str;
  const _bind$2 = chars.start;
  const _bind$3 = chars.end;
  let _tmp = _bind$2;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = _bind.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = _bind.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$4);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$4);
          break _L;
        }
      }
      const code = _M0MPC14char4Char8to__uint(_decoded_char);
      if (code >>> 0 < 128 >>> 0) {
        const bit = 1 << (code & 31);
        const _bind$4 = code >>> 5 | 0;
        switch (_bind$4) {
          case 0: {
            bits0 = bits0 | bit;
            break;
          }
          case 1: {
            bits1 = bits1 | bit;
            break;
          }
          case 2: {
            bits2 = bits2 | bit;
            break;
          }
          default: {
            bits3 = bits3 | bit;
          }
        }
      } else {
        return undefined;
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return { _0: bits0, _1: bits1, _2: bits2, _3: bits3 };
}
function _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, code) {
  if (code >>> 0 < 128 >>> 0) {
    const bit = 1 << (code & 31);
    const _bind = code >>> 5 | 0;
    switch (_bind) {
      case 0: {
        return (bits0 & bit) !== 0;
      }
      case 1: {
        return (bits1 & bit) !== 0;
      }
      case 2: {
        return (bits2 & bit) !== 0;
      }
      default: {
        return (bits3 & bit) !== 0;
      }
    }
  } else {
    return false;
  }
}
function _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < end && _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _M0MPC16uint166UInt168to__uint(str.charCodeAt(pos)))) {
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return pos;
    }
  }
}
function _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
  let _tmp = end;
  while (true) {
    const pos = _tmp;
    if (pos > start && _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _M0MPC16uint166UInt168to__uint(str.charCodeAt(pos - 1 | 0)))) {
      _tmp = pos - 1 | 0;
      continue;
    } else {
      return pos;
    }
  }
}
function _M0FPB26string__trim__start__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
}
function _M0FPB24string__trim__end__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
}
function _M0MPC16string10StringView14contains__char(self, c) {
  const len = self.end - self.start | 0;
  if (len > 0) {
    const c$2 = c;
    if (c$2 >= 0 && c$2 <= 65535) {
      return _M0MPC16string10StringView20contains__code__unit(self, c$2 & 65535);
    } else {
      if (c$2 < 0) {
        return false;
      } else {
        if (len >= 2) {
          const adj = c$2 - 65536 | 0;
          const high = 55296 + (adj >> 10) | 0;
          if (high <= 65535) {
            const high$2 = high & 65535;
            const low = (56320 + (adj & 1023) | 0) & 65535;
            let _tmp = 0;
            while (true) {
              const i = _tmp;
              if (i < (len - 1 | 0)) {
                if (_M0IPC16uint166UInt16PB2Eq5equal(self.str.charCodeAt(self.start + i | 0), high$2)) {
                  if (_M0IPC16uint166UInt16PB2Eq5equal(self.str.charCodeAt(self.start + (i + 1 | 0) | 0), low)) {
                    return true;
                  }
                  _tmp = i + 2 | 0;
                  continue;
                }
                _tmp = i + 1 | 0;
                continue;
              } else {
                break;
              }
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return false;
  } else {
    return false;
  }
}
function _M0MPC16string10StringView24trim__start__with__chars(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 0, x.start, x.end));
      const _tmp$2 = x.str;
      const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 1, x.start, x.end);
      let _tmp$3;
      if (_bind === undefined) {
        _tmp$3 = x.end;
      } else {
        const _Some = _bind;
        _tmp$3 = _Some;
      }
      const _x = new _M0TPC16string10StringView(_tmp$2, _tmp$3, x.end);
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView22trim__end__with__chars(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      const _x = new _M0TPC16string10StringView(x.str, x.start, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView12trim_2einner(self, chars) {
  const _bind = _M0FPB23build__ascii__char__set(chars);
  if (_bind === undefined) {
    return _M0MPC16string10StringView22trim__end__with__chars(_M0MPC16string10StringView24trim__start__with__chars(self, chars), chars);
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _bits0 = _x._0;
    const _bits1 = _x._1;
    const _bits2 = _x._2;
    const _bits3 = _x._3;
    const start = _M0FPB26string__trim__start__ascii(self.str, self.start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    const end = _M0FPB24string__trim__end__ascii(self.str, start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    return new _M0TPC16string10StringView(self.str, start, end);
  }
}
function _M0MPC16string6String12trim_2einner(self, chars) {
  return _M0MPC16string10StringView12trim_2einner(new _M0TPC16string10StringView(self, 0, self.length), chars);
}
function _M0MPC16string6String4trim(self, chars$46$opt) {
  let chars;
  if (chars$46$opt === undefined) {
    chars = new _M0TPC16string10StringView(_M0MPC16string6String4trimN7_2abindS478, 0, _M0MPC16string6String4trimN7_2abindS478.length);
  } else {
    const _Some = chars$46$opt;
    chars = _Some;
  }
  return _M0MPC16string6String12trim_2einner(self, chars);
}
function _M0MPB4Iter3mapGssE(self, f) {
  return new _M0TPB4IterGsE(() => {
    const _bind = _M0MPB4Iter4nextGsE(self);
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      return f(_x);
    }
  }, self.size_hint);
}
function _M0MPC16string6String12replace__all(self, old, new_) {
  const len = self.length;
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(len);
  const old_len = old.end - old.start | 0;
  const new$2 = _M0MPC16string10StringView9to__owned(new_);
  if (old_len === 0) {
    _M0IPB13StringBuilderPB6Logger13write__string(buf, new$2);
    const _bind = self.length;
    let _tmp = 0;
    while (true) {
      const _string_index = _tmp;
      if (_string_index < _bind) {
        let _decoded_next_string_index;
        let _decoded_char;
        _L: {
          const _bind$2 = self.charCodeAt(_string_index);
          if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
            const _bind$3 = self.charCodeAt(_string_index + 1 | 0);
            if (_bind$3 >= 56320 && _bind$3 <= 57343) {
              _decoded_next_string_index = _string_index + 2 | 0;
              _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0);
              break _L;
            } else {
              _decoded_next_string_index = _string_index + 1 | 0;
              _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$2);
              break _L;
            }
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$2);
            break _L;
          }
        }
        _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char);
        _M0IPB13StringBuilderPB6Logger13write__string(buf, new$2);
        _tmp = _decoded_next_string_index;
        continue;
      } else {
        break;
      }
    }
    return _M0MPB13StringBuilder10to__string(buf);
  } else {
    const first_end = _M0MPC16string6String4find(self, old);
    if (first_end === undefined) {
      return self;
    } else {
      const _Some = first_end;
      const _end = _Some;
      let _tmp = new _M0TPC16string10StringView(self, 0, self.length);
      let _tmp$2 = _end;
      while (true) {
        const view = _tmp;
        const end = _tmp$2;
        const seg = _M0MPC16string10StringView12view_2einner(view, 0, end);
        _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(buf, _M0MPC16string10StringView4data(seg), _M0MPC16string10StringView13start__offset(seg), seg.end - seg.start | 0);
        _M0IPB13StringBuilderPB6Logger13write__string(buf, new$2);
        if ((end + old_len | 0) <= len) {
          const next_view = _M0MPC16string10StringView12view_2einner(view, end + old_len | 0, undefined);
          const _bind = _M0MPC16string10StringView4find(next_view, old);
          if (_bind === undefined) {
            _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(buf, _M0MPC16string10StringView4data(next_view), _M0MPC16string10StringView13start__offset(next_view), next_view.end - next_view.start | 0);
            break;
          } else {
            const _Some$2 = _bind;
            const _next_end = _Some$2;
            _tmp = next_view;
            _tmp$2 = _next_end;
            continue;
          }
        } else {
          break;
        }
      }
      return _M0MPB13StringBuilder10to__string(buf);
    }
  }
}
function _M0IPC16string6StringPB12ToStringView16to__string__view(self) {
  return new _M0TPC16string10StringView(self, 0, self.length);
}
function _M0IPC16string10StringViewPB12ToStringView16to__string__view(self) {
  return self;
}
function _M0MPC16string6String9to__array(self) {
  const chars = _M0MPC15array5Array13Array_2einnerGcE(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$2 = self.charCodeAt(_string_index);
        if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
          const _bind$3 = self.charCodeAt(_string_index + 1 | 0);
          if (_bind$3 >= 56320 && _bind$3 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$2);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$2);
          break _L;
        }
      }
      _M0MPC15array5Array4pushGcE(chars, _decoded_char);
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return chars;
}
function _M0IPC14bool4BoolPB4Show10to__string(self) {
  return self ? "true" : "false";
}
function _M0MPC15array9ArrayView4iterGsE(self) {
  const i = new _M0TPB8MutLocalGiE(0);
  const len = self.end - self.start | 0;
  return _M0MPB4Iter3newGsE(() => {
    if (i.val < len) {
      const elem = self.buf[self.start + i.val | 0];
      i.val = i.val + 1 | 0;
      return elem;
    } else {
      return undefined;
    }
  }, len);
}
function _M0MPC15array5Array4iterGsE(self) {
  return _M0MPC15array9ArrayView4iterGsE(new _M0TPB9ArrayViewGsE(self, 0, self.length));
}
function _M0MPC15array9ArrayView4joinGsE(self, separator) {
  if ((self.end - self.start | 0) === 0) {
    return "";
  } else {
    const _hd = self.buf[self.start];
    const _x_buf = self.buf;
    const _x_start = 1 + self.start | 0;
    const _x_end = self.end;
    const hd = _M0IPC16string6StringPB12ToStringView16to__string__view(_hd);
    const _bind = _x_end - _x_start | 0;
    let size_hint;
    let _tmp = 0;
    let _tmp$2 = hd.end - hd.start | 0;
    while (true) {
      const _ = _tmp;
      const size_hint$2 = _tmp$2;
      if (_ < _bind) {
        const s = _x_buf[_x_start + _ | 0];
        _tmp = _ + 1 | 0;
        const _bind$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
        _tmp$2 = (size_hint$2 + (_bind$2.end - _bind$2.start | 0) | 0) + (separator.end - separator.start | 0) | 0;
        continue;
      } else {
        size_hint = size_hint$2;
        break;
      }
    }
    const size_hint$2 = size_hint << 1;
    const buf = _M0MPB13StringBuilder21StringBuilder_2einner(size_hint$2);
    _M0IPB13StringBuilderPB6Logger11write__view(buf, hd);
    if ((separator.end - separator.start | 0) === 0) {
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    } else {
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, separator);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    return _M0MPB13StringBuilder10to__string(buf);
  }
}
function _M0MPC15array9ArrayView4joinGRPC16string10StringViewE(self, separator) {
  if ((self.end - self.start | 0) === 0) {
    return "";
  } else {
    const _hd = self.buf[self.start];
    const _x_buf = self.buf;
    const _x_start = 1 + self.start | 0;
    const _x_end = self.end;
    const hd = _M0IPC16string10StringViewPB12ToStringView16to__string__view(_hd);
    const _bind = _x_end - _x_start | 0;
    let size_hint;
    let _tmp = 0;
    let _tmp$2 = hd.end - hd.start | 0;
    while (true) {
      const _ = _tmp;
      const size_hint$2 = _tmp$2;
      if (_ < _bind) {
        const s = _x_buf[_x_start + _ | 0];
        _tmp = _ + 1 | 0;
        const _bind$2 = _M0IPC16string10StringViewPB12ToStringView16to__string__view(s);
        _tmp$2 = (size_hint$2 + (_bind$2.end - _bind$2.start | 0) | 0) + (separator.end - separator.start | 0) | 0;
        continue;
      } else {
        size_hint = size_hint$2;
        break;
      }
    }
    const size_hint$2 = size_hint << 1;
    const buf = _M0MPB13StringBuilder21StringBuilder_2einner(size_hint$2);
    _M0IPB13StringBuilderPB6Logger11write__view(buf, hd);
    if ((separator.end - separator.start | 0) === 0) {
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string10StringViewPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    } else {
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string10StringViewPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, separator);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    return _M0MPB13StringBuilder10to__string(buf);
  }
}
function _M0MPC16option6Option6unwrapGcE(self) {
  return self === -1 ? $panic() : self;
}
function _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(self, default_) {
  if (self === undefined) {
    return default_;
  } else {
    const _Some = self;
    const _t = _Some;
    return _t;
  }
}
function _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(src, allocate_len, len, src_offset, dst_offset) {
  const dst = new Array(allocate_len);
  _M0MPB18UninitializedArray12unsafe__blitGsE(dst, dst_offset, src, src_offset, len);
  return dst;
}
function _M0MPC15array9ArrayView9to__ownedGsE(self) {
  const len = self.end - self.start | 0;
  return len === 0 ? [] : _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(self.buf, len, len, self.start, 0);
}
function _M0MPC13int3Int3max(self, other) {
  return self > other ? self : other;
}
function _M0MPC15array5Array9is__emptyGRP49puruslang5purus3src5lexer5TokenE(self) {
  return self.length === 0;
}
function _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug7ContentE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGUOsRPC15debug4ReprERPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGsRPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPC15debug13ContentParensRPB5ArrayGsEE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGssE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPB4Iter10size__hintGsE(self) {
  return self.size_hint;
}
function _M0MPB4Iter4iterGsE(self) {
  return self;
}
function _M0MPC15float5Float5Float(self) {
  return self;
}
function _M0MPC13int3Int22is__leading__surrogate(self) {
  return 55296 <= self && self <= 56319;
}
function _M0MPC13int3Int23is__trailing__surrogate(self) {
  return 56320 <= self && self <= 57343;
}
function _M0MPC13int3Int13is__surrogate(self) {
  return 55296 <= self && self <= 57343;
}
function _M0MPB18UninitializedArray19unsafe__blit__fixedGsE(dst, dst_offset, src, src_offset, len) {
  let _tmp = len - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      const _tmp$2 = dst_offset + i | 0;
      const _tmp$3 = src_offset + i | 0;
      if (_tmp$2 >>> 0 < dst.length) {
        dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
      } else {
        $oob();
      }
      _tmp = i - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FPB7printlnGsE(input) {
  console.log(_M0IPC16string6StringPB4Show10to__string(input));
}
function _M0MPC14char4Char7to__hex(char) {
  const code = char;
  return code >= 0 && code <= 255 ? _M0MPC14byte4Byte7to__hex(code & 255) : code <= 65535 ? `${_M0MPC14byte4Byte7to__hex(code >> 8 & 255)}${_M0MPC14byte4Byte7to__hex(code & 255)}` : `${_M0MPC14byte4Byte7to__hex(code >> 16 & 255)}${_M0MPC14byte4Byte7to__hex(code >> 8 & 255)}${_M0MPC14byte4Byte7to__hex(code & 255)}`;
}
function _M0MPC14char4Char11is__control(self) {
  return self >= 0 && self <= 31 ? true : self >= 127 && self <= 159;
}
function _M0MPC14char4Char13is__printable(self) {
  if (_M0MPC14char4Char11is__control(self)) {
    return false;
  }
  const self$2 = self;
  _L: {
    _L$2: {
      if (self$2 >= 57344 && self$2 <= 63743) {
        break _L$2;
      } else {
        if (self$2 >= 983040 && self$2 <= 1048573) {
          break _L$2;
        } else {
          if (self$2 >= 1048576 && self$2 <= 1114109) {
            break _L$2;
          }
        }
      }
      break _L;
    }
    return false;
  }
  _L$2: {
    _L$3: {
      if (self$2 === 173) {
        break _L$3;
      } else {
        if (self$2 >= 1536 && self$2 <= 1541) {
          break _L$3;
        } else {
          if (self$2 === 1564) {
            break _L$3;
          } else {
            if (self$2 === 1757) {
              break _L$3;
            } else {
              if (self$2 === 1807) {
                break _L$3;
              } else {
                if (self$2 >= 2192 && self$2 <= 2193) {
                  break _L$3;
                } else {
                  if (self$2 === 2274) {
                    break _L$3;
                  } else {
                    if (self$2 === 6158) {
                      break _L$3;
                    } else {
                      if (self$2 >= 8203 && self$2 <= 8207) {
                        break _L$3;
                      } else {
                        if (self$2 >= 8234 && self$2 <= 8238) {
                          break _L$3;
                        } else {
                          if (self$2 >= 8288 && self$2 <= 8292) {
                            break _L$3;
                          } else {
                            if (self$2 >= 8294 && self$2 <= 8303) {
                              break _L$3;
                            } else {
                              if (self$2 === 65279) {
                                break _L$3;
                              } else {
                                if (self$2 >= 65529 && self$2 <= 65531) {
                                  break _L$3;
                                } else {
                                  if (self$2 === 69821) {
                                    break _L$3;
                                  } else {
                                    if (self$2 === 69837) {
                                      break _L$3;
                                    } else {
                                      if (self$2 >= 78896 && self$2 <= 78911) {
                                        break _L$3;
                                      } else {
                                        if (self$2 >= 113824 && self$2 <= 113827) {
                                          break _L$3;
                                        } else {
                                          if (self$2 >= 119155 && self$2 <= 119162) {
                                            break _L$3;
                                          } else {
                                            if (self$2 === 917505) {
                                              break _L$3;
                                            } else {
                                              if (self$2 >= 917536 && self$2 <= 917631) {
                                                break _L$3;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L$2;
    }
    return false;
  }
  if (_M0MPC13int3Int13is__surrogate(self$2)) {
    return false;
  }
  if (self$2 === 8232 || self$2 === 8233) {
    return false;
  }
  _L$3: {
    _L$4: {
      if (self$2 >= 64976 && self$2 <= 65007) {
        break _L$4;
      } else {
        if (self$2 >= 65534 && self$2 <= 65535) {
          break _L$4;
        } else {
          if (self$2 >= 131070 && self$2 <= 131071) {
            break _L$4;
          } else {
            if (self$2 >= 196606 && self$2 <= 196607) {
              break _L$4;
            } else {
              if (self$2 >= 262142 && self$2 <= 262143) {
                break _L$4;
              } else {
                if (self$2 >= 327678 && self$2 <= 327679) {
                  break _L$4;
                } else {
                  if (self$2 >= 393214 && self$2 <= 393215) {
                    break _L$4;
                  } else {
                    if (self$2 >= 458750 && self$2 <= 458751) {
                      break _L$4;
                    } else {
                      if (self$2 >= 524286 && self$2 <= 524287) {
                        break _L$4;
                      } else {
                        if (self$2 >= 589822 && self$2 <= 589823) {
                          break _L$4;
                        } else {
                          if (self$2 >= 655358 && self$2 <= 655359) {
                            break _L$4;
                          } else {
                            if (self$2 >= 720894 && self$2 <= 720895) {
                              break _L$4;
                            } else {
                              if (self$2 >= 786430 && self$2 <= 786431) {
                                break _L$4;
                              } else {
                                if (self$2 >= 851966 && self$2 <= 851967) {
                                  break _L$4;
                                } else {
                                  if (self$2 >= 917502 && self$2 <= 917503) {
                                    break _L$4;
                                  } else {
                                    if (self$2 >= 983038 && self$2 <= 983039) {
                                      break _L$4;
                                    } else {
                                      if (self$2 >= 1048574 && self$2 <= 1048575) {
                                        break _L$4;
                                      } else {
                                        if (self$2 >= 1114110 && self$2 <= 1114111) {
                                          break _L$4;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L$3;
    }
    return false;
  }
  return true;
}
function _M0MPC14char4Char18escape__to_2einner(self, logger, quote) {
  if (quote) {
    logger.method_table.method_3(logger.self, 39);
  }
  _L: {
    _L$2: {
      if (self === 39) {
        break _L$2;
      } else {
        if (self === 92) {
          break _L$2;
        } else {
          if (self === 10) {
            logger.method_table.method_0(logger.self, "\\n");
          } else {
            if (self === 13) {
              logger.method_table.method_0(logger.self, "\\r");
            } else {
              if (self === 8) {
                logger.method_table.method_0(logger.self, "\\b");
              } else {
                if (self === 9) {
                  logger.method_table.method_0(logger.self, "\\t");
                } else {
                  if (self >= 32 && self <= 126) {
                    logger.method_table.method_3(logger.self, self);
                  } else {
                    if (!_M0MPC14char4Char13is__printable(self)) {
                      logger.method_table.method_0(logger.self, "\\u{");
                      logger.method_table.method_0(logger.self, _M0MPC14char4Char7to__hex(self));
                      logger.method_table.method_0(logger.self, "}");
                    } else {
                      logger.method_table.method_3(logger.self, self);
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L;
    }
    logger.method_table.method_3(logger.self, 92);
    logger.method_table.method_3(logger.self, self);
  }
  if (quote) {
    logger.method_table.method_3(logger.self, 39);
    return;
  } else {
    return;
  }
}
function _M0MPC14char4Char14escape_2einner(self, quote) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0MPC14char4Char18escape__to_2einner(self, { self: buf, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger }, quote);
  return _M0MPB13StringBuilder10to__string(buf);
}
function _M0MPC15bytes5Bytes11from__array(arr) {
  const len = arr.end - arr.start | 0;
  if (len === 0) {
    return $bytes_literal$0;
  }
  const result = _M0MPB18UninitializedArray23unsafe__make__and__blitGyE(arr.buf, len, arr.start, 0, len);
  return result;
}
function _M0MPC15array5Array44unsafe__make__and__blit__from__fixed_2einnerGsE(src, allocate_len, len, src_offset, dst_offset) {
  const dst = new Array(allocate_len);
  _M0MPB18UninitializedArray19unsafe__blit__fixedGsE(dst, dst_offset, src, src_offset, len);
  return dst;
}
function _M0MPC15array5Array21clamped__view_2einnerGsE(self, start, end) {
  const len = self.length;
  const lo = _M0FPB13clamp__offset(start, len);
  let hi;
  if (end === undefined) {
    hi = len;
  } else {
    const _Some = end;
    const _end = _Some;
    hi = _M0FPB13clamp__offset(_end, len);
  }
  const count = hi > lo ? hi - lo | 0 : 0;
  const _bind = self;
  return new _M0TPB9ArrayViewGsE(_bind, lo, lo + count | 0);
}
function _M0MPC15array5Array17reserve__capacityGsE(self, capacity) {}
function _M0MPC15array5Array6appendGsE(self, other) {
  const old_len = self.length;
  const append_len = other.end - other.start | 0;
  if ((old_len + append_len | 0) >= old_len) {
    _M0MPB7JSArray12append__view(self, other.buf, other.start, append_len);
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array5Array2atGsE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array2atGcE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array3setGsE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array5Array18from__fixed__arrayGsE(arr) {
  const len = arr.length;
  return _M0MPC15array5Array44unsafe__make__and__blit__from__fixed_2einnerGsE(arr, len, len, 0, 0);
}
function _M0IPC15array5ArrayPB2Eq5equalGsE(self, other) {
  const self_len = self.length;
  const other_len = other.length;
  if (self_len === other_len) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < self_len) {
        if (self[i] === other[i]) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }
}
function _M0IPC15array5ArrayPB3Add3addGsE(self, other) {
  const len_self = self.length;
  const len_other = other.length;
  if (len_self === 0) {
    return _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(other, len_other, len_other, 0, 0);
  } else {
    const result = _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(self, len_self + len_other | 0, len_self, 0, 0);
    _M0MPB18UninitializedArray12unsafe__blitGsE(result, len_self, other, 0, len_other);
    return result;
  }
}
function _M0MPC15array5Array3allGsE(self, f) {
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const v = self[_];
      if (!f(v)) {
        return false;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0MPC15array5Array6filterGsE(self, f) {
  const arr = [];
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const v = self[_];
      if (f(v)) {
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(arr, v);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array10push__iterGsE(self, iter) {
  const _bind = _M0MPB4Iter10size__hintGsE(iter);
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _n = _Some;
    _M0MPC15array5Array17reserve__capacityGsE(self, self.length + _n | 0);
  }
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGsE(iter);
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(self, _x);
      continue;
    }
  }
}
function _M0MPC15array5Array4joinGsE(self, separator) {
  return _M0MPC15array9ArrayView4joinGsE(new _M0TPB9ArrayViewGsE(self, 0, self.length), separator);
}
function _M0MPC15array5Array4joinGRPC16string10StringViewE(self, separator) {
  return _M0MPC15array9ArrayView4joinGRPC16string10StringViewE(new _M0TPB9ArrayViewGRPC16string10StringViewE(self, 0, self.length), separator);
}
function _M0IPC15float5FloatPB4Show10to__string(self) {
  return String(self);
}
function _M0MPC15debug4Repr4ReprGsE(value) {
  return _M0IPC16string6StringPC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr8children(self) {
  let value;
  _L: {
    _L$2: {
      switch (self.$tag) {
        case 0: {
          break _L$2;
        }
        case 1: {
          break _L$2;
        }
        case 2: {
          break _L$2;
        }
        case 3: {
          break _L$2;
        }
        case 4: {
          break _L$2;
        }
        case 5: {
          break _L$2;
        }
        case 6: {
          break _L$2;
        }
        case 15: {
          break _L$2;
        }
        case 17: {
          break _L$2;
        }
        case 7: {
          const _Tuple = self;
          const _xs = _Tuple._0;
          return _xs;
        }
        case 8: {
          const _Array = self;
          const _xs$2 = _Array._0;
          return _xs$2;
        }
        case 9: {
          const _Record = self;
          const _xs$3 = _Record._0;
          return _xs$3;
        }
        case 10: {
          const _Enum = self;
          const _xs$4 = _Enum._1;
          return _xs$4;
        }
        case 11: {
          const _Map = self;
          const _xs$5 = _Map._0;
          return _xs$5;
        }
        case 14: {
          const _Opaque = self;
          const _value = _Opaque._1;
          value = _value;
          break _L;
        }
        case 12: {
          const _RecordField = self;
          const _value$2 = _RecordField._1;
          value = _value$2;
          break _L;
        }
        case 13: {
          const _EnumLabeledArg = self;
          const _value$3 = _EnumLabeledArg._1;
          value = _value$3;
          break _L;
        }
        default: {
          const _MapEntry = self;
          const _key = _MapEntry._0;
          const _value$4 = _MapEntry._1;
          return [_key, _value$4];
        }
      }
    }
    return [];
  }
  return [value];
}
function _M0MPC15debug4Repr14with__children(self, children) {
  _L: {
    switch (self.$tag) {
      case 0: {
        break _L;
      }
      case 1: {
        break _L;
      }
      case 2: {
        break _L;
      }
      case 3: {
        break _L;
      }
      case 4: {
        break _L;
      }
      case 5: {
        break _L;
      }
      case 6: {
        break _L;
      }
      case 15: {
        break _L;
      }
      case 17: {
        break _L;
      }
      case 7: {
        return new _M0DTPC15debug4Repr5Tuple(children);
      }
      case 8: {
        return new _M0DTPC15debug4Repr5Array(children);
      }
      case 9: {
        return new _M0DTPC15debug4Repr6Record(children);
      }
      case 10: {
        const _Enum = self;
        const _name = _Enum._0;
        return new _M0DTPC15debug4Repr4Enum(_name, children);
      }
      case 11: {
        return new _M0DTPC15debug4Repr3Map(children);
      }
      case 12: {
        const _RecordField = self;
        const _name$2 = _RecordField._0;
        if (children.length === 1) {
          const _value = children[0];
          return new _M0DTPC15debug4Repr11RecordField(_name$2, _value);
        } else {
          return new _M0DTPC15debug4Repr11RecordField(_name$2, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      case 13: {
        const _EnumLabeledArg = self;
        const _label = _EnumLabeledArg._0;
        if (children.length === 1) {
          const _value = children[0];
          return new _M0DTPC15debug4Repr14EnumLabeledArg(_label, _value);
        } else {
          return new _M0DTPC15debug4Repr14EnumLabeledArg(_label, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      case 16: {
        if (children.length === 2) {
          const _key = children[0];
          const _value = children[1];
          return new _M0DTPC15debug4Repr8MapEntry(_key, _value);
        } else {
          return new _M0DTPC15debug4Repr8MapEntry(_M0DTPC15debug4Repr7Omitted__, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      default: {
        const _Opaque = self;
        const _name$3 = _Opaque._0;
        if (children.length === 1) {
          const _value = children[0];
          return new _M0DTPC15debug4Repr6Opaque(_name$3, _value);
        } else {
          return new _M0DTPC15debug4Repr6Opaque(_name$3, _M0DTPC15debug4Repr7Omitted__);
        }
      }
    }
  }
  return self;
}
function _M0MPC15debug4Repr7integer(x) {
  return new _M0DTPC15debug4Repr7Integer(x);
}
function _M0MPC15debug4Repr6double(x) {
  return new _M0DTPC15debug4Repr9DoubleLit(x);
}
function _M0MPC15debug4Repr6string(x) {
  return new _M0DTPC15debug4Repr9StringLit(x);
}
function _M0MPC15debug4Repr5array(children) {
  return new _M0DTPC15debug4Repr5Array(children);
}
function _M0MPC15debug4Repr7omitted() {
  return _M0DTPC15debug4Repr7Omitted__;
}
function _M0MPC15debug4Repr4ctor(name, args) {
  return new _M0DTPC15debug4Repr4Enum(name, _M0MPC15array5Array3mapGUOsRPC15debug4ReprERPC15debug4ReprE(args, (arg) => {
    const _label = arg._0;
    const _value = arg._1;
    if (_label === undefined) {
      return _value;
    } else {
      const _Some = _label;
      const _label$2 = _Some;
      return new _M0DTPC15debug4Repr14EnumLabeledArg(_label$2, _value);
    }
  }));
}
function _M0MPC15debug4Repr7shallow(self) {
  return _M0MPC15debug4Repr14with__children(self, []);
}
function _M0IPC15debug13ContentParensPB3Add3add(self, other) {
  return new _M0TPC15debug13ContentParens(self.size + other.size | 0, _M0IPC15array5ArrayPB3Add3addGsE(self.lines, other.lines));
}
function _M0FPC15debug14empty__content() {
  return new _M0TPC15debug7Content(0, [], false);
}
function _M0FPC15debug8verbatim(x) {
  return new _M0TPC15debug13ContentParens(1, [x]);
}
function _M0FPC15debug15content__parens(size, lines) {
  return new _M0TPC15debug13ContentParens(size, lines);
}
function _M0FPC15debug12leaf_2einner(x, needs_parens) {
  return new _M0TPC15debug7Content(1, [x], needs_parens);
}
function _M0FPC15debug11with__lines(r, f) {
  return new _M0TPC15debug13ContentParens(r.size, f(r.lines));
}
function _M0MPC15debug7Content20with__lines__content(r, f) {
  return new _M0TPC15debug7Content(r.size, f(r.lines), r.needs_parens);
}
function _M0FPC15debug15surround__lines(start, finish, lines) {
  if (lines.length === 0) {
    return [`${start}${finish}`];
  } else {
    if (lines.length === 1) {
      const _item = lines[0];
      return [`${start}${_item}${finish}`];
    } else {
      const _first = lines[0];
      const _last = lines[lines.length - 1 | 0];
      const _x = new _M0TPB9ArrayViewGsE(lines, 1, lines.length - 1 | 0);
      const _self = [];
      _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, `${start}${_first}`);
      _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x));
      _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, `${_last}${finish}`);
      return _self;
    }
  }
}
function _M0FPC15debug8surround(start, finish, r) {
  return _M0FPC15debug11with__lines(r, (lines) => _M0FPC15debug15surround__lines(start, finish, lines));
}
function _M0MPC15debug7Content8no__wrap(c) {
  return new _M0TPC15debug13ContentParens(c.size, c.lines);
}
function _M0FPC15debug6parens(r) {
  return new _M0TPC15debug7Content(r.size, r.lines, true);
}
function _M0FPC15debug10no__parens(r) {
  return new _M0TPC15debug7Content(r.size, r.lines, false);
}
function _M0FPC15debug15compact__middle(middle) {
  const parts = [];
  const _bind = middle.end - middle.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const m = middle.buf[middle.start + _ | 0];
      const t = _M0MPC16string6String4trim(m, undefined);
      if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(t, new _M0TPC16string10StringView(_M0FPC15debug15compact__middleN7_2abindS868, 0, _M0FPC15debug15compact__middleN7_2abindS868.length))) {
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(parts, t);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const joined0 = _M0MPC15array5Array4joinGRPC16string10StringViewE(parts, new _M0TPC16string10StringView(_M0FPC15debug15compact__middleN7_2abindS869, 0, _M0FPC15debug15compact__middleN7_2abindS869.length));
  const _bind$2 = _M0MPC16string6String13strip__suffix(joined0, new _M0TPC16string10StringView(_M0FPC15debug15compact__middleN7_2abindS870, 0, _M0FPC15debug15compact__middleN7_2abindS870.length));
  if (_bind$2 === undefined) {
    return new _M0TPC16string10StringView(joined0, 0, joined0.length);
  } else {
    const _Some = _bind$2;
    return _Some;
  }
}
function _M0FPC15debug14compact__lines(lines) {
  if (lines.length === 0) {
    return [];
  } else {
    if (lines.length === 1) {
      const _x = lines[0];
      return [_x];
    } else {
      const _first = lines[0];
      const _last = lines[lines.length - 1 | 0];
      const _bind = lines.length - 1 | 0;
      const _x = new _M0TPB9ArrayViewGsE(lines, 1, _bind);
      if (_first === "[" && _last === "]" || _first === "{" && _last === "}") {
        const joined = _M0FPC15debug15compact__middle(_x);
        if (_first === "{") {
          const s1 = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MPC16string10StringView13strip__prefix(joined, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS881, 0, _M0FPC15debug14compact__linesN7_2abindS881.length)), joined);
          const inner = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MPC16string10StringView13strip__suffix(s1, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS882, 0, _M0FPC15debug14compact__linesN7_2abindS882.length)), s1);
          if (_M0IPC16string10StringViewPB2Eq5equal(inner, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS883, 0, _M0FPC15debug14compact__linesN7_2abindS883.length))) {
            return ["{}"];
          } else {
            const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(4);
            _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "{ ");
            _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, inner);
            _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, " }");
            return [_M0MPB13StringBuilder10to__string(_string_builder)];
          }
        } else {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(2);
          _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "[");
          _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, joined);
          _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "]");
          return [_M0MPB13StringBuilder10to__string(_string_builder)];
        }
      } else {
        if (_M0MPC16string6String11has__suffix(_first, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS884, 0, _M0FPC15debug14compact__linesN7_2abindS884.length)) && _last === ")") {
          const joined = _M0FPC15debug15compact__middle(_x);
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(0);
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _first);
          _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, joined);
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _last);
          return [_M0MPB13StringBuilder10to__string(_string_builder)];
        } else {
          const parts = [new _M0TPC16string10StringView(_first, 0, _first.length)];
          const _bind$2 = _bind - 1 | 0;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < _bind$2) {
              const m = lines[1 + _ | 0];
              _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(parts, _M0MPC16string6String4trim(m, undefined));
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(parts, _M0MPC16string6String4trim(_last, undefined));
          return [_M0MPC15array5Array4joinGRPC16string10StringViewE(parts, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS885, 0, _M0FPC15debug14compact__linesN7_2abindS885.length))];
        }
      }
    }
  }
}
function _M0MPC15debug7Content7compact(r) {
  return _M0MPC15debug7Content20with__lines__content(r, _M0FPC15debug14compact__lines);
}
function _M0FPC15debug6indent(prefix, r) {
  return _M0FPC15debug11with__lines(r, (lines) => _M0MPC15array5Array3mapGssE(lines, (line) => `${prefix}${line}`));
}
function _M0FPC15debug14indent__spaces(n, r) {
  return _M0FPC15debug6indent(_M0MPC16string6String6repeat(" ", n), r);
}
function _M0FPC15debug19bracket__seq__lines(open, close, indent_by, contents) {
  if (contents.length === 0) {
    return [`${open}${close}`];
  } else {
    if (contents.length === 1) {
      const _item = contents[0];
      if (_item.length > 1) {
        const lines = _M0FPC15debug14indent__spaces(indent_by, new _M0TPC15debug13ContentParens(0, _item)).lines;
        if (!_M0MPC15array5Array9is__emptyGRP49puruslang5purus3src5lexer5TokenE(lines)) {
          const last_i = lines.length - 1 | 0;
          _M0MPC15array5Array3setGsE(lines, last_i, `${_M0MPC15array5Array2atGsE(lines, last_i)},`);
        }
        const _self = [];
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, open);
        _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(lines));
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, close);
        return _self;
      } else {
        const inner = _M0FPC15debug14compact__lines(_item);
        if (inner.length === 0) {
          return [`${open}${close}`];
        } else {
          if (inner.length === 1) {
            const _x = inner[0];
            if (open === "{" && close === "}") {
              const inner$2 = _M0MPC16string6String4trim(_x, undefined);
              if (_M0IPC16string10StringViewPB2Eq5equal(inner$2, new _M0TPC16string10StringView(_M0FPC15debug19bracket__seq__linesN7_2abindS911, 0, _M0FPC15debug19bracket__seq__linesN7_2abindS911.length))) {
                return ["{}"];
              } else {
                const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(4);
                _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "{ ");
                _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, inner$2);
                _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, " }");
                return [_M0MPB13StringBuilder10to__string(_string_builder)];
              }
            } else {
              return [`${open}${_x}${close}`];
            }
          } else {
            const _self = [];
            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, open);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug14indent__spaces(indent_by, new _M0TPC15debug13ContentParens(0, _item)).lines));
            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, close);
            return _self;
          }
        }
      }
    } else {
      const out = [open];
      const _bind = contents.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          const item = contents[_];
          const item_lines = _M0MPC15array5Array6filterGsE(item, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
          if (item_lines.length === 0) {
          } else {
            if (item_lines.length === 1) {
              const _x = item_lines[0];
              _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_x},`);
            } else {
              const _first = item_lines[0];
              const _last = item_lines[item_lines.length - 1 | 0];
              const _x_end = item_lines.length - 1 | 0;
              _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_first}`);
              const _bind$2 = _x_end - 1 | 0;
              let _tmp$2 = 0;
              while (true) {
                const _$2 = _tmp$2;
                if (_$2 < _bind$2) {
                  const mid = item_lines[1 + _$2 | 0];
                  _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${mid}`);
                  _tmp$2 = _$2 + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_last},`);
            }
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, close);
      return out;
    }
  }
}
function _M0FPC15debug17comma__seq__lines(begin, end, contents) {
  if (begin === "[" && end === "]") {
    return _M0FPC15debug19bracket__seq__lines("[", "]", 2, contents);
  } else {
    if (begin === "{" && end === "}") {
      return _M0FPC15debug19bracket__seq__lines("{", "}", 2, contents);
    } else {
      if (begin === "" && end === "") {
        let lines;
        if (contents.length === 0) {
          lines = [`${begin}${end}`];
        } else {
          if (contents.length === 1) {
            const _item = contents[0];
            lines = _M0FPC15debug15surround__lines(begin, end, _item);
          } else {
            const _first = contents[0];
            const _last = contents[contents.length - 1 | 0];
            const _x_end = contents.length - 1 | 0;
            const space = _M0MPC16string6String6repeat(" ", begin.length);
            const middle_lines = [];
            const _bind = _x_end - 1 | 0;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind) {
                const item = contents[1 + _ | 0];
                const _bind$2 = _M0FPC15debug15surround__lines(space, ",", item);
                _M0MPC15array5Array6appendGsE(middle_lines, new _M0TPB9ArrayViewGsE(_bind$2, 0, _bind$2.length));
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            const _self = [];
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug15surround__lines(begin, ",", _first)));
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(middle_lines));
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug15surround__lines(space, end, _last)));
            lines = _self;
          }
        }
        return _M0MPC15array5Array6filterGsE(lines, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
      } else {
        if (contents.length === 0) {
          return [`${begin}${end}`];
        } else {
          if (contents.length === 1) {
            const _item = contents[0];
            const item_lines = _M0MPC15array5Array6filterGsE(_item, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
            if (item_lines.length === 0) {
              return [`${begin}${end}`];
            } else {
              if (item_lines.length === 1) {
                const _x = item_lines[0];
                return [`${begin}${_x}${end}`];
              } else {
                const _last_line = item_lines[item_lines.length - 1 | 0];
                const _x = new _M0TPB9ArrayViewGsE(item_lines, 0, item_lines.length - 1 | 0);
                const _self = [];
                _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, begin);
                _M0MPC15array5Array10push__iterGsE(_self, _M0MPB4Iter4iterGsE(_M0MPB4Iter3mapGssE(_M0MPC15array9ArrayView4iterGsE(_x), (line) => `${_M0MPC16string6String6repeat(" ", 2)}${line}`)));
                _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, `${_M0MPC16string6String6repeat(" ", 2)}${_last_line},`);
                _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, end);
                return _self;
              }
            }
          } else {
            const out = [begin];
            const _bind = contents.length;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind) {
                const item = contents[_];
                const item_lines = _M0MPC15array5Array6filterGsE(item, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
                if (item_lines.length === 0) {
                } else {
                  if (item_lines.length === 1) {
                    const _x = item_lines[0];
                    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_x},`);
                  } else {
                    const _first = item_lines[0];
                    const _last = item_lines[item_lines.length - 1 | 0];
                    const _x_end = item_lines.length - 1 | 0;
                    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_first}`);
                    const _bind$2 = _x_end - 1 | 0;
                    let _tmp$2 = 0;
                    while (true) {
                      const _$2 = _tmp$2;
                      if (_$2 < _bind$2) {
                        const mid = item_lines[1 + _$2 | 0];
                        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, `${_M0MPC16string6String6repeat(" ", 2)}${mid}`);
                        _tmp$2 = _$2 + 1 | 0;
                        continue;
                      } else {
                        break;
                      }
                    }
                    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_last},`);
                  }
                }
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(out, end);
            return out;
          }
        }
      }
    }
  }
}
function _M0FPC15debug10comma__seq(begin, end, contents) {
  const _bind = contents.length;
  let _tmp = 0;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp;
    const size = _tmp$2;
    if (_ < _bind) {
      const c = contents[_];
      _tmp = _ + 1 | 0;
      _tmp$2 = size + c.size | 0;
      continue;
    } else {
      return new _M0TPC15debug7Content(size, _M0FPC15debug17comma__seq__lines(begin, end, _M0MPC15array5Array3mapGRPC15debug13ContentParensRPB5ArrayGsEE(contents, (c) => c.lines)), false);
    }
  }
}
function _M0FPC15debug14print__content(r) {
  return _M0MPC15array5Array4joinGsE(r.lines, new _M0TPC16string10StringView(_M0FPC15debug14print__contentN7_2abindS989, 0, _M0FPC15debug14print__contentN7_2abindS989.length));
}
function _M0FPC15debug14with__resizing(_root_size, threshold, rendered_children) {
  if (threshold <= 0) {
    return rendered_children;
  } else {
    const compacted = _M0MPC15debug7Content7compact(rendered_children);
    return _M0MPC15array5Array3allGsE(compacted.lines, (line) => line.length <= threshold) ? compacted : rendered_children;
  }
}
function _M0MPC15debug4Repr17info__adds__depth(info) {
  let _tmp;
  switch (info.$tag) {
    case 12: {
      _tmp = true;
      break;
    }
    case 13: {
      _tmp = true;
      break;
    }
    case 16: {
      _tmp = true;
      break;
    }
    default: {
      _tmp = false;
    }
  }
  return !_tmp;
}
function _M0MPC15debug4Repr19prune__info_2einnerN2goS997(replacement, d, node) {
  const children = _M0MPC15debug4Repr8children(node);
  if (d <= 0) {
    return _M0MPC15array5Array9is__emptyGRP49puruslang5purus3src5lexer5TokenE(children) ? node : !_M0MPC15debug4Repr17info__adds__depth(node) ? _M0MPC15debug4Repr14with__children(node, _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug4ReprE(children, (child) => _M0MPC15debug4Repr19prune__info_2einnerN2goS997(replacement, d, child))) : replacement;
  } else {
    if (_M0MPC15array5Array9is__emptyGRP49puruslang5purus3src5lexer5TokenE(children)) {
      return node;
    } else {
      const next_depth = _M0MPC15debug4Repr17info__adds__depth(node) ? d - 1 | 0 : d;
      return _M0MPC15debug4Repr14with__children(node, _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug4ReprE(children, (child) => _M0MPC15debug4Repr19prune__info_2einnerN2goS997(replacement, next_depth, child)));
    }
  }
}
function _M0MPC15debug4Repr19prune__info_2einner(self, replacement, max_depth) {
  if (max_depth === undefined) {
    return self;
  } else {
    const _Some = max_depth;
    const _depth = _Some;
    return _M0MPC15debug4Repr19prune__info_2einnerN2goS997(replacement, _M0MPC13int3Int3max(1, _depth), self);
  }
}
function _M0MPC15debug4Repr11prune__info(self, replacement$46$opt, max_depth) {
  let replacement;
  if (replacement$46$opt === undefined) {
    replacement = _M0MPC15debug4Repr7omitted();
  } else {
    const _Some = replacement$46$opt;
    replacement = _Some;
  }
  return _M0MPC15debug4Repr19prune__info_2einner(self, replacement, max_depth);
}
function _M0FPC15debug10info__size(info) {
  switch (info.$tag) {
    case 0: {
      return 1;
    }
    case 1: {
      return 1;
    }
    case 2: {
      return 1;
    }
    case 3: {
      return 1;
    }
    case 4: {
      return 1;
    }
    case 5: {
      return 1;
    }
    case 6: {
      const _StringLit = info;
      const _s = _StringLit._0;
      return _s.length <= 15 ? 1 : 2;
    }
    case 7: {
      return 1;
    }
    case 8: {
      return 1;
    }
    case 9: {
      return 2;
    }
    case 12: {
      const _RecordField = info;
      const _name = _RecordField._0;
      return _name.length <= 15 ? 0 : 1;
    }
    case 13: {
      const _EnumLabeledArg = info;
      const _name$2 = _EnumLabeledArg._0;
      return _name$2.length <= 15 ? 0 : 1;
    }
    case 10: {
      const _Enum = info;
      const _name$3 = _Enum._0;
      return _name$3.length <= 15 ? 1 : 2;
    }
    case 14: {
      const _Opaque = info;
      const _name$4 = _Opaque._0;
      return _name$4.length <= 15 ? 1 : 2;
    }
    case 15: {
      const _Literal = info;
      const _s$2 = _Literal._0;
      return _s$2.length <= 15 ? 1 : 2;
    }
    case 11: {
      return 2;
    }
    case 16: {
      return 0;
    }
    default: {
      return 0;
    }
  }
}
function _M0FPC15debug17is__unquoted__key(key) {
  let rest;
  _L: {
    if (key.length >= 1) {
      const _x = key.charCodeAt(0);
      if (_x >= 97 && _x <= 122) {
        const _x$2 = new _M0TPC16string10StringView(key, 1, key.length);
        rest = _x$2;
        break _L;
      } else {
        if (_x === 95) {
          const _x$2 = new _M0TPC16string10StringView(key, 1, key.length);
          rest = _x$2;
          break _L;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  return _M0MPC16string10StringView3all(rest, (c) => c >= 97 && c <= 122 ? true : c >= 65 && c <= 90 ? true : c >= 48 && c <= 57 ? true : c === 95);
}
function _M0FPC15debug20pretty__print__label(name) {
  return _M0FPC15debug17is__unquoted__key(name) ? name : _M0MPC16string6String14escape_2einner(name, true);
}
function _M0MPC15debug4Repr13pretty__print(self, children) {
  switch (self.$tag) {
    case 0: {
      return _M0FPC15debug10comma__seq("(", ")", []);
    }
    case 1: {
      const _Integer = self;
      const _s = _Integer._0;
      let _tmp;
      if (_s.length >= 1) {
        const _x = _s.charCodeAt(0);
        if (_x === 45) {
          _tmp = 1;
        } else {
          _tmp = 0;
        }
      } else {
        _tmp = 0;
      }
      return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp, [_s]));
    }
    case 2: {
      const _DoubleLit = self;
      const _x = _DoubleLit._0;
      const needs_parens = 1 / _x < 0;
      return _M0FPC15debug12leaf_2einner(String(_x), needs_parens);
    }
    case 3: {
      const _FloatLit = self;
      const _x$2 = _FloatLit._0;
      const needs_parens$2 = Math.fround(_M0MPC15float5Float5Float(Math.fround(1)) / _x$2) < _M0MPC15float5Float5Float(Math.fround(0));
      return _M0FPC15debug12leaf_2einner(_M0IPC15float5FloatPB4Show10to__string(_x$2), needs_parens$2);
    }
    case 4: {
      const _BoolLit = self;
      const _x$3 = _BoolLit._0;
      return _M0FPC15debug12leaf_2einner(_M0IPC14bool4BoolPB4Show10to__string(_x$3), false);
    }
    case 5: {
      const _CharLit = self;
      const _x$4 = _CharLit._0;
      return _M0FPC15debug12leaf_2einner(_M0MPC14char4Char14escape_2einner(_x$4, true), false);
    }
    case 6: {
      const _StringLit = self;
      const _x$5 = _StringLit._0;
      return _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_M0MPC16string6String14escape_2einner(_x$5, true)));
    }
    case 7: {
      return _M0FPC15debug10comma__seq("(", ")", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 10: {
      const _Enum = self;
      const _name = _Enum._0;
      return children.length === 0 ? _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_name)) : _name === "Tuple" ? _M0FPC15debug10comma__seq("(", ")", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x))) : _M0FPC15debug10comma__seq(`${_name}(`, ")", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 8: {
      return _M0FPC15debug10comma__seq("[", "]", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 9: {
      return _M0FPC15debug10comma__seq("{", "}", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 14: {
      const _Opaque = self;
      const _name$2 = _Opaque._0;
      if (_M0MPC15array5Array9is__emptyGRP49puruslang5purus3src5lexer5TokenE(children)) {
        return _M0FPC15debug10no__parens(_M0FPC15debug8surround("<", ">", _M0FPC15debug8verbatim(_name$2)));
      } else {
        const body = _M0IPC15debug13ContentParensPB3Add3add(_M0FPC15debug8verbatim(`${_name$2}:`), _M0FPC15debug6indent("  ", _M0MPC15debug7Content8no__wrap(_M0FPC15debug10comma__seq("", "", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x))))));
        return _M0FPC15debug10no__parens(_M0FPC15debug8surround("<", ">", body));
      }
    }
    case 15: {
      const _Literal = self;
      const _str = _Literal._0;
      return _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_str));
    }
    case 11: {
      return _M0FPC15debug10comma__seq("{", "}", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 16: {
      if (children.length === 2) {
        const _key = children[0];
        const _val = children[1];
        const k = _M0MPC15debug7Content8no__wrap(_key);
        const v = _M0MPC15debug7Content8no__wrap(_val);
        const _bind = v.lines;
        if (_bind.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind.length === 1) {
            const _one = _bind[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens((1 + k.size | 0) + v.size | 0, [`${_M0FPC15debug14print__content(_M0FPC15debug8surround("", ": ", k))}${_one}`]));
          } else {
            const _first = _bind[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind, 1, _bind.length);
            const head = `${_M0FPC15debug14print__content(_M0FPC15debug8surround("", ": ", k))}${_first}`;
            const _tmp$2 = (1 + k.size | 0) + v.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, head);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$2, _self));
          }
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    case 13: {
      const _EnumLabeledArg = self;
      const _name$3 = _EnumLabeledArg._0;
      if (children.length === 1) {
        const _val = children[0];
        const _bind = _val.lines;
        if (_bind.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind.length === 1) {
            const _first = _bind[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(1 + _val.size | 0, [`${_name$3}=${_first}`]));
          } else {
            const _first = _bind[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind, 1, _bind.length);
            const _tmp$2 = 1 + _val.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, `${_name$3}=${_first}`);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$2, _self));
          }
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    case 12: {
      const _RecordField = self;
      const _name$4 = _RecordField._0;
      if (children.length === 1) {
        const _val = children[0];
        const label = _M0FPC15debug20pretty__print__label(_name$4);
        const v = _M0MPC15debug7Content8no__wrap(_val);
        const _bind = v.lines;
        if (_bind.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind.length === 1) {
            const _one = _bind[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(1 + v.size | 0, [`${label}: ${_one}`]));
          } else {
            const _first = _bind[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind, 1, _bind.length);
            const _tmp$2 = 1 + v.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(_self, `${label}: ${_first}`);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$2, _self));
          }
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    default: {
      return _M0FPC15debug6parens(_M0FPC15debug8verbatim("..."));
    }
  }
}
function _M0MPC15debug4Repr12render__repr(self, threshold) {
  const label = _M0MPC15debug4Repr7shallow(self);
  const children = _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug7ContentE(_M0MPC15debug4Repr8children(self), (child) => _M0MPC15debug4Repr12render__repr(child, threshold));
  return _M0FPC15debug14with__resizing(_M0FPC15debug10info__size(label), threshold, _M0MPC15debug4Repr13pretty__print(label, children));
}
function _M0FPC15debug6render(r, max_depth) {
  const max_depth$2 = max_depth === undefined ? _M0FPC15debug6renderN6constrS1100 : max_depth;
  const info = _M0MPC15debug4Repr11prune__info(r, undefined, max_depth$2);
  return _M0FPC15debug14print__content(_M0MPC15debug7Content8no__wrap(_M0MPC15debug4Repr12render__repr(info, 70)));
}
function _M0FPC15debug10to__stringGRP49puruslang5purus3src5lexer9TokenKindE(x) {
  return _M0FPC15debug6render(_M0IP49puruslang5purus3src5lexer9TokenKindPC15debug5Debug8to__repr(x), undefined);
}
function _M0IPC13int3IntPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr7integer(_M0MPC13int3Int18to__string_2einner(self, 10));
}
function _M0IPC16double6DoublePC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr6double(self);
}
function _M0IPC16string6StringPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr6string(self);
}
function _M0IPC15array5ArrayPC15debug5Debug8to__reprGsE(self) {
  return _M0MPC15debug4Repr5array(_M0MPC15array5Array3mapGsRPC15debug4ReprE(self, (x) => _M0MPC15debug4Repr4ReprGsE(x)));
}
function _M0FPC13env24get__cli__args__internal() {
  return _M0MPC15array5Array18from__fixed__arrayGsE(_M0FPC13env19get__cli__args__ffi());
}
function _M0FPC13env4args() {
  return _M0FPC13env24get__cli__args__internal();
}
function _M0FP311moonbitlang1x7unicode21utf16__pair__to__char(hi, lo) {
  return _M0MPC13int3Int22is__leading__surrogate(hi) && _M0MPC13int3Int23is__trailing__surrogate(lo) ? ((hi << 10) + lo | 0) - 56613888 | 0 : -1;
}
function _M0FP311moonbitlang1x7unicode15to__utf8__bytes(s) {
  const res = [];
  const len = s.length;
  const i = new _M0TPB8MutLocalGiE(0);
  while (true) {
    if (i.val < len) {
      const _tmp = i.val;
      const c = new _M0TPB8MutLocalGiE(_tmp >>> 0 < s.length ? s.charCodeAt(_tmp) : $oob());
      if (_M0MPC13int3Int22is__leading__surrogate(c.val)) {
        i.val = i.val + 1 | 0;
        const _tmp$2 = i.val;
        const l = _tmp$2 >>> 0 < s.length ? s.charCodeAt(_tmp$2) : $oob();
        c.val = _M0MPC16option6Option6unwrapGcE(_M0FP311moonbitlang1x7unicode21utf16__pair__to__char(c.val, l));
      }
      if (c.val < 128) {
        _M0MPC15array5Array4pushGyE(res, c.val & 255);
      } else {
        if (c.val < 2048) {
          _M0MPC15array5Array4pushGyE(res, (192 + (c.val >> 6) | 0) & 255);
          _M0MPC15array5Array4pushGyE(res, (128 + (c.val & 63) | 0) & 255);
        } else {
          if (c.val < 65536) {
            _M0MPC15array5Array4pushGyE(res, (224 + (c.val >> 12) | 0) & 255);
            _M0MPC15array5Array4pushGyE(res, (128 + (c.val >> 6 & 63) | 0) & 255);
            _M0MPC15array5Array4pushGyE(res, (128 + (c.val & 63) | 0) & 255);
          } else {
            _M0MPC15array5Array4pushGyE(res, (240 + (c.val >> 18) | 0) & 255);
            _M0MPC15array5Array4pushGyE(res, (128 + (c.val >> 12 & 63) | 0) & 255);
            _M0MPC15array5Array4pushGyE(res, (128 + (c.val >> 6 & 63) | 0) & 255);
            _M0MPC15array5Array4pushGyE(res, (128 + (c.val & 63) | 0) & 255);
          }
        }
      }
      i.val = i.val + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(res, 0, res.length));
}
function _M0FP311moonbitlang1x7unicode21char__to__utf16__pair(ch) {
  const c = ch;
  if (c > 65535) {
    const v = c - 65536 | 0;
    return { _0: 55296 + (v >> 10) | 0, _1: 56320 + (v & 1023) | 0 };
  } else {
    return undefined;
  }
}
function _M0FP311moonbitlang1x7unicode16to__utf8__string(bytes) {
  const res = [];
  const len = bytes.length;
  const i = new _M0TPB8MutLocalGiE(0);
  while (true) {
    if (i.val < len) {
      const _tmp = i.val;
      const c = new _M0TPB8MutLocalGiE(_tmp >>> 0 < bytes.length ? bytes[_tmp] : $oob());
      if (c.val < 128) {
        _M0MPC15array5Array4pushGcE(res, c.val);
        i.val = i.val + 1 | 0;
      } else {
        if (c.val < 224) {
          if ((i.val + 1 | 0) >= len) {
            break;
          }
          const _tmp$2 = (c.val & 31) << 6;
          const _tmp$3 = i.val + 1 | 0;
          c.val = _tmp$2 | (_tmp$3 >>> 0 < bytes.length ? bytes[_tmp$3] : $oob()) & 63;
          _M0MPC15array5Array4pushGcE(res, c.val);
          i.val = i.val + 2 | 0;
        } else {
          if (c.val < 240) {
            if ((i.val + 2 | 0) >= len) {
              break;
            }
            const _tmp$2 = (c.val & 15) << 12;
            const _tmp$3 = i.val + 1 | 0;
            const _tmp$4 = _tmp$2 | ((_tmp$3 >>> 0 < bytes.length ? bytes[_tmp$3] : $oob()) & 63) << 6;
            const _tmp$5 = i.val + 2 | 0;
            c.val = _tmp$4 | (_tmp$5 >>> 0 < bytes.length ? bytes[_tmp$5] : $oob()) & 63;
            _M0MPC15array5Array4pushGcE(res, c.val);
            i.val = i.val + 3 | 0;
          } else {
            if ((i.val + 3 | 0) >= len) {
              break;
            }
            const _tmp$2 = (c.val & 7) << 18;
            const _tmp$3 = i.val + 1 | 0;
            const _tmp$4 = _tmp$2 | ((_tmp$3 >>> 0 < bytes.length ? bytes[_tmp$3] : $oob()) & 63) << 12;
            const _tmp$5 = i.val + 2 | 0;
            const _tmp$6 = _tmp$4 | ((_tmp$5 >>> 0 < bytes.length ? bytes[_tmp$5] : $oob()) & 63) << 6;
            const _tmp$7 = i.val + 3 | 0;
            c.val = _tmp$6 | (_tmp$7 >>> 0 < bytes.length ? bytes[_tmp$7] : $oob()) & 63;
            let hi;
            let lo;
            _L: {
              const _bind = _M0FP311moonbitlang1x7unicode21char__to__utf16__pair(c.val);
              if (_bind === undefined) {
                break;
              } else {
                const _Some = _bind;
                const _x = _Some;
                const _hi = _x._0;
                const _lo = _x._1;
                hi = _hi;
                lo = _lo;
                break _L;
              }
            }
            _M0MPC15array5Array4pushGcE(res, hi);
            _M0MPC15array5Array4pushGcE(res, lo);
            i.val = i.val + 4 | 0;
          }
        }
      }
      continue;
    } else {
      break;
    }
  }
  return _M0MPC16string6String11from__array(new _M0TPB9ArrayViewGcE(res, 0, res.length));
}
function _M0FP311moonbitlang1x2fs16read__file__sync(_tmp) {
  return readFileSync$3554(_tmp);
}
function _M0FP311moonbitlang1x2fs17write__file__sync(_tmp, _tmp$2) {
  return writeFileSync$3559(_tmp, _tmp$2);
}
function _M0FP311moonbitlang1x2fs31read__file__to__bytes__internal(path) {
  const res = _M0FP311moonbitlang1x2fs15read__file__ffi(_M0FP311moonbitlang1x2fs16read__file__sync, path);
  if (!_M0MP311moonbitlang1x2fs13FsBytesResult6is__ok(res)) {
    return new _M0DTPC16result6ResultGzRP311moonbitlang1x2fs7IOErrorE3Err(new _M0DTPC15error5Error40moonbitlang_2fx_2ffs_2eIOError_2eIOError(_M0MP311moonbitlang1x2fs13FsBytesResult14error__message(res)));
  }
  return new _M0DTPC16result6ResultGzRP311moonbitlang1x2fs7IOErrorE2Ok(_M0MP311moonbitlang1x2fs13FsBytesResult7content(res));
}
function _M0FP311moonbitlang1x2fs40read__file__to__string__internal_2einner(path, encoding) {
  if (encoding === "utf8") {
    const _bind = _M0FP311moonbitlang1x2fs31read__file__to__bytes__internal(path);
    let bytes;
    if (_bind.$tag === 1) {
      const _ok = _bind;
      bytes = _ok._0;
    } else {
      return _bind;
    }
    return new _M0DTPC16result6ResultGsRP311moonbitlang1x2fs7IOErrorE2Ok(_M0FP311moonbitlang1x7unicode16to__utf8__string(bytes));
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(54);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "Unsupported encoding: ");
    _M0MPB13StringBuilder13write__objectGsE(_string_builder, encoding);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ", only utf8 is supported for now");
    return new _M0DTPC16result6ResultGsRP311moonbitlang1x2fs7IOErrorE3Err(new _M0DTPC15error5Error40moonbitlang_2fx_2ffs_2eIOError_2eIOError(_M0MPB13StringBuilder10to__string(_string_builder)));
  }
}
function _M0FP311moonbitlang1x2fs32write__bytes__to__file__internal(path, content) {
  const res = _M0FP311moonbitlang1x2fs16write__file__ffi(_M0FP311moonbitlang1x2fs17write__file__sync, path, content);
  if (!_M0MP311moonbitlang1x2fs12FsUnitResult6is__ok(res)) {
    return new _M0DTPC16result6ResultGuRP311moonbitlang1x2fs7IOErrorE3Err(new _M0DTPC15error5Error40moonbitlang_2fx_2ffs_2eIOError_2eIOError(_M0MP311moonbitlang1x2fs12FsUnitResult14error__message(res)));
  } else {
    return new _M0DTPC16result6ResultGuRP311moonbitlang1x2fs7IOErrorE2Ok(undefined);
  }
}
function _M0FP311moonbitlang1x2fs41write__string__to__file__internal_2einner(path, content, encoding) {
  if (encoding === "utf8") {
    const bytes = _M0FP311moonbitlang1x7unicode15to__utf8__bytes(content);
    return _M0FP311moonbitlang1x2fs32write__bytes__to__file__internal(path, bytes);
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(54);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "Unsupported encoding: ");
    _M0MPB13StringBuilder13write__objectGsE(_string_builder, encoding);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ", only utf8 is supported for now");
    return new _M0DTPC16result6ResultGuRP311moonbitlang1x2fs7IOErrorE3Err(new _M0DTPC15error5Error40moonbitlang_2fx_2ffs_2eIOError_2eIOError(_M0MPB13StringBuilder10to__string(_string_builder)));
  }
}
function _M0FP311moonbitlang1x2fs30read__file__to__string_2einner(path, encoding) {
  return _M0FP311moonbitlang1x2fs40read__file__to__string__internal_2einner(path, encoding);
}
function _M0FP311moonbitlang1x2fs31write__string__to__file_2einner(path, content, encoding) {
  return _M0FP311moonbitlang1x2fs41write__string__to__file__internal_2einner(path, content, encoding);
}
function _M0FP311moonbitlang1x3sys4exit(code) {
  _M0FP511moonbitlang1x3sys8internal3ffi4exit(code);
}
function _M0IP49puruslang5purus3src5lexer9TokenKindPC15debug5Debug8to__repr(_x_166) {
  let _arg_178;
  _L: {
    let _arg_177;
    _L$2: {
      let _arg_176;
      _L$3: {
        let _arg_175;
        _L$4: {
          let _arg_174;
          _L$5: {
            let _arg_173;
            _L$6: {
              let _arg_171;
              let _arg_172;
              _L$7: {
                let _arg_170;
                _L$8: {
                  let _arg_169;
                  _L$9: {
                    let _arg_168;
                    _L$10: {
                      let _arg_167;
                      _L$11: {
                        switch (_x_166.$tag) {
                          case 0: {
                            const _Int = _x_166;
                            const _$42$arg_167 = _Int._0;
                            _arg_167 = _$42$arg_167;
                            break _L$11;
                          }
                          case 1: {
                            const _BigInt = _x_166;
                            const _$42$arg_168 = _BigInt._0;
                            _arg_168 = _$42$arg_168;
                            break _L$10;
                          }
                          case 2: {
                            const _Float = _x_166;
                            const _$42$arg_169 = _Float._0;
                            _arg_169 = _$42$arg_169;
                            break _L$9;
                          }
                          case 3: {
                            const _Str = _x_166;
                            const _$42$arg_170 = _Str._0;
                            _arg_170 = _$42$arg_170;
                            break _L$8;
                          }
                          case 4: {
                            const _Regex = _x_166;
                            const _$42$arg_171 = _Regex._0;
                            const _$42$arg_172 = _Regex._1;
                            _arg_171 = _$42$arg_171;
                            _arg_172 = _$42$arg_172;
                            break _L$7;
                          }
                          case 5: {
                            return _M0MPC15debug4Repr4ctor("True_", []);
                          }
                          case 6: {
                            return _M0MPC15debug4Repr4ctor("False_", []);
                          }
                          case 7: {
                            const _Ident = _x_166;
                            const _$42$arg_173 = _Ident._0;
                            _arg_173 = _$42$arg_173;
                            break _L$6;
                          }
                          case 8: {
                            return _M0MPC15debug4Repr4ctor("Const_", []);
                          }
                          case 9: {
                            return _M0MPC15debug4Repr4ctor("Let_", []);
                          }
                          case 10: {
                            return _M0MPC15debug4Repr4ctor("Var_", []);
                          }
                          case 11: {
                            return _M0MPC15debug4Repr4ctor("Be", []);
                          }
                          case 12: {
                            return _M0MPC15debug4Repr4ctor("Add", []);
                          }
                          case 13: {
                            return _M0MPC15debug4Repr4ctor("Sub", []);
                          }
                          case 14: {
                            return _M0MPC15debug4Repr4ctor("Mul", []);
                          }
                          case 15: {
                            return _M0MPC15debug4Repr4ctor("Div", []);
                          }
                          case 16: {
                            return _M0MPC15debug4Repr4ctor("Fdiv", []);
                          }
                          case 17: {
                            return _M0MPC15debug4Repr4ctor("Mod", []);
                          }
                          case 18: {
                            return _M0MPC15debug4Repr4ctor("Neg", []);
                          }
                          case 19: {
                            return _M0MPC15debug4Repr4ctor("Pow", []);
                          }
                          case 20: {
                            return _M0MPC15debug4Repr4ctor("Eq", []);
                          }
                          case 21: {
                            return _M0MPC15debug4Repr4ctor("Neq", []);
                          }
                          case 22: {
                            return _M0MPC15debug4Repr4ctor("Lt", []);
                          }
                          case 23: {
                            return _M0MPC15debug4Repr4ctor("Gt", []);
                          }
                          case 24: {
                            return _M0MPC15debug4Repr4ctor("Le", []);
                          }
                          case 25: {
                            return _M0MPC15debug4Repr4ctor("Ge", []);
                          }
                          case 26: {
                            return _M0MPC15debug4Repr4ctor("And", []);
                          }
                          case 27: {
                            return _M0MPC15debug4Repr4ctor("Or", []);
                          }
                          case 28: {
                            return _M0MPC15debug4Repr4ctor("Not", []);
                          }
                          case 29: {
                            return _M0MPC15debug4Repr4ctor("Coal", []);
                          }
                          case 30: {
                            return _M0MPC15debug4Repr4ctor("Band", []);
                          }
                          case 31: {
                            return _M0MPC15debug4Repr4ctor("Bor", []);
                          }
                          case 32: {
                            return _M0MPC15debug4Repr4ctor("Bxor", []);
                          }
                          case 33: {
                            return _M0MPC15debug4Repr4ctor("Bnot", []);
                          }
                          case 34: {
                            return _M0MPC15debug4Repr4ctor("Shl", []);
                          }
                          case 35: {
                            return _M0MPC15debug4Repr4ctor("Shr", []);
                          }
                          case 36: {
                            return _M0MPC15debug4Repr4ctor("Ushr", []);
                          }
                          case 37: {
                            return _M0MPC15debug4Repr4ctor("Fn", []);
                          }
                          case 38: {
                            return _M0MPC15debug4Repr4ctor("Return_", []);
                          }
                          case 39: {
                            return _M0MPC15debug4Repr4ctor("To", []);
                          }
                          case 40: {
                            return _M0MPC15debug4Repr4ctor("If_", []);
                          }
                          case 41: {
                            return _M0MPC15debug4Repr4ctor("Elif", []);
                          }
                          case 42: {
                            return _M0MPC15debug4Repr4ctor("Else_", []);
                          }
                          case 43: {
                            return _M0MPC15debug4Repr4ctor("Unless", []);
                          }
                          case 44: {
                            return _M0MPC15debug4Repr4ctor("Then_", []);
                          }
                          case 45: {
                            return _M0MPC15debug4Repr4ctor("While_", []);
                          }
                          case 46: {
                            return _M0MPC15debug4Repr4ctor("Until", []);
                          }
                          case 47: {
                            return _M0MPC15debug4Repr4ctor("Do_", []);
                          }
                          case 48: {
                            return _M0MPC15debug4Repr4ctor("Yield_", []);
                          }
                          case 49: {
                            return _M0MPC15debug4Repr4ctor("For_", []);
                          }
                          case 50: {
                            return _M0MPC15debug4Repr4ctor("In_", []);
                          }
                          case 51: {
                            return _M0MPC15debug4Repr4ctor("Range_", []);
                          }
                          case 52: {
                            return _M0MPC15debug4Repr4ctor("Break_", []);
                          }
                          case 53: {
                            return _M0MPC15debug4Repr4ctor("Continue_", []);
                          }
                          case 54: {
                            return _M0MPC15debug4Repr4ctor("Match_", []);
                          }
                          case 55: {
                            return _M0MPC15debug4Repr4ctor("When_", []);
                          }
                          case 56: {
                            return _M0MPC15debug4Repr4ctor("Switch_", []);
                          }
                          case 57: {
                            return _M0MPC15debug4Repr4ctor("Case_", []);
                          }
                          case 58: {
                            return _M0MPC15debug4Repr4ctor("Pipe_", []);
                          }
                          case 59: {
                            return _M0MPC15debug4Repr4ctor("As", []);
                          }
                          case 60: {
                            return _M0MPC15debug4Repr4ctor("Of", []);
                          }
                          case 61: {
                            return _M0MPC15debug4Repr4ctor("Gives", []);
                          }
                          case 62: {
                            return _M0MPC15debug4Repr4ctor("Typeof_", []);
                          }
                          case 63: {
                            return _M0MPC15debug4Repr4ctor("Void_", []);
                          }
                          case 64: {
                            return _M0MPC15debug4Repr4ctor("Instanceof_", []);
                          }
                          case 65: {
                            return _M0MPC15debug4Repr4ctor("New_", []);
                          }
                          case 66: {
                            return _M0MPC15debug4Repr4ctor("Delete_", []);
                          }
                          case 67: {
                            return _M0MPC15debug4Repr4ctor("This_", []);
                          }
                          case 68: {
                            return _M0MPC15debug4Repr4ctor("Async_", []);
                          }
                          case 69: {
                            return _M0MPC15debug4Repr4ctor("Await_", []);
                          }
                          case 70: {
                            return _M0MPC15debug4Repr4ctor("Try_", []);
                          }
                          case 71: {
                            return _M0MPC15debug4Repr4ctor("Catch_", []);
                          }
                          case 72: {
                            return _M0MPC15debug4Repr4ctor("Finally_", []);
                          }
                          case 73: {
                            return _M0MPC15debug4Repr4ctor("Throw_", []);
                          }
                          case 74: {
                            return _M0MPC15debug4Repr4ctor("Import_", []);
                          }
                          case 75: {
                            return _M0MPC15debug4Repr4ctor("From_", []);
                          }
                          case 76: {
                            return _M0MPC15debug4Repr4ctor("Export_", []);
                          }
                          case 77: {
                            return _M0MPC15debug4Repr4ctor("Default_", []);
                          }
                          case 78: {
                            return _M0MPC15debug4Repr4ctor("Require_", []);
                          }
                          case 79: {
                            return _M0MPC15debug4Repr4ctor("Use_", []);
                          }
                          case 80: {
                            return _M0MPC15debug4Repr4ctor("Mod_", []);
                          }
                          case 81: {
                            return _M0MPC15debug4Repr4ctor("Public_", []);
                          }
                          case 82: {
                            return _M0MPC15debug4Repr4ctor("All_", []);
                          }
                          case 83: {
                            return _M0MPC15debug4Repr4ctor("Type_", []);
                          }
                          case 84: {
                            return _M0MPC15debug4Repr4ctor("With_", []);
                          }
                          case 85: {
                            return _M0MPC15debug4Repr4ctor("Class_", []);
                          }
                          case 86: {
                            return _M0MPC15debug4Repr4ctor("Extends_", []);
                          }
                          case 87: {
                            return _M0MPC15debug4Repr4ctor("Super_", []);
                          }
                          case 88: {
                            return _M0MPC15debug4Repr4ctor("Static_", []);
                          }
                          case 89: {
                            return _M0MPC15debug4Repr4ctor("Private_", []);
                          }
                          case 90: {
                            return _M0MPC15debug4Repr4ctor("Get_", []);
                          }
                          case 91: {
                            return _M0MPC15debug4Repr4ctor("Set_", []);
                          }
                          case 92: {
                            return _M0MPC15debug4Repr4ctor("Null_", []);
                          }
                          case 93: {
                            return _M0MPC15debug4Repr4ctor("Nil_", []);
                          }
                          case 94: {
                            return _M0MPC15debug4Repr4ctor("Undefined_", []);
                          }
                          case 95: {
                            return _M0MPC15debug4Repr4ctor("Nan_", []);
                          }
                          case 96: {
                            return _M0MPC15debug4Repr4ctor("Infinity_", []);
                          }
                          case 97: {
                            return _M0MPC15debug4Repr4ctor("List_", []);
                          }
                          case 98: {
                            return _M0MPC15debug4Repr4ctor("Object_", []);
                          }
                          case 99: {
                            return _M0MPC15debug4Repr4ctor("LBracket", []);
                          }
                          case 100: {
                            return _M0MPC15debug4Repr4ctor("RBracket", []);
                          }
                          case 101: {
                            return _M0MPC15debug4Repr4ctor("Comma", []);
                          }
                          case 102: {
                            return _M0MPC15debug4Repr4ctor("Semicolon", []);
                          }
                          case 103: {
                            return _M0MPC15debug4Repr4ctor("Dot", []);
                          }
                          case 104: {
                            return _M0MPC15debug4Repr4ctor("DotDot", []);
                          }
                          case 105: {
                            return _M0MPC15debug4Repr4ctor("DotDotDot", []);
                          }
                          case 106: {
                            return _M0MPC15debug4Repr4ctor("Backslash", []);
                          }
                          case 107: {
                            return _M0MPC15debug4Repr4ctor("OptDot", []);
                          }
                          case 108: {
                            return _M0MPC15debug4Repr4ctor("Newline", []);
                          }
                          case 109: {
                            const _Indent = _x_166;
                            const _$42$arg_174 = _Indent._0;
                            _arg_174 = _$42$arg_174;
                            break _L$5;
                          }
                          case 110: {
                            const _InterpStr = _x_166;
                            const _$42$arg_175 = _InterpStr._0;
                            _arg_175 = _$42$arg_175;
                            break _L$4;
                          }
                          case 111: {
                            return _M0MPC15debug4Repr4ctor("Blank", []);
                          }
                          case 112: {
                            const _Shebang = _x_166;
                            const _$42$arg_176 = _Shebang._0;
                            _arg_176 = _$42$arg_176;
                            break _L$3;
                          }
                          case 113: {
                            const _Comment = _x_166;
                            const _$42$arg_177 = _Comment._0;
                            _arg_177 = _$42$arg_177;
                            break _L$2;
                          }
                          case 114: {
                            const _BlockComment = _x_166;
                            const _$42$arg_178 = _BlockComment._0;
                            _arg_178 = _$42$arg_178;
                            break _L;
                          }
                          default: {
                            return _M0MPC15debug4Repr4ctor("Eof", []);
                          }
                        }
                      }
                      return _M0MPC15debug4Repr4ctor("Int", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_167) }]);
                    }
                    return _M0MPC15debug4Repr4ctor("BigInt", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_168) }]);
                  }
                  return _M0MPC15debug4Repr4ctor("Float", [{ _0: undefined, _1: _M0IPC16double6DoublePC15debug5Debug8to__repr(_arg_169) }]);
                }
                return _M0MPC15debug4Repr4ctor("Str", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_170) }]);
              }
              return _M0MPC15debug4Repr4ctor("Regex", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_171) }, { _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_172) }]);
            }
            return _M0MPC15debug4Repr4ctor("Ident", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_173) }]);
          }
          return _M0MPC15debug4Repr4ctor("Indent", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_174) }]);
        }
        return _M0MPC15debug4Repr4ctor("InterpStr", [{ _0: undefined, _1: _M0IPC15array5ArrayPC15debug5Debug8to__reprGsE(_arg_175) }]);
      }
      return _M0MPC15debug4Repr4ctor("Shebang", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_176) }]);
    }
    return _M0MPC15debug4Repr4ctor("Comment", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_177) }]);
  }
  return _M0MPC15debug4Repr4ctor("BlockComment", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_178) }]);
}
function _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_x_114, _x_115) {
  let _x0_138;
  let _y0_139;
  _L: {
    let _x0_136;
    let _y0_137;
    _L$2: {
      let _x0_134;
      let _y0_135;
      _L$3: {
        let _x0_132;
        let _y0_133;
        _L$4: {
          let _x0_130;
          let _y0_131;
          _L$5: {
            let _x0_128;
            let _y0_129;
            _L$6: {
              let _x1_125;
              let _x0_124;
              let _y0_126;
              let _y1_127;
              _L$7: {
                let _x0_122;
                let _y0_123;
                _L$8: {
                  let _x0_120;
                  let _y0_121;
                  _L$9: {
                    let _x0_118;
                    let _y0_119;
                    _L$10: {
                      let _x0_116;
                      let _y0_117;
                      _L$11: {
                        switch (_x_114.$tag) {
                          case 0: {
                            const _Int = _x_114;
                            const _$42$x0_116 = _Int._0;
                            if (_x_115.$tag === 0) {
                              const _Int$2 = _x_115;
                              const _$42$y0_117 = _Int$2._0;
                              _x0_116 = _$42$x0_116;
                              _y0_117 = _$42$y0_117;
                              break _L$11;
                            } else {
                              return false;
                            }
                          }
                          case 1: {
                            const _BigInt = _x_114;
                            const _$42$x0_118 = _BigInt._0;
                            if (_x_115.$tag === 1) {
                              const _BigInt$2 = _x_115;
                              const _$42$y0_119 = _BigInt$2._0;
                              _x0_118 = _$42$x0_118;
                              _y0_119 = _$42$y0_119;
                              break _L$10;
                            } else {
                              return false;
                            }
                          }
                          case 2: {
                            const _Float = _x_114;
                            const _$42$x0_120 = _Float._0;
                            if (_x_115.$tag === 2) {
                              const _Float$2 = _x_115;
                              const _$42$y0_121 = _Float$2._0;
                              _x0_120 = _$42$x0_120;
                              _y0_121 = _$42$y0_121;
                              break _L$9;
                            } else {
                              return false;
                            }
                          }
                          case 3: {
                            const _Str = _x_114;
                            const _$42$x0_122 = _Str._0;
                            if (_x_115.$tag === 3) {
                              const _Str$2 = _x_115;
                              const _$42$y0_123 = _Str$2._0;
                              _x0_122 = _$42$x0_122;
                              _y0_123 = _$42$y0_123;
                              break _L$8;
                            } else {
                              return false;
                            }
                          }
                          case 4: {
                            const _Regex = _x_114;
                            const _$42$x0_124 = _Regex._0;
                            const _$42$x1_125 = _Regex._1;
                            if (_x_115.$tag === 4) {
                              const _Regex$2 = _x_115;
                              const _$42$y0_126 = _Regex$2._0;
                              const _$42$y1_127 = _Regex$2._1;
                              _x1_125 = _$42$x1_125;
                              _x0_124 = _$42$x0_124;
                              _y0_126 = _$42$y0_126;
                              _y1_127 = _$42$y1_127;
                              break _L$7;
                            } else {
                              return false;
                            }
                          }
                          case 5: {
                            if (_x_115.$tag === 5) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 6: {
                            if (_x_115.$tag === 6) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 7: {
                            const _Ident = _x_114;
                            const _$42$x0_128 = _Ident._0;
                            if (_x_115.$tag === 7) {
                              const _Ident$2 = _x_115;
                              const _$42$y0_129 = _Ident$2._0;
                              _x0_128 = _$42$x0_128;
                              _y0_129 = _$42$y0_129;
                              break _L$6;
                            } else {
                              return false;
                            }
                          }
                          case 8: {
                            if (_x_115.$tag === 8) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 9: {
                            if (_x_115.$tag === 9) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 10: {
                            if (_x_115.$tag === 10) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 11: {
                            if (_x_115.$tag === 11) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 12: {
                            if (_x_115.$tag === 12) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 13: {
                            if (_x_115.$tag === 13) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 14: {
                            if (_x_115.$tag === 14) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 15: {
                            if (_x_115.$tag === 15) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 16: {
                            if (_x_115.$tag === 16) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 17: {
                            if (_x_115.$tag === 17) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 18: {
                            if (_x_115.$tag === 18) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 19: {
                            if (_x_115.$tag === 19) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 20: {
                            if (_x_115.$tag === 20) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 21: {
                            if (_x_115.$tag === 21) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 22: {
                            if (_x_115.$tag === 22) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 23: {
                            if (_x_115.$tag === 23) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 24: {
                            if (_x_115.$tag === 24) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 25: {
                            if (_x_115.$tag === 25) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 26: {
                            if (_x_115.$tag === 26) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 27: {
                            if (_x_115.$tag === 27) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 28: {
                            if (_x_115.$tag === 28) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 29: {
                            if (_x_115.$tag === 29) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 30: {
                            if (_x_115.$tag === 30) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 31: {
                            if (_x_115.$tag === 31) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 32: {
                            if (_x_115.$tag === 32) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 33: {
                            if (_x_115.$tag === 33) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 34: {
                            if (_x_115.$tag === 34) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 35: {
                            if (_x_115.$tag === 35) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 36: {
                            if (_x_115.$tag === 36) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 37: {
                            if (_x_115.$tag === 37) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 38: {
                            if (_x_115.$tag === 38) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 39: {
                            if (_x_115.$tag === 39) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 40: {
                            if (_x_115.$tag === 40) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 41: {
                            if (_x_115.$tag === 41) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 42: {
                            if (_x_115.$tag === 42) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 43: {
                            if (_x_115.$tag === 43) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 44: {
                            if (_x_115.$tag === 44) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 45: {
                            if (_x_115.$tag === 45) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 46: {
                            if (_x_115.$tag === 46) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 47: {
                            if (_x_115.$tag === 47) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 48: {
                            if (_x_115.$tag === 48) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 49: {
                            if (_x_115.$tag === 49) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 50: {
                            if (_x_115.$tag === 50) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 51: {
                            if (_x_115.$tag === 51) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 52: {
                            if (_x_115.$tag === 52) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 53: {
                            if (_x_115.$tag === 53) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 54: {
                            if (_x_115.$tag === 54) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 55: {
                            if (_x_115.$tag === 55) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 56: {
                            if (_x_115.$tag === 56) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 57: {
                            if (_x_115.$tag === 57) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 58: {
                            if (_x_115.$tag === 58) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 59: {
                            if (_x_115.$tag === 59) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 60: {
                            if (_x_115.$tag === 60) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 61: {
                            if (_x_115.$tag === 61) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 62: {
                            if (_x_115.$tag === 62) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 63: {
                            if (_x_115.$tag === 63) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 64: {
                            if (_x_115.$tag === 64) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 65: {
                            if (_x_115.$tag === 65) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 66: {
                            if (_x_115.$tag === 66) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 67: {
                            if (_x_115.$tag === 67) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 68: {
                            if (_x_115.$tag === 68) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 69: {
                            if (_x_115.$tag === 69) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 70: {
                            if (_x_115.$tag === 70) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 71: {
                            if (_x_115.$tag === 71) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 72: {
                            if (_x_115.$tag === 72) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 73: {
                            if (_x_115.$tag === 73) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 74: {
                            if (_x_115.$tag === 74) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 75: {
                            if (_x_115.$tag === 75) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 76: {
                            if (_x_115.$tag === 76) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 77: {
                            if (_x_115.$tag === 77) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 78: {
                            if (_x_115.$tag === 78) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 79: {
                            if (_x_115.$tag === 79) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 80: {
                            if (_x_115.$tag === 80) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 81: {
                            if (_x_115.$tag === 81) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 82: {
                            if (_x_115.$tag === 82) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 83: {
                            if (_x_115.$tag === 83) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 84: {
                            if (_x_115.$tag === 84) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 85: {
                            if (_x_115.$tag === 85) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 86: {
                            if (_x_115.$tag === 86) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 87: {
                            if (_x_115.$tag === 87) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 88: {
                            if (_x_115.$tag === 88) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 89: {
                            if (_x_115.$tag === 89) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 90: {
                            if (_x_115.$tag === 90) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 91: {
                            if (_x_115.$tag === 91) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 92: {
                            if (_x_115.$tag === 92) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 93: {
                            if (_x_115.$tag === 93) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 94: {
                            if (_x_115.$tag === 94) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 95: {
                            if (_x_115.$tag === 95) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 96: {
                            if (_x_115.$tag === 96) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 97: {
                            if (_x_115.$tag === 97) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 98: {
                            if (_x_115.$tag === 98) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 99: {
                            if (_x_115.$tag === 99) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 100: {
                            if (_x_115.$tag === 100) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 101: {
                            if (_x_115.$tag === 101) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 102: {
                            if (_x_115.$tag === 102) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 103: {
                            if (_x_115.$tag === 103) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 104: {
                            if (_x_115.$tag === 104) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 105: {
                            if (_x_115.$tag === 105) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 106: {
                            if (_x_115.$tag === 106) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 107: {
                            if (_x_115.$tag === 107) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 108: {
                            if (_x_115.$tag === 108) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 109: {
                            const _Indent = _x_114;
                            const _$42$x0_130 = _Indent._0;
                            if (_x_115.$tag === 109) {
                              const _Indent$2 = _x_115;
                              const _$42$y0_131 = _Indent$2._0;
                              _x0_130 = _$42$x0_130;
                              _y0_131 = _$42$y0_131;
                              break _L$5;
                            } else {
                              return false;
                            }
                          }
                          case 110: {
                            const _InterpStr = _x_114;
                            const _$42$x0_132 = _InterpStr._0;
                            if (_x_115.$tag === 110) {
                              const _InterpStr$2 = _x_115;
                              const _$42$y0_133 = _InterpStr$2._0;
                              _x0_132 = _$42$x0_132;
                              _y0_133 = _$42$y0_133;
                              break _L$4;
                            } else {
                              return false;
                            }
                          }
                          case 111: {
                            if (_x_115.$tag === 111) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                          case 112: {
                            const _Shebang = _x_114;
                            const _$42$x0_134 = _Shebang._0;
                            if (_x_115.$tag === 112) {
                              const _Shebang$2 = _x_115;
                              const _$42$y0_135 = _Shebang$2._0;
                              _x0_134 = _$42$x0_134;
                              _y0_135 = _$42$y0_135;
                              break _L$3;
                            } else {
                              return false;
                            }
                          }
                          case 113: {
                            const _Comment = _x_114;
                            const _$42$x0_136 = _Comment._0;
                            if (_x_115.$tag === 113) {
                              const _Comment$2 = _x_115;
                              const _$42$y0_137 = _Comment$2._0;
                              _x0_136 = _$42$x0_136;
                              _y0_137 = _$42$y0_137;
                              break _L$2;
                            } else {
                              return false;
                            }
                          }
                          case 114: {
                            const _BlockComment = _x_114;
                            const _$42$x0_138 = _BlockComment._0;
                            if (_x_115.$tag === 114) {
                              const _BlockComment$2 = _x_115;
                              const _$42$y0_139 = _BlockComment$2._0;
                              _x0_138 = _$42$x0_138;
                              _y0_139 = _$42$y0_139;
                              break _L;
                            } else {
                              return false;
                            }
                          }
                          default: {
                            if (_x_115.$tag === 115) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }
                      }
                      return _x0_116 === _y0_117;
                    }
                    return _x0_118 === _y0_119;
                  }
                  return _x0_120 === _y0_121;
                }
                return _x0_122 === _y0_123;
              }
              return _x0_124 === _y0_126 && _x1_125 === _y1_127;
            }
            return _x0_128 === _y0_129;
          }
          return _x0_130 === _y0_131;
        }
        return _M0IPC15array5ArrayPB2Eq5equalGsE(_x0_132, _y0_133);
      }
      return _x0_134 === _y0_135;
    }
    return _x0_136 === _y0_137;
  }
  return _x0_138 === _y0_139;
}
function _M0IP49puruslang5purus3src5lexer9TokenKindPB4Show6output(self, logger) {
  logger.method_table.method_0(logger.self, _M0FPC15debug10to__stringGRP49puruslang5purus3src5lexer9TokenKindE(self));
}
function _M0MP49puruslang5purus3src5lexer5Lexer3new(source) {
  const chars = _M0MPC16string6String9to__array(source);
  return new _M0TP49puruslang5purus3src5lexer5Lexer(chars, 0, 1, 1, []);
}
function _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) {
  return self.pos >= self.chars.length ? 0 : _M0MPC15array5Array2atGcE(self.chars, self.pos);
}
function _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, offset) {
  const i = self.pos + offset | 0;
  return i >= self.chars.length ? 0 : _M0MPC15array5Array2atGcE(self.chars, i);
}
function _M0MP49puruslang5purus3src5lexer5Lexer7advance(self) {
  const ch = _M0MP49puruslang5purus3src5lexer5Lexer4peek(self);
  self.pos = self.pos + 1 | 0;
  if (ch === 10) {
    self.line = self.line + 1 | 0;
    self.col = 1;
  } else {
    self.col = self.col + 1 | 0;
  }
  return ch;
}
function _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, kind, line, col) {
  _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(self.tokens, new _M0TP49puruslang5purus3src5lexer5Token(kind, line, col));
}
function _M0FP49puruslang5purus3src5lexer16is__ident__start(ch) {
  return ch >= 97 && ch <= 122 || (ch >= 65 && ch <= 90 || (ch === 45 || ch === 95));
}
function _M0FP49puruslang5purus3src5lexer15is__ident__char(ch) {
  return _M0FP49puruslang5purus3src5lexer16is__ident__start(ch) || ch >= 48 && ch <= 57;
}
function _M0FP49puruslang5purus3src5lexer9is__digit(ch) {
  return ch >= 48 && ch <= 57;
}
function _M0FP49puruslang5purus3src5lexer14is__hex__digit(ch) {
  return ch >= 48 && ch <= 57 || (ch >= 97 && ch <= 102 || ch >= 65 && ch <= 70);
}
function _M0FP49puruslang5purus3src5lexer10parse__int(s) {
  const chars = _M0MPC16string6String9to__array(s);
  const result = new _M0TPB8MutLocalGiE(0);
  const i = new _M0TPB8MutLocalGiE(0);
  const negative = chars.length > 0 && _M0MPC15array5Array2atGcE(chars, 0) === 45;
  if (negative) {
    i.val = 1;
  }
  while (true) {
    if (i.val < chars.length) {
      result.val = (Math.imul(result.val, 10) | 0) + (_M0MPC15array5Array2atGcE(chars, i.val) - 48 | 0) | 0;
      i.val = i.val + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return negative ? -result.val | 0 : result.val;
}
function _M0FP49puruslang5purus3src5lexer13parse__double(s) {
  const chars = _M0MPC16string6String9to__array(s);
  const integer_part = new _M0TPB8MutLocalGdE(0);
  const i = new _M0TPB8MutLocalGiE(0);
  const negative = chars.length > 0 && _M0MPC15array5Array2atGcE(chars, 0) === 45;
  if (negative) {
    i.val = 1;
  }
  while (true) {
    if (i.val < chars.length && _M0MPC15array5Array2atGcE(chars, i.val) !== 46) {
      integer_part.val = integer_part.val * 10 + ((_M0MPC15array5Array2atGcE(chars, i.val) - 48 | 0) + 0);
      i.val = i.val + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const frac_part = new _M0TPB8MutLocalGdE(0);
  if (i.val < chars.length && _M0MPC15array5Array2atGcE(chars, i.val) === 46) {
    i.val = i.val + 1 | 0;
    const divisor = new _M0TPB8MutLocalGdE(10);
    while (true) {
      if (i.val < chars.length) {
        frac_part.val = frac_part.val + ((_M0MPC15array5Array2atGcE(chars, i.val) - 48 | 0) + 0) / divisor.val;
        divisor.val = divisor.val * 10;
        i.val = i.val + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  const result = integer_part.val + frac_part.val;
  return negative ? -result : result;
}
function _M0MP49puruslang5purus3src5lexer5Lexer25is__neg__literal__context(self) {
  if (_M0MPC15array5Array9is__emptyGRP49puruslang5purus3src5lexer5TokenE(self.tokens)) {
    return true;
  }
  const last = _M0MPC15array5Array2atGsE(self.tokens, self.tokens.length - 1 | 0);
  const _bind = last.kind;
  switch (_bind.$tag) {
    case 99: {
      return true;
    }
    case 101: {
      return true;
    }
    case 102: {
      return true;
    }
    case 11: {
      return true;
    }
    case 108: {
      return true;
    }
    case 109: {
      return true;
    }
    case 38: {
      return true;
    }
    case 39: {
      return true;
    }
    case 44: {
      return true;
    }
    case 29: {
      return true;
    }
    case 106: {
      return true;
    }
    default: {
      return false;
    }
  }
}
function _M0MP49puruslang5purus3src5lexer5Lexer20scan__block__comment(self) {
  const line = self.line;
  const col = self.col;
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  while (true) {
    if (self.pos < self.chars.length) {
      if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 45 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 45 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 2) === 45)) {
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        break;
      }
      _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      continue;
    } else {
      break;
    }
  }
  _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind12BlockComment(_M0MPB13StringBuilder10to__string(buf)), line, col);
}
function _M0MP49puruslang5purus3src5lexer5Lexer11scan__ident(self) {
  const line = self.line;
  const col = self.col;
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
  while (true) {
    if (self.pos < self.chars.length && _M0FP49puruslang5purus3src5lexer15is__ident__char(_M0MP49puruslang5purus3src5lexer5Lexer4peek(self))) {
      _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      continue;
    } else {
      break;
    }
  }
  const word = _M0MPB13StringBuilder10to__string(buf);
  let kind;
  switch (word) {
    case "const": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Const____;
      break;
    }
    case "let": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Let____;
      break;
    }
    case "var": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Var____;
      break;
    }
    case "be": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__;
      break;
    }
    case "add": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Add__;
      break;
    }
    case "sub": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Sub__;
      break;
    }
    case "mul": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Mul__;
      break;
    }
    case "div": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Div__;
      break;
    }
    case "fdiv": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4Fdiv__;
      break;
    }
    case "mod": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Mod__;
      break;
    }
    case "neg": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Neg__;
      break;
    }
    case "pow": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Pow__;
      break;
    }
    case "eq": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Eq__;
      break;
    }
    case "neq": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Neq__;
      break;
    }
    case "lt": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Lt__;
      break;
    }
    case "gt": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Gt__;
      break;
    }
    case "le": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Le__;
      break;
    }
    case "ge": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Ge__;
      break;
    }
    case "and": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3And__;
      break;
    }
    case "or": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Or__;
      break;
    }
    case "not": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Not__;
      break;
    }
    case "fn": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__;
      break;
    }
    case "return": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Return____;
      break;
    }
    case "to": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2To__;
      break;
    }
    case "if": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4If____;
      break;
    }
    case "elif": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4Elif__;
      break;
    }
    case "else": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6Else____;
      break;
    }
    case "unless": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6Unless__;
      break;
    }
    case "then": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6Then____;
      break;
    }
    case "while": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7While____;
      break;
    }
    case "until": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Until__;
      break;
    }
    case "do": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4Do____;
      break;
    }
    case "yield": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Yield____;
      break;
    }
    case "for": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5For____;
      break;
    }
    case "in": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4In____;
      break;
    }
    case "range": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Range____;
      break;
    }
    case "break": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Break____;
      break;
    }
    case "continue": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind10Continue____;
      break;
    }
    case "match": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Match____;
      break;
    }
    case "when": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6When____;
      break;
    }
    case "switch": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Switch____;
      break;
    }
    case "case": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6Case____;
      break;
    }
    case "pipe": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6Pipe____;
      break;
    }
    case "as": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2As__;
      break;
    }
    case "of": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Of__;
      break;
    }
    case "gives": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__;
      break;
    }
    case "typeof": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Typeof____;
      break;
    }
    case "void": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6Void____;
      break;
    }
    case "instanceof": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind12Instanceof____;
      break;
    }
    case "new": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5New____;
      break;
    }
    case "delete": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Delete____;
      break;
    }
    case "this": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6This____;
      break;
    }
    case "async": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Async____;
      break;
    }
    case "await": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Await____;
      break;
    }
    case "try": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Try____;
      break;
    }
    case "catch": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Catch____;
      break;
    }
    case "finally": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind9Finally____;
      break;
    }
    case "throw": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Throw____;
      break;
    }
    case "import": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Import____;
      break;
    }
    case "from": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6From____;
      break;
    }
    case "export": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Export____;
      break;
    }
    case "default": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind9Default____;
      break;
    }
    case "require": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind9Require____;
      break;
    }
    case "use": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Use____;
      break;
    }
    case "namespace": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Mod____;
      break;
    }
    case "public": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Public____;
      break;
    }
    case "all": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5All____;
      break;
    }
    case "type": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6Type____;
      break;
    }
    case "with": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6With____;
      break;
    }
    case "true": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6True____;
      break;
    }
    case "false": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7False____;
      break;
    }
    case "null": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6Null____;
      break;
    }
    case "nil": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Nil____;
      break;
    }
    case "undefined": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind11Undefined____;
      break;
    }
    case "nan": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Nan____;
      break;
    }
    case "infinity": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind10Infinity____;
      break;
    }
    case "coal": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4Coal__;
      break;
    }
    case "band": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4Band__;
      break;
    }
    case "bor": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Bor__;
      break;
    }
    case "bxor": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4Bxor__;
      break;
    }
    case "bnot": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4Bnot__;
      break;
    }
    case "shl": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Shl__;
      break;
    }
    case "shr": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind3Shr__;
      break;
    }
    case "ushr": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind4Ushr__;
      break;
    }
    case "list": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind6List____;
      break;
    }
    case "object": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Object____;
      break;
    }
    case "class": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Class____;
      break;
    }
    case "extends": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind9Extends____;
      break;
    }
    case "super": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind7Super____;
      break;
    }
    case "static": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind8Static____;
      break;
    }
    case "private": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind9Private____;
      break;
    }
    case "protected": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind9Private____;
      break;
    }
    case "function": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__;
      break;
    }
    case "get": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Get____;
      break;
    }
    case "set": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Set____;
      break;
    }
    case "blank": {
      kind = _M0DTP49puruslang5purus3src5lexer9TokenKind5Blank__;
      break;
    }
    default: {
      kind = new _M0DTP49puruslang5purus3src5lexer9TokenKind5Ident(word);
    }
  }
  _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, kind, line, col);
}
function _M0MP49puruslang5purus3src5lexer5Lexer19scan__line__comment(self) {
  const line = self.line;
  const col = self.col;
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  while (true) {
    if (self.pos < self.chars.length && _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) !== 10) {
      _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      continue;
    } else {
      break;
    }
  }
  _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind7Comment(_M0MPB13StringBuilder10to__string(buf)), line, col);
}
function _M0MP49puruslang5purus3src5lexer5Lexer17scan__line__start(self) {
  const spaces = new _M0TPB8MutLocalGiE(0);
  while (true) {
    if (self.pos < self.chars.length) {
      const ch = _M0MP49puruslang5purus3src5lexer5Lexer4peek(self);
      if (ch === 32) {
        spaces.val = spaces.val + 1 | 0;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
      } else {
        if (ch === 9) {
          spaces.val = spaces.val + 2 | 0;
          _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        } else {
          break;
        }
      }
      continue;
    } else {
      break;
    }
  }
  if (self.pos < self.chars.length && _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) !== 10) {
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind6Indent(spaces.val), self.line, 1);
    return;
  } else {
    return;
  }
}
function _M0MP49puruslang5purus3src5lexer5Lexer12scan__number(self) {
  const line = self.line;
  const col = self.col;
  const negative = _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 45;
  if (negative) {
    _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  }
  if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 48 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 98 || _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 66)) {
    _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
    _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
    const value = new _M0TPB8MutLocalGiE(0);
    while (true) {
      if (self.pos < self.chars.length && (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 48 || _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 49)) {
        value.val = (Math.imul(value.val, 2) | 0) + (_M0MP49puruslang5purus3src5lexer5Lexer7advance(self) - 48 | 0) | 0;
        continue;
      } else {
        break;
      }
    }
    if (negative) {
      value.val = -value.val | 0;
    }
    if (self.pos < self.chars.length && _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 110) {
      _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
      _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind6BigInt(_M0MPC13int3Int18to__string_2einner(value.val, 10)), line, col);
      return undefined;
    }
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind3Int(value.val), line, col);
    return undefined;
  }
  if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 48 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 120 || _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 88)) {
    _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
    _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
    const value = new _M0TPB8MutLocalGiE(0);
    while (true) {
      if (self.pos < self.chars.length && _M0FP49puruslang5purus3src5lexer14is__hex__digit(_M0MP49puruslang5purus3src5lexer5Lexer4peek(self))) {
        const ch = _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        const digit = ch >= 48 && ch <= 57 ? ch - 48 | 0 : ch >= 97 && ch <= 102 ? (ch - 97 | 0) + 10 | 0 : (ch - 65 | 0) + 10 | 0;
        value.val = (Math.imul(value.val, 16) | 0) + digit | 0;
        continue;
      } else {
        break;
      }
    }
    if (negative) {
      value.val = -value.val | 0;
    }
    if (self.pos < self.chars.length && _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 110) {
      _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
      _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind6BigInt(_M0MPC13int3Int18to__string_2einner(value.val, 10)), line, col);
      return undefined;
    }
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind3Int(value.val), line, col);
    return undefined;
  }
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  if (negative) {
    _M0IPB13StringBuilderPB6Logger11write__char(buf, 45);
  }
  while (true) {
    if (self.pos < self.chars.length && _M0FP49puruslang5purus3src5lexer9is__digit(_M0MP49puruslang5purus3src5lexer5Lexer4peek(self))) {
      _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      continue;
    } else {
      break;
    }
  }
  if (self.pos < self.chars.length && (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 46 && _M0FP49puruslang5purus3src5lexer9is__digit(_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1)))) {
    _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
    while (true) {
      if (self.pos < self.chars.length && _M0FP49puruslang5purus3src5lexer9is__digit(_M0MP49puruslang5purus3src5lexer5Lexer4peek(self))) {
        _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
        continue;
      } else {
        break;
      }
    }
    const s = _M0MPB13StringBuilder10to__string(buf);
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind5Float(_M0FP49puruslang5purus3src5lexer13parse__double(s)), line, col);
    return;
  } else {
    const s = _M0MPB13StringBuilder10to__string(buf);
    if (self.pos < self.chars.length && _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 110) {
      _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
      _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind6BigInt(s), line, col);
      return;
    } else {
      _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind3Int(_M0FP49puruslang5purus3src5lexer10parse__int(s)), line, col);
      return;
    }
  }
}
function _M0MP49puruslang5purus3src5lexer5Lexer11scan__regex(self) {
  const line = self.line;
  const col = self.col;
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  const pattern = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  while (true) {
    if (self.pos < self.chars.length && _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) !== 47) {
      if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 92) {
        _M0IPB13StringBuilderPB6Logger11write__char(pattern, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
        if (self.pos < self.chars.length) {
          _M0IPB13StringBuilderPB6Logger11write__char(pattern, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
        }
        continue;
      }
      _M0IPB13StringBuilderPB6Logger11write__char(pattern, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      continue;
    } else {
      break;
    }
  }
  if (self.pos < self.chars.length) {
    _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  }
  const flags = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  while (true) {
    if (self.pos < self.chars.length) {
      const ch = _M0MP49puruslang5purus3src5lexer5Lexer4peek(self);
      if (ch === 103 || (ch === 105 || (ch === 109 || (ch === 115 || (ch === 117 || ch === 121))))) {
        _M0IPB13StringBuilderPB6Logger11write__char(flags, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      } else {
        break;
      }
      continue;
    } else {
      break;
    }
  }
  _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind5Regex(_M0MPB13StringBuilder10to__string(pattern), _M0MPB13StringBuilder10to__string(flags)), line, col);
}
function _M0MP49puruslang5purus3src5lexer5Lexer13scan__shebang(self) {
  const line = self.line;
  const col = self.col;
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  while (true) {
    if (self.pos < self.chars.length && _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) !== 10) {
      _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      continue;
    } else {
      break;
    }
  }
  _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind7Shebang(_M0MPB13StringBuilder10to__string(buf)), line, col);
  if (self.pos < self.chars.length && _M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 10) {
    _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind7Newline__, self.line - 1 | 0, self.col);
    return;
  } else {
    return;
  }
}
function _M0MP49puruslang5purus3src5lexer5Lexer12scan__string(self) {
  const line = self.line;
  const col = self.col;
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  const segments = [];
  const buf = new _M0TPB8MutLocalGRPB13StringBuilderE(_M0MPB13StringBuilder21StringBuilder_2einner(0));
  const has_interp = new _M0TPB8MutLocalGbE(false);
  while (true) {
    if (self.pos < self.chars.length) {
      if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 47 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 47 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 2) === 47)) {
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        break;
      }
      if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 92) {
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        const esc = _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        switch (esc) {
          case 110: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 10);
            break;
          }
          case 116: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 9);
            break;
          }
          case 92: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 92);
            break;
          }
          case 47: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 47);
            break;
          }
          case 91: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 91);
            break;
          }
          case 93: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 93);
            break;
          }
          default: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 92);
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, esc);
          }
        }
        continue;
      }
      if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 91) {
        has_interp.val = true;
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(segments, _M0MPB13StringBuilder10to__string(buf.val));
        buf.val = _M0MPB13StringBuilder21StringBuilder_2einner(0);
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        const expr_buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
        const depth = new _M0TPB8MutLocalGiE(1);
        while (true) {
          if (self.pos < self.chars.length && depth.val > 0) {
            const ch = _M0MP49puruslang5purus3src5lexer5Lexer4peek(self);
            if (ch === 91) {
              depth.val = depth.val + 1 | 0;
            }
            if (ch === 93) {
              depth.val = depth.val - 1 | 0;
              if (depth.val === 0) {
                _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
                break;
              }
            }
            _M0IPB13StringBuilderPB6Logger11write__char(expr_buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
            continue;
          } else {
            break;
          }
        }
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(segments, _M0MPB13StringBuilder10to__string(expr_buf));
        continue;
      }
      _M0IPB13StringBuilderPB6Logger11write__char(buf.val, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      continue;
    } else {
      break;
    }
  }
  if (has_interp.val) {
    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(segments, _M0MPB13StringBuilder10to__string(buf.val));
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind9InterpStr(segments), line, col);
    return;
  } else {
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind3Str(_M0MPB13StringBuilder10to__string(buf.val)), line, col);
    return;
  }
}
function _M0MP49puruslang5purus3src5lexer5Lexer21scan__string__bracket(self) {
  const line = self.line;
  const col = self.col;
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
  const segments = [];
  const buf = new _M0TPB8MutLocalGRPB13StringBuilderE(_M0MPB13StringBuilder21StringBuilder_2einner(0));
  const has_interp = new _M0TPB8MutLocalGbE(false);
  while (true) {
    if (self.pos < self.chars.length) {
      if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 59 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 47 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 2) === 47)) {
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        break;
      }
      if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 92) {
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        const esc = _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        switch (esc) {
          case 110: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 10);
            break;
          }
          case 116: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 9);
            break;
          }
          case 92: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 92);
            break;
          }
          case 47: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 47);
            break;
          }
          case 91: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 91);
            break;
          }
          case 93: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 93);
            break;
          }
          case 59: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 59);
            break;
          }
          default: {
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, 92);
            _M0IPB13StringBuilderPB6Logger11write__char(buf.val, esc);
          }
        }
        continue;
      }
      if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 91) {
        has_interp.val = true;
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(segments, _M0MPB13StringBuilder10to__string(buf.val));
        buf.val = _M0MPB13StringBuilder21StringBuilder_2einner(0);
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        const expr_buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
        const depth = new _M0TPB8MutLocalGiE(1);
        while (true) {
          if (self.pos < self.chars.length && depth.val > 0) {
            const ch = _M0MP49puruslang5purus3src5lexer5Lexer4peek(self);
            if (ch === 91) {
              depth.val = depth.val + 1 | 0;
            }
            if (ch === 93) {
              depth.val = depth.val - 1 | 0;
              if (depth.val === 0) {
                _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
                break;
              }
            }
            _M0IPB13StringBuilderPB6Logger11write__char(expr_buf, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
            continue;
          } else {
            break;
          }
        }
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(segments, _M0MPB13StringBuilder10to__string(expr_buf));
        continue;
      }
      _M0IPB13StringBuilderPB6Logger11write__char(buf.val, _M0MP49puruslang5purus3src5lexer5Lexer7advance(self));
      continue;
    } else {
      break;
    }
  }
  if (has_interp.val) {
    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(segments, _M0MPB13StringBuilder10to__string(buf.val));
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind9InterpStr(segments), line, col);
    return;
  } else {
    _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, new _M0DTP49puruslang5purus3src5lexer9TokenKind3Str(_M0MPB13StringBuilder10to__string(buf.val)), line, col);
    return;
  }
}
function _M0MP49puruslang5purus3src5lexer5Lexer8tokenize(self) {
  if (self.pos === 0 && (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 35 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 33)) {
    _M0MP49puruslang5purus3src5lexer5Lexer13scan__shebang(self);
  }
  _M0MP49puruslang5purus3src5lexer5Lexer17scan__line__start(self);
  while (true) {
    if (self.pos < self.chars.length) {
      const ch = _M0MP49puruslang5purus3src5lexer5Lexer4peek(self);
      if (ch === 10) {
        const line = self.line;
        const col = self.col;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind7Newline__, line, col);
        _M0MP49puruslang5purus3src5lexer5Lexer17scan__line__start(self);
        continue;
      }
      if (ch === 32 || (ch === 9 || ch === 13)) {
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        continue;
      }
      if (ch === 45 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 45 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 2) === 45)) {
        _M0MP49puruslang5purus3src5lexer5Lexer20scan__block__comment(self);
        continue;
      }
      if (ch === 45 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 45) {
        _M0MP49puruslang5purus3src5lexer5Lexer19scan__line__comment(self);
        continue;
      }
      if (ch === 47 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 47 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 2) === 47)) {
        _M0MP49puruslang5purus3src5lexer5Lexer12scan__string(self);
        continue;
      }
      if (ch === 47 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 47 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 2) === 59)) {
        _M0MP49puruslang5purus3src5lexer5Lexer21scan__string__bracket(self);
        continue;
      }
      if (ch === 47 && _M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) !== 47) {
        _M0MP49puruslang5purus3src5lexer5Lexer11scan__regex(self);
        continue;
      }
      if (_M0FP49puruslang5purus3src5lexer9is__digit(ch)) {
        _M0MP49puruslang5purus3src5lexer5Lexer12scan__number(self);
        continue;
      }
      if (ch === 45 && _M0FP49puruslang5purus3src5lexer9is__digit(_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1))) {
        if (_M0MP49puruslang5purus3src5lexer5Lexer25is__neg__literal__context(self)) {
          _M0MP49puruslang5purus3src5lexer5Lexer12scan__number(self);
          continue;
        }
      }
      if (ch === 45 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 1) === 105 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 2) === 110 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 3) === 102 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 4) === 105 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 5) === 110 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 6) === 105 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 7) === 116 && (_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 8) === 121 && !_M0FP49puruslang5purus3src5lexer15is__ident__char(_M0MP49puruslang5purus3src5lexer5Lexer8peek__at(self, 9))))))))))) {
        const line = self.line;
        const col = self.col;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind3Neg__, line, col);
        _M0MP49puruslang5purus3src5lexer5Lexer11scan__ident(self);
        continue;
      }
      if (ch === 91) {
        const line = self.line;
        const col = self.col;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__, line, col);
        continue;
      }
      if (ch === 93) {
        const line = self.line;
        const col = self.col;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__, line, col);
        continue;
      }
      if (ch === 44) {
        const line = self.line;
        const col = self.col;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__, line, col);
        continue;
      }
      if (ch === 59) {
        const line = self.line;
        const col = self.col;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__, line, col);
        continue;
      }
      if (ch === 46) {
        const line = self.line;
        const col = self.col;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 46) {
          _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
          if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 46) {
            _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
            _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind9DotDotDot__, line, col);
          } else {
            _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6DotDot__, line, col);
          }
        } else {
          _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind3Dot__, line, col);
        }
        continue;
      }
      if (_M0FP49puruslang5purus3src5lexer16is__ident__start(ch) && (ch !== 45 && ch !== 95)) {
        _M0MP49puruslang5purus3src5lexer5Lexer11scan__ident(self);
        continue;
      }
      if (ch === 95) {
        _M0MP49puruslang5purus3src5lexer5Lexer11scan__ident(self);
        continue;
      }
      if (ch === 92) {
        const line = self.line;
        const col = self.col;
        _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
        if (_M0MP49puruslang5purus3src5lexer5Lexer4peek(self) === 46) {
          _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
          _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6OptDot__, line, col);
        } else {
          _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind9Backslash__, line, col);
        }
        continue;
      }
      _M0MP49puruslang5purus3src5lexer5Lexer7advance(self);
      continue;
    } else {
      break;
    }
  }
  _M0MP49puruslang5purus3src5lexer5Lexer4emit(self, _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof__, self.line, self.col);
  return self.tokens;
}
function _M0MP49puruslang5purus3src6parser6Parser4peek(self) {
  return self.pos >= self.tokens.length ? _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof__ : _M0MPC15array5Array2atGsE(self.tokens, self.pos).kind;
}
function _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self) {
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      _L$2: {
        const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
        switch (_bind.$tag) {
          case 108: {
            break _L$2;
          }
          case 109: {
            break _L$2;
          }
          case 113: {
            break _L$2;
          }
          case 114: {
            break _L$2;
          }
          default: {
            return;
          }
        }
      }
      self.pos = self.pos + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MP49puruslang5purus3src6parser6Parser21is__computed__bracket(self) {
  const i = new _M0TPB8MutLocalGiE(self.pos + 1 | 0);
  while (true) {
    if (i.val < self.tokens.length) {
      _L: {
        const _bind = _M0MPC15array5Array2atGsE(self.tokens, i.val).kind;
        switch (_bind.$tag) {
          case 108: {
            break _L;
          }
          case 109: {
            break _L;
          }
          case 113: {
            break _L;
          }
          case 114: {
            break _L;
          }
          case 106: {
            return true;
          }
          default: {
            return false;
          }
        }
      }
      i.val = i.val + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0MP49puruslang5purus3src6parser6Parser7advance(self) {
  const tok = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
  self.pos = self.pos + 1 | 0;
  return tok;
}
function _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self) {
  const _bind = _M0MP49puruslang5purus3src6parser6Parser7advance(self);
  switch (_bind.$tag) {
    case 7: {
      const _Ident = _bind;
      const _s = _Ident._0;
      return _s;
    }
    case 75: {
      return "from";
    }
    case 77: {
      return "default";
    }
    case 66: {
      return "delete";
    }
    case 90: {
      return "get";
    }
    case 91: {
      return "set";
    }
    case 65: {
      return "new";
    }
    case 50: {
      return "in";
    }
    case 60: {
      return "of";
    }
    case 59: {
      return "as";
    }
    case 83: {
      return "type";
    }
    case 82: {
      return "all";
    }
    case 97: {
      return "list";
    }
    case 98: {
      return "object";
    }
    case 38: {
      return "return";
    }
    case 76: {
      return "export";
    }
    case 74: {
      return "import";
    }
    case 88: {
      return "static";
    }
    case 89: {
      return "private";
    }
    case 81: {
      return "public";
    }
    case 85: {
      return "class";
    }
    case 87: {
      return "super";
    }
    case 86: {
      return "extends";
    }
    case 67: {
      return "this";
    }
    default: {
      return "unknown";
    }
  }
}
function _M0MP49puruslang5purus3src6parser6Parser8position(self) {
  if (self.tokens.length === 0) {
    return "1:1";
  }
  const idx = self.pos >= self.tokens.length ? self.tokens.length - 1 | 0 : self.pos;
  const tok = _M0MPC15array5Array2atGsE(self.tokens, idx);
  return `${_M0MPC13int3Int18to__string_2einner(tok.line, 10)}:${_M0MPC13int3Int18to__string_2einner(tok.col, 10)}`;
}
function _M0MP49puruslang5purus3src6parser6Parser6expect(self, expected) {
  const at = _M0MP49puruslang5purus3src6parser6Parser8position(self);
  const got = _M0MP49puruslang5purus3src6parser6Parser7advance(self);
  if (_M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(got, expected)) {
    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(self.errors, `${at}: expected ${_M0IP016_24default__implPB4Show10to__stringGRP49puruslang5purus3src5lexer9TokenKindE(expected)} but found ${_M0IP016_24default__implPB4Show10to__stringGRP49puruslang5purus3src5lexer9TokenKindE(got)}`);
    return;
  } else {
    return;
  }
}
function _M0MP49puruslang5purus3src6parser6Parser3new(tokens) {
  return new _M0TP49puruslang5purus3src6parser6Parser(tokens, 0, []);
}
function _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self) {
  const depth = new _M0TPB8MutLocalGiE(0);
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      _L$2: {
        _L$3: {
          _L$4: {
            _L$5: {
              const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
              switch (_bind.$tag) {
                case 99: {
                  depth.val = depth.val + 1 | 0;
                  self.pos = self.pos + 1 | 0;
                  break;
                }
                case 100: {
                  if (depth.val === 0) {
                    return;
                  } else {
                    depth.val = depth.val - 1 | 0;
                    self.pos = self.pos + 1 | 0;
                  }
                  break;
                }
                case 11: {
                  if (depth.val === 0) {
                    break _L$5;
                  } else {
                    break _L$3;
                  }
                }
                case 39: {
                  if (depth.val === 0) {
                    break _L$5;
                  } else {
                    break _L$3;
                  }
                }
                case 61: {
                  if (depth.val === 0) {
                    break _L$5;
                  } else {
                    break _L$3;
                  }
                }
                case 102: {
                  if (depth.val === 0) {
                    break _L$5;
                  } else {
                    break _L$3;
                  }
                }
                case 108: {
                  if (depth.val === 0) {
                    break _L$5;
                  } else {
                    break _L$3;
                  }
                }
                case 115: {
                  if (depth.val === 0) {
                    break _L$5;
                  } else {
                    break _L$3;
                  }
                }
                default: {
                  break _L$3;
                }
              }
              break _L$4;
            }
            return;
          }
          break _L$2;
        }
        self.pos = self.pos + 1 | 0;
      }
      continue;
    } else {
      return;
    }
  }
}
function _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self) {
  const params = [];
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      let s;
      _L$2: {
        _L$3: {
          const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
          switch (_bind.$tag) {
            case 111: {
              self.pos = self.pos + 1 | 0;
              _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(params, "blank");
              if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
                self.pos = self.pos + 1 | 0;
              } else {
                break _L;
              }
              break;
            }
            case 7: {
              const _Ident = _bind;
              const _s = _Ident._0;
              s = _s;
              break _L$3;
            }
            default: {
              break _L;
            }
          }
          break _L$2;
        }
        self.pos = self.pos + 1 | 0;
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(params, s);
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Of__)) {
          self.pos = self.pos + 1 | 0;
          _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
        }
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
          self.pos = self.pos + 1 | 0;
        } else {
          break;
        }
      }
      continue;
    } else {
      break;
    }
  }
  return params;
}
function _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self) {
  const indent = new _M0TPB8MutLocalGiE(0);
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      let n;
      _L$2: {
        _L$3: {
          _L$4: {
            const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
            switch (_bind.$tag) {
              case 108: {
                break _L$4;
              }
              case 113: {
                break _L$4;
              }
              case 114: {
                break _L$4;
              }
              case 109: {
                const _Indent = _bind;
                const _n = _Indent._0;
                n = _n;
                break _L$3;
              }
              default: {
                break _L;
              }
            }
          }
          self.pos = self.pos + 1 | 0;
          break _L$2;
        }
        indent.val = n;
        self.pos = self.pos + 1 | 0;
      }
      continue;
    } else {
      break;
    }
  }
  return indent.val;
}
function _M0MP49puruslang5purus3src6parser6Parser21parse__bracket__names(self) {
  const names = [];
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__);
  _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
  while (true) {
    if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
      let s;
      _L: {
        _L$2: {
          const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
          switch (_bind.$tag) {
            case 7: {
              const _Ident = _bind;
              const _s = _Ident._0;
              s = _s;
              break _L$2;
            }
            case 101: {
              self.pos = self.pos + 1 | 0;
              break;
            }
            default: {
              self.pos = self.pos + 1 | 0;
            }
          }
          break _L;
        }
        self.pos = self.pos + 1 | 0;
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(names, s);
      }
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      continue;
    } else {
      break;
    }
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
    self.pos = self.pos + 1 | 0;
  }
  return names;
}
function _M0MP49puruslang5purus3src6parser6Parser20parse__string__value(self) {
  const _bind = _M0MP49puruslang5purus3src6parser6Parser7advance(self);
  if (_bind.$tag === 3) {
    const _Str = _bind;
    const _s = _Str._0;
    return _s;
  } else {
    return "";
  }
}
function _M0MP49puruslang5purus3src6parser6Parser21parse__match__pattern(self) {
  let s;
  _L: {
    _L$2: {
      let s$2;
      _L$3: {
        let n;
        _L$4: {
          let n$2;
          _L$5: {
            const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
            switch (_bind.$tag) {
              case 0: {
                const _Int = _bind;
                const _n = _Int._0;
                n$2 = _n;
                break _L$5;
              }
              case 2: {
                const _Float = _bind;
                const _n$2 = _Float._0;
                n = _n$2;
                break _L$4;
              }
              case 3: {
                const _Str = _bind;
                const _s = _Str._0;
                s$2 = _s;
                break _L$3;
              }
              case 5: {
                self.pos = self.pos + 1 | 0;
                return new _M0DTP49puruslang5purus3src6parser12MatchPattern6LitPat(new _M0DTP49puruslang5purus3src6parser4Expr7BoolLit(true));
              }
              case 6: {
                self.pos = self.pos + 1 | 0;
                return new _M0DTP49puruslang5purus3src6parser12MatchPattern6LitPat(new _M0DTP49puruslang5purus3src6parser4Expr7BoolLit(false));
              }
              case 92: {
                break _L$2;
              }
              case 93: {
                break _L$2;
              }
              case 111: {
                self.pos = self.pos + 1 | 0;
                return new _M0DTP49puruslang5purus3src6parser12MatchPattern7BindPat("blank");
              }
              case 7: {
                const _Ident = _bind;
                const _s$2 = _Ident._0;
                s = _s$2;
                break _L;
              }
              default: {
                self.pos = self.pos + 1 | 0;
                return new _M0DTP49puruslang5purus3src6parser12MatchPattern7BindPat("_");
              }
            }
          }
          self.pos = self.pos + 1 | 0;
          return new _M0DTP49puruslang5purus3src6parser12MatchPattern6LitPat(new _M0DTP49puruslang5purus3src6parser4Expr6IntLit(n$2));
        }
        self.pos = self.pos + 1 | 0;
        return new _M0DTP49puruslang5purus3src6parser12MatchPattern6LitPat(new _M0DTP49puruslang5purus3src6parser4Expr8FloatLit(n));
      }
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser12MatchPattern6LitPat(new _M0DTP49puruslang5purus3src6parser4Expr6StrLit(s$2));
    }
    self.pos = self.pos + 1 | 0;
    return new _M0DTP49puruslang5purus3src6parser12MatchPattern6LitPat(_M0DTP49puruslang5purus3src6parser4Expr7NullLit__);
  }
  self.pos = self.pos + 1 | 0;
  return new _M0DTP49puruslang5purus3src6parser12MatchPattern7BindPat(s);
}
function _M0MP49puruslang5purus3src6parser6Parser16parse__use__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const module_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2As__)) {
    self.pos = self.pos + 1 | 0;
    const binding = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
    return new _M0DTP49puruslang5purus3src6parser4Stmt9UseStdlib(module_name, binding);
  } else {
    return new _M0DTP49puruslang5purus3src6parser4Stmt9UseStdlib(module_name, module_name);
  }
}
function _M0FP49puruslang5purus3src6parser13keyword__text(tok) {
  switch (tok.$tag) {
    case 8: {
      return "const";
    }
    case 9: {
      return "let";
    }
    case 10: {
      return "var";
    }
    case 11: {
      return "be";
    }
    case 12: {
      return "add";
    }
    case 13: {
      return "sub";
    }
    case 14: {
      return "mul";
    }
    case 15: {
      return "div";
    }
    case 16: {
      return "fdiv";
    }
    case 17: {
      return "mod";
    }
    case 18: {
      return "neg";
    }
    case 19: {
      return "pow";
    }
    case 20: {
      return "eq";
    }
    case 21: {
      return "neq";
    }
    case 22: {
      return "lt";
    }
    case 23: {
      return "gt";
    }
    case 24: {
      return "le";
    }
    case 25: {
      return "ge";
    }
    case 26: {
      return "and";
    }
    case 27: {
      return "or";
    }
    case 28: {
      return "not";
    }
    case 29: {
      return "coal";
    }
    case 30: {
      return "band";
    }
    case 31: {
      return "bor";
    }
    case 32: {
      return "bxor";
    }
    case 33: {
      return "bnot";
    }
    case 34: {
      return "shl";
    }
    case 35: {
      return "shr";
    }
    case 36: {
      return "ushr";
    }
    case 37: {
      return "fn";
    }
    case 38: {
      return "return";
    }
    case 39: {
      return "to";
    }
    case 40: {
      return "if";
    }
    case 41: {
      return "elif";
    }
    case 42: {
      return "else";
    }
    case 43: {
      return "unless";
    }
    case 44: {
      return "then";
    }
    case 45: {
      return "while";
    }
    case 46: {
      return "until";
    }
    case 47: {
      return "do";
    }
    case 48: {
      return "yield";
    }
    case 49: {
      return "for";
    }
    case 50: {
      return "in";
    }
    case 51: {
      return "range";
    }
    case 52: {
      return "break";
    }
    case 53: {
      return "continue";
    }
    case 54: {
      return "match";
    }
    case 55: {
      return "when";
    }
    case 56: {
      return "switch";
    }
    case 57: {
      return "case";
    }
    case 58: {
      return "pipe";
    }
    case 59: {
      return "as";
    }
    case 60: {
      return "of";
    }
    case 61: {
      return "gives";
    }
    case 62: {
      return "typeof";
    }
    case 63: {
      return "void";
    }
    case 64: {
      return "instanceof";
    }
    case 65: {
      return "new";
    }
    case 66: {
      return "delete";
    }
    case 67: {
      return "this";
    }
    case 68: {
      return "async";
    }
    case 69: {
      return "await";
    }
    case 70: {
      return "try";
    }
    case 71: {
      return "catch";
    }
    case 72: {
      return "finally";
    }
    case 73: {
      return "throw";
    }
    case 74: {
      return "import";
    }
    case 75: {
      return "from";
    }
    case 76: {
      return "export";
    }
    case 77: {
      return "default";
    }
    case 78: {
      return "require";
    }
    case 79: {
      return "use";
    }
    case 80: {
      return "namespace";
    }
    case 81: {
      return "public";
    }
    case 82: {
      return "all";
    }
    case 83: {
      return "type";
    }
    case 84: {
      return "with";
    }
    case 5: {
      return "true";
    }
    case 6: {
      return "false";
    }
    case 92: {
      return "null";
    }
    case 93: {
      return "nil";
    }
    case 94: {
      return "undefined";
    }
    case 95: {
      return "nan";
    }
    case 96: {
      return "infinity";
    }
    case 97: {
      return "list";
    }
    case 98: {
      return "object";
    }
    case 85: {
      return "class";
    }
    case 86: {
      return "extends";
    }
    case 87: {
      return "super";
    }
    case 88: {
      return "static";
    }
    case 89: {
      return "private";
    }
    case 90: {
      return "get";
    }
    case 91: {
      return "set";
    }
    case 111: {
      return "blank";
    }
    default: {
      return undefined;
    }
  }
}
function _M0MP49puruslang5purus3src6parser6Parser21parse__property__name(self) {
  let name;
  _L: {
    const _bind = _M0FP49puruslang5purus3src6parser13keyword__text(_M0MP49puruslang5purus3src6parser6Parser4peek(self));
    if (_bind === undefined) {
      return _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
    } else {
      const _Some = _bind;
      const _name = _Some;
      name = _name;
      break _L;
    }
  }
  self.pos = self.pos + 1 | 0;
  return name;
}
function _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self) {
  return _M0MP49puruslang5purus3src6parser6Parser11parse__pipe(self);
}
function _M0MP49puruslang5purus3src6parser6Parser11parse__pipe(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser11parse__coal(self));
  while (true) {
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind6Pipe____)) {
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser11parse__coal(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr4Pipe(left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser11parse__coal(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser9parse__or(self));
  while (true) {
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind4Coal__)) {
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser9parse__or(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(14, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser9parse__or(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser10parse__and(self));
  while (true) {
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Or__)) {
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser10parse__and(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(13, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser10parse__and(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser10parse__bor(self));
  while (true) {
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3And__)) {
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser10parse__bor(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(12, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser10parse__bor(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser11parse__bxor(self));
  while (true) {
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Bor__)) {
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser11parse__bxor(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(16, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser11parse__bxor(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser11parse__band(self));
  while (true) {
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind4Bxor__)) {
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser11parse__band(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(17, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser11parse__band(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser15parse__equality(self));
  while (true) {
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind4Band__)) {
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser15parse__equality(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(15, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser15parse__equality(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser17parse__comparison(self));
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      switch (_bind.$tag) {
        case 20: {
          self.pos = self.pos + 1 | 0;
          const right = _M0MP49puruslang5purus3src6parser6Parser17parse__comparison(self);
          left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(6, left.val, right);
          break;
        }
        case 21: {
          self.pos = self.pos + 1 | 0;
          const right$2 = _M0MP49puruslang5purus3src6parser6Parser17parse__comparison(self);
          left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(7, left.val, right$2);
          break;
        }
        case 28: {
          if ((self.pos + 1 | 0) < self.tokens.length) {
            const _bind$2 = _M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind;
            if (_bind$2.$tag === 20) {
              self.pos = self.pos + 2 | 0;
              const right$3 = _M0MP49puruslang5purus3src6parser6Parser17parse__comparison(self);
              left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(7, left.val, right$3);
            } else {
              break _L;
            }
          } else {
            break _L;
          }
          break;
        }
        case 64: {
          self.pos = self.pos + 1 | 0;
          const right$3 = _M0MP49puruslang5purus3src6parser6Parser17parse__comparison(self);
          left.val = new _M0DTP49puruslang5purus3src6parser4Expr10Instanceof(left.val, right$3);
          break;
        }
        default: {
          break _L;
        }
      }
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser17parse__comparison(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser12parse__shift(self));
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      switch (_bind.$tag) {
        case 22: {
          if ((self.pos + 1 | 0) < self.tokens.length) {
            const _bind$2 = _M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind;
            if (_bind$2.$tag === 20) {
              self.pos = self.pos + 2 | 0;
              const right = _M0MP49puruslang5purus3src6parser6Parser12parse__shift(self);
              left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(10, left.val, right);
              continue _L;
            }
          }
          self.pos = self.pos + 1 | 0;
          const right = _M0MP49puruslang5purus3src6parser6Parser12parse__shift(self);
          left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(8, left.val, right);
          break;
        }
        case 23: {
          if ((self.pos + 1 | 0) < self.tokens.length) {
            const _bind$2 = _M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind;
            if (_bind$2.$tag === 20) {
              self.pos = self.pos + 2 | 0;
              const right$2 = _M0MP49puruslang5purus3src6parser6Parser12parse__shift(self);
              left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(11, left.val, right$2);
              continue _L;
            }
          }
          self.pos = self.pos + 1 | 0;
          const right$2 = _M0MP49puruslang5purus3src6parser6Parser12parse__shift(self);
          left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(9, left.val, right$2);
          break;
        }
        case 24: {
          self.pos = self.pos + 1 | 0;
          const right$3 = _M0MP49puruslang5purus3src6parser6Parser12parse__shift(self);
          left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(10, left.val, right$3);
          break;
        }
        case 25: {
          self.pos = self.pos + 1 | 0;
          const right$4 = _M0MP49puruslang5purus3src6parser6Parser12parse__shift(self);
          left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(11, left.val, right$4);
          break;
        }
        default: {
          break _L;
        }
      }
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser12parse__shift(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser15parse__addition(self));
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      _L$2: {
        const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
        switch (_bind.$tag) {
          case 34: {
            break _L$2;
          }
          case 35: {
            break _L$2;
          }
          case 36: {
            break _L$2;
          }
          default: {
            break _L;
          }
        }
      }
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      let op;
      switch (_bind.$tag) {
        case 34: {
          op = 18;
          break;
        }
        case 35: {
          op = 19;
          break;
        }
        default: {
          op = 20;
        }
      }
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser15parse__addition(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(op, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser15parse__addition(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser21parse__multiplication(self));
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      _L$2: {
        const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
        switch (_bind.$tag) {
          case 12: {
            break _L$2;
          }
          case 13: {
            break _L$2;
          }
          default: {
            break _L;
          }
        }
      }
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      const op = _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Add__) ? 0 : 1;
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser21parse__multiplication(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(op, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser21parse__multiplication(self) {
  const left = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser12parse__power(self));
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      _L$2: {
        const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
        switch (_bind.$tag) {
          case 14: {
            break _L$2;
          }
          case 15: {
            break _L$2;
          }
          case 17: {
            break _L$2;
          }
          case 16: {
            break _L$2;
          }
          default: {
            break _L;
          }
        }
      }
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        break;
      }
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      let op;
      switch (_bind.$tag) {
        case 14: {
          op = 2;
          break;
        }
        case 15: {
          op = 3;
          break;
        }
        case 16: {
          op = 21;
          break;
        }
        default: {
          op = 4;
        }
      }
      self.pos = self.pos + 1 | 0;
      const right = _M0MP49puruslang5purus3src6parser6Parser12parse__power(self);
      left.val = new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(op, left.val, right);
      continue;
    } else {
      break;
    }
  }
  return left.val;
}
function _M0MP49puruslang5purus3src6parser6Parser12parse__power(self) {
  const left = _M0MP49puruslang5purus3src6parser6Parser12parse__unary(self);
  if (self.pos < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Pow__)) {
    if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
      return left;
    }
    self.pos = self.pos + 1 | 0;
    const right = _M0MP49puruslang5purus3src6parser6Parser12parse__power(self);
    return new _M0DTP49puruslang5purus3src6parser4Expr5BinOp(5, left, right);
  }
  return left;
}
function _M0MP49puruslang5purus3src6parser6Parser12parse__unary(self) {
  const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
  switch (_bind.$tag) {
    case 28: {
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser4Expr8UnaryNot(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
    }
    case 18: {
      self.pos = self.pos + 1 | 0;
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind10Infinity____)) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTP49puruslang5purus3src6parser4Expr11InfinityLit(false);
      } else {
        return new _M0DTP49puruslang5purus3src6parser4Expr8UnaryNeg(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
      }
    }
    case 33: {
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser4Expr9UnaryBnot(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
    }
    case 12: {
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind9Backslash__)) {
        self.pos = self.pos + 2 | 0;
        return new _M0DTP49puruslang5purus3src6parser4Expr6PreInc(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
      } else {
        return _M0MP49puruslang5purus3src6parser6Parser14parse__postfix(self);
      }
    }
    case 13: {
      if ((self.pos + 1 | 0) < self.tokens.length && _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind, _M0DTP49puruslang5purus3src5lexer9TokenKind9Backslash__)) {
        self.pos = self.pos + 2 | 0;
        return new _M0DTP49puruslang5purus3src6parser4Expr6PreDec(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
      } else {
        return _M0MP49puruslang5purus3src6parser6Parser14parse__postfix(self);
      }
    }
    case 62: {
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser4Expr11UnaryTypeof(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
    }
    case 63: {
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser4Expr9UnaryVoid(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
    }
    case 69: {
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser4Expr9AwaitExpr(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
    }
    case 48: {
      self.pos = self.pos + 1 | 0;
      _L: {
        const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
        switch (_bind$2.$tag) {
          case 108: {
            break _L;
          }
          case 115: {
            break _L;
          }
          case 109: {
            break _L;
          }
          case 100: {
            break _L;
          }
          default: {
            return new _M0DTP49puruslang5purus3src6parser4Expr9YieldExpr(_M0MP49puruslang5purus3src6parser6Parser12parse__unary(self));
          }
        }
      }
      return new _M0DTP49puruslang5purus3src6parser4Expr9YieldExpr(undefined);
    }
    case 65: {
      self.pos = self.pos + 1 | 0;
      const callee = _M0MP49puruslang5purus3src6parser6Parser14parse__primary(self);
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
        const args = _M0MP49puruslang5purus3src6parser6Parser11parse__args(self);
        return new _M0DTP49puruslang5purus3src6parser4Expr7NewExpr(callee, args);
      } else {
        return new _M0DTP49puruslang5purus3src6parser4Expr7NewExpr(callee, []);
      }
    }
    default: {
      return _M0MP49puruslang5purus3src6parser6Parser14parse__postfix(self);
    }
  }
}
function _M0MP49puruslang5purus3src6parser6Parser11parse__args(self) {
  const args = [];
  if (_M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
    return args;
  }
  self.pos = self.pos + 1 | 0;
  _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
  while (true) {
    if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
      _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(args, _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
        self.pos = self.pos + 1 | 0;
        _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      }
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__)) {
        self.pos = self.pos + 1 | 0;
        _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      }
      continue;
    } else {
      break;
    }
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
    self.pos = self.pos + 1 | 0;
  }
  return args;
}
function _M0MP49puruslang5purus3src6parser6Parser14parse__postfix(self) {
  const expr = new _M0TPB8MutLocalGRP49puruslang5purus3src6parser4ExprE(_M0MP49puruslang5purus3src6parser6Parser14parse__primary(self));
  _L: while (true) {
    if (self.pos < self.tokens.length) {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      switch (_bind.$tag) {
        case 103: {
          self.pos = self.pos + 1 | 0;
          const field = _M0MP49puruslang5purus3src6parser6Parser21parse__property__name(self);
          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
            if (_M0MP49puruslang5purus3src6parser6Parser21is__computed__bracket(self)) {
              self.pos = self.pos + 1 | 0;
              _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
              self.pos = self.pos + 1 | 0;
              _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
              const start_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
              const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
              switch (_bind$2.$tag) {
                case 104: {
                  self.pos = self.pos + 1 | 0;
                  const end_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
                  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
                    self.pos = self.pos + 1 | 0;
                  }
                  expr.val = new _M0DTP49puruslang5purus3src6parser4Expr5Slice(new _M0DTP49puruslang5purus3src6parser4Expr9DotAccess(expr.val, field), start_expr, end_expr, true);
                  break;
                }
                case 105: {
                  self.pos = self.pos + 1 | 0;
                  const end_expr$2 = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
                  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
                    self.pos = self.pos + 1 | 0;
                  }
                  expr.val = new _M0DTP49puruslang5purus3src6parser4Expr5Slice(new _M0DTP49puruslang5purus3src6parser4Expr9DotAccess(expr.val, field), start_expr, end_expr$2, false);
                  break;
                }
                default: {
                  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
                    self.pos = self.pos + 1 | 0;
                  }
                  expr.val = new _M0DTP49puruslang5purus3src6parser4Expr14ComputedAccess(new _M0DTP49puruslang5purus3src6parser4Expr9DotAccess(expr.val, field), start_expr);
                }
              }
            } else {
              const args = _M0MP49puruslang5purus3src6parser6Parser11parse__args(self);
              expr.val = new _M0DTP49puruslang5purus3src6parser4Expr10MethodCall(expr.val, field, args);
            }
          } else {
            expr.val = new _M0DTP49puruslang5purus3src6parser4Expr9DotAccess(expr.val, field);
          }
          break;
        }
        case 107: {
          self.pos = self.pos + 1 | 0;
          const field$2 = _M0MP49puruslang5purus3src6parser6Parser21parse__property__name(self);
          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
            if (_M0MP49puruslang5purus3src6parser6Parser21is__computed__bracket(self)) {
              self.pos = self.pos + 1 | 0;
              _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
              self.pos = self.pos + 1 | 0;
              _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
              const key_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
              if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
                self.pos = self.pos + 1 | 0;
              }
              expr.val = new _M0DTP49puruslang5purus3src6parser4Expr14ComputedAccess(new _M0DTP49puruslang5purus3src6parser4Expr12OptDotAccess(expr.val, field$2), key_expr);
            } else {
              const args = _M0MP49puruslang5purus3src6parser6Parser11parse__args(self);
              expr.val = new _M0DTP49puruslang5purus3src6parser4Expr13OptMethodCall(expr.val, field$2, args);
            }
          } else {
            expr.val = new _M0DTP49puruslang5purus3src6parser4Expr12OptDotAccess(expr.val, field$2);
          }
          break;
        }
        case 99: {
          if (_M0MP49puruslang5purus3src6parser6Parser21is__computed__bracket(self)) {
            self.pos = self.pos + 1 | 0;
            _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
            self.pos = self.pos + 1 | 0;
            _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
            const key_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
            const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
            switch (_bind$2.$tag) {
              case 104: {
                self.pos = self.pos + 1 | 0;
                const end_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
                if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
                  self.pos = self.pos + 1 | 0;
                }
                expr.val = new _M0DTP49puruslang5purus3src6parser4Expr5Slice(expr.val, key_expr, end_expr, true);
                break;
              }
              case 105: {
                self.pos = self.pos + 1 | 0;
                const end_expr$2 = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
                if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
                  self.pos = self.pos + 1 | 0;
                }
                expr.val = new _M0DTP49puruslang5purus3src6parser4Expr5Slice(expr.val, key_expr, end_expr$2, false);
                break;
              }
              default: {
                if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
                  self.pos = self.pos + 1 | 0;
                }
                expr.val = new _M0DTP49puruslang5purus3src6parser4Expr14ComputedAccess(expr.val, key_expr);
              }
            }
          } else {
            const args = _M0MP49puruslang5purus3src6parser6Parser11parse__args(self);
            expr.val = new _M0DTP49puruslang5purus3src6parser4Expr4Call(expr.val, args);
          }
          break;
        }
        case 59: {
          self.pos = self.pos + 1 | 0;
          const type_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
          expr.val = new _M0DTP49puruslang5purus3src6parser4Expr6AsCast(expr.val, type_name);
          break;
        }
        case 106: {
          if ((self.pos + 1 | 0) < self.tokens.length) {
            const _bind$2 = _M0MPC15array5Array2atGsE(self.tokens, self.pos + 1 | 0).kind;
            switch (_bind$2.$tag) {
              case 12: {
                self.pos = self.pos + 2 | 0;
                expr.val = new _M0DTP49puruslang5purus3src6parser4Expr7PostInc(expr.val);
                break;
              }
              case 13: {
                self.pos = self.pos + 2 | 0;
                expr.val = new _M0DTP49puruslang5purus3src6parser4Expr7PostDec(expr.val);
                break;
              }
              default: {
                break _L;
              }
            }
          } else {
            break _L;
          }
          break;
        }
        default: {
          break _L;
        }
      }
      continue;
    } else {
      break;
    }
  }
  return expr.val;
}
function _M0MP49puruslang5purus3src6parser6Parser14parse__primary(self) {
  _L: {
    let s;
    _L$2: {
      _L$3: {
        let pattern;
        let flags;
        _L$4: {
          let segments;
          _L$5: {
            let s$2;
            _L$6: {
              let n;
              _L$7: {
                let s$3;
                _L$8: {
                  let n$2;
                  _L$9: {
                    const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
                    switch (_bind.$tag) {
                      case 0: {
                        const _Int = _bind;
                        const _n = _Int._0;
                        n$2 = _n;
                        break _L$9;
                      }
                      case 1: {
                        const _BigInt = _bind;
                        const _s = _BigInt._0;
                        s$3 = _s;
                        break _L$8;
                      }
                      case 2: {
                        const _Float = _bind;
                        const _n$2 = _Float._0;
                        n = _n$2;
                        break _L$7;
                      }
                      case 3: {
                        const _Str = _bind;
                        const _s$2 = _Str._0;
                        s$2 = _s$2;
                        break _L$6;
                      }
                      case 110: {
                        const _InterpStr = _bind;
                        const _segments = _InterpStr._0;
                        segments = _segments;
                        break _L$5;
                      }
                      case 4: {
                        const _Regex = _bind;
                        const _pattern = _Regex._0;
                        const _flags = _Regex._1;
                        pattern = _pattern;
                        flags = _flags;
                        break _L$4;
                      }
                      case 5: {
                        self.pos = self.pos + 1 | 0;
                        return new _M0DTP49puruslang5purus3src6parser4Expr7BoolLit(true);
                      }
                      case 6: {
                        self.pos = self.pos + 1 | 0;
                        return new _M0DTP49puruslang5purus3src6parser4Expr7BoolLit(false);
                      }
                      case 92: {
                        break _L$3;
                      }
                      case 93: {
                        break _L$3;
                      }
                      case 94: {
                        self.pos = self.pos + 1 | 0;
                        return _M0DTP49puruslang5purus3src6parser4Expr12UndefinedLit__;
                      }
                      case 95: {
                        self.pos = self.pos + 1 | 0;
                        return _M0DTP49puruslang5purus3src6parser4Expr6NanLit__;
                      }
                      case 96: {
                        self.pos = self.pos + 1 | 0;
                        return new _M0DTP49puruslang5purus3src6parser4Expr11InfinityLit(true);
                      }
                      case 67: {
                        self.pos = self.pos + 1 | 0;
                        return _M0DTP49puruslang5purus3src6parser4Expr8ThisExpr__;
                      }
                      case 87: {
                        self.pos = self.pos + 1 | 0;
                        return _M0DTP49puruslang5purus3src6parser4Expr9SuperExpr__;
                      }
                      case 7: {
                        const _Ident = _bind;
                        const _s$3 = _Ident._0;
                        s = _s$3;
                        break _L$2;
                      }
                      case 97: {
                        self.pos = self.pos + 1 | 0;
                        return _M0MP49puruslang5purus3src6parser6Parser20parse__list__literal(self);
                      }
                      case 98: {
                        self.pos = self.pos + 1 | 0;
                        return _M0MP49puruslang5purus3src6parser6Parser22parse__object__literal(self);
                      }
                      case 99: {
                        return _M0MP49puruslang5purus3src6parser6Parser20parse__bracket__expr(self);
                      }
                      case 37: {
                        return _M0MP49puruslang5purus3src6parser6Parser15parse__fn__expr(self);
                      }
                      case 40: {
                        self.pos = self.pos + 1 | 0;
                        const cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
                        _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6Then____);
                        const then_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
                        _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6Else____);
                        const else_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
                        return new _M0DTP49puruslang5purus3src6parser4Expr6IfExpr(cond, then_expr, else_expr);
                      }
                      case 54: {
                        break _L;
                      }
                      case 56: {
                        break _L;
                      }
                      case 70: {
                        self.pos = self.pos + 1 | 0;
                        const tr_indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
                        const try_body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, tr_indent);
                        const saved_ca = self.pos;
                        _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
                        const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
                        let catch_name;
                        if (_bind$2.$tag === 71) {
                          self.pos = self.pos + 1 | 0;
                          let s$4;
                          _L$10: {
                            _L$11: {
                              const _bind$3 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
                              if (_bind$3.$tag === 7) {
                                const _Ident$2 = _bind$3;
                                const _s$4 = _Ident$2._0;
                                s$4 = _s$4;
                                break _L$11;
                              } else {
                                catch_name = "e";
                              }
                              break _L$10;
                            }
                            self.pos = self.pos + 1 | 0;
                            catch_name = s$4;
                          }
                        } else {
                          self.pos = saved_ca;
                          catch_name = "e";
                        }
                        const ca_indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
                        const catch_body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, ca_indent);
                        return new _M0DTP49puruslang5purus3src6parser4Expr7TryExpr(try_body, catch_name, catch_body);
                      }
                      case 68: {
                        self.pos = self.pos + 1 | 0;
                        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__)) {
                          self.pos = self.pos + 1 | 0;
                          const params = _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self);
                          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__)) {
                            self.pos = self.pos + 1 | 0;
                            _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
                          }
                          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2To__)) {
                            self.pos = self.pos + 1 | 0;
                            if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8Return____)) {
                              self.pos = self.pos + 1 | 0;
                              return new _M0DTP49puruslang5purus3src6parser4Expr13AsyncFnExprTo(params, _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
                            } else {
                              return new _M0DTP49puruslang5purus3src6parser4Expr13AsyncFnExprTo(params, _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
                            }
                          } else {
                            const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
                            return new _M0DTP49puruslang5purus3src6parser4Expr11AsyncFnExpr(params, _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent));
                          }
                        } else {
                          return new _M0DTP49puruslang5purus3src6parser4Expr5Ident("async");
                        }
                      }
                      default: {
                        self.pos = self.pos + 1 | 0;
                        return _M0DTP49puruslang5purus3src6parser4Expr12UndefinedLit__;
                      }
                    }
                  }
                  self.pos = self.pos + 1 | 0;
                  return new _M0DTP49puruslang5purus3src6parser4Expr6IntLit(n$2);
                }
                self.pos = self.pos + 1 | 0;
                return new _M0DTP49puruslang5purus3src6parser4Expr9BigIntLit(s$3);
              }
              self.pos = self.pos + 1 | 0;
              return new _M0DTP49puruslang5purus3src6parser4Expr8FloatLit(n);
            }
            self.pos = self.pos + 1 | 0;
            return new _M0DTP49puruslang5purus3src6parser4Expr6StrLit(s$2);
          }
          self.pos = self.pos + 1 | 0;
          const parts = [];
          const i = new _M0TPB8MutLocalGiE(0);
          while (true) {
            if (i.val < segments.length) {
              if (2 === 0) {
                $panic();
              }
              if ((i.val % 2 | 0) === 0) {
                if (_M0MPC15array5Array2atGsE(segments, i.val).length > 0) {
                  _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(parts, new _M0DTP49puruslang5purus3src6parser7StrPart3Lit(_M0MPC15array5Array2atGsE(segments, i.val)));
                }
              } else {
                const expr_tokens = _M0MP49puruslang5purus3src5lexer5Lexer8tokenize(_M0MP49puruslang5purus3src5lexer5Lexer3new(_M0MPC15array5Array2atGsE(segments, i.val)));
                const sub_parser = _M0MP49puruslang5purus3src6parser6Parser3new(expr_tokens);
                _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(sub_parser);
                const expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(sub_parser);
                _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(parts, new _M0DTP49puruslang5purus3src6parser7StrPart6Interp(expr));
              }
              i.val = i.val + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return new _M0DTP49puruslang5purus3src6parser4Expr9StrInterp(parts);
        }
        self.pos = self.pos + 1 | 0;
        return new _M0DTP49puruslang5purus3src6parser4Expr8RegexLit(pattern, flags);
      }
      self.pos = self.pos + 1 | 0;
      return _M0DTP49puruslang5purus3src6parser4Expr7NullLit__;
    }
    self.pos = self.pos + 1 | 0;
    return new _M0DTP49puruslang5purus3src6parser4Expr5Ident(s);
  }
  self.pos = self.pos + 1 | 0;
  const subject = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const arms = _M0MP49puruslang5purus3src6parser6Parser18parse__match__arms(self, indent);
  return new _M0DTP49puruslang5purus3src6parser4Expr9MatchExpr(subject, arms);
}
function _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, min_indent) {
  const stmts = [];
  let s;
  _L: {
    _L$2: {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser11parse__stmt(self);
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _s = _Some;
        s = _s;
        break _L$2;
      }
      break _L;
    }
    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(stmts, s);
  }
  while (true) {
    if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof__)) {
      const saved = self.pos;
      const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
      if (indent < min_indent) {
        self.pos = saved;
        break;
      }
      let s$2;
      _L$2: {
        _L$3: {
          const _bind = _M0MP49puruslang5purus3src6parser6Parser11parse__stmt(self);
          if (_bind === undefined) {
            self.pos = self.pos + 1 | 0;
          } else {
            const _Some = _bind;
            const _s = _Some;
            s$2 = _s;
            break _L$3;
          }
          break _L$2;
        }
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(stmts, s$2);
      }
      continue;
    } else {
      break;
    }
  }
  return stmts;
}
function _M0MP49puruslang5purus3src6parser6Parser11parse__stmt(self) {
  _L: {
    _L$2: {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      switch (_bind.$tag) {
        case 113: {
          break _L$2;
        }
        case 114: {
          break _L$2;
        }
        case 109: {
          self.pos = self.pos + 1 | 0;
          break;
        }
      }
      break _L;
    }
    self.pos = self.pos + 1 | 0;
    return undefined;
  }
  _L$2: {
    const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
    switch (_bind.$tag) {
      case 8: {
        return _M0MP49puruslang5purus3src6parser6Parser16parse__var__decl(self, 0);
      }
      case 9: {
        return _M0MP49puruslang5purus3src6parser6Parser16parse__var__decl(self, 1);
      }
      case 10: {
        return _M0MP49puruslang5purus3src6parser6Parser16parse__var__decl(self, 2);
      }
      case 37: {
        return _M0MP49puruslang5purus3src6parser6Parser15parse__fn__decl(self, false);
      }
      case 68: {
        self.pos = self.pos + 1 | 0;
        return _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__) ? _M0MP49puruslang5purus3src6parser6Parser15parse__fn__decl(self, true) : new _M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt(_M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
      }
      case 40: {
        return _M0MP49puruslang5purus3src6parser6Parser15parse__if__stmt(self);
      }
      case 43: {
        return _M0MP49puruslang5purus3src6parser6Parser19parse__unless__stmt(self);
      }
      case 45: {
        return _M0MP49puruslang5purus3src6parser6Parser18parse__while__stmt(self);
      }
      case 46: {
        return _M0MP49puruslang5purus3src6parser6Parser18parse__until__stmt(self);
      }
      case 47: {
        return _M0MP49puruslang5purus3src6parser6Parser22parse__do__while__stmt(self);
      }
      case 49: {
        return _M0MP49puruslang5purus3src6parser6Parser16parse__for__stmt(self);
      }
      case 54: {
        break _L$2;
      }
      case 56: {
        break _L$2;
      }
      case 38: {
        self.pos = self.pos + 1 | 0;
        _L$3: {
          const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
          switch (_bind$2.$tag) {
            case 108: {
              break _L$3;
            }
            case 115: {
              break _L$3;
            }
            case 109: {
              break _L$3;
            }
            default: {
              return new _M0DTP49puruslang5purus3src6parser4Stmt6Return(_M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
            }
          }
        }
        return new _M0DTP49puruslang5purus3src6parser4Stmt6Return(undefined);
      }
      case 52: {
        self.pos = self.pos + 1 | 0;
        return _M0DTP49puruslang5purus3src6parser4Stmt5Break__;
      }
      case 53: {
        self.pos = self.pos + 1 | 0;
        return _M0DTP49puruslang5purus3src6parser4Stmt8Continue__;
      }
      case 70: {
        return _M0MP49puruslang5purus3src6parser6Parser16parse__try__stmt(self);
      }
      case 73: {
        self.pos = self.pos + 1 | 0;
        const expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
        return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt5Throw(expr));
      }
      case 74: {
        return _M0MP49puruslang5purus3src6parser6Parser19parse__import__stmt(self);
      }
      case 79: {
        return _M0MP49puruslang5purus3src6parser6Parser16parse__use__stmt(self);
      }
      case 75: {
        return _M0MP49puruslang5purus3src6parser6Parser22parse__from__use__stmt(self);
      }
      case 80: {
        return _M0MP49puruslang5purus3src6parser6Parser16parse__mod__stmt(self);
      }
      case 76: {
        return _M0MP49puruslang5purus3src6parser6Parser19parse__export__stmt(self);
      }
      case 81: {
        self.pos = self.pos + 1 | 0;
        let s;
        _L$4: {
          const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser11parse__stmt(self);
          if (_bind$2 === undefined) {
            return undefined;
          } else {
            const _Some = _bind$2;
            const _s = _Some;
            s = _s;
            break _L$4;
          }
        }
        return new _M0DTP49puruslang5purus3src6parser4Stmt10PublicDecl(s);
      }
      case 66: {
        self.pos = self.pos + 1 | 0;
        return new _M0DTP49puruslang5purus3src6parser4Stmt10DeleteStmt(_M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
      }
      case 83: {
        return _M0MP49puruslang5purus3src6parser6Parser17parse__type__decl(self);
      }
      case 85: {
        return _M0MP49puruslang5purus3src6parser6Parser18parse__class__decl(self);
      }
      default: {
        const expr$2 = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
        _L$5: {
          const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
          switch (_bind$2.$tag) {
            case 12: {
              break _L$5;
            }
            case 13: {
              break _L$5;
            }
            case 14: {
              break _L$5;
            }
            case 15: {
              break _L$5;
            }
            case 17: {
              break _L$5;
            }
            case 19: {
              break _L$5;
            }
            case 16: {
              break _L$5;
            }
            case 30: {
              break _L$5;
            }
            case 31: {
              break _L$5;
            }
            case 32: {
              break _L$5;
            }
            case 34: {
              break _L$5;
            }
            case 35: {
              break _L$5;
            }
            case 36: {
              break _L$5;
            }
            case 26: {
              break _L$5;
            }
            case 27: {
              break _L$5;
            }
            case 29: {
              break _L$5;
            }
            case 11: {
              self.pos = self.pos + 1 | 0;
              const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
              let name;
              _L$6: {
                if (expr$2.$tag === 15) {
                  const _Ident = expr$2;
                  const _name = _Ident._0;
                  name = _name;
                  break _L$6;
                } else {
                  return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt6Assign(expr$2, value));
                }
              }
              _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(self.errors, `bare identifier assignment ('${name} be ...') is not supported. Declare with 'const ${name} be ...' or 'let ${name} be ...', or use compound assignment such as '${name} add be 1'`);
              return new _M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt(expr$2);
            }
            default: {
              return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt(expr$2));
            }
          }
        }
        const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
        let op;
        switch (_bind$2.$tag) {
          case 12: {
            op = 0;
            break;
          }
          case 13: {
            op = 1;
            break;
          }
          case 14: {
            op = 2;
            break;
          }
          case 15: {
            op = 3;
            break;
          }
          case 17: {
            op = 4;
            break;
          }
          case 19: {
            op = 5;
            break;
          }
          case 16: {
            op = 21;
            break;
          }
          case 30: {
            op = 15;
            break;
          }
          case 31: {
            op = 16;
            break;
          }
          case 32: {
            op = 17;
            break;
          }
          case 34: {
            op = 18;
            break;
          }
          case 35: {
            op = 19;
            break;
          }
          case 36: {
            op = 20;
            break;
          }
          case 26: {
            op = 12;
            break;
          }
          case 27: {
            op = 13;
            break;
          }
          default: {
            op = 14;
          }
        }
        self.pos = self.pos + 1 | 0;
        _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
        const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
        return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt14CompoundAssign(op, expr$2, value));
      }
    }
  }
  return _M0MP49puruslang5purus3src6parser6Parser18parse__match__stmt(self);
}
function _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, stmt) {
  const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
  switch (_bind.$tag) {
    case 40: {
      self.pos = self.pos + 1 | 0;
      const cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      return new _M0DTP49puruslang5purus3src6parser4Stmt9PostfixIf(stmt, cond);
    }
    case 43: {
      self.pos = self.pos + 1 | 0;
      const cond$2 = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      return new _M0DTP49puruslang5purus3src6parser4Stmt13PostfixUnless(stmt, cond$2);
    }
    case 49: {
      self.pos = self.pos + 1 | 0;
      const name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
      _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind4In____);
      const iter = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      return new _M0DTP49puruslang5purus3src6parser4Stmt10PostfixFor(stmt, name, iter);
    }
    default: {
      return stmt;
    }
  }
}
function _M0MP49puruslang5purus3src6parser6Parser18parse__class__decl(self) {
  self.pos = self.pos + 1 | 0;
  const name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  let parent;
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Extends____)) {
    self.pos = self.pos + 1 | 0;
    parent = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  } else {
    parent = undefined;
  }
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const members = [];
  let m;
  _L: {
    _L$2: {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser20parse__class__member(self);
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _m = _Some;
        m = _m;
        break _L$2;
      }
      break _L;
    }
    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(members, m);
  }
  while (true) {
    if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof__)) {
      const saved2 = self.pos;
      const next_indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
      if (next_indent < indent) {
        self.pos = saved2;
        break;
      }
      let m$2;
      _L$2: {
        _L$3: {
          const _bind = _M0MP49puruslang5purus3src6parser6Parser20parse__class__member(self);
          if (_bind === undefined) {
            self.pos = self.pos + 1 | 0;
          } else {
            const _Some = _bind;
            const _m = _Some;
            m$2 = _m;
            break _L$3;
          }
          break _L$2;
        }
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(members, m$2);
      }
      continue;
    } else {
      break;
    }
  }
  return new _M0DTP49puruslang5purus3src6parser4Stmt9ClassDecl(new _M0TP49puruslang5purus3src6parser9ClassDecl(name, parent, members));
}
function _M0MP49puruslang5purus3src6parser6Parser20parse__class__member(self) {
  const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
  switch (_bind.$tag) {
    case 89: {
      self.pos = self.pos + 1 | 0;
      const field_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
      let default_val;
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        self.pos = self.pos + 1 | 0;
        default_val = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      } else {
        default_val = undefined;
      }
      return new _M0DTP49puruslang5purus3src6parser11ClassMember5Field(true, field_name, default_val);
    }
    case 88: {
      self.pos = self.pos + 1 | 0;
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__)) {
        self.pos = self.pos + 1 | 0;
        const meth_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
        const params = _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self);
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__)) {
          self.pos = self.pos + 1 | 0;
          _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
        }
        const body = _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self);
        return new _M0DTP49puruslang5purus3src6parser11ClassMember6Method(true, false, meth_name, params, body);
      } else {
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind7Async____)) {
          self.pos = self.pos + 1 | 0;
          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__)) {
            self.pos = self.pos + 1 | 0;
            const meth_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
            const params = _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self);
            if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__)) {
              self.pos = self.pos + 1 | 0;
              _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
            }
            const body = _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self);
            return new _M0DTP49puruslang5purus3src6parser11ClassMember6Method(true, true, meth_name, params, body);
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      }
    }
    case 90: {
      self.pos = self.pos + 1 | 0;
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__)) {
        self.pos = self.pos + 1 | 0;
        const getter_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
        const body = _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self);
        return new _M0DTP49puruslang5purus3src6parser11ClassMember6Getter(getter_name, body);
      } else {
        return undefined;
      }
    }
    case 91: {
      self.pos = self.pos + 1 | 0;
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__)) {
        self.pos = self.pos + 1 | 0;
        const setter_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
        const param = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
        const body = _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self);
        return new _M0DTP49puruslang5purus3src6parser11ClassMember6Setter(setter_name, param, body);
      } else {
        return undefined;
      }
    }
    case 37: {
      self.pos = self.pos + 1 | 0;
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5New____)) {
        self.pos = self.pos + 1 | 0;
        const params = _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self);
        const body = _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self);
        return new _M0DTP49puruslang5purus3src6parser11ClassMember11Constructor(params, body);
      } else {
        const meth_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
        const params = _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self);
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__)) {
          self.pos = self.pos + 1 | 0;
          _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
        }
        const body = _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self);
        return new _M0DTP49puruslang5purus3src6parser11ClassMember6Method(false, false, meth_name, params, body);
      }
    }
    case 68: {
      self.pos = self.pos + 1 | 0;
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Fn__)) {
        self.pos = self.pos + 1 | 0;
        const meth_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
        const params = _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self);
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__)) {
          self.pos = self.pos + 1 | 0;
          _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
        }
        const body = _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self);
        return new _M0DTP49puruslang5purus3src6parser11ClassMember6Method(false, true, meth_name, params, body);
      } else {
        return undefined;
      }
    }
    default: {
      return undefined;
    }
  }
}
function _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self) {
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2To__)) {
    self.pos = self.pos + 1 | 0;
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8Return____)) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser6FnBody12ToReturnExpr(_M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
    } else {
      return new _M0DTP49puruslang5purus3src6parser6FnBody6ToExpr(_M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
    }
  } else {
    const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
    return new _M0DTP49puruslang5purus3src6parser6FnBody5Block(_M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent));
  }
}
function _M0MP49puruslang5purus3src6parser6Parser22parse__do__while__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind7While____);
  const cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  return new _M0DTP49puruslang5purus3src6parser4Stmt7DoWhile(cond, body);
}
function _M0MP49puruslang5purus3src6parser6Parser19parse__export__stmt(self) {
  self.pos = self.pos + 1 | 0;
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Default____)) {
    self.pos = self.pos + 1 | 0;
  }
  let s;
  _L: {
    const _bind = _M0MP49puruslang5purus3src6parser6Parser11parse__stmt(self);
    if (_bind === undefined) {
      return new _M0DTP49puruslang5purus3src6parser4Stmt13ExportDefault(new _M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt(_M0DTP49puruslang5purus3src6parser4Expr12UndefinedLit__));
    } else {
      const _Some = _bind;
      const _s = _Some;
      s = _s;
      break _L;
    }
  }
  return new _M0DTP49puruslang5purus3src6parser4Stmt13ExportDefault(s);
}
function _M0MP49puruslang5purus3src6parser6Parser15parse__fn__decl(self, is_async) {
  self.pos = self.pos + 1 | 0;
  let name;
  let s;
  _L: {
    _L$2: {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      if (_bind.$tag === 7) {
        const _Ident = _bind;
        const _s = _Ident._0;
        s = _s;
        break _L$2;
      } else {
        name = undefined;
      }
      break _L;
    }
    self.pos = self.pos + 1 | 0;
    name = s;
  }
  const params = _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__)) {
    self.pos = self.pos + 1 | 0;
    _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
  }
  const body = _M0MP49puruslang5purus3src6parser6Parser15parse__to__body(self);
  const decl = new _M0TP49puruslang5purus3src6parser6FnDecl(name, params, body, is_async, false);
  return new _M0DTP49puruslang5purus3src6parser4Stmt6FnDecl(decl);
}
function _M0MP49puruslang5purus3src6parser6Parser16parse__for__stmt(self) {
  self.pos = self.pos + 1 | 0;
  _L: {
    _L$2: {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      switch (_bind.$tag) {
        case 8: {
          break _L$2;
        }
        case 9: {
          break _L$2;
        }
        case 10: {
          break _L$2;
        }
      }
      break _L;
    }
    return _M0MP49puruslang5purus3src6parser6Parser19parse__for__classic(self);
  }
  const first = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
    self.pos = self.pos + 1 | 0;
    const second = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind4In____);
    const iter = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof__) || _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind7Newline__)) {
      const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
      const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
      return new _M0DTP49puruslang5purus3src6parser4Stmt5ForIn(second, first, iter, body);
    }
    const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
    const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
    return new _M0DTP49puruslang5purus3src6parser4Stmt5ForIn(second, first, iter, body);
  }
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind4In____);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind7Range____)) {
    self.pos = self.pos + 1 | 0;
    const start = _M0MP49puruslang5purus3src6parser6Parser14parse__primary(self);
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__);
    const end = _M0MP49puruslang5purus3src6parser6Parser14parse__primary(self);
    const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
    const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
    return new _M0DTP49puruslang5purus3src6parser4Stmt8ForRange(first, start, end, body);
  }
  const iter = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  return new _M0DTP49puruslang5purus3src6parser4Stmt5ForIn(first, undefined, iter, body);
}
function _M0MP49puruslang5purus3src6parser6Parser19parse__for__classic(self) {
  const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
  let init;
  switch (_bind.$tag) {
    case 8: {
      init = _M0MP49puruslang5purus3src6parser6Parser16parse__var__decl(self, 0);
      break;
    }
    case 9: {
      init = _M0MP49puruslang5purus3src6parser6Parser16parse__var__decl(self, 1);
      break;
    }
    default: {
      init = _M0MP49puruslang5purus3src6parser6Parser16parse__var__decl(self, 2);
    }
  }
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__);
  const cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__);
  const update_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  let update;
  _L: {
    _L$2: {
      const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      switch (_bind$2.$tag) {
        case 12: {
          break _L$2;
        }
        case 13: {
          break _L$2;
        }
        case 14: {
          break _L$2;
        }
        case 15: {
          break _L$2;
        }
        case 17: {
          break _L$2;
        }
        case 19: {
          break _L$2;
        }
        case 16: {
          break _L$2;
        }
        case 30: {
          break _L$2;
        }
        case 31: {
          break _L$2;
        }
        case 32: {
          break _L$2;
        }
        case 34: {
          break _L$2;
        }
        case 35: {
          break _L$2;
        }
        case 36: {
          break _L$2;
        }
        case 11: {
          self.pos = self.pos + 1 | 0;
          const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
          update = new _M0DTP49puruslang5purus3src6parser4Stmt6Assign(update_expr, value);
          break;
        }
        default: {
          update = new _M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt(update_expr);
        }
      }
      break _L;
    }
    const _bind$2 = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
    let op;
    switch (_bind$2.$tag) {
      case 12: {
        op = 0;
        break;
      }
      case 13: {
        op = 1;
        break;
      }
      case 14: {
        op = 2;
        break;
      }
      case 15: {
        op = 3;
        break;
      }
      case 17: {
        op = 4;
        break;
      }
      case 19: {
        op = 5;
        break;
      }
      case 16: {
        op = 21;
        break;
      }
      case 30: {
        op = 15;
        break;
      }
      case 31: {
        op = 16;
        break;
      }
      case 32: {
        op = 17;
        break;
      }
      case 34: {
        op = 18;
        break;
      }
      case 35: {
        op = 19;
        break;
      }
      default: {
        op = 20;
      }
    }
    self.pos = self.pos + 1 | 0;
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
    const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
    update = new _M0DTP49puruslang5purus3src6parser4Stmt14CompoundAssign(op, update_expr, value);
  }
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  return new _M0DTP49puruslang5purus3src6parser4Stmt10ForClassic(init, cond, update, body);
}
function _M0MP49puruslang5purus3src6parser6Parser16parse__var__decl(self, kind) {
  self.pos = self.pos + 1 | 0;
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8Object____)) {
    self.pos = self.pos + 1 | 0;
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
      self.pos = self.pos + 1 | 0;
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      const names = [];
      while (true) {
        if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
          const name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
          _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(names, name);
          _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__) || _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__)) {
            self.pos = self.pos + 1 | 0;
            _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
          }
          continue;
        } else {
          break;
        }
      }
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
        self.pos = self.pos + 1 | 0;
      }
      _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
      const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt15ObjDestructDecl(kind, names, value));
    }
    const name = "object";
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Of__)) {
      self.pos = self.pos + 1 | 0;
      _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
    }
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
    const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
    return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt7VarDecl(kind, name, value));
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
    self.pos = self.pos + 1 | 0;
    _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
    const names = [];
    while (true) {
      if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
        const name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(names, name);
        _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__) || _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__)) {
          self.pos = self.pos + 1 | 0;
          _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
        }
        continue;
      } else {
        break;
      }
    }
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
      self.pos = self.pos + 1 | 0;
    }
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
    const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
    return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt12DestructDecl(kind, names, value));
  }
  const name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Dot__)) {
    self.pos = self.pos + 1 | 0;
    const prop = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Of__)) {
      self.pos = self.pos + 1 | 0;
      _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
    }
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
    const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
    return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt13DottedVarInit(kind, name, prop, value));
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Of__)) {
    self.pos = self.pos + 1 | 0;
    _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
  }
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
  const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  return _M0MP49puruslang5purus3src6parser6Parser14maybe__postfix(self, new _M0DTP49puruslang5purus3src6parser4Stmt7VarDecl(kind, name, value));
}
function _M0MP49puruslang5purus3src6parser6Parser22parse__from__use__stmt(self) {
  self.pos = self.pos + 1 | 0;
  let module_name;
  _L: {
    _L$2: {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      if (_bind.$tag === 3) {
        const _Str = _bind;
        const _module_name = _Str._0;
        module_name = _module_name;
        break _L$2;
      }
      break _L;
    }
    self.pos = self.pos + 1 | 0;
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind8Import____);
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5All____)) {
      self.pos = self.pos + 1 | 0;
      _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2As__);
      const ns = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
      const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
      return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(undefined, _M0DTPC16option6OptionGRPB5ArrayGsEE4None__, ns, module_name, attrs));
    }
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
      const named = _M0MP49puruslang5purus3src6parser6Parser21parse__bracket__names(self);
      const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
      return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(undefined, new _M0DTPC16option6OptionGRPB5ArrayGsEE4Some(named), undefined, module_name, attrs));
    }
    const default_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__)) {
      self.pos = self.pos + 1 | 0;
      const named = _M0MP49puruslang5purus3src6parser6Parser21parse__bracket__names(self);
      const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
      return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(default_name, new _M0DTPC16option6OptionGRPB5ArrayGsEE4Some(named), undefined, module_name, attrs));
    }
    const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
    return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(default_name, _M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, module_name, attrs));
  }
  const name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  while (true) {
    if (_M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind7Newline__) && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof__)) {
      self.pos = self.pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt(new _M0DTP49puruslang5purus3src6parser4Expr6StrLit(`from ${name} use ... is removed. Use: use ${name} as <alias>`));
}
function _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self) {
  if (_M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind6With____)) {
    return _M0DTPC16option6OptionGRPB5ArrayGUsRP49puruslang5purus3src6parser4ExprEEE4None__;
  }
  self.pos = self.pos + 1 | 0;
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__);
  const attrs = [];
  _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
  while (true) {
    if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
      let key;
      const _bind = _M0MP49puruslang5purus3src6parser6Parser7advance(self);
      switch (_bind.$tag) {
        case 7: {
          const _Ident = _bind;
          const _s = _Ident._0;
          key = _s;
          break;
        }
        case 83: {
          key = "type";
          break;
        }
        default: {
          key = "unknown";
        }
      }
      _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
      const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(attrs, { _0: key, _1: value });
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__) || _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
        self.pos = self.pos + 1 | 0;
      }
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      continue;
    } else {
      break;
    }
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
    self.pos = self.pos + 1 | 0;
  }
  return new _M0DTPC16option6OptionGRPB5ArrayGUsRP49puruslang5purus3src6parser4ExprEEE4Some(attrs);
}
function _M0MP49puruslang5purus3src6parser6Parser15parse__if__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind6Then____)) {
    self.pos = self.pos + 1 | 0;
    const then_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6Else____);
    const else_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
    return new _M0DTP49puruslang5purus3src6parser4Stmt8ExprStmt(new _M0DTP49puruslang5purus3src6parser4Expr6IfExpr(cond, then_expr, else_expr));
  }
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  const elifs = [];
  const else_body = new _M0TPB8MutLocalGORPB5ArrayGRP49puruslang5purus3src6parser4StmtEE(_M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4None__);
  const keep_going = new _M0TPB8MutLocalGbE(true);
  while (true) {
    if (keep_going.val) {
      const saved2 = self.pos;
      _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      switch (_bind.$tag) {
        case 41: {
          self.pos = self.pos + 1 | 0;
          const elif_cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
          const elif_indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
          const elif_body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, elif_indent);
          _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(elifs, new _M0TP49puruslang5purus3src6parser10ElIfBranch(elif_cond, elif_body));
          break;
        }
        case 42: {
          self.pos = self.pos + 1 | 0;
          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind4If____)) {
            self.pos = self.pos + 1 | 0;
            const elif_cond$2 = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
            const elif_indent$2 = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
            const elif_body$2 = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, elif_indent$2);
            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(elifs, new _M0TP49puruslang5purus3src6parser10ElIfBranch(elif_cond$2, elif_body$2));
          } else {
            const else_indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
            else_body.val = new _M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4Some(_M0MP49puruslang5purus3src6parser6Parser12parse__block(self, else_indent));
            keep_going.val = false;
          }
          break;
        }
        default: {
          self.pos = saved2;
          keep_going.val = false;
        }
      }
      continue;
    } else {
      break;
    }
  }
  const else_result = else_body.val;
  return new _M0DTP49puruslang5purus3src6parser4Stmt2If(cond, body, elifs, else_result);
}
function _M0MP49puruslang5purus3src6parser6Parser19parse__import__stmt(self) {
  self.pos = self.pos + 1 | 0;
  let s;
  _L: {
    _L$2: {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      if (_bind.$tag === 3) {
        const _Str = _bind;
        const _s = _Str._0;
        s = _s;
        break _L$2;
      }
      break _L;
    }
    self.pos = self.pos + 1 | 0;
    const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
    return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl16SideEffectImport(s, attrs));
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5All____)) {
    self.pos = self.pos + 1 | 0;
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2As__);
    const ns = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6From____);
    const module_name = _M0MP49puruslang5purus3src6parser6Parser20parse__string__value(self);
    const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
    return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(undefined, _M0DTPC16option6OptionGRPB5ArrayGsEE4None__, ns, module_name, attrs));
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
    const named = _M0MP49puruslang5purus3src6parser6Parser21parse__bracket__names(self);
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6From____);
    const module_name = _M0MP49puruslang5purus3src6parser6Parser20parse__string__value(self);
    const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
    return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(undefined, new _M0DTPC16option6OptionGRPB5ArrayGsEE4Some(named), undefined, module_name, attrs));
  }
  const default_name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__)) {
    self.pos = self.pos + 1 | 0;
    const named = _M0MP49puruslang5purus3src6parser6Parser21parse__bracket__names(self);
    _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6From____);
    const module_name = _M0MP49puruslang5purus3src6parser6Parser20parse__string__value(self);
    const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
    return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(default_name, new _M0DTPC16option6OptionGRPB5ArrayGsEE4Some(named), undefined, module_name, attrs));
  }
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind6From____);
  const module_name = _M0MP49puruslang5purus3src6parser6Parser20parse__string__value(self);
  const attrs = _M0MP49puruslang5purus3src6parser6Parser25parse__import__attributes(self);
  return new _M0DTP49puruslang5purus3src6parser4Stmt10ImportDecl(new _M0DTP49puruslang5purus3src6parser10ImportDecl8EsImport(default_name, _M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, module_name, attrs));
}
function _M0MP49puruslang5purus3src6parser6Parser18parse__match__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const subject = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const arms = _M0MP49puruslang5purus3src6parser6Parser18parse__match__arms(self, indent);
  return new _M0DTP49puruslang5purus3src6parser4Stmt9MatchStmt(subject, arms);
}
function _M0MP49puruslang5purus3src6parser6Parser18parse__match__arms(self, min_indent) {
  const arms = [];
  _M0MP49puruslang5purus3src6parser6Parser22parse__one__match__arm(self, arms);
  while (true) {
    if (self.pos < self.tokens.length) {
      const saved = self.pos;
      const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
      if (indent < min_indent) {
        self.pos = saved;
        break;
      }
      if (!_M0MP49puruslang5purus3src6parser6Parser22parse__one__match__arm(self, arms)) {
        self.pos = saved;
        break;
      }
      continue;
    } else {
      break;
    }
  }
  return arms;
}
function _M0MP49puruslang5purus3src6parser6Parser22parse__one__match__arm(self, arms) {
  _L: {
    _L$2: {
      const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
      switch (_bind.$tag) {
        case 55: {
          break _L$2;
        }
        case 57: {
          break _L$2;
        }
        case 42: {
          break _L;
        }
        case 77: {
          break _L;
        }
        default: {
          return false;
        }
      }
    }
    self.pos = self.pos + 1 | 0;
    const pattern = _M0MP49puruslang5purus3src6parser6Parser21parse__match__pattern(self);
    let cond_val;
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind4If____)) {
      self.pos = self.pos + 1 | 0;
      cond_val = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
    } else {
      cond_val = undefined;
    }
    let body;
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind6Then____)) {
      self.pos = self.pos + 1 | 0;
      body = new _M0DTP49puruslang5purus3src6parser9MatchBody8ExprBody(_M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
    } else {
      const bi = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
      body = new _M0DTP49puruslang5purus3src6parser9MatchBody9BlockBody(_M0MP49puruslang5purus3src6parser6Parser12parse__block(self, bi));
    }
    _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(arms, new _M0TP49puruslang5purus3src6parser8MatchArm(pattern, cond_val, body));
    return true;
  }
  self.pos = self.pos + 1 | 0;
  let body;
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind6Then____) || _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind7Newline__)) {
    body = new _M0DTP49puruslang5purus3src6parser9MatchBody8ExprBody(_M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
  } else {
    const bi = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
    body = new _M0DTP49puruslang5purus3src6parser9MatchBody9BlockBody(_M0MP49puruslang5purus3src6parser6Parser12parse__block(self, bi));
  }
  _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(arms, new _M0TP49puruslang5purus3src6parser8MatchArm(new _M0DTP49puruslang5purus3src6parser12MatchPattern7BindPat("_"), undefined, body));
  return true;
}
function _M0MP49puruslang5purus3src6parser6Parser16parse__mod__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  return new _M0DTP49puruslang5purus3src6parser4Stmt7ModDecl(name, body);
}
function _M0MP49puruslang5purus3src6parser6Parser16parse__try__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const try_body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  const saved2 = self.pos;
  _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const catch_name = new _M0TPB8MutLocalGOsE(undefined);
  const catch_body = new _M0TPB8MutLocalGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE([]);
  const finally_body = new _M0TPB8MutLocalGORPB5ArrayGRP49puruslang5purus3src6parser4StmtEE(_M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4None__);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind7Catch____)) {
    self.pos = self.pos + 1 | 0;
    let _tmp;
    let s;
    _L: {
      _L$2: {
        const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
        if (_bind.$tag === 7) {
          const _Ident = _bind;
          const _s = _Ident._0;
          s = _s;
          break _L$2;
        } else {
          _tmp = undefined;
        }
        break _L;
      }
      self.pos = self.pos + 1 | 0;
      _tmp = s;
    }
    catch_name.val = _tmp;
    const ci = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
    catch_body.val = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, ci);
  } else {
    self.pos = saved2;
  }
  const saved3 = self.pos;
  _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Finally____)) {
    self.pos = self.pos + 1 | 0;
    const fi = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
    finally_body.val = new _M0DTPC16option6OptionGRPB5ArrayGRP49puruslang5purus3src6parser4StmtEE4Some(_M0MP49puruslang5purus3src6parser6Parser12parse__block(self, fi));
  } else {
    self.pos = saved3;
  }
  return new _M0DTP49puruslang5purus3src6parser4Stmt8TryCatch(try_body, catch_name.val, catch_body.val, finally_body.val);
}
function _M0MP49puruslang5purus3src6parser6Parser17parse__type__decl(self) {
  self.pos = self.pos + 1 | 0;
  const name = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
  _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
  const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  return new _M0DTP49puruslang5purus3src6parser4Stmt8TypeDecl(name, value);
}
function _M0MP49puruslang5purus3src6parser6Parser19parse__unless__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  return new _M0DTP49puruslang5purus3src6parser4Stmt6Unless(cond, body);
}
function _M0MP49puruslang5purus3src6parser6Parser18parse__until__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  return new _M0DTP49puruslang5purus3src6parser4Stmt5Until(cond, body);
}
function _M0MP49puruslang5purus3src6parser6Parser18parse__while__stmt(self) {
  self.pos = self.pos + 1 | 0;
  const cond = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  const body = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
  return new _M0DTP49puruslang5purus3src6parser4Stmt5While(cond, body);
}
function _M0MP49puruslang5purus3src6parser6Parser20parse__bracket__expr(self) {
  self.pos = self.pos + 1 | 0;
  _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTP49puruslang5purus3src6parser4Expr8ArrayLit([]);
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
    self.pos = self.pos + 1 | 0;
    _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser4Expr9ObjectLit([]);
    }
    self.pos = self.pos - 1 | 0;
  }
  const first = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
  _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
  const _bind = _M0MP49puruslang5purus3src6parser6Parser4peek(self);
  switch (_bind.$tag) {
    case 104: {
      self.pos = self.pos + 1 | 0;
      const end_expr = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
        self.pos = self.pos + 1 | 0;
      }
      return new _M0DTP49puruslang5purus3src6parser4Expr10RangeArray(first, end_expr, true);
    }
    case 105: {
      self.pos = self.pos + 1 | 0;
      const end_expr$2 = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
        self.pos = self.pos + 1 | 0;
      }
      return new _M0DTP49puruslang5purus3src6parser4Expr10RangeArray(first, end_expr$2, false);
    }
    case 11: {
      let key_name;
      switch (first.$tag) {
        case 15: {
          const _Ident = first;
          const _s = _Ident._0;
          key_name = _s;
          break;
        }
        case 3: {
          const _StrLit = first;
          const _s$2 = _StrLit._0;
          key_name = _s$2;
          break;
        }
        default: {
          key_name = "unknown";
        }
      }
      self.pos = self.pos + 1 | 0;
      const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
      const pairs = [{ _0: key_name, _1: value }];
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      while (true) {
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__) || _M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
          self.pos = self.pos + 1 | 0;
          _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
            break;
          }
          const k = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
          _M0MP49puruslang5purus3src6parser6Parser6expect(self, _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__);
          const v = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
          _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(pairs, { _0: k, _1: v });
          _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
          continue;
        } else {
          break;
        }
      }
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
        self.pos = self.pos + 1 | 0;
      }
      return new _M0DTP49puruslang5purus3src6parser4Expr9ObjectLit(pairs);
    }
    case 101: {
      const elements = [first];
      while (true) {
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__)) {
          self.pos = self.pos + 1 | 0;
          _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
            break;
          }
          _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(elements, _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
          _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
          continue;
        } else {
          break;
        }
      }
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
        self.pos = self.pos + 1 | 0;
      }
      return new _M0DTP49puruslang5purus3src6parser4Expr8ArrayLit(elements);
    }
    case 102: {
      const elements$2 = [first];
      while (true) {
        if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
          self.pos = self.pos + 1 | 0;
          _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
          if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
            break;
          }
          _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(elements$2, _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
          _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
          continue;
        } else {
          break;
        }
      }
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
        self.pos = self.pos + 1 | 0;
      }
      return new _M0DTP49puruslang5purus3src6parser4Expr8ArrayLit(elements$2);
    }
    case 100: {
      self.pos = self.pos + 1 | 0;
      return first;
    }
    default: {
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
        self.pos = self.pos + 1 | 0;
      }
      return first;
    }
  }
}
function _M0MP49puruslang5purus3src6parser6Parser15parse__fn__expr(self) {
  self.pos = self.pos + 1 | 0;
  const params = _M0MP49puruslang5purus3src6parser6Parser18parse__param__list(self);
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Gives__)) {
    self.pos = self.pos + 1 | 0;
    _M0MP49puruslang5purus3src6parser6Parser22skip__type__annotation(self);
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2To__)) {
    self.pos = self.pos + 1 | 0;
    if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8Return____)) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTP49puruslang5purus3src6parser4Expr8FnExprTo(params, _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
    } else {
      return new _M0DTP49puruslang5purus3src6parser4Expr8FnExprTo(params, _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
    }
  } else {
    const indent = _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
    const stmts = _M0MP49puruslang5purus3src6parser6Parser12parse__block(self, indent);
    return new _M0DTP49puruslang5purus3src6parser4Expr6FnExpr(params, stmts);
  }
}
function _M0MP49puruslang5purus3src6parser6Parser20parse__list__literal(self) {
  if (_M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
    return new _M0DTP49puruslang5purus3src6parser4Expr8ArrayLit([]);
  }
  self.pos = self.pos + 1 | 0;
  _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
  const elements = [];
  while (true) {
    if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
      _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(elements, _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self));
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__)) {
        self.pos = self.pos + 1 | 0;
        _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      }
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
        self.pos = self.pos + 1 | 0;
        _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      }
      continue;
    } else {
      break;
    }
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
    self.pos = self.pos + 1 | 0;
  }
  return new _M0DTP49puruslang5purus3src6parser4Expr8ArrayLit(elements);
}
function _M0MP49puruslang5purus3src6parser6Parser22parse__object__literal(self) {
  if (_M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8LBracket__)) {
    return new _M0DTP49puruslang5purus3src6parser4Expr9ObjectLit([]);
  }
  self.pos = self.pos + 1 | 0;
  _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
  const pairs = [];
  while (true) {
    if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
      const key = _M0MP49puruslang5purus3src6parser6Parser18parse__ident__name(self);
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind2Be__)) {
        self.pos = self.pos + 1 | 0;
        const value = _M0MP49puruslang5purus3src6parser6Parser11parse__expr(self);
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(pairs, { _0: key, _1: value });
      } else {
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(pairs, { _0: key, _1: new _M0DTP49puruslang5purus3src6parser4Expr5Ident(key) });
      }
      _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind5Comma__)) {
        self.pos = self.pos + 1 | 0;
        _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      }
      if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind9Semicolon__)) {
        self.pos = self.pos + 1 | 0;
        _M0MP49puruslang5purus3src6parser6Parser17skip__bracket__ws(self);
      }
      continue;
    } else {
      break;
    }
  }
  if (_M0IP49puruslang5purus3src5lexer9TokenKindPB2Eq5equal(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind8RBracket__)) {
    self.pos = self.pos + 1 | 0;
  }
  return new _M0DTP49puruslang5purus3src6parser4Expr9ObjectLit(pairs);
}
function _M0MP49puruslang5purus3src6parser6Parser5parse(self) {
  const stmts = [];
  _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
  while (true) {
    if (self.pos < self.tokens.length && _M0IP016_24default__implPB2Eq10not__equalGRP49puruslang5purus3src5lexer9TokenKindE(_M0MP49puruslang5purus3src6parser6Parser4peek(self), _M0DTP49puruslang5purus3src5lexer9TokenKind3Eof__)) {
      let s;
      _L: {
        _L$2: {
          const _bind = _M0MP49puruslang5purus3src6parser6Parser11parse__stmt(self);
          if (_bind === undefined) {
            self.pos = self.pos + 1 | 0;
          } else {
            const _Some = _bind;
            const _s = _Some;
            s = _s;
            break _L$2;
          }
          break _L;
        }
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(stmts, s);
      }
      _M0MP49puruslang5purus3src6parser6Parser27skip__newlines__and__indent(self);
      continue;
    } else {
      break;
    }
  }
  return stmts;
}
function _M0FP49puruslang5purus3src7codegen9is__blank(name) {
  return name === "blank" || name === "_";
}
function _M0FP49puruslang5purus3src7codegen18is__alpha__codegen(c) {
  return c >= 97 && c <= 122 || c >= 65 && c <= 90;
}
function _M0FP49puruslang5purus3src7codegen20is__valid__js__ident(s) {
  if (s.length === 0) {
    return false;
  }
  const chars = _M0MPC16string6String9to__array(s);
  const first = _M0MPC15array5Array2atGcE(chars, 0);
  if (!_M0FP49puruslang5purus3src7codegen18is__alpha__codegen(first) && (first !== 95 && first !== 36)) {
    return false;
  }
  const i = new _M0TPB8MutLocalGiE(1);
  while (true) {
    if (i.val < chars.length) {
      const c = _M0MPC15array5Array2atGcE(chars, i.val);
      if (!_M0FP49puruslang5purus3src7codegen18is__alpha__codegen(c) && (!(c >= 48 && c <= 57) && (c !== 95 && c !== 36))) {
        return false;
      }
      i.val = i.val + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0FP49puruslang5purus3src7codegen9js__binop(op) {
  switch (op) {
    case 0: {
      return "+";
    }
    case 1: {
      return "-";
    }
    case 2: {
      return "*";
    }
    case 3: {
      return "/";
    }
    case 4: {
      return "%";
    }
    case 5: {
      return "**";
    }
    case 6: {
      return "===";
    }
    case 7: {
      return "!==";
    }
    case 8: {
      return "<";
    }
    case 9: {
      return ">";
    }
    case 10: {
      return "<=";
    }
    case 11: {
      return ">=";
    }
    case 12: {
      return "&&";
    }
    case 13: {
      return "||";
    }
    case 14: {
      return "??";
    }
    case 15: {
      return "&";
    }
    case 16: {
      return "|";
    }
    case 17: {
      return "^";
    }
    case 18: {
      return "<<";
    }
    case 19: {
      return ">>";
    }
    case 20: {
      return ">>>";
    }
    default: {
      return "/";
    }
  }
}
function _M0FP49puruslang5purus3src7codegen15js__escape__str(s) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const chars = _M0MPC16string6String9to__array(s);
  const _bind = chars.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const c = chars[_];
      switch (c) {
        case 92: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\\");
          break;
        }
        case 34: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\"");
          break;
        }
        case 10: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\n");
          break;
        }
        case 13: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\r");
          break;
        }
        case 9: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\t");
          break;
        }
        default: {
          _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPB13StringBuilder10to__string(buf);
}
function _M0FP49puruslang5purus3src7codegen20js__escape__template(s) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const chars = _M0MPC16string6String9to__array(s);
  const _bind = chars.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const c = chars[_];
      switch (c) {
        case 92: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\\");
          break;
        }
        case 96: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\`");
          break;
        }
        case 36: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\$");
          break;
        }
        default: {
          _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPB13StringBuilder10to__string(buf);
}
function _M0FP49puruslang5purus3src7codegen9js__ident(name) {
  const _bind = "-";
  const _tmp = new _M0TPC16string10StringView(_bind, 0, _bind.length);
  const _bind$2 = "_";
  return _M0MPC16string6String12replace__all(name, _tmp, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length));
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, s) {
  _M0IPB13StringBuilderPB6Logger13write__string(self.buf, s);
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__params(self, params) {
  const blank_count = new _M0TPB8MutLocalGiE(0);
  const first = new _M0TPB8MutLocalGbE(true);
  const _bind = params.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const p = params[_];
      if (!first.val) {
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
      }
      if (p === "blank") {
        if (blank_count.val === 0) {
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "_");
        } else {
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, `_${_M0MPC13int3Int18to__string_2einner(blank_count.val, 10)}`);
        }
        blank_count.val = blank_count.val + 1 | 0;
      } else {
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(p));
      }
      first.val = false;
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP49puruslang5purus3src7codegen17compound__op__str(op) {
  switch (op) {
    case 0: {
      return " += ";
    }
    case 1: {
      return " -= ";
    }
    case 2: {
      return " *= ";
    }
    case 3: {
      return " /= ";
    }
    case 4: {
      return " %= ";
    }
    case 5: {
      return " **= ";
    }
    case 15: {
      return " &= ";
    }
    case 16: {
      return " |= ";
    }
    case 17: {
      return " ^= ";
    }
    case 18: {
      return " <<= ";
    }
    case 19: {
      return " >>= ";
    }
    case 20: {
      return " >>>= ";
    }
    case 12: {
      return " &&= ";
    }
    case 13: {
      return " ||= ";
    }
    case 14: {
      return " ??= ";
    }
    default: {
      return " += ";
    }
  }
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self) {
  const i = new _M0TPB8MutLocalGiE(0);
  while (true) {
    if (i.val < self.indent_level) {
      _M0IPB13StringBuilderPB6Logger13write__string(self.buf, "  ");
      i.val = i.val + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, s) {
  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
  _M0IPB13StringBuilderPB6Logger13write__string(self.buf, s);
  _M0IPB13StringBuilderPB6Logger11write__char(self.buf, 10);
}
function _M0FP49puruslang5purus3src7codegen16expr__has__yield(expr) {
  let _tmp = expr;
  _L: while (true) {
    const expr$2 = _tmp;
    let t;
    let c;
    let e;
    _L$2: {
      let e$2;
      _L$3: {
        let pairs;
        _L$4: {
          let elems;
          _L$5: {
            let args;
            let obj;
            _L$6: {
              let callee;
              let args$2;
              _L$7: {
                let e$3;
                _L$8: {
                  let l;
                  let r;
                  _L$9: {
                    switch (expr$2.$tag) {
                      case 44: {
                        return true;
                      }
                      case 18: {
                        const _BinOp = expr$2;
                        const _l = _BinOp._1;
                        const _r = _BinOp._2;
                        l = _l;
                        r = _r;
                        break _L$9;
                      }
                      case 20: {
                        const _UnaryNot = expr$2;
                        const _e = _UnaryNot._0;
                        e$3 = _e;
                        break _L$8;
                      }
                      case 19: {
                        const _UnaryNeg = expr$2;
                        const _e$2 = _UnaryNeg._0;
                        e$3 = _e$2;
                        break _L$8;
                      }
                      case 21: {
                        const _UnaryBnot = expr$2;
                        const _e$3 = _UnaryBnot._0;
                        e$3 = _e$3;
                        break _L$8;
                      }
                      case 22: {
                        const _UnaryTypeof = expr$2;
                        const _e$4 = _UnaryTypeof._0;
                        e$3 = _e$4;
                        break _L$8;
                      }
                      case 35: {
                        const _AwaitExpr = expr$2;
                        const _e$5 = _AwaitExpr._0;
                        e$3 = _e$5;
                        break _L$8;
                      }
                      case 28: {
                        const _Call = expr$2;
                        const _callee = _Call._0;
                        const _args = _Call._1;
                        callee = _callee;
                        args$2 = _args;
                        break _L$7;
                      }
                      case 29: {
                        const _MethodCall = expr$2;
                        const _obj = _MethodCall._0;
                        const _args$2 = _MethodCall._2;
                        args = _args$2;
                        obj = _obj;
                        break _L$6;
                      }
                      case 40: {
                        const _OptMethodCall = expr$2;
                        const _obj$2 = _OptMethodCall._0;
                        const _args$3 = _OptMethodCall._2;
                        args = _args$3;
                        obj = _obj$2;
                        break _L$6;
                      }
                      case 11: {
                        const _ArrayLit = expr$2;
                        const _elems = _ArrayLit._0;
                        elems = _elems;
                        break _L$5;
                      }
                      case 14: {
                        const _ObjectLit = expr$2;
                        const _pairs = _ObjectLit._0;
                        pairs = _pairs;
                        break _L$4;
                      }
                      case 16: {
                        const _DotAccess = expr$2;
                        const _e$6 = _DotAccess._0;
                        e$2 = _e$6;
                        break _L$3;
                      }
                      case 41: {
                        const _ComputedAccess = expr$2;
                        const _e$7 = _ComputedAccess._0;
                        e$2 = _e$7;
                        break _L$3;
                      }
                      case 39: {
                        const _OptDotAccess = expr$2;
                        const _e$8 = _OptDotAccess._0;
                        e$2 = _e$8;
                        break _L$3;
                      }
                      case 32: {
                        const _IfExpr = expr$2;
                        const _c = _IfExpr._0;
                        const _t = _IfExpr._1;
                        const _e$9 = _IfExpr._2;
                        t = _t;
                        c = _c;
                        e = _e$9;
                        break _L$2;
                      }
                      default: {
                        return false;
                      }
                    }
                  }
                  if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(l)) {
                    return true;
                  } else {
                    _tmp = r;
                    continue;
                  }
                }
                _tmp = e$3;
                continue;
              }
              if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(callee)) {
                return true;
              }
              const _bind = args$2.length;
              let _tmp$2 = 0;
              while (true) {
                const _ = _tmp$2;
                if (_ < _bind) {
                  const a = args$2[_];
                  if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(a)) {
                    return true;
                  }
                  _tmp$2 = _ + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              return false;
            }
            if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(obj)) {
              return true;
            }
            const _bind = args.length;
            let _tmp$2 = 0;
            while (true) {
              const _ = _tmp$2;
              if (_ < _bind) {
                const a = args[_];
                if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(a)) {
                  return true;
                }
                _tmp$2 = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            return false;
          }
          const _bind = elems.length;
          let _tmp$2 = 0;
          while (true) {
            const _ = _tmp$2;
            if (_ < _bind) {
              const e$3 = elems[_];
              if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(e$3)) {
                return true;
              }
              _tmp$2 = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return false;
        }
        const _bind = pairs.length;
        let _tmp$2 = 0;
        while (true) {
          const _ = _tmp$2;
          if (_ < _bind) {
            const p = pairs[_];
            if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(p._1)) {
              return true;
            }
            _tmp$2 = _ + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        return false;
      }
      _tmp = e$2;
      continue;
    }
    if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(c)) {
      return true;
    } else {
      let _tmp$2;
      if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(t)) {
        _tmp$2 = true;
      } else {
        _tmp = e;
        continue;
      }
      return _tmp$2;
    }
  }
}
function _M0FP49puruslang5purus3src7codegen18stmts__have__yield(stmts) {
  const _bind = stmts.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const s = stmts[_];
      if (_M0FP49puruslang5purus3src7codegen16stmt__has__yield(s)) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FP49puruslang5purus3src7codegen16stmt__has__yield(stmt) {
  let _tmp = stmt;
  _L: while (true) {
    const stmt$2 = _tmp;
    let s;
    _L$2: {
      let s$2;
      _L$3: {
        let cond;
        let s$3;
        _L$4: {
          let catch_body;
          let try_body;
          let finally_body;
          _L$5: {
            let end;
            let start;
            let body;
            _L$6: {
              let iter;
              let body$2;
              _L$7: {
                let body$3;
                let cond$2;
                _L$8: {
                  let elifs;
                  let cond$3;
                  let body$4;
                  let else_body;
                  _L$9: {
                    let e;
                    _L$10: {
                      let e$2;
                      _L$11: {
                        let e$3;
                        _L$12: {
                          switch (stmt$2.$tag) {
                            case 24: {
                              const _ExprStmt = stmt$2;
                              const _e = _ExprStmt._0;
                              e$3 = _e;
                              break _L$12;
                            }
                            case 21: {
                              const _Return = stmt$2;
                              const _x = _Return._0;
                              if (_x === undefined) {
                                return false;
                              } else {
                                const _Some = _x;
                                const _e$2 = _Some;
                                e$3 = _e$2;
                                break _L$12;
                              }
                            }
                            case 20: {
                              const _Throw = stmt$2;
                              const _e$2 = _Throw._0;
                              e$3 = _e$2;
                              break _L$12;
                            }
                            case 32: {
                              const _DeleteStmt = stmt$2;
                              const _e$3 = _DeleteStmt._0;
                              e$3 = _e$3;
                              break _L$12;
                            }
                            case 0: {
                              const _VarDecl = stmt$2;
                              const _e$4 = _VarDecl._2;
                              e$2 = _e$4;
                              break _L$11;
                            }
                            case 4: {
                              const _Assign = stmt$2;
                              const _e$5 = _Assign._1;
                              e$2 = _e$5;
                              break _L$11;
                            }
                            case 3: {
                              const _DottedVarInit = stmt$2;
                              const _e$6 = _DottedVarInit._3;
                              e = _e$6;
                              break _L$10;
                            }
                            case 7: {
                              const _If = stmt$2;
                              const _cond = _If._0;
                              const _body = _If._1;
                              const _elifs = _If._2;
                              const _else_body = _If._3;
                              elifs = _elifs;
                              cond$3 = _cond;
                              body$4 = _body;
                              else_body = _else_body;
                              break _L$9;
                            }
                            case 9: {
                              const _While = stmt$2;
                              const _cond$2 = _While._0;
                              const _body$2 = _While._1;
                              body$3 = _body$2;
                              cond$2 = _cond$2;
                              break _L$8;
                            }
                            case 10: {
                              const _Until = stmt$2;
                              const _cond$3 = _Until._0;
                              const _body$3 = _Until._1;
                              body$3 = _body$3;
                              cond$2 = _cond$3;
                              break _L$8;
                            }
                            case 11: {
                              const _DoWhile = stmt$2;
                              const _cond$4 = _DoWhile._0;
                              const _body$4 = _DoWhile._1;
                              body$3 = _body$4;
                              cond$2 = _cond$4;
                              break _L$8;
                            }
                            case 12: {
                              const _ForIn = stmt$2;
                              const _iter = _ForIn._2;
                              const _body$5 = _ForIn._3;
                              iter = _iter;
                              body$2 = _body$5;
                              break _L$7;
                            }
                            case 13: {
                              const _ForRange = stmt$2;
                              const _start = _ForRange._1;
                              const _end = _ForRange._2;
                              const _body$6 = _ForRange._3;
                              end = _end;
                              start = _start;
                              body = _body$6;
                              break _L$6;
                            }
                            case 19: {
                              const _TryCatch = stmt$2;
                              const _try_body = _TryCatch._0;
                              const _catch_body = _TryCatch._2;
                              const _finally_body = _TryCatch._3;
                              catch_body = _catch_body;
                              try_body = _try_body;
                              finally_body = _finally_body;
                              break _L$5;
                            }
                            case 16: {
                              const _PostfixIf = stmt$2;
                              const _s = _PostfixIf._0;
                              const _cond$5 = _PostfixIf._1;
                              cond = _cond$5;
                              s$3 = _s;
                              break _L$4;
                            }
                            case 17: {
                              const _PostfixUnless = stmt$2;
                              const _s$2 = _PostfixUnless._0;
                              const _cond$6 = _PostfixUnless._1;
                              cond = _cond$6;
                              s$3 = _s$2;
                              break _L$4;
                            }
                            case 18: {
                              const _PostfixFor = stmt$2;
                              const _s$3 = _PostfixFor._0;
                              s$2 = _s$3;
                              break _L$3;
                            }
                            case 28: {
                              const _ExportDefault = stmt$2;
                              const _s$4 = _ExportDefault._0;
                              s = _s$4;
                              break _L$2;
                            }
                            case 29: {
                              const _PublicDecl = stmt$2;
                              const _s$5 = _PublicDecl._0;
                              s = _s$5;
                              break _L$2;
                            }
                            default: {
                              return false;
                            }
                          }
                        }
                        return _M0FP49puruslang5purus3src7codegen16expr__has__yield(e$3);
                      }
                      return _M0FP49puruslang5purus3src7codegen16expr__has__yield(e$2);
                    }
                    return _M0FP49puruslang5purus3src7codegen16expr__has__yield(e);
                  }
                  if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(cond$3) || _M0FP49puruslang5purus3src7codegen18stmts__have__yield(body$4)) {
                    return true;
                  }
                  const _bind = elifs.length;
                  let _tmp$2 = 0;
                  while (true) {
                    const _ = _tmp$2;
                    if (_ < _bind) {
                      const b = elifs[_];
                      if (_M0FP49puruslang5purus3src7codegen16expr__has__yield(b.cond) || _M0FP49puruslang5purus3src7codegen18stmts__have__yield(b.body)) {
                        return true;
                      }
                      _tmp$2 = _ + 1 | 0;
                      continue;
                    } else {
                      break;
                    }
                  }
                  let eb;
                  _L$10: {
                    if (else_body.$tag === 1) {
                      const _Some = else_body;
                      const _eb = _Some._0;
                      eb = _eb;
                      break _L$10;
                    } else {
                      return false;
                    }
                  }
                  return _M0FP49puruslang5purus3src7codegen18stmts__have__yield(eb);
                }
                return _M0FP49puruslang5purus3src7codegen16expr__has__yield(cond$2) || _M0FP49puruslang5purus3src7codegen18stmts__have__yield(body$3);
              }
              return _M0FP49puruslang5purus3src7codegen16expr__has__yield(iter) || _M0FP49puruslang5purus3src7codegen18stmts__have__yield(body$2);
            }
            return _M0FP49puruslang5purus3src7codegen16expr__has__yield(start) || (_M0FP49puruslang5purus3src7codegen16expr__has__yield(end) || _M0FP49puruslang5purus3src7codegen18stmts__have__yield(body));
          }
          if (_M0FP49puruslang5purus3src7codegen18stmts__have__yield(try_body) || _M0FP49puruslang5purus3src7codegen18stmts__have__yield(catch_body)) {
            return true;
          }
          let fb;
          _L$6: {
            if (finally_body.$tag === 1) {
              const _Some = finally_body;
              const _fb = _Some._0;
              fb = _fb;
              break _L$6;
            } else {
              return false;
            }
          }
          return _M0FP49puruslang5purus3src7codegen18stmts__have__yield(fb);
        }
        return _M0FP49puruslang5purus3src7codegen16stmt__has__yield(s$3) || _M0FP49puruslang5purus3src7codegen16expr__has__yield(cond);
      }
      _tmp = s$2;
      continue;
    }
    _tmp = s;
    continue;
  }
}
function _M0FP49puruslang5purus3src7codegen16body__has__yield(body) {
  let expr;
  _L: {
    let stmts;
    _L$2: {
      switch (body.$tag) {
        case 0: {
          const _Block = body;
          const _stmts = _Block._0;
          stmts = _stmts;
          break _L$2;
        }
        case 1: {
          const _ToExpr = body;
          const _expr = _ToExpr._0;
          expr = _expr;
          break _L;
        }
        default: {
          const _ToReturnExpr = body;
          const _expr$2 = _ToReturnExpr._0;
          expr = _expr$2;
          break _L;
        }
      }
    }
    return _M0FP49puruslang5purus3src7codegen18stmts__have__yield(stmts);
  }
  return _M0FP49puruslang5purus3src7codegen16expr__has__yield(expr);
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr) {
  let _tmp = self;
  let _tmp$2 = expr;
  _L: while (true) {
    const self$2 = _tmp;
    const expr$2 = _tmp$2;
    let params;
    let body_expr;
    _L$2: {
      let params$2;
      let body;
      _L$3: {
        let obj;
        let key;
        _L$4: {
          let meth_name;
          let obj$2;
          let args;
          _L$5: {
            let obj$3;
            let field;
            _L$6: {
              let inner;
              _L$7: {
                let inner$2;
                _L$8: {
                  let inner$3;
                  _L$9: {
                    let inner$4;
                    _L$10: {
                      let inner$5;
                      _L$11: {
                        let inner$6;
                        _L$12: {
                          let inner$7;
                          _L$13: {
                            let subject;
                            let arms;
                            _L$14: {
                              let catch_name;
                              let try_body;
                              let catch_body;
                              _L$15: {
                                let then_expr;
                                let cond;
                                let else_expr;
                                _L$16: {
                                  let left;
                                  let right;
                                  _L$17: {
                                    let callee;
                                    let args$2;
                                    _L$18: {
                                      let meth_name$2;
                                      let obj$4;
                                      let args$3;
                                      _L$19: {
                                        let callee$2;
                                        let args$4;
                                        _L$20: {
                                          let params$3;
                                          let body_expr$2;
                                          _L$21: {
                                            let params$4;
                                            let body$2;
                                            _L$22: {
                                              let expr$3;
                                              let type_expr;
                                              _L$23: {
                                                let expr$4;
                                                let _type_name;
                                                _L$24: {
                                                  let inner$8;
                                                  _L$25: {
                                                    let inner$9;
                                                    _L$26: {
                                                      let inner$10;
                                                      _L$27: {
                                                        let inner$11;
                                                        _L$28: {
                                                          let inner$12;
                                                          _L$29: {
                                                            let left$2;
                                                            let op;
                                                            let right$2;
                                                            _L$30: {
                                                              let obj$5;
                                                              let index;
                                                              _L$31: {
                                                                let obj$6;
                                                                let field$2;
                                                                _L$32: {
                                                                  let name;
                                                                  _L$33: {
                                                                    let pairs;
                                                                    _L$34: {
                                                                      let end;
                                                                      let obj$7;
                                                                      let start;
                                                                      let inclusive;
                                                                      _L$35: {
                                                                        let end$2;
                                                                        let start$2;
                                                                        let inclusive$2;
                                                                        _L$36: {
                                                                          let elems;
                                                                          _L$37: {
                                                                            let positive;
                                                                            _L$38: {
                                                                              let b;
                                                                              _L$39: {
                                                                                let pattern;
                                                                                let flags;
                                                                                _L$40: {
                                                                                  let parts;
                                                                                  _L$41: {
                                                                                    let s;
                                                                                    _L$42: {
                                                                                      let f;
                                                                                      _L$43: {
                                                                                        let s$2;
                                                                                        _L$44: {
                                                                                          let n;
                                                                                          _L$45: {
                                                                                            switch (expr$2.$tag) {
                                                                                              case 0: {
                                                                                                const _IntLit = expr$2;
                                                                                                const _n = _IntLit._0;
                                                                                                n = _n;
                                                                                                break _L$45;
                                                                                              }
                                                                                              case 1: {
                                                                                                const _BigIntLit = expr$2;
                                                                                                const _s = _BigIntLit._0;
                                                                                                s$2 = _s;
                                                                                                break _L$44;
                                                                                              }
                                                                                              case 2: {
                                                                                                const _FloatLit = expr$2;
                                                                                                const _f = _FloatLit._0;
                                                                                                f = _f;
                                                                                                break _L$43;
                                                                                              }
                                                                                              case 3: {
                                                                                                const _StrLit = expr$2;
                                                                                                const _s$2 = _StrLit._0;
                                                                                                s = _s$2;
                                                                                                break _L$42;
                                                                                              }
                                                                                              case 4: {
                                                                                                const _StrInterp = expr$2;
                                                                                                const _parts = _StrInterp._0;
                                                                                                parts = _parts;
                                                                                                break _L$41;
                                                                                              }
                                                                                              case 5: {
                                                                                                const _RegexLit = expr$2;
                                                                                                const _pattern = _RegexLit._0;
                                                                                                const _flags = _RegexLit._1;
                                                                                                pattern = _pattern;
                                                                                                flags = _flags;
                                                                                                break _L$40;
                                                                                              }
                                                                                              case 6: {
                                                                                                const _BoolLit = expr$2;
                                                                                                const _b = _BoolLit._0;
                                                                                                b = _b;
                                                                                                break _L$39;
                                                                                              }
                                                                                              case 7: {
                                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "null");
                                                                                                return;
                                                                                              }
                                                                                              case 8: {
                                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "undefined");
                                                                                                return;
                                                                                              }
                                                                                              case 9: {
                                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "NaN");
                                                                                                return;
                                                                                              }
                                                                                              case 10: {
                                                                                                const _InfinityLit = expr$2;
                                                                                                const _positive = _InfinityLit._0;
                                                                                                positive = _positive;
                                                                                                break _L$38;
                                                                                              }
                                                                                              case 11: {
                                                                                                const _ArrayLit = expr$2;
                                                                                                const _elems = _ArrayLit._0;
                                                                                                elems = _elems;
                                                                                                break _L$37;
                                                                                              }
                                                                                              case 12: {
                                                                                                const _RangeArray = expr$2;
                                                                                                const _start = _RangeArray._0;
                                                                                                const _end = _RangeArray._1;
                                                                                                const _inclusive = _RangeArray._2;
                                                                                                end$2 = _end;
                                                                                                start$2 = _start;
                                                                                                inclusive$2 = _inclusive;
                                                                                                break _L$36;
                                                                                              }
                                                                                              case 13: {
                                                                                                const _Slice = expr$2;
                                                                                                const _obj = _Slice._0;
                                                                                                const _start$2 = _Slice._1;
                                                                                                const _end$2 = _Slice._2;
                                                                                                const _inclusive$2 = _Slice._3;
                                                                                                end = _end$2;
                                                                                                obj$7 = _obj;
                                                                                                start = _start$2;
                                                                                                inclusive = _inclusive$2;
                                                                                                break _L$35;
                                                                                              }
                                                                                              case 14: {
                                                                                                const _ObjectLit = expr$2;
                                                                                                const _pairs = _ObjectLit._0;
                                                                                                pairs = _pairs;
                                                                                                break _L$34;
                                                                                              }
                                                                                              case 15: {
                                                                                                const _Ident = expr$2;
                                                                                                const _name = _Ident._0;
                                                                                                name = _name;
                                                                                                break _L$33;
                                                                                              }
                                                                                              case 16: {
                                                                                                const _DotAccess = expr$2;
                                                                                                const _obj$2 = _DotAccess._0;
                                                                                                const _field = _DotAccess._1;
                                                                                                obj$6 = _obj$2;
                                                                                                field$2 = _field;
                                                                                                break _L$32;
                                                                                              }
                                                                                              case 17: {
                                                                                                const _IndexAccess = expr$2;
                                                                                                const _obj$3 = _IndexAccess._0;
                                                                                                const _index = _IndexAccess._1;
                                                                                                obj$5 = _obj$3;
                                                                                                index = _index;
                                                                                                break _L$31;
                                                                                              }
                                                                                              case 18: {
                                                                                                const _BinOp = expr$2;
                                                                                                const _op = _BinOp._0;
                                                                                                const _left = _BinOp._1;
                                                                                                const _right = _BinOp._2;
                                                                                                left$2 = _left;
                                                                                                op = _op;
                                                                                                right$2 = _right;
                                                                                                break _L$30;
                                                                                              }
                                                                                              case 19: {
                                                                                                const _UnaryNeg = expr$2;
                                                                                                const _inner = _UnaryNeg._0;
                                                                                                inner$12 = _inner;
                                                                                                break _L$29;
                                                                                              }
                                                                                              case 20: {
                                                                                                const _UnaryNot = expr$2;
                                                                                                const _inner$2 = _UnaryNot._0;
                                                                                                inner$11 = _inner$2;
                                                                                                break _L$28;
                                                                                              }
                                                                                              case 21: {
                                                                                                const _UnaryBnot = expr$2;
                                                                                                const _inner$3 = _UnaryBnot._0;
                                                                                                inner$10 = _inner$3;
                                                                                                break _L$27;
                                                                                              }
                                                                                              case 22: {
                                                                                                const _UnaryTypeof = expr$2;
                                                                                                const _inner$4 = _UnaryTypeof._0;
                                                                                                inner$9 = _inner$4;
                                                                                                break _L$26;
                                                                                              }
                                                                                              case 23: {
                                                                                                const _UnaryVoid = expr$2;
                                                                                                const _inner$5 = _UnaryVoid._0;
                                                                                                inner$8 = _inner$5;
                                                                                                break _L$25;
                                                                                              }
                                                                                              case 24: {
                                                                                                const _AsCast = expr$2;
                                                                                                const _expr = _AsCast._0;
                                                                                                const __type_name = _AsCast._1;
                                                                                                expr$4 = _expr;
                                                                                                _type_name = __type_name;
                                                                                                break _L$24;
                                                                                              }
                                                                                              case 25: {
                                                                                                const _Instanceof = expr$2;
                                                                                                const _expr$2 = _Instanceof._0;
                                                                                                const _type_expr = _Instanceof._1;
                                                                                                expr$3 = _expr$2;
                                                                                                type_expr = _type_expr;
                                                                                                break _L$23;
                                                                                              }
                                                                                              case 26: {
                                                                                                const _FnExpr = expr$2;
                                                                                                const _params = _FnExpr._0;
                                                                                                const _body = _FnExpr._1;
                                                                                                params$4 = _params;
                                                                                                body$2 = _body;
                                                                                                break _L$22;
                                                                                              }
                                                                                              case 27: {
                                                                                                const _FnExprTo = expr$2;
                                                                                                const _params$2 = _FnExprTo._0;
                                                                                                const _body_expr = _FnExprTo._1;
                                                                                                params$3 = _params$2;
                                                                                                body_expr$2 = _body_expr;
                                                                                                break _L$21;
                                                                                              }
                                                                                              case 28: {
                                                                                                const _Call = expr$2;
                                                                                                const _callee = _Call._0;
                                                                                                const _args = _Call._1;
                                                                                                callee$2 = _callee;
                                                                                                args$4 = _args;
                                                                                                break _L$20;
                                                                                              }
                                                                                              case 29: {
                                                                                                const _MethodCall = expr$2;
                                                                                                const _obj$4 = _MethodCall._0;
                                                                                                const _meth_name = _MethodCall._1;
                                                                                                const _args$2 = _MethodCall._2;
                                                                                                meth_name$2 = _meth_name;
                                                                                                obj$4 = _obj$4;
                                                                                                args$3 = _args$2;
                                                                                                break _L$19;
                                                                                              }
                                                                                              case 30: {
                                                                                                const _NewExpr = expr$2;
                                                                                                const _callee$2 = _NewExpr._0;
                                                                                                const _args$3 = _NewExpr._1;
                                                                                                callee = _callee$2;
                                                                                                args$2 = _args$3;
                                                                                                break _L$18;
                                                                                              }
                                                                                              case 31: {
                                                                                                const _Pipe = expr$2;
                                                                                                const _left$2 = _Pipe._0;
                                                                                                const _right$2 = _Pipe._1;
                                                                                                left = _left$2;
                                                                                                right = _right$2;
                                                                                                break _L$17;
                                                                                              }
                                                                                              case 32: {
                                                                                                const _IfExpr = expr$2;
                                                                                                const _cond = _IfExpr._0;
                                                                                                const _then_expr = _IfExpr._1;
                                                                                                const _else_expr = _IfExpr._2;
                                                                                                then_expr = _then_expr;
                                                                                                cond = _cond;
                                                                                                else_expr = _else_expr;
                                                                                                break _L$16;
                                                                                              }
                                                                                              case 33: {
                                                                                                const _TryExpr = expr$2;
                                                                                                const _try_body = _TryExpr._0;
                                                                                                const _catch_name = _TryExpr._1;
                                                                                                const _catch_body = _TryExpr._2;
                                                                                                catch_name = _catch_name;
                                                                                                try_body = _try_body;
                                                                                                catch_body = _catch_body;
                                                                                                break _L$15;
                                                                                              }
                                                                                              case 34: {
                                                                                                const _MatchExpr = expr$2;
                                                                                                const _subject = _MatchExpr._0;
                                                                                                const _arms = _MatchExpr._1;
                                                                                                subject = _subject;
                                                                                                arms = _arms;
                                                                                                break _L$14;
                                                                                              }
                                                                                              case 35: {
                                                                                                const _AwaitExpr = expr$2;
                                                                                                const _inner$6 = _AwaitExpr._0;
                                                                                                inner$7 = _inner$6;
                                                                                                break _L$13;
                                                                                              }
                                                                                              case 44: {
                                                                                                const _YieldExpr = expr$2;
                                                                                                const _inner$7 = _YieldExpr._0;
                                                                                                inner$6 = _inner$7;
                                                                                                break _L$12;
                                                                                              }
                                                                                              case 45: {
                                                                                                const _PostInc = expr$2;
                                                                                                const _inner$8 = _PostInc._0;
                                                                                                inner$5 = _inner$8;
                                                                                                break _L$11;
                                                                                              }
                                                                                              case 46: {
                                                                                                const _PostDec = expr$2;
                                                                                                const _inner$9 = _PostDec._0;
                                                                                                inner$4 = _inner$9;
                                                                                                break _L$10;
                                                                                              }
                                                                                              case 47: {
                                                                                                const _PreInc = expr$2;
                                                                                                const _inner$10 = _PreInc._0;
                                                                                                inner$3 = _inner$10;
                                                                                                break _L$9;
                                                                                              }
                                                                                              case 48: {
                                                                                                const _PreDec = expr$2;
                                                                                                const _inner$11 = _PreDec._0;
                                                                                                inner$2 = _inner$11;
                                                                                                break _L$8;
                                                                                              }
                                                                                              case 36: {
                                                                                                const _DeleteExpr = expr$2;
                                                                                                const _inner$12 = _DeleteExpr._0;
                                                                                                inner = _inner$12;
                                                                                                break _L$7;
                                                                                              }
                                                                                              case 37: {
                                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "this");
                                                                                                return;
                                                                                              }
                                                                                              case 38: {
                                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "super");
                                                                                                return;
                                                                                              }
                                                                                              case 39: {
                                                                                                const _OptDotAccess = expr$2;
                                                                                                const _obj$5 = _OptDotAccess._0;
                                                                                                const _field$2 = _OptDotAccess._1;
                                                                                                obj$3 = _obj$5;
                                                                                                field = _field$2;
                                                                                                break _L$6;
                                                                                              }
                                                                                              case 40: {
                                                                                                const _OptMethodCall = expr$2;
                                                                                                const _obj$6 = _OptMethodCall._0;
                                                                                                const _meth_name$2 = _OptMethodCall._1;
                                                                                                const _args$4 = _OptMethodCall._2;
                                                                                                meth_name = _meth_name$2;
                                                                                                obj$2 = _obj$6;
                                                                                                args = _args$4;
                                                                                                break _L$5;
                                                                                              }
                                                                                              case 41: {
                                                                                                const _ComputedAccess = expr$2;
                                                                                                const _obj$7 = _ComputedAccess._0;
                                                                                                const _key = _ComputedAccess._1;
                                                                                                obj = _obj$7;
                                                                                                key = _key;
                                                                                                break _L$4;
                                                                                              }
                                                                                              case 42: {
                                                                                                const _AsyncFnExpr = expr$2;
                                                                                                const _params$3 = _AsyncFnExpr._0;
                                                                                                const _body$2 = _AsyncFnExpr._1;
                                                                                                params$2 = _params$3;
                                                                                                body = _body$2;
                                                                                                break _L$3;
                                                                                              }
                                                                                              default: {
                                                                                                const _AsyncFnExprTo = expr$2;
                                                                                                const _params$4 = _AsyncFnExprTo._0;
                                                                                                const _body_expr$2 = _AsyncFnExprTo._1;
                                                                                                params = _params$4;
                                                                                                body_expr = _body_expr$2;
                                                                                                break _L$2;
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0MPC13int3Int18to__string_2einner(n, 10));
                                                                                          return;
                                                                                        }
                                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, s$2);
                                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "n");
                                                                                        return;
                                                                                      }
                                                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, String(f));
                                                                                      return;
                                                                                    }
                                                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "\"");
                                                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen15js__escape__str(s));
                                                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "\"");
                                                                                    return;
                                                                                  }
                                                                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "`");
                                                                                  const _bind = parts.length;
                                                                                  let _tmp$3 = 0;
                                                                                  while (true) {
                                                                                    const _ = _tmp$3;
                                                                                    if (_ < _bind) {
                                                                                      const part = parts[_];
                                                                                      let expr$5;
                                                                                      _L$42: {
                                                                                        _L$43: {
                                                                                          let s;
                                                                                          _L$44: {
                                                                                            if (part.$tag === 0) {
                                                                                              const _Lit = part;
                                                                                              const _s = _Lit._0;
                                                                                              s = _s;
                                                                                              break _L$44;
                                                                                            } else {
                                                                                              const _Interp = part;
                                                                                              const _expr = _Interp._0;
                                                                                              expr$5 = _expr;
                                                                                              break _L$43;
                                                                                            }
                                                                                          }
                                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen20js__escape__template(s));
                                                                                          break _L$42;
                                                                                        }
                                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "${");
                                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, expr$5);
                                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "}");
                                                                                      }
                                                                                      _tmp$3 = _ + 1 | 0;
                                                                                      continue;
                                                                                    } else {
                                                                                      break;
                                                                                    }
                                                                                  }
                                                                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "`");
                                                                                  return;
                                                                                }
                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "/");
                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, pattern);
                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "/");
                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, flags);
                                                                                return;
                                                                              }
                                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, b ? "true" : "false");
                                                                              return;
                                                                            }
                                                                            if (positive) {
                                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "Infinity");
                                                                              return;
                                                                            } else {
                                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "-Infinity");
                                                                              return;
                                                                            }
                                                                          }
                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "[");
                                                                          const first = new _M0TPB8MutLocalGbE(true);
                                                                          const _bind = elems.length;
                                                                          let _tmp$3 = 0;
                                                                          while (true) {
                                                                            const _ = _tmp$3;
                                                                            if (_ < _bind) {
                                                                              const e = elems[_];
                                                                              if (!first.val) {
                                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                                                              }
                                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, e);
                                                                              first.val = false;
                                                                              _tmp$3 = _ + 1 | 0;
                                                                              continue;
                                                                            } else {
                                                                              break;
                                                                            }
                                                                          }
                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "]");
                                                                          return;
                                                                        }
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "Array.from({ length: ");
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, end$2);
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " - ");
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, start$2);
                                                                        if (inclusive$2) {
                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " + 1");
                                                                        }
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " }, (_, i) => i + ");
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, start$2);
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                                                        return;
                                                                      }
                                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, obj$7);
                                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ".slice(");
                                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, start);
                                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                                                      if (inclusive) {
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, end);
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " + 1");
                                                                      } else {
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, end);
                                                                      }
                                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                                                      return;
                                                                    }
                                                                    if (_M0MPC15array5Array9is__emptyGRP49puruslang5purus3src5lexer5TokenE(pairs)) {
                                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "{}");
                                                                      return undefined;
                                                                    }
                                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "{ ");
                                                                    const first = new _M0TPB8MutLocalGbE(true);
                                                                    const _bind = pairs.length;
                                                                    let _tmp$3 = 0;
                                                                    while (true) {
                                                                      const _ = _tmp$3;
                                                                      if (_ < _bind) {
                                                                        const pair = pairs[_];
                                                                        if (!first.val) {
                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                                                        }
                                                                        const key$2 = pair._0;
                                                                        const value = pair._1;
                                                                        if (_M0FP49puruslang5purus3src7codegen20is__valid__js__ident(key$2)) {
                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, key$2);
                                                                        } else {
                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "\"");
                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen15js__escape__str(key$2));
                                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "\"");
                                                                        }
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ": ");
                                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, value);
                                                                        first.val = false;
                                                                        _tmp$3 = _ + 1 | 0;
                                                                        continue;
                                                                      } else {
                                                                        break;
                                                                      }
                                                                    }
                                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " }");
                                                                    return;
                                                                  }
                                                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen9js__ident(name));
                                                                  return;
                                                                }
                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, obj$6);
                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ".");
                                                                const is_private = new _M0TPB8MutLocalGbE(false);
                                                                const _bind = self$2.private_fields;
                                                                const _bind$2 = _bind.length;
                                                                let _tmp$3 = 0;
                                                                while (true) {
                                                                  const _ = _tmp$3;
                                                                  if (_ < _bind$2) {
                                                                    const pf = _bind[_];
                                                                    if (pf === field$2) {
                                                                      is_private.val = true;
                                                                      break;
                                                                    }
                                                                    _tmp$3 = _ + 1 | 0;
                                                                    continue;
                                                                  } else {
                                                                    break;
                                                                  }
                                                                }
                                                                if (is_private.val) {
                                                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "#");
                                                                }
                                                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen9js__ident(field$2));
                                                                return;
                                                              }
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, obj$5);
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "[");
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0MPC13int3Int18to__string_2einner(index, 10));
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "]");
                                                              return;
                                                            }
                                                            if (op === 21) {
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "Math.floor(");
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, left$2);
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " / ");
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, right$2);
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                                              return;
                                                            } else {
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, left$2);
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " ");
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen9js__binop(op));
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " ");
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, right$2);
                                                              return;
                                                            }
                                                          }
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "-");
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, inner$12);
                                                          return;
                                                        }
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "!");
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, inner$11);
                                                        return;
                                                      }
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "~");
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, inner$10);
                                                      return;
                                                    }
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "typeof ");
                                                    _tmp$2 = inner$9;
                                                    continue;
                                                  }
                                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "void ");
                                                  _tmp$2 = inner$8;
                                                  continue;
                                                }
                                                _tmp$2 = expr$4;
                                                continue;
                                              }
                                              _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, expr$3);
                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " instanceof ");
                                              _tmp$2 = type_expr;
                                              continue;
                                            }
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__params(self$2, params$4);
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ") => {\n");
                                            self$2.indent_level = self$2.indent_level + 1 | 0;
                                            const _bind = body$2.length;
                                            let _tmp$3 = 0;
                                            while (true) {
                                              const _ = _tmp$3;
                                              if (_ < _bind) {
                                                const s = body$2[_];
                                                _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self$2, s);
                                                _tmp$3 = _ + 1 | 0;
                                                continue;
                                              } else {
                                                break;
                                              }
                                            }
                                            self$2.indent_level = self$2.indent_level - 1 | 0;
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "}");
                                            return;
                                          }
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__params(self$2, params$3);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ") => ");
                                          _tmp$2 = body_expr$2;
                                          continue;
                                        }
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, callee$2);
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                        const first = new _M0TPB8MutLocalGbE(true);
                                        const _bind = args$4.length;
                                        let _tmp$3 = 0;
                                        while (true) {
                                          const _ = _tmp$3;
                                          if (_ < _bind) {
                                            const a = args$4[_];
                                            if (!first.val) {
                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                            }
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, a);
                                            first.val = false;
                                            _tmp$3 = _ + 1 | 0;
                                            continue;
                                          } else {
                                            break;
                                          }
                                        }
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                        return;
                                      }
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, obj$4);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ".");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, meth_name$2);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                      const first = new _M0TPB8MutLocalGbE(true);
                                      const _bind = args$3.length;
                                      let _tmp$3 = 0;
                                      while (true) {
                                        const _ = _tmp$3;
                                        if (_ < _bind) {
                                          const a = args$3[_];
                                          if (!first.val) {
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                          }
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, a);
                                          first.val = false;
                                          _tmp$3 = _ + 1 | 0;
                                          continue;
                                        } else {
                                          break;
                                        }
                                      }
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                      return;
                                    }
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "new ");
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, callee);
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                    const first = new _M0TPB8MutLocalGbE(true);
                                    const _bind = args$2.length;
                                    let _tmp$3 = 0;
                                    while (true) {
                                      const _ = _tmp$3;
                                      if (_ < _bind) {
                                        const a = args$2[_];
                                        if (!first.val) {
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                        }
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, a);
                                        first.val = false;
                                        _tmp$3 = _ + 1 | 0;
                                        continue;
                                      } else {
                                        break;
                                      }
                                    }
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                    return;
                                  }
                                  let meth_name$2;
                                  let args$2;
                                  _L$18: {
                                    let callee;
                                    let args$3;
                                    _L$19: {
                                      switch (right.$tag) {
                                        case 28: {
                                          const _Call = right;
                                          const _callee = _Call._0;
                                          const _args = _Call._1;
                                          callee = _callee;
                                          args$3 = _args;
                                          break _L$19;
                                        }
                                        case 29: {
                                          const _MethodCall = right;
                                          const _meth_name = _MethodCall._1;
                                          const _args$2 = _MethodCall._2;
                                          meth_name$2 = _meth_name;
                                          args$2 = _args$2;
                                          break _L$18;
                                        }
                                        case 15: {
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, right);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, left);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                          return;
                                        }
                                        default: {
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, right);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, left);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                          return;
                                        }
                                      }
                                    }
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, callee);
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, left);
                                    if (!_M0MPC15array5Array9is__emptyGRP49puruslang5purus3src5lexer5TokenE(args$3)) {
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                      const first = new _M0TPB8MutLocalGbE(true);
                                      const _bind = args$3.length;
                                      let _tmp$3 = 0;
                                      while (true) {
                                        const _ = _tmp$3;
                                        if (_ < _bind) {
                                          const a = args$3[_];
                                          if (!first.val) {
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                          }
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, a);
                                          first.val = false;
                                          _tmp$3 = _ + 1 | 0;
                                          continue;
                                        } else {
                                          break;
                                        }
                                      }
                                    }
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                    return;
                                  }
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, left);
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ".");
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, meth_name$2);
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
                                  const first = new _M0TPB8MutLocalGbE(true);
                                  const _bind = args$2.length;
                                  let _tmp$3 = 0;
                                  while (true) {
                                    const _ = _tmp$3;
                                    if (_ < _bind) {
                                      const a = args$2[_];
                                      if (!first.val) {
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
                                      }
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, a);
                                      first.val = false;
                                      _tmp$3 = _ + 1 | 0;
                                      continue;
                                    } else {
                                      break;
                                    }
                                  }
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
                                  return;
                                }
                                _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, cond);
                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " ? ");
                                _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, then_expr);
                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " : ");
                                _tmp$2 = else_expr;
                                continue;
                              }
                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(() => { try {\n");
                              self$2.indent_level = self$2.indent_level + 1 | 0;
                              const _bind = try_body.length;
                              let _tmp$3 = 0;
                              while (true) {
                                const _ = _tmp$3;
                                if (_ < _bind) {
                                  const s = try_body[_];
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self$2, s);
                                  _tmp$3 = _ + 1 | 0;
                                  continue;
                                } else {
                                  break;
                                }
                              }
                              self$2.indent_level = self$2.indent_level - 1 | 0;
                              _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "} catch (");
                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen9js__ident(catch_name));
                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ") {\n");
                              self$2.indent_level = self$2.indent_level + 1 | 0;
                              const _bind$2 = catch_body.length;
                              let _tmp$4 = 0;
                              while (true) {
                                const _ = _tmp$4;
                                if (_ < _bind$2) {
                                  const s = catch_body[_];
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self$2, s);
                                  _tmp$4 = _ + 1 | 0;
                                  continue;
                                } else {
                                  break;
                                }
                              }
                              self$2.indent_level = self$2.indent_level - 1 | 0;
                              _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "} })()");
                              return;
                            }
                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(() => {\n");
                            self$2.indent_level = self$2.indent_level + 1 | 0;
                            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "const __m = ");
                            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, subject);
                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ";\n");
                            const _bind = arms.length;
                            let _tmp$3 = 0;
                            while (true) {
                              const _ = _tmp$3;
                              if (_ < _bind) {
                                const arm = arms[_];
                                let name;
                                _L$15: {
                                  _L$16: {
                                    const _bind$2 = arm.pattern;
                                    if (_bind$2.$tag === 1) {
                                      const _BindPat = _bind$2;
                                      const _name = _BindPat._0;
                                      name = _name;
                                      break _L$16;
                                    }
                                    break _L$15;
                                  }
                                  const _bind$2 = arm.cond;
                                  if (_bind$2 === undefined) {
                                  } else {
                                    if (!_M0FP49puruslang5purus3src7codegen9is__blank(name)) {
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "const ");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen9js__ident(name));
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " = __m;\n");
                                    }
                                  }
                                }
                                _tmp$3 = _ + 1 | 0;
                                continue;
                              } else {
                                break;
                              }
                            }
                            const first = new _M0TPB8MutLocalGbE(true);
                            const _bind$2 = arms.length;
                            let _tmp$4 = 0;
                            while (true) {
                              const _ = _tmp$4;
                              if (_ < _bind$2) {
                                const arm = arms[_];
                                _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
                                if (!first.val) {
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "else ");
                                }
                                let name;
                                _L$15: {
                                  _L$16: {
                                    let lit;
                                    _L$17: {
                                      const _bind$3 = arm.pattern;
                                      if (_bind$3.$tag === 0) {
                                        const _LitPat = _bind$3;
                                        const _lit = _LitPat._0;
                                        lit = _lit;
                                        break _L$17;
                                      } else {
                                        const _BindPat = _bind$3;
                                        const _name = _BindPat._0;
                                        name = _name;
                                        break _L$16;
                                      }
                                    }
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "if (__m === ");
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, lit);
                                    let c;
                                    _L$18: {
                                      _L$19: {
                                        const _bind$3 = arm.cond;
                                        if (_bind$3 === undefined) {
                                        } else {
                                          const _Some = _bind$3;
                                          const _c = _Some;
                                          c = _c;
                                          break _L$19;
                                        }
                                        break _L$18;
                                      }
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " && ");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, c);
                                    }
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ") {\n");
                                    break _L$15;
                                  }
                                  if (_M0FP49puruslang5purus3src7codegen9is__blank(name)) {
                                    let c;
                                    _L$17: {
                                      _L$18: {
                                        const _bind$3 = arm.cond;
                                        if (_bind$3 === undefined) {
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "{\n");
                                        } else {
                                          const _Some = _bind$3;
                                          const _c = _Some;
                                          c = _c;
                                          break _L$18;
                                        }
                                        break _L$17;
                                      }
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "if (");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, c);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ") {\n");
                                    }
                                  } else {
                                    let c;
                                    _L$17: {
                                      _L$18: {
                                        const _bind$3 = arm.cond;
                                        if (_bind$3 === undefined) {
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "if (true) { const ");
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, _M0FP49puruslang5purus3src7codegen9js__ident(name));
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " = __m;\n");
                                        } else {
                                          const _Some = _bind$3;
                                          const _c = _Some;
                                          c = _c;
                                          break _L$18;
                                        }
                                        break _L$17;
                                      }
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "if (");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, c);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ") {\n");
                                    }
                                  }
                                }
                                self$2.indent_level = self$2.indent_level + 1 | 0;
                                let stmts;
                                _L$16: {
                                  _L$17: {
                                    let expr$3;
                                    _L$18: {
                                      const _bind$3 = arm.body;
                                      if (_bind$3.$tag === 0) {
                                        const _ExprBody = _bind$3;
                                        const _expr = _ExprBody._0;
                                        expr$3 = _expr;
                                        break _L$18;
                                      } else {
                                        const _BlockBody = _bind$3;
                                        const _stmts = _BlockBody._0;
                                        stmts = _stmts;
                                        break _L$17;
                                      }
                                    }
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "return ");
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, expr$3);
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ";\n");
                                    break _L$16;
                                  }
                                  const _bind$3 = stmts.length;
                                  let _tmp$5 = 0;
                                  while (true) {
                                    const _$2 = _tmp$5;
                                    if (_$2 < _bind$3) {
                                      const s = stmts[_$2];
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self$2, s);
                                      _tmp$5 = _$2 + 1 | 0;
                                      continue;
                                    } else {
                                      break;
                                    }
                                  }
                                }
                                self$2.indent_level = self$2.indent_level - 1 | 0;
                                _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self$2, "}");
                                first.val = false;
                                _tmp$4 = _ + 1 | 0;
                                continue;
                              } else {
                                break;
                              }
                            }
                            self$2.indent_level = self$2.indent_level - 1 | 0;
                            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "})()");
                            return;
                          }
                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "await ");
                          _tmp$2 = inner$7;
                          continue;
                        }
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "yield");
                        let expr$3;
                        _L$13: {
                          if (inner$6 === undefined) {
                            return;
                          } else {
                            const _Some = inner$6;
                            const _expr = _Some;
                            expr$3 = _expr;
                            break _L$13;
                          }
                        }
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, " ");
                        _tmp$2 = expr$3;
                        continue;
                      }
                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, inner$5);
                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "++");
                      return;
                    }
                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, inner$4);
                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "--");
                    return;
                  }
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "++");
                  _tmp$2 = inner$3;
                  continue;
                }
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "--");
                _tmp$2 = inner$2;
                continue;
              }
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "delete ");
              _tmp$2 = inner;
              continue;
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, obj$3);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "?.");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, field);
            return;
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, obj$2);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "?.");
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, meth_name);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "(");
          const first = new _M0TPB8MutLocalGbE(true);
          const _bind = args.length;
          let _tmp$3 = 0;
          while (true) {
            const _ = _tmp$3;
            if (_ < _bind) {
              const a = args[_];
              if (!first.val) {
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ", ");
              }
              _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, a);
              first.val = false;
              _tmp$3 = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ")");
          return;
        }
        _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self$2, obj);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "[");
        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self$2, key);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "]");
        return;
      }
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "async (");
      _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__params(self$2, params$2);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ") => {\n");
      self$2.indent_level = self$2.indent_level + 1 | 0;
      const _bind = body.length;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind) {
          const s = body[_];
          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self$2, s);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      self$2.indent_level = self$2.indent_level - 1 | 0;
      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self$2);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "}");
      return;
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, "async (");
    _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__params(self$2, params);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self$2, ") => ");
    _tmp$2 = body_expr;
    continue;
  }
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self, expr) {
  _L: {
    switch (expr.$tag) {
      case 18: {
        break _L;
      }
      case 19: {
        break _L;
      }
      case 20: {
        break _L;
      }
      case 21: {
        break _L;
      }
      case 32: {
        break _L;
      }
      case 31: {
        break _L;
      }
      default: {
        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr);
        return;
      }
    }
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "(");
  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr);
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ")");
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, stmt) {
  let expr;
  _L: {
    let decl;
    _L$2: {
      let inner;
      _L$3: {
        let inner$2;
        _L$4: {
          let name;
          let body;
          _L$5: {
            let module_name;
            let binding;
            _L$6: {
              let decl$2;
              _L$7: {
                let expr$2;
                _L$8: {
                  let value;
                  _L$9: {
                    let expr$3;
                    _L$10: {
                      let catch_body;
                      let try_body;
                      let catch_name;
                      let finally_body;
                      _L$11: {
                        let name$2;
                        let inner$3;
                        let iter;
                        _L$12: {
                          let inner$4;
                          let cond;
                          _L$13: {
                            let inner$5;
                            let cond$2;
                            _L$14: {
                              let subject;
                              let arms;
                              _L$15: {
                                let update;
                                let init;
                                let cond$3;
                                let body$2;
                                _L$16: {
                                  let end;
                                  let name$3;
                                  let start;
                                  let body$3;
                                  _L$17: {
                                    let iter$2;
                                    let name$4;
                                    let index;
                                    let body$4;
                                    _L$18: {
                                      let cond$4;
                                      let body$5;
                                      _L$19: {
                                        let cond$5;
                                        let body$6;
                                        _L$20: {
                                          let cond$6;
                                          let body$7;
                                          _L$21: {
                                            let cond$7;
                                            let body$8;
                                            _L$22: {
                                              let elifs;
                                              let cond$8;
                                              let body$9;
                                              let else_body;
                                              _L$23: {
                                                let decl$3;
                                                _L$24: {
                                                  let target;
                                                  let op;
                                                  let value$2;
                                                  _L$25: {
                                                    let target$2;
                                                    let value$3;
                                                    _L$26: {
                                                      let names;
                                                      let kind;
                                                      let value$4;
                                                      _L$27: {
                                                        let names$2;
                                                        let kind$2;
                                                        let value$5;
                                                        _L$28: {
                                                          let prop;
                                                          let kind$3;
                                                          let obj_name;
                                                          let value$6;
                                                          _L$29: {
                                                            let name$5;
                                                            let kind$4;
                                                            let value$7;
                                                            _L$30: {
                                                              switch (stmt.$tag) {
                                                                case 0: {
                                                                  const _VarDecl = stmt;
                                                                  const _kind = _VarDecl._0;
                                                                  const _name = _VarDecl._1;
                                                                  const _value = _VarDecl._2;
                                                                  name$5 = _name;
                                                                  kind$4 = _kind;
                                                                  value$7 = _value;
                                                                  break _L$30;
                                                                }
                                                                case 3: {
                                                                  const _DottedVarInit = stmt;
                                                                  const _kind$2 = _DottedVarInit._0;
                                                                  const _obj_name = _DottedVarInit._1;
                                                                  const _prop = _DottedVarInit._2;
                                                                  const _value$2 = _DottedVarInit._3;
                                                                  prop = _prop;
                                                                  kind$3 = _kind$2;
                                                                  obj_name = _obj_name;
                                                                  value$6 = _value$2;
                                                                  break _L$29;
                                                                }
                                                                case 1: {
                                                                  const _DestructDecl = stmt;
                                                                  const _kind$3 = _DestructDecl._0;
                                                                  const _names = _DestructDecl._1;
                                                                  const _value$3 = _DestructDecl._2;
                                                                  names$2 = _names;
                                                                  kind$2 = _kind$3;
                                                                  value$5 = _value$3;
                                                                  break _L$28;
                                                                }
                                                                case 2: {
                                                                  const _ObjDestructDecl = stmt;
                                                                  const _kind$4 = _ObjDestructDecl._0;
                                                                  const _names$2 = _ObjDestructDecl._1;
                                                                  const _value$4 = _ObjDestructDecl._2;
                                                                  names = _names$2;
                                                                  kind = _kind$4;
                                                                  value$4 = _value$4;
                                                                  break _L$27;
                                                                }
                                                                case 4: {
                                                                  const _Assign = stmt;
                                                                  const _target = _Assign._0;
                                                                  const _value$5 = _Assign._1;
                                                                  target$2 = _target;
                                                                  value$3 = _value$5;
                                                                  break _L$26;
                                                                }
                                                                case 5: {
                                                                  const _CompoundAssign = stmt;
                                                                  const _op = _CompoundAssign._0;
                                                                  const _target$2 = _CompoundAssign._1;
                                                                  const _value$6 = _CompoundAssign._2;
                                                                  target = _target$2;
                                                                  op = _op;
                                                                  value$2 = _value$6;
                                                                  break _L$25;
                                                                }
                                                                case 6: {
                                                                  const _FnDecl = stmt;
                                                                  const _decl = _FnDecl._0;
                                                                  decl$3 = _decl;
                                                                  break _L$24;
                                                                }
                                                                case 7: {
                                                                  const _If = stmt;
                                                                  const _cond = _If._0;
                                                                  const _body = _If._1;
                                                                  const _elifs = _If._2;
                                                                  const _else_body = _If._3;
                                                                  elifs = _elifs;
                                                                  cond$8 = _cond;
                                                                  body$9 = _body;
                                                                  else_body = _else_body;
                                                                  break _L$23;
                                                                }
                                                                case 8: {
                                                                  const _Unless = stmt;
                                                                  const _cond$2 = _Unless._0;
                                                                  const _body$2 = _Unless._1;
                                                                  cond$7 = _cond$2;
                                                                  body$8 = _body$2;
                                                                  break _L$22;
                                                                }
                                                                case 9: {
                                                                  const _While = stmt;
                                                                  const _cond$3 = _While._0;
                                                                  const _body$3 = _While._1;
                                                                  cond$6 = _cond$3;
                                                                  body$7 = _body$3;
                                                                  break _L$21;
                                                                }
                                                                case 10: {
                                                                  const _Until = stmt;
                                                                  const _cond$4 = _Until._0;
                                                                  const _body$4 = _Until._1;
                                                                  cond$5 = _cond$4;
                                                                  body$6 = _body$4;
                                                                  break _L$20;
                                                                }
                                                                case 11: {
                                                                  const _DoWhile = stmt;
                                                                  const _cond$5 = _DoWhile._0;
                                                                  const _body$5 = _DoWhile._1;
                                                                  cond$4 = _cond$5;
                                                                  body$5 = _body$5;
                                                                  break _L$19;
                                                                }
                                                                case 12: {
                                                                  const _ForIn = stmt;
                                                                  const _name$2 = _ForIn._0;
                                                                  const _index = _ForIn._1;
                                                                  const _iter = _ForIn._2;
                                                                  const _body$6 = _ForIn._3;
                                                                  iter$2 = _iter;
                                                                  name$4 = _name$2;
                                                                  index = _index;
                                                                  body$4 = _body$6;
                                                                  break _L$18;
                                                                }
                                                                case 13: {
                                                                  const _ForRange = stmt;
                                                                  const _name$3 = _ForRange._0;
                                                                  const _start = _ForRange._1;
                                                                  const _end = _ForRange._2;
                                                                  const _body$7 = _ForRange._3;
                                                                  end = _end;
                                                                  name$3 = _name$3;
                                                                  start = _start;
                                                                  body$3 = _body$7;
                                                                  break _L$17;
                                                                }
                                                                case 14: {
                                                                  const _ForClassic = stmt;
                                                                  const _init = _ForClassic._0;
                                                                  const _cond$6 = _ForClassic._1;
                                                                  const _update = _ForClassic._2;
                                                                  const _body$8 = _ForClassic._3;
                                                                  update = _update;
                                                                  init = _init;
                                                                  cond$3 = _cond$6;
                                                                  body$2 = _body$8;
                                                                  break _L$16;
                                                                }
                                                                case 15: {
                                                                  const _MatchStmt = stmt;
                                                                  const _subject = _MatchStmt._0;
                                                                  const _arms = _MatchStmt._1;
                                                                  subject = _subject;
                                                                  arms = _arms;
                                                                  break _L$15;
                                                                }
                                                                case 16: {
                                                                  const _PostfixIf = stmt;
                                                                  const _inner = _PostfixIf._0;
                                                                  const _cond$7 = _PostfixIf._1;
                                                                  inner$5 = _inner;
                                                                  cond$2 = _cond$7;
                                                                  break _L$14;
                                                                }
                                                                case 17: {
                                                                  const _PostfixUnless = stmt;
                                                                  const _inner$2 = _PostfixUnless._0;
                                                                  const _cond$8 = _PostfixUnless._1;
                                                                  inner$4 = _inner$2;
                                                                  cond = _cond$8;
                                                                  break _L$13;
                                                                }
                                                                case 18: {
                                                                  const _PostfixFor = stmt;
                                                                  const _inner$3 = _PostfixFor._0;
                                                                  const _name$4 = _PostfixFor._1;
                                                                  const _iter$2 = _PostfixFor._2;
                                                                  name$2 = _name$4;
                                                                  inner$3 = _inner$3;
                                                                  iter = _iter$2;
                                                                  break _L$12;
                                                                }
                                                                case 19: {
                                                                  const _TryCatch = stmt;
                                                                  const _try_body = _TryCatch._0;
                                                                  const _catch_name = _TryCatch._1;
                                                                  const _catch_body = _TryCatch._2;
                                                                  const _finally_body = _TryCatch._3;
                                                                  catch_body = _catch_body;
                                                                  try_body = _try_body;
                                                                  catch_name = _catch_name;
                                                                  finally_body = _finally_body;
                                                                  break _L$11;
                                                                }
                                                                case 20: {
                                                                  const _Throw = stmt;
                                                                  const _expr = _Throw._0;
                                                                  expr$3 = _expr;
                                                                  break _L$10;
                                                                }
                                                                case 21: {
                                                                  const _Return = stmt;
                                                                  const _value$7 = _Return._0;
                                                                  value = _value$7;
                                                                  break _L$9;
                                                                }
                                                                case 22: {
                                                                  _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "break;");
                                                                  return;
                                                                }
                                                                case 23: {
                                                                  _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "continue;");
                                                                  return;
                                                                }
                                                                case 24: {
                                                                  const _ExprStmt = stmt;
                                                                  const _expr$2 = _ExprStmt._0;
                                                                  expr$2 = _expr$2;
                                                                  break _L$8;
                                                                }
                                                                case 25: {
                                                                  const _ImportDecl = stmt;
                                                                  const _decl$2 = _ImportDecl._0;
                                                                  decl$2 = _decl$2;
                                                                  break _L$7;
                                                                }
                                                                case 26: {
                                                                  const _UseStdlib = stmt;
                                                                  const _module_name = _UseStdlib._0;
                                                                  const _binding = _UseStdlib._1;
                                                                  module_name = _module_name;
                                                                  binding = _binding;
                                                                  break _L$6;
                                                                }
                                                                case 27: {
                                                                  const _ModDecl = stmt;
                                                                  const _name$5 = _ModDecl._0;
                                                                  const _body$9 = _ModDecl._1;
                                                                  name = _name$5;
                                                                  body = _body$9;
                                                                  break _L$5;
                                                                }
                                                                case 28: {
                                                                  const _ExportDefault = stmt;
                                                                  const _inner$4 = _ExportDefault._0;
                                                                  inner$2 = _inner$4;
                                                                  break _L$4;
                                                                }
                                                                case 29: {
                                                                  const _PublicDecl = stmt;
                                                                  const _inner$5 = _PublicDecl._0;
                                                                  inner = _inner$5;
                                                                  break _L$3;
                                                                }
                                                                case 30: {
                                                                  return;
                                                                }
                                                                case 31: {
                                                                  const _ClassDecl = stmt;
                                                                  const _decl$3 = _ClassDecl._0;
                                                                  decl = _decl$3;
                                                                  break _L$2;
                                                                }
                                                                default: {
                                                                  const _DeleteStmt = stmt;
                                                                  const _expr$3 = _DeleteStmt._0;
                                                                  expr = _expr$3;
                                                                  break _L;
                                                                }
                                                              }
                                                            }
                                                            let kw;
                                                            switch (kind$4) {
                                                              case 0: {
                                                                kw = "const";
                                                                break;
                                                              }
                                                              case 1: {
                                                                kw = "let";
                                                                break;
                                                              }
                                                              default: {
                                                                kw = "var";
                                                              }
                                                            }
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, kw);
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " ");
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$5));
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$7);
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                                                            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(self.declared_vars, name$5);
                                                            return;
                                                          }
                                                          let kw;
                                                          switch (kind$3) {
                                                            case 0: {
                                                              kw = "const";
                                                              break;
                                                            }
                                                            case 1: {
                                                              kw = "let";
                                                              break;
                                                            }
                                                            default: {
                                                              kw = "var";
                                                            }
                                                          }
                                                          const is_declared = new _M0TPB8MutLocalGbE(false);
                                                          const _bind = self.declared_vars;
                                                          const _bind$2 = _bind.length;
                                                          let _tmp = 0;
                                                          while (true) {
                                                            const _ = _tmp;
                                                            if (_ < _bind$2) {
                                                              const v = _bind[_];
                                                              if (v === obj_name) {
                                                                is_declared.val = true;
                                                                break;
                                                              }
                                                              _tmp = _ + 1 | 0;
                                                              continue;
                                                            } else {
                                                              break;
                                                            }
                                                          }
                                                          if (!is_declared.val) {
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, kw);
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " ");
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(obj_name));
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = {};\n");
                                                            _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(self.declared_vars, obj_name);
                                                          }
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(obj_name));
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ".");
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(prop));
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$6);
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                                                          return;
                                                        }
                                                        let kw;
                                                        switch (kind$2) {
                                                          case 0: {
                                                            kw = "const";
                                                            break;
                                                          }
                                                          case 1: {
                                                            kw = "let";
                                                            break;
                                                          }
                                                          default: {
                                                            kw = "var";
                                                          }
                                                        }
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, kw);
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " [");
                                                        const first = new _M0TPB8MutLocalGbE(true);
                                                        const _bind = names$2.length;
                                                        let _tmp = 0;
                                                        while (true) {
                                                          const _ = _tmp;
                                                          if (_ < _bind) {
                                                            const n = names$2[_];
                                                            if (!first.val) {
                                                              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
                                                            }
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(n));
                                                            first.val = false;
                                                            _tmp = _ + 1 | 0;
                                                            continue;
                                                          } else {
                                                            break;
                                                          }
                                                        }
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "] = ");
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$5);
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                                                        return;
                                                      }
                                                      let kw;
                                                      switch (kind) {
                                                        case 0: {
                                                          kw = "const";
                                                          break;
                                                        }
                                                        case 1: {
                                                          kw = "let";
                                                          break;
                                                        }
                                                        default: {
                                                          kw = "var";
                                                        }
                                                      }
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, kw);
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " { ");
                                                      const first = new _M0TPB8MutLocalGbE(true);
                                                      const _bind = names.length;
                                                      let _tmp = 0;
                                                      while (true) {
                                                        const _ = _tmp;
                                                        if (_ < _bind) {
                                                          const n = names[_];
                                                          if (!first.val) {
                                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
                                                          }
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(n));
                                                          first.val = false;
                                                          _tmp = _ + 1 | 0;
                                                          continue;
                                                        } else {
                                                          break;
                                                        }
                                                      }
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " } = ");
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$4);
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                                                      return;
                                                    }
                                                    let end$2;
                                                    let obj;
                                                    let start$2;
                                                    let inclusive;
                                                    _L$27: {
                                                      if (target$2.$tag === 13) {
                                                        const _Slice = target$2;
                                                        const _obj = _Slice._0;
                                                        const _start = _Slice._1;
                                                        const _end = _Slice._2;
                                                        const _inclusive = _Slice._3;
                                                        end$2 = _end;
                                                        obj = _obj;
                                                        start$2 = _start;
                                                        inclusive = _inclusive;
                                                        break _L$27;
                                                      } else {
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target$2);
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$3);
                                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                                                        return;
                                                      }
                                                    }
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, obj);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ".splice(");
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, start$2);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self, end$2);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " - ");
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self, start$2);
                                                    if (inclusive) {
                                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " + 1");
                                                    }
                                                    let elems;
                                                    _L$28: {
                                                      _L$29: {
                                                        if (value$3.$tag === 11) {
                                                          const _ArrayLit = value$3;
                                                          const _elems = _ArrayLit._0;
                                                          elems = _elems;
                                                          break _L$29;
                                                        } else {
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ...");
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$3);
                                                        }
                                                        break _L$28;
                                                      }
                                                      const _bind = elems.length;
                                                      let _tmp = 0;
                                                      while (true) {
                                                        const _ = _tmp;
                                                        if (_ < _bind) {
                                                          const e = elems[_];
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
                                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, e);
                                                          _tmp = _ + 1 | 0;
                                                          continue;
                                                        } else {
                                                          break;
                                                        }
                                                      }
                                                    }
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ");\n");
                                                    return;
                                                  }
                                                  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                                  if (op === 21) {
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = Math.floor(");
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " / ");
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$2);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ");\n");
                                                    return;
                                                  } else {
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen17compound__op__str(op));
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$2);
                                                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                                                    return;
                                                  }
                                                }
                                                _M0MP49puruslang5purus3src7codegen9JsCodegen13gen__fn__decl(self, decl$3);
                                                return;
                                              }
                                              _M0MP49puruslang5purus3src7codegen9JsCodegen7gen__if(self, cond$8, body$9, elifs, else_body);
                                              return;
                                            }
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "if (!(");
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, cond$7);
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ")) {\n");
                                            self.indent_level = self.indent_level + 1 | 0;
                                            const _bind = body$8.length;
                                            let _tmp = 0;
                                            while (true) {
                                              const _ = _tmp;
                                              if (_ < _bind) {
                                                const s = body$8[_];
                                                _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                                                _tmp = _ + 1 | 0;
                                                continue;
                                              } else {
                                                break;
                                              }
                                            }
                                            self.indent_level = self.indent_level - 1 | 0;
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
                                            return;
                                          }
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "while (");
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, cond$6);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
                                          self.indent_level = self.indent_level + 1 | 0;
                                          const _bind = body$7.length;
                                          let _tmp = 0;
                                          while (true) {
                                            const _ = _tmp;
                                            if (_ < _bind) {
                                              const s = body$7[_];
                                              _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                                              _tmp = _ + 1 | 0;
                                              continue;
                                            } else {
                                              break;
                                            }
                                          }
                                          self.indent_level = self.indent_level - 1 | 0;
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
                                          return;
                                        }
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "while (!(");
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, cond$5);
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ")) {\n");
                                        self.indent_level = self.indent_level + 1 | 0;
                                        const _bind = body$6.length;
                                        let _tmp = 0;
                                        while (true) {
                                          const _ = _tmp;
                                          if (_ < _bind) {
                                            const s = body$6[_];
                                            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                                            _tmp = _ + 1 | 0;
                                            continue;
                                          } else {
                                            break;
                                          }
                                        }
                                        self.indent_level = self.indent_level - 1 | 0;
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
                                        return;
                                      }
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "do {\n");
                                      self.indent_level = self.indent_level + 1 | 0;
                                      const _bind = body$5.length;
                                      let _tmp = 0;
                                      while (true) {
                                        const _ = _tmp;
                                        if (_ < _bind) {
                                          const s = body$5[_];
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                                          _tmp = _ + 1 | 0;
                                          continue;
                                        } else {
                                          break;
                                        }
                                      }
                                      self.indent_level = self.indent_level - 1 | 0;
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "} while (");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, cond$4);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ");\n");
                                      return;
                                    }
                                    let idx;
                                    _L$19: {
                                      _L$20: {
                                        if (index === undefined) {
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "for (const ");
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$4));
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " of ");
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, iter$2);
                                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
                                        } else {
                                          const _Some = index;
                                          const _idx = _Some;
                                          idx = _idx;
                                          break _L$20;
                                        }
                                        break _L$19;
                                      }
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "for (let [");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(idx));
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$4));
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "] of ");
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, iter$2);
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ".entries()) {\n");
                                    }
                                    self.indent_level = self.indent_level + 1 | 0;
                                    const _bind = body$4.length;
                                    let _tmp = 0;
                                    while (true) {
                                      const _ = _tmp;
                                      if (_ < _bind) {
                                        const s = body$4[_];
                                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                                        _tmp = _ + 1 | 0;
                                        continue;
                                      } else {
                                        break;
                                      }
                                    }
                                    self.indent_level = self.indent_level - 1 | 0;
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
                                    return;
                                  }
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "for (let ");
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$3));
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, start);
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "; ");
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$3));
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " < ");
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, end);
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "; ");
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$3));
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "++) {\n");
                                  self.indent_level = self.indent_level + 1 | 0;
                                  const _bind = body$3.length;
                                  let _tmp = 0;
                                  while (true) {
                                    const _ = _tmp;
                                    if (_ < _bind) {
                                      const s = body$3[_];
                                      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                                      _tmp = _ + 1 | 0;
                                      continue;
                                    } else {
                                      break;
                                    }
                                  }
                                  self.indent_level = self.indent_level - 1 | 0;
                                  _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
                                  return;
                                }
                                _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "for (");
                                _M0MP49puruslang5purus3src7codegen9JsCodegen14gen__for__part(self, init);
                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "; ");
                                _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, cond$3);
                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "; ");
                                _M0MP49puruslang5purus3src7codegen9JsCodegen14gen__for__part(self, update);
                                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
                                self.indent_level = self.indent_level + 1 | 0;
                                const _bind = body$2.length;
                                let _tmp = 0;
                                while (true) {
                                  const _ = _tmp;
                                  if (_ < _bind) {
                                    const s = body$2[_];
                                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                                    _tmp = _ + 1 | 0;
                                    continue;
                                  } else {
                                    break;
                                  }
                                }
                                self.indent_level = self.indent_level - 1 | 0;
                                _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
                                return;
                              }
                              _M0MP49puruslang5purus3src7codegen9JsCodegen10gen__match(self, subject, arms);
                              return;
                            }
                            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "if (");
                            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, cond$2);
                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") ");
                            _M0MP49puruslang5purus3src7codegen9JsCodegen17gen__stmt__inline(self, inner$5);
                            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\n");
                            return;
                          }
                          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "if (!(");
                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, cond);
                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ")) ");
                          _M0MP49puruslang5purus3src7codegen9JsCodegen17gen__stmt__inline(self, inner$4);
                          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\n");
                          return;
                        }
                        _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "for (const ");
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$2));
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " of ");
                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, iter);
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") ");
                        _M0MP49puruslang5purus3src7codegen9JsCodegen17gen__stmt__inline(self, inner$3);
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\n");
                        return;
                      }
                      _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "try {");
                      self.indent_level = self.indent_level + 1 | 0;
                      const _bind = try_body.length;
                      let _tmp = 0;
                      while (true) {
                        const _ = _tmp;
                        if (_ < _bind) {
                          const s = try_body[_];
                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                          _tmp = _ + 1 | 0;
                          continue;
                        } else {
                          break;
                        }
                      }
                      self.indent_level = self.indent_level - 1 | 0;
                      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "} catch (");
                      let _tmp$2;
                      let n;
                      _L$12: {
                        _L$13: {
                          if (catch_name === undefined) {
                            _tmp$2 = "e";
                          } else {
                            const _Some = catch_name;
                            const _n = _Some;
                            n = _n;
                            break _L$13;
                          }
                          break _L$12;
                        }
                        _tmp$2 = _M0FP49puruslang5purus3src7codegen9js__ident(n);
                      }
                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _tmp$2);
                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
                      self.indent_level = self.indent_level + 1 | 0;
                      const _bind$2 = catch_body.length;
                      let _tmp$3 = 0;
                      while (true) {
                        const _ = _tmp$3;
                        if (_ < _bind$2) {
                          const s = catch_body[_];
                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                          _tmp$3 = _ + 1 | 0;
                          continue;
                        } else {
                          break;
                        }
                      }
                      self.indent_level = self.indent_level - 1 | 0;
                      let fb;
                      _L$13: {
                        if (finally_body.$tag === 1) {
                          const _Some = finally_body;
                          const _fb = _Some._0;
                          fb = _fb;
                          break _L$13;
                        } else {
                          _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
                          return;
                        }
                      }
                      _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "} finally {");
                      self.indent_level = self.indent_level + 1 | 0;
                      const _bind$3 = fb.length;
                      let _tmp$4 = 0;
                      while (true) {
                        const _ = _tmp$4;
                        if (_ < _bind$3) {
                          const s = fb[_];
                          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
                          _tmp$4 = _ + 1 | 0;
                          continue;
                        } else {
                          break;
                        }
                      }
                      self.indent_level = self.indent_level - 1 | 0;
                      _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
                      return;
                    }
                    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "throw ");
                    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr$3);
                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                    return;
                  }
                  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                  let v;
                  _L$10: {
                    if (value === undefined) {
                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "return;\n");
                      return;
                    } else {
                      const _Some = value;
                      const _v = _Some;
                      v = _v;
                      break _L$10;
                    }
                  }
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "return ");
                  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, v);
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                  return;
                }
                _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr$2);
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                return;
              }
              _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__import(self, decl$2);
              return;
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "// @purus-stdlib:whole:");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ":");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(binding));
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\n");
            return;
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "const ");
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = (() => {\n");
          self.indent_level = self.indent_level + 1 | 0;
          const _bind = body.length;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < _bind) {
              const s = body[_];
              _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          self.indent_level = self.indent_level - 1 | 0;
          _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "})();");
          return;
        }
        _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
        if (self.cjs) {
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "module.exports = ");
        } else {
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "export default ");
        }
        _M0MP49puruslang5purus3src7codegen9JsCodegen17gen__stmt__inline(self, inner$2);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\n");
        return;
      }
      if (self.cjs) {
        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, inner);
        let decl$2;
        _L$4: {
          let decl$3;
          _L$5: {
            let name;
            _L$6: {
              switch (inner.$tag) {
                case 0: {
                  const _VarDecl = inner;
                  const _name = _VarDecl._1;
                  name = _name;
                  break _L$6;
                }
                case 6: {
                  const _FnDecl = inner;
                  const _decl = _FnDecl._0;
                  decl$3 = _decl;
                  break _L$5;
                }
                case 31: {
                  const _ClassDecl = inner;
                  const _decl$2 = _ClassDecl._0;
                  decl$2 = _decl$2;
                  break _L$4;
                }
                default: {
                  return;
                }
              }
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "exports.");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
            return;
          }
          let n;
          _L$6: {
            const _bind = decl$3.name;
            if (_bind === undefined) {
              return;
            } else {
              const _Some = _bind;
              const _n = _Some;
              n = _n;
              break _L$6;
            }
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "exports.");
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(n));
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(n));
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
          return;
        }
        _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "exports.");
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(decl$2.name));
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(decl$2.name));
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
        return;
      } else {
        _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "export ");
        _M0MP49puruslang5purus3src7codegen9JsCodegen17gen__stmt__inline(self, inner);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\n");
        return;
      }
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen16gen__class__decl(self, decl);
    return;
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "delete ");
  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr);
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen16gen__class__decl(self, decl) {
  const saved_private = self.private_fields;
  self.private_fields = [];
  const _bind = decl.members;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const mbr = _bind[_];
      let name;
      _L: {
        _L$2: {
          if (mbr.$tag === 0) {
            const _Field = mbr;
            const _x = _Field._0;
            if (_x === true) {
              const _name = _Field._1;
              name = _name;
              break _L$2;
            }
          }
          break _L;
        }
        _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(self.private_fields, name);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "class ");
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(decl.name));
  let p;
  _L: {
    _L$2: {
      const _bind$3 = decl.parent;
      if (_bind$3 === undefined) {
      } else {
        const _Some = _bind$3;
        const _p = _Some;
        p = _p;
        break _L$2;
      }
      break _L;
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " extends ");
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(p));
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " {\n");
  self.indent_level = self.indent_level + 1 | 0;
  const _bind$3 = decl.members;
  const _bind$4 = _bind$3.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$4) {
      const mbr = _bind$3[_];
      let param;
      let name;
      let body;
      _L$2: {
        _L$3: {
          let name$2;
          let body$2;
          _L$4: {
            _L$5: {
              let params;
              let is_async;
              let is_static;
              let name$3;
              let body$3;
              _L$6: {
                _L$7: {
                  let params$2;
                  let body$4;
                  _L$8: {
                    _L$9: {
                      let name$4;
                      let is_private;
                      let default_val;
                      _L$10: {
                        switch (mbr.$tag) {
                          case 0: {
                            const _Field = mbr;
                            const _is_private = _Field._0;
                            const _name = _Field._1;
                            const _default_val = _Field._2;
                            name$4 = _name;
                            is_private = _is_private;
                            default_val = _default_val;
                            break _L$10;
                          }
                          case 1: {
                            const _Constructor = mbr;
                            const _params = _Constructor._0;
                            const _body = _Constructor._1;
                            params$2 = _params;
                            body$4 = _body;
                            break _L$9;
                          }
                          case 2: {
                            const _Method = mbr;
                            const _is_static = _Method._0;
                            const _is_async = _Method._1;
                            const _name$2 = _Method._2;
                            const _params$2 = _Method._3;
                            const _body$2 = _Method._4;
                            params = _params$2;
                            is_async = _is_async;
                            is_static = _is_static;
                            name$3 = _name$2;
                            body$3 = _body$2;
                            break _L$7;
                          }
                          case 3: {
                            const _Getter = mbr;
                            const _name$3 = _Getter._0;
                            const _body$3 = _Getter._1;
                            name$2 = _name$3;
                            body$2 = _body$3;
                            break _L$5;
                          }
                          default: {
                            const _Setter = mbr;
                            const _name$4 = _Setter._0;
                            const _param = _Setter._1;
                            const _body$4 = _Setter._2;
                            param = _param;
                            name = _name$4;
                            body = _body$4;
                            break _L$3;
                          }
                        }
                      }
                      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                      if (is_private) {
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "#");
                      }
                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$4));
                      let v;
                      _L$11: {
                        _L$12: {
                          if (default_val === undefined) {
                          } else {
                            const _Some = default_val;
                            const _v = _Some;
                            v = _v;
                            break _L$12;
                          }
                          break _L$11;
                        }
                        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
                        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, v);
                      }
                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
                      break _L$8;
                    }
                    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "constructor(");
                    _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__params(self, params$2);
                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") ");
                    _M0MP49puruslang5purus3src7codegen9JsCodegen16gen__class__body(self, body$4);
                  }
                  break _L$6;
                }
                _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                if (is_static) {
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "static ");
                }
                if (is_async) {
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "async ");
                }
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$3));
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "(");
                _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__params(self, params);
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") ");
                _M0MP49puruslang5purus3src7codegen9JsCodegen16gen__class__body(self, body$3);
              }
              break _L$4;
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "get ");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name$2));
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "() ");
            _M0MP49puruslang5purus3src7codegen9JsCodegen16gen__class__body(self, body$2);
          }
          break _L$2;
        }
        _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "set ");
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "(");
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(param));
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") ");
        _M0MP49puruslang5purus3src7codegen9JsCodegen16gen__class__body(self, body);
      }
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.indent_level = self.indent_level - 1 | 0;
  _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
  self.private_fields = saved_private;
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen16gen__class__body(self, body) {
  let stmts;
  _L: {
    let expr;
    _L$2: {
      let expr$2;
      _L$3: {
        switch (body.$tag) {
          case 1: {
            const _ToExpr = body;
            const _expr = _ToExpr._0;
            expr$2 = _expr;
            break _L$3;
          }
          case 2: {
            const _ToReturnExpr = body;
            const _expr$2 = _ToReturnExpr._0;
            expr = _expr$2;
            break _L$2;
          }
          default: {
            const _Block = body;
            const _stmts = _Block._0;
            stmts = _stmts;
            break _L;
          }
        }
      }
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{ ");
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr$2);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "; }\n");
      return;
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{ return ");
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "; }\n");
    return;
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{\n");
  self.indent_level = self.indent_level + 1 | 0;
  const _bind = stmts.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const s = stmts[_];
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.indent_level = self.indent_level - 1 | 0;
  _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen13gen__fn__decl(self, decl) {
  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
  if (decl.is_async) {
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "async ");
  }
  if (decl.is_generator || _M0FP49puruslang5purus3src7codegen16body__has__yield(decl.body)) {
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "function*");
  } else {
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "function");
  }
  let n;
  _L: {
    _L$2: {
      const _bind = decl.name;
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _n = _Some;
        n = _n;
        break _L$2;
      }
      break _L;
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " ");
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(n));
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "(");
  _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__params(self, decl.params);
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") ");
  let stmts;
  _L$2: {
    let expr;
    _L$3: {
      let expr$2;
      _L$4: {
        const _bind = decl.body;
        switch (_bind.$tag) {
          case 1: {
            const _ToExpr = _bind;
            const _expr = _ToExpr._0;
            expr$2 = _expr;
            break _L$4;
          }
          case 2: {
            const _ToReturnExpr = _bind;
            const _expr$2 = _ToReturnExpr._0;
            expr = _expr$2;
            break _L$3;
          }
          default: {
            const _Block = _bind;
            const _stmts = _Block._0;
            stmts = _stmts;
            break _L$2;
          }
        }
      }
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{ ");
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr$2);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "; }\n");
      return;
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{ return ");
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "; }\n");
    return;
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{\n");
  self.indent_level = self.indent_level + 1 | 0;
  const _bind = stmts.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const s = stmts[_];
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.indent_level = self.indent_level - 1 | 0;
  _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen14gen__for__part(self, stmt) {
  let expr;
  _L: {
    let target;
    let op;
    let value;
    _L$2: {
      let target$2;
      let value$2;
      _L$3: {
        let name;
        let kind;
        let value$3;
        _L$4: {
          switch (stmt.$tag) {
            case 0: {
              const _VarDecl = stmt;
              const _kind = _VarDecl._0;
              const _name = _VarDecl._1;
              const _value = _VarDecl._2;
              name = _name;
              kind = _kind;
              value$3 = _value;
              break _L$4;
            }
            case 4: {
              const _Assign = stmt;
              const _target = _Assign._0;
              const _value$2 = _Assign._1;
              target$2 = _target;
              value$2 = _value$2;
              break _L$3;
            }
            case 5: {
              const _CompoundAssign = stmt;
              const _op = _CompoundAssign._0;
              const _target$2 = _CompoundAssign._1;
              const _value$3 = _CompoundAssign._2;
              target = _target$2;
              op = _op;
              value = _value$3;
              break _L$2;
            }
            case 24: {
              const _ExprStmt = stmt;
              const _expr = _ExprStmt._0;
              expr = _expr;
              break _L;
            }
            default: {
              _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, stmt);
              return;
            }
          }
        }
        let kw;
        switch (kind) {
          case 0: {
            kw = "const";
            break;
          }
          case 1: {
            kw = "let";
            break;
          }
          default: {
            kw = "var";
          }
        }
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, kw);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " ");
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$3);
        return;
      }
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target$2);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$2);
      return;
    }
    if (op === 21) {
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = Math.floor(");
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " / ");
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ")");
      return;
    } else {
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen17compound__op__str(op));
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value);
      return;
    }
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr);
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen7gen__if(self, cond, body, elifs, else_body) {
  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "if (");
  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, cond);
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
  self.indent_level = self.indent_level + 1 | 0;
  const _bind = body.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const s = body[_];
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.indent_level = self.indent_level - 1 | 0;
  const _bind$2 = elifs.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const elif = elifs[_];
      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "} else if (");
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, elif.cond);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
      self.indent_level = self.indent_level + 1 | 0;
      const _bind$3 = elif.body;
      const _bind$4 = _bind$3.length;
      let _tmp$3 = 0;
      while (true) {
        const _$2 = _tmp$3;
        if (_$2 < _bind$4) {
          const s = _bind$3[_$2];
          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
          _tmp$3 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      self.indent_level = self.indent_level - 1 | 0;
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let eb;
  _L: {
    if (else_body.$tag === 1) {
      const _Some = else_body;
      const _eb = _Some._0;
      eb = _eb;
      break _L;
    } else {
      _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
      return;
    }
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "} else {");
  self.indent_level = self.indent_level + 1 | 0;
  const _bind$3 = eb.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$3) {
      const s = eb[_];
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.indent_level = self.indent_level - 1 | 0;
  _M0MP49puruslang5purus3src7codegen9JsCodegen7writeln(self, "}");
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen11gen__import(self, decl) {
  let module_name;
  let attrs;
  _L: {
    let module_name$2;
    _L$2: {
      let name;
      let module_name$3;
      _L$3: {
        let module_name$4;
        let named;
        let default_name;
        let ns_name;
        let attrs$2;
        _L$4: {
          switch (decl.$tag) {
            case 0: {
              const _EsImport = decl;
              const _default_name = _EsImport._0;
              const _named = _EsImport._1;
              const _ns_name = _EsImport._2;
              const _module_name = _EsImport._3;
              const _attrs = _EsImport._4;
              module_name$4 = _module_name;
              named = _named;
              default_name = _default_name;
              ns_name = _ns_name;
              attrs$2 = _attrs;
              break _L$4;
            }
            case 1: {
              const _CjsRequire = decl;
              const _name = _CjsRequire._0;
              const _module_name$2 = _CjsRequire._1;
              name = _name;
              module_name$3 = _module_name$2;
              break _L$3;
            }
            case 2: {
              const _DynImport = decl;
              const _module_name$3 = _DynImport._0;
              module_name$2 = _module_name$3;
              break _L$2;
            }
            default: {
              const _SideEffectImport = decl;
              const _module_name$4 = _SideEffectImport._0;
              const _attrs$2 = _SideEffectImport._1;
              module_name = _module_name$4;
              attrs = _attrs$2;
              break _L;
            }
          }
        }
        if (self.cjs) {
          _L$5: {
            let ns;
            _L$6: {
              let names;
              let n;
              _L$7: {
                let names$2;
                _L$8: {
                  let n$2;
                  _L$9: {
                    if (default_name === undefined) {
                      if (named.$tag === 1) {
                        const _Some = named;
                        const _names = _Some._0;
                        if (ns_name === undefined) {
                          names$2 = _names;
                          break _L$8;
                        } else {
                          break _L$5;
                        }
                      } else {
                        if (ns_name === undefined) {
                          break _L$5;
                        } else {
                          const _Some = ns_name;
                          const _ns = _Some;
                          ns = _ns;
                          break _L$6;
                        }
                      }
                    } else {
                      const _Some = default_name;
                      const _n = _Some;
                      if (named.$tag === 0) {
                        if (ns_name === undefined) {
                          n$2 = _n;
                          break _L$9;
                        } else {
                          break _L$5;
                        }
                      } else {
                        const _Some$2 = named;
                        const _names = _Some$2._0;
                        if (ns_name === undefined) {
                          names = _names;
                          n = _n;
                          break _L$7;
                        } else {
                          break _L$5;
                        }
                      }
                    }
                  }
                  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "const ");
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, n$2);
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = require(\"");
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name$4);
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\");\n");
                  return;
                }
                _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "const { ");
                const first = new _M0TPB8MutLocalGbE(true);
                const _bind = names$2.length;
                let _tmp = 0;
                while (true) {
                  const _ = _tmp;
                  if (_ < _bind) {
                    const n$2 = names$2[_];
                    if (!first.val) {
                      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
                    }
                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, n$2);
                    first.val = false;
                    _tmp = _ + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " } = require(\"");
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name$4);
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\");\n");
                return;
              }
              _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "const ");
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, n);
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = require(\"");
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name$4);
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\");\n");
              _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "const { ");
              const first = new _M0TPB8MutLocalGbE(true);
              const _bind = names.length;
              let _tmp = 0;
              while (true) {
                const _ = _tmp;
                if (_ < _bind) {
                  const nm = names[_];
                  if (!first.val) {
                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
                  }
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, nm);
                  first.val = false;
                  _tmp = _ + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " } = ");
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, n);
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
              return;
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "const ");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ns);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = require(\"");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name$4);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\");\n");
            return;
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "require(\"");
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name$4);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\");\n");
          return;
        } else {
          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "import ");
          const has_prev = new _M0TPB8MutLocalGbE(false);
          let n;
          _L$5: {
            _L$6: {
              if (default_name === undefined) {
              } else {
                const _Some = default_name;
                const _n = _Some;
                n = _n;
                break _L$6;
              }
              break _L$5;
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, n);
            has_prev.val = true;
          }
          let names;
          _L$6: {
            _L$7: {
              if (named.$tag === 1) {
                const _Some = named;
                const _names = _Some._0;
                names = _names;
                break _L$7;
              }
              break _L$6;
            }
            if (has_prev.val) {
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{ ");
            const first = new _M0TPB8MutLocalGbE(true);
            const _bind = names.length;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind) {
                const n$2 = names[_];
                if (!first.val) {
                  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
                }
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, n$2);
                first.val = false;
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " }");
            has_prev.val = true;
          }
          let ns;
          _L$7: {
            _L$8: {
              if (ns_name === undefined) {
              } else {
                const _Some = ns_name;
                const _ns = _Some;
                ns = _ns;
                break _L$8;
              }
              break _L$7;
            }
            if (has_prev.val) {
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "* as ");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ns);
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " from \"");
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name$4);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\"");
          _M0MP49puruslang5purus3src7codegen9JsCodegen23gen__import__attributes(self, attrs$2);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
          return;
        }
      }
      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "const ");
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = require(\"");
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name$3);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\");\n");
      return;
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "import(\"");
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name$2);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\");\n");
    return;
  }
  if (self.cjs) {
    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "require(\"");
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\");\n");
    return;
  } else {
    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "import \"");
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, module_name);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\"");
    _M0MP49puruslang5purus3src7codegen9JsCodegen23gen__import__attributes(self, attrs);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
    return;
  }
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen23gen__import__attributes(self, attrs) {
  let pairs;
  _L: {
    if (attrs.$tag === 1) {
      const _Some = attrs;
      const _pairs = _Some._0;
      pairs = _pairs;
      break _L;
    } else {
      return;
    }
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " with { ");
  const first = new _M0TPB8MutLocalGbE(true);
  const _bind = pairs.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const pair = pairs[_];
      if (!first.val) {
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
      }
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, pair._0);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ": ");
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, pair._1);
      first.val = false;
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " }");
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen10gen__match(self, subject, arms) {
  const has_bind_guard = new _M0TPB8MutLocalGbE(false);
  const _bind = arms.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const arm = arms[_];
      let name;
      _L: {
        _L$2: {
          const _bind$2 = arm.pattern;
          if (_bind$2.$tag === 1) {
            const _BindPat = _bind$2;
            const _name = _BindPat._0;
            name = _name;
            break _L$2;
          }
          break _L;
        }
        const _bind$2 = arm.cond;
        if (_bind$2 === undefined) {
        } else {
          if (!_M0FP49puruslang5purus3src7codegen9is__blank(name)) {
            has_bind_guard.val = true;
          }
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (has_bind_guard.val) {
    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{\n");
    self.indent_level = self.indent_level + 1 | 0;
    const _bind$2 = arms.length;
    let _tmp$2 = 0;
    while (true) {
      const _ = _tmp$2;
      if (_ < _bind$2) {
        const arm = arms[_];
        let name;
        _L: {
          _L$2: {
            const _bind$3 = arm.pattern;
            if (_bind$3.$tag === 1) {
              const _BindPat = _bind$3;
              const _name = _BindPat._0;
              name = _name;
              break _L$2;
            }
            break _L;
          }
          const _bind$3 = arm.cond;
          if (_bind$3 === undefined) {
          } else {
            if (!_M0FP49puruslang5purus3src7codegen9is__blank(name)) {
              _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "const ");
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
              _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, subject);
              _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
            }
          }
        }
        _tmp$2 = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
  const first = new _M0TPB8MutLocalGbE(true);
  const _bind$2 = arms.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const arm = arms[_];
      if (!first.val) {
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " else ");
      }
      let name;
      _L: {
        _L$2: {
          let lit;
          _L$3: {
            const _bind$3 = arm.pattern;
            if (_bind$3.$tag === 0) {
              const _LitPat = _bind$3;
              const _lit = _LitPat._0;
              lit = _lit;
              break _L$3;
            } else {
              const _BindPat = _bind$3;
              const _name = _BindPat._0;
              name = _name;
              break _L$2;
            }
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "if (");
          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, subject);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " === ");
          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, lit);
          let c;
          _L$4: {
            _L$5: {
              const _bind$3 = arm.cond;
              if (_bind$3 === undefined) {
              } else {
                const _Some = _bind$3;
                const _c = _Some;
                c = _c;
                break _L$5;
              }
              break _L$4;
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " && ");
            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, c);
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
          break _L;
        }
        if (_M0FP49puruslang5purus3src7codegen9is__blank(name)) {
          let c;
          _L$3: {
            _L$4: {
              const _bind$3 = arm.cond;
              if (_bind$3 === undefined) {
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "{\n");
              } else {
                const _Some = _bind$3;
                const _c = _Some;
                c = _c;
                break _L$4;
              }
              break _L$3;
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "if (");
            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, c);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
          }
        } else {
          let c;
          _L$3: {
            _L$4: {
              const _bind$3 = arm.cond;
              if (_bind$3 === undefined) {
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "if (true) { const ");
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
                _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, subject);
                _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
              } else {
                const _Some = _bind$3;
                const _c = _Some;
                c = _c;
                break _L$4;
              }
              break _L$3;
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "if (");
            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, c);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ") {\n");
          }
        }
      }
      self.indent_level = self.indent_level + 1 | 0;
      let stmts;
      _L$2: {
        _L$3: {
          let expr;
          _L$4: {
            const _bind$3 = arm.body;
            if (_bind$3.$tag === 0) {
              const _ExprBody = _bind$3;
              const _expr = _ExprBody._0;
              expr = _expr;
              break _L$4;
            } else {
              const _BlockBody = _bind$3;
              const _stmts = _BlockBody._0;
              stmts = _stmts;
              break _L$3;
            }
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";\n");
          break _L$2;
        }
        const _bind$3 = stmts.length;
        let _tmp$3 = 0;
        while (true) {
          const _$2 = _tmp$3;
          if (_$2 < _bind$3) {
            const s = stmts[_$2];
            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, s);
            _tmp$3 = _$2 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      }
      self.indent_level = self.indent_level - 1 | 0;
      _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "}");
      first.val = false;
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "\n");
  if (has_bind_guard.val) {
    self.indent_level = self.indent_level - 1 | 0;
    _M0MP49puruslang5purus3src7codegen9JsCodegen13write__indent(self);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "}\n");
    return;
  } else {
    return;
  }
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen17gen__stmt__inline(self, stmt) {
  let target;
  let op;
  let value;
  _L: {
    let target$2;
    let value$2;
    _L$2: {
      let expr;
      _L$3: {
        let v;
        _L$4: {
          let expr$2;
          _L$5: {
            let name;
            let kind;
            let value$3;
            _L$6: {
              switch (stmt.$tag) {
                case 0: {
                  const _VarDecl = stmt;
                  const _kind = _VarDecl._0;
                  const _name = _VarDecl._1;
                  const _value = _VarDecl._2;
                  name = _name;
                  kind = _kind;
                  value$3 = _value;
                  break _L$6;
                }
                case 24: {
                  const _ExprStmt = stmt;
                  const _expr = _ExprStmt._0;
                  expr$2 = _expr;
                  break _L$5;
                }
                case 21: {
                  const _Return = stmt;
                  const _x = _Return._0;
                  if (_x === undefined) {
                    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "return;");
                    return;
                  } else {
                    const _Some = _x;
                    const _v = _Some;
                    v = _v;
                    break _L$4;
                  }
                }
                case 20: {
                  const _Throw = stmt;
                  const _expr$2 = _Throw._0;
                  expr = _expr$2;
                  break _L$3;
                }
                case 4: {
                  const _Assign = stmt;
                  const _target = _Assign._0;
                  const _value$2 = _Assign._1;
                  target$2 = _target;
                  value$2 = _value$2;
                  break _L$2;
                }
                case 5: {
                  const _CompoundAssign = stmt;
                  const _op = _CompoundAssign._0;
                  const _target$2 = _CompoundAssign._1;
                  const _value$3 = _CompoundAssign._2;
                  target = _target$2;
                  op = _op;
                  value = _value$3;
                  break _L;
                }
                default: {
                  _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, stmt);
                  return;
                }
              }
            }
            let kw;
            switch (kind) {
              case 0: {
                kw = "const";
                break;
              }
              case 1: {
                kw = "let";
                break;
              }
              default: {
                kw = "var";
              }
            }
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, kw);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " ");
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen9js__ident(name));
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
            _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$3);
            _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";");
            return;
          }
          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr$2);
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";");
          return;
        }
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "return ");
        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, v);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";");
        return;
      }
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, "throw ");
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, expr);
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";");
      return;
    }
    let end;
    let obj;
    let start;
    let inclusive;
    _L$3: {
      if (target$2.$tag === 13) {
        const _Slice = target$2;
        const _obj = _Slice._0;
        const _start = _Slice._1;
        const _end = _Slice._2;
        const _inclusive = _Slice._3;
        end = _end;
        obj = _obj;
        start = _start;
        inclusive = _inclusive;
        break _L$3;
      } else {
        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target$2);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = ");
        _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$2);
        _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";");
        return;
      }
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, obj);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ".splice(");
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, start);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
    _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self, end);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " - ");
    _M0MP49puruslang5purus3src7codegen9JsCodegen15gen__expr__wrap(self, start);
    if (inclusive) {
      _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " + 1");
    }
    let elems;
    _L$4: {
      _L$5: {
        if (value$2.$tag === 11) {
          const _ArrayLit = value$2;
          const _elems = _ArrayLit._0;
          elems = _elems;
          break _L$5;
        } else {
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ...");
          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value$2);
        }
        break _L$4;
      }
      const _bind = elems.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          const e = elems[_];
          _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ", ");
          _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, e);
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ");");
    return;
  }
  if (op === 21) {
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " = Math.floor(");
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, " / ");
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ");");
    return;
  } else {
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, target);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, _M0FP49puruslang5purus3src7codegen17compound__op__str(op));
    _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__expr(self, value);
    _M0MP49puruslang5purus3src7codegen9JsCodegen5write(self, ";");
    return;
  }
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen11new_2einner(cjs) {
  return new _M0TP49puruslang5purus3src7codegen9JsCodegen(_M0MPB13StringBuilder21StringBuilder_2einner(0), 0, [], [], cjs);
}
function _M0MP49puruslang5purus3src7codegen9JsCodegen16generate_2einner(self, stmts, header, shebang, strict) {
  if (shebang.length > 0) {
    _M0IPB13StringBuilderPB6Logger13write__string(self.buf, shebang);
    _M0IPB13StringBuilderPB6Logger11write__char(self.buf, 10);
  }
  if (header.length > 0) {
    _M0IPB13StringBuilderPB6Logger13write__string(self.buf, header);
    _M0IPB13StringBuilderPB6Logger11write__char(self.buf, 10);
  }
  if (strict) {
    _M0IPB13StringBuilderPB6Logger13write__string(self.buf, "\"use strict\";\n");
  }
  const _bind = stmts.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const stmt = stmts[_];
      _M0MP49puruslang5purus3src7codegen9JsCodegen9gen__stmt(self, stmt);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPB13StringBuilder10to__string(self.buf);
}
function _M0FP59puruslang5purus3src3cmd4main10cmd__build(args) {
  const file = new _M0TPB8MutLocalGsE("");
  const no_header = new _M0TPB8MutLocalGbE(false);
  const to_stdout = new _M0TPB8MutLocalGbE(false);
  const strict = new _M0TPB8MutLocalGbE(true);
  const cjs = new _M0TPB8MutLocalGbE(false);
  const i = new _M0TPB8MutLocalGiE(0);
  while (true) {
    if (i.val < args.length) {
      if (_M0MPC15array5Array2atGsE(args, i.val) === "--no-header") {
        no_header.val = true;
      } else {
        if (_M0MPC15array5Array2atGsE(args, i.val) === "--stdout") {
          to_stdout.val = true;
        } else {
          if (_M0MPC15array5Array2atGsE(args, i.val) === "--strict") {
            if ((i.val + 1 | 0) < args.length && (_M0MPC15array5Array2atGsE(args, i.val + 1 | 0) === "true" || _M0MPC15array5Array2atGsE(args, i.val + 1 | 0) === "false")) {
              i.val = i.val + 1 | 0;
              strict.val = _M0MPC15array5Array2atGsE(args, i.val) === "true";
            } else {
              strict.val = true;
            }
          } else {
            if (_M0MPC15array5Array2atGsE(args, i.val) === "--type") {
              if ((i.val + 1 | 0) < args.length) {
                i.val = i.val + 1 | 0;
                cjs.val = _M0MPC15array5Array2atGsE(args, i.val) === "commonjs";
              }
            } else {
              file.val = _M0MPC15array5Array2atGsE(args, i.val);
            }
          }
        }
      }
      i.val = i.val + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (file.val === "") {
    _M0FPB7printlnGsE("Error: no input file specified");
    _M0FPB7printlnGsE("Usage: purus build <file.purus|.cpurus|.mpurus>");
    return undefined;
  }
  let src;
  let _try_err;
  _L: {
    _L$2: {
      const _bind = _M0FP311moonbitlang1x2fs30read__file__to__string_2einner(file.val, "utf8");
      if (_bind.$tag === 1) {
        const _ok = _bind;
        src = _ok._0;
      } else {
        const _err = _bind;
        _try_err = _err._0;
        break _L$2;
      }
      break _L;
    }
    let msg;
    _L$3: {
      const _IOError = _try_err;
      const _msg = _IOError._0;
      msg = _msg;
      break _L$3;
    }
    _M0FPB7printlnGsE(`Error: cannot read file '${file.val}': ${msg}`);
    return undefined;
  }
  const tokens = _M0MP49puruslang5purus3src5lexer5Lexer8tokenize(_M0MP49puruslang5purus3src5lexer5Lexer3new(src));
  const shebang = new _M0TPB8MutLocalGsE("");
  const tok_start = new _M0TPB8MutLocalGiE(0);
  if (tokens.length > 0) {
    let s;
    _L$2: {
      _L$3: {
        const _bind = _M0MPC15array5Array2atGsE(tokens, 0).kind;
        if (_bind.$tag === 112) {
          const _Shebang = _bind;
          const _s = _Shebang._0;
          s = _s;
          break _L$3;
        }
        break _L$2;
      }
      shebang.val = s;
      tok_start.val = 1;
      if (tok_start.val < tokens.length) {
        const _bind = _M0MPC15array5Array2atGsE(tokens, tok_start.val).kind;
        if (_bind.$tag === 108) {
          tok_start.val = tok_start.val + 1 | 0;
        }
      }
    }
  }
  const filtered = [];
  const fi = new _M0TPB8MutLocalGiE(tok_start.val);
  while (true) {
    if (fi.val < tokens.length) {
      _M0MPC15array5Array4pushGRP49puruslang5purus3src5lexer5TokenE(filtered, _M0MPC15array5Array2atGsE(tokens, fi.val));
      fi.val = fi.val + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const parser = _M0MP49puruslang5purus3src6parser6Parser3new(filtered);
  const stmts = _M0MP49puruslang5purus3src6parser6Parser5parse(parser);
  if (parser.errors.length > 0) {
    const _bind = parser.errors;
    const _bind$2 = _bind.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$2) {
        const msg = _bind[_];
        _M0FPB7printlnGsE(`Error: ${msg}`);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0FP311moonbitlang1x3sys4exit(1);
  }
  const header = no_header.val ? "" : "// Generated by Purus 1.2.0-beta.0";
  const js = _M0MP49puruslang5purus3src7codegen9JsCodegen16generate_2einner(_M0MP49puruslang5purus3src7codegen9JsCodegen11new_2einner(cjs.val), stmts, header, shebang.val, strict.val);
  if (to_stdout.val) {
    _M0FPB7printlnGsE(js);
    return undefined;
  }
  let base_and_ext;
  const _tmp = file.val;
  const _bind = ".cpurus";
  if (_M0MPC16string6String11has__suffix(_tmp, new _M0TPC16string10StringView(_bind, 0, _bind.length))) {
    const chars = _M0MPC16string6String9to__array(file.val);
    const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
    const i$2 = new _M0TPB8MutLocalGiE(0);
    while (true) {
      if (i$2.val < (chars.length - 7 | 0)) {
        _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MPC15array5Array2atGcE(chars, i$2.val));
        i$2.val = i$2.val + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    base_and_ext = { _0: _M0MPB13StringBuilder10to__string(buf), _1: ".cjs" };
  } else {
    const _tmp$2 = file.val;
    const _bind$2 = ".mpurus";
    if (_M0MPC16string6String11has__suffix(_tmp$2, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length))) {
      const chars = _M0MPC16string6String9to__array(file.val);
      const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
      const i$2 = new _M0TPB8MutLocalGiE(0);
      while (true) {
        if (i$2.val < (chars.length - 7 | 0)) {
          _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MPC15array5Array2atGcE(chars, i$2.val));
          i$2.val = i$2.val + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      base_and_ext = { _0: _M0MPB13StringBuilder10to__string(buf), _1: ".mjs" };
    } else {
      const _tmp$3 = file.val;
      const _bind$3 = ".purus";
      if (_M0MPC16string6String11has__suffix(_tmp$3, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length))) {
        const chars = _M0MPC16string6String9to__array(file.val);
        const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
        const i$2 = new _M0TPB8MutLocalGiE(0);
        while (true) {
          if (i$2.val < (chars.length - 6 | 0)) {
            _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MPC15array5Array2atGcE(chars, i$2.val));
            i$2.val = i$2.val + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        base_and_ext = { _0: _M0MPB13StringBuilder10to__string(buf), _1: ".js" };
      } else {
        base_and_ext = { _0: file.val, _1: ".js" };
      }
    }
  }
  const out_file = `${base_and_ext._0}${base_and_ext._1}`;
  let _try_err$2;
  _L$2: {
    _L$3: {
      const _bind$2 = _M0FP311moonbitlang1x2fs31write__string__to__file_2einner(out_file, js, "utf8");
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _ok._0;
      } else {
        const _err = _bind$2;
        _try_err$2 = _err._0;
        break _L$3;
      }
      break _L$2;
    }
    let msg;
    _L$4: {
      const _IOError = _try_err$2;
      const _msg = _IOError._0;
      msg = _msg;
      break _L$4;
    }
    _M0FPB7printlnGsE(`Error: cannot write file '${out_file}': ${msg}`);
    return undefined;
  }
  _M0FPB7printlnGsE(`Compiled ${file.val} -> ${out_file}`);
}
function _M0FP59puruslang5purus3src3cmd4main10cmd__check(file) {
  if (file === "") {
    _M0FPB7printlnGsE("Error: no input file specified");
    _M0FPB7printlnGsE("Usage: purus check <file.purus|.cpurus|.mpurus>");
    return undefined;
  }
  let src;
  let _try_err;
  _L: {
    _L$2: {
      const _bind = _M0FP311moonbitlang1x2fs30read__file__to__string_2einner(file, "utf8");
      if (_bind.$tag === 1) {
        const _ok = _bind;
        src = _ok._0;
      } else {
        const _err = _bind;
        _try_err = _err._0;
        break _L$2;
      }
      break _L;
    }
    let msg;
    _L$3: {
      const _IOError = _try_err;
      const _msg = _IOError._0;
      msg = _msg;
      break _L$3;
    }
    _M0FPB7printlnGsE(`Error: cannot read file '${file}': ${msg}`);
    return undefined;
  }
  const tokens = _M0MP49puruslang5purus3src5lexer5Lexer8tokenize(_M0MP49puruslang5purus3src5lexer5Lexer3new(src));
  const parser = _M0MP49puruslang5purus3src6parser6Parser3new(tokens);
  _M0MP49puruslang5purus3src6parser6Parser5parse(parser);
  if (parser.errors.length > 0) {
    const _bind = parser.errors;
    const _bind$2 = _bind.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$2) {
        const msg = _bind[_];
        _M0FPB7printlnGsE(`Error: ${msg}`);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0FP311moonbitlang1x3sys4exit(1);
  }
  _M0FPB7printlnGsE(`OK: ${file}`);
}
(() => {
  const args = _M0MPC15array9ArrayView9to__ownedGsE(_M0MPC15array5Array21clamped__view_2einnerGsE(_M0FPC13env4args(), 1, undefined));
  if (args.length < 2) {
    return;
  }
  const cmd = _M0MPC15array5Array2atGsE(args, 1);
  _L: {
    switch (cmd) {
      case "build": {
        break _L;
      }
      case "compile": {
        break _L;
      }
      case "check": {
        const file = args.length > 2 ? _M0MPC15array5Array2atGsE(args, 2) : "";
        _M0FP59puruslang5purus3src3cmd4main10cmd__check(file);
        return;
      }
      default: {
        _M0FPB7printlnGsE(`Unknown command: ${cmd}`);
        return;
      }
    }
  }
  _M0FP59puruslang5purus3src3cmd4main10cmd__build(_M0MPC15array9ArrayView9to__ownedGsE(_M0MPC15array5Array21clamped__view_2einnerGsE(args, 2, undefined)));
})();
//# sourceMappingURL=main.js.map
