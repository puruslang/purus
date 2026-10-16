// Purus stdlib: p-object — Object utility functions
//
// test: node -e "const o = require('./stdlib/p-object'); console.log(o.mod.keys({a:1,b:2}))"

exports.mod = {
  keys(obj) {
    return Object.keys(obj);
  },
  values(obj) {
    return Object.values(obj);
  },
  entries(obj) {
    return Object.entries(obj);
  },
  fromentries(arr) {
    return Object.fromEntries(arr);
  },
  assign(target, ...sources) {
    return Object.assign(target, ...sources);
  },
  freeze(obj) {
    return Object.freeze(obj);
  },
  seal(obj) {
    return Object.seal(obj);
  },
  isfrozen(obj) {
    return Object.isFrozen(obj);
  },
  issealed(obj) {
    return Object.isSealed(obj);
  },
  hasown(obj, key) {
    return Object.hasOwn(obj, key);
  },
  create(proto, props) {
    return Object.create(proto, props);
  },
  is(a, b) {
    return Object.is(a, b);
  },
  len(obj) {
    return Object.keys(obj).length;
  },
  merge(...objs) {
    return Object.assign({}, ...objs);
  },
  clone(obj) {
    return structuredClone(obj);
  },
  pick(obj, keys) {
    const result = {};
    for (const k of keys) {
      if (k in obj) result[k] = obj[k];
    }
    return result;
  },
  omit(obj, keys) {
    const set = new Set(keys);
    const result = {};
    for (const k of Object.keys(obj)) {
      if (!set.has(k)) result[k] = obj[k];
    }
    return result;
  },
};

exports.spread = null;
exports.constants = {};
