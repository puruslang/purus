// Purus stdlib: string — string utility functions
//
// test: node -e "const s = require('./stdlib/string'); console.log(s.mod.reverse('hello'))"

exports.mod = {
  // --- query ---
  len(str) {
    return str.length;
  },
  contains(str, sub) {
    return str.includes(sub);
  },
  startswith(str, prefix) {
    return str.startsWith(prefix);
  },
  endswith(str, suffix) {
    return str.endsWith(suffix);
  },
  indexof(str, sub) {
    return str.indexOf(sub);
  },
  count(str, sub) {
    let c = 0,
      i = 0;
    while ((i = str.indexOf(sub, i)) !== -1) {
      c++;
      i += sub.length;
    }
    return c;
  },

  // --- transform ---
  upper(str) {
    return str.toUpperCase();
  },
  lower(str) {
    return str.toLowerCase();
  },
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  title(str) {
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  },
  trim(str) {
    return str.trim();
  },
  trimstart(str) {
    return str.trimStart();
  },
  trimend(str) {
    return str.trimEnd();
  },
  reverse(str) {
    return [...str].reverse().join("");
  },
  repeat(str, n) {
    return str.repeat(n);
  },
  replace(str, old, rep) {
    return str.replaceAll(old, rep);
  },
  replacefirst(str, old, rep) {
    return str.replace(old, rep);
  },
  padstart(str, len, fill) {
    return str.padStart(len, fill || " ");
  },
  padend(str, len, fill) {
    return str.padEnd(len, fill || " ");
  },

  // --- split / join ---
  split(str, sep) {
    return str.split(sep);
  },
  lines(str) {
    return str.split(/\r?\n/);
  },
  words(str) {
    return str.split(/\s+/).filter((w) => w.length > 0);
  },
  join(arr, sep) {
    return arr.join(sep);
  },
  chars(str) {
    return [...str];
  },

  // --- slice ---
  slice(str, start, end) {
    return str.slice(start, end);
  },
  charat(str, i) {
    return str.charAt(i);
  },
  codeat(str, i) {
    return str.codePointAt(i);
  },
  fromcode(code) {
    return String.fromCodePoint(code);
  },
};
