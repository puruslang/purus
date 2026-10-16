// Purus stdlib: p-set — Set creation and operations
//
// test: node -e "const s = require('./stdlib/p-set'); console.log(s.mod.from([1,2,3,2,1]))"

exports.mod = {
  create(...items) {
    return new Set(items);
  },
  from(iterable) {
    return new Set(iterable);
  },
  add(set, value) {
    return new Set(set).add(value);
  },
  delete(set, value) {
    const s = new Set(set);
    s.delete(value);
    return s;
  },
  has(set, value) {
    return set.has(value);
  },
  size(set) {
    return set.size;
  },
  values(set) {
    return [...set];
  },
  union(a, b) {
    return a.union(b);
  },
  intersection(a, b) {
    return a.intersection(b);
  },
  difference(a, b) {
    return a.difference(b);
  },
  symmetricdifference(a, b) {
    return a.symmetricDifference(b);
  },
  issubset(a, b) {
    return a.isSubsetOf(b);
  },
  issuperset(a, b) {
    return a.isSupersetOf(b);
  },
  isdisjoint(a, b) {
    return a.isDisjointFrom(b);
  },
  clear(set) {
    const s = new Set(set);
    s.clear();
    return s;
  },
  toarray(set) {
    return [...set];
  },
};

exports.spread = null;
exports.constants = {};
