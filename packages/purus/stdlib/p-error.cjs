// Purus stdlib: p-error — Error creation and inspection utilities
//
// test: node -e "const e = require('./stdlib/p-error'); console.log(e.mod.create('oops').message)"

exports.mod = {
  create(message) {
    return new Error(message);
  },
  type(message) {
    return new TypeError(message);
  },
  range(message) {
    return new RangeError(message);
  },
  reference(message) {
    return new ReferenceError(message);
  },
  syntax(message) {
    return new SyntaxError(message);
  },
  uri(message) {
    return new URIError(message);
  },
  iserror(val) {
    return val instanceof Error;
  },
  message(err) {
    return err instanceof Error ? err.message : String(err);
  },
  name(err) {
    return err instanceof Error ? err.name : "Error";
  },
  stack(err) {
    return err instanceof Error ? err.stack || "" : "";
  },
  cause(err) {
    return err instanceof Error ? err.cause : undefined;
  },
  wrap(message, cause) {
    return new Error(message, { cause });
  },
};

exports.spread = null;
exports.constants = {};
