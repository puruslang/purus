// Purus stdlib: json — JSON parse / stringify utilities
//
// test: node -e "const j = require('./stdlib/json'); console.log(j.mod.parse('{\"a\":1}'))"

exports.mod = {
  parse(str) {
    return JSON.parse(str);
  },
  stringify(val) {
    return JSON.stringify(val);
  },
  prettify(val, indent) {
    return JSON.stringify(val, null, indent || 2);
  },
};

exports.spread = "JSON";
exports.constants = {};
