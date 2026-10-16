// Purus stdlib: p-regexp — Regular expression utilities
//
// test: node -e "const r = require('./stdlib/p-regexp'); console.log(r.mod.test(/\d+/, '42'))"

exports.mod = {
  create(pattern, flags) {
    return new RegExp(pattern, flags || "");
  },
  test(re, str) {
    return re instanceof RegExp ? re.test(str) : new RegExp(re).test(str);
  },
  match(re, str) {
    return str.match(re);
  },
  matchall(re, str) {
    const r = re instanceof RegExp ? re : new RegExp(re, "g");
    if (!r.flags.includes("g")) {
      return [...str.matchAll(new RegExp(r.source, r.flags + "g"))];
    }
    return [...str.matchAll(r)];
  },
  exec(re, str) {
    return re.exec(str);
  },
  replace(re, str, replacement) {
    return str.replace(re, replacement);
  },
  replaceall(re, str, replacement) {
    const r = re instanceof RegExp ? re : new RegExp(re, "g");
    if (!r.flags.includes("g")) {
      return str.replaceAll(new RegExp(r.source, r.flags + "g"), replacement);
    }
    return str.replaceAll(r, replacement);
  },
  split(re, str) {
    return str.split(re);
  },
  source(re) {
    return re.source;
  },
  flags(re) {
    return re.flags;
  },
  escape(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  },
};

exports.spread = null;
exports.constants = {};
