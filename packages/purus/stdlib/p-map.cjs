// Purus stdlib: p-map — Map creation and operations
//
// test: node -e "const m = require('./stdlib/p-map'); const x = m.mod.from([['a',1]]); console.log(m.mod.get(x,'a'))"

exports.mod = {
  create(...pairs) {
    return new Map(pairs);
  },
  from(iterable) {
    return new Map(iterable);
  },
  fromobject(obj) {
    return new Map(Object.entries(obj));
  },
  get(map, key) {
    return map.get(key);
  },
  set(map, key, value) {
    const m = new Map(map);
    m.set(key, value);
    return m;
  },
  delete(map, key) {
    const m = new Map(map);
    m.delete(key);
    return m;
  },
  has(map, key) {
    return map.has(key);
  },
  size(map) {
    return map.size;
  },
  keys(map) {
    return [...map.keys()];
  },
  values(map) {
    return [...map.values()];
  },
  entries(map) {
    return [...map.entries()];
  },
  clear(map) {
    const m = new Map(map);
    m.clear();
    return m;
  },
  toobject(map) {
    return Object.fromEntries(map);
  },
  merge(a, b) {
    return new Map([...a, ...b]);
  },
};

exports.spread = null;
exports.constants = {};
