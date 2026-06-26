// Purus stdlib: random
//
// test: node -e "const r = require('./stdlib/random'); console.log(r.mod.randint(1, 10))"

exports.mod = {
  // --- core ---
  random() {
    return Math.random();
  },
  randint(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  },
  randrange(...args) {
    let start = 0,
      stop,
      step = 1;
    if (args.length === 1) {
      stop = args[0];
    } else if (args.length === 2) {
      start = args[0];
      stop = args[1];
    } else {
      start = args[0];
      stop = args[1];
      step = args[2];
    }
    const n = Math.ceil((stop - start) / step);
    return start + step * Math.floor(Math.random() * n);
  },
  randbool(p) {
    if (p === undefined) p = 0.5;
    return Math.random() < p;
  },
  getrandbits(k) {
    if (k <= 0) return 0;
    if (k <= 32) return (Math.random() * (1 << k)) >>> 0;
    let result = 0;
    let remaining = k;
    while (remaining > 0) {
      const bits = Math.min(remaining, 32);
      result = result * (1 << bits) + ((Math.random() * (1 << bits)) >>> 0);
      remaining -= bits;
    }
    return result;
  },
  randbytes(n) {
    const bytes = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      bytes[i] = (Math.random() * 256) >>> 0;
    }
    return Array.from(bytes);
  },
  normalvariate(mu, sigma) {
    return this.gauss(mu, sigma);
  },

  // --- real-valued distributions ---
  uniform(a, b) {
    return a + (b - a) * Math.random();
  },
  triangular(lo, hi, mode) {
    if (lo === undefined) lo = 0;
    if (hi === undefined) hi = 1;
    if (mode === undefined) mode = (lo + hi) / 2;
    const u = Math.random(),
      c = (mode - lo) / (hi - lo);
    return u < c
      ? lo + Math.sqrt(u * (hi - lo) * (mode - lo))
      : hi - Math.sqrt((1 - u) * (hi - lo) * (hi - mode));
  },
  gauss(mu, sigma) {
    if (mu === undefined) mu = 0;
    if (sigma === undefined) sigma = 1;
    let u, v, s;
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    } while (s >= 1 || s === 0);
    return mu + sigma * u * Math.sqrt((-2 * Math.log(s)) / s);
  },
  expovariate(lambd) {
    return -Math.log(1 - Math.random()) / lambd;
  },
  gammavariate(alpha, beta) {
    if (alpha > 1) {
      const d = alpha - 1 / 3,
        c = 1 / Math.sqrt(9 * d);
      let x, v;
      do {
        do {
          x = this.gauss(0, 1);
          v = 1 + c * x;
        } while (v <= 0);
        v = v * v * v;
      } while (
        Math.log(Math.random()) >=
        0.5 * x * x + d - d * v + d * Math.log(v)
      );
      return d * v * beta;
    }
    if (alpha === 1) return -Math.log(1 - Math.random()) * beta;
    return (
      this.gammavariate(alpha + 1, beta) * Math.pow(Math.random(), 1 / alpha)
    );
  },
  betavariate(alpha, beta) {
    const y = this.gammavariate(alpha, 1);
    return y === 0 ? 0 : y / (y + this.gammavariate(beta, 1));
  },
  lognormvariate(mu, sigma) {
    return Math.exp(this.gauss(mu, sigma));
  },
  vonmisesvariate(mu, kappa) {
    if (kappa <= 1e-6) return 2 * Math.PI * Math.random();
    const a = 1 + Math.sqrt(1 + 4 * kappa * kappa),
      b = (a - Math.sqrt(2 * a)) / (2 * kappa),
      r = (1 + b * b) / (2 * b);
    let f;
    do {
      const u1 = Math.random(),
        z = Math.cos(Math.PI * u1),
        d = z / (r + z),
        u2 = Math.random();
      if (u2 < 1 - d * d || u2 <= (1 - d) * Math.exp(d)) {
        f = (1 / r + z) / (1 + r * z);
        break;
      }
    } while (true);
    return (
      (((Math.random() > 0.5 ? mu + Math.acos(f) : mu - Math.acos(f)) %
        (2 * Math.PI)) +
        2 * Math.PI) %
      (2 * Math.PI)
    );
  },
  paretovariate(alpha) {
    return Math.pow(1 - Math.random(), -1 / alpha);
  },
  weibullvariate(alpha, beta) {
    return alpha * Math.pow(-Math.log(1 - Math.random()), 1 / beta);
  },

  // --- sequence ---
  choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  choices(arr, k) {
    return Array.from(
      { length: k },
      () => arr[Math.floor(Math.random() * arr.length)],
    );
  },
  wchoices(arr, weights, k) {
    const cum = [];
    let s = 0;
    for (const w of weights) {
      s += w;
      cum.push(s);
    }
    return Array.from({ length: k }, () => {
      const r = Math.random() * s;
      let lo = 0,
        hi = cum.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        cum[mid] < r ? (lo = mid + 1) : (hi = mid);
      }
      return arr[lo];
    });
  },
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  sample(arr, k) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, k);
  },

  // --- discrete ---
  binomial(n, p) {
    let x = 0;
    for (let i = 0; i < n; i++) {
      if (Math.random() < p) x++;
    }
    return x;
  },
  poisson(lambda) {
    const L = Math.exp(-lambda);
    let k = 0,
      p = 1;
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    return k - 1;
  },
  geometric(p) {
    return Math.floor(Math.log(1 - Math.random()) / Math.log(1 - p)) + 1;
  },

  // --- utility ---
  clamp(val, lo, hi) {
    return Math.min(Math.max(val, lo), hi);
  },
  lerp(a, b, t) {
    return a + (b - a) * t;
  },
};
