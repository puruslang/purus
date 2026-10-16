// Purus stdlib: datetime — date/time utility functions
//
// test: node -e "const d = require('./stdlib/datetime'); console.log(d.mod.now())"

exports.mod = {
  // --- current time ---
  now() {
    return Date.now();
  },
  today() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  },
  timestamp() {
    return Math.floor(Date.now() / 1000);
  },

  // --- create ---
  create(year, month, day, hour, minute, second, ms) {
    return new Date(
      year,
      (month || 1) - 1,
      day || 1,
      hour || 0,
      minute || 0,
      second || 0,
      ms || 0,
    ).getTime();
  },
  utccreate(year, month, day, hour, minute, second, ms) {
    return Date.UTC(
      year,
      (month || 1) - 1,
      day || 1,
      hour || 0,
      minute || 0,
      second || 0,
      ms || 0,
    );
  },
  fromiso(str) {
    return new Date(str).getTime();
  },

  // --- extract components (local) ---
  year(t) {
    return new Date(t).getFullYear();
  },
  month(t) {
    return new Date(t).getMonth() + 1;
  },
  day(t) {
    return new Date(t).getDate();
  },
  weekday(t) {
    return new Date(t).getDay();
  },
  hour(t) {
    return new Date(t).getHours();
  },
  minute(t) {
    return new Date(t).getMinutes();
  },
  second(t) {
    return new Date(t).getSeconds();
  },
  ms(t) {
    return new Date(t).getMilliseconds();
  },

  // --- extract components (UTC) ---
  utcyear(t) {
    return new Date(t).getUTCFullYear();
  },
  utcmonth(t) {
    return new Date(t).getUTCMonth() + 1;
  },
  utcday(t) {
    return new Date(t).getUTCDate();
  },
  utcweekday(t) {
    return new Date(t).getUTCDay();
  },
  utchour(t) {
    return new Date(t).getUTCHours();
  },
  utcminute(t) {
    return new Date(t).getUTCMinutes();
  },
  utcsecond(t) {
    return new Date(t).getUTCSeconds();
  },
  utcms(t) {
    return new Date(t).getUTCMilliseconds();
  },

  // --- extract components (timezone-aware) ---
  _tzpart(t, tz, type) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      fractionalSecondDigits: 3,
      hour12: false,
    }).formatToParts(new Date(t));
    const p = parts.find((p) => p.type === type);
    return p ? parseInt(p.value, 10) : 0;
  },
  tzyear(t, tz) {
    return this._tzpart(t, tz, "year");
  },
  tzmonth(t, tz) {
    return this._tzpart(t, tz, "month");
  },
  tzday(t, tz) {
    return this._tzpart(t, tz, "day");
  },
  tzweekday(t, tz) {
    const d = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
    }).format(new Date(t));
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(d);
  },
  tzhour(t, tz) {
    return this._tzpart(t, tz, "hour") % 24;
  },
  tzminute(t, tz) {
    return this._tzpart(t, tz, "minute");
  },
  tzsecond(t, tz) {
    return this._tzpart(t, tz, "second");
  },

  // --- format ---
  toiso(t) {
    return new Date(t).toISOString();
  },
  tolocale(t, locale, options) {
    return new Date(t).toLocaleString(locale, options);
  },
  todate(t, locale, options) {
    return new Date(t).toLocaleDateString(locale, options);
  },
  totime(t, locale, options) {
    return new Date(t).toLocaleTimeString(locale, options);
  },
  format(t, tz, locale, options) {
    return new Date(t).toLocaleString(locale || "en-US", {
      timeZone: tz,
      ...options,
    });
  },

  // --- arithmetic ---
  addms(t, n) {
    return t + n;
  },
  addseconds(t, n) {
    return t + n * 1000;
  },
  addminutes(t, n) {
    return t + n * 60000;
  },
  addhours(t, n) {
    return t + n * 3600000;
  },
  adddays(t, n) {
    return t + n * 86400000;
  },

  // --- comparison ---
  diff(a, b) {
    return a - b;
  },
  diffdays(a, b) {
    return (a - b) / 86400000;
  },
  diffhours(a, b) {
    return (a - b) / 3600000;
  },
  diffminutes(a, b) {
    return (a - b) / 60000;
  },
  diffseconds(a, b) {
    return (a - b) / 1000;
  },

  // --- timezone info ---
  offset(t) {
    return new Date(t || Date.now()).getTimezoneOffset();
  },
  localtz() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  },
};
