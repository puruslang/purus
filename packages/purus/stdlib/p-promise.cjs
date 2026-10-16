// Purus stdlib: p-promise — Promise utility functions
//
// test: node -e "const p = require('./stdlib/p-promise'); p.mod.resolve(42).then(v => console.log(v))"

exports.mod = {
  resolve(value) {
    return Promise.resolve(value);
  },
  reject(reason) {
    return Promise.reject(reason);
  },
  all(promises) {
    return Promise.all(promises);
  },
  allsettled(promises) {
    return Promise.allSettled(promises);
  },
  race(promises) {
    return Promise.race(promises);
  },
  any(promises) {
    return Promise.any(promises);
  },
  create(executor) {
    return new Promise(executor);
  },
  delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  },
  timeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise(function (_, reject) {
        setTimeout(function () {
          reject(new Error("Promise timed out"));
        }, ms);
      }),
    ]);
  },
};

exports.spread = null;
exports.constants = {};
