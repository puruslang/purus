// Purus stdlib: p-number — Number utility functions
//
// test: node -e "const n = require('./stdlib/p-number'); console.log(n.mod.isfinite(42))"

exports.mod = {
  isfinite(val) {
    return Number.isFinite(val);
  },
  isinteger(val) {
    return Number.isInteger(val);
  },
  isnan(val) {
    return Number.isNaN(val);
  },
  issafe(val) {
    return Number.isSafeInteger(val);
  },
  parsefloat(str) {
    return Number.parseFloat(str);
  },
  parseint(str, radix) {
    return Number.parseInt(str, radix || 10);
  },
  tofixed(num, digits) {
    return Number(num).toFixed(digits || 0);
  },
  toprecision(num, digits) {
    return Number(num).toPrecision(digits);
  },
  toexponential(num, digits) {
    return Number(num).toExponential(digits);
  },
  tostring(num, radix) {
    return Number(num).toString(radix || 10);
  },
  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  },
};

exports.spread = "Number";

exports.constants = {
  maxsafe: "MAX_SAFE_INTEGER",
  minsafe: "MIN_SAFE_INTEGER",
  epsilon: "EPSILON",
  maxvalue: "MAX_VALUE",
  minvalue: "MIN_VALUE",
  posinf: "POSITIVE_INFINITY",
  neginf: "NEGATIVE_INFINITY",
};
