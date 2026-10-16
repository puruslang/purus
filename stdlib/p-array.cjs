// Purus stdlib: p-array — Array utility functions
//
// test: node -e "const a = require('./stdlib/p-array'); console.log(a.mod.range(1,5))"

exports.mod = {
  isarray(val) {
    return Array.isArray(val);
  },
  from(val) {
    return Array.from(val);
  },
  of(...args) {
    return Array.of(...args);
  },
  len(arr) {
    return arr.length;
  },
  first(arr) {
    return arr[0];
  },
  last(arr) {
    return arr[arr.length - 1];
  },
  range(start, end, step) {
    const s = step || 1;
    const result = [];
    for (let i = start; i < end; i += s) result.push(i);
    return result;
  },
  flatten(arr, depth) {
    return arr.flat(depth === undefined ? Infinity : depth);
  },
  unique(arr) {
    return [...new Set(arr)];
  },
  zip(...arrs) {
    const minLen = Math.min(...arrs.map((a) => a.length));
    const result = [];
    for (let i = 0; i < minLen; i++) {
      result.push(arrs.map((a) => a[i]));
    }
    return result;
  },
  unzip(arr) {
    if (arr.length === 0) return [];
    const result = arr[0].map(() => []);
    for (const tuple of arr) {
      for (let i = 0; i < tuple.length; i++) {
        result[i].push(tuple[i]);
      }
    }
    return result;
  },
  chunk(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  },
  sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
  },
  product(arr) {
    return arr.reduce((a, b) => a * b, 1);
  },
  min(arr) {
    return Math.min(...arr);
  },
  max(arr) {
    return Math.max(...arr);
  },
  sortasc(arr) {
    return [...arr].sort((a, b) => a - b);
  },
  sortdesc(arr) {
    return [...arr].sort((a, b) => b - a);
  },
  compact(arr) {
    return arr.filter(Boolean);
  },
  count(arr, fn) {
    return arr.filter(fn).length;
  },
  groupby(arr, fn) {
    const result = {};
    for (const item of arr) {
      const key = fn(item);
      if (!result[key]) result[key] = [];
      result[key].push(item);
    }
    return result;
  },
};

exports.spread = null;
exports.constants = {};
