// Purus stdlib: math — Math alias with lowercase constants
//
// math = JS Math + lowercase aliases for uppercase constants (PI → pi, etc.)
// All Math.* methods (abs, sin, floor, ...) are available as-is.

exports.spread = "Math";

exports.mod = {
  ...Math,
  pi: Math.PI,
  e: Math.E,
  ln2: Math.LN2,
  ln10: Math.LN10,
  log2e: Math.LOG2E,
  log10e: Math.LOG10E,
  sqrt2: Math.SQRT2,
  sqrt1_2: Math.SQRT1_2,
};

exports.constants = {
  pi: "PI",
  e: "E",
  ln2: "LN2",
  ln10: "LN10",
  log2e: "LOG2E",
  log10e: "LOG10E",
  sqrt2: "SQRT2",
  sqrt1_2: "SQRT1_2",
};
