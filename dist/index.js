#!/usr/bin/env node
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/ms/index.js
var require_ms = __commonJS((exports, module) => {
  var s = 1000;
  var m = s * 60;
  var h2 = m * 60;
  var d2 = h2 * 24;
  var w = d2 * 7;
  var y2 = d2 * 365.25;
  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y2;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d2;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h2;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return;
    }
  }
  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d2) {
      return Math.round(ms / d2) + "d";
    }
    if (msAbs >= h2) {
      return Math.round(ms / h2) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d2) {
      return plural(ms, msAbs, d2, "day");
    }
    if (msAbs >= h2) {
      return plural(ms, msAbs, h2, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  }
  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS((exports, module) => {
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce2;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0;i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self = debug;
        const curr = Number(new Date);
        const ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self, args);
        const logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.useColors = createDebug.useColors();
      debug.color = createDebug.selectColor(namespace);
      debug.extend = extend;
      debug.destroy = createDebug.destroy;
      Object.defineProperty(debug, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v2) => {
          enableOverride = v2;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }
      return debug;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const ns of split) {
        if (ns[0] === "-") {
          createDebug.skips.push(ns.slice(1));
        } else {
          createDebug.names.push(ns);
        }
      }
    }
    function matchesTemplate(search, template) {
      let searchIndex = 0;
      let templateIndex = 0;
      let starIndex = -1;
      let matchIndex = 0;
      while (searchIndex < search.length) {
        if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
          if (template[templateIndex] === "*") {
            starIndex = templateIndex;
            matchIndex = searchIndex;
            templateIndex++;
          } else {
            searchIndex++;
            templateIndex++;
          }
        } else if (starIndex !== -1) {
          templateIndex = starIndex + 1;
          matchIndex++;
          searchIndex = matchIndex;
        } else {
          return false;
        }
      }
      while (templateIndex < template.length && template[templateIndex] === "*") {
        templateIndex++;
      }
      return templateIndex === template.length;
    }
    function disable() {
      const namespaces = [
        ...createDebug.names,
        ...createDebug.skips.map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      for (const skip of createDebug.skips) {
        if (matchesTemplate(name, skip)) {
          return false;
        }
      }
      for (const ns of createDebug.names) {
        if (matchesTemplate(name, ns)) {
          return true;
        }
      }
      return false;
    }
    function coerce2(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  module.exports = setup;
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS((exports, module) => {
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    let m;
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  exports.log = console.debug || console.log || (() => {});
  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error) {}
  }
  function load() {
    let r;
    try {
      r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
    } catch (error) {}
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error) {}
  }
  module.exports = require_common()(exports);
  var { formatters } = module.exports;
  formatters.j = function(v2) {
    try {
      return JSON.stringify(v2);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
});

// node_modules/rfdc/index.js
var require_rfdc = __commonJS((exports, module) => {
  module.exports = rfdc;
  function copyBuffer(cur) {
    if (cur instanceof Buffer) {
      return Buffer.from(cur);
    }
    return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
  }
  function rfdc(opts) {
    opts = opts || {};
    if (opts.circles)
      return rfdcCircles(opts);
    const constructorHandlers = new Map;
    constructorHandlers.set(Date, (o) => new Date(o));
    constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
    constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
    if (opts.constructorHandlers) {
      for (const handler2 of opts.constructorHandlers) {
        constructorHandlers.set(handler2[0], handler2[1]);
      }
    }
    let handler = null;
    return opts.proto ? cloneProto : clone;
    function cloneArray(a, fn) {
      const keys = Object.keys(a);
      const a2 = new Array(keys.length);
      for (let i = 0;i < keys.length; i++) {
        const k = keys[i];
        const cur = a[k];
        if (typeof cur !== "object" || cur === null) {
          a2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          a2[k] = handler(cur, fn);
        } else if (ArrayBuffer.isView(cur)) {
          a2[k] = copyBuffer(cur);
        } else {
          a2[k] = fn(cur);
        }
      }
      return a2;
    }
    function clone(o) {
      if (typeof o !== "object" || o === null)
        return o;
      if (Array.isArray(o))
        return cloneArray(o, clone);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
        return handler(o, clone);
      }
      const o2 = {};
      for (const k in o) {
        if (Object.hasOwnProperty.call(o, k) === false)
          continue;
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) {
          o2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          o2[k] = handler(cur, clone);
        } else if (ArrayBuffer.isView(cur)) {
          o2[k] = copyBuffer(cur);
        } else {
          o2[k] = clone(cur);
        }
      }
      return o2;
    }
    function cloneProto(o) {
      if (typeof o !== "object" || o === null)
        return o;
      if (Array.isArray(o))
        return cloneArray(o, cloneProto);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
        return handler(o, cloneProto);
      }
      const o2 = {};
      for (const k in o) {
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) {
          o2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          o2[k] = handler(cur, cloneProto);
        } else if (ArrayBuffer.isView(cur)) {
          o2[k] = copyBuffer(cur);
        } else {
          o2[k] = cloneProto(cur);
        }
      }
      return o2;
    }
  }
  function rfdcCircles(opts) {
    const refs = [];
    const refsNew = [];
    const constructorHandlers = new Map;
    constructorHandlers.set(Date, (o) => new Date(o));
    constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
    constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
    if (opts.constructorHandlers) {
      for (const handler2 of opts.constructorHandlers) {
        constructorHandlers.set(handler2[0], handler2[1]);
      }
    }
    let handler = null;
    return opts.proto ? cloneProto : clone;
    function cloneArray(a, fn) {
      const keys = Object.keys(a);
      const a2 = new Array(keys.length);
      for (let i = 0;i < keys.length; i++) {
        const k = keys[i];
        const cur = a[k];
        if (typeof cur !== "object" || cur === null) {
          a2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          a2[k] = handler(cur, fn);
        } else if (ArrayBuffer.isView(cur)) {
          a2[k] = copyBuffer(cur);
        } else {
          const index = refs.indexOf(cur);
          if (index !== -1) {
            a2[k] = refsNew[index];
          } else {
            a2[k] = fn(cur);
          }
        }
      }
      return a2;
    }
    function clone(o) {
      if (typeof o !== "object" || o === null)
        return o;
      if (Array.isArray(o))
        return cloneArray(o, clone);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
        return handler(o, clone);
      }
      const o2 = {};
      refs.push(o);
      refsNew.push(o2);
      for (const k in o) {
        if (Object.hasOwnProperty.call(o, k) === false)
          continue;
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) {
          o2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          o2[k] = handler(cur, clone);
        } else if (ArrayBuffer.isView(cur)) {
          o2[k] = copyBuffer(cur);
        } else {
          const i = refs.indexOf(cur);
          if (i !== -1) {
            o2[k] = refsNew[i];
          } else {
            o2[k] = clone(cur);
          }
        }
      }
      refs.pop();
      refsNew.pop();
      return o2;
    }
    function cloneProto(o) {
      if (typeof o !== "object" || o === null)
        return o;
      if (Array.isArray(o))
        return cloneArray(o, cloneProto);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
        return handler(o, cloneProto);
      }
      const o2 = {};
      refs.push(o);
      refsNew.push(o2);
      for (const k in o) {
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) {
          o2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          o2[k] = handler(cur, cloneProto);
        } else if (ArrayBuffer.isView(cur)) {
          o2[k] = copyBuffer(cur);
        } else {
          const i = refs.indexOf(cur);
          if (i !== -1) {
            o2[k] = refsNew[i];
          } else {
            o2[k] = cloneProto(cur);
          }
        }
      }
      refs.pop();
      refsNew.pop();
      return o2;
    }
  }
});

// node:util
var exports_util = {};
__export(exports_util, {
  default: () => so,
  TextEncoder: () => st,
  TextDecoder: () => ct
});
var pt, dr, lt, gt, dt, bt, p = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), At = (r, e) => {
  for (var t in e)
    dr(r, t, { get: e[t], enumerable: true });
}, gr = (r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of gt(e))
      !bt.call(r, o) && o !== t && dr(r, o, { get: () => e[o], enumerable: !(n = lt(e, o)) || n.enumerable });
  return r;
}, F = (r, e, t) => (gr(r, e, "default"), t && gr(t, e, "default")), mt = (r, e, t) => (t = r != null ? pt(dt(r)) : {}, gr(e || !r || !r.__esModule ? dr(t, "default", { value: r, enumerable: true }) : t, r)), br, N2, Zr, Kr, V, re, H, ce, Y, Ae, Se, Pe, Fr, Br, Ur, Rr, qe, rt, tt, nt, yt, E, st, ct, so;
var init_util = __esm(() => {
  pt = Object.create;
  dr = Object.defineProperty;
  lt = Object.getOwnPropertyDescriptor;
  gt = Object.getOwnPropertyNames;
  dt = Object.getPrototypeOf;
  bt = Object.prototype.hasOwnProperty;
  br = p((po, Vr) => {
    Vr.exports = function() {
      if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
        return false;
      if (typeof Symbol.iterator == "symbol")
        return true;
      var e = {}, t = Symbol("test"), n = Object(t);
      if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
        return false;
      var o = 42;
      e[t] = o;
      for (t in e)
        return false;
      if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
        return false;
      var i = Object.getOwnPropertySymbols(e);
      if (i.length !== 1 || i[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
        return false;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var a = Object.getOwnPropertyDescriptor(e, t);
        if (a.value !== o || a.enumerable !== true)
          return false;
      }
      return true;
    };
  });
  N2 = p((lo, Jr) => {
    var ht = br();
    Jr.exports = function() {
      return ht() && !!Symbol.toStringTag;
    };
  });
  Zr = p((go, Hr) => {
    var Lr = typeof Symbol < "u" && Symbol, St = br();
    Hr.exports = function() {
      return typeof Lr != "function" || typeof Symbol != "function" || typeof Lr("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : St();
    };
  });
  Kr = p((bo, Yr) => {
    var vt = "Function.prototype.bind called on incompatible ", Ar = Array.prototype.slice, Ot = Object.prototype.toString, jt = "[object Function]";
    Yr.exports = function(e) {
      var t = this;
      if (typeof t != "function" || Ot.call(t) !== jt)
        throw new TypeError(vt + t);
      for (var n = Ar.call(arguments, 1), o, i = function() {
        if (this instanceof o) {
          var g = t.apply(this, n.concat(Ar.call(arguments)));
          return Object(g) === g ? g : this;
        } else
          return t.apply(e, n.concat(Ar.call(arguments)));
      }, a = Math.max(0, t.length - n.length), f2 = [], c = 0;c < a; c++)
        f2.push("$" + c);
      if (o = Function("binder", "return function (" + f2.join(",") + "){ return binder.apply(this,arguments); }")(i), t.prototype) {
        var l = function() {};
        l.prototype = t.prototype, o.prototype = new l, l.prototype = null;
      }
      return o;
    };
  });
  V = p((Ao, Qr) => {
    var Pt = Kr();
    Qr.exports = Function.prototype.bind || Pt;
  });
  re = p((mo, Xr) => {
    var wt = V();
    Xr.exports = wt.call(Function.call, Object.prototype.hasOwnProperty);
  });
  H = p((ho, ie) => {
    var s, x = SyntaxError, oe = Function, U = TypeError, mr = function(r) {
      try {
        return oe('"use strict"; return (' + r + ").constructor;")();
      } catch {}
    }, v2 = Object.getOwnPropertyDescriptor;
    if (v2)
      try {
        v2({}, "");
      } catch {
        v2 = null;
      }
    var hr = function() {
      throw new U;
    }, Et = v2 ? function() {
      try {
        return arguments.callee, hr;
      } catch {
        try {
          return v2(arguments, "callee").get;
        } catch {
          return hr;
        }
      }
    }() : hr, I2 = Zr()(), m = Object.getPrototypeOf || function(r) {
      return r.__proto__;
    }, B = {}, Tt = typeof Uint8Array > "u" ? s : m(Uint8Array), O = { "%AggregateError%": typeof AggregateError > "u" ? s : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer > "u" ? s : ArrayBuffer, "%ArrayIteratorPrototype%": I2 ? m([][Symbol.iterator]()) : s, "%AsyncFromSyncIteratorPrototype%": s, "%AsyncFunction%": B, "%AsyncGenerator%": B, "%AsyncGeneratorFunction%": B, "%AsyncIteratorPrototype%": B, "%Atomics%": typeof Atomics > "u" ? s : Atomics, "%BigInt%": typeof BigInt > "u" ? s : BigInt, "%BigInt64Array%": typeof BigInt64Array > "u" ? s : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array > "u" ? s : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView > "u" ? s : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array > "u" ? s : Float32Array, "%Float64Array%": typeof Float64Array > "u" ? s : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? s : FinalizationRegistry, "%Function%": oe, "%GeneratorFunction%": B, "%Int8Array%": typeof Int8Array > "u" ? s : Int8Array, "%Int16Array%": typeof Int16Array > "u" ? s : Int16Array, "%Int32Array%": typeof Int32Array > "u" ? s : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": I2 ? m(m([][Symbol.iterator]())) : s, "%JSON%": typeof JSON == "object" ? JSON : s, "%Map%": typeof Map > "u" ? s : Map, "%MapIteratorPrototype%": typeof Map > "u" || !I2 ? s : m(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise > "u" ? s : Promise, "%Proxy%": typeof Proxy > "u" ? s : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect > "u" ? s : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set > "u" ? s : Set, "%SetIteratorPrototype%": typeof Set > "u" || !I2 ? s : m(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? s : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": I2 ? m(""[Symbol.iterator]()) : s, "%Symbol%": I2 ? Symbol : s, "%SyntaxError%": x, "%ThrowTypeError%": Et, "%TypedArray%": Tt, "%TypeError%": U, "%Uint8Array%": typeof Uint8Array > "u" ? s : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? s : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array > "u" ? s : Uint16Array, "%Uint32Array%": typeof Uint32Array > "u" ? s : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap > "u" ? s : WeakMap, "%WeakRef%": typeof WeakRef > "u" ? s : WeakRef, "%WeakSet%": typeof WeakSet > "u" ? s : WeakSet };
    try {
      null.error;
    } catch (r) {
      ee = m(m(r)), O["%Error.prototype%"] = ee;
    }
    var ee, Ft = function r(e) {
      var t;
      if (e === "%AsyncFunction%")
        t = mr("async function () {}");
      else if (e === "%GeneratorFunction%")
        t = mr("function* () {}");
      else if (e === "%AsyncGeneratorFunction%")
        t = mr("async function* () {}");
      else if (e === "%AsyncGenerator%") {
        var n = r("%AsyncGeneratorFunction%");
        n && (t = n.prototype);
      } else if (e === "%AsyncIteratorPrototype%") {
        var o = r("%AsyncGenerator%");
        o && (t = m(o.prototype));
      }
      return O[e] = t, t;
    }, te = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, C2 = V(), J = re(), It = C2.call(Function.call, Array.prototype.concat), Bt = C2.call(Function.apply, Array.prototype.splice), ne = C2.call(Function.call, String.prototype.replace), L = C2.call(Function.call, String.prototype.slice), Ut = C2.call(Function.call, RegExp.prototype.exec), xt = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Dt = /\\(\\)?/g, Rt = function(e) {
      var t = L(e, 0, 1), n = L(e, -1);
      if (t === "%" && n !== "%")
        throw new x("invalid intrinsic syntax, expected closing `%`");
      if (n === "%" && t !== "%")
        throw new x("invalid intrinsic syntax, expected opening `%`");
      var o = [];
      return ne(e, xt, function(i, a, f2, c) {
        o[o.length] = f2 ? ne(c, Dt, "$1") : a || i;
      }), o;
    }, kt = function(e, t) {
      var n = e, o;
      if (J(te, n) && (o = te[n], n = "%" + o[0] + "%"), J(O, n)) {
        var i = O[n];
        if (i === B && (i = Ft(n)), typeof i > "u" && !t)
          throw new U("intrinsic " + e + " exists, but is not available. Please file an issue!");
        return { alias: o, name: n, value: i };
      }
      throw new x("intrinsic " + e + " does not exist!");
    };
    ie.exports = function(e, t) {
      if (typeof e != "string" || e.length === 0)
        throw new U("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof t != "boolean")
        throw new U('"allowMissing" argument must be a boolean');
      if (Ut(/^%?[^%]*%?$/, e) === null)
        throw new x("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      var n = Rt(e), o = n.length > 0 ? n[0] : "", i = kt("%" + o + "%", t), a = i.name, f2 = i.value, c = false, l = i.alias;
      l && (o = l[0], Bt(n, It([0, 1], l)));
      for (var g = 1, S2 = true;g < n.length; g += 1) {
        var d2 = n[g], T2 = L(d2, 0, 1), _ = L(d2, -1);
        if ((T2 === '"' || T2 === "'" || T2 === "`" || _ === '"' || _ === "'" || _ === "`") && T2 !== _)
          throw new x("property names with quotes must have matching quotes");
        if ((d2 === "constructor" || !S2) && (c = true), o += "." + d2, a = "%" + o + "%", J(O, a))
          f2 = O[a];
        else if (f2 != null) {
          if (!(d2 in f2)) {
            if (!t)
              throw new U("base intrinsic for " + e + " exists, but the property is not available.");
            return;
          }
          if (v2 && g + 1 >= n.length) {
            var z2 = v2(f2, d2);
            S2 = !!z2, S2 && "get" in z2 && !("originalValue" in z2.get) ? f2 = z2.get : f2 = f2[d2];
          } else
            S2 = J(f2, d2), f2 = f2[d2];
          S2 && !c && (O[a] = f2);
        }
      }
      return f2;
    };
  });
  ce = p((So, Z) => {
    var Sr = V(), D = H(), ue = D("%Function.prototype.apply%"), ye = D("%Function.prototype.call%"), se = D("%Reflect.apply%", true) || Sr.call(ye, ue), ae = D("%Object.getOwnPropertyDescriptor%", true), j2 = D("%Object.defineProperty%", true), Mt = D("%Math.max%");
    if (j2)
      try {
        j2({}, "a", { value: 1 });
      } catch {
        j2 = null;
      }
    Z.exports = function(e) {
      var t = se(Sr, ye, arguments);
      if (ae && j2) {
        var n = ae(t, "length");
        n.configurable && j2(t, "length", { value: 1 + Mt(0, e.length - (arguments.length - 1)) });
      }
      return t;
    };
    var fe = function() {
      return se(Sr, ue, arguments);
    };
    j2 ? j2(Z.exports, "apply", { value: fe }) : Z.exports.apply = fe;
  });
  Y = p((vo, ge) => {
    var pe = H(), le = ce(), Nt = le(pe("String.prototype.indexOf"));
    ge.exports = function(e, t) {
      var n = pe(e, !!t);
      return typeof n == "function" && Nt(e, ".prototype.") > -1 ? le(n) : n;
    };
  });
  Ae = p((Oo, be) => {
    var Ct = N2()(), $t = Y(), vr = $t("Object.prototype.toString"), K = function(e) {
      return Ct && e && typeof e == "object" && Symbol.toStringTag in e ? false : vr(e) === "[object Arguments]";
    }, de = function(e) {
      return K(e) ? true : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && vr(e) !== "[object Array]" && vr(e.callee) === "[object Function]";
    }, qt = function() {
      return K(arguments);
    }();
    K.isLegacyArguments = de;
    be.exports = qt ? K : de;
  });
  Se = p((jo, he) => {
    var Gt = Object.prototype.toString, Wt = Function.prototype.toString, _t = /^\s*(?:function)?\*/, me = N2()(), Or = Object.getPrototypeOf, zt = function() {
      if (!me)
        return false;
      try {
        return Function("return function*() {}")();
      } catch {}
    }, jr;
    he.exports = function(e) {
      if (typeof e != "function")
        return false;
      if (_t.test(Wt.call(e)))
        return true;
      if (!me) {
        var t = Gt.call(e);
        return t === "[object GeneratorFunction]";
      }
      if (!Or)
        return false;
      if (typeof jr > "u") {
        var n = zt();
        jr = n ? Or(n) : false;
      }
      return Or(e) === jr;
    };
  });
  Pe = p((Po, je) => {
    var Oe = Function.prototype.toString, R = typeof Reflect == "object" && Reflect !== null && Reflect.apply, wr, Q2;
    if (typeof R == "function" && typeof Object.defineProperty == "function")
      try {
        wr = Object.defineProperty({}, "length", { get: function() {
          throw Q2;
        } }), Q2 = {}, R(function() {
          throw 42;
        }, null, wr);
      } catch (r) {
        r !== Q2 && (R = null);
      }
    else
      R = null;
    var Vt = /^\s*class\b/, Er = function(e) {
      try {
        var t = Oe.call(e);
        return Vt.test(t);
      } catch {
        return false;
      }
    }, Pr = function(e) {
      try {
        return Er(e) ? false : (Oe.call(e), true);
      } catch {
        return false;
      }
    }, X = Object.prototype.toString, Jt = "[object Object]", Lt = "[object Function]", Ht = "[object GeneratorFunction]", Zt = "[object HTMLAllCollection]", Yt = "[object HTML document.all class]", Kt = "[object HTMLCollection]", Qt = typeof Symbol == "function" && !!Symbol.toStringTag, Xt = !(0 in [,]), Tr = function() {
      return false;
    };
    typeof document == "object" && (ve = document.all, X.call(ve) === X.call(document.all) && (Tr = function(e) {
      if ((Xt || !e) && (typeof e > "u" || typeof e == "object"))
        try {
          var t = X.call(e);
          return (t === Zt || t === Yt || t === Kt || t === Jt) && e("") == null;
        } catch {}
      return false;
    }));
    var ve;
    je.exports = R ? function(e) {
      if (Tr(e))
        return true;
      if (!e || typeof e != "function" && typeof e != "object")
        return false;
      try {
        R(e, null, wr);
      } catch (t) {
        if (t !== Q2)
          return false;
      }
      return !Er(e) && Pr(e);
    } : function(e) {
      if (Tr(e))
        return true;
      if (!e || typeof e != "function" && typeof e != "object")
        return false;
      if (Qt)
        return Pr(e);
      if (Er(e))
        return false;
      var t = X.call(e);
      return t !== Lt && t !== Ht && !/^\[object HTML/.test(t) ? false : Pr(e);
    };
  });
  Fr = p((wo, Ee) => {
    var rn = Pe(), en = Object.prototype.toString, we = Object.prototype.hasOwnProperty, tn = function(e, t, n) {
      for (var o = 0, i = e.length;o < i; o++)
        we.call(e, o) && (n == null ? t(e[o], o, e) : t.call(n, e[o], o, e));
    }, nn = function(e, t, n) {
      for (var o = 0, i = e.length;o < i; o++)
        n == null ? t(e.charAt(o), o, e) : t.call(n, e.charAt(o), o, e);
    }, on = function(e, t, n) {
      for (var o in e)
        we.call(e, o) && (n == null ? t(e[o], o, e) : t.call(n, e[o], o, e));
    }, an = function(e, t, n) {
      if (!rn(t))
        throw new TypeError("iterator must be a function");
      var o;
      arguments.length >= 3 && (o = n), en.call(e) === "[object Array]" ? tn(e, t, o) : typeof e == "string" ? nn(e, t, o) : on(e, t, o);
    };
    Ee.exports = an;
  });
  Br = p((Eo, Te) => {
    var Ir = ["BigInt64Array", "BigUint64Array", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray"], fn = typeof globalThis > "u" ? global : globalThis;
    Te.exports = function() {
      for (var e = [], t = 0;t < Ir.length; t++)
        typeof fn[Ir[t]] == "function" && (e[e.length] = Ir[t]);
      return e;
    };
  });
  Ur = p((To, Fe) => {
    var un = H(), rr = un("%Object.getOwnPropertyDescriptor%", true);
    if (rr)
      try {
        rr([], "length");
      } catch {
        rr = null;
      }
    Fe.exports = rr;
  });
  Rr = p((Fo, De) => {
    var Ie = Fr(), yn = Br(), Dr = Y(), sn = Dr("Object.prototype.toString"), Be = N2()(), er = Ur(), cn = typeof globalThis > "u" ? global : globalThis, Ue = yn(), pn = Dr("Array.prototype.indexOf", true) || function(e, t) {
      for (var n = 0;n < e.length; n += 1)
        if (e[n] === t)
          return n;
      return -1;
    }, ln = Dr("String.prototype.slice"), xe = {}, xr = Object.getPrototypeOf;
    Be && er && xr && Ie(Ue, function(r) {
      var e = new cn[r];
      if (Symbol.toStringTag in e) {
        var t = xr(e), n = er(t, Symbol.toStringTag);
        if (!n) {
          var o = xr(t);
          n = er(o, Symbol.toStringTag);
        }
        xe[r] = n.get;
      }
    });
    var gn = function(e) {
      var t = false;
      return Ie(xe, function(n, o) {
        if (!t)
          try {
            t = n.call(e) === o;
          } catch {}
      }), t;
    };
    De.exports = function(e) {
      if (!e || typeof e != "object")
        return false;
      if (!Be || !(Symbol.toStringTag in e)) {
        var t = ln(sn(e), 8, -1);
        return pn(Ue, t) > -1;
      }
      return er ? gn(e) : false;
    };
  });
  qe = p((Io, $e) => {
    var ke = Fr(), dn = Br(), Me = Y(), kr = Ur(), bn = Me("Object.prototype.toString"), Ne = N2()(), Re = typeof globalThis > "u" ? global : globalThis, An = dn(), mn = Me("String.prototype.slice"), Ce = {}, Mr = Object.getPrototypeOf;
    Ne && kr && Mr && ke(An, function(r) {
      if (typeof Re[r] == "function") {
        var e = new Re[r];
        if (Symbol.toStringTag in e) {
          var t = Mr(e), n = kr(t, Symbol.toStringTag);
          if (!n) {
            var o = Mr(t);
            n = kr(o, Symbol.toStringTag);
          }
          Ce[r] = n.get;
        }
      }
    });
    var hn = function(e) {
      var t = false;
      return ke(Ce, function(n, o) {
        if (!t)
          try {
            var i = n.call(e);
            i === o && (t = i);
          } catch {}
      }), t;
    }, Sn = Rr();
    $e.exports = function(e) {
      return Sn(e) ? !Ne || !(Symbol.toStringTag in e) ? mn(bn(e), 8, -1) : hn(e) : false;
    };
  });
  rt = p((u) => {
    var vn = Ae(), On = Se(), A2 = qe(), Ge = Rr();
    function k(r) {
      return r.call.bind(r);
    }
    var We = typeof BigInt < "u", _e = typeof Symbol < "u", b = k(Object.prototype.toString), jn = k(Number.prototype.valueOf), Pn = k(String.prototype.valueOf), wn = k(Boolean.prototype.valueOf);
    We && (ze = k(BigInt.prototype.valueOf));
    var ze;
    _e && (Ve = k(Symbol.prototype.valueOf));
    var Ve;
    function q2(r, e) {
      if (typeof r != "object")
        return false;
      try {
        return e(r), true;
      } catch {
        return false;
      }
    }
    u.isArgumentsObject = vn;
    u.isGeneratorFunction = On;
    u.isTypedArray = Ge;
    function En(r) {
      return typeof Promise < "u" && r instanceof Promise || r !== null && typeof r == "object" && typeof r.then == "function" && typeof r.catch == "function";
    }
    u.isPromise = En;
    function Tn(r) {
      return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(r) : Ge(r) || Le(r);
    }
    u.isArrayBufferView = Tn;
    function Fn(r) {
      return A2(r) === "Uint8Array";
    }
    u.isUint8Array = Fn;
    function In(r) {
      return A2(r) === "Uint8ClampedArray";
    }
    u.isUint8ClampedArray = In;
    function Bn(r) {
      return A2(r) === "Uint16Array";
    }
    u.isUint16Array = Bn;
    function Un(r) {
      return A2(r) === "Uint32Array";
    }
    u.isUint32Array = Un;
    function xn(r) {
      return A2(r) === "Int8Array";
    }
    u.isInt8Array = xn;
    function Dn(r) {
      return A2(r) === "Int16Array";
    }
    u.isInt16Array = Dn;
    function Rn(r) {
      return A2(r) === "Int32Array";
    }
    u.isInt32Array = Rn;
    function kn(r) {
      return A2(r) === "Float32Array";
    }
    u.isFloat32Array = kn;
    function Mn(r) {
      return A2(r) === "Float64Array";
    }
    u.isFloat64Array = Mn;
    function Nn(r) {
      return A2(r) === "BigInt64Array";
    }
    u.isBigInt64Array = Nn;
    function Cn(r) {
      return A2(r) === "BigUint64Array";
    }
    u.isBigUint64Array = Cn;
    function tr(r) {
      return b(r) === "[object Map]";
    }
    tr.working = typeof Map < "u" && tr(new Map);
    function $n(r) {
      return typeof Map > "u" ? false : tr.working ? tr(r) : r instanceof Map;
    }
    u.isMap = $n;
    function nr(r) {
      return b(r) === "[object Set]";
    }
    nr.working = typeof Set < "u" && nr(new Set);
    function qn(r) {
      return typeof Set > "u" ? false : nr.working ? nr(r) : r instanceof Set;
    }
    u.isSet = qn;
    function or(r) {
      return b(r) === "[object WeakMap]";
    }
    or.working = typeof WeakMap < "u" && or(new WeakMap);
    function Gn(r) {
      return typeof WeakMap > "u" ? false : or.working ? or(r) : r instanceof WeakMap;
    }
    u.isWeakMap = Gn;
    function Cr(r) {
      return b(r) === "[object WeakSet]";
    }
    Cr.working = typeof WeakSet < "u" && Cr(new WeakSet);
    function Wn(r) {
      return Cr(r);
    }
    u.isWeakSet = Wn;
    function ir(r) {
      return b(r) === "[object ArrayBuffer]";
    }
    ir.working = typeof ArrayBuffer < "u" && ir(new ArrayBuffer);
    function Je(r) {
      return typeof ArrayBuffer > "u" ? false : ir.working ? ir(r) : r instanceof ArrayBuffer;
    }
    u.isArrayBuffer = Je;
    function ar(r) {
      return b(r) === "[object DataView]";
    }
    ar.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && ar(new DataView(new ArrayBuffer(1), 0, 1));
    function Le(r) {
      return typeof DataView > "u" ? false : ar.working ? ar(r) : r instanceof DataView;
    }
    u.isDataView = Le;
    var Nr = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : undefined;
    function $(r) {
      return b(r) === "[object SharedArrayBuffer]";
    }
    function He(r) {
      return typeof Nr > "u" ? false : (typeof $.working > "u" && ($.working = $(new Nr)), $.working ? $(r) : r instanceof Nr);
    }
    u.isSharedArrayBuffer = He;
    function _n(r) {
      return b(r) === "[object AsyncFunction]";
    }
    u.isAsyncFunction = _n;
    function zn(r) {
      return b(r) === "[object Map Iterator]";
    }
    u.isMapIterator = zn;
    function Vn(r) {
      return b(r) === "[object Set Iterator]";
    }
    u.isSetIterator = Vn;
    function Jn(r) {
      return b(r) === "[object Generator]";
    }
    u.isGeneratorObject = Jn;
    function Ln(r) {
      return b(r) === "[object WebAssembly.Module]";
    }
    u.isWebAssemblyCompiledModule = Ln;
    function Ze(r) {
      return q2(r, jn);
    }
    u.isNumberObject = Ze;
    function Ye(r) {
      return q2(r, Pn);
    }
    u.isStringObject = Ye;
    function Ke(r) {
      return q2(r, wn);
    }
    u.isBooleanObject = Ke;
    function Qe(r) {
      return We && q2(r, ze);
    }
    u.isBigIntObject = Qe;
    function Xe(r) {
      return _e && q2(r, Ve);
    }
    u.isSymbolObject = Xe;
    function Hn(r) {
      return Ze(r) || Ye(r) || Ke(r) || Qe(r) || Xe(r);
    }
    u.isBoxedPrimitive = Hn;
    function Zn(r) {
      return typeof Uint8Array < "u" && (Je(r) || He(r));
    }
    u.isAnyArrayBuffer = Zn;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(r) {
      Object.defineProperty(u, r, { enumerable: false, value: function() {
        throw new Error(r + " is not supported in userland");
      } });
    });
  });
  tt = p((Uo, et) => {
    et.exports = function(e) {
      return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
    };
  });
  nt = p((xo, $r) => {
    typeof Object.create == "function" ? $r.exports = function(e, t) {
      t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } }));
    } : $r.exports = function(e, t) {
      if (t) {
        e.super_ = t;
        var n = function() {};
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e;
      }
    };
  });
  yt = p((y2) => {
    var ot = Object.getOwnPropertyDescriptors || function(e) {
      for (var t = Object.keys(e), n = {}, o = 0;o < t.length; o++)
        n[t[o]] = Object.getOwnPropertyDescriptor(e, t[o]);
      return n;
    }, Yn = /%[sdj%]/g;
    y2.format = function(r) {
      if (!lr(r)) {
        for (var e = [], t = 0;t < arguments.length; t++)
          e.push(h2(arguments[t]));
        return e.join(" ");
      }
      for (var t = 1, n = arguments, o = n.length, i = String(r).replace(Yn, function(f2) {
        if (f2 === "%%")
          return "%";
        if (t >= o)
          return f2;
        switch (f2) {
          case "%s":
            return String(n[t++]);
          case "%d":
            return Number(n[t++]);
          case "%j":
            try {
              return JSON.stringify(n[t++]);
            } catch {
              return "[Circular]";
            }
          default:
            return f2;
        }
      }), a = n[t];t < o; a = n[++t])
        pr(a) || !M(a) ? i += " " + a : i += " " + h2(a);
      return i;
    };
    y2.deprecate = function(r, e) {
      if (typeof process < "u" && process.noDeprecation === true)
        return r;
      if (typeof process > "u")
        return function() {
          return y2.deprecate(r, e).apply(this, arguments);
        };
      var t = false;
      function n() {
        if (!t) {
          if (process.throwDeprecation)
            throw new Error(e);
          process.traceDeprecation ? console.trace(e) : console.error(e), t = true;
        }
        return r.apply(this, arguments);
      }
      return n;
    };
    var fr = {}, it = /^$/;
    process.env.NODE_DEBUG && (ur = process.env.NODE_DEBUG, ur = ur.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), it = new RegExp("^" + ur + "$", "i"));
    var ur;
    y2.debuglog = function(r) {
      if (r = r.toUpperCase(), !fr[r])
        if (it.test(r)) {
          var e = process.pid;
          fr[r] = function() {
            var t = y2.format.apply(y2, arguments);
            console.error("%s %d: %s", r, e, t);
          };
        } else
          fr[r] = function() {};
      return fr[r];
    };
    function h2(r, e) {
      var t = { seen: [], stylize: Qn };
      return arguments.length >= 3 && (t.depth = arguments[2]), arguments.length >= 4 && (t.colors = arguments[3]), _r(e) ? t.showHidden = e : e && y2._extend(t, e), w(t.showHidden) && (t.showHidden = false), w(t.depth) && (t.depth = 2), w(t.colors) && (t.colors = false), w(t.customInspect) && (t.customInspect = true), t.colors && (t.stylize = Kn), sr(t, r, t.depth);
    }
    y2.inspect = h2;
    h2.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] };
    h2.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" };
    function Kn(r, e) {
      var t = h2.styles[e];
      return t ? "\x1B[" + h2.colors[t][0] + "m" + r + "\x1B[" + h2.colors[t][1] + "m" : r;
    }
    function Qn(r, e) {
      return r;
    }
    function Xn(r) {
      var e = {};
      return r.forEach(function(t, n) {
        e[t] = true;
      }), e;
    }
    function sr(r, e, t) {
      if (r.customInspect && e && yr(e.inspect) && e.inspect !== y2.inspect && !(e.constructor && e.constructor.prototype === e)) {
        var n = e.inspect(t, r);
        return lr(n) || (n = sr(r, n, t)), n;
      }
      var o = ro(r, e);
      if (o)
        return o;
      var i = Object.keys(e), a = Xn(i);
      if (r.showHidden && (i = Object.getOwnPropertyNames(e)), W(e) && (i.indexOf("message") >= 0 || i.indexOf("description") >= 0))
        return qr(e);
      if (i.length === 0) {
        if (yr(e)) {
          var f2 = e.name ? ": " + e.name : "";
          return r.stylize("[Function" + f2 + "]", "special");
        }
        if (G(e))
          return r.stylize(RegExp.prototype.toString.call(e), "regexp");
        if (cr(e))
          return r.stylize(Date.prototype.toString.call(e), "date");
        if (W(e))
          return qr(e);
      }
      var c = "", l = false, g = ["{", "}"];
      if (at(e) && (l = true, g = ["[", "]"]), yr(e)) {
        var S2 = e.name ? ": " + e.name : "";
        c = " [Function" + S2 + "]";
      }
      if (G(e) && (c = " " + RegExp.prototype.toString.call(e)), cr(e) && (c = " " + Date.prototype.toUTCString.call(e)), W(e) && (c = " " + qr(e)), i.length === 0 && (!l || e.length == 0))
        return g[0] + c + g[1];
      if (t < 0)
        return G(e) ? r.stylize(RegExp.prototype.toString.call(e), "regexp") : r.stylize("[Object]", "special");
      r.seen.push(e);
      var d2;
      return l ? d2 = eo(r, e, t, a, i) : d2 = i.map(function(T2) {
        return Wr(r, e, t, a, T2, l);
      }), r.seen.pop(), to(d2, c, g);
    }
    function ro(r, e) {
      if (w(e))
        return r.stylize("undefined", "undefined");
      if (lr(e)) {
        var t = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return r.stylize(t, "string");
      }
      if (ft(e))
        return r.stylize("" + e, "number");
      if (_r(e))
        return r.stylize("" + e, "boolean");
      if (pr(e))
        return r.stylize("null", "null");
    }
    function qr(r) {
      return "[" + Error.prototype.toString.call(r) + "]";
    }
    function eo(r, e, t, n, o) {
      for (var i = [], a = 0, f2 = e.length;a < f2; ++a)
        ut(e, String(a)) ? i.push(Wr(r, e, t, n, String(a), true)) : i.push("");
      return o.forEach(function(c) {
        c.match(/^\d+$/) || i.push(Wr(r, e, t, n, c, true));
      }), i;
    }
    function Wr(r, e, t, n, o, i) {
      var a, f2, c;
      if (c = Object.getOwnPropertyDescriptor(e, o) || { value: e[o] }, c.get ? c.set ? f2 = r.stylize("[Getter/Setter]", "special") : f2 = r.stylize("[Getter]", "special") : c.set && (f2 = r.stylize("[Setter]", "special")), ut(n, o) || (a = "[" + o + "]"), f2 || (r.seen.indexOf(c.value) < 0 ? (pr(t) ? f2 = sr(r, c.value, null) : f2 = sr(r, c.value, t - 1), f2.indexOf(`
`) > -1 && (i ? f2 = f2.split(`
`).map(function(l) {
        return "  " + l;
      }).join(`
`).slice(2) : f2 = `
` + f2.split(`
`).map(function(l) {
        return "   " + l;
      }).join(`
`))) : f2 = r.stylize("[Circular]", "special")), w(a)) {
        if (i && o.match(/^\d+$/))
          return f2;
        a = JSON.stringify("" + o), a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.slice(1, -1), a = r.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = r.stylize(a, "string"));
      }
      return a + ": " + f2;
    }
    function to(r, e, t) {
      var n = 0, o = r.reduce(function(i, a) {
        return n++, a.indexOf(`
`) >= 0 && n++, i + a.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return o > 60 ? t[0] + (e === "" ? "" : e + `
 `) + " " + r.join(`,
  `) + " " + t[1] : t[0] + e + " " + r.join(", ") + " " + t[1];
    }
    y2.types = rt();
    function at(r) {
      return Array.isArray(r);
    }
    y2.isArray = at;
    function _r(r) {
      return typeof r == "boolean";
    }
    y2.isBoolean = _r;
    function pr(r) {
      return r === null;
    }
    y2.isNull = pr;
    function no(r) {
      return r == null;
    }
    y2.isNullOrUndefined = no;
    function ft(r) {
      return typeof r == "number";
    }
    y2.isNumber = ft;
    function lr(r) {
      return typeof r == "string";
    }
    y2.isString = lr;
    function oo(r) {
      return typeof r == "symbol";
    }
    y2.isSymbol = oo;
    function w(r) {
      return r === undefined;
    }
    y2.isUndefined = w;
    function G(r) {
      return M(r) && zr(r) === "[object RegExp]";
    }
    y2.isRegExp = G;
    y2.types.isRegExp = G;
    function M(r) {
      return typeof r == "object" && r !== null;
    }
    y2.isObject = M;
    function cr(r) {
      return M(r) && zr(r) === "[object Date]";
    }
    y2.isDate = cr;
    y2.types.isDate = cr;
    function W(r) {
      return M(r) && (zr(r) === "[object Error]" || r instanceof Error);
    }
    y2.isError = W;
    y2.types.isNativeError = W;
    function yr(r) {
      return typeof r == "function";
    }
    y2.isFunction = yr;
    function io(r) {
      return r === null || typeof r == "boolean" || typeof r == "number" || typeof r == "string" || typeof r == "symbol" || typeof r > "u";
    }
    y2.isPrimitive = io;
    y2.isBuffer = tt();
    function zr(r) {
      return Object.prototype.toString.call(r);
    }
    function Gr(r) {
      return r < 10 ? "0" + r.toString(10) : r.toString(10);
    }
    var ao = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function fo() {
      var r = new Date, e = [Gr(r.getHours()), Gr(r.getMinutes()), Gr(r.getSeconds())].join(":");
      return [r.getDate(), ao[r.getMonth()], e].join(" ");
    }
    y2.log = function() {
      console.log("%s - %s", fo(), y2.format.apply(y2, arguments));
    };
    y2.inherits = nt();
    y2._extend = function(r, e) {
      if (!e || !M(e))
        return r;
      for (var t = Object.keys(e), n = t.length;n--; )
        r[t[n]] = e[t[n]];
      return r;
    };
    function ut(r, e) {
      return Object.prototype.hasOwnProperty.call(r, e);
    }
    var P = typeof Symbol < "u" ? Symbol("util.promisify.custom") : undefined;
    y2.promisify = function(e) {
      if (typeof e != "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (P && e[P]) {
        var t = e[P];
        if (typeof t != "function")
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(t, P, { value: t, enumerable: false, writable: false, configurable: true }), t;
      }
      function t() {
        for (var n, o, i = new Promise(function(c, l) {
          n = c, o = l;
        }), a = [], f2 = 0;f2 < arguments.length; f2++)
          a.push(arguments[f2]);
        a.push(function(c, l) {
          c ? o(c) : n(l);
        });
        try {
          e.apply(this, a);
        } catch (c) {
          o(c);
        }
        return i;
      }
      return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), P && Object.defineProperty(t, P, { value: t, enumerable: false, writable: false, configurable: true }), Object.defineProperties(t, ot(e));
    };
    y2.promisify.custom = P;
    function uo(r, e) {
      if (!r) {
        var t = new Error("Promise was rejected with a falsy value");
        t.reason = r, r = t;
      }
      return e(r);
    }
    function yo(r) {
      if (typeof r != "function")
        throw new TypeError('The "original" argument must be of type Function');
      function e() {
        for (var t = [], n = 0;n < arguments.length; n++)
          t.push(arguments[n]);
        var o = t.pop();
        if (typeof o != "function")
          throw new TypeError("The last argument must be of type Function");
        var i = this, a = function() {
          return o.apply(i, arguments);
        };
        r.apply(this, t).then(function(f2) {
          process.nextTick(a.bind(null, null, f2));
        }, function(f2) {
          process.nextTick(uo.bind(null, f2, a));
        });
      }
      return Object.setPrototypeOf(e, Object.getPrototypeOf(r)), Object.defineProperties(e, ot(r)), e;
    }
    y2.callbackify = yo;
  });
  E = {};
  At(E, { TextDecoder: () => ct, TextEncoder: () => st, default: () => so });
  F(E, mt(yt()));
  st = globalThis.TextEncoder;
  ct = globalThis.TextDecoder;
  so = { TextEncoder: st, TextDecoder: ct };
});

// node_modules/log4js/lib/configuration.js
var require_configuration = __commonJS((exports, module) => {
  var util2 = (init_util(), __toCommonJS(exports_util));
  var debug = require_browser()("log4js:configuration");
  var preProcessingListeners = [];
  var listeners = [];
  var not = (thing) => !thing;
  var anObject = (thing) => thing && typeof thing === "object" && !Array.isArray(thing);
  var validIdentifier = (thing) => /^[A-Za-z][A-Za-z0-9_]*$/g.test(thing);
  var anInteger = (thing) => thing && typeof thing === "number" && Number.isInteger(thing);
  var addListener = (fn) => {
    listeners.push(fn);
    debug(`Added listener, now ${listeners.length} listeners`);
  };
  var addPreProcessingListener = (fn) => {
    preProcessingListeners.push(fn);
    debug(`Added pre-processing listener, now ${preProcessingListeners.length} listeners`);
  };
  var throwExceptionIf = (config, checks, message) => {
    const tests = Array.isArray(checks) ? checks : [checks];
    tests.forEach((test) => {
      if (test) {
        throw new Error(`Problem with log4js configuration: (${util2.inspect(config, {
          depth: 5
        })}) - ${message}`);
      }
    });
  };
  var configure = (candidate) => {
    debug("New configuration to be validated: ", candidate);
    throwExceptionIf(candidate, not(anObject(candidate)), "must be an object.");
    debug(`Calling pre-processing listeners (${preProcessingListeners.length})`);
    preProcessingListeners.forEach((listener) => listener(candidate));
    debug("Configuration pre-processing finished.");
    debug(`Calling configuration listeners (${listeners.length})`);
    listeners.forEach((listener) => listener(candidate));
    debug("Configuration finished.");
  };
  module.exports = {
    configure,
    addListener,
    addPreProcessingListener,
    throwExceptionIf,
    anObject,
    anInteger,
    validIdentifier,
    not
  };
});

// node_modules/date-format/lib/index.js
var require_lib = __commonJS((exports, module) => {
  function padWithZeros(vNumber, width) {
    var numAsString = vNumber.toString();
    while (numAsString.length < width) {
      numAsString = "0" + numAsString;
    }
    return numAsString;
  }
  function addZero(vNumber) {
    return padWithZeros(vNumber, 2);
  }
  function offset(timezoneOffset) {
    var os = Math.abs(timezoneOffset);
    var h2 = String(Math.floor(os / 60));
    var m = String(os % 60);
    h2 = ("0" + h2).slice(-2);
    m = ("0" + m).slice(-2);
    return timezoneOffset === 0 ? "Z" : (timezoneOffset < 0 ? "+" : "-") + h2 + ":" + m;
  }
  function asString(format, date2) {
    if (typeof format !== "string") {
      date2 = format;
      format = module.exports.ISO8601_FORMAT;
    }
    if (!date2) {
      date2 = module.exports.now();
    }
    var vDay = addZero(date2.getDate());
    var vMonth = addZero(date2.getMonth() + 1);
    var vYearLong = addZero(date2.getFullYear());
    var vYearShort = addZero(vYearLong.substring(2, 4));
    var vYear = format.indexOf("yyyy") > -1 ? vYearLong : vYearShort;
    var vHour = addZero(date2.getHours());
    var vMinute = addZero(date2.getMinutes());
    var vSecond = addZero(date2.getSeconds());
    var vMillisecond = padWithZeros(date2.getMilliseconds(), 3);
    var vTimeZone = offset(date2.getTimezoneOffset());
    var formatted = format.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear).replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond).replace(/SSS/g, vMillisecond).replace(/O/g, vTimeZone);
    return formatted;
  }
  function setDatePart(date2, part, value, local) {
    date2["set" + (local ? "" : "UTC") + part](value);
  }
  function extractDateParts(pattern, str, missingValuesDate) {
    var local = pattern.indexOf("O") < 0;
    var monthOverflow = false;
    var matchers = [
      {
        pattern: /y{1,4}/,
        regexp: "\\d{1,4}",
        fn: function(date3, value) {
          setDatePart(date3, "FullYear", value, local);
        }
      },
      {
        pattern: /MM/,
        regexp: "\\d{1,2}",
        fn: function(date3, value) {
          setDatePart(date3, "Month", value - 1, local);
          if (date3.getMonth() !== value - 1) {
            monthOverflow = true;
          }
        }
      },
      {
        pattern: /dd/,
        regexp: "\\d{1,2}",
        fn: function(date3, value) {
          if (monthOverflow) {
            setDatePart(date3, "Month", date3.getMonth() - 1, local);
          }
          setDatePart(date3, "Date", value, local);
        }
      },
      {
        pattern: /hh/,
        regexp: "\\d{1,2}",
        fn: function(date3, value) {
          setDatePart(date3, "Hours", value, local);
        }
      },
      {
        pattern: /mm/,
        regexp: "\\d\\d",
        fn: function(date3, value) {
          setDatePart(date3, "Minutes", value, local);
        }
      },
      {
        pattern: /ss/,
        regexp: "\\d\\d",
        fn: function(date3, value) {
          setDatePart(date3, "Seconds", value, local);
        }
      },
      {
        pattern: /SSS/,
        regexp: "\\d\\d\\d",
        fn: function(date3, value) {
          setDatePart(date3, "Milliseconds", value, local);
        }
      },
      {
        pattern: /O/,
        regexp: "[+-]\\d{1,2}:?\\d{2}?|Z",
        fn: function(date3, value) {
          if (value === "Z") {
            value = 0;
          } else {
            value = value.replace(":", "");
          }
          var offset2 = Math.abs(value);
          var timezoneOffset = (value > 0 ? -1 : 1) * (offset2 % 100 + Math.floor(offset2 / 100) * 60);
          date3.setUTCMinutes(date3.getUTCMinutes() + timezoneOffset);
        }
      }
    ];
    var parsedPattern = matchers.reduce(function(p2, m) {
      if (m.pattern.test(p2.regexp)) {
        m.index = p2.regexp.match(m.pattern).index;
        p2.regexp = p2.regexp.replace(m.pattern, "(" + m.regexp + ")");
      } else {
        m.index = -1;
      }
      return p2;
    }, { regexp: pattern, index: [] });
    var dateFns = matchers.filter(function(m) {
      return m.index > -1;
    });
    dateFns.sort(function(a, b) {
      return a.index - b.index;
    });
    var matcher = new RegExp(parsedPattern.regexp);
    var matches = matcher.exec(str);
    if (matches) {
      var date2 = missingValuesDate || module.exports.now();
      dateFns.forEach(function(f2, i) {
        f2.fn(date2, matches[i + 1]);
      });
      return date2;
    }
    throw new Error("String '" + str + "' could not be parsed as '" + pattern + "'");
  }
  function parse(pattern, str, missingValuesDate) {
    if (!pattern) {
      throw new Error("pattern must be supplied");
    }
    return extractDateParts(pattern, str, missingValuesDate);
  }
  function now() {
    return new Date;
  }
  module.exports = asString;
  module.exports.asString = asString;
  module.exports.parse = parse;
  module.exports.now = now;
  module.exports.ISO8601_FORMAT = "yyyy-MM-ddThh:mm:ss.SSS";
  module.exports.ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ss.SSSO";
  module.exports.DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS";
  module.exports.ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS";
});

// node:os
var exports_os = {};
__export(exports_os, {
  uptime: () => A2,
  type: () => V2,
  totalmem: () => N3,
  tmpdir: () => U,
  release: () => x,
  platform: () => O,
  networkInterfaces: () => j2,
  loadavg: () => y2,
  hostname: () => k,
  homedir: () => _,
  getNetworkInterfaces: () => B,
  freemem: () => I2,
  endianness: () => L,
  default: () => E2,
  cpus: () => b,
  arch: () => M,
  EOL: () => X
});
var c, a, m, s, p2, d2, l = (r, n) => () => (n || r((n = { exports: {} }).exports, n), n.exports), h2 = (r, n, t, i) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let o of s(n))
      !d2.call(r, o) && o !== t && a(r, o, { get: () => n[o], enumerable: !(i = m(n, o)) || i.enumerable });
  return r;
}, g = (r, n, t) => (t = r != null ? c(p2(r)) : {}, h2(n || !r || !r.__esModule ? a(t, "default", { value: r, enumerable: true }) : t, r)), f2, u, E2, L, k, y2, A2, I2, N3, b, V2, x, M, O, U, X, _, j2, B;
var init_os = __esm(() => {
  c = Object.create;
  a = Object.defineProperty;
  m = Object.getOwnPropertyDescriptor;
  s = Object.getOwnPropertyNames;
  p2 = Object.getPrototypeOf;
  d2 = Object.prototype.hasOwnProperty;
  f2 = l((e) => {
    e.endianness = function() {
      return "LE";
    };
    e.hostname = function() {
      return typeof location < "u" ? location.hostname : "";
    };
    e.loadavg = function() {
      return [];
    };
    e.uptime = function() {
      return 0;
    };
    e.freemem = function() {
      return Number.MAX_VALUE;
    };
    e.totalmem = function() {
      return Number.MAX_VALUE;
    };
    e.cpus = function() {
      return [];
    };
    e.type = function() {
      return "Browser";
    };
    e.release = function() {
      return typeof navigator < "u" ? navigator.appVersion : "";
    };
    e.networkInterfaces = e.getNetworkInterfaces = function() {
      return {};
    };
    e.arch = function() {
      return "javascript";
    };
    e.platform = function() {
      return "browser";
    };
    e.tmpdir = e.tmpDir = function() {
      return "/tmp";
    };
    e.EOL = `
`;
    e.homedir = function() {
      return "/";
    };
  });
  u = g(f2());
  E2 = u.default;
  ({ endianness: L, hostname: k, loadavg: y2, uptime: A2, freemem: I2, totalmem: N3, cpus: b, type: V2, release: x, arch: M, platform: O, tmpdir: U, EOL: X, homedir: _, networkInterfaces: j2, getNetworkInterfaces: B } = u.default);
});

// node:path
var exports_path = {};
__export(exports_path, {
  win32: () => y3,
  toNamespacedPath: () => U2,
  sep: () => I3,
  resolve: () => B2,
  relative: () => Q2,
  posix: () => g2,
  parse: () => $,
  normalize: () => G,
  join: () => K,
  isAbsolute: () => H2,
  format: () => Z,
  extname: () => Y2,
  dirname: () => V3,
  delimiter: () => O2,
  default: () => q2,
  basename: () => X2
});
var L2, h3, D, T2, _2, E3, R = (s2, e) => () => (e || s2((e = { exports: {} }).exports, e), e.exports), N4 = (s2, e, r, t) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let i of T2(e))
      !E3.call(s2, i) && i !== r && h3(s2, i, { get: () => e[i], enumerable: !(t = D(e, i)) || t.enumerable });
  return s2;
}, j3 = (s2, e, r) => (r = s2 != null ? L2(_2(s2)) : {}, N4(e || !s2 || !s2.__esModule ? h3(r, "default", { value: s2, enumerable: true }) : r, s2)), k2, x2, u2, J, P = function(s2) {
  return s2;
}, S2 = function() {
  throw new Error("Not implemented");
}, g2, y3, q2, B2, G, H2, K, Q2, U2, V3, X2, Y2, Z, $, I3, O2;
var init_path = __esm(() => {
  L2 = Object.create;
  h3 = Object.defineProperty;
  D = Object.getOwnPropertyDescriptor;
  T2 = Object.getOwnPropertyNames;
  _2 = Object.getPrototypeOf;
  E3 = Object.prototype.hasOwnProperty;
  k2 = R((W, w) => {
    function v2(s2) {
      if (typeof s2 != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(s2));
    }
    function C2(s2, e) {
      for (var r = "", t = 0, i = -1, a2 = 0, n, l2 = 0;l2 <= s2.length; ++l2) {
        if (l2 < s2.length)
          n = s2.charCodeAt(l2);
        else {
          if (n === 47)
            break;
          n = 47;
        }
        if (n === 47) {
          if (!(i === l2 - 1 || a2 === 1))
            if (i !== l2 - 1 && a2 === 2) {
              if (r.length < 2 || t !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
                if (r.length > 2) {
                  var f3 = r.lastIndexOf("/");
                  if (f3 !== r.length - 1) {
                    f3 === -1 ? (r = "", t = 0) : (r = r.slice(0, f3), t = r.length - 1 - r.lastIndexOf("/")), i = l2, a2 = 0;
                    continue;
                  }
                } else if (r.length === 2 || r.length === 1) {
                  r = "", t = 0, i = l2, a2 = 0;
                  continue;
                }
              }
              e && (r.length > 0 ? r += "/.." : r = "..", t = 2);
            } else
              r.length > 0 ? r += "/" + s2.slice(i + 1, l2) : r = s2.slice(i + 1, l2), t = l2 - i - 1;
          i = l2, a2 = 0;
        } else
          n === 46 && a2 !== -1 ? ++a2 : a2 = -1;
      }
      return r;
    }
    function F2(s2, e) {
      var r = e.dir || e.root, t = e.base || (e.name || "") + (e.ext || "");
      return r ? r === e.root ? r + t : r + s2 + t : t;
    }
    var m2 = { resolve: function() {
      for (var e = "", r = false, t, i = arguments.length - 1;i >= -1 && !r; i--) {
        var a2;
        i >= 0 ? a2 = arguments[i] : (t === undefined && (t = process.cwd()), a2 = t), v2(a2), a2.length !== 0 && (e = a2 + "/" + e, r = a2.charCodeAt(0) === 47);
      }
      return e = C2(e, !r), r ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
    }, normalize: function(e) {
      if (v2(e), e.length === 0)
        return ".";
      var r = e.charCodeAt(0) === 47, t = e.charCodeAt(e.length - 1) === 47;
      return e = C2(e, !r), e.length === 0 && !r && (e = "."), e.length > 0 && t && (e += "/"), r ? "/" + e : e;
    }, isAbsolute: function(e) {
      return v2(e), e.length > 0 && e.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0)
        return ".";
      for (var e, r = 0;r < arguments.length; ++r) {
        var t = arguments[r];
        v2(t), t.length > 0 && (e === undefined ? e = t : e += "/" + t);
      }
      return e === undefined ? "." : m2.normalize(e);
    }, relative: function(e, r) {
      if (v2(e), v2(r), e === r || (e = m2.resolve(e), r = m2.resolve(r), e === r))
        return "";
      for (var t = 1;t < e.length && e.charCodeAt(t) === 47; ++t)
        ;
      for (var i = e.length, a2 = i - t, n = 1;n < r.length && r.charCodeAt(n) === 47; ++n)
        ;
      for (var l2 = r.length, f3 = l2 - n, c2 = a2 < f3 ? a2 : f3, d3 = -1, o = 0;o <= c2; ++o) {
        if (o === c2) {
          if (f3 > c2) {
            if (r.charCodeAt(n + o) === 47)
              return r.slice(n + o + 1);
            if (o === 0)
              return r.slice(n + o);
          } else
            a2 > c2 && (e.charCodeAt(t + o) === 47 ? d3 = o : o === 0 && (d3 = 0));
          break;
        }
        var A3 = e.charCodeAt(t + o), z2 = r.charCodeAt(n + o);
        if (A3 !== z2)
          break;
        A3 === 47 && (d3 = o);
      }
      var b2 = "";
      for (o = t + d3 + 1;o <= i; ++o)
        (o === i || e.charCodeAt(o) === 47) && (b2.length === 0 ? b2 += ".." : b2 += "/..");
      return b2.length > 0 ? b2 + r.slice(n + d3) : (n += d3, r.charCodeAt(n) === 47 && ++n, r.slice(n));
    }, _makeLong: function(e) {
      return e;
    }, dirname: function(e) {
      if (v2(e), e.length === 0)
        return ".";
      for (var r = e.charCodeAt(0), t = r === 47, i = -1, a2 = true, n = e.length - 1;n >= 1; --n)
        if (r = e.charCodeAt(n), r === 47) {
          if (!a2) {
            i = n;
            break;
          }
        } else
          a2 = false;
      return i === -1 ? t ? "/" : "." : t && i === 1 ? "//" : e.slice(0, i);
    }, basename: function(e, r) {
      if (r !== undefined && typeof r != "string")
        throw new TypeError('"ext" argument must be a string');
      v2(e);
      var t = 0, i = -1, a2 = true, n;
      if (r !== undefined && r.length > 0 && r.length <= e.length) {
        if (r.length === e.length && r === e)
          return "";
        var l2 = r.length - 1, f3 = -1;
        for (n = e.length - 1;n >= 0; --n) {
          var c2 = e.charCodeAt(n);
          if (c2 === 47) {
            if (!a2) {
              t = n + 1;
              break;
            }
          } else
            f3 === -1 && (a2 = false, f3 = n + 1), l2 >= 0 && (c2 === r.charCodeAt(l2) ? --l2 === -1 && (i = n) : (l2 = -1, i = f3));
        }
        return t === i ? i = f3 : i === -1 && (i = e.length), e.slice(t, i);
      } else {
        for (n = e.length - 1;n >= 0; --n)
          if (e.charCodeAt(n) === 47) {
            if (!a2) {
              t = n + 1;
              break;
            }
          } else
            i === -1 && (a2 = false, i = n + 1);
        return i === -1 ? "" : e.slice(t, i);
      }
    }, extname: function(e) {
      v2(e);
      for (var r = -1, t = 0, i = -1, a2 = true, n = 0, l2 = e.length - 1;l2 >= 0; --l2) {
        var f3 = e.charCodeAt(l2);
        if (f3 === 47) {
          if (!a2) {
            t = l2 + 1;
            break;
          }
          continue;
        }
        i === -1 && (a2 = false, i = l2 + 1), f3 === 46 ? r === -1 ? r = l2 : n !== 1 && (n = 1) : r !== -1 && (n = -1);
      }
      return r === -1 || i === -1 || n === 0 || n === 1 && r === i - 1 && r === t + 1 ? "" : e.slice(r, i);
    }, format: function(e) {
      if (e === null || typeof e != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
      return F2("/", e);
    }, parse: function(e) {
      v2(e);
      var r = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0)
        return r;
      var t = e.charCodeAt(0), i = t === 47, a2;
      i ? (r.root = "/", a2 = 1) : a2 = 0;
      for (var n = -1, l2 = 0, f3 = -1, c2 = true, d3 = e.length - 1, o = 0;d3 >= a2; --d3) {
        if (t = e.charCodeAt(d3), t === 47) {
          if (!c2) {
            l2 = d3 + 1;
            break;
          }
          continue;
        }
        f3 === -1 && (c2 = false, f3 = d3 + 1), t === 46 ? n === -1 ? n = d3 : o !== 1 && (o = 1) : n !== -1 && (o = -1);
      }
      return n === -1 || f3 === -1 || o === 0 || o === 1 && n === f3 - 1 && n === l2 + 1 ? f3 !== -1 && (l2 === 0 && i ? r.base = r.name = e.slice(1, f3) : r.base = r.name = e.slice(l2, f3)) : (l2 === 0 && i ? (r.name = e.slice(1, n), r.base = e.slice(1, f3)) : (r.name = e.slice(l2, n), r.base = e.slice(l2, f3)), r.ext = e.slice(n, f3)), l2 > 0 ? r.dir = e.slice(0, l2 - 1) : i && (r.dir = "/"), r;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    m2.posix = m2;
    w.exports = m2;
  });
  x2 = j3(k2());
  u2 = x2;
  J = x2;
  u2.parse ??= S2;
  J.parse ??= S2;
  g2 = { resolve: u2.resolve.bind(u2), normalize: u2.normalize.bind(u2), isAbsolute: u2.isAbsolute.bind(u2), join: u2.join.bind(u2), relative: u2.relative.bind(u2), toNamespacedPath: P, dirname: u2.dirname.bind(u2), basename: u2.basename.bind(u2), extname: u2.extname.bind(u2), format: u2.format.bind(u2), parse: u2.parse.bind(u2), sep: "/", delimiter: ":", win32: undefined, posix: undefined, _makeLong: P };
  y3 = { sep: "\\", delimiter: ";", win32: undefined, ...g2, posix: g2 };
  g2.win32 = y3.win32 = y3;
  g2.posix = g2;
  q2 = g2;
  ({ resolve: B2, normalize: G, isAbsolute: H2, join: K, relative: Q2, toNamespacedPath: U2, dirname: V3, basename: X2, extname: Y2, format: Z, parse: $, sep: I3, delimiter: O2 } = g2);
});

// node:url
var exports_url = {};
__export(exports_url, {
  resolveObject: () => at,
  resolve: () => rt2,
  parse: () => I4,
  format: () => et,
  default: () => ot,
  Url: () => m2,
  URLSearchParams: () => X3,
  URL: () => J2
});
function F2(s2) {
  return typeof s2 == "string";
}
function K2(s2) {
  return typeof s2 == "object" && s2 !== null;
}
function w(s2) {
  return s2 === null;
}
function Y3(s2) {
  return s2 == null;
}
function m2() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
function I4(s2, r, t) {
  if (s2 && K2(s2) && s2 instanceof m2)
    return s2;
  var a2 = new m2;
  return a2.parse(s2, r, t), a2;
}
function et(s2) {
  return F2(s2) && (s2 = I4(s2)), s2 instanceof m2 ? s2.format() : m2.prototype.format.call(s2);
}
function rt2(s2, r) {
  return I4(s2, false, true).resolve(r);
}
function at(s2, r) {
  return s2 ? I4(s2, false, true).resolveObject(r) : r;
}
var J2, X3, S3, k3, H3, Q3, E4, N5, M2, D2, tt2 = 255, G2, st2, ht, Z2, j4, B3, ot;
var init_url = __esm(() => {
  ({ URL: J2, URLSearchParams: X3 } = globalThis);
  S3 = /^([a-z0-9.+-]+:)/i;
  k3 = /:[0-9]*$/;
  H3 = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
  Q3 = ["<", ">", '"', "`", " ", "\r", `
`, "\t"];
  E4 = ["{", "}", "|", "\\", "^", "`"].concat(Q3);
  N5 = ["'"].concat(E4);
  M2 = ["%", "/", "?", ";", "#"].concat(N5);
  D2 = ["/", "?", "#"];
  G2 = /^[+a-z0-9A-Z_-]{0,63}$/;
  st2 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
  ht = { javascript: true, "javascript:": true };
  Z2 = { javascript: true, "javascript:": true };
  j4 = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true };
  B3 = { parse(s2) {
    var r = decodeURIComponent;
    return (s2 + "").replace(/\+/g, " ").split("&").filter(Boolean).reduce(function(t, a2, o) {
      var l2 = a2.split("="), f3 = r(l2[0] || ""), h4 = r(l2[1] || ""), g3 = t[f3];
      return t[f3] = g3 === undefined ? h4 : [].concat(g3, h4), t;
    }, {});
  }, stringify(s2) {
    var r = encodeURIComponent;
    return Object.keys(s2 || {}).reduce(function(t, a2) {
      return [].concat(s2[a2]).forEach(function(o) {
        t.push(r(a2) + "=" + r(o));
      }), t;
    }, []).join("&").replace(/\s/g, "+");
  } };
  m2.prototype.parse = function(s2, r, t) {
    if (!F2(s2))
      throw new TypeError("Parameter 'url' must be a string, not " + typeof s2);
    var a2 = s2.indexOf("?"), o = a2 !== -1 && a2 < s2.indexOf("#") ? "?" : "#", l2 = s2.split(o), f3 = /\\/g;
    l2[0] = l2[0].replace(f3, "/"), s2 = l2.join(o);
    var h4 = s2;
    if (h4 = h4.trim(), !t && s2.split("#").length === 1) {
      var g3 = H3.exec(h4);
      if (g3)
        return this.path = h4, this.href = h4, this.pathname = g3[1], g3[2] ? (this.search = g3[2], r ? this.query = B3.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : r && (this.search = "", this.query = {}), this;
    }
    var c2 = S3.exec(h4);
    if (c2) {
      c2 = c2[0];
      var v2 = c2.toLowerCase();
      this.protocol = v2, h4 = h4.substr(c2.length);
    }
    if (t || c2 || h4.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var U3 = h4.substr(0, 2) === "//";
      U3 && !(c2 && Z2[c2]) && (h4 = h4.substr(2), this.slashes = true);
    }
    if (!Z2[c2] && (U3 || c2 && !j4[c2])) {
      for (var u3 = -1, n = 0;n < D2.length; n++) {
        var b2 = h4.indexOf(D2[n]);
        b2 !== -1 && (u3 === -1 || b2 < u3) && (u3 = b2);
      }
      var R2, p3;
      u3 === -1 ? p3 = h4.lastIndexOf("@") : p3 = h4.lastIndexOf("@", u3), p3 !== -1 && (R2 = h4.slice(0, p3), h4 = h4.slice(p3 + 1), this.auth = decodeURIComponent(R2)), u3 = -1;
      for (var n = 0;n < M2.length; n++) {
        var b2 = h4.indexOf(M2[n]);
        b2 !== -1 && (u3 === -1 || b2 < u3) && (u3 = b2);
      }
      u3 === -1 && (u3 = h4.length), this.host = h4.slice(0, u3), h4 = h4.slice(u3), this.parseHost(), this.hostname = this.hostname || "";
      var C2 = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!C2)
        for (var e = this.hostname.split(/\./), n = 0, i = e.length;n < i; n++) {
          var O3 = e[n];
          if (!!O3 && !O3.match(G2)) {
            for (var y4 = "", d3 = 0, L3 = O3.length;d3 < L3; d3++)
              O3.charCodeAt(d3) > 127 ? y4 += "x" : y4 += O3[d3];
            if (!y4.match(G2)) {
              var x3 = e.slice(0, n), q3 = e.slice(n + 1), A3 = O3.match(st2);
              A3 && (x3.push(A3[1]), q3.unshift(A3[2])), q3.length && (h4 = "/" + q3.join(".") + h4), this.hostname = x3.join(".");
              break;
            }
          }
        }
      this.hostname.length > tt2 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), C2 || (this.hostname = new J2(`https://${this.hostname}`).hostname);
      var $2 = this.port ? ":" + this.port : "", V4 = this.hostname || "";
      this.host = V4 + $2, this.href += this.host, C2 && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), h4[0] !== "/" && (h4 = "/" + h4));
    }
    if (!ht[v2])
      for (var n = 0, i = N5.length;n < i; n++) {
        var P2 = N5[n];
        if (h4.indexOf(P2) !== -1) {
          var z2 = encodeURIComponent(P2);
          z2 === P2 && (z2 = escape(P2)), h4 = h4.split(P2).join(z2);
        }
      }
    var T3 = h4.indexOf("#");
    T3 !== -1 && (this.hash = h4.substr(T3), h4 = h4.slice(0, T3));
    var _3 = h4.indexOf("?");
    if (_3 !== -1 ? (this.search = h4.substr(_3), this.query = h4.substr(_3 + 1), r && (this.query = B3.parse(this.query)), h4 = h4.slice(0, _3)) : r && (this.search = "", this.query = {}), h4 && (this.pathname = h4), j4[v2] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      var $2 = this.pathname || "", W = this.search || "";
      this.path = $2 + W;
    }
    return this.href = this.format(), this;
  };
  m2.prototype.format = function() {
    var s2 = this.auth || "";
    s2 && (s2 = encodeURIComponent(s2), s2 = s2.replace(/%3A/i, ":"), s2 += "@");
    var r = this.protocol || "", t = this.pathname || "", a2 = this.hash || "", o = false, l2 = "";
    this.host ? o = s2 + this.host : this.hostname && (o = s2 + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && K2(this.query) && Object.keys(this.query).length && (l2 = B3.stringify(this.query));
    var f3 = this.search || l2 && "?" + l2 || "";
    return r && r.substr(-1) !== ":" && (r += ":"), this.slashes || (!r || j4[r]) && o !== false ? (o = "//" + (o || ""), t && t.charAt(0) !== "/" && (t = "/" + t)) : o || (o = ""), a2 && a2.charAt(0) !== "#" && (a2 = "#" + a2), f3 && f3.charAt(0) !== "?" && (f3 = "?" + f3), t = t.replace(/[?#]/g, function(h4) {
      return encodeURIComponent(h4);
    }), f3 = f3.replace("#", "%23"), r + o + t + f3 + a2;
  };
  m2.prototype.resolve = function(s2) {
    return this.resolveObject(I4(s2, false, true)).format();
  };
  m2.prototype.resolveObject = function(s2) {
    if (F2(s2)) {
      var r = new m2;
      r.parse(s2, false, true), s2 = r;
    }
    for (var t = new m2, a2 = Object.keys(this), o = 0;o < a2.length; o++) {
      var l2 = a2[o];
      t[l2] = this[l2];
    }
    if (t.hash = s2.hash, s2.href === "")
      return t.href = t.format(), t;
    if (s2.slashes && !s2.protocol) {
      for (var f3 = Object.keys(s2), h4 = 0;h4 < f3.length; h4++) {
        var g3 = f3[h4];
        g3 !== "protocol" && (t[g3] = s2[g3]);
      }
      return j4[t.protocol] && t.hostname && !t.pathname && (t.path = t.pathname = "/"), t.href = t.format(), t;
    }
    if (s2.protocol && s2.protocol !== t.protocol) {
      if (!j4[s2.protocol]) {
        for (var c2 = Object.keys(s2), v2 = 0;v2 < c2.length; v2++) {
          var U3 = c2[v2];
          t[U3] = s2[U3];
        }
        return t.href = t.format(), t;
      }
      if (t.protocol = s2.protocol, !s2.host && !Z2[s2.protocol]) {
        for (var i = (s2.pathname || "").split("/");i.length && !(s2.host = i.shift()); )
          ;
        s2.host || (s2.host = ""), s2.hostname || (s2.hostname = ""), i[0] !== "" && i.unshift(""), i.length < 2 && i.unshift(""), t.pathname = i.join("/");
      } else
        t.pathname = s2.pathname;
      if (t.search = s2.search, t.query = s2.query, t.host = s2.host || "", t.auth = s2.auth, t.hostname = s2.hostname || s2.host, t.port = s2.port, t.pathname || t.search) {
        var u3 = t.pathname || "", n = t.search || "";
        t.path = u3 + n;
      }
      return t.slashes = t.slashes || s2.slashes, t.href = t.format(), t;
    }
    var b2 = t.pathname && t.pathname.charAt(0) === "/", R2 = s2.host || s2.pathname && s2.pathname.charAt(0) === "/", p3 = R2 || b2 || t.host && s2.pathname, C2 = p3, e = t.pathname && t.pathname.split("/") || [], i = s2.pathname && s2.pathname.split("/") || [], O3 = t.protocol && !j4[t.protocol];
    if (O3 && (t.hostname = "", t.port = null, t.host && (e[0] === "" ? e[0] = t.host : e.unshift(t.host)), t.host = "", s2.protocol && (s2.hostname = null, s2.port = null, s2.host && (i[0] === "" ? i[0] = s2.host : i.unshift(s2.host)), s2.host = null), p3 = p3 && (i[0] === "" || e[0] === "")), R2)
      t.host = s2.host || s2.host === "" ? s2.host : t.host, t.hostname = s2.hostname || s2.hostname === "" ? s2.hostname : t.hostname, t.search = s2.search, t.query = s2.query, e = i;
    else if (i.length)
      e || (e = []), e.pop(), e = e.concat(i), t.search = s2.search, t.query = s2.query;
    else if (!Y3(s2.search)) {
      if (O3) {
        t.hostname = t.host = e.shift();
        var y4 = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : false;
        y4 && (t.auth = y4.shift(), t.host = t.hostname = y4.shift());
      }
      return t.search = s2.search, t.query = s2.query, (!w(t.pathname) || !w(t.search)) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.href = t.format(), t;
    }
    if (!e.length)
      return t.pathname = null, t.search ? t.path = "/" + t.search : t.path = null, t.href = t.format(), t;
    for (var d3 = e.slice(-1)[0], L3 = (t.host || s2.host || e.length > 1) && (d3 === "." || d3 === "..") || d3 === "", x3 = 0, q3 = e.length;q3 >= 0; q3--)
      d3 = e[q3], d3 === "." ? e.splice(q3, 1) : d3 === ".." ? (e.splice(q3, 1), x3++) : x3 && (e.splice(q3, 1), x3--);
    if (!p3 && !C2)
      for (;x3--; x3)
        e.unshift("..");
    p3 && e[0] !== "" && (!e[0] || e[0].charAt(0) !== "/") && e.unshift(""), L3 && e.join("/").substr(-1) !== "/" && e.push("");
    var A3 = e[0] === "" || e[0] && e[0].charAt(0) === "/";
    if (O3) {
      t.hostname = t.host = A3 ? "" : e.length ? e.shift() : "";
      var y4 = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : false;
      y4 && (t.auth = y4.shift(), t.host = t.hostname = y4.shift());
    }
    return p3 = p3 || t.host && e.length, p3 && !A3 && e.unshift(""), e.length ? t.pathname = e.join("/") : (t.pathname = null, t.path = null), (!w(t.pathname) || !w(t.search)) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.auth = s2.auth || t.auth, t.slashes = t.slashes || s2.slashes, t.href = t.format(), t;
  };
  m2.prototype.parseHost = function() {
    var s2 = this.host, r = k3.exec(s2);
    r && (r = r[0], r !== ":" && (this.port = r.substr(1)), s2 = s2.substr(0, s2.length - r.length)), s2 && (this.hostname = s2);
  };
  ot = { parse: I4, resolve: rt2, resolveObject: at, format: et, Url: m2, URL: J2, URLSearchParams: X3 };
});

// node_modules/log4js/lib/layouts.js
var require_layouts = __commonJS((exports, module) => {
  var dateFormat = require_lib();
  var os = (init_os(), __toCommonJS(exports_os));
  var util2 = (init_util(), __toCommonJS(exports_util));
  var path = (init_path(), __toCommonJS(exports_path));
  var url = (init_url(), __toCommonJS(exports_url));
  var debug = require_browser()("log4js:layouts");
  var styles = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [90, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [91, 39],
    yellow: [33, 39]
  };
  function colorizeStart(style) {
    return style ? `\x1B[${styles[style][0]}m` : "";
  }
  function colorizeEnd(style) {
    return style ? `\x1B[${styles[style][1]}m` : "";
  }
  function colorize(str, style) {
    return colorizeStart(style) + str + colorizeEnd(style);
  }
  function timestampLevelAndCategory(loggingEvent, colour) {
    return colorize(util2.format("[%s] [%s] %s - ", dateFormat.asString(loggingEvent.startTime), loggingEvent.level.toString(), loggingEvent.categoryName), colour);
  }
  function basicLayout(loggingEvent) {
    return timestampLevelAndCategory(loggingEvent) + util2.format(...loggingEvent.data);
  }
  function colouredLayout(loggingEvent) {
    return timestampLevelAndCategory(loggingEvent, loggingEvent.level.colour) + util2.format(...loggingEvent.data);
  }
  function messagePassThroughLayout(loggingEvent) {
    return util2.format(...loggingEvent.data);
  }
  function dummyLayout(loggingEvent) {
    return loggingEvent.data[0];
  }
  function patternLayout(pattern, tokens) {
    const TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";
    const regex = /%(-?[0-9]+)?(\.?-?[0-9]+)?([[\]cdhmnprzxXyflosCMAF%])(\{([^}]+)\})?|([^%]+)/;
    pattern = pattern || TTCC_CONVERSION_PATTERN;
    function categoryName(loggingEvent, specifier) {
      let loggerName = loggingEvent.categoryName;
      if (specifier) {
        const precision = parseInt(specifier, 10);
        const loggerNameBits = loggerName.split(".");
        if (precision < loggerNameBits.length) {
          loggerName = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
        }
      }
      return loggerName;
    }
    function formatAsDate(loggingEvent, specifier) {
      let format = dateFormat.ISO8601_FORMAT;
      if (specifier) {
        format = specifier;
        switch (format) {
          case "ISO8601":
          case "ISO8601_FORMAT":
            format = dateFormat.ISO8601_FORMAT;
            break;
          case "ISO8601_WITH_TZ_OFFSET":
          case "ISO8601_WITH_TZ_OFFSET_FORMAT":
            format = dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT;
            break;
          case "ABSOLUTE":
            process.emitWarning("Pattern %d{ABSOLUTE} is deprecated in favor of %d{ABSOLUTETIME}. " + "Please use %d{ABSOLUTETIME} instead.", "DeprecationWarning", "log4js-node-DEP0003");
            debug("[log4js-node-DEP0003]", "DEPRECATION: Pattern %d{ABSOLUTE} is deprecated and replaced by %d{ABSOLUTETIME}.");
          case "ABSOLUTETIME":
          case "ABSOLUTETIME_FORMAT":
            format = dateFormat.ABSOLUTETIME_FORMAT;
            break;
          case "DATE":
            process.emitWarning("Pattern %d{DATE} is deprecated due to the confusion it causes when used. " + "Please use %d{DATETIME} instead.", "DeprecationWarning", "log4js-node-DEP0004");
            debug("[log4js-node-DEP0004]", "DEPRECATION: Pattern %d{DATE} is deprecated and replaced by %d{DATETIME}.");
          case "DATETIME":
          case "DATETIME_FORMAT":
            format = dateFormat.DATETIME_FORMAT;
            break;
        }
      }
      return dateFormat.asString(format, loggingEvent.startTime);
    }
    function hostname() {
      return os.hostname().toString();
    }
    function formatMessage(loggingEvent, specifier) {
      let dataSlice = loggingEvent.data;
      if (specifier) {
        const [lowerBound, upperBound] = specifier.split(",");
        dataSlice = dataSlice.slice(lowerBound, upperBound);
      }
      return util2.format(...dataSlice);
    }
    function endOfLine() {
      return os.EOL;
    }
    function logLevel(loggingEvent) {
      return loggingEvent.level.toString();
    }
    function startTime(loggingEvent) {
      return dateFormat.asString("hh:mm:ss", loggingEvent.startTime);
    }
    function startColour(loggingEvent) {
      return colorizeStart(loggingEvent.level.colour);
    }
    function endColour(loggingEvent) {
      return colorizeEnd(loggingEvent.level.colour);
    }
    function percent() {
      return "%";
    }
    function pid(loggingEvent) {
      return loggingEvent && loggingEvent.pid ? loggingEvent.pid.toString() : process.pid.toString();
    }
    function clusterInfo() {
      return pid();
    }
    function userDefined(loggingEvent, specifier) {
      if (typeof tokens[specifier] !== "undefined") {
        return typeof tokens[specifier] === "function" ? tokens[specifier](loggingEvent) : tokens[specifier];
      }
      return null;
    }
    function contextDefined(loggingEvent, specifier) {
      const resolver = loggingEvent.context[specifier];
      if (typeof resolver !== "undefined") {
        return typeof resolver === "function" ? resolver(loggingEvent) : resolver;
      }
      return null;
    }
    function fileName(loggingEvent, specifier) {
      let filename = loggingEvent.fileName || "";
      const convertFileURLToPath = function(filepath) {
        const urlPrefix = "file://";
        if (filepath.startsWith(urlPrefix)) {
          if (typeof url.fileURLToPath === "function") {
            filepath = url.fileURLToPath(filepath);
          } else {
            filepath = path.normalize(filepath.replace(new RegExp(`^${urlPrefix}`), ""));
            if (process.platform === "win32") {
              if (filepath.startsWith("\\")) {
                filepath = filepath.slice(1);
              } else {
                filepath = path.sep + path.sep + filepath;
              }
            }
          }
        }
        return filepath;
      };
      filename = convertFileURLToPath(filename);
      if (specifier) {
        const fileDepth = parseInt(specifier, 10);
        const fileList = filename.split(path.sep);
        if (fileList.length > fileDepth) {
          filename = fileList.slice(-fileDepth).join(path.sep);
        }
      }
      return filename;
    }
    function lineNumber(loggingEvent) {
      return loggingEvent.lineNumber ? `${loggingEvent.lineNumber}` : "";
    }
    function columnNumber(loggingEvent) {
      return loggingEvent.columnNumber ? `${loggingEvent.columnNumber}` : "";
    }
    function callStack(loggingEvent) {
      return loggingEvent.callStack || "";
    }
    function className(loggingEvent) {
      return loggingEvent.className || "";
    }
    function functionName(loggingEvent) {
      return loggingEvent.functionName || "";
    }
    function functionAlias(loggingEvent) {
      return loggingEvent.functionAlias || "";
    }
    function callerName(loggingEvent) {
      return loggingEvent.callerName || "";
    }
    const replacers = {
      c: categoryName,
      d: formatAsDate,
      h: hostname,
      m: formatMessage,
      n: endOfLine,
      p: logLevel,
      r: startTime,
      "[": startColour,
      "]": endColour,
      y: clusterInfo,
      z: pid,
      "%": percent,
      x: userDefined,
      X: contextDefined,
      f: fileName,
      l: lineNumber,
      o: columnNumber,
      s: callStack,
      C: className,
      M: functionName,
      A: functionAlias,
      F: callerName
    };
    function replaceToken(conversionCharacter, loggingEvent, specifier) {
      return replacers[conversionCharacter](loggingEvent, specifier);
    }
    function truncate(truncation, toTruncate) {
      let len;
      if (truncation) {
        len = parseInt(truncation.slice(1), 10);
        return len > 0 ? toTruncate.slice(0, len) : toTruncate.slice(len);
      }
      return toTruncate;
    }
    function pad(padding, toPad) {
      let len;
      if (padding) {
        if (padding.charAt(0) === "-") {
          len = parseInt(padding.slice(1), 10);
          while (toPad.length < len) {
            toPad += " ";
          }
        } else {
          len = parseInt(padding, 10);
          while (toPad.length < len) {
            toPad = ` ${toPad}`;
          }
        }
      }
      return toPad;
    }
    function truncateAndPad(toTruncAndPad, truncation, padding) {
      let replacement = toTruncAndPad;
      replacement = truncate(truncation, replacement);
      replacement = pad(padding, replacement);
      return replacement;
    }
    return function(loggingEvent) {
      let formattedString = "";
      let result;
      let searchString = pattern;
      while ((result = regex.exec(searchString)) !== null) {
        const padding = result[1];
        const truncation = result[2];
        const conversionCharacter = result[3];
        const specifier = result[5];
        const text = result[6];
        if (text) {
          formattedString += text.toString();
        } else {
          const replacement = replaceToken(conversionCharacter, loggingEvent, specifier);
          formattedString += truncateAndPad(replacement, truncation, padding);
        }
        searchString = searchString.slice(result.index + result[0].length);
      }
      return formattedString;
    };
  }
  var layoutMakers = {
    messagePassThrough() {
      return messagePassThroughLayout;
    },
    basic() {
      return basicLayout;
    },
    colored() {
      return colouredLayout;
    },
    coloured() {
      return colouredLayout;
    },
    pattern(config) {
      return patternLayout(config && config.pattern, config && config.tokens);
    },
    dummy() {
      return dummyLayout;
    }
  };
  module.exports = {
    basicLayout,
    messagePassThroughLayout,
    patternLayout,
    colouredLayout,
    coloredLayout: colouredLayout,
    dummyLayout,
    addLayout(name, serializerGenerator) {
      layoutMakers[name] = serializerGenerator;
    },
    layout(name, config) {
      return layoutMakers[name] && layoutMakers[name](config);
    }
  };
});

// node_modules/log4js/lib/levels.js
var require_levels = __commonJS((exports, module) => {
  var configuration = require_configuration();
  var validColours = [
    "white",
    "grey",
    "black",
    "blue",
    "cyan",
    "green",
    "magenta",
    "red",
    "yellow"
  ];

  class Level {
    constructor(level, levelStr, colour) {
      this.level = level;
      this.levelStr = levelStr;
      this.colour = colour;
    }
    toString() {
      return this.levelStr;
    }
    static getLevel(sArg, defaultLevel) {
      if (!sArg) {
        return defaultLevel;
      }
      if (sArg instanceof Level) {
        return sArg;
      }
      if (sArg instanceof Object && sArg.levelStr) {
        sArg = sArg.levelStr;
      }
      return Level[sArg.toString().toUpperCase()] || defaultLevel;
    }
    static addLevels(customLevels) {
      if (customLevels) {
        const levels = Object.keys(customLevels);
        levels.forEach((l2) => {
          const levelStr = l2.toUpperCase();
          Level[levelStr] = new Level(customLevels[l2].value, levelStr, customLevels[l2].colour);
          const existingLevelIndex = Level.levels.findIndex((lvl) => lvl.levelStr === levelStr);
          if (existingLevelIndex > -1) {
            Level.levels[existingLevelIndex] = Level[levelStr];
          } else {
            Level.levels.push(Level[levelStr]);
          }
        });
        Level.levels.sort((a2, b2) => a2.level - b2.level);
      }
    }
    isLessThanOrEqualTo(otherLevel) {
      if (typeof otherLevel === "string") {
        otherLevel = Level.getLevel(otherLevel);
      }
      return this.level <= otherLevel.level;
    }
    isGreaterThanOrEqualTo(otherLevel) {
      if (typeof otherLevel === "string") {
        otherLevel = Level.getLevel(otherLevel);
      }
      return this.level >= otherLevel.level;
    }
    isEqualTo(otherLevel) {
      if (typeof otherLevel === "string") {
        otherLevel = Level.getLevel(otherLevel);
      }
      return this.level === otherLevel.level;
    }
  }
  Level.levels = [];
  Level.addLevels({
    ALL: { value: Number.MIN_VALUE, colour: "grey" },
    TRACE: { value: 5000, colour: "blue" },
    DEBUG: { value: 1e4, colour: "cyan" },
    INFO: { value: 20000, colour: "green" },
    WARN: { value: 30000, colour: "yellow" },
    ERROR: { value: 40000, colour: "red" },
    FATAL: { value: 50000, colour: "magenta" },
    MARK: { value: 9007199254740992, colour: "grey" },
    OFF: { value: Number.MAX_VALUE, colour: "grey" }
  });
  configuration.addListener((config) => {
    const levelConfig = config.levels;
    if (levelConfig) {
      configuration.throwExceptionIf(config, configuration.not(configuration.anObject(levelConfig)), "levels must be an object");
      const newLevels = Object.keys(levelConfig);
      newLevels.forEach((l2) => {
        configuration.throwExceptionIf(config, configuration.not(configuration.validIdentifier(l2)), `level name "${l2}" is not a valid identifier (must start with a letter, only contain A-Z,a-z,0-9,_)`);
        configuration.throwExceptionIf(config, configuration.not(configuration.anObject(levelConfig[l2])), `level "${l2}" must be an object`);
        configuration.throwExceptionIf(config, configuration.not(levelConfig[l2].value), `level "${l2}" must have a 'value' property`);
        configuration.throwExceptionIf(config, configuration.not(configuration.anInteger(levelConfig[l2].value)), `level "${l2}".value must have an integer value`);
        configuration.throwExceptionIf(config, configuration.not(levelConfig[l2].colour), `level "${l2}" must have a 'colour' property`);
        configuration.throwExceptionIf(config, configuration.not(validColours.indexOf(levelConfig[l2].colour) > -1), `level "${l2}".colour must be one of ${validColours.join(", ")}`);
      });
    }
  });
  configuration.addListener((config) => {
    Level.addLevels(config.levels);
  });
  module.exports = Level;
});

// node_modules/log4js/lib/clusteringBrowser.js
var require_clusteringBrowser = __commonJS((exports, module) => {
  var isMaster = () => true;
  var listeners = [];
  var sendToListeners = (logEvent) => {
    listeners.forEach((l2) => l2(logEvent));
  };
  module.exports = {
    onlyOnMaster: (fn, notMaster) => isMaster() ? fn() : notMaster,
    isMaster,
    send: sendToListeners,
    onMessage: (listener) => {
      listeners.push(listener);
    }
  };
});

// node_modules/log4js/lib/appenders/adapters.js
var require_adapters = __commonJS((exports, module) => {
  function maxFileSizeUnitTransform(maxLogSize) {
    if (typeof maxLogSize === "number" && Number.isInteger(maxLogSize)) {
      return maxLogSize;
    }
    const units = {
      K: 1024,
      M: 1024 * 1024,
      G: 1024 * 1024 * 1024
    };
    const validUnit = Object.keys(units);
    const unit = maxLogSize.slice(-1).toLocaleUpperCase();
    const value = maxLogSize.slice(0, -1).trim();
    if (validUnit.indexOf(unit) < 0 || !Number.isInteger(Number(value))) {
      throw Error(`maxLogSize: "${maxLogSize}" is invalid`);
    } else {
      return value * units[unit];
    }
  }
  function adapter(configAdapter, config) {
    const newConfig = Object.assign({}, config);
    Object.keys(configAdapter).forEach((key) => {
      if (newConfig[key]) {
        newConfig[key] = configAdapter[key](config[key]);
      }
    });
    return newConfig;
  }
  function fileAppenderAdapter(config) {
    const configAdapter = {
      maxLogSize: maxFileSizeUnitTransform
    };
    return adapter(configAdapter, config);
  }
  var adapters = {
    dateFile: fileAppenderAdapter,
    file: fileAppenderAdapter,
    fileSync: fileAppenderAdapter
  };
  exports.modifyConfig = (config) => adapters[config.type] ? adapters[config.type](config) : config;
});

// node_modules/log4js/lib/appenders/console.js
var require_console = __commonJS((exports, module) => {
  var consoleLog = console.log.bind(console);
  function consoleAppender(layout, timezoneOffset) {
    return (loggingEvent) => {
      consoleLog(layout(loggingEvent, timezoneOffset));
    };
  }
  function configure(config, layouts) {
    let layout = layouts.colouredLayout;
    if (config.layout) {
      layout = layouts.layout(config.layout.type, config.layout);
    }
    return consoleAppender(layout, config.timezoneOffset);
  }
  exports.configure = configure;
});

// node_modules/log4js/lib/appenders/stdout.js
var require_stdout = __commonJS((exports) => {
  function stdoutAppender(layout, timezoneOffset) {
    return (loggingEvent) => {
      process.stdout.write(`${layout(loggingEvent, timezoneOffset)}
`);
    };
  }
  function configure(config, layouts) {
    let layout = layouts.colouredLayout;
    if (config.layout) {
      layout = layouts.layout(config.layout.type, config.layout);
    }
    return stdoutAppender(layout, config.timezoneOffset);
  }
  exports.configure = configure;
});

// node_modules/log4js/lib/appenders/stderr.js
var require_stderr = __commonJS((exports, module) => {
  function stderrAppender(layout, timezoneOffset) {
    return (loggingEvent) => {
      process.stderr.write(`${layout(loggingEvent, timezoneOffset)}
`);
    };
  }
  function configure(config, layouts) {
    let layout = layouts.colouredLayout;
    if (config.layout) {
      layout = layouts.layout(config.layout.type, config.layout);
    }
    return stderrAppender(layout, config.timezoneOffset);
  }
  exports.configure = configure;
});

// node_modules/log4js/lib/appenders/logLevelFilter.js
var require_logLevelFilter = __commonJS((exports, module) => {
  function logLevelFilter(minLevelString, maxLevelString, appender, levels) {
    const minLevel = levels.getLevel(minLevelString);
    const maxLevel = levels.getLevel(maxLevelString, levels.FATAL);
    return (logEvent) => {
      const eventLevel = logEvent.level;
      if (minLevel.isLessThanOrEqualTo(eventLevel) && maxLevel.isGreaterThanOrEqualTo(eventLevel)) {
        appender(logEvent);
      }
    };
  }
  function configure(config, layouts, findAppender, levels) {
    const appender = findAppender(config.appender);
    return logLevelFilter(config.level, config.maxLevel, appender, levels);
  }
  exports.configure = configure;
});

// node_modules/log4js/lib/appenders/categoryFilter.js
var require_categoryFilter = __commonJS((exports, module) => {
  var debug = require_browser()("log4js:categoryFilter");
  function categoryFilter(excludes, appender) {
    if (typeof excludes === "string")
      excludes = [excludes];
    return (logEvent) => {
      debug(`Checking ${logEvent.categoryName} against ${excludes}`);
      if (excludes.indexOf(logEvent.categoryName) === -1) {
        debug("Not excluded, sending to appender");
        appender(logEvent);
      }
    };
  }
  function configure(config, layouts, findAppender) {
    const appender = findAppender(config.appender);
    return categoryFilter(config.exclude, appender);
  }
  exports.configure = configure;
});

// node_modules/log4js/lib/appenders/noLogFilter.js
var require_noLogFilter = __commonJS((exports, module) => {
  var debug = require_browser()("log4js:noLogFilter");
  function removeNullOrEmptyRegexp(regexp) {
    const filtered = regexp.filter((el) => el != null && el !== "");
    return filtered;
  }
  function noLogFilter(filters, appender) {
    return (logEvent) => {
      debug(`Checking data: ${logEvent.data} against filters: ${filters}`);
      if (typeof filters === "string") {
        filters = [filters];
      }
      filters = removeNullOrEmptyRegexp(filters);
      const regex = new RegExp(filters.join("|"), "i");
      if (filters.length === 0 || logEvent.data.findIndex((value) => regex.test(value)) < 0) {
        debug("Not excluded, sending to appender");
        appender(logEvent);
      }
    };
  }
  function configure(config, layouts, findAppender) {
    const appender = findAppender(config.appender);
    return noLogFilter(config.exclude, appender);
  }
  exports.configure = configure;
});

// node_modules/log4js/lib/appenders/ignoreBrowser.js
var require_ignoreBrowser = __commonJS((exports, module) => {
  module.exports = {};
});

// node:net
var exports_net = {};
__export(exports_net, {
  isIPv6: () => o,
  isIPv4: () => r,
  isIP: () => c2,
  default: () => i
});
function r(e) {
  return s2.test(e);
}
function o(e) {
  return u3.test(e);
}
function c2(e) {
  return r(e) ? 4 : o(e) ? 6 : 0;
}
var n = "(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])", t, s2, $2 = "(?:[0-9a-fA-F]{1,4})", u3, i;
var init_net = __esm(() => {
  t = `(?:${n}\\.){3}${n}`;
  s2 = new RegExp(`^${t}$`);
  u3 = new RegExp(`^(?:(?:${$2}:){7}(?:${$2}|:)|(?:${$2}:){6}(?:${t}|:${$2}|:)|(?:${$2}:){5}(?::${t}|(?::${$2}){1,2}|:)|(?:${$2}:){4}(?:(?::${$2}){0,1}:${t}|(?::${$2}){1,3}|:)|(?:${$2}:){3}(?:(?::${$2}){0,2}:${t}|(?::${$2}){1,4}|:)|(?:${$2}:){2}(?:(?::${$2}){0,3}:${t}|(?::${$2}){1,5}|:)|(?:${$2}:){1}(?:(?::${$2}){0,4}:${t}|(?::${$2}){1,6}|:)|(?::(?:(?::${$2}){0,5}:${t}|(?::${$2}){1,7}|:)))(?:%[0-9a-zA-Z-.:]{1,})?$`);
  i = { isIP: c2, isIPv4: r, isIPv6: o };
});

// node_modules/log4js/lib/appenders/tcp.js
var require_tcp = __commonJS((exports, module) => {
  var debug = require_browser()("log4js:tcp");
  var net = (init_net(), __toCommonJS(exports_net));
  function appender(config, layout) {
    let canWrite = false;
    const buffer = [];
    let socket;
    let shutdownAttempts = 3;
    let endMsg = "__LOG4JS__";
    function write(loggingEvent) {
      debug("Writing log event to socket");
      canWrite = socket.write(`${layout(loggingEvent)}${endMsg}`, "utf8");
    }
    function emptyBuffer() {
      let evt;
      debug("emptying buffer");
      while (evt = buffer.shift()) {
        write(evt);
      }
    }
    function createSocket() {
      debug(`appender creating socket to ${config.host || "localhost"}:${config.port || 5000}`);
      endMsg = `${config.endMsg || "__LOG4JS__"}`;
      socket = net.createConnection(config.port || 5000, config.host || "localhost");
      socket.on("connect", () => {
        debug("socket connected");
        emptyBuffer();
        canWrite = true;
      });
      socket.on("drain", () => {
        debug("drain event received, emptying buffer");
        canWrite = true;
        emptyBuffer();
      });
      socket.on("timeout", socket.end.bind(socket));
      socket.on("error", (e) => {
        debug("connection error", e);
        canWrite = false;
        emptyBuffer();
      });
      socket.on("close", createSocket);
    }
    createSocket();
    function log(loggingEvent) {
      if (canWrite) {
        write(loggingEvent);
      } else {
        debug("buffering log event because it cannot write at the moment");
        buffer.push(loggingEvent);
      }
    }
    log.shutdown = function(cb) {
      debug("shutdown called");
      if (buffer.length && shutdownAttempts) {
        debug("buffer has items, waiting 100ms to empty");
        shutdownAttempts -= 1;
        setTimeout(() => {
          log.shutdown(cb);
        }, 100);
      } else {
        socket.removeAllListeners("close");
        socket.end(cb);
      }
    };
    return log;
  }
  function configure(config, layouts) {
    debug(`configure with config = ${config}`);
    let layout = function(loggingEvent) {
      return loggingEvent.serialise();
    };
    if (config.layout) {
      layout = layouts.layout(config.layout.type, config.layout);
    }
    return appender(config, layout);
  }
  exports.configure = configure;
});

// node_modules/log4js/lib/appenders/index.js
var require_appenders = __commonJS((exports, module) => {
  var path = (init_path(), __toCommonJS(exports_path));
  var debug = require_browser()("log4js:appenders");
  var configuration = require_configuration();
  var clustering = require_clusteringBrowser();
  var levels = require_levels();
  var layouts = require_layouts();
  var adapters = require_adapters();
  var coreAppenders = new Map;
  coreAppenders.set("console", require_console());
  coreAppenders.set("stdout", require_stdout());
  coreAppenders.set("stderr", require_stderr());
  coreAppenders.set("logLevelFilter", require_logLevelFilter());
  coreAppenders.set("categoryFilter", require_categoryFilter());
  coreAppenders.set("noLogFilter", require_noLogFilter());
  coreAppenders.set("file", require_ignoreBrowser());
  coreAppenders.set("dateFile", require_ignoreBrowser());
  coreAppenders.set("fileSync", require_ignoreBrowser());
  coreAppenders.set("tcp", require_tcp());
  var appenders = new Map;
  var tryLoading = (modulePath, config) => {
    let resolvedPath;
    try {
      const modulePathCJS = `${modulePath}.cjs`;
      resolvedPath = __require.resolve(modulePathCJS);
      debug("Loading module from ", modulePathCJS);
    } catch (e) {
      resolvedPath = modulePath;
      debug("Loading module from ", modulePath);
    }
    try {
      return __require(resolvedPath);
    } catch (e) {
      configuration.throwExceptionIf(config, e.code !== "MODULE_NOT_FOUND", `appender "${modulePath}" could not be loaded (error was: ${e})`);
      return;
    }
  };
  var loadAppenderModule = (type, config) => coreAppenders.get(type) || tryLoading(`./${type}`, config) || tryLoading(type, config) || __require.main && __require.main.filename && tryLoading(path.join(path.dirname(__require.main.filename), type), config) || tryLoading(path.join(process.cwd(), type), config);
  var appendersLoading = new Set;
  var getAppender = (name, config) => {
    if (appenders.has(name))
      return appenders.get(name);
    if (!config.appenders[name])
      return false;
    if (appendersLoading.has(name))
      throw new Error(`Dependency loop detected for appender ${name}.`);
    appendersLoading.add(name);
    debug(`Creating appender ${name}`);
    const appender = createAppender(name, config);
    appendersLoading.delete(name);
    appenders.set(name, appender);
    return appender;
  };
  var createAppender = (name, config) => {
    const appenderConfig = config.appenders[name];
    const appenderModule = appenderConfig.type.configure ? appenderConfig.type : loadAppenderModule(appenderConfig.type, config);
    configuration.throwExceptionIf(config, configuration.not(appenderModule), `appender "${name}" is not valid (type "${appenderConfig.type}" could not be found)`);
    if (appenderModule.appender) {
      process.emitWarning(`Appender ${appenderConfig.type} exports an appender function.`, "DeprecationWarning", "log4js-node-DEP0001");
      debug("[log4js-node-DEP0001]", `DEPRECATION: Appender ${appenderConfig.type} exports an appender function.`);
    }
    if (appenderModule.shutdown) {
      process.emitWarning(`Appender ${appenderConfig.type} exports a shutdown function.`, "DeprecationWarning", "log4js-node-DEP0002");
      debug("[log4js-node-DEP0002]", `DEPRECATION: Appender ${appenderConfig.type} exports a shutdown function.`);
    }
    debug(`${name}: clustering.isMaster ? ${clustering.isMaster()}`);
    debug(`${name}: appenderModule is ${(init_util(), __toCommonJS(exports_util)).inspect(appenderModule)}`);
    return clustering.onlyOnMaster(() => {
      debug(`calling appenderModule.configure for ${name} / ${appenderConfig.type}`);
      return appenderModule.configure(adapters.modifyConfig(appenderConfig), layouts, (appender) => getAppender(appender, config), levels);
    }, () => {});
  };
  var setup = (config) => {
    appenders.clear();
    appendersLoading.clear();
    if (!config) {
      return;
    }
    const usedAppenders = [];
    Object.values(config.categories).forEach((category) => {
      usedAppenders.push(...category.appenders);
    });
    Object.keys(config.appenders).forEach((name) => {
      if (usedAppenders.includes(name) || config.appenders[name].type === "tcp-server" || config.appenders[name].type === "multiprocess") {
        getAppender(name, config);
      }
    });
  };
  var init = () => {
    setup();
  };
  init();
  configuration.addListener((config) => {
    configuration.throwExceptionIf(config, configuration.not(configuration.anObject(config.appenders)), 'must have a property "appenders" of type object.');
    const appenderNames = Object.keys(config.appenders);
    configuration.throwExceptionIf(config, configuration.not(appenderNames.length), "must define at least one appender.");
    appenderNames.forEach((name) => {
      configuration.throwExceptionIf(config, configuration.not(config.appenders[name].type), `appender "${name}" is not valid (must be an object with property "type")`);
    });
  });
  configuration.addListener(setup);
  module.exports = appenders;
  module.exports.init = init;
});

// node_modules/log4js/lib/categories.js
var require_categories = __commonJS((exports, module) => {
  var debug = require_browser()("log4js:categories");
  var configuration = require_configuration();
  var levels = require_levels();
  var appenders = require_appenders();
  var categories = new Map;
  function inheritFromParent(config, category, categoryName) {
    if (category.inherit === false)
      return;
    const lastDotIndex = categoryName.lastIndexOf(".");
    if (lastDotIndex < 0)
      return;
    const parentCategoryName = categoryName.slice(0, lastDotIndex);
    let parentCategory = config.categories[parentCategoryName];
    if (!parentCategory) {
      parentCategory = { inherit: true, appenders: [] };
    }
    inheritFromParent(config, parentCategory, parentCategoryName);
    if (!config.categories[parentCategoryName] && parentCategory.appenders && parentCategory.appenders.length && parentCategory.level) {
      config.categories[parentCategoryName] = parentCategory;
    }
    category.appenders = category.appenders || [];
    category.level = category.level || parentCategory.level;
    parentCategory.appenders.forEach((ap) => {
      if (!category.appenders.includes(ap)) {
        category.appenders.push(ap);
      }
    });
    category.parent = parentCategory;
  }
  function addCategoryInheritance(config) {
    if (!config.categories)
      return;
    const categoryNames = Object.keys(config.categories);
    categoryNames.forEach((name) => {
      const category = config.categories[name];
      inheritFromParent(config, category, name);
    });
  }
  configuration.addPreProcessingListener((config) => addCategoryInheritance(config));
  configuration.addListener((config) => {
    configuration.throwExceptionIf(config, configuration.not(configuration.anObject(config.categories)), 'must have a property "categories" of type object.');
    const categoryNames = Object.keys(config.categories);
    configuration.throwExceptionIf(config, configuration.not(categoryNames.length), "must define at least one category.");
    categoryNames.forEach((name) => {
      const category = config.categories[name];
      configuration.throwExceptionIf(config, [
        configuration.not(category.appenders),
        configuration.not(category.level)
      ], `category "${name}" is not valid (must be an object with properties "appenders" and "level")`);
      configuration.throwExceptionIf(config, configuration.not(Array.isArray(category.appenders)), `category "${name}" is not valid (appenders must be an array of appender names)`);
      configuration.throwExceptionIf(config, configuration.not(category.appenders.length), `category "${name}" is not valid (appenders must contain at least one appender name)`);
      if (Object.prototype.hasOwnProperty.call(category, "enableCallStack")) {
        configuration.throwExceptionIf(config, typeof category.enableCallStack !== "boolean", `category "${name}" is not valid (enableCallStack must be boolean type)`);
      }
      category.appenders.forEach((appender) => {
        configuration.throwExceptionIf(config, configuration.not(appenders.get(appender)), `category "${name}" is not valid (appender "${appender}" is not defined)`);
      });
      configuration.throwExceptionIf(config, configuration.not(levels.getLevel(category.level)), `category "${name}" is not valid (level "${category.level}" not recognised;` + ` valid levels are ${levels.levels.join(", ")})`);
    });
    configuration.throwExceptionIf(config, configuration.not(config.categories.default), 'must define a "default" category.');
  });
  var setup = (config) => {
    categories.clear();
    if (!config) {
      return;
    }
    const categoryNames = Object.keys(config.categories);
    categoryNames.forEach((name) => {
      const category = config.categories[name];
      const categoryAppenders = [];
      category.appenders.forEach((appender) => {
        categoryAppenders.push(appenders.get(appender));
        debug(`Creating category ${name}`);
        categories.set(name, {
          appenders: categoryAppenders,
          level: levels.getLevel(category.level),
          enableCallStack: category.enableCallStack || false
        });
      });
    });
  };
  var init = () => {
    setup();
  };
  init();
  configuration.addListener(setup);
  var configForCategory = (category) => {
    debug(`configForCategory: searching for config for ${category}`);
    if (categories.has(category)) {
      debug(`configForCategory: ${category} exists in config, returning it`);
      return categories.get(category);
    }
    let sourceCategoryConfig;
    if (category.indexOf(".") > 0) {
      debug(`configForCategory: ${category} has hierarchy, cloning from parents`);
      sourceCategoryConfig = {
        ...configForCategory(category.slice(0, category.lastIndexOf(".")))
      };
    } else {
      if (!categories.has("default")) {
        setup({ categories: { default: { appenders: ["out"], level: "OFF" } } });
      }
      debug("configForCategory: cloning default category");
      sourceCategoryConfig = { ...categories.get("default") };
    }
    categories.set(category, sourceCategoryConfig);
    return sourceCategoryConfig;
  };
  var appendersForCategory = (category) => configForCategory(category).appenders;
  var getLevelForCategory = (category) => configForCategory(category).level;
  var setLevelForCategory = (category, level) => {
    configForCategory(category).level = level;
  };
  var getEnableCallStackForCategory = (category) => configForCategory(category).enableCallStack === true;
  var setEnableCallStackForCategory = (category, useCallStack) => {
    configForCategory(category).enableCallStack = useCallStack;
  };
  module.exports = categories;
  module.exports = Object.assign(module.exports, {
    appendersForCategory,
    getLevelForCategory,
    setLevelForCategory,
    getEnableCallStackForCategory,
    setEnableCallStackForCategory,
    init
  });
});

// node_modules/flatted/cjs/index.js
var require_cjs = __commonJS((exports) => {
  var { parse: $parse, stringify: $stringify } = JSON;
  var { keys } = Object;
  var Primitive = String;
  var primitive = "string";
  var ignore = {};
  var object2 = "object";
  var noop = (_3, value) => value;
  var primitives = (value) => value instanceof Primitive ? Primitive(value) : value;
  var Primitives = (_3, value) => typeof value === primitive ? new Primitive(value) : value;
  var revive = (input, parsed, output, $3) => {
    const lazy = [];
    for (let ke = keys(output), { length } = ke, y4 = 0;y4 < length; y4++) {
      const k4 = ke[y4];
      const value = output[k4];
      if (value instanceof Primitive) {
        const tmp = input[value];
        if (typeof tmp === object2 && !parsed.has(tmp)) {
          parsed.add(tmp);
          output[k4] = ignore;
          lazy.push({ k: k4, a: [input, parsed, tmp, $3] });
        } else
          output[k4] = $3.call(output, k4, tmp);
      } else if (output[k4] !== ignore)
        output[k4] = $3.call(output, k4, value);
    }
    for (let { length } = lazy, i2 = 0;i2 < length; i2++) {
      const { k: k4, a: a2 } = lazy[i2];
      output[k4] = $3.call(output, k4, revive.apply(null, a2));
    }
    return output;
  };
  var set2 = (known, input, value) => {
    const index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  };
  var parse = (text, reviver) => {
    const input = $parse(text, Primitives).map(primitives);
    const value = input[0];
    const $3 = reviver || noop;
    const tmp = typeof value === object2 && value ? revive(input, new Set, value, $3) : value;
    return $3.call({ "": tmp }, "", tmp);
  };
  exports.parse = parse;
  var stringify = (value, replacer, space) => {
    const $3 = replacer && typeof replacer === object2 ? (k4, v2) => k4 === "" || -1 < replacer.indexOf(k4) ? v2 : undefined : replacer || noop;
    const known = new Map;
    const input = [];
    const output = [];
    let i2 = +set2(known, input, $3.call({ "": value }, "", value));
    let firstRun = !i2;
    while (i2 < input.length) {
      firstRun = true;
      output[i2] = $stringify(input[i2++], replace, space);
    }
    return "[" + output.join(",") + "]";
    function replace(key, value2) {
      if (firstRun) {
        firstRun = !firstRun;
        return value2;
      }
      const after = $3.call(this, key, value2);
      switch (typeof after) {
        case object2:
          if (after === null)
            return after;
        case primitive:
          return known.get(after) || set2(known, input, after);
      }
      return after;
    }
  };
  exports.stringify = stringify;
  var toJSON = (value) => $parse(stringify(value));
  exports.toJSON = toJSON;
  var fromJSON = (value) => parse($stringify(value));
  exports.fromJSON = fromJSON;
});

// node_modules/log4js/lib/LoggingEvent.js
var require_LoggingEvent = __commonJS((exports, module) => {
  var flatted = require_cjs();
  var levels = require_levels();

  class SerDe {
    constructor() {
      const deserialise = {
        __LOG4JS_undefined__: undefined,
        __LOG4JS_NaN__: Number("abc"),
        __LOG4JS_Infinity__: 1 / 0,
        "__LOG4JS_-Infinity__": -1 / 0
      };
      this.deMap = deserialise;
      this.serMap = {};
      Object.keys(this.deMap).forEach((key) => {
        const value = this.deMap[key];
        this.serMap[value] = key;
      });
    }
    canSerialise(key) {
      if (typeof key === "string")
        return false;
      return key in this.serMap;
    }
    serialise(key) {
      if (this.canSerialise(key))
        return this.serMap[key];
      return key;
    }
    canDeserialise(key) {
      return key in this.deMap;
    }
    deserialise(key) {
      if (this.canDeserialise(key))
        return this.deMap[key];
      return key;
    }
  }
  var serde = new SerDe;

  class LoggingEvent {
    constructor(categoryName, level, data, context, location2, error) {
      this.startTime = new Date;
      this.categoryName = categoryName;
      this.data = data;
      this.level = level;
      this.context = Object.assign({}, context);
      this.pid = process.pid;
      this.error = error;
      if (typeof location2 !== "undefined") {
        if (!location2 || typeof location2 !== "object" || Array.isArray(location2))
          throw new TypeError("Invalid location type passed to LoggingEvent constructor");
        this.constructor._getLocationKeys().forEach((key) => {
          if (typeof location2[key] !== "undefined")
            this[key] = location2[key];
        });
      }
    }
    static _getLocationKeys() {
      return [
        "fileName",
        "lineNumber",
        "columnNumber",
        "callStack",
        "className",
        "functionName",
        "functionAlias",
        "callerName"
      ];
    }
    serialise() {
      return flatted.stringify(this, (key, value) => {
        if (value instanceof Error) {
          value = Object.assign({ message: value.message, stack: value.stack }, value);
        }
        return serde.serialise(value);
      });
    }
    static deserialise(serialised) {
      let event;
      try {
        const rehydratedEvent = flatted.parse(serialised, (key, value) => {
          if (value && value.message && value.stack) {
            const fakeError = new Error(value);
            Object.keys(value).forEach((k4) => {
              fakeError[k4] = value[k4];
            });
            value = fakeError;
          }
          return serde.deserialise(value);
        });
        this._getLocationKeys().forEach((key) => {
          if (typeof rehydratedEvent[key] !== "undefined") {
            if (!rehydratedEvent.location)
              rehydratedEvent.location = {};
            rehydratedEvent.location[key] = rehydratedEvent[key];
          }
        });
        event = new LoggingEvent(rehydratedEvent.categoryName, levels.getLevel(rehydratedEvent.level.levelStr), rehydratedEvent.data, rehydratedEvent.context, rehydratedEvent.location, rehydratedEvent.error);
        event.startTime = new Date(rehydratedEvent.startTime);
        event.pid = rehydratedEvent.pid;
        if (rehydratedEvent.cluster) {
          event.cluster = rehydratedEvent.cluster;
        }
      } catch (e) {
        event = new LoggingEvent("log4js", levels.ERROR, [
          "Unable to parse log:",
          serialised,
          "because: ",
          e
        ]);
      }
      return event;
    }
  }
  module.exports = LoggingEvent;
});

// node_modules/log4js/lib/logger.js
var require_logger = __commonJS((exports, module) => {
  var debug = require_browser()("log4js:logger");
  var LoggingEvent = require_LoggingEvent();
  var levels = require_levels();
  var clustering = require_clusteringBrowser();
  var categories = require_categories();
  var configuration = require_configuration();
  var stackReg = /^(?:\s*)at (?:(.+) \()?(?:([^(]+?):(\d+):(\d+))\)?$/;
  var baseCallStackSkip = 1;
  var defaultErrorCallStackSkip = 3;
  function defaultParseCallStack(data, skipIdx = defaultErrorCallStackSkip + baseCallStackSkip) {
    try {
      const stacklines = data.stack.split(`
`).slice(skipIdx);
      if (!stacklines.length) {
        return null;
      }
      const lineMatch = stackReg.exec(stacklines[0]);
      if (lineMatch && lineMatch.length === 5) {
        let className = "";
        let functionName = "";
        let functionAlias = "";
        if (lineMatch[1] && lineMatch[1] !== "") {
          [functionName, functionAlias] = lineMatch[1].replace(/[[\]]/g, "").split(" as ");
          functionAlias = functionAlias || "";
          if (functionName.includes("."))
            [className, functionName] = functionName.split(".");
        }
        return {
          fileName: lineMatch[2],
          lineNumber: parseInt(lineMatch[3], 10),
          columnNumber: parseInt(lineMatch[4], 10),
          callStack: stacklines.join(`
`),
          className,
          functionName,
          functionAlias,
          callerName: lineMatch[1] || ""
        };
      } else {
        console.error("log4js.logger - defaultParseCallStack error");
      }
    } catch (err) {
      console.error("log4js.logger - defaultParseCallStack error", err);
    }
    return null;
  }

  class Logger {
    constructor(name) {
      if (!name) {
        throw new Error("No category provided.");
      }
      this.category = name;
      this.context = {};
      this.callStackSkipIndex = 0;
      this.parseCallStack = defaultParseCallStack;
      debug(`Logger created (${this.category}, ${this.level})`);
    }
    get level() {
      return levels.getLevel(categories.getLevelForCategory(this.category), levels.OFF);
    }
    set level(level) {
      categories.setLevelForCategory(this.category, levels.getLevel(level, this.level));
    }
    get useCallStack() {
      return categories.getEnableCallStackForCategory(this.category);
    }
    set useCallStack(bool) {
      categories.setEnableCallStackForCategory(this.category, bool === true);
    }
    get callStackLinesToSkip() {
      return this.callStackSkipIndex;
    }
    set callStackLinesToSkip(number2) {
      if (typeof number2 !== "number") {
        throw new TypeError("Must be a number");
      }
      if (number2 < 0) {
        throw new RangeError("Must be >= 0");
      }
      this.callStackSkipIndex = number2;
    }
    log(level, ...args) {
      const logLevel = levels.getLevel(level);
      if (!logLevel) {
        if (configuration.validIdentifier(level) && args.length > 0) {
          this.log(levels.WARN, "log4js:logger.log: valid log-level not found as first parameter given:", level);
          this.log(levels.INFO, `[${level}]`, ...args);
        } else {
          this.log(levels.INFO, level, ...args);
        }
      } else if (this.isLevelEnabled(logLevel)) {
        this._log(logLevel, args);
      }
    }
    isLevelEnabled(otherLevel) {
      return this.level.isLessThanOrEqualTo(otherLevel);
    }
    _log(level, data) {
      debug(`sending log data (${level}) to appenders`);
      const error = data.find((item) => item instanceof Error);
      let callStack;
      if (this.useCallStack) {
        try {
          if (error) {
            callStack = this.parseCallStack(error, this.callStackSkipIndex + baseCallStackSkip);
          }
        } catch (_err) {}
        callStack = callStack || this.parseCallStack(new Error, this.callStackSkipIndex + defaultErrorCallStackSkip + baseCallStackSkip);
      }
      const loggingEvent = new LoggingEvent(this.category, level, data, this.context, callStack, error);
      clustering.send(loggingEvent);
    }
    addContext(key, value) {
      this.context[key] = value;
    }
    removeContext(key) {
      delete this.context[key];
    }
    clearContext() {
      this.context = {};
    }
    setParseCallStackFunction(parseFunction) {
      if (typeof parseFunction === "function") {
        this.parseCallStack = parseFunction;
      } else if (typeof parseFunction === "undefined") {
        this.parseCallStack = defaultParseCallStack;
      } else {
        throw new TypeError("Invalid type passed to setParseCallStackFunction");
      }
    }
  }
  function addLevelMethods(target) {
    const level = levels.getLevel(target);
    const levelStrLower = level.toString().toLowerCase();
    const levelMethod = levelStrLower.replace(/_([a-z])/g, (g3) => g3[1].toUpperCase());
    const isLevelMethod = levelMethod[0].toUpperCase() + levelMethod.slice(1);
    Logger.prototype[`is${isLevelMethod}Enabled`] = function() {
      return this.isLevelEnabled(level);
    };
    Logger.prototype[levelMethod] = function(...args) {
      this.log(level, ...args);
    };
  }
  levels.levels.forEach(addLevelMethods);
  configuration.addListener(() => {
    levels.levels.forEach(addLevelMethods);
  });
  module.exports = Logger;
});

// node_modules/log4js/lib/connect-logger.js
var require_connect_logger = __commonJS((exports, module) => {
  var levels = require_levels();
  var DEFAULT_FORMAT = ":remote-addr - -" + ' ":method :url HTTP/:http-version"' + ' :status :content-length ":referrer"' + ' ":user-agent"';
  function getUrl(req) {
    return req.originalUrl || req.url;
  }
  function assembleTokens(req, res, customTokens) {
    const arrayUniqueTokens = (array2) => {
      const a2 = array2.concat();
      for (let i2 = 0;i2 < a2.length; ++i2) {
        for (let j5 = i2 + 1;j5 < a2.length; ++j5) {
          if (a2[i2].token == a2[j5].token) {
            a2.splice(j5--, 1);
          }
        }
      }
      return a2;
    };
    const defaultTokens = [];
    defaultTokens.push({ token: ":url", replacement: getUrl(req) });
    defaultTokens.push({ token: ":protocol", replacement: req.protocol });
    defaultTokens.push({ token: ":hostname", replacement: req.hostname });
    defaultTokens.push({ token: ":method", replacement: req.method });
    defaultTokens.push({
      token: ":status",
      replacement: res.__statusCode || res.statusCode
    });
    defaultTokens.push({
      token: ":response-time",
      replacement: res.responseTime
    });
    defaultTokens.push({ token: ":date", replacement: new Date().toUTCString() });
    defaultTokens.push({
      token: ":referrer",
      replacement: req.headers.referer || req.headers.referrer || ""
    });
    defaultTokens.push({
      token: ":http-version",
      replacement: `${req.httpVersionMajor}.${req.httpVersionMinor}`
    });
    defaultTokens.push({
      token: ":remote-addr",
      replacement: req.headers["x-forwarded-for"] || req.ip || req._remoteAddress || req.socket && (req.socket.remoteAddress || req.socket.socket && req.socket.socket.remoteAddress)
    });
    defaultTokens.push({
      token: ":user-agent",
      replacement: req.headers["user-agent"]
    });
    defaultTokens.push({
      token: ":content-length",
      replacement: res.getHeader("content-length") || res.__headers && res.__headers["Content-Length"] || "-"
    });
    defaultTokens.push({
      token: /:req\[([^\]]+)]/g,
      replacement(_3, field) {
        return req.headers[field.toLowerCase()];
      }
    });
    defaultTokens.push({
      token: /:res\[([^\]]+)]/g,
      replacement(_3, field) {
        return res.getHeader(field.toLowerCase()) || res.__headers && res.__headers[field];
      }
    });
    return arrayUniqueTokens(customTokens.concat(defaultTokens));
  }
  function format(str, tokens) {
    for (let i2 = 0;i2 < tokens.length; i2++) {
      str = str.replace(tokens[i2].token, tokens[i2].replacement);
    }
    return str;
  }
  function createNoLogCondition(nolog) {
    let regexp = null;
    if (nolog instanceof RegExp) {
      regexp = nolog;
    }
    if (typeof nolog === "string") {
      regexp = new RegExp(nolog);
    }
    if (Array.isArray(nolog)) {
      const regexpsAsStrings = nolog.map((reg) => reg.source ? reg.source : reg);
      regexp = new RegExp(regexpsAsStrings.join("|"));
    }
    return regexp;
  }
  function matchRules(statusCode, currentLevel, ruleSet) {
    let level = currentLevel;
    if (ruleSet) {
      const matchedRule = ruleSet.find((rule) => {
        let ruleMatched = false;
        if (rule.from && rule.to) {
          ruleMatched = statusCode >= rule.from && statusCode <= rule.to;
        } else {
          ruleMatched = rule.codes.indexOf(statusCode) !== -1;
        }
        return ruleMatched;
      });
      if (matchedRule) {
        level = levels.getLevel(matchedRule.level, level);
      }
    }
    return level;
  }
  module.exports = function getLogger(logger4js, options) {
    if (typeof options === "string" || typeof options === "function") {
      options = { format: options };
    } else {
      options = options || {};
    }
    const thisLogger = logger4js;
    let level = levels.getLevel(options.level, levels.INFO);
    const fmt = options.format || DEFAULT_FORMAT;
    return (req, res, next) => {
      if (typeof req._logging !== "undefined")
        return next();
      if (typeof options.nolog !== "function") {
        const nolog = createNoLogCondition(options.nolog);
        if (nolog && nolog.test(req.originalUrl))
          return next();
      }
      if (thisLogger.isLevelEnabled(level) || options.level === "auto") {
        const start = new Date;
        const { writeHead } = res;
        req._logging = true;
        res.writeHead = (code, headers) => {
          res.writeHead = writeHead;
          res.writeHead(code, headers);
          res.__statusCode = code;
          res.__headers = headers || {};
        };
        let finished = false;
        const handler = () => {
          if (finished) {
            return;
          }
          finished = true;
          if (typeof options.nolog === "function") {
            if (options.nolog(req, res) === true) {
              req._logging = false;
              return;
            }
          }
          res.responseTime = new Date - start;
          if (res.statusCode && options.level === "auto") {
            level = levels.INFO;
            if (res.statusCode >= 300)
              level = levels.WARN;
            if (res.statusCode >= 400)
              level = levels.ERROR;
          }
          level = matchRules(res.statusCode, level, options.statusRules);
          const combinedTokens = assembleTokens(req, res, options.tokens || []);
          if (options.context)
            thisLogger.addContext("res", res);
          if (typeof fmt === "function") {
            const line = fmt(req, res, (str) => format(str, combinedTokens));
            if (line)
              thisLogger.log(level, line);
          } else {
            thisLogger.log(level, format(fmt, combinedTokens));
          }
          if (options.context)
            thisLogger.removeContext("res");
        };
        res.on("end", handler);
        res.on("finish", handler);
        res.on("error", handler);
        res.on("close", handler);
      }
      return next();
    };
  };
});

// node_modules/log4js/lib/appenders/recording.js
var require_recording = __commonJS((exports, module) => {
  var debug = require_browser()("log4js:recording");
  var recordedEvents = [];
  function configure() {
    return function(logEvent) {
      debug(`received logEvent, number of events now ${recordedEvents.length + 1}`);
      debug("log event was ", logEvent);
      recordedEvents.push(logEvent);
    };
  }
  function replay() {
    return recordedEvents.slice();
  }
  function reset() {
    recordedEvents.length = 0;
  }
  module.exports = {
    configure,
    replay,
    playback: replay,
    reset,
    erase: reset
  };
});

// node_modules/log4js/lib/log4js.js
var require_log4js = __commonJS((exports, module) => {
  var debug = require_browser()("log4js:main");
  var fs = (() => ({}));
  var deepClone = require_rfdc()({ proto: true });
  var configuration = require_configuration();
  var layouts = require_layouts();
  var levels = require_levels();
  var appenders = require_appenders();
  var categories = require_categories();
  var Logger = require_logger();
  var clustering = require_clusteringBrowser();
  var connectLogger = require_connect_logger();
  var recordingModule = require_recording();
  var enabled = false;
  function sendLogEventToAppender(logEvent) {
    if (!enabled)
      return;
    debug("Received log event ", logEvent);
    const categoryAppenders = categories.appendersForCategory(logEvent.categoryName);
    categoryAppenders.forEach((appender) => {
      appender(logEvent);
    });
  }
  function loadConfigurationFile(filename) {
    debug(`Loading configuration from ${filename}`);
    try {
      return JSON.parse(fs.readFileSync(filename, "utf8"));
    } catch (e) {
      throw new Error(`Problem reading config from file "${filename}". Error was ${e.message}`, e);
    }
  }
  function configure(configurationFileOrObject) {
    if (enabled) {
      shutdown();
    }
    let configObject = configurationFileOrObject;
    if (typeof configObject === "string") {
      configObject = loadConfigurationFile(configurationFileOrObject);
    }
    debug(`Configuration is ${configObject}`);
    configuration.configure(deepClone(configObject));
    clustering.onMessage(sendLogEventToAppender);
    enabled = true;
    return log4js;
  }
  function isConfigured() {
    return enabled;
  }
  function recording() {
    return recordingModule;
  }
  function shutdown(callback = () => {}) {
    if (typeof callback !== "function") {
      throw new TypeError("Invalid callback passed to shutdown");
    }
    debug("Shutdown called. Disabling all log writing.");
    enabled = false;
    const appendersToCheck = Array.from(appenders.values());
    appenders.init();
    categories.init();
    const shutdownFunctions = appendersToCheck.reduce((accum, next) => next.shutdown ? accum + 1 : accum, 0);
    if (shutdownFunctions === 0) {
      debug("No appenders with shutdown functions found.");
      callback();
    }
    let completed = 0;
    let error;
    debug(`Found ${shutdownFunctions} appenders with shutdown functions.`);
    function complete(err) {
      error = error || err;
      completed += 1;
      debug(`Appender shutdowns complete: ${completed} / ${shutdownFunctions}`);
      if (completed >= shutdownFunctions) {
        debug("All shutdown functions completed.");
        callback(error);
      }
    }
    appendersToCheck.filter((a2) => a2.shutdown).forEach((a2) => a2.shutdown(complete));
  }
  function getLogger(category) {
    if (!enabled) {
      configure(process.env.LOG4JS_CONFIG || {
        appenders: { out: { type: "stdout" } },
        categories: { default: { appenders: ["out"], level: "OFF" } }
      });
    }
    return new Logger(category || "default");
  }
  var log4js = {
    getLogger,
    configure,
    isConfigured,
    shutdown,
    connectLogger,
    levels,
    addLayout: layouts.addLayout,
    recording
  };
  module.exports = log4js;
});

// node_modules/@google/genai/dist/web/index.mjs
var _defaultBaseGeminiUrl = undefined;
var _defaultBaseVertexUrl = undefined;
function getDefaultBaseUrls() {
  return {
    geminiUrl: _defaultBaseGeminiUrl,
    vertexUrl: _defaultBaseVertexUrl
  };
}
function getBaseUrl(options, vertexBaseUrlFromEnv, geminiBaseUrlFromEnv) {
  var _a, _b, _c;
  if (!((_a = options.httpOptions) === null || _a === undefined ? undefined : _a.baseUrl)) {
    const defaultBaseUrls = getDefaultBaseUrls();
    if (options.vertexai) {
      return (_b = defaultBaseUrls.vertexUrl) !== null && _b !== undefined ? _b : vertexBaseUrlFromEnv;
    } else {
      return (_c = defaultBaseUrls.geminiUrl) !== null && _c !== undefined ? _c : geminiBaseUrlFromEnv;
    }
  }
  return options.httpOptions.baseUrl;
}

class BaseModule {
}
function formatMap(templateString, valueMap) {
  const regex = /\{([^}]+)\}/g;
  return templateString.replace(regex, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(valueMap, key)) {
      const value = valueMap[key];
      return value !== undefined && value !== null ? String(value) : "";
    } else {
      throw new Error(`Key '${key}' not found in valueMap.`);
    }
  });
}
function setValueByPath(data, keys, value) {
  for (let i = 0;i < keys.length - 1; i++) {
    const key = keys[i];
    if (key.endsWith("[]")) {
      const keyName = key.slice(0, -2);
      if (!(keyName in data)) {
        if (Array.isArray(value)) {
          data[keyName] = Array.from({ length: value.length }, () => ({}));
        } else {
          throw new Error(`Value must be a list given an array path ${key}`);
        }
      }
      if (Array.isArray(data[keyName])) {
        const arrayData = data[keyName];
        if (Array.isArray(value)) {
          for (let j = 0;j < arrayData.length; j++) {
            const entry = arrayData[j];
            setValueByPath(entry, keys.slice(i + 1), value[j]);
          }
        } else {
          for (const d of arrayData) {
            setValueByPath(d, keys.slice(i + 1), value);
          }
        }
      }
      return;
    } else if (key.endsWith("[0]")) {
      const keyName = key.slice(0, -3);
      if (!(keyName in data)) {
        data[keyName] = [{}];
      }
      const arrayData = data[keyName];
      setValueByPath(arrayData[0], keys.slice(i + 1), value);
      return;
    }
    if (!data[key] || typeof data[key] !== "object") {
      data[key] = {};
    }
    data = data[key];
  }
  const keyToSet = keys[keys.length - 1];
  const existingData = data[keyToSet];
  if (existingData !== undefined) {
    if (!value || typeof value === "object" && Object.keys(value).length === 0) {
      return;
    }
    if (value === existingData) {
      return;
    }
    if (typeof existingData === "object" && typeof value === "object" && existingData !== null && value !== null) {
      Object.assign(existingData, value);
    } else {
      throw new Error(`Cannot set value for an existing key. Key: ${keyToSet}`);
    }
  } else {
    data[keyToSet] = value;
  }
}
function getValueByPath(data, keys) {
  try {
    if (keys.length === 1 && keys[0] === "_self") {
      return data;
    }
    for (let i = 0;i < keys.length; i++) {
      if (typeof data !== "object" || data === null) {
        return;
      }
      const key = keys[i];
      if (key.endsWith("[]")) {
        const keyName = key.slice(0, -2);
        if (keyName in data) {
          const arrayData = data[keyName];
          if (!Array.isArray(arrayData)) {
            return;
          }
          return arrayData.map((d) => getValueByPath(d, keys.slice(i + 1)));
        } else {
          return;
        }
      } else {
        data = data[key];
      }
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      return;
    }
    throw error;
  }
}
function tModel(apiClient, model) {
  if (!model || typeof model !== "string") {
    throw new Error("model is required and must be a string");
  }
  if (apiClient.isVertexAI()) {
    if (model.startsWith("publishers/") || model.startsWith("projects/") || model.startsWith("models/")) {
      return model;
    } else if (model.indexOf("/") >= 0) {
      const parts = model.split("/", 2);
      return `publishers/${parts[0]}/models/${parts[1]}`;
    } else {
      return `publishers/google/models/${model}`;
    }
  } else {
    if (model.startsWith("models/") || model.startsWith("tunedModels/")) {
      return model;
    } else {
      return `models/${model}`;
    }
  }
}
function tCachesModel(apiClient, model) {
  const transformedModel = tModel(apiClient, model);
  if (!transformedModel) {
    return "";
  }
  if (transformedModel.startsWith("publishers/") && apiClient.isVertexAI()) {
    return `projects/${apiClient.getProject()}/locations/${apiClient.getLocation()}/${transformedModel}`;
  } else if (transformedModel.startsWith("models/") && apiClient.isVertexAI()) {
    return `projects/${apiClient.getProject()}/locations/${apiClient.getLocation()}/publishers/google/${transformedModel}`;
  } else {
    return transformedModel;
  }
}
function tBlobs(apiClient, blobs) {
  if (Array.isArray(blobs)) {
    return blobs.map((blob) => tBlob(apiClient, blob));
  } else {
    return [tBlob(apiClient, blobs)];
  }
}
function tBlob(apiClient, blob) {
  if (typeof blob === "object" && blob !== null) {
    return blob;
  }
  throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof blob}`);
}
function tImageBlob(apiClient, blob) {
  const transformedBlob = tBlob(apiClient, blob);
  if (transformedBlob.mimeType && transformedBlob.mimeType.startsWith("image/")) {
    return transformedBlob;
  }
  throw new Error(`Unsupported mime type: ${transformedBlob.mimeType}`);
}
function tAudioBlob(apiClient, blob) {
  const transformedBlob = tBlob(apiClient, blob);
  if (transformedBlob.mimeType && transformedBlob.mimeType.startsWith("audio/")) {
    return transformedBlob;
  }
  throw new Error(`Unsupported mime type: ${transformedBlob.mimeType}`);
}
function tPart(apiClient, origin) {
  if (origin === null || origin === undefined) {
    throw new Error("PartUnion is required");
  }
  if (typeof origin === "object") {
    return origin;
  }
  if (typeof origin === "string") {
    return { text: origin };
  }
  throw new Error(`Unsupported part type: ${typeof origin}`);
}
function tParts(apiClient, origin) {
  if (origin === null || origin === undefined || Array.isArray(origin) && origin.length === 0) {
    throw new Error("PartListUnion is required");
  }
  if (Array.isArray(origin)) {
    return origin.map((item) => tPart(apiClient, item));
  }
  return [tPart(apiClient, origin)];
}
function _isContent(origin) {
  return origin !== null && origin !== undefined && typeof origin === "object" && "parts" in origin && Array.isArray(origin.parts);
}
function _isFunctionCallPart(origin) {
  return origin !== null && origin !== undefined && typeof origin === "object" && "functionCall" in origin;
}
function _isFunctionResponsePart(origin) {
  return origin !== null && origin !== undefined && typeof origin === "object" && "functionResponse" in origin;
}
function tContent(apiClient, origin) {
  if (origin === null || origin === undefined) {
    throw new Error("ContentUnion is required");
  }
  if (_isContent(origin)) {
    return origin;
  }
  return {
    role: "user",
    parts: tParts(apiClient, origin)
  };
}
function tContentsForEmbed(apiClient, origin) {
  if (!origin) {
    return [];
  }
  if (apiClient.isVertexAI() && Array.isArray(origin)) {
    return origin.flatMap((item) => {
      const content = tContent(apiClient, item);
      if (content.parts && content.parts.length > 0 && content.parts[0].text !== undefined) {
        return [content.parts[0].text];
      }
      return [];
    });
  } else if (apiClient.isVertexAI()) {
    const content = tContent(apiClient, origin);
    if (content.parts && content.parts.length > 0 && content.parts[0].text !== undefined) {
      return [content.parts[0].text];
    }
    return [];
  }
  if (Array.isArray(origin)) {
    return origin.map((item) => tContent(apiClient, item));
  }
  return [tContent(apiClient, origin)];
}
function tContents(apiClient, origin) {
  if (origin === null || origin === undefined || Array.isArray(origin) && origin.length === 0) {
    throw new Error("contents are required");
  }
  if (!Array.isArray(origin)) {
    if (_isFunctionCallPart(origin) || _isFunctionResponsePart(origin)) {
      throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");
    }
    return [tContent(apiClient, origin)];
  }
  const result = [];
  const accumulatedParts = [];
  const isContentArray = _isContent(origin[0]);
  for (const item of origin) {
    const isContent = _isContent(item);
    if (isContent != isContentArray) {
      throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");
    }
    if (isContent) {
      result.push(item);
    } else if (_isFunctionCallPart(item) || _isFunctionResponsePart(item)) {
      throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");
    } else {
      accumulatedParts.push(item);
    }
  }
  if (!isContentArray) {
    result.push({ role: "user", parts: tParts(apiClient, accumulatedParts) });
  }
  return result;
}
function tSchema(apiClient, schema) {
  return schema;
}
function tSpeechConfig(apiClient, speechConfig) {
  if (typeof speechConfig === "object") {
    return speechConfig;
  } else if (typeof speechConfig === "string") {
    return {
      voiceConfig: {
        prebuiltVoiceConfig: {
          voiceName: speechConfig
        }
      }
    };
  } else {
    throw new Error(`Unsupported speechConfig type: ${typeof speechConfig}`);
  }
}
function tTool(apiClient, tool) {
  return tool;
}
function tTools(apiClient, tool) {
  if (!Array.isArray(tool)) {
    throw new Error("tool is required and must be an array of Tools");
  }
  return tool;
}
function resourceName(client, resourceName2, resourcePrefix, splitsAfterPrefix = 1) {
  const shouldAppendPrefix = !resourceName2.startsWith(`${resourcePrefix}/`) && resourceName2.split("/").length === splitsAfterPrefix;
  if (client.isVertexAI()) {
    if (resourceName2.startsWith("projects/")) {
      return resourceName2;
    } else if (resourceName2.startsWith("locations/")) {
      return `projects/${client.getProject()}/${resourceName2}`;
    } else if (resourceName2.startsWith(`${resourcePrefix}/`)) {
      return `projects/${client.getProject()}/locations/${client.getLocation()}/${resourceName2}`;
    } else if (shouldAppendPrefix) {
      return `projects/${client.getProject()}/locations/${client.getLocation()}/${resourcePrefix}/${resourceName2}`;
    } else {
      return resourceName2;
    }
  }
  if (shouldAppendPrefix) {
    return `${resourcePrefix}/${resourceName2}`;
  }
  return resourceName2;
}
function tCachedContentName(apiClient, name) {
  if (typeof name !== "string") {
    throw new Error("name must be a string");
  }
  return resourceName(apiClient, name, "cachedContents");
}
function tTuningJobStatus(apiClient, status) {
  switch (status) {
    case "STATE_UNSPECIFIED":
      return "JOB_STATE_UNSPECIFIED";
    case "CREATING":
      return "JOB_STATE_RUNNING";
    case "ACTIVE":
      return "JOB_STATE_SUCCEEDED";
    case "FAILED":
      return "JOB_STATE_FAILED";
    default:
      return status;
  }
}
function tBytes(apiClient, fromImageBytes) {
  if (typeof fromImageBytes !== "string") {
    throw new Error("fromImageBytes must be a string");
  }
  return fromImageBytes;
}
function _isFile(origin) {
  return origin !== null && origin !== undefined && typeof origin === "object" && "name" in origin;
}
function isGeneratedVideo(origin) {
  return origin !== null && origin !== undefined && typeof origin === "object" && "video" in origin;
}
function isVideo(origin) {
  return origin !== null && origin !== undefined && typeof origin === "object" && "uri" in origin;
}
function tFileName(apiClient, fromName) {
  var _a;
  let name;
  if (_isFile(fromName)) {
    name = fromName.name;
  }
  if (isVideo(fromName)) {
    name = fromName.uri;
    if (name === undefined) {
      return;
    }
  }
  if (isGeneratedVideo(fromName)) {
    name = (_a = fromName.video) === null || _a === undefined ? undefined : _a.uri;
    if (name === undefined) {
      return;
    }
  }
  if (typeof fromName === "string") {
    name = fromName;
  }
  if (name === undefined) {
    throw new Error("Could not extract file name from the provided input.");
  }
  if (name.startsWith("https://")) {
    const suffix = name.split("files/")[1];
    const match = suffix.match(/[a-z0-9]+/);
    if (match === null) {
      throw new Error(`Could not extract file name from URI ${name}`);
    }
    name = match[0];
  } else if (name.startsWith("files/")) {
    name = name.split("files/")[1];
  }
  return name;
}
function tModelsUrl(apiClient, baseModels) {
  let res;
  if (apiClient.isVertexAI()) {
    res = baseModels ? "publishers/google/models" : "models";
  } else {
    res = baseModels ? "models" : "tunedModels";
  }
  return res;
}
function tExtractModels(apiClient, response) {
  for (const key of ["models", "tunedModels", "publisherModels"]) {
    if (hasField(response, key)) {
      return response[key];
    }
  }
  return [];
}
function hasField(data, fieldName) {
  return data !== null && typeof data === "object" && fieldName in data;
}
function blobToMldev$2(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["displayName"]) !== undefined) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function partToMldev$2(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["videoMetadata"]) !== undefined) {
    throw new Error("videoMetadata parameter is not supported in Gemini API.");
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToMldev$2(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function contentToMldev$2(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToMldev$2(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function googleSearchToMldev$2() {
  const toObject = {};
  return toObject;
}
function dynamicRetrievalConfigToMldev$2(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromDynamicThreshold = getValueByPath(fromObject, [
    "dynamicThreshold"
  ]);
  if (fromDynamicThreshold != null) {
    setValueByPath(toObject, ["dynamicThreshold"], fromDynamicThreshold);
  }
  return toObject;
}
function googleSearchRetrievalToMldev$2(apiClient, fromObject) {
  const toObject = {};
  const fromDynamicRetrievalConfig = getValueByPath(fromObject, [
    "dynamicRetrievalConfig"
  ]);
  if (fromDynamicRetrievalConfig != null) {
    setValueByPath(toObject, ["dynamicRetrievalConfig"], dynamicRetrievalConfigToMldev$2(apiClient, fromDynamicRetrievalConfig));
  }
  return toObject;
}
function toolToMldev$2(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["retrieval"]) !== undefined) {
    throw new Error("retrieval parameter is not supported in Gemini API.");
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToMldev$2());
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], googleSearchRetrievalToMldev$2(apiClient, fromGoogleSearchRetrieval));
  }
  if (getValueByPath(fromObject, ["enterpriseWebSearch"]) !== undefined) {
    throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["googleMaps"]) !== undefined) {
    throw new Error("googleMaps parameter is not supported in Gemini API.");
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    setValueByPath(toObject, ["functionDeclarations"], fromFunctionDeclarations);
  }
  return toObject;
}
function functionCallingConfigToMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromAllowedFunctionNames = getValueByPath(fromObject, [
    "allowedFunctionNames"
  ]);
  if (fromAllowedFunctionNames != null) {
    setValueByPath(toObject, ["allowedFunctionNames"], fromAllowedFunctionNames);
  }
  return toObject;
}
function toolConfigToMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], functionCallingConfigToMldev$1(apiClient, fromFunctionCallingConfig));
  }
  if (getValueByPath(fromObject, ["retrievalConfig"]) !== undefined) {
    throw new Error("retrievalConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function createCachedContentConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromTtl = getValueByPath(fromObject, ["ttl"]);
  if (parentObject !== undefined && fromTtl != null) {
    setValueByPath(parentObject, ["ttl"], fromTtl);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== undefined && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== undefined && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (parentObject !== undefined && fromContents != null) {
    let transformedList = tContents(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToMldev$2(apiClient, item);
      });
    }
    setValueByPath(parentObject, ["contents"], transformedList);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== undefined && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToMldev$2(apiClient, tContent(apiClient, fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== undefined && fromTools != null) {
    let transformedList = fromTools;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToMldev$2(apiClient, item);
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== undefined && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToMldev$1(apiClient, fromToolConfig));
  }
  return toObject;
}
function createCachedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], tCachesModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], createCachedContentConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function getCachedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function deleteCachedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function updateCachedContentConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromTtl = getValueByPath(fromObject, ["ttl"]);
  if (parentObject !== undefined && fromTtl != null) {
    setValueByPath(parentObject, ["ttl"], fromTtl);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== undefined && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  return toObject;
}
function updateCachedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], updateCachedContentConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function listCachedContentsConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== undefined && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== undefined && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  return toObject;
}
function listCachedContentsParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], listCachedContentsConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function blobToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function partToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToVertex$2(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function contentToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToVertex$2(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function googleSearchToVertex$2() {
  const toObject = {};
  return toObject;
}
function dynamicRetrievalConfigToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromDynamicThreshold = getValueByPath(fromObject, [
    "dynamicThreshold"
  ]);
  if (fromDynamicThreshold != null) {
    setValueByPath(toObject, ["dynamicThreshold"], fromDynamicThreshold);
  }
  return toObject;
}
function googleSearchRetrievalToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromDynamicRetrievalConfig = getValueByPath(fromObject, [
    "dynamicRetrievalConfig"
  ]);
  if (fromDynamicRetrievalConfig != null) {
    setValueByPath(toObject, ["dynamicRetrievalConfig"], dynamicRetrievalConfigToVertex$2(apiClient, fromDynamicRetrievalConfig));
  }
  return toObject;
}
function enterpriseWebSearchToVertex$2() {
  const toObject = {};
  return toObject;
}
function apiKeyConfigToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromApiKeyString = getValueByPath(fromObject, ["apiKeyString"]);
  if (fromApiKeyString != null) {
    setValueByPath(toObject, ["apiKeyString"], fromApiKeyString);
  }
  return toObject;
}
function authConfigToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromApiKeyConfig = getValueByPath(fromObject, ["apiKeyConfig"]);
  if (fromApiKeyConfig != null) {
    setValueByPath(toObject, ["apiKeyConfig"], apiKeyConfigToVertex$2(apiClient, fromApiKeyConfig));
  }
  const fromAuthType = getValueByPath(fromObject, ["authType"]);
  if (fromAuthType != null) {
    setValueByPath(toObject, ["authType"], fromAuthType);
  }
  const fromGoogleServiceAccountConfig = getValueByPath(fromObject, [
    "googleServiceAccountConfig"
  ]);
  if (fromGoogleServiceAccountConfig != null) {
    setValueByPath(toObject, ["googleServiceAccountConfig"], fromGoogleServiceAccountConfig);
  }
  const fromHttpBasicAuthConfig = getValueByPath(fromObject, [
    "httpBasicAuthConfig"
  ]);
  if (fromHttpBasicAuthConfig != null) {
    setValueByPath(toObject, ["httpBasicAuthConfig"], fromHttpBasicAuthConfig);
  }
  const fromOauthConfig = getValueByPath(fromObject, ["oauthConfig"]);
  if (fromOauthConfig != null) {
    setValueByPath(toObject, ["oauthConfig"], fromOauthConfig);
  }
  const fromOidcConfig = getValueByPath(fromObject, ["oidcConfig"]);
  if (fromOidcConfig != null) {
    setValueByPath(toObject, ["oidcConfig"], fromOidcConfig);
  }
  return toObject;
}
function googleMapsToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromAuthConfig = getValueByPath(fromObject, ["authConfig"]);
  if (fromAuthConfig != null) {
    setValueByPath(toObject, ["authConfig"], authConfigToVertex$2(apiClient, fromAuthConfig));
  }
  return toObject;
}
function toolToVertex$2(apiClient, fromObject) {
  const toObject = {};
  const fromRetrieval = getValueByPath(fromObject, ["retrieval"]);
  if (fromRetrieval != null) {
    setValueByPath(toObject, ["retrieval"], fromRetrieval);
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToVertex$2());
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], googleSearchRetrievalToVertex$2(apiClient, fromGoogleSearchRetrieval));
  }
  const fromEnterpriseWebSearch = getValueByPath(fromObject, [
    "enterpriseWebSearch"
  ]);
  if (fromEnterpriseWebSearch != null) {
    setValueByPath(toObject, ["enterpriseWebSearch"], enterpriseWebSearchToVertex$2());
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], googleMapsToVertex$2(apiClient, fromGoogleMaps));
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    setValueByPath(toObject, ["functionDeclarations"], fromFunctionDeclarations);
  }
  return toObject;
}
function functionCallingConfigToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromAllowedFunctionNames = getValueByPath(fromObject, [
    "allowedFunctionNames"
  ]);
  if (fromAllowedFunctionNames != null) {
    setValueByPath(toObject, ["allowedFunctionNames"], fromAllowedFunctionNames);
  }
  return toObject;
}
function latLngToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromLatitude = getValueByPath(fromObject, ["latitude"]);
  if (fromLatitude != null) {
    setValueByPath(toObject, ["latitude"], fromLatitude);
  }
  const fromLongitude = getValueByPath(fromObject, ["longitude"]);
  if (fromLongitude != null) {
    setValueByPath(toObject, ["longitude"], fromLongitude);
  }
  return toObject;
}
function retrievalConfigToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromLatLng = getValueByPath(fromObject, ["latLng"]);
  if (fromLatLng != null) {
    setValueByPath(toObject, ["latLng"], latLngToVertex$1(apiClient, fromLatLng));
  }
  return toObject;
}
function toolConfigToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], functionCallingConfigToVertex$1(apiClient, fromFunctionCallingConfig));
  }
  const fromRetrievalConfig = getValueByPath(fromObject, [
    "retrievalConfig"
  ]);
  if (fromRetrievalConfig != null) {
    setValueByPath(toObject, ["retrievalConfig"], retrievalConfigToVertex$1(apiClient, fromRetrievalConfig));
  }
  return toObject;
}
function createCachedContentConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromTtl = getValueByPath(fromObject, ["ttl"]);
  if (parentObject !== undefined && fromTtl != null) {
    setValueByPath(parentObject, ["ttl"], fromTtl);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== undefined && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== undefined && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (parentObject !== undefined && fromContents != null) {
    let transformedList = tContents(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToVertex$2(apiClient, item);
      });
    }
    setValueByPath(parentObject, ["contents"], transformedList);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== undefined && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToVertex$2(apiClient, tContent(apiClient, fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== undefined && fromTools != null) {
    let transformedList = fromTools;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToVertex$2(apiClient, item);
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== undefined && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToVertex$1(apiClient, fromToolConfig));
  }
  return toObject;
}
function createCachedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], tCachesModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], createCachedContentConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function getCachedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function deleteCachedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function updateCachedContentConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromTtl = getValueByPath(fromObject, ["ttl"]);
  if (parentObject !== undefined && fromTtl != null) {
    setValueByPath(parentObject, ["ttl"], fromTtl);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== undefined && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  return toObject;
}
function updateCachedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], updateCachedContentConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function listCachedContentsConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== undefined && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== undefined && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  return toObject;
}
function listCachedContentsParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], listCachedContentsConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function cachedContentFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], fromModel);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (fromExpireTime != null) {
    setValueByPath(toObject, ["expireTime"], fromExpireTime);
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], fromUsageMetadata);
  }
  return toObject;
}
function deleteCachedContentResponseFromMldev() {
  const toObject = {};
  return toObject;
}
function listCachedContentsResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromCachedContents = getValueByPath(fromObject, [
    "cachedContents"
  ]);
  if (fromCachedContents != null) {
    let transformedList = fromCachedContents;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return cachedContentFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["cachedContents"], transformedList);
  }
  return toObject;
}
function cachedContentFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], fromModel);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (fromExpireTime != null) {
    setValueByPath(toObject, ["expireTime"], fromExpireTime);
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], fromUsageMetadata);
  }
  return toObject;
}
function deleteCachedContentResponseFromVertex() {
  const toObject = {};
  return toObject;
}
function listCachedContentsResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromCachedContents = getValueByPath(fromObject, [
    "cachedContents"
  ]);
  if (fromCachedContents != null) {
    let transformedList = fromCachedContents;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return cachedContentFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["cachedContents"], transformedList);
  }
  return toObject;
}
var PagedItem;
(function(PagedItem2) {
  PagedItem2["PAGED_ITEM_BATCH_JOBS"] = "batchJobs";
  PagedItem2["PAGED_ITEM_MODELS"] = "models";
  PagedItem2["PAGED_ITEM_TUNING_JOBS"] = "tuningJobs";
  PagedItem2["PAGED_ITEM_FILES"] = "files";
  PagedItem2["PAGED_ITEM_CACHED_CONTENTS"] = "cachedContents";
})(PagedItem || (PagedItem = {}));

class Pager {
  constructor(name, request, response, params) {
    this.pageInternal = [];
    this.paramsInternal = {};
    this.requestInternal = request;
    this.init(name, response, params);
  }
  init(name, response, params) {
    var _a, _b;
    this.nameInternal = name;
    this.pageInternal = response[this.nameInternal] || [];
    this.idxInternal = 0;
    let requestParams = { config: {} };
    if (!params) {
      requestParams = { config: {} };
    } else if (typeof params === "object") {
      requestParams = Object.assign({}, params);
    } else {
      requestParams = params;
    }
    if (requestParams["config"]) {
      requestParams["config"]["pageToken"] = response["nextPageToken"];
    }
    this.paramsInternal = requestParams;
    this.pageInternalSize = (_b = (_a = requestParams["config"]) === null || _a === undefined ? undefined : _a["pageSize"]) !== null && _b !== undefined ? _b : this.pageInternal.length;
  }
  initNextPage(response) {
    this.init(this.nameInternal, response, this.paramsInternal);
  }
  get page() {
    return this.pageInternal;
  }
  get name() {
    return this.nameInternal;
  }
  get pageSize() {
    return this.pageInternalSize;
  }
  get params() {
    return this.paramsInternal;
  }
  get pageLength() {
    return this.pageInternal.length;
  }
  getItem(index) {
    return this.pageInternal[index];
  }
  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        if (this.idxInternal >= this.pageLength) {
          if (this.hasNextPage()) {
            await this.nextPage();
          } else {
            return { value: undefined, done: true };
          }
        }
        const item = this.getItem(this.idxInternal);
        this.idxInternal += 1;
        return { value: item, done: false };
      },
      return: async () => {
        return { value: undefined, done: true };
      }
    };
  }
  async nextPage() {
    if (!this.hasNextPage()) {
      throw new Error("No more pages to fetch.");
    }
    const response = await this.requestInternal(this.params);
    this.initNextPage(response);
    return this.page;
  }
  hasNextPage() {
    var _a;
    if (((_a = this.params["config"]) === null || _a === undefined ? undefined : _a["pageToken"]) !== undefined) {
      return true;
    }
    return false;
  }
}
var Outcome;
(function(Outcome2) {
  Outcome2["OUTCOME_UNSPECIFIED"] = "OUTCOME_UNSPECIFIED";
  Outcome2["OUTCOME_OK"] = "OUTCOME_OK";
  Outcome2["OUTCOME_FAILED"] = "OUTCOME_FAILED";
  Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "OUTCOME_DEADLINE_EXCEEDED";
})(Outcome || (Outcome = {}));
var Language;
(function(Language2) {
  Language2["LANGUAGE_UNSPECIFIED"] = "LANGUAGE_UNSPECIFIED";
  Language2["PYTHON"] = "PYTHON";
})(Language || (Language = {}));
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockMethod;
(function(HarmBlockMethod2) {
  HarmBlockMethod2["HARM_BLOCK_METHOD_UNSPECIFIED"] = "HARM_BLOCK_METHOD_UNSPECIFIED";
  HarmBlockMethod2["SEVERITY"] = "SEVERITY";
  HarmBlockMethod2["PROBABILITY"] = "PROBABILITY";
})(HarmBlockMethod || (HarmBlockMethod = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
  HarmBlockThreshold2["OFF"] = "OFF";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var Mode;
(function(Mode2) {
  Mode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  Mode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(Mode || (Mode = {}));
var AuthType;
(function(AuthType2) {
  AuthType2["AUTH_TYPE_UNSPECIFIED"] = "AUTH_TYPE_UNSPECIFIED";
  AuthType2["NO_AUTH"] = "NO_AUTH";
  AuthType2["API_KEY_AUTH"] = "API_KEY_AUTH";
  AuthType2["HTTP_BASIC_AUTH"] = "HTTP_BASIC_AUTH";
  AuthType2["GOOGLE_SERVICE_ACCOUNT_AUTH"] = "GOOGLE_SERVICE_ACCOUNT_AUTH";
  AuthType2["OAUTH"] = "OAUTH";
  AuthType2["OIDC_AUTH"] = "OIDC_AUTH";
})(AuthType || (AuthType = {}));
var Type;
(function(Type2) {
  Type2["TYPE_UNSPECIFIED"] = "TYPE_UNSPECIFIED";
  Type2["STRING"] = "STRING";
  Type2["NUMBER"] = "NUMBER";
  Type2["INTEGER"] = "INTEGER";
  Type2["BOOLEAN"] = "BOOLEAN";
  Type2["ARRAY"] = "ARRAY";
  Type2["OBJECT"] = "OBJECT";
})(Type || (Type = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["LANGUAGE"] = "LANGUAGE";
  FinishReason2["OTHER"] = "OTHER";
  FinishReason2["BLOCKLIST"] = "BLOCKLIST";
  FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
  FinishReason2["SPII"] = "SPII";
  FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
  FinishReason2["IMAGE_SAFETY"] = "IMAGE_SAFETY";
})(FinishReason || (FinishReason = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var HarmSeverity;
(function(HarmSeverity2) {
  HarmSeverity2["HARM_SEVERITY_UNSPECIFIED"] = "HARM_SEVERITY_UNSPECIFIED";
  HarmSeverity2["HARM_SEVERITY_NEGLIGIBLE"] = "HARM_SEVERITY_NEGLIGIBLE";
  HarmSeverity2["HARM_SEVERITY_LOW"] = "HARM_SEVERITY_LOW";
  HarmSeverity2["HARM_SEVERITY_MEDIUM"] = "HARM_SEVERITY_MEDIUM";
  HarmSeverity2["HARM_SEVERITY_HIGH"] = "HARM_SEVERITY_HIGH";
})(HarmSeverity || (HarmSeverity = {}));
var BlockedReason;
(function(BlockedReason2) {
  BlockedReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockedReason2["SAFETY"] = "SAFETY";
  BlockedReason2["OTHER"] = "OTHER";
  BlockedReason2["BLOCKLIST"] = "BLOCKLIST";
  BlockedReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
})(BlockedReason || (BlockedReason = {}));
var TrafficType;
(function(TrafficType2) {
  TrafficType2["TRAFFIC_TYPE_UNSPECIFIED"] = "TRAFFIC_TYPE_UNSPECIFIED";
  TrafficType2["ON_DEMAND"] = "ON_DEMAND";
  TrafficType2["PROVISIONED_THROUGHPUT"] = "PROVISIONED_THROUGHPUT";
})(TrafficType || (TrafficType = {}));
var Modality;
(function(Modality2) {
  Modality2["MODALITY_UNSPECIFIED"] = "MODALITY_UNSPECIFIED";
  Modality2["TEXT"] = "TEXT";
  Modality2["IMAGE"] = "IMAGE";
  Modality2["AUDIO"] = "AUDIO";
})(Modality || (Modality = {}));
var MediaResolution;
(function(MediaResolution2) {
  MediaResolution2["MEDIA_RESOLUTION_UNSPECIFIED"] = "MEDIA_RESOLUTION_UNSPECIFIED";
  MediaResolution2["MEDIA_RESOLUTION_LOW"] = "MEDIA_RESOLUTION_LOW";
  MediaResolution2["MEDIA_RESOLUTION_MEDIUM"] = "MEDIA_RESOLUTION_MEDIUM";
  MediaResolution2["MEDIA_RESOLUTION_HIGH"] = "MEDIA_RESOLUTION_HIGH";
})(MediaResolution || (MediaResolution = {}));
var JobState;
(function(JobState2) {
  JobState2["JOB_STATE_UNSPECIFIED"] = "JOB_STATE_UNSPECIFIED";
  JobState2["JOB_STATE_QUEUED"] = "JOB_STATE_QUEUED";
  JobState2["JOB_STATE_PENDING"] = "JOB_STATE_PENDING";
  JobState2["JOB_STATE_RUNNING"] = "JOB_STATE_RUNNING";
  JobState2["JOB_STATE_SUCCEEDED"] = "JOB_STATE_SUCCEEDED";
  JobState2["JOB_STATE_FAILED"] = "JOB_STATE_FAILED";
  JobState2["JOB_STATE_CANCELLING"] = "JOB_STATE_CANCELLING";
  JobState2["JOB_STATE_CANCELLED"] = "JOB_STATE_CANCELLED";
  JobState2["JOB_STATE_PAUSED"] = "JOB_STATE_PAUSED";
  JobState2["JOB_STATE_EXPIRED"] = "JOB_STATE_EXPIRED";
  JobState2["JOB_STATE_UPDATING"] = "JOB_STATE_UPDATING";
  JobState2["JOB_STATE_PARTIALLY_SUCCEEDED"] = "JOB_STATE_PARTIALLY_SUCCEEDED";
})(JobState || (JobState = {}));
var AdapterSize;
(function(AdapterSize2) {
  AdapterSize2["ADAPTER_SIZE_UNSPECIFIED"] = "ADAPTER_SIZE_UNSPECIFIED";
  AdapterSize2["ADAPTER_SIZE_ONE"] = "ADAPTER_SIZE_ONE";
  AdapterSize2["ADAPTER_SIZE_TWO"] = "ADAPTER_SIZE_TWO";
  AdapterSize2["ADAPTER_SIZE_FOUR"] = "ADAPTER_SIZE_FOUR";
  AdapterSize2["ADAPTER_SIZE_EIGHT"] = "ADAPTER_SIZE_EIGHT";
  AdapterSize2["ADAPTER_SIZE_SIXTEEN"] = "ADAPTER_SIZE_SIXTEEN";
  AdapterSize2["ADAPTER_SIZE_THIRTY_TWO"] = "ADAPTER_SIZE_THIRTY_TWO";
})(AdapterSize || (AdapterSize = {}));
var FeatureSelectionPreference;
(function(FeatureSelectionPreference2) {
  FeatureSelectionPreference2["FEATURE_SELECTION_PREFERENCE_UNSPECIFIED"] = "FEATURE_SELECTION_PREFERENCE_UNSPECIFIED";
  FeatureSelectionPreference2["PRIORITIZE_QUALITY"] = "PRIORITIZE_QUALITY";
  FeatureSelectionPreference2["BALANCED"] = "BALANCED";
  FeatureSelectionPreference2["PRIORITIZE_COST"] = "PRIORITIZE_COST";
})(FeatureSelectionPreference || (FeatureSelectionPreference = {}));
var DynamicRetrievalConfigMode;
(function(DynamicRetrievalConfigMode2) {
  DynamicRetrievalConfigMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  DynamicRetrievalConfigMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(DynamicRetrievalConfigMode || (DynamicRetrievalConfigMode = {}));
var FunctionCallingConfigMode;
(function(FunctionCallingConfigMode2) {
  FunctionCallingConfigMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  FunctionCallingConfigMode2["AUTO"] = "AUTO";
  FunctionCallingConfigMode2["ANY"] = "ANY";
  FunctionCallingConfigMode2["NONE"] = "NONE";
})(FunctionCallingConfigMode || (FunctionCallingConfigMode = {}));
var SafetyFilterLevel;
(function(SafetyFilterLevel2) {
  SafetyFilterLevel2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  SafetyFilterLevel2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  SafetyFilterLevel2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  SafetyFilterLevel2["BLOCK_NONE"] = "BLOCK_NONE";
})(SafetyFilterLevel || (SafetyFilterLevel = {}));
var PersonGeneration;
(function(PersonGeneration2) {
  PersonGeneration2["DONT_ALLOW"] = "DONT_ALLOW";
  PersonGeneration2["ALLOW_ADULT"] = "ALLOW_ADULT";
  PersonGeneration2["ALLOW_ALL"] = "ALLOW_ALL";
})(PersonGeneration || (PersonGeneration = {}));
var ImagePromptLanguage;
(function(ImagePromptLanguage2) {
  ImagePromptLanguage2["auto"] = "auto";
  ImagePromptLanguage2["en"] = "en";
  ImagePromptLanguage2["ja"] = "ja";
  ImagePromptLanguage2["ko"] = "ko";
  ImagePromptLanguage2["hi"] = "hi";
})(ImagePromptLanguage || (ImagePromptLanguage = {}));
var MaskReferenceMode;
(function(MaskReferenceMode2) {
  MaskReferenceMode2["MASK_MODE_DEFAULT"] = "MASK_MODE_DEFAULT";
  MaskReferenceMode2["MASK_MODE_USER_PROVIDED"] = "MASK_MODE_USER_PROVIDED";
  MaskReferenceMode2["MASK_MODE_BACKGROUND"] = "MASK_MODE_BACKGROUND";
  MaskReferenceMode2["MASK_MODE_FOREGROUND"] = "MASK_MODE_FOREGROUND";
  MaskReferenceMode2["MASK_MODE_SEMANTIC"] = "MASK_MODE_SEMANTIC";
})(MaskReferenceMode || (MaskReferenceMode = {}));
var ControlReferenceType;
(function(ControlReferenceType2) {
  ControlReferenceType2["CONTROL_TYPE_DEFAULT"] = "CONTROL_TYPE_DEFAULT";
  ControlReferenceType2["CONTROL_TYPE_CANNY"] = "CONTROL_TYPE_CANNY";
  ControlReferenceType2["CONTROL_TYPE_SCRIBBLE"] = "CONTROL_TYPE_SCRIBBLE";
  ControlReferenceType2["CONTROL_TYPE_FACE_MESH"] = "CONTROL_TYPE_FACE_MESH";
})(ControlReferenceType || (ControlReferenceType = {}));
var SubjectReferenceType;
(function(SubjectReferenceType2) {
  SubjectReferenceType2["SUBJECT_TYPE_DEFAULT"] = "SUBJECT_TYPE_DEFAULT";
  SubjectReferenceType2["SUBJECT_TYPE_PERSON"] = "SUBJECT_TYPE_PERSON";
  SubjectReferenceType2["SUBJECT_TYPE_ANIMAL"] = "SUBJECT_TYPE_ANIMAL";
  SubjectReferenceType2["SUBJECT_TYPE_PRODUCT"] = "SUBJECT_TYPE_PRODUCT";
})(SubjectReferenceType || (SubjectReferenceType = {}));
var EditMode;
(function(EditMode2) {
  EditMode2["EDIT_MODE_DEFAULT"] = "EDIT_MODE_DEFAULT";
  EditMode2["EDIT_MODE_INPAINT_REMOVAL"] = "EDIT_MODE_INPAINT_REMOVAL";
  EditMode2["EDIT_MODE_INPAINT_INSERTION"] = "EDIT_MODE_INPAINT_INSERTION";
  EditMode2["EDIT_MODE_OUTPAINT"] = "EDIT_MODE_OUTPAINT";
  EditMode2["EDIT_MODE_CONTROLLED_EDITING"] = "EDIT_MODE_CONTROLLED_EDITING";
  EditMode2["EDIT_MODE_STYLE"] = "EDIT_MODE_STYLE";
  EditMode2["EDIT_MODE_BGSWAP"] = "EDIT_MODE_BGSWAP";
  EditMode2["EDIT_MODE_PRODUCT_IMAGE"] = "EDIT_MODE_PRODUCT_IMAGE";
})(EditMode || (EditMode = {}));
var FileState;
(function(FileState2) {
  FileState2["STATE_UNSPECIFIED"] = "STATE_UNSPECIFIED";
  FileState2["PROCESSING"] = "PROCESSING";
  FileState2["ACTIVE"] = "ACTIVE";
  FileState2["FAILED"] = "FAILED";
})(FileState || (FileState = {}));
var FileSource;
(function(FileSource2) {
  FileSource2["SOURCE_UNSPECIFIED"] = "SOURCE_UNSPECIFIED";
  FileSource2["UPLOADED"] = "UPLOADED";
  FileSource2["GENERATED"] = "GENERATED";
})(FileSource || (FileSource = {}));
var MediaModality;
(function(MediaModality2) {
  MediaModality2["MODALITY_UNSPECIFIED"] = "MODALITY_UNSPECIFIED";
  MediaModality2["TEXT"] = "TEXT";
  MediaModality2["IMAGE"] = "IMAGE";
  MediaModality2["VIDEO"] = "VIDEO";
  MediaModality2["AUDIO"] = "AUDIO";
  MediaModality2["DOCUMENT"] = "DOCUMENT";
})(MediaModality || (MediaModality = {}));
var StartSensitivity;
(function(StartSensitivity2) {
  StartSensitivity2["START_SENSITIVITY_UNSPECIFIED"] = "START_SENSITIVITY_UNSPECIFIED";
  StartSensitivity2["START_SENSITIVITY_HIGH"] = "START_SENSITIVITY_HIGH";
  StartSensitivity2["START_SENSITIVITY_LOW"] = "START_SENSITIVITY_LOW";
})(StartSensitivity || (StartSensitivity = {}));
var EndSensitivity;
(function(EndSensitivity2) {
  EndSensitivity2["END_SENSITIVITY_UNSPECIFIED"] = "END_SENSITIVITY_UNSPECIFIED";
  EndSensitivity2["END_SENSITIVITY_HIGH"] = "END_SENSITIVITY_HIGH";
  EndSensitivity2["END_SENSITIVITY_LOW"] = "END_SENSITIVITY_LOW";
})(EndSensitivity || (EndSensitivity = {}));
var ActivityHandling;
(function(ActivityHandling2) {
  ActivityHandling2["ACTIVITY_HANDLING_UNSPECIFIED"] = "ACTIVITY_HANDLING_UNSPECIFIED";
  ActivityHandling2["START_OF_ACTIVITY_INTERRUPTS"] = "START_OF_ACTIVITY_INTERRUPTS";
  ActivityHandling2["NO_INTERRUPTION"] = "NO_INTERRUPTION";
})(ActivityHandling || (ActivityHandling = {}));
var TurnCoverage;
(function(TurnCoverage2) {
  TurnCoverage2["TURN_COVERAGE_UNSPECIFIED"] = "TURN_COVERAGE_UNSPECIFIED";
  TurnCoverage2["TURN_INCLUDES_ONLY_ACTIVITY"] = "TURN_INCLUDES_ONLY_ACTIVITY";
  TurnCoverage2["TURN_INCLUDES_ALL_INPUT"] = "TURN_INCLUDES_ALL_INPUT";
})(TurnCoverage || (TurnCoverage = {}));
class GenerateContentResponse {
  get text() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (((_d = (_c = (_b = (_a = this.candidates) === null || _a === undefined ? undefined : _a[0]) === null || _b === undefined ? undefined : _b.content) === null || _c === undefined ? undefined : _c.parts) === null || _d === undefined ? undefined : _d.length) === 0) {
      return;
    }
    if (this.candidates && this.candidates.length > 1) {
      console.warn("there are multiple candidates in the response, returning text from the first one.");
    }
    let text = "";
    let anyTextPartText = false;
    const nonTextParts = [];
    for (const part of (_h = (_g = (_f = (_e = this.candidates) === null || _e === undefined ? undefined : _e[0]) === null || _f === undefined ? undefined : _f.content) === null || _g === undefined ? undefined : _g.parts) !== null && _h !== undefined ? _h : []) {
      for (const [fieldName, fieldValue] of Object.entries(part)) {
        if (fieldName !== "text" && fieldName !== "thought" && (fieldValue !== null || fieldValue !== undefined)) {
          nonTextParts.push(fieldName);
        }
      }
      if (typeof part.text === "string") {
        if (typeof part.thought === "boolean" && part.thought) {
          continue;
        }
        anyTextPartText = true;
        text += part.text;
      }
    }
    if (nonTextParts.length > 0) {
      console.warn(`there are non-text parts ${nonTextParts} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`);
    }
    return anyTextPartText ? text : undefined;
  }
  get data() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (((_d = (_c = (_b = (_a = this.candidates) === null || _a === undefined ? undefined : _a[0]) === null || _b === undefined ? undefined : _b.content) === null || _c === undefined ? undefined : _c.parts) === null || _d === undefined ? undefined : _d.length) === 0) {
      return;
    }
    if (this.candidates && this.candidates.length > 1) {
      console.warn("there are multiple candidates in the response, returning data from the first one.");
    }
    let data = "";
    const nonDataParts = [];
    for (const part of (_h = (_g = (_f = (_e = this.candidates) === null || _e === undefined ? undefined : _e[0]) === null || _f === undefined ? undefined : _f.content) === null || _g === undefined ? undefined : _g.parts) !== null && _h !== undefined ? _h : []) {
      for (const [fieldName, fieldValue] of Object.entries(part)) {
        if (fieldName !== "inlineData" && (fieldValue !== null || fieldValue !== undefined)) {
          nonDataParts.push(fieldName);
        }
      }
      if (part.inlineData && typeof part.inlineData.data === "string") {
        data += atob(part.inlineData.data);
      }
    }
    if (nonDataParts.length > 0) {
      console.warn(`there are non-data parts ${nonDataParts} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`);
    }
    return data.length > 0 ? btoa(data) : undefined;
  }
  get functionCalls() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (((_d = (_c = (_b = (_a = this.candidates) === null || _a === undefined ? undefined : _a[0]) === null || _b === undefined ? undefined : _b.content) === null || _c === undefined ? undefined : _c.parts) === null || _d === undefined ? undefined : _d.length) === 0) {
      return;
    }
    if (this.candidates && this.candidates.length > 1) {
      console.warn("there are multiple candidates in the response, returning function calls from the first one.");
    }
    const functionCalls = (_h = (_g = (_f = (_e = this.candidates) === null || _e === undefined ? undefined : _e[0]) === null || _f === undefined ? undefined : _f.content) === null || _g === undefined ? undefined : _g.parts) === null || _h === undefined ? undefined : _h.filter((part) => part.functionCall).map((part) => part.functionCall).filter((functionCall) => functionCall !== undefined);
    if ((functionCalls === null || functionCalls === undefined ? undefined : functionCalls.length) === 0) {
      return;
    }
    return functionCalls;
  }
  get executableCode() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (((_d = (_c = (_b = (_a = this.candidates) === null || _a === undefined ? undefined : _a[0]) === null || _b === undefined ? undefined : _b.content) === null || _c === undefined ? undefined : _c.parts) === null || _d === undefined ? undefined : _d.length) === 0) {
      return;
    }
    if (this.candidates && this.candidates.length > 1) {
      console.warn("there are multiple candidates in the response, returning executable code from the first one.");
    }
    const executableCode = (_h = (_g = (_f = (_e = this.candidates) === null || _e === undefined ? undefined : _e[0]) === null || _f === undefined ? undefined : _f.content) === null || _g === undefined ? undefined : _g.parts) === null || _h === undefined ? undefined : _h.filter((part) => part.executableCode).map((part) => part.executableCode).filter((executableCode2) => executableCode2 !== undefined);
    if ((executableCode === null || executableCode === undefined ? undefined : executableCode.length) === 0) {
      return;
    }
    return (_j = executableCode === null || executableCode === undefined ? undefined : executableCode[0]) === null || _j === undefined ? undefined : _j.code;
  }
  get codeExecutionResult() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (((_d = (_c = (_b = (_a = this.candidates) === null || _a === undefined ? undefined : _a[0]) === null || _b === undefined ? undefined : _b.content) === null || _c === undefined ? undefined : _c.parts) === null || _d === undefined ? undefined : _d.length) === 0) {
      return;
    }
    if (this.candidates && this.candidates.length > 1) {
      console.warn("there are multiple candidates in the response, returning code execution result from the first one.");
    }
    const codeExecutionResult = (_h = (_g = (_f = (_e = this.candidates) === null || _e === undefined ? undefined : _e[0]) === null || _f === undefined ? undefined : _f.content) === null || _g === undefined ? undefined : _g.parts) === null || _h === undefined ? undefined : _h.filter((part) => part.codeExecutionResult).map((part) => part.codeExecutionResult).filter((codeExecutionResult2) => codeExecutionResult2 !== undefined);
    if ((codeExecutionResult === null || codeExecutionResult === undefined ? undefined : codeExecutionResult.length) === 0) {
      return;
    }
    return (_j = codeExecutionResult === null || codeExecutionResult === undefined ? undefined : codeExecutionResult[0]) === null || _j === undefined ? undefined : _j.output;
  }
}

class EmbedContentResponse {
}

class GenerateImagesResponse {
}

class EditImageResponse {
}

class UpscaleImageResponse {
}

class ListModelsResponse {
}

class DeleteModelResponse {
}

class CountTokensResponse {
}

class ComputeTokensResponse {
}
class ListTuningJobsResponse {
}

class DeleteCachedContentResponse {
}

class ListCachedContentsResponse {
}

class ListFilesResponse {
}

class HttpResponse {
  constructor(response) {
    const headers = {};
    for (const pair of response.headers.entries()) {
      headers[pair[0]] = pair[1];
    }
    this.headers = headers;
    this.responseInternal = response;
  }
  json() {
    return this.responseInternal.json();
  }
}

class CreateFileResponse {
}

class DeleteFileResponse {
}
class LiveServerMessage {
  get text() {
    var _a, _b, _c;
    let text = "";
    let anyTextPartFound = false;
    const nonTextParts = [];
    for (const part of (_c = (_b = (_a = this.serverContent) === null || _a === undefined ? undefined : _a.modelTurn) === null || _b === undefined ? undefined : _b.parts) !== null && _c !== undefined ? _c : []) {
      for (const [fieldName, fieldValue] of Object.entries(part)) {
        if (fieldName !== "text" && fieldName !== "thought" && fieldValue !== null) {
          nonTextParts.push(fieldName);
        }
      }
      if (typeof part.text === "string") {
        if (typeof part.thought === "boolean" && part.thought) {
          continue;
        }
        anyTextPartFound = true;
        text += part.text;
      }
    }
    if (nonTextParts.length > 0) {
      console.warn(`there are non-text parts ${nonTextParts} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`);
    }
    return anyTextPartFound ? text : undefined;
  }
  get data() {
    var _a, _b, _c;
    let data = "";
    const nonDataParts = [];
    for (const part of (_c = (_b = (_a = this.serverContent) === null || _a === undefined ? undefined : _a.modelTurn) === null || _b === undefined ? undefined : _b.parts) !== null && _c !== undefined ? _c : []) {
      for (const [fieldName, fieldValue] of Object.entries(part)) {
        if (fieldName !== "inlineData" && fieldValue !== null) {
          nonDataParts.push(fieldName);
        }
      }
      if (part.inlineData && typeof part.inlineData.data === "string") {
        data += atob(part.inlineData.data);
      }
    }
    if (nonDataParts.length > 0) {
      console.warn(`there are non-data parts ${nonDataParts} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`);
    }
    return data.length > 0 ? btoa(data) : undefined;
  }
}
class Caches extends BaseModule {
  constructor(apiClient) {
    super();
    this.apiClient = apiClient;
    this.list = async (params = {}) => {
      return new Pager(PagedItem.PAGED_ITEM_CACHED_CONTENTS, (x) => this.listInternal(x), await this.listInternal(params), params);
    };
  }
  async create(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = createCachedContentParametersToVertex(this.apiClient, params);
      path = formatMap("cachedContents", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = cachedContentFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      const body = createCachedContentParametersToMldev(this.apiClient, params);
      path = formatMap("cachedContents", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = cachedContentFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
  async get(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = getCachedContentParametersToVertex(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = cachedContentFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      const body = getCachedContentParametersToMldev(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = cachedContentFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
  async delete(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = deleteCachedContentParametersToVertex(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "DELETE",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then(() => {
        const resp = deleteCachedContentResponseFromVertex();
        const typedResp = new DeleteCachedContentResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = deleteCachedContentParametersToMldev(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "DELETE",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then(() => {
        const resp = deleteCachedContentResponseFromMldev();
        const typedResp = new DeleteCachedContentResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async update(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = updateCachedContentParametersToVertex(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "PATCH",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = cachedContentFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      const body = updateCachedContentParametersToMldev(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "PATCH",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = cachedContentFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
  async listInternal(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = listCachedContentsParametersToVertex(this.apiClient, params);
      path = formatMap("cachedContents", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = listCachedContentsResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new ListCachedContentsResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = listCachedContentsParametersToMldev(this.apiClient, params);
      path = formatMap("cachedContents", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = listCachedContentsResponseFromMldev(this.apiClient, apiResponse);
        const typedResp = new ListCachedContentsResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = undefined;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function isValidResponse(response) {
  var _a;
  if (response.candidates == undefined || response.candidates.length === 0) {
    return false;
  }
  const content = (_a = response.candidates[0]) === null || _a === undefined ? undefined : _a.content;
  if (content === undefined) {
    return false;
  }
  return isValidContent(content);
}
function isValidContent(content) {
  if (content.parts === undefined || content.parts.length === 0) {
    return false;
  }
  for (const part of content.parts) {
    if (part === undefined || Object.keys(part).length === 0) {
      return false;
    }
    if (part.text !== undefined && part.text === "") {
      return false;
    }
  }
  return true;
}
function validateHistory(history) {
  if (history.length === 0) {
    return;
  }
  if (history[0].role !== "user") {
    throw new Error("History must start with a user turn.");
  }
  for (const content of history) {
    if (content.role !== "user" && content.role !== "model") {
      throw new Error(`Role must be user or model, but got ${content.role}.`);
    }
  }
}
function extractCuratedHistory(comprehensiveHistory) {
  if (comprehensiveHistory === undefined || comprehensiveHistory.length === 0) {
    return [];
  }
  const curatedHistory = [];
  const length = comprehensiveHistory.length;
  let i = 0;
  let userInput = comprehensiveHistory[0];
  while (i < length) {
    if (comprehensiveHistory[i].role === "user") {
      userInput = comprehensiveHistory[i];
      i++;
    } else {
      const modelOutput = [];
      let isValid = true;
      while (i < length && comprehensiveHistory[i].role === "model") {
        modelOutput.push(comprehensiveHistory[i]);
        if (isValid && !isValidContent(comprehensiveHistory[i])) {
          isValid = false;
        }
        i++;
      }
      if (isValid) {
        curatedHistory.push(userInput);
        curatedHistory.push(...modelOutput);
      }
    }
  }
  return curatedHistory;
}

class Chats {
  constructor(modelsModule, apiClient) {
    this.modelsModule = modelsModule;
    this.apiClient = apiClient;
  }
  create(params) {
    return new Chat(this.apiClient, this.modelsModule, params.model, params.config, params.history);
  }
}

class Chat {
  constructor(apiClient, modelsModule, model, config = {}, history = []) {
    this.apiClient = apiClient;
    this.modelsModule = modelsModule;
    this.model = model;
    this.config = config;
    this.history = history;
    this.sendPromise = Promise.resolve();
    validateHistory(history);
  }
  async sendMessage(params) {
    var _a;
    await this.sendPromise;
    const inputContent = tContent(this.apiClient, params.message);
    const responsePromise = this.modelsModule.generateContent({
      model: this.model,
      contents: this.getHistory(true).concat(inputContent),
      config: (_a = params.config) !== null && _a !== undefined ? _a : this.config
    });
    this.sendPromise = (async () => {
      var _a2, _b;
      const response = await responsePromise;
      const outputContent = (_b = (_a2 = response.candidates) === null || _a2 === undefined ? undefined : _a2[0]) === null || _b === undefined ? undefined : _b.content;
      const modelOutput = outputContent ? [outputContent] : [];
      this.recordHistory(inputContent, modelOutput);
      return;
    })();
    await this.sendPromise;
    return responsePromise;
  }
  async sendMessageStream(params) {
    var _a;
    await this.sendPromise;
    const inputContent = tContent(this.apiClient, params.message);
    const streamResponse = this.modelsModule.generateContentStream({
      model: this.model,
      contents: this.getHistory(true).concat(inputContent),
      config: (_a = params.config) !== null && _a !== undefined ? _a : this.config
    });
    this.sendPromise = streamResponse.then(() => {
      return;
    }).catch(() => {
      return;
    });
    const response = await streamResponse;
    const result = this.processStreamResponse(response, inputContent);
    return result;
  }
  getHistory(curated = false) {
    return curated ? extractCuratedHistory(this.history) : this.history;
  }
  processStreamResponse(streamResponse, inputContent) {
    var _a, _b;
    return __asyncGenerator(this, arguments, function* processStreamResponse_1() {
      var _c, e_1, _d, _e;
      const outputContent = [];
      try {
        for (var _f = true, streamResponse_1 = __asyncValues(streamResponse), streamResponse_1_1;streamResponse_1_1 = yield __await(streamResponse_1.next()), _c = streamResponse_1_1.done, !_c; _f = true) {
          _e = streamResponse_1_1.value;
          _f = false;
          const chunk = _e;
          if (isValidResponse(chunk)) {
            const content = (_b = (_a = chunk.candidates) === null || _a === undefined ? undefined : _a[0]) === null || _b === undefined ? undefined : _b.content;
            if (content !== undefined) {
              outputContent.push(content);
            }
          }
          yield yield __await(chunk);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (!_f && !_c && (_d = streamResponse_1.return))
            yield __await(_d.call(streamResponse_1));
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      this.recordHistory(inputContent, outputContent);
    });
  }
  recordHistory(userInput, modelOutput) {
    let outputContents = [];
    if (modelOutput.length > 0 && modelOutput.every((content) => content.role === "model")) {
      outputContents = modelOutput;
    } else {
      outputContents.push({
        role: "model",
        parts: []
      });
    }
    this.history.push(userInput);
    this.history.push(...outputContents);
  }
}
function listFilesConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== undefined && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== undefined && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  return toObject;
}
function listFilesParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], listFilesConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function fileStatusToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromDetails = getValueByPath(fromObject, ["details"]);
  if (fromDetails != null) {
    setValueByPath(toObject, ["details"], fromDetails);
  }
  const fromMessage = getValueByPath(fromObject, ["message"]);
  if (fromMessage != null) {
    setValueByPath(toObject, ["message"], fromMessage);
  }
  const fromCode = getValueByPath(fromObject, ["code"]);
  if (fromCode != null) {
    setValueByPath(toObject, ["code"], fromCode);
  }
  return toObject;
}
function fileToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  const fromSizeBytes = getValueByPath(fromObject, ["sizeBytes"]);
  if (fromSizeBytes != null) {
    setValueByPath(toObject, ["sizeBytes"], fromSizeBytes);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromExpirationTime = getValueByPath(fromObject, [
    "expirationTime"
  ]);
  if (fromExpirationTime != null) {
    setValueByPath(toObject, ["expirationTime"], fromExpirationTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromSha256Hash = getValueByPath(fromObject, ["sha256Hash"]);
  if (fromSha256Hash != null) {
    setValueByPath(toObject, ["sha256Hash"], fromSha256Hash);
  }
  const fromUri = getValueByPath(fromObject, ["uri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromDownloadUri = getValueByPath(fromObject, ["downloadUri"]);
  if (fromDownloadUri != null) {
    setValueByPath(toObject, ["downloadUri"], fromDownloadUri);
  }
  const fromState = getValueByPath(fromObject, ["state"]);
  if (fromState != null) {
    setValueByPath(toObject, ["state"], fromState);
  }
  const fromSource = getValueByPath(fromObject, ["source"]);
  if (fromSource != null) {
    setValueByPath(toObject, ["source"], fromSource);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fileStatusToMldev(apiClient, fromError));
  }
  return toObject;
}
function createFileParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromFile = getValueByPath(fromObject, ["file"]);
  if (fromFile != null) {
    setValueByPath(toObject, ["file"], fileToMldev(apiClient, fromFile));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function getFileParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "file"], tFileName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function deleteFileParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "file"], tFileName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function fileStatusFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromDetails = getValueByPath(fromObject, ["details"]);
  if (fromDetails != null) {
    setValueByPath(toObject, ["details"], fromDetails);
  }
  const fromMessage = getValueByPath(fromObject, ["message"]);
  if (fromMessage != null) {
    setValueByPath(toObject, ["message"], fromMessage);
  }
  const fromCode = getValueByPath(fromObject, ["code"]);
  if (fromCode != null) {
    setValueByPath(toObject, ["code"], fromCode);
  }
  return toObject;
}
function fileFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  const fromSizeBytes = getValueByPath(fromObject, ["sizeBytes"]);
  if (fromSizeBytes != null) {
    setValueByPath(toObject, ["sizeBytes"], fromSizeBytes);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromExpirationTime = getValueByPath(fromObject, [
    "expirationTime"
  ]);
  if (fromExpirationTime != null) {
    setValueByPath(toObject, ["expirationTime"], fromExpirationTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromSha256Hash = getValueByPath(fromObject, ["sha256Hash"]);
  if (fromSha256Hash != null) {
    setValueByPath(toObject, ["sha256Hash"], fromSha256Hash);
  }
  const fromUri = getValueByPath(fromObject, ["uri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromDownloadUri = getValueByPath(fromObject, ["downloadUri"]);
  if (fromDownloadUri != null) {
    setValueByPath(toObject, ["downloadUri"], fromDownloadUri);
  }
  const fromState = getValueByPath(fromObject, ["state"]);
  if (fromState != null) {
    setValueByPath(toObject, ["state"], fromState);
  }
  const fromSource = getValueByPath(fromObject, ["source"]);
  if (fromSource != null) {
    setValueByPath(toObject, ["source"], fromSource);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fileStatusFromMldev(apiClient, fromError));
  }
  return toObject;
}
function listFilesResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromFiles = getValueByPath(fromObject, ["files"]);
  if (fromFiles != null) {
    let transformedList = fromFiles;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return fileFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["files"], transformedList);
  }
  return toObject;
}
function createFileResponseFromMldev() {
  const toObject = {};
  return toObject;
}
function deleteFileResponseFromMldev() {
  const toObject = {};
  return toObject;
}

class Files extends BaseModule {
  constructor(apiClient) {
    super();
    this.apiClient = apiClient;
    this.list = async (params = {}) => {
      return new Pager(PagedItem.PAGED_ITEM_FILES, (x) => this.listInternal(x), await this.listInternal(params), params);
    };
  }
  async upload(params) {
    if (this.apiClient.isVertexAI()) {
      throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");
    }
    return this.apiClient.uploadFile(params.file, params.config).then((response) => {
      const file = fileFromMldev(this.apiClient, response);
      return file;
    });
  }
  async download(params) {
    await this.apiClient.downloadFile(params);
  }
  async listInternal(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      throw new Error("This method is only supported by the Gemini Developer API.");
    } else {
      const body = listFilesParametersToMldev(this.apiClient, params);
      path = formatMap("files", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = listFilesResponseFromMldev(this.apiClient, apiResponse);
        const typedResp = new ListFilesResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async createInternal(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      throw new Error("This method is only supported by the Gemini Developer API.");
    } else {
      const body = createFileParametersToMldev(this.apiClient, params);
      path = formatMap("upload/v1beta/files", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then(() => {
        const resp = createFileResponseFromMldev();
        const typedResp = new CreateFileResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async get(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      throw new Error("This method is only supported by the Gemini Developer API.");
    } else {
      const body = getFileParametersToMldev(this.apiClient, params);
      path = formatMap("files/{file}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = fileFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
  async delete(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      throw new Error("This method is only supported by the Gemini Developer API.");
    } else {
      const body = deleteFileParametersToMldev(this.apiClient, params);
      path = formatMap("files/{file}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "DELETE",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then(() => {
        const resp = deleteFileResponseFromMldev();
        const typedResp = new DeleteFileResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
}
function blobToMldev$1(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["displayName"]) !== undefined) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function blobToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function partToMldev$1(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["videoMetadata"]) !== undefined) {
    throw new Error("videoMetadata parameter is not supported in Gemini API.");
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToMldev$1(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function partToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToVertex$1(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function contentToMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToMldev$1(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function contentToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToVertex$1(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function googleSearchToMldev$1() {
  const toObject = {};
  return toObject;
}
function googleSearchToVertex$1() {
  const toObject = {};
  return toObject;
}
function dynamicRetrievalConfigToMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromDynamicThreshold = getValueByPath(fromObject, [
    "dynamicThreshold"
  ]);
  if (fromDynamicThreshold != null) {
    setValueByPath(toObject, ["dynamicThreshold"], fromDynamicThreshold);
  }
  return toObject;
}
function dynamicRetrievalConfigToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromDynamicThreshold = getValueByPath(fromObject, [
    "dynamicThreshold"
  ]);
  if (fromDynamicThreshold != null) {
    setValueByPath(toObject, ["dynamicThreshold"], fromDynamicThreshold);
  }
  return toObject;
}
function googleSearchRetrievalToMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromDynamicRetrievalConfig = getValueByPath(fromObject, [
    "dynamicRetrievalConfig"
  ]);
  if (fromDynamicRetrievalConfig != null) {
    setValueByPath(toObject, ["dynamicRetrievalConfig"], dynamicRetrievalConfigToMldev$1(apiClient, fromDynamicRetrievalConfig));
  }
  return toObject;
}
function googleSearchRetrievalToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromDynamicRetrievalConfig = getValueByPath(fromObject, [
    "dynamicRetrievalConfig"
  ]);
  if (fromDynamicRetrievalConfig != null) {
    setValueByPath(toObject, ["dynamicRetrievalConfig"], dynamicRetrievalConfigToVertex$1(apiClient, fromDynamicRetrievalConfig));
  }
  return toObject;
}
function enterpriseWebSearchToVertex$1() {
  const toObject = {};
  return toObject;
}
function apiKeyConfigToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromApiKeyString = getValueByPath(fromObject, ["apiKeyString"]);
  if (fromApiKeyString != null) {
    setValueByPath(toObject, ["apiKeyString"], fromApiKeyString);
  }
  return toObject;
}
function authConfigToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromApiKeyConfig = getValueByPath(fromObject, ["apiKeyConfig"]);
  if (fromApiKeyConfig != null) {
    setValueByPath(toObject, ["apiKeyConfig"], apiKeyConfigToVertex$1(apiClient, fromApiKeyConfig));
  }
  const fromAuthType = getValueByPath(fromObject, ["authType"]);
  if (fromAuthType != null) {
    setValueByPath(toObject, ["authType"], fromAuthType);
  }
  const fromGoogleServiceAccountConfig = getValueByPath(fromObject, [
    "googleServiceAccountConfig"
  ]);
  if (fromGoogleServiceAccountConfig != null) {
    setValueByPath(toObject, ["googleServiceAccountConfig"], fromGoogleServiceAccountConfig);
  }
  const fromHttpBasicAuthConfig = getValueByPath(fromObject, [
    "httpBasicAuthConfig"
  ]);
  if (fromHttpBasicAuthConfig != null) {
    setValueByPath(toObject, ["httpBasicAuthConfig"], fromHttpBasicAuthConfig);
  }
  const fromOauthConfig = getValueByPath(fromObject, ["oauthConfig"]);
  if (fromOauthConfig != null) {
    setValueByPath(toObject, ["oauthConfig"], fromOauthConfig);
  }
  const fromOidcConfig = getValueByPath(fromObject, ["oidcConfig"]);
  if (fromOidcConfig != null) {
    setValueByPath(toObject, ["oidcConfig"], fromOidcConfig);
  }
  return toObject;
}
function googleMapsToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromAuthConfig = getValueByPath(fromObject, ["authConfig"]);
  if (fromAuthConfig != null) {
    setValueByPath(toObject, ["authConfig"], authConfigToVertex$1(apiClient, fromAuthConfig));
  }
  return toObject;
}
function toolToMldev$1(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["retrieval"]) !== undefined) {
    throw new Error("retrieval parameter is not supported in Gemini API.");
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToMldev$1());
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], googleSearchRetrievalToMldev$1(apiClient, fromGoogleSearchRetrieval));
  }
  if (getValueByPath(fromObject, ["enterpriseWebSearch"]) !== undefined) {
    throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["googleMaps"]) !== undefined) {
    throw new Error("googleMaps parameter is not supported in Gemini API.");
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    setValueByPath(toObject, ["functionDeclarations"], fromFunctionDeclarations);
  }
  return toObject;
}
function toolToVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromRetrieval = getValueByPath(fromObject, ["retrieval"]);
  if (fromRetrieval != null) {
    setValueByPath(toObject, ["retrieval"], fromRetrieval);
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToVertex$1());
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], googleSearchRetrievalToVertex$1(apiClient, fromGoogleSearchRetrieval));
  }
  const fromEnterpriseWebSearch = getValueByPath(fromObject, [
    "enterpriseWebSearch"
  ]);
  if (fromEnterpriseWebSearch != null) {
    setValueByPath(toObject, ["enterpriseWebSearch"], enterpriseWebSearchToVertex$1());
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], googleMapsToVertex$1(apiClient, fromGoogleMaps));
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    setValueByPath(toObject, ["functionDeclarations"], fromFunctionDeclarations);
  }
  return toObject;
}
function sessionResumptionConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromHandle = getValueByPath(fromObject, ["handle"]);
  if (fromHandle != null) {
    setValueByPath(toObject, ["handle"], fromHandle);
  }
  if (getValueByPath(fromObject, ["transparent"]) !== undefined) {
    throw new Error("transparent parameter is not supported in Gemini API.");
  }
  return toObject;
}
function sessionResumptionConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromHandle = getValueByPath(fromObject, ["handle"]);
  if (fromHandle != null) {
    setValueByPath(toObject, ["handle"], fromHandle);
  }
  const fromTransparent = getValueByPath(fromObject, ["transparent"]);
  if (fromTransparent != null) {
    setValueByPath(toObject, ["transparent"], fromTransparent);
  }
  return toObject;
}
function audioTranscriptionConfigToMldev() {
  const toObject = {};
  return toObject;
}
function audioTranscriptionConfigToVertex() {
  const toObject = {};
  return toObject;
}
function automaticActivityDetectionToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromDisabled = getValueByPath(fromObject, ["disabled"]);
  if (fromDisabled != null) {
    setValueByPath(toObject, ["disabled"], fromDisabled);
  }
  const fromStartOfSpeechSensitivity = getValueByPath(fromObject, [
    "startOfSpeechSensitivity"
  ]);
  if (fromStartOfSpeechSensitivity != null) {
    setValueByPath(toObject, ["startOfSpeechSensitivity"], fromStartOfSpeechSensitivity);
  }
  const fromEndOfSpeechSensitivity = getValueByPath(fromObject, [
    "endOfSpeechSensitivity"
  ]);
  if (fromEndOfSpeechSensitivity != null) {
    setValueByPath(toObject, ["endOfSpeechSensitivity"], fromEndOfSpeechSensitivity);
  }
  const fromPrefixPaddingMs = getValueByPath(fromObject, [
    "prefixPaddingMs"
  ]);
  if (fromPrefixPaddingMs != null) {
    setValueByPath(toObject, ["prefixPaddingMs"], fromPrefixPaddingMs);
  }
  const fromSilenceDurationMs = getValueByPath(fromObject, [
    "silenceDurationMs"
  ]);
  if (fromSilenceDurationMs != null) {
    setValueByPath(toObject, ["silenceDurationMs"], fromSilenceDurationMs);
  }
  return toObject;
}
function automaticActivityDetectionToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromDisabled = getValueByPath(fromObject, ["disabled"]);
  if (fromDisabled != null) {
    setValueByPath(toObject, ["disabled"], fromDisabled);
  }
  const fromStartOfSpeechSensitivity = getValueByPath(fromObject, [
    "startOfSpeechSensitivity"
  ]);
  if (fromStartOfSpeechSensitivity != null) {
    setValueByPath(toObject, ["startOfSpeechSensitivity"], fromStartOfSpeechSensitivity);
  }
  const fromEndOfSpeechSensitivity = getValueByPath(fromObject, [
    "endOfSpeechSensitivity"
  ]);
  if (fromEndOfSpeechSensitivity != null) {
    setValueByPath(toObject, ["endOfSpeechSensitivity"], fromEndOfSpeechSensitivity);
  }
  const fromPrefixPaddingMs = getValueByPath(fromObject, [
    "prefixPaddingMs"
  ]);
  if (fromPrefixPaddingMs != null) {
    setValueByPath(toObject, ["prefixPaddingMs"], fromPrefixPaddingMs);
  }
  const fromSilenceDurationMs = getValueByPath(fromObject, [
    "silenceDurationMs"
  ]);
  if (fromSilenceDurationMs != null) {
    setValueByPath(toObject, ["silenceDurationMs"], fromSilenceDurationMs);
  }
  return toObject;
}
function realtimeInputConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromAutomaticActivityDetection = getValueByPath(fromObject, [
    "automaticActivityDetection"
  ]);
  if (fromAutomaticActivityDetection != null) {
    setValueByPath(toObject, ["automaticActivityDetection"], automaticActivityDetectionToMldev(apiClient, fromAutomaticActivityDetection));
  }
  const fromActivityHandling = getValueByPath(fromObject, [
    "activityHandling"
  ]);
  if (fromActivityHandling != null) {
    setValueByPath(toObject, ["activityHandling"], fromActivityHandling);
  }
  const fromTurnCoverage = getValueByPath(fromObject, ["turnCoverage"]);
  if (fromTurnCoverage != null) {
    setValueByPath(toObject, ["turnCoverage"], fromTurnCoverage);
  }
  return toObject;
}
function realtimeInputConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromAutomaticActivityDetection = getValueByPath(fromObject, [
    "automaticActivityDetection"
  ]);
  if (fromAutomaticActivityDetection != null) {
    setValueByPath(toObject, ["automaticActivityDetection"], automaticActivityDetectionToVertex(apiClient, fromAutomaticActivityDetection));
  }
  const fromActivityHandling = getValueByPath(fromObject, [
    "activityHandling"
  ]);
  if (fromActivityHandling != null) {
    setValueByPath(toObject, ["activityHandling"], fromActivityHandling);
  }
  const fromTurnCoverage = getValueByPath(fromObject, ["turnCoverage"]);
  if (fromTurnCoverage != null) {
    setValueByPath(toObject, ["turnCoverage"], fromTurnCoverage);
  }
  return toObject;
}
function slidingWindowToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromTargetTokens = getValueByPath(fromObject, ["targetTokens"]);
  if (fromTargetTokens != null) {
    setValueByPath(toObject, ["targetTokens"], fromTargetTokens);
  }
  return toObject;
}
function slidingWindowToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromTargetTokens = getValueByPath(fromObject, ["targetTokens"]);
  if (fromTargetTokens != null) {
    setValueByPath(toObject, ["targetTokens"], fromTargetTokens);
  }
  return toObject;
}
function contextWindowCompressionConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromTriggerTokens = getValueByPath(fromObject, [
    "triggerTokens"
  ]);
  if (fromTriggerTokens != null) {
    setValueByPath(toObject, ["triggerTokens"], fromTriggerTokens);
  }
  const fromSlidingWindow = getValueByPath(fromObject, [
    "slidingWindow"
  ]);
  if (fromSlidingWindow != null) {
    setValueByPath(toObject, ["slidingWindow"], slidingWindowToMldev(apiClient, fromSlidingWindow));
  }
  return toObject;
}
function contextWindowCompressionConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromTriggerTokens = getValueByPath(fromObject, [
    "triggerTokens"
  ]);
  if (fromTriggerTokens != null) {
    setValueByPath(toObject, ["triggerTokens"], fromTriggerTokens);
  }
  const fromSlidingWindow = getValueByPath(fromObject, [
    "slidingWindow"
  ]);
  if (fromSlidingWindow != null) {
    setValueByPath(toObject, ["slidingWindow"], slidingWindowToVertex(apiClient, fromSlidingWindow));
  }
  return toObject;
}
function liveConnectConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromGenerationConfig = getValueByPath(fromObject, [
    "generationConfig"
  ]);
  if (parentObject !== undefined && fromGenerationConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig"], fromGenerationConfig);
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (parentObject !== undefined && fromResponseModalities != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "responseModalities"], fromResponseModalities);
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (parentObject !== undefined && fromTemperature != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (parentObject !== undefined && fromTopP != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (parentObject !== undefined && fromTopK != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topK"], fromTopK);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (parentObject !== undefined && fromMaxOutputTokens != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (parentObject !== undefined && fromMediaResolution != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "mediaResolution"], fromMediaResolution);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== undefined && fromSeed != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "seed"], fromSeed);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (parentObject !== undefined && fromSpeechConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "speechConfig"], fromSpeechConfig);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== undefined && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["setup", "systemInstruction"], contentToMldev$1(apiClient, tContent(apiClient, fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== undefined && fromTools != null) {
    let transformedList = tTools(apiClient, fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToMldev$1(apiClient, tTool(apiClient, item));
      });
    }
    setValueByPath(parentObject, ["setup", "tools"], transformedList);
  }
  const fromSessionResumption = getValueByPath(fromObject, [
    "sessionResumption"
  ]);
  if (parentObject !== undefined && fromSessionResumption != null) {
    setValueByPath(parentObject, ["setup", "sessionResumption"], sessionResumptionConfigToMldev(apiClient, fromSessionResumption));
  }
  const fromInputAudioTranscription = getValueByPath(fromObject, [
    "inputAudioTranscription"
  ]);
  if (parentObject !== undefined && fromInputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "inputAudioTranscription"], audioTranscriptionConfigToMldev());
  }
  const fromOutputAudioTranscription = getValueByPath(fromObject, [
    "outputAudioTranscription"
  ]);
  if (parentObject !== undefined && fromOutputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "outputAudioTranscription"], audioTranscriptionConfigToMldev());
  }
  const fromRealtimeInputConfig = getValueByPath(fromObject, [
    "realtimeInputConfig"
  ]);
  if (parentObject !== undefined && fromRealtimeInputConfig != null) {
    setValueByPath(parentObject, ["setup", "realtimeInputConfig"], realtimeInputConfigToMldev(apiClient, fromRealtimeInputConfig));
  }
  const fromContextWindowCompression = getValueByPath(fromObject, [
    "contextWindowCompression"
  ]);
  if (parentObject !== undefined && fromContextWindowCompression != null) {
    setValueByPath(parentObject, ["setup", "contextWindowCompression"], contextWindowCompressionConfigToMldev(apiClient, fromContextWindowCompression));
  }
  return toObject;
}
function liveConnectConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromGenerationConfig = getValueByPath(fromObject, [
    "generationConfig"
  ]);
  if (parentObject !== undefined && fromGenerationConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig"], fromGenerationConfig);
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (parentObject !== undefined && fromResponseModalities != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "responseModalities"], fromResponseModalities);
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (parentObject !== undefined && fromTemperature != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (parentObject !== undefined && fromTopP != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (parentObject !== undefined && fromTopK != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topK"], fromTopK);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (parentObject !== undefined && fromMaxOutputTokens != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (parentObject !== undefined && fromMediaResolution != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "mediaResolution"], fromMediaResolution);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== undefined && fromSeed != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "seed"], fromSeed);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (parentObject !== undefined && fromSpeechConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "speechConfig"], fromSpeechConfig);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== undefined && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["setup", "systemInstruction"], contentToVertex$1(apiClient, tContent(apiClient, fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== undefined && fromTools != null) {
    let transformedList = tTools(apiClient, fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToVertex$1(apiClient, tTool(apiClient, item));
      });
    }
    setValueByPath(parentObject, ["setup", "tools"], transformedList);
  }
  const fromSessionResumption = getValueByPath(fromObject, [
    "sessionResumption"
  ]);
  if (parentObject !== undefined && fromSessionResumption != null) {
    setValueByPath(parentObject, ["setup", "sessionResumption"], sessionResumptionConfigToVertex(apiClient, fromSessionResumption));
  }
  const fromInputAudioTranscription = getValueByPath(fromObject, [
    "inputAudioTranscription"
  ]);
  if (parentObject !== undefined && fromInputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "inputAudioTranscription"], audioTranscriptionConfigToVertex());
  }
  const fromOutputAudioTranscription = getValueByPath(fromObject, [
    "outputAudioTranscription"
  ]);
  if (parentObject !== undefined && fromOutputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "outputAudioTranscription"], audioTranscriptionConfigToVertex());
  }
  const fromRealtimeInputConfig = getValueByPath(fromObject, [
    "realtimeInputConfig"
  ]);
  if (parentObject !== undefined && fromRealtimeInputConfig != null) {
    setValueByPath(parentObject, ["setup", "realtimeInputConfig"], realtimeInputConfigToVertex(apiClient, fromRealtimeInputConfig));
  }
  const fromContextWindowCompression = getValueByPath(fromObject, [
    "contextWindowCompression"
  ]);
  if (parentObject !== undefined && fromContextWindowCompression != null) {
    setValueByPath(parentObject, ["setup", "contextWindowCompression"], contextWindowCompressionConfigToVertex(apiClient, fromContextWindowCompression));
  }
  return toObject;
}
function liveConnectParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["setup", "model"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], liveConnectConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function liveConnectParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["setup", "model"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], liveConnectConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function activityStartToMldev() {
  const toObject = {};
  return toObject;
}
function activityStartToVertex() {
  const toObject = {};
  return toObject;
}
function activityEndToMldev() {
  const toObject = {};
  return toObject;
}
function activityEndToVertex() {
  const toObject = {};
  return toObject;
}
function liveSendRealtimeInputParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromMedia = getValueByPath(fromObject, ["media"]);
  if (fromMedia != null) {
    setValueByPath(toObject, ["mediaChunks"], tBlobs(apiClient, fromMedia));
  }
  const fromAudio = getValueByPath(fromObject, ["audio"]);
  if (fromAudio != null) {
    setValueByPath(toObject, ["audio"], tAudioBlob(apiClient, fromAudio));
  }
  const fromAudioStreamEnd = getValueByPath(fromObject, [
    "audioStreamEnd"
  ]);
  if (fromAudioStreamEnd != null) {
    setValueByPath(toObject, ["audioStreamEnd"], fromAudioStreamEnd);
  }
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], tImageBlob(apiClient, fromVideo));
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromActivityStart = getValueByPath(fromObject, [
    "activityStart"
  ]);
  if (fromActivityStart != null) {
    setValueByPath(toObject, ["activityStart"], activityStartToMldev());
  }
  const fromActivityEnd = getValueByPath(fromObject, ["activityEnd"]);
  if (fromActivityEnd != null) {
    setValueByPath(toObject, ["activityEnd"], activityEndToMldev());
  }
  return toObject;
}
function liveSendRealtimeInputParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromMedia = getValueByPath(fromObject, ["media"]);
  if (fromMedia != null) {
    setValueByPath(toObject, ["mediaChunks"], tBlobs(apiClient, fromMedia));
  }
  if (getValueByPath(fromObject, ["audio"]) !== undefined) {
    throw new Error("audio parameter is not supported in Vertex AI.");
  }
  const fromAudioStreamEnd = getValueByPath(fromObject, [
    "audioStreamEnd"
  ]);
  if (fromAudioStreamEnd != null) {
    setValueByPath(toObject, ["audioStreamEnd"], fromAudioStreamEnd);
  }
  if (getValueByPath(fromObject, ["video"]) !== undefined) {
    throw new Error("video parameter is not supported in Vertex AI.");
  }
  if (getValueByPath(fromObject, ["text"]) !== undefined) {
    throw new Error("text parameter is not supported in Vertex AI.");
  }
  const fromActivityStart = getValueByPath(fromObject, [
    "activityStart"
  ]);
  if (fromActivityStart != null) {
    setValueByPath(toObject, ["activityStart"], activityStartToVertex());
  }
  const fromActivityEnd = getValueByPath(fromObject, ["activityEnd"]);
  if (fromActivityEnd != null) {
    setValueByPath(toObject, ["activityEnd"], activityEndToVertex());
  }
  return toObject;
}
function liveServerSetupCompleteFromMldev() {
  const toObject = {};
  return toObject;
}
function liveServerSetupCompleteFromVertex() {
  const toObject = {};
  return toObject;
}
function blobFromMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function blobFromVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function partFromMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobFromMldev$1(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function partFromVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobFromVertex$1(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function contentFromMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partFromMldev$1(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function contentFromVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partFromVertex$1(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function transcriptionFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromFinished = getValueByPath(fromObject, ["finished"]);
  if (fromFinished != null) {
    setValueByPath(toObject, ["finished"], fromFinished);
  }
  return toObject;
}
function transcriptionFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromFinished = getValueByPath(fromObject, ["finished"]);
  if (fromFinished != null) {
    setValueByPath(toObject, ["finished"], fromFinished);
  }
  return toObject;
}
function liveServerContentFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModelTurn = getValueByPath(fromObject, ["modelTurn"]);
  if (fromModelTurn != null) {
    setValueByPath(toObject, ["modelTurn"], contentFromMldev$1(apiClient, fromModelTurn));
  }
  const fromTurnComplete = getValueByPath(fromObject, ["turnComplete"]);
  if (fromTurnComplete != null) {
    setValueByPath(toObject, ["turnComplete"], fromTurnComplete);
  }
  const fromInterrupted = getValueByPath(fromObject, ["interrupted"]);
  if (fromInterrupted != null) {
    setValueByPath(toObject, ["interrupted"], fromInterrupted);
  }
  const fromGroundingMetadata = getValueByPath(fromObject, [
    "groundingMetadata"
  ]);
  if (fromGroundingMetadata != null) {
    setValueByPath(toObject, ["groundingMetadata"], fromGroundingMetadata);
  }
  const fromGenerationComplete = getValueByPath(fromObject, [
    "generationComplete"
  ]);
  if (fromGenerationComplete != null) {
    setValueByPath(toObject, ["generationComplete"], fromGenerationComplete);
  }
  const fromInputTranscription = getValueByPath(fromObject, [
    "inputTranscription"
  ]);
  if (fromInputTranscription != null) {
    setValueByPath(toObject, ["inputTranscription"], transcriptionFromMldev(apiClient, fromInputTranscription));
  }
  const fromOutputTranscription = getValueByPath(fromObject, [
    "outputTranscription"
  ]);
  if (fromOutputTranscription != null) {
    setValueByPath(toObject, ["outputTranscription"], transcriptionFromMldev(apiClient, fromOutputTranscription));
  }
  return toObject;
}
function liveServerContentFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModelTurn = getValueByPath(fromObject, ["modelTurn"]);
  if (fromModelTurn != null) {
    setValueByPath(toObject, ["modelTurn"], contentFromVertex$1(apiClient, fromModelTurn));
  }
  const fromTurnComplete = getValueByPath(fromObject, ["turnComplete"]);
  if (fromTurnComplete != null) {
    setValueByPath(toObject, ["turnComplete"], fromTurnComplete);
  }
  const fromInterrupted = getValueByPath(fromObject, ["interrupted"]);
  if (fromInterrupted != null) {
    setValueByPath(toObject, ["interrupted"], fromInterrupted);
  }
  const fromGroundingMetadata = getValueByPath(fromObject, [
    "groundingMetadata"
  ]);
  if (fromGroundingMetadata != null) {
    setValueByPath(toObject, ["groundingMetadata"], fromGroundingMetadata);
  }
  const fromGenerationComplete = getValueByPath(fromObject, [
    "generationComplete"
  ]);
  if (fromGenerationComplete != null) {
    setValueByPath(toObject, ["generationComplete"], fromGenerationComplete);
  }
  const fromInputTranscription = getValueByPath(fromObject, [
    "inputTranscription"
  ]);
  if (fromInputTranscription != null) {
    setValueByPath(toObject, ["inputTranscription"], transcriptionFromVertex(apiClient, fromInputTranscription));
  }
  const fromOutputTranscription = getValueByPath(fromObject, [
    "outputTranscription"
  ]);
  if (fromOutputTranscription != null) {
    setValueByPath(toObject, ["outputTranscription"], transcriptionFromVertex(apiClient, fromOutputTranscription));
  }
  return toObject;
}
function functionCallFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromId = getValueByPath(fromObject, ["id"]);
  if (fromId != null) {
    setValueByPath(toObject, ["id"], fromId);
  }
  const fromArgs = getValueByPath(fromObject, ["args"]);
  if (fromArgs != null) {
    setValueByPath(toObject, ["args"], fromArgs);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  return toObject;
}
function functionCallFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromArgs = getValueByPath(fromObject, ["args"]);
  if (fromArgs != null) {
    setValueByPath(toObject, ["args"], fromArgs);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  return toObject;
}
function liveServerToolCallFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromFunctionCalls = getValueByPath(fromObject, [
    "functionCalls"
  ]);
  if (fromFunctionCalls != null) {
    let transformedList = fromFunctionCalls;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return functionCallFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["functionCalls"], transformedList);
  }
  return toObject;
}
function liveServerToolCallFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromFunctionCalls = getValueByPath(fromObject, [
    "functionCalls"
  ]);
  if (fromFunctionCalls != null) {
    let transformedList = fromFunctionCalls;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return functionCallFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["functionCalls"], transformedList);
  }
  return toObject;
}
function liveServerToolCallCancellationFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromIds = getValueByPath(fromObject, ["ids"]);
  if (fromIds != null) {
    setValueByPath(toObject, ["ids"], fromIds);
  }
  return toObject;
}
function liveServerToolCallCancellationFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromIds = getValueByPath(fromObject, ["ids"]);
  if (fromIds != null) {
    setValueByPath(toObject, ["ids"], fromIds);
  }
  return toObject;
}
function modalityTokenCountFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModality = getValueByPath(fromObject, ["modality"]);
  if (fromModality != null) {
    setValueByPath(toObject, ["modality"], fromModality);
  }
  const fromTokenCount = getValueByPath(fromObject, ["tokenCount"]);
  if (fromTokenCount != null) {
    setValueByPath(toObject, ["tokenCount"], fromTokenCount);
  }
  return toObject;
}
function modalityTokenCountFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModality = getValueByPath(fromObject, ["modality"]);
  if (fromModality != null) {
    setValueByPath(toObject, ["modality"], fromModality);
  }
  const fromTokenCount = getValueByPath(fromObject, ["tokenCount"]);
  if (fromTokenCount != null) {
    setValueByPath(toObject, ["tokenCount"], fromTokenCount);
  }
  return toObject;
}
function usageMetadataFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromPromptTokenCount = getValueByPath(fromObject, [
    "promptTokenCount"
  ]);
  if (fromPromptTokenCount != null) {
    setValueByPath(toObject, ["promptTokenCount"], fromPromptTokenCount);
  }
  const fromCachedContentTokenCount = getValueByPath(fromObject, [
    "cachedContentTokenCount"
  ]);
  if (fromCachedContentTokenCount != null) {
    setValueByPath(toObject, ["cachedContentTokenCount"], fromCachedContentTokenCount);
  }
  const fromResponseTokenCount = getValueByPath(fromObject, [
    "responseTokenCount"
  ]);
  if (fromResponseTokenCount != null) {
    setValueByPath(toObject, ["responseTokenCount"], fromResponseTokenCount);
  }
  const fromToolUsePromptTokenCount = getValueByPath(fromObject, [
    "toolUsePromptTokenCount"
  ]);
  if (fromToolUsePromptTokenCount != null) {
    setValueByPath(toObject, ["toolUsePromptTokenCount"], fromToolUsePromptTokenCount);
  }
  const fromThoughtsTokenCount = getValueByPath(fromObject, [
    "thoughtsTokenCount"
  ]);
  if (fromThoughtsTokenCount != null) {
    setValueByPath(toObject, ["thoughtsTokenCount"], fromThoughtsTokenCount);
  }
  const fromTotalTokenCount = getValueByPath(fromObject, [
    "totalTokenCount"
  ]);
  if (fromTotalTokenCount != null) {
    setValueByPath(toObject, ["totalTokenCount"], fromTotalTokenCount);
  }
  const fromPromptTokensDetails = getValueByPath(fromObject, [
    "promptTokensDetails"
  ]);
  if (fromPromptTokensDetails != null) {
    let transformedList = fromPromptTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modalityTokenCountFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["promptTokensDetails"], transformedList);
  }
  const fromCacheTokensDetails = getValueByPath(fromObject, [
    "cacheTokensDetails"
  ]);
  if (fromCacheTokensDetails != null) {
    let transformedList = fromCacheTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modalityTokenCountFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["cacheTokensDetails"], transformedList);
  }
  const fromResponseTokensDetails = getValueByPath(fromObject, [
    "responseTokensDetails"
  ]);
  if (fromResponseTokensDetails != null) {
    let transformedList = fromResponseTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modalityTokenCountFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["responseTokensDetails"], transformedList);
  }
  const fromToolUsePromptTokensDetails = getValueByPath(fromObject, [
    "toolUsePromptTokensDetails"
  ]);
  if (fromToolUsePromptTokensDetails != null) {
    let transformedList = fromToolUsePromptTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modalityTokenCountFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["toolUsePromptTokensDetails"], transformedList);
  }
  return toObject;
}
function usageMetadataFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromPromptTokenCount = getValueByPath(fromObject, [
    "promptTokenCount"
  ]);
  if (fromPromptTokenCount != null) {
    setValueByPath(toObject, ["promptTokenCount"], fromPromptTokenCount);
  }
  const fromCachedContentTokenCount = getValueByPath(fromObject, [
    "cachedContentTokenCount"
  ]);
  if (fromCachedContentTokenCount != null) {
    setValueByPath(toObject, ["cachedContentTokenCount"], fromCachedContentTokenCount);
  }
  const fromResponseTokenCount = getValueByPath(fromObject, [
    "candidatesTokenCount"
  ]);
  if (fromResponseTokenCount != null) {
    setValueByPath(toObject, ["responseTokenCount"], fromResponseTokenCount);
  }
  const fromToolUsePromptTokenCount = getValueByPath(fromObject, [
    "toolUsePromptTokenCount"
  ]);
  if (fromToolUsePromptTokenCount != null) {
    setValueByPath(toObject, ["toolUsePromptTokenCount"], fromToolUsePromptTokenCount);
  }
  const fromThoughtsTokenCount = getValueByPath(fromObject, [
    "thoughtsTokenCount"
  ]);
  if (fromThoughtsTokenCount != null) {
    setValueByPath(toObject, ["thoughtsTokenCount"], fromThoughtsTokenCount);
  }
  const fromTotalTokenCount = getValueByPath(fromObject, [
    "totalTokenCount"
  ]);
  if (fromTotalTokenCount != null) {
    setValueByPath(toObject, ["totalTokenCount"], fromTotalTokenCount);
  }
  const fromPromptTokensDetails = getValueByPath(fromObject, [
    "promptTokensDetails"
  ]);
  if (fromPromptTokensDetails != null) {
    let transformedList = fromPromptTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modalityTokenCountFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["promptTokensDetails"], transformedList);
  }
  const fromCacheTokensDetails = getValueByPath(fromObject, [
    "cacheTokensDetails"
  ]);
  if (fromCacheTokensDetails != null) {
    let transformedList = fromCacheTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modalityTokenCountFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["cacheTokensDetails"], transformedList);
  }
  const fromResponseTokensDetails = getValueByPath(fromObject, [
    "candidatesTokensDetails"
  ]);
  if (fromResponseTokensDetails != null) {
    let transformedList = fromResponseTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modalityTokenCountFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["responseTokensDetails"], transformedList);
  }
  const fromToolUsePromptTokensDetails = getValueByPath(fromObject, [
    "toolUsePromptTokensDetails"
  ]);
  if (fromToolUsePromptTokensDetails != null) {
    let transformedList = fromToolUsePromptTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modalityTokenCountFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["toolUsePromptTokensDetails"], transformedList);
  }
  const fromTrafficType = getValueByPath(fromObject, ["trafficType"]);
  if (fromTrafficType != null) {
    setValueByPath(toObject, ["trafficType"], fromTrafficType);
  }
  return toObject;
}
function liveServerGoAwayFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromTimeLeft = getValueByPath(fromObject, ["timeLeft"]);
  if (fromTimeLeft != null) {
    setValueByPath(toObject, ["timeLeft"], fromTimeLeft);
  }
  return toObject;
}
function liveServerGoAwayFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromTimeLeft = getValueByPath(fromObject, ["timeLeft"]);
  if (fromTimeLeft != null) {
    setValueByPath(toObject, ["timeLeft"], fromTimeLeft);
  }
  return toObject;
}
function liveServerSessionResumptionUpdateFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromNewHandle = getValueByPath(fromObject, ["newHandle"]);
  if (fromNewHandle != null) {
    setValueByPath(toObject, ["newHandle"], fromNewHandle);
  }
  const fromResumable = getValueByPath(fromObject, ["resumable"]);
  if (fromResumable != null) {
    setValueByPath(toObject, ["resumable"], fromResumable);
  }
  const fromLastConsumedClientMessageIndex = getValueByPath(fromObject, [
    "lastConsumedClientMessageIndex"
  ]);
  if (fromLastConsumedClientMessageIndex != null) {
    setValueByPath(toObject, ["lastConsumedClientMessageIndex"], fromLastConsumedClientMessageIndex);
  }
  return toObject;
}
function liveServerSessionResumptionUpdateFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromNewHandle = getValueByPath(fromObject, ["newHandle"]);
  if (fromNewHandle != null) {
    setValueByPath(toObject, ["newHandle"], fromNewHandle);
  }
  const fromResumable = getValueByPath(fromObject, ["resumable"]);
  if (fromResumable != null) {
    setValueByPath(toObject, ["resumable"], fromResumable);
  }
  const fromLastConsumedClientMessageIndex = getValueByPath(fromObject, [
    "lastConsumedClientMessageIndex"
  ]);
  if (fromLastConsumedClientMessageIndex != null) {
    setValueByPath(toObject, ["lastConsumedClientMessageIndex"], fromLastConsumedClientMessageIndex);
  }
  return toObject;
}
function liveServerMessageFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromSetupComplete = getValueByPath(fromObject, [
    "setupComplete"
  ]);
  if (fromSetupComplete != null) {
    setValueByPath(toObject, ["setupComplete"], liveServerSetupCompleteFromMldev());
  }
  const fromServerContent = getValueByPath(fromObject, [
    "serverContent"
  ]);
  if (fromServerContent != null) {
    setValueByPath(toObject, ["serverContent"], liveServerContentFromMldev(apiClient, fromServerContent));
  }
  const fromToolCall = getValueByPath(fromObject, ["toolCall"]);
  if (fromToolCall != null) {
    setValueByPath(toObject, ["toolCall"], liveServerToolCallFromMldev(apiClient, fromToolCall));
  }
  const fromToolCallCancellation = getValueByPath(fromObject, [
    "toolCallCancellation"
  ]);
  if (fromToolCallCancellation != null) {
    setValueByPath(toObject, ["toolCallCancellation"], liveServerToolCallCancellationFromMldev(apiClient, fromToolCallCancellation));
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], usageMetadataFromMldev(apiClient, fromUsageMetadata));
  }
  const fromGoAway = getValueByPath(fromObject, ["goAway"]);
  if (fromGoAway != null) {
    setValueByPath(toObject, ["goAway"], liveServerGoAwayFromMldev(apiClient, fromGoAway));
  }
  const fromSessionResumptionUpdate = getValueByPath(fromObject, [
    "sessionResumptionUpdate"
  ]);
  if (fromSessionResumptionUpdate != null) {
    setValueByPath(toObject, ["sessionResumptionUpdate"], liveServerSessionResumptionUpdateFromMldev(apiClient, fromSessionResumptionUpdate));
  }
  return toObject;
}
function liveServerMessageFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromSetupComplete = getValueByPath(fromObject, [
    "setupComplete"
  ]);
  if (fromSetupComplete != null) {
    setValueByPath(toObject, ["setupComplete"], liveServerSetupCompleteFromVertex());
  }
  const fromServerContent = getValueByPath(fromObject, [
    "serverContent"
  ]);
  if (fromServerContent != null) {
    setValueByPath(toObject, ["serverContent"], liveServerContentFromVertex(apiClient, fromServerContent));
  }
  const fromToolCall = getValueByPath(fromObject, ["toolCall"]);
  if (fromToolCall != null) {
    setValueByPath(toObject, ["toolCall"], liveServerToolCallFromVertex(apiClient, fromToolCall));
  }
  const fromToolCallCancellation = getValueByPath(fromObject, [
    "toolCallCancellation"
  ]);
  if (fromToolCallCancellation != null) {
    setValueByPath(toObject, ["toolCallCancellation"], liveServerToolCallCancellationFromVertex(apiClient, fromToolCallCancellation));
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], usageMetadataFromVertex(apiClient, fromUsageMetadata));
  }
  const fromGoAway = getValueByPath(fromObject, ["goAway"]);
  if (fromGoAway != null) {
    setValueByPath(toObject, ["goAway"], liveServerGoAwayFromVertex(apiClient, fromGoAway));
  }
  const fromSessionResumptionUpdate = getValueByPath(fromObject, [
    "sessionResumptionUpdate"
  ]);
  if (fromSessionResumptionUpdate != null) {
    setValueByPath(toObject, ["sessionResumptionUpdate"], liveServerSessionResumptionUpdateFromVertex(apiClient, fromSessionResumptionUpdate));
  }
  return toObject;
}
function blobToMldev(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["displayName"]) !== undefined) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function partToMldev(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["videoMetadata"]) !== undefined) {
    throw new Error("videoMetadata parameter is not supported in Gemini API.");
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToMldev(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function contentToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function safetySettingToMldev(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["method"]) !== undefined) {
    throw new Error("method parameter is not supported in Gemini API.");
  }
  const fromCategory = getValueByPath(fromObject, ["category"]);
  if (fromCategory != null) {
    setValueByPath(toObject, ["category"], fromCategory);
  }
  const fromThreshold = getValueByPath(fromObject, ["threshold"]);
  if (fromThreshold != null) {
    setValueByPath(toObject, ["threshold"], fromThreshold);
  }
  return toObject;
}
function googleSearchToMldev() {
  const toObject = {};
  return toObject;
}
function dynamicRetrievalConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromDynamicThreshold = getValueByPath(fromObject, [
    "dynamicThreshold"
  ]);
  if (fromDynamicThreshold != null) {
    setValueByPath(toObject, ["dynamicThreshold"], fromDynamicThreshold);
  }
  return toObject;
}
function googleSearchRetrievalToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromDynamicRetrievalConfig = getValueByPath(fromObject, [
    "dynamicRetrievalConfig"
  ]);
  if (fromDynamicRetrievalConfig != null) {
    setValueByPath(toObject, ["dynamicRetrievalConfig"], dynamicRetrievalConfigToMldev(apiClient, fromDynamicRetrievalConfig));
  }
  return toObject;
}
function toolToMldev(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["retrieval"]) !== undefined) {
    throw new Error("retrieval parameter is not supported in Gemini API.");
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToMldev());
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], googleSearchRetrievalToMldev(apiClient, fromGoogleSearchRetrieval));
  }
  if (getValueByPath(fromObject, ["enterpriseWebSearch"]) !== undefined) {
    throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["googleMaps"]) !== undefined) {
    throw new Error("googleMaps parameter is not supported in Gemini API.");
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    setValueByPath(toObject, ["functionDeclarations"], fromFunctionDeclarations);
  }
  return toObject;
}
function functionCallingConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromAllowedFunctionNames = getValueByPath(fromObject, [
    "allowedFunctionNames"
  ]);
  if (fromAllowedFunctionNames != null) {
    setValueByPath(toObject, ["allowedFunctionNames"], fromAllowedFunctionNames);
  }
  return toObject;
}
function toolConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], functionCallingConfigToMldev(apiClient, fromFunctionCallingConfig));
  }
  if (getValueByPath(fromObject, ["retrievalConfig"]) !== undefined) {
    throw new Error("retrievalConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function prebuiltVoiceConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromVoiceName = getValueByPath(fromObject, ["voiceName"]);
  if (fromVoiceName != null) {
    setValueByPath(toObject, ["voiceName"], fromVoiceName);
  }
  return toObject;
}
function voiceConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromPrebuiltVoiceConfig = getValueByPath(fromObject, [
    "prebuiltVoiceConfig"
  ]);
  if (fromPrebuiltVoiceConfig != null) {
    setValueByPath(toObject, ["prebuiltVoiceConfig"], prebuiltVoiceConfigToMldev(apiClient, fromPrebuiltVoiceConfig));
  }
  return toObject;
}
function speechConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromVoiceConfig = getValueByPath(fromObject, ["voiceConfig"]);
  if (fromVoiceConfig != null) {
    setValueByPath(toObject, ["voiceConfig"], voiceConfigToMldev(apiClient, fromVoiceConfig));
  }
  const fromLanguageCode = getValueByPath(fromObject, ["languageCode"]);
  if (fromLanguageCode != null) {
    setValueByPath(toObject, ["languageCode"], fromLanguageCode);
  }
  return toObject;
}
function thinkingConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromIncludeThoughts = getValueByPath(fromObject, [
    "includeThoughts"
  ]);
  if (fromIncludeThoughts != null) {
    setValueByPath(toObject, ["includeThoughts"], fromIncludeThoughts);
  }
  const fromThinkingBudget = getValueByPath(fromObject, [
    "thinkingBudget"
  ]);
  if (fromThinkingBudget != null) {
    setValueByPath(toObject, ["thinkingBudget"], fromThinkingBudget);
  }
  return toObject;
}
function generateContentConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== undefined && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToMldev(apiClient, tContent(apiClient, fromSystemInstruction)));
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (fromTemperature != null) {
    setValueByPath(toObject, ["temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (fromTopP != null) {
    setValueByPath(toObject, ["topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (fromTopK != null) {
    setValueByPath(toObject, ["topK"], fromTopK);
  }
  const fromCandidateCount = getValueByPath(fromObject, [
    "candidateCount"
  ]);
  if (fromCandidateCount != null) {
    setValueByPath(toObject, ["candidateCount"], fromCandidateCount);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (fromMaxOutputTokens != null) {
    setValueByPath(toObject, ["maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromStopSequences = getValueByPath(fromObject, [
    "stopSequences"
  ]);
  if (fromStopSequences != null) {
    setValueByPath(toObject, ["stopSequences"], fromStopSequences);
  }
  const fromResponseLogprobs = getValueByPath(fromObject, [
    "responseLogprobs"
  ]);
  if (fromResponseLogprobs != null) {
    setValueByPath(toObject, ["responseLogprobs"], fromResponseLogprobs);
  }
  const fromLogprobs = getValueByPath(fromObject, ["logprobs"]);
  if (fromLogprobs != null) {
    setValueByPath(toObject, ["logprobs"], fromLogprobs);
  }
  const fromPresencePenalty = getValueByPath(fromObject, [
    "presencePenalty"
  ]);
  if (fromPresencePenalty != null) {
    setValueByPath(toObject, ["presencePenalty"], fromPresencePenalty);
  }
  const fromFrequencyPenalty = getValueByPath(fromObject, [
    "frequencyPenalty"
  ]);
  if (fromFrequencyPenalty != null) {
    setValueByPath(toObject, ["frequencyPenalty"], fromFrequencyPenalty);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (fromSeed != null) {
    setValueByPath(toObject, ["seed"], fromSeed);
  }
  const fromResponseMimeType = getValueByPath(fromObject, [
    "responseMimeType"
  ]);
  if (fromResponseMimeType != null) {
    setValueByPath(toObject, ["responseMimeType"], fromResponseMimeType);
  }
  const fromResponseSchema = getValueByPath(fromObject, [
    "responseSchema"
  ]);
  if (fromResponseSchema != null) {
    setValueByPath(toObject, ["responseSchema"], tSchema(apiClient, fromResponseSchema));
  }
  if (getValueByPath(fromObject, ["routingConfig"]) !== undefined) {
    throw new Error("routingConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["modelSelectionConfig"]) !== undefined) {
    throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");
  }
  const fromSafetySettings = getValueByPath(fromObject, [
    "safetySettings"
  ]);
  if (parentObject !== undefined && fromSafetySettings != null) {
    let transformedList = fromSafetySettings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return safetySettingToMldev(apiClient, item);
      });
    }
    setValueByPath(parentObject, ["safetySettings"], transformedList);
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== undefined && fromTools != null) {
    let transformedList = tTools(apiClient, fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToMldev(apiClient, tTool(apiClient, item));
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== undefined && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToMldev(apiClient, fromToolConfig));
  }
  if (getValueByPath(fromObject, ["labels"]) !== undefined) {
    throw new Error("labels parameter is not supported in Gemini API.");
  }
  const fromCachedContent = getValueByPath(fromObject, [
    "cachedContent"
  ]);
  if (parentObject !== undefined && fromCachedContent != null) {
    setValueByPath(parentObject, ["cachedContent"], tCachedContentName(apiClient, fromCachedContent));
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (fromResponseModalities != null) {
    setValueByPath(toObject, ["responseModalities"], fromResponseModalities);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (fromSpeechConfig != null) {
    setValueByPath(toObject, ["speechConfig"], speechConfigToMldev(apiClient, tSpeechConfig(apiClient, fromSpeechConfig)));
  }
  if (getValueByPath(fromObject, ["audioTimestamp"]) !== undefined) {
    throw new Error("audioTimestamp parameter is not supported in Gemini API.");
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (fromThinkingConfig != null) {
    setValueByPath(toObject, ["thinkingConfig"], thinkingConfigToMldev(apiClient, fromThinkingConfig));
  }
  return toObject;
}
function generateContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["generationConfig"], generateContentConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function embedContentConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromTaskType = getValueByPath(fromObject, ["taskType"]);
  if (parentObject !== undefined && fromTaskType != null) {
    setValueByPath(parentObject, ["requests[]", "taskType"], fromTaskType);
  }
  const fromTitle = getValueByPath(fromObject, ["title"]);
  if (parentObject !== undefined && fromTitle != null) {
    setValueByPath(parentObject, ["requests[]", "title"], fromTitle);
  }
  const fromOutputDimensionality = getValueByPath(fromObject, [
    "outputDimensionality"
  ]);
  if (parentObject !== undefined && fromOutputDimensionality != null) {
    setValueByPath(parentObject, ["requests[]", "outputDimensionality"], fromOutputDimensionality);
  }
  if (getValueByPath(fromObject, ["mimeType"]) !== undefined) {
    throw new Error("mimeType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["autoTruncate"]) !== undefined) {
    throw new Error("autoTruncate parameter is not supported in Gemini API.");
  }
  return toObject;
}
function embedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    setValueByPath(toObject, ["requests[]", "content"], tContentsForEmbed(apiClient, fromContents));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], embedContentConfigToMldev(apiClient, fromConfig, toObject));
  }
  const fromModelForEmbedContent = getValueByPath(fromObject, ["model"]);
  if (fromModelForEmbedContent !== undefined) {
    setValueByPath(toObject, ["requests[]", "model"], tModel(apiClient, fromModelForEmbedContent));
  }
  return toObject;
}
function generateImagesConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["outputGcsUri"]) !== undefined) {
    throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["negativePrompt"]) !== undefined) {
    throw new Error("negativePrompt parameter is not supported in Gemini API.");
  }
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== undefined && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== undefined && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromGuidanceScale = getValueByPath(fromObject, [
    "guidanceScale"
  ]);
  if (parentObject !== undefined && fromGuidanceScale != null) {
    setValueByPath(parentObject, ["parameters", "guidanceScale"], fromGuidanceScale);
  }
  if (getValueByPath(fromObject, ["seed"]) !== undefined) {
    throw new Error("seed parameter is not supported in Gemini API.");
  }
  const fromSafetyFilterLevel = getValueByPath(fromObject, [
    "safetyFilterLevel"
  ]);
  if (parentObject !== undefined && fromSafetyFilterLevel != null) {
    setValueByPath(parentObject, ["parameters", "safetySetting"], fromSafetyFilterLevel);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== undefined && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromIncludeSafetyAttributes = getValueByPath(fromObject, [
    "includeSafetyAttributes"
  ]);
  if (parentObject !== undefined && fromIncludeSafetyAttributes != null) {
    setValueByPath(parentObject, ["parameters", "includeSafetyAttributes"], fromIncludeSafetyAttributes);
  }
  const fromIncludeRaiReason = getValueByPath(fromObject, [
    "includeRaiReason"
  ]);
  if (parentObject !== undefined && fromIncludeRaiReason != null) {
    setValueByPath(parentObject, ["parameters", "includeRaiReason"], fromIncludeRaiReason);
  }
  const fromLanguage = getValueByPath(fromObject, ["language"]);
  if (parentObject !== undefined && fromLanguage != null) {
    setValueByPath(parentObject, ["parameters", "language"], fromLanguage);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== undefined && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== undefined && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  if (getValueByPath(fromObject, ["addWatermark"]) !== undefined) {
    throw new Error("addWatermark parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["enhancePrompt"]) !== undefined) {
    throw new Error("enhancePrompt parameter is not supported in Gemini API.");
  }
  return toObject;
}
function generateImagesParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], generateImagesConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function getModelParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function listModelsConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== undefined && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== undefined && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== undefined && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  const fromQueryBase = getValueByPath(fromObject, ["queryBase"]);
  if (parentObject !== undefined && fromQueryBase != null) {
    setValueByPath(parentObject, ["_url", "models_url"], tModelsUrl(apiClient, fromQueryBase));
  }
  return toObject;
}
function listModelsParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], listModelsConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function updateModelConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== undefined && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (parentObject !== undefined && fromDescription != null) {
    setValueByPath(parentObject, ["description"], fromDescription);
  }
  const fromDefaultCheckpointId = getValueByPath(fromObject, [
    "defaultCheckpointId"
  ]);
  if (parentObject !== undefined && fromDefaultCheckpointId != null) {
    setValueByPath(parentObject, ["defaultCheckpointId"], fromDefaultCheckpointId);
  }
  return toObject;
}
function updateModelParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], updateModelConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function deleteModelParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function countTokensConfigToMldev(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["systemInstruction"]) !== undefined) {
    throw new Error("systemInstruction parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["tools"]) !== undefined) {
    throw new Error("tools parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["generationConfig"]) !== undefined) {
    throw new Error("generationConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function countTokensParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], countTokensConfigToMldev(apiClient, fromConfig));
  }
  return toObject;
}
function imageToMldev(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["gcsUri"]) !== undefined) {
    throw new Error("gcsUri parameter is not supported in Gemini API.");
  }
  const fromImageBytes = getValueByPath(fromObject, ["imageBytes"]);
  if (fromImageBytes != null) {
    setValueByPath(toObject, ["bytesBase64Encoded"], tBytes(apiClient, fromImageBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function generateVideosConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromNumberOfVideos = getValueByPath(fromObject, [
    "numberOfVideos"
  ]);
  if (parentObject !== undefined && fromNumberOfVideos != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfVideos);
  }
  if (getValueByPath(fromObject, ["outputGcsUri"]) !== undefined) {
    throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["fps"]) !== undefined) {
    throw new Error("fps parameter is not supported in Gemini API.");
  }
  const fromDurationSeconds = getValueByPath(fromObject, [
    "durationSeconds"
  ]);
  if (parentObject !== undefined && fromDurationSeconds != null) {
    setValueByPath(parentObject, ["parameters", "durationSeconds"], fromDurationSeconds);
  }
  if (getValueByPath(fromObject, ["seed"]) !== undefined) {
    throw new Error("seed parameter is not supported in Gemini API.");
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== undefined && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  if (getValueByPath(fromObject, ["resolution"]) !== undefined) {
    throw new Error("resolution parameter is not supported in Gemini API.");
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== undefined && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  if (getValueByPath(fromObject, ["pubsubTopic"]) !== undefined) {
    throw new Error("pubsubTopic parameter is not supported in Gemini API.");
  }
  const fromNegativePrompt = getValueByPath(fromObject, [
    "negativePrompt"
  ]);
  if (parentObject !== undefined && fromNegativePrompt != null) {
    setValueByPath(parentObject, ["parameters", "negativePrompt"], fromNegativePrompt);
  }
  if (getValueByPath(fromObject, ["enhancePrompt"]) !== undefined) {
    throw new Error("enhancePrompt parameter is not supported in Gemini API.");
  }
  return toObject;
}
function generateVideosParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["instances[0]", "image"], imageToMldev(apiClient, fromImage));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], generateVideosConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function blobToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function partToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToVertex(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function contentToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function modelSelectionConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromFeatureSelectionPreference = getValueByPath(fromObject, [
    "featureSelectionPreference"
  ]);
  if (fromFeatureSelectionPreference != null) {
    setValueByPath(toObject, ["featureSelectionPreference"], fromFeatureSelectionPreference);
  }
  return toObject;
}
function safetySettingToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromMethod = getValueByPath(fromObject, ["method"]);
  if (fromMethod != null) {
    setValueByPath(toObject, ["method"], fromMethod);
  }
  const fromCategory = getValueByPath(fromObject, ["category"]);
  if (fromCategory != null) {
    setValueByPath(toObject, ["category"], fromCategory);
  }
  const fromThreshold = getValueByPath(fromObject, ["threshold"]);
  if (fromThreshold != null) {
    setValueByPath(toObject, ["threshold"], fromThreshold);
  }
  return toObject;
}
function googleSearchToVertex() {
  const toObject = {};
  return toObject;
}
function dynamicRetrievalConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromDynamicThreshold = getValueByPath(fromObject, [
    "dynamicThreshold"
  ]);
  if (fromDynamicThreshold != null) {
    setValueByPath(toObject, ["dynamicThreshold"], fromDynamicThreshold);
  }
  return toObject;
}
function googleSearchRetrievalToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromDynamicRetrievalConfig = getValueByPath(fromObject, [
    "dynamicRetrievalConfig"
  ]);
  if (fromDynamicRetrievalConfig != null) {
    setValueByPath(toObject, ["dynamicRetrievalConfig"], dynamicRetrievalConfigToVertex(apiClient, fromDynamicRetrievalConfig));
  }
  return toObject;
}
function enterpriseWebSearchToVertex() {
  const toObject = {};
  return toObject;
}
function apiKeyConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromApiKeyString = getValueByPath(fromObject, ["apiKeyString"]);
  if (fromApiKeyString != null) {
    setValueByPath(toObject, ["apiKeyString"], fromApiKeyString);
  }
  return toObject;
}
function authConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromApiKeyConfig = getValueByPath(fromObject, ["apiKeyConfig"]);
  if (fromApiKeyConfig != null) {
    setValueByPath(toObject, ["apiKeyConfig"], apiKeyConfigToVertex(apiClient, fromApiKeyConfig));
  }
  const fromAuthType = getValueByPath(fromObject, ["authType"]);
  if (fromAuthType != null) {
    setValueByPath(toObject, ["authType"], fromAuthType);
  }
  const fromGoogleServiceAccountConfig = getValueByPath(fromObject, [
    "googleServiceAccountConfig"
  ]);
  if (fromGoogleServiceAccountConfig != null) {
    setValueByPath(toObject, ["googleServiceAccountConfig"], fromGoogleServiceAccountConfig);
  }
  const fromHttpBasicAuthConfig = getValueByPath(fromObject, [
    "httpBasicAuthConfig"
  ]);
  if (fromHttpBasicAuthConfig != null) {
    setValueByPath(toObject, ["httpBasicAuthConfig"], fromHttpBasicAuthConfig);
  }
  const fromOauthConfig = getValueByPath(fromObject, ["oauthConfig"]);
  if (fromOauthConfig != null) {
    setValueByPath(toObject, ["oauthConfig"], fromOauthConfig);
  }
  const fromOidcConfig = getValueByPath(fromObject, ["oidcConfig"]);
  if (fromOidcConfig != null) {
    setValueByPath(toObject, ["oidcConfig"], fromOidcConfig);
  }
  return toObject;
}
function googleMapsToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromAuthConfig = getValueByPath(fromObject, ["authConfig"]);
  if (fromAuthConfig != null) {
    setValueByPath(toObject, ["authConfig"], authConfigToVertex(apiClient, fromAuthConfig));
  }
  return toObject;
}
function toolToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromRetrieval = getValueByPath(fromObject, ["retrieval"]);
  if (fromRetrieval != null) {
    setValueByPath(toObject, ["retrieval"], fromRetrieval);
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToVertex());
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], googleSearchRetrievalToVertex(apiClient, fromGoogleSearchRetrieval));
  }
  const fromEnterpriseWebSearch = getValueByPath(fromObject, [
    "enterpriseWebSearch"
  ]);
  if (fromEnterpriseWebSearch != null) {
    setValueByPath(toObject, ["enterpriseWebSearch"], enterpriseWebSearchToVertex());
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], googleMapsToVertex(apiClient, fromGoogleMaps));
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    setValueByPath(toObject, ["functionDeclarations"], fromFunctionDeclarations);
  }
  return toObject;
}
function functionCallingConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  const fromAllowedFunctionNames = getValueByPath(fromObject, [
    "allowedFunctionNames"
  ]);
  if (fromAllowedFunctionNames != null) {
    setValueByPath(toObject, ["allowedFunctionNames"], fromAllowedFunctionNames);
  }
  return toObject;
}
function latLngToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromLatitude = getValueByPath(fromObject, ["latitude"]);
  if (fromLatitude != null) {
    setValueByPath(toObject, ["latitude"], fromLatitude);
  }
  const fromLongitude = getValueByPath(fromObject, ["longitude"]);
  if (fromLongitude != null) {
    setValueByPath(toObject, ["longitude"], fromLongitude);
  }
  return toObject;
}
function retrievalConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromLatLng = getValueByPath(fromObject, ["latLng"]);
  if (fromLatLng != null) {
    setValueByPath(toObject, ["latLng"], latLngToVertex(apiClient, fromLatLng));
  }
  return toObject;
}
function toolConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], functionCallingConfigToVertex(apiClient, fromFunctionCallingConfig));
  }
  const fromRetrievalConfig = getValueByPath(fromObject, [
    "retrievalConfig"
  ]);
  if (fromRetrievalConfig != null) {
    setValueByPath(toObject, ["retrievalConfig"], retrievalConfigToVertex(apiClient, fromRetrievalConfig));
  }
  return toObject;
}
function prebuiltVoiceConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromVoiceName = getValueByPath(fromObject, ["voiceName"]);
  if (fromVoiceName != null) {
    setValueByPath(toObject, ["voiceName"], fromVoiceName);
  }
  return toObject;
}
function voiceConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromPrebuiltVoiceConfig = getValueByPath(fromObject, [
    "prebuiltVoiceConfig"
  ]);
  if (fromPrebuiltVoiceConfig != null) {
    setValueByPath(toObject, ["prebuiltVoiceConfig"], prebuiltVoiceConfigToVertex(apiClient, fromPrebuiltVoiceConfig));
  }
  return toObject;
}
function speechConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromVoiceConfig = getValueByPath(fromObject, ["voiceConfig"]);
  if (fromVoiceConfig != null) {
    setValueByPath(toObject, ["voiceConfig"], voiceConfigToVertex(apiClient, fromVoiceConfig));
  }
  const fromLanguageCode = getValueByPath(fromObject, ["languageCode"]);
  if (fromLanguageCode != null) {
    setValueByPath(toObject, ["languageCode"], fromLanguageCode);
  }
  return toObject;
}
function thinkingConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromIncludeThoughts = getValueByPath(fromObject, [
    "includeThoughts"
  ]);
  if (fromIncludeThoughts != null) {
    setValueByPath(toObject, ["includeThoughts"], fromIncludeThoughts);
  }
  const fromThinkingBudget = getValueByPath(fromObject, [
    "thinkingBudget"
  ]);
  if (fromThinkingBudget != null) {
    setValueByPath(toObject, ["thinkingBudget"], fromThinkingBudget);
  }
  return toObject;
}
function generateContentConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== undefined && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToVertex(apiClient, tContent(apiClient, fromSystemInstruction)));
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (fromTemperature != null) {
    setValueByPath(toObject, ["temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (fromTopP != null) {
    setValueByPath(toObject, ["topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (fromTopK != null) {
    setValueByPath(toObject, ["topK"], fromTopK);
  }
  const fromCandidateCount = getValueByPath(fromObject, [
    "candidateCount"
  ]);
  if (fromCandidateCount != null) {
    setValueByPath(toObject, ["candidateCount"], fromCandidateCount);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (fromMaxOutputTokens != null) {
    setValueByPath(toObject, ["maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromStopSequences = getValueByPath(fromObject, [
    "stopSequences"
  ]);
  if (fromStopSequences != null) {
    setValueByPath(toObject, ["stopSequences"], fromStopSequences);
  }
  const fromResponseLogprobs = getValueByPath(fromObject, [
    "responseLogprobs"
  ]);
  if (fromResponseLogprobs != null) {
    setValueByPath(toObject, ["responseLogprobs"], fromResponseLogprobs);
  }
  const fromLogprobs = getValueByPath(fromObject, ["logprobs"]);
  if (fromLogprobs != null) {
    setValueByPath(toObject, ["logprobs"], fromLogprobs);
  }
  const fromPresencePenalty = getValueByPath(fromObject, [
    "presencePenalty"
  ]);
  if (fromPresencePenalty != null) {
    setValueByPath(toObject, ["presencePenalty"], fromPresencePenalty);
  }
  const fromFrequencyPenalty = getValueByPath(fromObject, [
    "frequencyPenalty"
  ]);
  if (fromFrequencyPenalty != null) {
    setValueByPath(toObject, ["frequencyPenalty"], fromFrequencyPenalty);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (fromSeed != null) {
    setValueByPath(toObject, ["seed"], fromSeed);
  }
  const fromResponseMimeType = getValueByPath(fromObject, [
    "responseMimeType"
  ]);
  if (fromResponseMimeType != null) {
    setValueByPath(toObject, ["responseMimeType"], fromResponseMimeType);
  }
  const fromResponseSchema = getValueByPath(fromObject, [
    "responseSchema"
  ]);
  if (fromResponseSchema != null) {
    setValueByPath(toObject, ["responseSchema"], tSchema(apiClient, fromResponseSchema));
  }
  const fromRoutingConfig = getValueByPath(fromObject, [
    "routingConfig"
  ]);
  if (fromRoutingConfig != null) {
    setValueByPath(toObject, ["routingConfig"], fromRoutingConfig);
  }
  const fromModelSelectionConfig = getValueByPath(fromObject, [
    "modelSelectionConfig"
  ]);
  if (fromModelSelectionConfig != null) {
    setValueByPath(toObject, ["modelConfig"], modelSelectionConfigToVertex(apiClient, fromModelSelectionConfig));
  }
  const fromSafetySettings = getValueByPath(fromObject, [
    "safetySettings"
  ]);
  if (parentObject !== undefined && fromSafetySettings != null) {
    let transformedList = fromSafetySettings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return safetySettingToVertex(apiClient, item);
      });
    }
    setValueByPath(parentObject, ["safetySettings"], transformedList);
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== undefined && fromTools != null) {
    let transformedList = tTools(apiClient, fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToVertex(apiClient, tTool(apiClient, item));
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== undefined && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToVertex(apiClient, fromToolConfig));
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (parentObject !== undefined && fromLabels != null) {
    setValueByPath(parentObject, ["labels"], fromLabels);
  }
  const fromCachedContent = getValueByPath(fromObject, [
    "cachedContent"
  ]);
  if (parentObject !== undefined && fromCachedContent != null) {
    setValueByPath(parentObject, ["cachedContent"], tCachedContentName(apiClient, fromCachedContent));
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (fromResponseModalities != null) {
    setValueByPath(toObject, ["responseModalities"], fromResponseModalities);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (fromSpeechConfig != null) {
    setValueByPath(toObject, ["speechConfig"], speechConfigToVertex(apiClient, tSpeechConfig(apiClient, fromSpeechConfig)));
  }
  const fromAudioTimestamp = getValueByPath(fromObject, [
    "audioTimestamp"
  ]);
  if (fromAudioTimestamp != null) {
    setValueByPath(toObject, ["audioTimestamp"], fromAudioTimestamp);
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (fromThinkingConfig != null) {
    setValueByPath(toObject, ["thinkingConfig"], thinkingConfigToVertex(apiClient, fromThinkingConfig));
  }
  return toObject;
}
function generateContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["generationConfig"], generateContentConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function embedContentConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromTaskType = getValueByPath(fromObject, ["taskType"]);
  if (parentObject !== undefined && fromTaskType != null) {
    setValueByPath(parentObject, ["instances[]", "task_type"], fromTaskType);
  }
  const fromTitle = getValueByPath(fromObject, ["title"]);
  if (parentObject !== undefined && fromTitle != null) {
    setValueByPath(parentObject, ["instances[]", "title"], fromTitle);
  }
  const fromOutputDimensionality = getValueByPath(fromObject, [
    "outputDimensionality"
  ]);
  if (parentObject !== undefined && fromOutputDimensionality != null) {
    setValueByPath(parentObject, ["parameters", "outputDimensionality"], fromOutputDimensionality);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (parentObject !== undefined && fromMimeType != null) {
    setValueByPath(parentObject, ["instances[]", "mimeType"], fromMimeType);
  }
  const fromAutoTruncate = getValueByPath(fromObject, ["autoTruncate"]);
  if (parentObject !== undefined && fromAutoTruncate != null) {
    setValueByPath(parentObject, ["parameters", "autoTruncate"], fromAutoTruncate);
  }
  return toObject;
}
function embedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    setValueByPath(toObject, ["instances[]", "content"], tContentsForEmbed(apiClient, fromContents));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], embedContentConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function generateImagesConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromOutputGcsUri = getValueByPath(fromObject, ["outputGcsUri"]);
  if (parentObject !== undefined && fromOutputGcsUri != null) {
    setValueByPath(parentObject, ["parameters", "storageUri"], fromOutputGcsUri);
  }
  const fromNegativePrompt = getValueByPath(fromObject, [
    "negativePrompt"
  ]);
  if (parentObject !== undefined && fromNegativePrompt != null) {
    setValueByPath(parentObject, ["parameters", "negativePrompt"], fromNegativePrompt);
  }
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== undefined && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== undefined && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromGuidanceScale = getValueByPath(fromObject, [
    "guidanceScale"
  ]);
  if (parentObject !== undefined && fromGuidanceScale != null) {
    setValueByPath(parentObject, ["parameters", "guidanceScale"], fromGuidanceScale);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== undefined && fromSeed != null) {
    setValueByPath(parentObject, ["parameters", "seed"], fromSeed);
  }
  const fromSafetyFilterLevel = getValueByPath(fromObject, [
    "safetyFilterLevel"
  ]);
  if (parentObject !== undefined && fromSafetyFilterLevel != null) {
    setValueByPath(parentObject, ["parameters", "safetySetting"], fromSafetyFilterLevel);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== undefined && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromIncludeSafetyAttributes = getValueByPath(fromObject, [
    "includeSafetyAttributes"
  ]);
  if (parentObject !== undefined && fromIncludeSafetyAttributes != null) {
    setValueByPath(parentObject, ["parameters", "includeSafetyAttributes"], fromIncludeSafetyAttributes);
  }
  const fromIncludeRaiReason = getValueByPath(fromObject, [
    "includeRaiReason"
  ]);
  if (parentObject !== undefined && fromIncludeRaiReason != null) {
    setValueByPath(parentObject, ["parameters", "includeRaiReason"], fromIncludeRaiReason);
  }
  const fromLanguage = getValueByPath(fromObject, ["language"]);
  if (parentObject !== undefined && fromLanguage != null) {
    setValueByPath(parentObject, ["parameters", "language"], fromLanguage);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== undefined && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== undefined && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  const fromAddWatermark = getValueByPath(fromObject, ["addWatermark"]);
  if (parentObject !== undefined && fromAddWatermark != null) {
    setValueByPath(parentObject, ["parameters", "addWatermark"], fromAddWatermark);
  }
  const fromEnhancePrompt = getValueByPath(fromObject, [
    "enhancePrompt"
  ]);
  if (parentObject !== undefined && fromEnhancePrompt != null) {
    setValueByPath(parentObject, ["parameters", "enhancePrompt"], fromEnhancePrompt);
  }
  return toObject;
}
function generateImagesParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], generateImagesConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function imageToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["gcsUri"], fromGcsUri);
  }
  const fromImageBytes = getValueByPath(fromObject, ["imageBytes"]);
  if (fromImageBytes != null) {
    setValueByPath(toObject, ["bytesBase64Encoded"], tBytes(apiClient, fromImageBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function maskReferenceConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromMaskMode = getValueByPath(fromObject, ["maskMode"]);
  if (fromMaskMode != null) {
    setValueByPath(toObject, ["maskMode"], fromMaskMode);
  }
  const fromSegmentationClasses = getValueByPath(fromObject, [
    "segmentationClasses"
  ]);
  if (fromSegmentationClasses != null) {
    setValueByPath(toObject, ["maskClasses"], fromSegmentationClasses);
  }
  const fromMaskDilation = getValueByPath(fromObject, ["maskDilation"]);
  if (fromMaskDilation != null) {
    setValueByPath(toObject, ["dilation"], fromMaskDilation);
  }
  return toObject;
}
function controlReferenceConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromControlType = getValueByPath(fromObject, ["controlType"]);
  if (fromControlType != null) {
    setValueByPath(toObject, ["controlType"], fromControlType);
  }
  const fromEnableControlImageComputation = getValueByPath(fromObject, [
    "enableControlImageComputation"
  ]);
  if (fromEnableControlImageComputation != null) {
    setValueByPath(toObject, ["computeControl"], fromEnableControlImageComputation);
  }
  return toObject;
}
function styleReferenceConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromStyleDescription = getValueByPath(fromObject, [
    "styleDescription"
  ]);
  if (fromStyleDescription != null) {
    setValueByPath(toObject, ["styleDescription"], fromStyleDescription);
  }
  return toObject;
}
function subjectReferenceConfigToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromSubjectType = getValueByPath(fromObject, ["subjectType"]);
  if (fromSubjectType != null) {
    setValueByPath(toObject, ["subjectType"], fromSubjectType);
  }
  const fromSubjectDescription = getValueByPath(fromObject, [
    "subjectDescription"
  ]);
  if (fromSubjectDescription != null) {
    setValueByPath(toObject, ["subjectDescription"], fromSubjectDescription);
  }
  return toObject;
}
function referenceImageAPIInternalToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromReferenceImage = getValueByPath(fromObject, [
    "referenceImage"
  ]);
  if (fromReferenceImage != null) {
    setValueByPath(toObject, ["referenceImage"], imageToVertex(apiClient, fromReferenceImage));
  }
  const fromReferenceId = getValueByPath(fromObject, ["referenceId"]);
  if (fromReferenceId != null) {
    setValueByPath(toObject, ["referenceId"], fromReferenceId);
  }
  const fromReferenceType = getValueByPath(fromObject, [
    "referenceType"
  ]);
  if (fromReferenceType != null) {
    setValueByPath(toObject, ["referenceType"], fromReferenceType);
  }
  const fromMaskImageConfig = getValueByPath(fromObject, [
    "maskImageConfig"
  ]);
  if (fromMaskImageConfig != null) {
    setValueByPath(toObject, ["maskImageConfig"], maskReferenceConfigToVertex(apiClient, fromMaskImageConfig));
  }
  const fromControlImageConfig = getValueByPath(fromObject, [
    "controlImageConfig"
  ]);
  if (fromControlImageConfig != null) {
    setValueByPath(toObject, ["controlImageConfig"], controlReferenceConfigToVertex(apiClient, fromControlImageConfig));
  }
  const fromStyleImageConfig = getValueByPath(fromObject, [
    "styleImageConfig"
  ]);
  if (fromStyleImageConfig != null) {
    setValueByPath(toObject, ["styleImageConfig"], styleReferenceConfigToVertex(apiClient, fromStyleImageConfig));
  }
  const fromSubjectImageConfig = getValueByPath(fromObject, [
    "subjectImageConfig"
  ]);
  if (fromSubjectImageConfig != null) {
    setValueByPath(toObject, ["subjectImageConfig"], subjectReferenceConfigToVertex(apiClient, fromSubjectImageConfig));
  }
  return toObject;
}
function editImageConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromOutputGcsUri = getValueByPath(fromObject, ["outputGcsUri"]);
  if (parentObject !== undefined && fromOutputGcsUri != null) {
    setValueByPath(parentObject, ["parameters", "storageUri"], fromOutputGcsUri);
  }
  const fromNegativePrompt = getValueByPath(fromObject, [
    "negativePrompt"
  ]);
  if (parentObject !== undefined && fromNegativePrompt != null) {
    setValueByPath(parentObject, ["parameters", "negativePrompt"], fromNegativePrompt);
  }
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== undefined && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== undefined && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromGuidanceScale = getValueByPath(fromObject, [
    "guidanceScale"
  ]);
  if (parentObject !== undefined && fromGuidanceScale != null) {
    setValueByPath(parentObject, ["parameters", "guidanceScale"], fromGuidanceScale);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== undefined && fromSeed != null) {
    setValueByPath(parentObject, ["parameters", "seed"], fromSeed);
  }
  const fromSafetyFilterLevel = getValueByPath(fromObject, [
    "safetyFilterLevel"
  ]);
  if (parentObject !== undefined && fromSafetyFilterLevel != null) {
    setValueByPath(parentObject, ["parameters", "safetySetting"], fromSafetyFilterLevel);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== undefined && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromIncludeSafetyAttributes = getValueByPath(fromObject, [
    "includeSafetyAttributes"
  ]);
  if (parentObject !== undefined && fromIncludeSafetyAttributes != null) {
    setValueByPath(parentObject, ["parameters", "includeSafetyAttributes"], fromIncludeSafetyAttributes);
  }
  const fromIncludeRaiReason = getValueByPath(fromObject, [
    "includeRaiReason"
  ]);
  if (parentObject !== undefined && fromIncludeRaiReason != null) {
    setValueByPath(parentObject, ["parameters", "includeRaiReason"], fromIncludeRaiReason);
  }
  const fromLanguage = getValueByPath(fromObject, ["language"]);
  if (parentObject !== undefined && fromLanguage != null) {
    setValueByPath(parentObject, ["parameters", "language"], fromLanguage);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== undefined && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== undefined && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  const fromEditMode = getValueByPath(fromObject, ["editMode"]);
  if (parentObject !== undefined && fromEditMode != null) {
    setValueByPath(parentObject, ["parameters", "editMode"], fromEditMode);
  }
  const fromBaseSteps = getValueByPath(fromObject, ["baseSteps"]);
  if (parentObject !== undefined && fromBaseSteps != null) {
    setValueByPath(parentObject, ["parameters", "editConfig", "baseSteps"], fromBaseSteps);
  }
  return toObject;
}
function editImageParametersInternalToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromReferenceImages = getValueByPath(fromObject, [
    "referenceImages"
  ]);
  if (fromReferenceImages != null) {
    let transformedList = fromReferenceImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return referenceImageAPIInternalToVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["instances[0]", "referenceImages"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], editImageConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function upscaleImageAPIConfigInternalToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromIncludeRaiReason = getValueByPath(fromObject, [
    "includeRaiReason"
  ]);
  if (parentObject !== undefined && fromIncludeRaiReason != null) {
    setValueByPath(parentObject, ["parameters", "includeRaiReason"], fromIncludeRaiReason);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== undefined && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== undefined && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== undefined && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (parentObject !== undefined && fromMode != null) {
    setValueByPath(parentObject, ["parameters", "mode"], fromMode);
  }
  return toObject;
}
function upscaleImageAPIParametersInternalToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["instances[0]", "image"], imageToVertex(apiClient, fromImage));
  }
  const fromUpscaleFactor = getValueByPath(fromObject, [
    "upscaleFactor"
  ]);
  if (fromUpscaleFactor != null) {
    setValueByPath(toObject, ["parameters", "upscaleConfig", "upscaleFactor"], fromUpscaleFactor);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], upscaleImageAPIConfigInternalToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function getModelParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function listModelsConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== undefined && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== undefined && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== undefined && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  const fromQueryBase = getValueByPath(fromObject, ["queryBase"]);
  if (parentObject !== undefined && fromQueryBase != null) {
    setValueByPath(parentObject, ["_url", "models_url"], tModelsUrl(apiClient, fromQueryBase));
  }
  return toObject;
}
function listModelsParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], listModelsConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function updateModelConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== undefined && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (parentObject !== undefined && fromDescription != null) {
    setValueByPath(parentObject, ["description"], fromDescription);
  }
  const fromDefaultCheckpointId = getValueByPath(fromObject, [
    "defaultCheckpointId"
  ]);
  if (parentObject !== undefined && fromDefaultCheckpointId != null) {
    setValueByPath(parentObject, ["defaultCheckpointId"], fromDefaultCheckpointId);
  }
  return toObject;
}
function updateModelParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], updateModelConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function deleteModelParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function countTokensConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== undefined && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToVertex(apiClient, tContent(apiClient, fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== undefined && fromTools != null) {
    let transformedList = fromTools;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToVertex(apiClient, item);
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromGenerationConfig = getValueByPath(fromObject, [
    "generationConfig"
  ]);
  if (parentObject !== undefined && fromGenerationConfig != null) {
    setValueByPath(parentObject, ["generationConfig"], fromGenerationConfig);
  }
  return toObject;
}
function countTokensParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], countTokensConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function computeTokensParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function generateVideosConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromNumberOfVideos = getValueByPath(fromObject, [
    "numberOfVideos"
  ]);
  if (parentObject !== undefined && fromNumberOfVideos != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfVideos);
  }
  const fromOutputGcsUri = getValueByPath(fromObject, ["outputGcsUri"]);
  if (parentObject !== undefined && fromOutputGcsUri != null) {
    setValueByPath(parentObject, ["parameters", "storageUri"], fromOutputGcsUri);
  }
  const fromFps = getValueByPath(fromObject, ["fps"]);
  if (parentObject !== undefined && fromFps != null) {
    setValueByPath(parentObject, ["parameters", "fps"], fromFps);
  }
  const fromDurationSeconds = getValueByPath(fromObject, [
    "durationSeconds"
  ]);
  if (parentObject !== undefined && fromDurationSeconds != null) {
    setValueByPath(parentObject, ["parameters", "durationSeconds"], fromDurationSeconds);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== undefined && fromSeed != null) {
    setValueByPath(parentObject, ["parameters", "seed"], fromSeed);
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== undefined && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromResolution = getValueByPath(fromObject, ["resolution"]);
  if (parentObject !== undefined && fromResolution != null) {
    setValueByPath(parentObject, ["parameters", "resolution"], fromResolution);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== undefined && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromPubsubTopic = getValueByPath(fromObject, ["pubsubTopic"]);
  if (parentObject !== undefined && fromPubsubTopic != null) {
    setValueByPath(parentObject, ["parameters", "pubsubTopic"], fromPubsubTopic);
  }
  const fromNegativePrompt = getValueByPath(fromObject, [
    "negativePrompt"
  ]);
  if (parentObject !== undefined && fromNegativePrompt != null) {
    setValueByPath(parentObject, ["parameters", "negativePrompt"], fromNegativePrompt);
  }
  const fromEnhancePrompt = getValueByPath(fromObject, [
    "enhancePrompt"
  ]);
  if (parentObject !== undefined && fromEnhancePrompt != null) {
    setValueByPath(parentObject, ["parameters", "enhancePrompt"], fromEnhancePrompt);
  }
  return toObject;
}
function generateVideosParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["instances[0]", "image"], imageToVertex(apiClient, fromImage));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], generateVideosConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function blobFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function partFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobFromMldev(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function contentFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function citationMetadataFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromCitations = getValueByPath(fromObject, ["citationSources"]);
  if (fromCitations != null) {
    setValueByPath(toObject, ["citations"], fromCitations);
  }
  return toObject;
}
function candidateFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromContent = getValueByPath(fromObject, ["content"]);
  if (fromContent != null) {
    setValueByPath(toObject, ["content"], contentFromMldev(apiClient, fromContent));
  }
  const fromCitationMetadata = getValueByPath(fromObject, [
    "citationMetadata"
  ]);
  if (fromCitationMetadata != null) {
    setValueByPath(toObject, ["citationMetadata"], citationMetadataFromMldev(apiClient, fromCitationMetadata));
  }
  const fromTokenCount = getValueByPath(fromObject, ["tokenCount"]);
  if (fromTokenCount != null) {
    setValueByPath(toObject, ["tokenCount"], fromTokenCount);
  }
  const fromFinishReason = getValueByPath(fromObject, ["finishReason"]);
  if (fromFinishReason != null) {
    setValueByPath(toObject, ["finishReason"], fromFinishReason);
  }
  const fromAvgLogprobs = getValueByPath(fromObject, ["avgLogprobs"]);
  if (fromAvgLogprobs != null) {
    setValueByPath(toObject, ["avgLogprobs"], fromAvgLogprobs);
  }
  const fromGroundingMetadata = getValueByPath(fromObject, [
    "groundingMetadata"
  ]);
  if (fromGroundingMetadata != null) {
    setValueByPath(toObject, ["groundingMetadata"], fromGroundingMetadata);
  }
  const fromIndex = getValueByPath(fromObject, ["index"]);
  if (fromIndex != null) {
    setValueByPath(toObject, ["index"], fromIndex);
  }
  const fromLogprobsResult = getValueByPath(fromObject, [
    "logprobsResult"
  ]);
  if (fromLogprobsResult != null) {
    setValueByPath(toObject, ["logprobsResult"], fromLogprobsResult);
  }
  const fromSafetyRatings = getValueByPath(fromObject, [
    "safetyRatings"
  ]);
  if (fromSafetyRatings != null) {
    setValueByPath(toObject, ["safetyRatings"], fromSafetyRatings);
  }
  return toObject;
}
function generateContentResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromCandidates = getValueByPath(fromObject, ["candidates"]);
  if (fromCandidates != null) {
    let transformedList = fromCandidates;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return candidateFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["candidates"], transformedList);
  }
  const fromModelVersion = getValueByPath(fromObject, ["modelVersion"]);
  if (fromModelVersion != null) {
    setValueByPath(toObject, ["modelVersion"], fromModelVersion);
  }
  const fromPromptFeedback = getValueByPath(fromObject, [
    "promptFeedback"
  ]);
  if (fromPromptFeedback != null) {
    setValueByPath(toObject, ["promptFeedback"], fromPromptFeedback);
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], fromUsageMetadata);
  }
  return toObject;
}
function contentEmbeddingFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromValues = getValueByPath(fromObject, ["values"]);
  if (fromValues != null) {
    setValueByPath(toObject, ["values"], fromValues);
  }
  return toObject;
}
function embedContentMetadataFromMldev() {
  const toObject = {};
  return toObject;
}
function embedContentResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromEmbeddings = getValueByPath(fromObject, ["embeddings"]);
  if (fromEmbeddings != null) {
    let transformedList = fromEmbeddings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentEmbeddingFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["embeddings"], transformedList);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], embedContentMetadataFromMldev());
  }
  return toObject;
}
function imageFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromImageBytes = getValueByPath(fromObject, [
    "bytesBase64Encoded"
  ]);
  if (fromImageBytes != null) {
    setValueByPath(toObject, ["imageBytes"], tBytes(apiClient, fromImageBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function safetyAttributesFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromCategories = getValueByPath(fromObject, [
    "safetyAttributes",
    "categories"
  ]);
  if (fromCategories != null) {
    setValueByPath(toObject, ["categories"], fromCategories);
  }
  const fromScores = getValueByPath(fromObject, [
    "safetyAttributes",
    "scores"
  ]);
  if (fromScores != null) {
    setValueByPath(toObject, ["scores"], fromScores);
  }
  const fromContentType = getValueByPath(fromObject, ["contentType"]);
  if (fromContentType != null) {
    setValueByPath(toObject, ["contentType"], fromContentType);
  }
  return toObject;
}
function generatedImageFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromImage = getValueByPath(fromObject, ["_self"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["image"], imageFromMldev(apiClient, fromImage));
  }
  const fromRaiFilteredReason = getValueByPath(fromObject, [
    "raiFilteredReason"
  ]);
  if (fromRaiFilteredReason != null) {
    setValueByPath(toObject, ["raiFilteredReason"], fromRaiFilteredReason);
  }
  const fromSafetyAttributes = getValueByPath(fromObject, ["_self"]);
  if (fromSafetyAttributes != null) {
    setValueByPath(toObject, ["safetyAttributes"], safetyAttributesFromMldev(apiClient, fromSafetyAttributes));
  }
  return toObject;
}
function generateImagesResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  const fromPositivePromptSafetyAttributes = getValueByPath(fromObject, [
    "positivePromptSafetyAttributes"
  ]);
  if (fromPositivePromptSafetyAttributes != null) {
    setValueByPath(toObject, ["positivePromptSafetyAttributes"], safetyAttributesFromMldev(apiClient, fromPositivePromptSafetyAttributes));
  }
  return toObject;
}
function tunedModelInfoFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  return toObject;
}
function modelFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromVersion = getValueByPath(fromObject, ["version"]);
  if (fromVersion != null) {
    setValueByPath(toObject, ["version"], fromVersion);
  }
  const fromTunedModelInfo = getValueByPath(fromObject, ["_self"]);
  if (fromTunedModelInfo != null) {
    setValueByPath(toObject, ["tunedModelInfo"], tunedModelInfoFromMldev(apiClient, fromTunedModelInfo));
  }
  const fromInputTokenLimit = getValueByPath(fromObject, [
    "inputTokenLimit"
  ]);
  if (fromInputTokenLimit != null) {
    setValueByPath(toObject, ["inputTokenLimit"], fromInputTokenLimit);
  }
  const fromOutputTokenLimit = getValueByPath(fromObject, [
    "outputTokenLimit"
  ]);
  if (fromOutputTokenLimit != null) {
    setValueByPath(toObject, ["outputTokenLimit"], fromOutputTokenLimit);
  }
  const fromSupportedActions = getValueByPath(fromObject, [
    "supportedGenerationMethods"
  ]);
  if (fromSupportedActions != null) {
    setValueByPath(toObject, ["supportedActions"], fromSupportedActions);
  }
  return toObject;
}
function listModelsResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromModels = getValueByPath(fromObject, ["_self"]);
  if (fromModels != null) {
    let transformedList = tExtractModels(apiClient, fromModels);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modelFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["models"], transformedList);
  }
  return toObject;
}
function deleteModelResponseFromMldev() {
  const toObject = {};
  return toObject;
}
function countTokensResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromTotalTokens = getValueByPath(fromObject, ["totalTokens"]);
  if (fromTotalTokens != null) {
    setValueByPath(toObject, ["totalTokens"], fromTotalTokens);
  }
  const fromCachedContentTokenCount = getValueByPath(fromObject, [
    "cachedContentTokenCount"
  ]);
  if (fromCachedContentTokenCount != null) {
    setValueByPath(toObject, ["cachedContentTokenCount"], fromCachedContentTokenCount);
  }
  return toObject;
}
function videoFromMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["video", "uri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, [
    "video",
    "encodedVideo"
  ]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["videoBytes"], tBytes(apiClient, fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["encoding"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function generatedVideoFromMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromVideo = getValueByPath(fromObject, ["_self"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], videoFromMldev$1(apiClient, fromVideo));
  }
  return toObject;
}
function generateVideosResponseFromMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromGeneratedVideos = getValueByPath(fromObject, [
    "generatedSamples"
  ]);
  if (fromGeneratedVideos != null) {
    let transformedList = fromGeneratedVideos;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedVideoFromMldev$1(apiClient, item);
      });
    }
    setValueByPath(toObject, ["generatedVideos"], transformedList);
  }
  const fromRaiMediaFilteredCount = getValueByPath(fromObject, [
    "raiMediaFilteredCount"
  ]);
  if (fromRaiMediaFilteredCount != null) {
    setValueByPath(toObject, ["raiMediaFilteredCount"], fromRaiMediaFilteredCount);
  }
  const fromRaiMediaFilteredReasons = getValueByPath(fromObject, [
    "raiMediaFilteredReasons"
  ]);
  if (fromRaiMediaFilteredReasons != null) {
    setValueByPath(toObject, ["raiMediaFilteredReasons"], fromRaiMediaFilteredReasons);
  }
  return toObject;
}
function generateVideosOperationFromMldev$1(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, [
    "response",
    "generateVideoResponse"
  ]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateVideosResponseFromMldev$1(apiClient, fromResponse));
  }
  return toObject;
}
function blobFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function partFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobFromVertex(apiClient, fromInlineData));
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  return toObject;
}
function contentFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function citationMetadataFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromCitations = getValueByPath(fromObject, ["citations"]);
  if (fromCitations != null) {
    setValueByPath(toObject, ["citations"], fromCitations);
  }
  return toObject;
}
function candidateFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromContent = getValueByPath(fromObject, ["content"]);
  if (fromContent != null) {
    setValueByPath(toObject, ["content"], contentFromVertex(apiClient, fromContent));
  }
  const fromCitationMetadata = getValueByPath(fromObject, [
    "citationMetadata"
  ]);
  if (fromCitationMetadata != null) {
    setValueByPath(toObject, ["citationMetadata"], citationMetadataFromVertex(apiClient, fromCitationMetadata));
  }
  const fromFinishMessage = getValueByPath(fromObject, [
    "finishMessage"
  ]);
  if (fromFinishMessage != null) {
    setValueByPath(toObject, ["finishMessage"], fromFinishMessage);
  }
  const fromFinishReason = getValueByPath(fromObject, ["finishReason"]);
  if (fromFinishReason != null) {
    setValueByPath(toObject, ["finishReason"], fromFinishReason);
  }
  const fromAvgLogprobs = getValueByPath(fromObject, ["avgLogprobs"]);
  if (fromAvgLogprobs != null) {
    setValueByPath(toObject, ["avgLogprobs"], fromAvgLogprobs);
  }
  const fromGroundingMetadata = getValueByPath(fromObject, [
    "groundingMetadata"
  ]);
  if (fromGroundingMetadata != null) {
    setValueByPath(toObject, ["groundingMetadata"], fromGroundingMetadata);
  }
  const fromIndex = getValueByPath(fromObject, ["index"]);
  if (fromIndex != null) {
    setValueByPath(toObject, ["index"], fromIndex);
  }
  const fromLogprobsResult = getValueByPath(fromObject, [
    "logprobsResult"
  ]);
  if (fromLogprobsResult != null) {
    setValueByPath(toObject, ["logprobsResult"], fromLogprobsResult);
  }
  const fromSafetyRatings = getValueByPath(fromObject, [
    "safetyRatings"
  ]);
  if (fromSafetyRatings != null) {
    setValueByPath(toObject, ["safetyRatings"], fromSafetyRatings);
  }
  return toObject;
}
function generateContentResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromCandidates = getValueByPath(fromObject, ["candidates"]);
  if (fromCandidates != null) {
    let transformedList = fromCandidates;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return candidateFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["candidates"], transformedList);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromResponseId = getValueByPath(fromObject, ["responseId"]);
  if (fromResponseId != null) {
    setValueByPath(toObject, ["responseId"], fromResponseId);
  }
  const fromModelVersion = getValueByPath(fromObject, ["modelVersion"]);
  if (fromModelVersion != null) {
    setValueByPath(toObject, ["modelVersion"], fromModelVersion);
  }
  const fromPromptFeedback = getValueByPath(fromObject, [
    "promptFeedback"
  ]);
  if (fromPromptFeedback != null) {
    setValueByPath(toObject, ["promptFeedback"], fromPromptFeedback);
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], fromUsageMetadata);
  }
  return toObject;
}
function contentEmbeddingStatisticsFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromTruncated = getValueByPath(fromObject, ["truncated"]);
  if (fromTruncated != null) {
    setValueByPath(toObject, ["truncated"], fromTruncated);
  }
  const fromTokenCount = getValueByPath(fromObject, ["token_count"]);
  if (fromTokenCount != null) {
    setValueByPath(toObject, ["tokenCount"], fromTokenCount);
  }
  return toObject;
}
function contentEmbeddingFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromValues = getValueByPath(fromObject, ["values"]);
  if (fromValues != null) {
    setValueByPath(toObject, ["values"], fromValues);
  }
  const fromStatistics = getValueByPath(fromObject, ["statistics"]);
  if (fromStatistics != null) {
    setValueByPath(toObject, ["statistics"], contentEmbeddingStatisticsFromVertex(apiClient, fromStatistics));
  }
  return toObject;
}
function embedContentMetadataFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromBillableCharacterCount = getValueByPath(fromObject, [
    "billableCharacterCount"
  ]);
  if (fromBillableCharacterCount != null) {
    setValueByPath(toObject, ["billableCharacterCount"], fromBillableCharacterCount);
  }
  return toObject;
}
function embedContentResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromEmbeddings = getValueByPath(fromObject, [
    "predictions[]",
    "embeddings"
  ]);
  if (fromEmbeddings != null) {
    let transformedList = fromEmbeddings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentEmbeddingFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["embeddings"], transformedList);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], embedContentMetadataFromVertex(apiClient, fromMetadata));
  }
  return toObject;
}
function imageFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["gcsUri"], fromGcsUri);
  }
  const fromImageBytes = getValueByPath(fromObject, [
    "bytesBase64Encoded"
  ]);
  if (fromImageBytes != null) {
    setValueByPath(toObject, ["imageBytes"], tBytes(apiClient, fromImageBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function safetyAttributesFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromCategories = getValueByPath(fromObject, [
    "safetyAttributes",
    "categories"
  ]);
  if (fromCategories != null) {
    setValueByPath(toObject, ["categories"], fromCategories);
  }
  const fromScores = getValueByPath(fromObject, [
    "safetyAttributes",
    "scores"
  ]);
  if (fromScores != null) {
    setValueByPath(toObject, ["scores"], fromScores);
  }
  const fromContentType = getValueByPath(fromObject, ["contentType"]);
  if (fromContentType != null) {
    setValueByPath(toObject, ["contentType"], fromContentType);
  }
  return toObject;
}
function generatedImageFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromImage = getValueByPath(fromObject, ["_self"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["image"], imageFromVertex(apiClient, fromImage));
  }
  const fromRaiFilteredReason = getValueByPath(fromObject, [
    "raiFilteredReason"
  ]);
  if (fromRaiFilteredReason != null) {
    setValueByPath(toObject, ["raiFilteredReason"], fromRaiFilteredReason);
  }
  const fromSafetyAttributes = getValueByPath(fromObject, ["_self"]);
  if (fromSafetyAttributes != null) {
    setValueByPath(toObject, ["safetyAttributes"], safetyAttributesFromVertex(apiClient, fromSafetyAttributes));
  }
  const fromEnhancedPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromEnhancedPrompt != null) {
    setValueByPath(toObject, ["enhancedPrompt"], fromEnhancedPrompt);
  }
  return toObject;
}
function generateImagesResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  const fromPositivePromptSafetyAttributes = getValueByPath(fromObject, [
    "positivePromptSafetyAttributes"
  ]);
  if (fromPositivePromptSafetyAttributes != null) {
    setValueByPath(toObject, ["positivePromptSafetyAttributes"], safetyAttributesFromVertex(apiClient, fromPositivePromptSafetyAttributes));
  }
  return toObject;
}
function editImageResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  return toObject;
}
function upscaleImageResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  return toObject;
}
function endpointFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["endpoint"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDeployedModelId = getValueByPath(fromObject, [
    "deployedModelId"
  ]);
  if (fromDeployedModelId != null) {
    setValueByPath(toObject, ["deployedModelId"], fromDeployedModelId);
  }
  return toObject;
}
function tunedModelInfoFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromBaseModel = getValueByPath(fromObject, [
    "labels",
    "google-vertex-llm-tuning-base-model-id"
  ]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  return toObject;
}
function checkpointFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromCheckpointId = getValueByPath(fromObject, ["checkpointId"]);
  if (fromCheckpointId != null) {
    setValueByPath(toObject, ["checkpointId"], fromCheckpointId);
  }
  const fromEpoch = getValueByPath(fromObject, ["epoch"]);
  if (fromEpoch != null) {
    setValueByPath(toObject, ["epoch"], fromEpoch);
  }
  const fromStep = getValueByPath(fromObject, ["step"]);
  if (fromStep != null) {
    setValueByPath(toObject, ["step"], fromStep);
  }
  return toObject;
}
function modelFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromVersion = getValueByPath(fromObject, ["versionId"]);
  if (fromVersion != null) {
    setValueByPath(toObject, ["version"], fromVersion);
  }
  const fromEndpoints = getValueByPath(fromObject, ["deployedModels"]);
  if (fromEndpoints != null) {
    let transformedList = fromEndpoints;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return endpointFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["endpoints"], transformedList);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (fromLabels != null) {
    setValueByPath(toObject, ["labels"], fromLabels);
  }
  const fromTunedModelInfo = getValueByPath(fromObject, ["_self"]);
  if (fromTunedModelInfo != null) {
    setValueByPath(toObject, ["tunedModelInfo"], tunedModelInfoFromVertex(apiClient, fromTunedModelInfo));
  }
  const fromDefaultCheckpointId = getValueByPath(fromObject, [
    "defaultCheckpointId"
  ]);
  if (fromDefaultCheckpointId != null) {
    setValueByPath(toObject, ["defaultCheckpointId"], fromDefaultCheckpointId);
  }
  const fromCheckpoints = getValueByPath(fromObject, ["checkpoints"]);
  if (fromCheckpoints != null) {
    let transformedList = fromCheckpoints;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return checkpointFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["checkpoints"], transformedList);
  }
  return toObject;
}
function listModelsResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromModels = getValueByPath(fromObject, ["_self"]);
  if (fromModels != null) {
    let transformedList = tExtractModels(apiClient, fromModels);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modelFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["models"], transformedList);
  }
  return toObject;
}
function deleteModelResponseFromVertex() {
  const toObject = {};
  return toObject;
}
function countTokensResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromTotalTokens = getValueByPath(fromObject, ["totalTokens"]);
  if (fromTotalTokens != null) {
    setValueByPath(toObject, ["totalTokens"], fromTotalTokens);
  }
  return toObject;
}
function computeTokensResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromTokensInfo = getValueByPath(fromObject, ["tokensInfo"]);
  if (fromTokensInfo != null) {
    setValueByPath(toObject, ["tokensInfo"], fromTokensInfo);
  }
  return toObject;
}
function videoFromVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, [
    "bytesBase64Encoded"
  ]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["videoBytes"], tBytes(apiClient, fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function generatedVideoFromVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromVideo = getValueByPath(fromObject, ["_self"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], videoFromVertex$1(apiClient, fromVideo));
  }
  return toObject;
}
function generateVideosResponseFromVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromGeneratedVideos = getValueByPath(fromObject, ["videos"]);
  if (fromGeneratedVideos != null) {
    let transformedList = fromGeneratedVideos;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedVideoFromVertex$1(apiClient, item);
      });
    }
    setValueByPath(toObject, ["generatedVideos"], transformedList);
  }
  const fromRaiMediaFilteredCount = getValueByPath(fromObject, [
    "raiMediaFilteredCount"
  ]);
  if (fromRaiMediaFilteredCount != null) {
    setValueByPath(toObject, ["raiMediaFilteredCount"], fromRaiMediaFilteredCount);
  }
  const fromRaiMediaFilteredReasons = getValueByPath(fromObject, [
    "raiMediaFilteredReasons"
  ]);
  if (fromRaiMediaFilteredReasons != null) {
    setValueByPath(toObject, ["raiMediaFilteredReasons"], fromRaiMediaFilteredReasons);
  }
  return toObject;
}
function generateVideosOperationFromVertex$1(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateVideosResponseFromVertex$1(apiClient, fromResponse));
  }
  return toObject;
}
var FUNCTION_RESPONSE_REQUIRES_ID = "FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";
async function handleWebSocketMessage(apiClient, onmessage, event) {
  const serverMessage = new LiveServerMessage;
  let data;
  if (event.data instanceof Blob) {
    data = JSON.parse(await event.data.text());
  } else {
    data = JSON.parse(event.data);
  }
  if (apiClient.isVertexAI()) {
    const resp = liveServerMessageFromVertex(apiClient, data);
    Object.assign(serverMessage, resp);
  } else {
    const resp = liveServerMessageFromMldev(apiClient, data);
    Object.assign(serverMessage, resp);
  }
  onmessage(serverMessage);
}

class Live {
  constructor(apiClient, auth, webSocketFactory) {
    this.apiClient = apiClient;
    this.auth = auth;
    this.webSocketFactory = webSocketFactory;
  }
  async connect(params) {
    var _a, _b, _c, _d;
    const websocketBaseUrl = this.apiClient.getWebsocketBaseUrl();
    const apiVersion = this.apiClient.getApiVersion();
    let url;
    const headers = mapToHeaders(this.apiClient.getDefaultHeaders());
    if (this.apiClient.isVertexAI()) {
      url = `${websocketBaseUrl}/ws/google.cloud.aiplatform.${apiVersion}.LlmBidiService/BidiGenerateContent`;
      await this.auth.addAuthHeaders(headers);
    } else {
      const apiKey = this.apiClient.getApiKey();
      url = `${websocketBaseUrl}/ws/google.ai.generativelanguage.${apiVersion}.GenerativeService.BidiGenerateContent?key=${apiKey}`;
    }
    let onopenResolve = () => {};
    const onopenPromise = new Promise((resolve) => {
      onopenResolve = resolve;
    });
    const callbacks = params.callbacks;
    const onopenAwaitedCallback = function() {
      var _a2;
      (_a2 = callbacks === null || callbacks === undefined ? undefined : callbacks.onopen) === null || _a2 === undefined || _a2.call(callbacks);
      onopenResolve({});
    };
    const apiClient = this.apiClient;
    const websocketCallbacks = {
      onopen: onopenAwaitedCallback,
      onmessage: (event) => {
        handleWebSocketMessage(apiClient, callbacks.onmessage, event);
      },
      onerror: (_a = callbacks === null || callbacks === undefined ? undefined : callbacks.onerror) !== null && _a !== undefined ? _a : function(e) {},
      onclose: (_b = callbacks === null || callbacks === undefined ? undefined : callbacks.onclose) !== null && _b !== undefined ? _b : function(e) {}
    };
    const conn = this.webSocketFactory.create(url, headersToMap(headers), websocketCallbacks);
    conn.connect();
    await onopenPromise;
    let transformedModel = tModel(this.apiClient, params.model);
    if (this.apiClient.isVertexAI() && transformedModel.startsWith("publishers/")) {
      const project = this.apiClient.getProject();
      const location2 = this.apiClient.getLocation();
      transformedModel = `projects/${project}/locations/${location2}/` + transformedModel;
    }
    let clientMessage = {};
    if (this.apiClient.isVertexAI() && ((_c = params.config) === null || _c === undefined ? undefined : _c.responseModalities) === undefined) {
      if (params.config === undefined) {
        params.config = { responseModalities: [Modality.AUDIO] };
      } else {
        params.config.responseModalities = [Modality.AUDIO];
      }
    }
    if ((_d = params.config) === null || _d === undefined ? undefined : _d.generationConfig) {
      console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");
    }
    const liveConnectParameters = {
      model: transformedModel,
      config: params.config,
      callbacks: params.callbacks
    };
    if (this.apiClient.isVertexAI()) {
      clientMessage = liveConnectParametersToVertex(this.apiClient, liveConnectParameters);
    } else {
      clientMessage = liveConnectParametersToMldev(this.apiClient, liveConnectParameters);
    }
    delete clientMessage["config"];
    conn.send(JSON.stringify(clientMessage));
    return new Session(conn, this.apiClient);
  }
}
var defaultLiveSendClientContentParamerters = {
  turnComplete: true
};

class Session {
  constructor(conn, apiClient) {
    this.conn = conn;
    this.apiClient = apiClient;
  }
  tLiveClientContent(apiClient, params) {
    if (params.turns !== null && params.turns !== undefined) {
      let contents = [];
      try {
        contents = tContents(apiClient, params.turns);
        if (apiClient.isVertexAI()) {
          contents = contents.map((item) => contentToVertex(apiClient, item));
        } else {
          contents = contents.map((item) => contentToMldev(apiClient, item));
        }
      } catch (_a) {
        throw new Error(`Failed to parse client content "turns", type: '${typeof params.turns}'`);
      }
      return {
        clientContent: { turns: contents, turnComplete: params.turnComplete }
      };
    }
    return {
      clientContent: { turnComplete: params.turnComplete }
    };
  }
  tLiveClienttToolResponse(apiClient, params) {
    let functionResponses = [];
    if (params.functionResponses == null) {
      throw new Error("functionResponses is required.");
    }
    if (!Array.isArray(params.functionResponses)) {
      functionResponses = [params.functionResponses];
    } else {
      functionResponses = params.functionResponses;
    }
    if (functionResponses.length === 0) {
      throw new Error("functionResponses is required.");
    }
    for (const functionResponse of functionResponses) {
      if (typeof functionResponse !== "object" || functionResponse === null || !("name" in functionResponse) || !("response" in functionResponse)) {
        throw new Error(`Could not parse function response, type '${typeof functionResponse}'.`);
      }
      if (!apiClient.isVertexAI() && !("id" in functionResponse)) {
        throw new Error(FUNCTION_RESPONSE_REQUIRES_ID);
      }
    }
    const clientMessage = {
      toolResponse: { functionResponses }
    };
    return clientMessage;
  }
  sendClientContent(params) {
    params = Object.assign(Object.assign({}, defaultLiveSendClientContentParamerters), params);
    const clientMessage = this.tLiveClientContent(this.apiClient, params);
    this.conn.send(JSON.stringify(clientMessage));
  }
  sendRealtimeInput(params) {
    let clientMessage = {};
    if (this.apiClient.isVertexAI()) {
      clientMessage = {
        realtimeInput: liveSendRealtimeInputParametersToVertex(this.apiClient, params)
      };
    } else {
      clientMessage = {
        realtimeInput: liveSendRealtimeInputParametersToMldev(this.apiClient, params)
      };
    }
    this.conn.send(JSON.stringify(clientMessage));
  }
  sendToolResponse(params) {
    if (params.functionResponses == null) {
      throw new Error("Tool response parameters are required.");
    }
    const clientMessage = this.tLiveClienttToolResponse(this.apiClient, params);
    this.conn.send(JSON.stringify(clientMessage));
  }
  close() {
    this.conn.close();
  }
}
function headersToMap(headers) {
  const headerMap = {};
  headers.forEach((value, key) => {
    headerMap[key] = value;
  });
  return headerMap;
}
function mapToHeaders(map) {
  const headers = new Headers;
  for (const [key, value] of Object.entries(map)) {
    headers.append(key, value);
  }
  return headers;
}

class Models extends BaseModule {
  constructor(apiClient) {
    super();
    this.apiClient = apiClient;
    this.generateContent = async (params) => {
      return await this.generateContentInternal(params);
    };
    this.generateContentStream = async (params) => {
      return await this.generateContentStreamInternal(params);
    };
    this.generateImages = async (params) => {
      return await this.generateImagesInternal(params).then((apiResponse) => {
        var _a;
        let positivePromptSafetyAttributes;
        const generatedImages = [];
        if (apiResponse === null || apiResponse === undefined ? undefined : apiResponse.generatedImages) {
          for (const generatedImage of apiResponse.generatedImages) {
            if (generatedImage && (generatedImage === null || generatedImage === undefined ? undefined : generatedImage.safetyAttributes) && ((_a = generatedImage === null || generatedImage === undefined ? undefined : generatedImage.safetyAttributes) === null || _a === undefined ? undefined : _a.contentType) === "Positive Prompt") {
              positivePromptSafetyAttributes = generatedImage === null || generatedImage === undefined ? undefined : generatedImage.safetyAttributes;
            } else {
              generatedImages.push(generatedImage);
            }
          }
        }
        let response;
        if (positivePromptSafetyAttributes) {
          response = {
            generatedImages,
            positivePromptSafetyAttributes
          };
        } else {
          response = {
            generatedImages
          };
        }
        return response;
      });
    };
    this.list = async (params) => {
      var _a;
      const defaultConfig = {
        queryBase: true
      };
      const actualConfig = Object.assign(Object.assign({}, defaultConfig), params === null || params === undefined ? undefined : params.config);
      const actualParams = {
        config: actualConfig
      };
      if (this.apiClient.isVertexAI()) {
        if (!actualParams.config.queryBase) {
          if ((_a = actualParams.config) === null || _a === undefined ? undefined : _a.filter) {
            throw new Error("Filtering tuned models list for Vertex AI is not currently supported");
          } else {
            actualParams.config.filter = "labels.tune-type:*";
          }
        }
      }
      return new Pager(PagedItem.PAGED_ITEM_MODELS, (x) => this.listInternal(x), await this.listInternal(actualParams), actualParams);
    };
    this.editImage = async (params) => {
      const paramsInternal = {
        model: params.model,
        prompt: params.prompt,
        referenceImages: [],
        config: params.config
      };
      if (params.referenceImages) {
        if (params.referenceImages) {
          paramsInternal.referenceImages = params.referenceImages.map((img) => img.toReferenceImageAPI());
        }
      }
      return await this.editImageInternal(paramsInternal);
    };
    this.upscaleImage = async (params) => {
      let apiConfig = {
        numberOfImages: 1,
        mode: "upscale"
      };
      if (params.config) {
        apiConfig = Object.assign(Object.assign({}, apiConfig), params.config);
      }
      const apiParams = {
        model: params.model,
        image: params.image,
        upscaleFactor: params.upscaleFactor,
        config: apiConfig
      };
      return await this.upscaleImageInternal(apiParams);
    };
  }
  async generateContentInternal(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = generateContentParametersToVertex(this.apiClient, params);
      path = formatMap("{model}:generateContent", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateContentResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new GenerateContentResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = generateContentParametersToMldev(this.apiClient, params);
      path = formatMap("{model}:generateContent", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateContentResponseFromMldev(this.apiClient, apiResponse);
        const typedResp = new GenerateContentResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async generateContentStreamInternal(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = generateContentParametersToVertex(this.apiClient, params);
      path = formatMap("{model}:streamGenerateContent?alt=sse", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      const apiClient = this.apiClient;
      response = apiClient.requestStream({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      });
      return response.then(function(apiResponse) {
        return __asyncGenerator(this, arguments, function* () {
          var _a2, e_1, _b2, _c2;
          try {
            for (var _d2 = true, apiResponse_1 = __asyncValues(apiResponse), apiResponse_1_1;apiResponse_1_1 = yield __await(apiResponse_1.next()), _a2 = apiResponse_1_1.done, !_a2; _d2 = true) {
              _c2 = apiResponse_1_1.value;
              _d2 = false;
              const chunk = _c2;
              const resp = generateContentResponseFromVertex(apiClient, yield __await(chunk.json()));
              const typedResp = new GenerateContentResponse;
              Object.assign(typedResp, resp);
              yield yield __await(typedResp);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (!_d2 && !_a2 && (_b2 = apiResponse_1.return))
                yield __await(_b2.call(apiResponse_1));
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        });
      });
    } else {
      const body = generateContentParametersToMldev(this.apiClient, params);
      path = formatMap("{model}:streamGenerateContent?alt=sse", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      const apiClient = this.apiClient;
      response = apiClient.requestStream({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      });
      return response.then(function(apiResponse) {
        return __asyncGenerator(this, arguments, function* () {
          var _a2, e_2, _b2, _c2;
          try {
            for (var _d2 = true, apiResponse_2 = __asyncValues(apiResponse), apiResponse_2_1;apiResponse_2_1 = yield __await(apiResponse_2.next()), _a2 = apiResponse_2_1.done, !_a2; _d2 = true) {
              _c2 = apiResponse_2_1.value;
              _d2 = false;
              const chunk = _c2;
              const resp = generateContentResponseFromMldev(apiClient, yield __await(chunk.json()));
              const typedResp = new GenerateContentResponse;
              Object.assign(typedResp, resp);
              yield yield __await(typedResp);
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (!_d2 && !_a2 && (_b2 = apiResponse_2.return))
                yield __await(_b2.call(apiResponse_2));
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        });
      });
    }
  }
  async embedContent(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = embedContentParametersToVertex(this.apiClient, params);
      path = formatMap("{model}:predict", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = embedContentResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new EmbedContentResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = embedContentParametersToMldev(this.apiClient, params);
      path = formatMap("{model}:batchEmbedContents", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = embedContentResponseFromMldev(this.apiClient, apiResponse);
        const typedResp = new EmbedContentResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async generateImagesInternal(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = generateImagesParametersToVertex(this.apiClient, params);
      path = formatMap("{model}:predict", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateImagesResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new GenerateImagesResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = generateImagesParametersToMldev(this.apiClient, params);
      path = formatMap("{model}:predict", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateImagesResponseFromMldev(this.apiClient, apiResponse);
        const typedResp = new GenerateImagesResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async editImageInternal(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = editImageParametersInternalToVertex(this.apiClient, params);
      path = formatMap("{model}:predict", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = editImageResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new EditImageResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      throw new Error("This method is only supported by the Vertex AI.");
    }
  }
  async upscaleImageInternal(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = upscaleImageAPIParametersInternalToVertex(this.apiClient, params);
      path = formatMap("{model}:predict", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = upscaleImageResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new UpscaleImageResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      throw new Error("This method is only supported by the Vertex AI.");
    }
  }
  async get(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = getModelParametersToVertex(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = modelFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      const body = getModelParametersToMldev(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = modelFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
  async listInternal(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = listModelsParametersToVertex(this.apiClient, params);
      path = formatMap("{models_url}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = listModelsResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new ListModelsResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = listModelsParametersToMldev(this.apiClient, params);
      path = formatMap("{models_url}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = listModelsResponseFromMldev(this.apiClient, apiResponse);
        const typedResp = new ListModelsResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async update(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = updateModelParametersToVertex(this.apiClient, params);
      path = formatMap("{model}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "PATCH",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = modelFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      const body = updateModelParametersToMldev(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "PATCH",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = modelFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
  async delete(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = deleteModelParametersToVertex(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "DELETE",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then(() => {
        const resp = deleteModelResponseFromVertex();
        const typedResp = new DeleteModelResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = deleteModelParametersToMldev(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "DELETE",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then(() => {
        const resp = deleteModelResponseFromMldev();
        const typedResp = new DeleteModelResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async countTokens(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = countTokensParametersToVertex(this.apiClient, params);
      path = formatMap("{model}:countTokens", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = countTokensResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new CountTokensResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = countTokensParametersToMldev(this.apiClient, params);
      path = formatMap("{model}:countTokens", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = countTokensResponseFromMldev(this.apiClient, apiResponse);
        const typedResp = new CountTokensResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async computeTokens(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = computeTokensParametersToVertex(this.apiClient, params);
      path = formatMap("{model}:computeTokens", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = computeTokensResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new ComputeTokensResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      throw new Error("This method is only supported by the Vertex AI.");
    }
  }
  async generateVideos(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = generateVideosParametersToVertex(this.apiClient, params);
      path = formatMap("{model}:predictLongRunning", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateVideosOperationFromVertex$1(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      const body = generateVideosParametersToMldev(this.apiClient, params);
      path = formatMap("{model}:predictLongRunning", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateVideosOperationFromMldev$1(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
}
function getOperationParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromOperationName = getValueByPath(fromObject, [
    "operationName"
  ]);
  if (fromOperationName != null) {
    setValueByPath(toObject, ["_url", "operationName"], fromOperationName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function getOperationParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromOperationName = getValueByPath(fromObject, [
    "operationName"
  ]);
  if (fromOperationName != null) {
    setValueByPath(toObject, ["_url", "operationName"], fromOperationName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function fetchPredictOperationParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromOperationName = getValueByPath(fromObject, [
    "operationName"
  ]);
  if (fromOperationName != null) {
    setValueByPath(toObject, ["operationName"], fromOperationName);
  }
  const fromResourceName = getValueByPath(fromObject, ["resourceName"]);
  if (fromResourceName != null) {
    setValueByPath(toObject, ["_url", "resourceName"], fromResourceName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function videoFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["video", "uri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, [
    "video",
    "encodedVideo"
  ]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["videoBytes"], tBytes(apiClient, fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["encoding"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function generatedVideoFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromVideo = getValueByPath(fromObject, ["_self"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], videoFromMldev(apiClient, fromVideo));
  }
  return toObject;
}
function generateVideosResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromGeneratedVideos = getValueByPath(fromObject, [
    "generatedSamples"
  ]);
  if (fromGeneratedVideos != null) {
    let transformedList = fromGeneratedVideos;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedVideoFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["generatedVideos"], transformedList);
  }
  const fromRaiMediaFilteredCount = getValueByPath(fromObject, [
    "raiMediaFilteredCount"
  ]);
  if (fromRaiMediaFilteredCount != null) {
    setValueByPath(toObject, ["raiMediaFilteredCount"], fromRaiMediaFilteredCount);
  }
  const fromRaiMediaFilteredReasons = getValueByPath(fromObject, [
    "raiMediaFilteredReasons"
  ]);
  if (fromRaiMediaFilteredReasons != null) {
    setValueByPath(toObject, ["raiMediaFilteredReasons"], fromRaiMediaFilteredReasons);
  }
  return toObject;
}
function generateVideosOperationFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, [
    "response",
    "generateVideoResponse"
  ]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateVideosResponseFromMldev(apiClient, fromResponse));
  }
  return toObject;
}
function videoFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, [
    "bytesBase64Encoded"
  ]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["videoBytes"], tBytes(apiClient, fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function generatedVideoFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromVideo = getValueByPath(fromObject, ["_self"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], videoFromVertex(apiClient, fromVideo));
  }
  return toObject;
}
function generateVideosResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromGeneratedVideos = getValueByPath(fromObject, ["videos"]);
  if (fromGeneratedVideos != null) {
    let transformedList = fromGeneratedVideos;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedVideoFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["generatedVideos"], transformedList);
  }
  const fromRaiMediaFilteredCount = getValueByPath(fromObject, [
    "raiMediaFilteredCount"
  ]);
  if (fromRaiMediaFilteredCount != null) {
    setValueByPath(toObject, ["raiMediaFilteredCount"], fromRaiMediaFilteredCount);
  }
  const fromRaiMediaFilteredReasons = getValueByPath(fromObject, [
    "raiMediaFilteredReasons"
  ]);
  if (fromRaiMediaFilteredReasons != null) {
    setValueByPath(toObject, ["raiMediaFilteredReasons"], fromRaiMediaFilteredReasons);
  }
  return toObject;
}
function generateVideosOperationFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateVideosResponseFromVertex(apiClient, fromResponse));
  }
  return toObject;
}

class Operations extends BaseModule {
  constructor(apiClient) {
    super();
    this.apiClient = apiClient;
  }
  async getVideosOperation(parameters) {
    const operation = parameters.operation;
    const config = parameters.config;
    if (operation.name === undefined || operation.name === "") {
      throw new Error("Operation name is required.");
    }
    if (this.apiClient.isVertexAI()) {
      const resourceName2 = operation.name.split("/operations/")[0];
      let httpOptions = undefined;
      if (config && "httpOptions" in config) {
        httpOptions = config.httpOptions;
      }
      return this.fetchPredictVideosOperationInternal({
        operationName: operation.name,
        resourceName: resourceName2,
        config: { httpOptions }
      });
    } else {
      return this.getVideosOperationInternal({
        operationName: operation.name,
        config
      });
    }
  }
  async getVideosOperationInternal(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = getOperationParametersToVertex(this.apiClient, params);
      path = formatMap("{operationName}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateVideosOperationFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      const body = getOperationParametersToMldev(this.apiClient, params);
      path = formatMap("{operationName}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateVideosOperationFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
  async fetchPredictVideosOperationInternal(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = fetchPredictOperationParametersToVertex(this.apiClient, params);
      path = formatMap("{resourceName}:fetchPredictOperation", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = generateVideosOperationFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      throw new Error("This method is only supported by the Vertex AI.");
    }
  }
}
var CONTENT_TYPE_HEADER = "Content-Type";
var SERVER_TIMEOUT_HEADER = "X-Server-Timeout";
var USER_AGENT_HEADER = "User-Agent";
var GOOGLE_API_CLIENT_HEADER = "x-goog-api-client";
var SDK_VERSION = "0.14.1";
var LIBRARY_LABEL = `google-genai-sdk/${SDK_VERSION}`;
var VERTEX_AI_API_DEFAULT_VERSION = "v1beta1";
var GOOGLE_AI_API_DEFAULT_VERSION = "v1beta";
var responseLineRE = /^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;

class ClientError extends Error {
  constructor(message, stackTrace) {
    if (stackTrace) {
      super(message, { cause: stackTrace });
    } else {
      super(message, { cause: new Error().stack });
    }
    this.message = message;
    this.name = "ClientError";
  }
}

class ServerError extends Error {
  constructor(message, stackTrace) {
    if (stackTrace) {
      super(message, { cause: stackTrace });
    } else {
      super(message, { cause: new Error().stack });
    }
    this.message = message;
    this.name = "ServerError";
  }
}

class ApiClient {
  constructor(opts) {
    var _a, _b;
    this.clientOptions = Object.assign(Object.assign({}, opts), { project: opts.project, location: opts.location, apiKey: opts.apiKey, vertexai: opts.vertexai });
    const initHttpOptions = {};
    if (this.clientOptions.vertexai) {
      initHttpOptions.apiVersion = (_a = this.clientOptions.apiVersion) !== null && _a !== undefined ? _a : VERTEX_AI_API_DEFAULT_VERSION;
      initHttpOptions.baseUrl = this.baseUrlFromProjectLocation();
      this.normalizeAuthParameters();
    } else {
      initHttpOptions.apiVersion = (_b = this.clientOptions.apiVersion) !== null && _b !== undefined ? _b : GOOGLE_AI_API_DEFAULT_VERSION;
      initHttpOptions.baseUrl = `https://generativelanguage.googleapis.com/`;
    }
    initHttpOptions.headers = this.getDefaultHeaders();
    this.clientOptions.httpOptions = initHttpOptions;
    if (opts.httpOptions) {
      this.clientOptions.httpOptions = this.patchHttpOptions(initHttpOptions, opts.httpOptions);
    }
  }
  baseUrlFromProjectLocation() {
    if (this.clientOptions.project && this.clientOptions.location && this.clientOptions.location !== "global") {
      return `https://${this.clientOptions.location}-aiplatform.googleapis.com/`;
    }
    return `https://aiplatform.googleapis.com/`;
  }
  normalizeAuthParameters() {
    if (this.clientOptions.project && this.clientOptions.location) {
      this.clientOptions.apiKey = undefined;
      return;
    }
    this.clientOptions.project = undefined;
    this.clientOptions.location = undefined;
  }
  isVertexAI() {
    var _a;
    return (_a = this.clientOptions.vertexai) !== null && _a !== undefined ? _a : false;
  }
  getProject() {
    return this.clientOptions.project;
  }
  getLocation() {
    return this.clientOptions.location;
  }
  getApiVersion() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.apiVersion !== undefined) {
      return this.clientOptions.httpOptions.apiVersion;
    }
    throw new Error("API version is not set.");
  }
  getBaseUrl() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.baseUrl !== undefined) {
      return this.clientOptions.httpOptions.baseUrl;
    }
    throw new Error("Base URL is not set.");
  }
  getRequestUrl() {
    return this.getRequestUrlInternal(this.clientOptions.httpOptions);
  }
  getHeaders() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.headers !== undefined) {
      return this.clientOptions.httpOptions.headers;
    } else {
      throw new Error("Headers are not set.");
    }
  }
  getRequestUrlInternal(httpOptions) {
    if (!httpOptions || httpOptions.baseUrl === undefined || httpOptions.apiVersion === undefined) {
      throw new Error("HTTP options are not correctly set.");
    }
    const baseUrl = httpOptions.baseUrl.endsWith("/") ? httpOptions.baseUrl.slice(0, -1) : httpOptions.baseUrl;
    const urlElement = [baseUrl];
    if (httpOptions.apiVersion && httpOptions.apiVersion !== "") {
      urlElement.push(httpOptions.apiVersion);
    }
    return urlElement.join("/");
  }
  getBaseResourcePath() {
    return `projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`;
  }
  getApiKey() {
    return this.clientOptions.apiKey;
  }
  getWebsocketBaseUrl() {
    const baseUrl = this.getBaseUrl();
    const urlParts = new URL(baseUrl);
    urlParts.protocol = urlParts.protocol == "http:" ? "ws" : "wss";
    return urlParts.toString();
  }
  setBaseUrl(url) {
    if (this.clientOptions.httpOptions) {
      this.clientOptions.httpOptions.baseUrl = url;
    } else {
      throw new Error("HTTP options are not correctly set.");
    }
  }
  constructUrl(path, httpOptions, prependProjectLocation) {
    const urlElement = [this.getRequestUrlInternal(httpOptions)];
    if (prependProjectLocation) {
      urlElement.push(this.getBaseResourcePath());
    }
    if (path !== "") {
      urlElement.push(path);
    }
    const url = new URL(`${urlElement.join("/")}`);
    return url;
  }
  shouldPrependVertexProjectPath(request) {
    if (this.clientOptions.apiKey) {
      return false;
    }
    if (!this.clientOptions.vertexai) {
      return false;
    }
    if (request.path.startsWith("projects/")) {
      return false;
    }
    if (request.httpMethod === "GET" && request.path.startsWith("publishers/google/models")) {
      return false;
    }
    return true;
  }
  async request(request) {
    let patchedHttpOptions = this.clientOptions.httpOptions;
    if (request.httpOptions) {
      patchedHttpOptions = this.patchHttpOptions(this.clientOptions.httpOptions, request.httpOptions);
    }
    const prependProjectLocation = this.shouldPrependVertexProjectPath(request);
    const url = this.constructUrl(request.path, patchedHttpOptions, prependProjectLocation);
    if (request.queryParams) {
      for (const [key, value] of Object.entries(request.queryParams)) {
        url.searchParams.append(key, String(value));
      }
    }
    let requestInit = {};
    if (request.httpMethod === "GET") {
      if (request.body && request.body !== "{}") {
        throw new Error("Request body should be empty for GET request, but got non empty request body");
      }
    } else {
      requestInit.body = request.body;
    }
    requestInit = await this.includeExtraHttpOptionsToRequestInit(requestInit, patchedHttpOptions, request.abortSignal);
    return this.unaryApiCall(url, requestInit, request.httpMethod);
  }
  patchHttpOptions(baseHttpOptions, requestHttpOptions) {
    const patchedHttpOptions = JSON.parse(JSON.stringify(baseHttpOptions));
    for (const [key, value] of Object.entries(requestHttpOptions)) {
      if (typeof value === "object") {
        patchedHttpOptions[key] = Object.assign(Object.assign({}, patchedHttpOptions[key]), value);
      } else if (value !== undefined) {
        patchedHttpOptions[key] = value;
      }
    }
    return patchedHttpOptions;
  }
  async requestStream(request) {
    let patchedHttpOptions = this.clientOptions.httpOptions;
    if (request.httpOptions) {
      patchedHttpOptions = this.patchHttpOptions(this.clientOptions.httpOptions, request.httpOptions);
    }
    const prependProjectLocation = this.shouldPrependVertexProjectPath(request);
    const url = this.constructUrl(request.path, patchedHttpOptions, prependProjectLocation);
    if (!url.searchParams.has("alt") || url.searchParams.get("alt") !== "sse") {
      url.searchParams.set("alt", "sse");
    }
    let requestInit = {};
    requestInit.body = request.body;
    requestInit = await this.includeExtraHttpOptionsToRequestInit(requestInit, patchedHttpOptions, request.abortSignal);
    return this.streamApiCall(url, requestInit, request.httpMethod);
  }
  async includeExtraHttpOptionsToRequestInit(requestInit, httpOptions, abortSignal) {
    if (httpOptions && httpOptions.timeout || abortSignal) {
      const abortController = new AbortController;
      const signal = abortController.signal;
      if (httpOptions.timeout && (httpOptions === null || httpOptions === undefined ? undefined : httpOptions.timeout) > 0) {
        setTimeout(() => abortController.abort(), httpOptions.timeout);
      }
      if (abortSignal) {
        abortSignal.addEventListener("abort", () => {
          abortController.abort();
        });
      }
      requestInit.signal = signal;
    }
    requestInit.headers = await this.getHeadersInternal(httpOptions);
    return requestInit;
  }
  async unaryApiCall(url, requestInit, httpMethod) {
    return this.apiCall(url.toString(), Object.assign(Object.assign({}, requestInit), { method: httpMethod })).then(async (response) => {
      await throwErrorIfNotOK(response);
      return new HttpResponse(response);
    }).catch((e) => {
      if (e instanceof Error) {
        throw e;
      } else {
        throw new Error(JSON.stringify(e));
      }
    });
  }
  async streamApiCall(url, requestInit, httpMethod) {
    return this.apiCall(url.toString(), Object.assign(Object.assign({}, requestInit), { method: httpMethod })).then(async (response) => {
      await throwErrorIfNotOK(response);
      return this.processStreamResponse(response);
    }).catch((e) => {
      if (e instanceof Error) {
        throw e;
      } else {
        throw new Error(JSON.stringify(e));
      }
    });
  }
  processStreamResponse(response) {
    var _a;
    return __asyncGenerator(this, arguments, function* processStreamResponse_1() {
      const reader = (_a = response === null || response === undefined ? undefined : response.body) === null || _a === undefined ? undefined : _a.getReader();
      const decoder = new TextDecoder("utf-8");
      if (!reader) {
        throw new Error("Response body is empty");
      }
      try {
        let buffer = "";
        while (true) {
          const { done, value } = yield __await(reader.read());
          if (done) {
            if (buffer.trim().length > 0) {
              throw new Error("Incomplete JSON segment at the end");
            }
            break;
          }
          const chunkString = decoder.decode(value);
          try {
            const chunkJson = JSON.parse(chunkString);
            if ("error" in chunkJson) {
              const errorJson = JSON.parse(JSON.stringify(chunkJson["error"]));
              const status = errorJson["status"];
              const code = errorJson["code"];
              const errorMessage = `got status: ${status}. ${JSON.stringify(chunkJson)}`;
              if (code >= 400 && code < 500) {
                const clientError = new ClientError(errorMessage);
                throw clientError;
              } else if (code >= 500 && code < 600) {
                const serverError = new ServerError(errorMessage);
                throw serverError;
              }
            }
          } catch (e) {
            const error = e;
            if (error.name === "ClientError" || error.name === "ServerError") {
              throw e;
            }
          }
          buffer += chunkString;
          let match = buffer.match(responseLineRE);
          while (match) {
            const processedChunkString = match[1];
            try {
              const partialResponse = new Response(processedChunkString, {
                headers: response === null || response === undefined ? undefined : response.headers,
                status: response === null || response === undefined ? undefined : response.status,
                statusText: response === null || response === undefined ? undefined : response.statusText
              });
              yield yield __await(new HttpResponse(partialResponse));
              buffer = buffer.slice(match[0].length);
              match = buffer.match(responseLineRE);
            } catch (e) {
              throw new Error(`exception parsing stream chunk ${processedChunkString}. ${e}`);
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    });
  }
  async apiCall(url, requestInit) {
    return fetch(url, requestInit).catch((e) => {
      throw new Error(`exception ${e} sending request`);
    });
  }
  getDefaultHeaders() {
    const headers = {};
    const versionHeaderValue = LIBRARY_LABEL + " " + this.clientOptions.userAgentExtra;
    headers[USER_AGENT_HEADER] = versionHeaderValue;
    headers[GOOGLE_API_CLIENT_HEADER] = versionHeaderValue;
    headers[CONTENT_TYPE_HEADER] = "application/json";
    return headers;
  }
  async getHeadersInternal(httpOptions) {
    const headers = new Headers;
    if (httpOptions && httpOptions.headers) {
      for (const [key, value] of Object.entries(httpOptions.headers)) {
        headers.append(key, value);
      }
      if (httpOptions.timeout && httpOptions.timeout > 0) {
        headers.append(SERVER_TIMEOUT_HEADER, String(Math.ceil(httpOptions.timeout / 1000)));
      }
    }
    await this.clientOptions.auth.addAuthHeaders(headers);
    return headers;
  }
  async uploadFile(file, config) {
    var _a;
    const fileToUpload = {};
    if (config != null) {
      fileToUpload.mimeType = config.mimeType;
      fileToUpload.name = config.name;
      fileToUpload.displayName = config.displayName;
    }
    if (fileToUpload.name && !fileToUpload.name.startsWith("files/")) {
      fileToUpload.name = `files/${fileToUpload.name}`;
    }
    const uploader = this.clientOptions.uploader;
    const fileStat = await uploader.stat(file);
    fileToUpload.sizeBytes = String(fileStat.size);
    const mimeType = (_a = config === null || config === undefined ? undefined : config.mimeType) !== null && _a !== undefined ? _a : fileStat.type;
    if (mimeType === undefined || mimeType === "") {
      throw new Error("Can not determine mimeType. Please provide mimeType in the config.");
    }
    fileToUpload.mimeType = mimeType;
    const uploadUrl = await this.fetchUploadUrl(fileToUpload, config);
    return uploader.upload(file, uploadUrl, this);
  }
  async downloadFile(params) {
    const downloader = this.clientOptions.downloader;
    await downloader.download(params, this);
  }
  async fetchUploadUrl(file, config) {
    var _a;
    let httpOptions = {};
    if (config === null || config === undefined ? undefined : config.httpOptions) {
      httpOptions = config.httpOptions;
    } else {
      httpOptions = {
        apiVersion: "",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Upload-Protocol": "resumable",
          "X-Goog-Upload-Command": "start",
          "X-Goog-Upload-Header-Content-Length": `${file.sizeBytes}`,
          "X-Goog-Upload-Header-Content-Type": `${file.mimeType}`
        }
      };
    }
    const body = {
      file
    };
    const httpResponse = await this.request({
      path: formatMap("upload/v1beta/files", body["_url"]),
      body: JSON.stringify(body),
      httpMethod: "POST",
      httpOptions
    });
    if (!httpResponse || !(httpResponse === null || httpResponse === undefined ? undefined : httpResponse.headers)) {
      throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");
    }
    const uploadUrl = (_a = httpResponse === null || httpResponse === undefined ? undefined : httpResponse.headers) === null || _a === undefined ? undefined : _a["x-goog-upload-url"];
    if (uploadUrl === undefined) {
      throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");
    }
    return uploadUrl;
  }
}
async function throwErrorIfNotOK(response) {
  var _a;
  if (response === undefined) {
    throw new ServerError("response is undefined");
  }
  if (!response.ok) {
    const status = response.status;
    const statusText = response.statusText;
    let errorBody;
    if ((_a = response.headers.get("content-type")) === null || _a === undefined ? undefined : _a.includes("application/json")) {
      errorBody = await response.json();
    } else {
      errorBody = {
        error: {
          message: await response.text(),
          code: response.status,
          status: response.statusText
        }
      };
    }
    const errorMessage = `got status: ${status} ${statusText}. ${JSON.stringify(errorBody)}`;
    if (status >= 400 && status < 500) {
      const clientError = new ClientError(errorMessage);
      throw clientError;
    } else if (status >= 500 && status < 600) {
      const serverError = new ServerError(errorMessage);
      throw serverError;
    }
    throw new Error(errorMessage);
  }
}
function getTuningJobParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function listTuningJobsConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== undefined && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== undefined && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== undefined && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  return toObject;
}
function listTuningJobsParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], listTuningJobsConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function tuningExampleToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromTextInput = getValueByPath(fromObject, ["textInput"]);
  if (fromTextInput != null) {
    setValueByPath(toObject, ["textInput"], fromTextInput);
  }
  const fromOutput = getValueByPath(fromObject, ["output"]);
  if (fromOutput != null) {
    setValueByPath(toObject, ["output"], fromOutput);
  }
  return toObject;
}
function tuningDatasetToMldev(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["gcsUri"]) !== undefined) {
    throw new Error("gcsUri parameter is not supported in Gemini API.");
  }
  const fromExamples = getValueByPath(fromObject, ["examples"]);
  if (fromExamples != null) {
    let transformedList = fromExamples;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return tuningExampleToMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["examples", "examples"], transformedList);
  }
  return toObject;
}
function createTuningJobConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["validationDataset"]) !== undefined) {
    throw new Error("validationDataset parameter is not supported in Gemini API.");
  }
  const fromTunedModelDisplayName = getValueByPath(fromObject, [
    "tunedModelDisplayName"
  ]);
  if (parentObject !== undefined && fromTunedModelDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromTunedModelDisplayName);
  }
  if (getValueByPath(fromObject, ["description"]) !== undefined) {
    throw new Error("description parameter is not supported in Gemini API.");
  }
  const fromEpochCount = getValueByPath(fromObject, ["epochCount"]);
  if (parentObject !== undefined && fromEpochCount != null) {
    setValueByPath(parentObject, ["tuningTask", "hyperparameters", "epochCount"], fromEpochCount);
  }
  const fromLearningRateMultiplier = getValueByPath(fromObject, [
    "learningRateMultiplier"
  ]);
  if (fromLearningRateMultiplier != null) {
    setValueByPath(toObject, ["tuningTask", "hyperparameters", "learningRateMultiplier"], fromLearningRateMultiplier);
  }
  if (getValueByPath(fromObject, ["exportLastCheckpointOnly"]) !== undefined) {
    throw new Error("exportLastCheckpointOnly parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["adapterSize"]) !== undefined) {
    throw new Error("adapterSize parameter is not supported in Gemini API.");
  }
  const fromBatchSize = getValueByPath(fromObject, ["batchSize"]);
  if (parentObject !== undefined && fromBatchSize != null) {
    setValueByPath(parentObject, ["tuningTask", "hyperparameters", "batchSize"], fromBatchSize);
  }
  const fromLearningRate = getValueByPath(fromObject, ["learningRate"]);
  if (parentObject !== undefined && fromLearningRate != null) {
    setValueByPath(parentObject, ["tuningTask", "hyperparameters", "learningRate"], fromLearningRate);
  }
  return toObject;
}
function createTuningJobParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromTrainingDataset = getValueByPath(fromObject, [
    "trainingDataset"
  ]);
  if (fromTrainingDataset != null) {
    setValueByPath(toObject, ["tuningTask", "trainingData"], tuningDatasetToMldev(apiClient, fromTrainingDataset));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], createTuningJobConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function getTuningJobParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], fromConfig);
  }
  return toObject;
}
function listTuningJobsConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== undefined && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== undefined && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== undefined && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  return toObject;
}
function listTuningJobsParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], listTuningJobsConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function tuningDatasetToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (parentObject !== undefined && fromGcsUri != null) {
    setValueByPath(parentObject, ["supervisedTuningSpec", "trainingDatasetUri"], fromGcsUri);
  }
  if (getValueByPath(fromObject, ["examples"]) !== undefined) {
    throw new Error("examples parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function tuningValidationDatasetToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["validationDatasetUri"], fromGcsUri);
  }
  return toObject;
}
function createTuningJobConfigToVertex(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromValidationDataset = getValueByPath(fromObject, [
    "validationDataset"
  ]);
  if (parentObject !== undefined && fromValidationDataset != null) {
    setValueByPath(parentObject, ["supervisedTuningSpec"], tuningValidationDatasetToVertex(apiClient, fromValidationDataset));
  }
  const fromTunedModelDisplayName = getValueByPath(fromObject, [
    "tunedModelDisplayName"
  ]);
  if (parentObject !== undefined && fromTunedModelDisplayName != null) {
    setValueByPath(parentObject, ["tunedModelDisplayName"], fromTunedModelDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (parentObject !== undefined && fromDescription != null) {
    setValueByPath(parentObject, ["description"], fromDescription);
  }
  const fromEpochCount = getValueByPath(fromObject, ["epochCount"]);
  if (parentObject !== undefined && fromEpochCount != null) {
    setValueByPath(parentObject, ["supervisedTuningSpec", "hyperParameters", "epochCount"], fromEpochCount);
  }
  const fromLearningRateMultiplier = getValueByPath(fromObject, [
    "learningRateMultiplier"
  ]);
  if (parentObject !== undefined && fromLearningRateMultiplier != null) {
    setValueByPath(parentObject, ["supervisedTuningSpec", "hyperParameters", "learningRateMultiplier"], fromLearningRateMultiplier);
  }
  const fromExportLastCheckpointOnly = getValueByPath(fromObject, [
    "exportLastCheckpointOnly"
  ]);
  if (parentObject !== undefined && fromExportLastCheckpointOnly != null) {
    setValueByPath(parentObject, ["supervisedTuningSpec", "exportLastCheckpointOnly"], fromExportLastCheckpointOnly);
  }
  const fromAdapterSize = getValueByPath(fromObject, ["adapterSize"]);
  if (parentObject !== undefined && fromAdapterSize != null) {
    setValueByPath(parentObject, ["supervisedTuningSpec", "hyperParameters", "adapterSize"], fromAdapterSize);
  }
  if (getValueByPath(fromObject, ["batchSize"]) !== undefined) {
    throw new Error("batchSize parameter is not supported in Vertex AI.");
  }
  if (getValueByPath(fromObject, ["learningRate"]) !== undefined) {
    throw new Error("learningRate parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function createTuningJobParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromTrainingDataset = getValueByPath(fromObject, [
    "trainingDataset"
  ]);
  if (fromTrainingDataset != null) {
    setValueByPath(toObject, ["supervisedTuningSpec", "trainingDatasetUri"], tuningDatasetToVertex(apiClient, fromTrainingDataset, toObject));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], createTuningJobConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function tunedModelFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["name"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], fromModel);
  }
  const fromEndpoint = getValueByPath(fromObject, ["name"]);
  if (fromEndpoint != null) {
    setValueByPath(toObject, ["endpoint"], fromEndpoint);
  }
  return toObject;
}
function tuningJobFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromState = getValueByPath(fromObject, ["state"]);
  if (fromState != null) {
    setValueByPath(toObject, ["state"], tTuningJobStatus(apiClient, fromState));
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromStartTime = getValueByPath(fromObject, [
    "tuningTask",
    "startTime"
  ]);
  if (fromStartTime != null) {
    setValueByPath(toObject, ["startTime"], fromStartTime);
  }
  const fromEndTime = getValueByPath(fromObject, [
    "tuningTask",
    "completeTime"
  ]);
  if (fromEndTime != null) {
    setValueByPath(toObject, ["endTime"], fromEndTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromTunedModel = getValueByPath(fromObject, ["_self"]);
  if (fromTunedModel != null) {
    setValueByPath(toObject, ["tunedModel"], tunedModelFromMldev(apiClient, fromTunedModel));
  }
  const fromDistillationSpec = getValueByPath(fromObject, [
    "distillationSpec"
  ]);
  if (fromDistillationSpec != null) {
    setValueByPath(toObject, ["distillationSpec"], fromDistillationSpec);
  }
  const fromExperiment = getValueByPath(fromObject, ["experiment"]);
  if (fromExperiment != null) {
    setValueByPath(toObject, ["experiment"], fromExperiment);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (fromLabels != null) {
    setValueByPath(toObject, ["labels"], fromLabels);
  }
  const fromPipelineJob = getValueByPath(fromObject, ["pipelineJob"]);
  if (fromPipelineJob != null) {
    setValueByPath(toObject, ["pipelineJob"], fromPipelineJob);
  }
  const fromTunedModelDisplayName = getValueByPath(fromObject, [
    "tunedModelDisplayName"
  ]);
  if (fromTunedModelDisplayName != null) {
    setValueByPath(toObject, ["tunedModelDisplayName"], fromTunedModelDisplayName);
  }
  return toObject;
}
function listTuningJobsResponseFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromTuningJobs = getValueByPath(fromObject, ["tunedModels"]);
  if (fromTuningJobs != null) {
    let transformedList = fromTuningJobs;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return tuningJobFromMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["tuningJobs"], transformedList);
  }
  return toObject;
}
function operationFromMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  return toObject;
}
function tunedModelCheckpointFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromCheckpointId = getValueByPath(fromObject, ["checkpointId"]);
  if (fromCheckpointId != null) {
    setValueByPath(toObject, ["checkpointId"], fromCheckpointId);
  }
  const fromEpoch = getValueByPath(fromObject, ["epoch"]);
  if (fromEpoch != null) {
    setValueByPath(toObject, ["epoch"], fromEpoch);
  }
  const fromStep = getValueByPath(fromObject, ["step"]);
  if (fromStep != null) {
    setValueByPath(toObject, ["step"], fromStep);
  }
  const fromEndpoint = getValueByPath(fromObject, ["endpoint"]);
  if (fromEndpoint != null) {
    setValueByPath(toObject, ["endpoint"], fromEndpoint);
  }
  return toObject;
}
function tunedModelFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], fromModel);
  }
  const fromEndpoint = getValueByPath(fromObject, ["endpoint"]);
  if (fromEndpoint != null) {
    setValueByPath(toObject, ["endpoint"], fromEndpoint);
  }
  const fromCheckpoints = getValueByPath(fromObject, ["checkpoints"]);
  if (fromCheckpoints != null) {
    let transformedList = fromCheckpoints;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return tunedModelCheckpointFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["checkpoints"], transformedList);
  }
  return toObject;
}
function tuningJobFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromState = getValueByPath(fromObject, ["state"]);
  if (fromState != null) {
    setValueByPath(toObject, ["state"], tTuningJobStatus(apiClient, fromState));
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromStartTime = getValueByPath(fromObject, ["startTime"]);
  if (fromStartTime != null) {
    setValueByPath(toObject, ["startTime"], fromStartTime);
  }
  const fromEndTime = getValueByPath(fromObject, ["endTime"]);
  if (fromEndTime != null) {
    setValueByPath(toObject, ["endTime"], fromEndTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromTunedModel = getValueByPath(fromObject, ["tunedModel"]);
  if (fromTunedModel != null) {
    setValueByPath(toObject, ["tunedModel"], tunedModelFromVertex(apiClient, fromTunedModel));
  }
  const fromSupervisedTuningSpec = getValueByPath(fromObject, [
    "supervisedTuningSpec"
  ]);
  if (fromSupervisedTuningSpec != null) {
    setValueByPath(toObject, ["supervisedTuningSpec"], fromSupervisedTuningSpec);
  }
  const fromTuningDataStats = getValueByPath(fromObject, [
    "tuningDataStats"
  ]);
  if (fromTuningDataStats != null) {
    setValueByPath(toObject, ["tuningDataStats"], fromTuningDataStats);
  }
  const fromEncryptionSpec = getValueByPath(fromObject, [
    "encryptionSpec"
  ]);
  if (fromEncryptionSpec != null) {
    setValueByPath(toObject, ["encryptionSpec"], fromEncryptionSpec);
  }
  const fromPartnerModelTuningSpec = getValueByPath(fromObject, [
    "partnerModelTuningSpec"
  ]);
  if (fromPartnerModelTuningSpec != null) {
    setValueByPath(toObject, ["partnerModelTuningSpec"], fromPartnerModelTuningSpec);
  }
  const fromDistillationSpec = getValueByPath(fromObject, [
    "distillationSpec"
  ]);
  if (fromDistillationSpec != null) {
    setValueByPath(toObject, ["distillationSpec"], fromDistillationSpec);
  }
  const fromExperiment = getValueByPath(fromObject, ["experiment"]);
  if (fromExperiment != null) {
    setValueByPath(toObject, ["experiment"], fromExperiment);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (fromLabels != null) {
    setValueByPath(toObject, ["labels"], fromLabels);
  }
  const fromPipelineJob = getValueByPath(fromObject, ["pipelineJob"]);
  if (fromPipelineJob != null) {
    setValueByPath(toObject, ["pipelineJob"], fromPipelineJob);
  }
  const fromTunedModelDisplayName = getValueByPath(fromObject, [
    "tunedModelDisplayName"
  ]);
  if (fromTunedModelDisplayName != null) {
    setValueByPath(toObject, ["tunedModelDisplayName"], fromTunedModelDisplayName);
  }
  return toObject;
}
function listTuningJobsResponseFromVertex(apiClient, fromObject) {
  const toObject = {};
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromTuningJobs = getValueByPath(fromObject, ["tuningJobs"]);
  if (fromTuningJobs != null) {
    let transformedList = fromTuningJobs;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return tuningJobFromVertex(apiClient, item);
      });
    }
    setValueByPath(toObject, ["tuningJobs"], transformedList);
  }
  return toObject;
}

class Tunings extends BaseModule {
  constructor(apiClient) {
    super();
    this.apiClient = apiClient;
    this.get = async (params) => {
      return await this.getInternal(params);
    };
    this.list = async (params = {}) => {
      return new Pager(PagedItem.PAGED_ITEM_TUNING_JOBS, (x) => this.listInternal(x), await this.listInternal(params), params);
    };
    this.tune = async (params) => {
      if (this.apiClient.isVertexAI()) {
        return await this.tuneInternal(params);
      } else {
        const operation = await this.tuneMldevInternal(params);
        let tunedModelName = "";
        if (operation["metadata"] !== undefined && operation["metadata"]["tunedModel"] !== undefined) {
          tunedModelName = operation["metadata"]["tunedModel"];
        } else if (operation["name"] !== undefined && operation["name"].includes("/operations/")) {
          tunedModelName = operation["name"].split("/operations/")[0];
        }
        const tuningJob = {
          name: tunedModelName,
          state: JobState.JOB_STATE_QUEUED
        };
        return tuningJob;
      }
    };
  }
  async getInternal(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = getTuningJobParametersToVertex(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = tuningJobFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      const body = getTuningJobParametersToMldev(this.apiClient, params);
      path = formatMap("{name}", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = tuningJobFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
  async listInternal(params) {
    var _a, _b, _c, _d;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = listTuningJobsParametersToVertex(this.apiClient, params);
      path = formatMap("tuningJobs", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = listTuningJobsResponseFromVertex(this.apiClient, apiResponse);
        const typedResp = new ListTuningJobsResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    } else {
      const body = listTuningJobsParametersToMldev(this.apiClient, params);
      path = formatMap("tunedModels", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "GET",
        httpOptions: (_c = params.config) === null || _c === undefined ? undefined : _c.httpOptions,
        abortSignal: (_d = params.config) === null || _d === undefined ? undefined : _d.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = listTuningJobsResponseFromMldev(this.apiClient, apiResponse);
        const typedResp = new ListTuningJobsResponse;
        Object.assign(typedResp, resp);
        return typedResp;
      });
    }
  }
  async tuneInternal(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      const body = createTuningJobParametersToVertex(this.apiClient, params);
      path = formatMap("tuningJobs", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = tuningJobFromVertex(this.apiClient, apiResponse);
        return resp;
      });
    } else {
      throw new Error("This method is only supported by the Vertex AI.");
    }
  }
  async tuneMldevInternal(params) {
    var _a, _b;
    let response;
    let path = "";
    let queryParams = {};
    if (this.apiClient.isVertexAI()) {
      throw new Error("This method is only supported by the Gemini Developer API.");
    } else {
      const body = createTuningJobParametersToMldev(this.apiClient, params);
      path = formatMap("tunedModels", body["_url"]);
      queryParams = body["_query"];
      delete body["config"];
      delete body["_url"];
      delete body["_query"];
      response = this.apiClient.request({
        path,
        queryParams,
        body: JSON.stringify(body),
        httpMethod: "POST",
        httpOptions: (_a = params.config) === null || _a === undefined ? undefined : _a.httpOptions,
        abortSignal: (_b = params.config) === null || _b === undefined ? undefined : _b.abortSignal
      }).then((httpResponse) => {
        return httpResponse.json();
      });
      return response.then((apiResponse) => {
        const resp = operationFromMldev(this.apiClient, apiResponse);
        return resp;
      });
    }
  }
}

class BrowserDownloader {
  async download(_params, _apiClient) {
    throw new Error("Download to file is not supported in the browser, please use a browser compliant download like an <a> tag.");
  }
}
var MAX_CHUNK_SIZE = 1024 * 1024 * 8;
var MAX_RETRY_COUNT = 3;
var INITIAL_RETRY_DELAY_MS = 1000;
var DELAY_MULTIPLIER = 2;
var X_GOOG_UPLOAD_STATUS_HEADER_FIELD = "x-goog-upload-status";
async function uploadBlob(file, uploadUrl, apiClient) {
  var _a, _b, _c;
  let fileSize = 0;
  let offset = 0;
  let response = new HttpResponse(new Response);
  let uploadCommand = "upload";
  fileSize = file.size;
  while (offset < fileSize) {
    const chunkSize = Math.min(MAX_CHUNK_SIZE, fileSize - offset);
    const chunk = file.slice(offset, offset + chunkSize);
    if (offset + chunkSize >= fileSize) {
      uploadCommand += ", finalize";
    }
    let retryCount = 0;
    let currentDelayMs = INITIAL_RETRY_DELAY_MS;
    while (retryCount < MAX_RETRY_COUNT) {
      response = await apiClient.request({
        path: "",
        body: chunk,
        httpMethod: "POST",
        httpOptions: {
          apiVersion: "",
          baseUrl: uploadUrl,
          headers: {
            "X-Goog-Upload-Command": uploadCommand,
            "X-Goog-Upload-Offset": String(offset),
            "Content-Length": String(chunkSize)
          }
        }
      });
      if ((_a = response === null || response === undefined ? undefined : response.headers) === null || _a === undefined ? undefined : _a[X_GOOG_UPLOAD_STATUS_HEADER_FIELD]) {
        break;
      }
      retryCount++;
      await sleep(currentDelayMs);
      currentDelayMs = currentDelayMs * DELAY_MULTIPLIER;
    }
    offset += chunkSize;
    if (((_b = response === null || response === undefined ? undefined : response.headers) === null || _b === undefined ? undefined : _b[X_GOOG_UPLOAD_STATUS_HEADER_FIELD]) !== "active") {
      break;
    }
    if (fileSize <= offset) {
      throw new Error("All content has been uploaded, but the upload status is not finalized.");
    }
  }
  const responseJson = await (response === null || response === undefined ? undefined : response.json());
  if (((_c = response === null || response === undefined ? undefined : response.headers) === null || _c === undefined ? undefined : _c[X_GOOG_UPLOAD_STATUS_HEADER_FIELD]) !== "final") {
    throw new Error("Failed to upload file: Upload status is not finalized.");
  }
  return responseJson["file"];
}
async function getBlobStat(file) {
  const fileStat = { size: file.size, type: file.type };
  return fileStat;
}
function sleep(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}

class BrowserUploader {
  async upload(file, uploadUrl, apiClient) {
    if (typeof file === "string") {
      throw new Error("File path is not supported in browser uploader.");
    }
    return await uploadBlob(file, uploadUrl, apiClient);
  }
  async stat(file) {
    if (typeof file === "string") {
      throw new Error("File path is not supported in browser uploader.");
    } else {
      return await getBlobStat(file);
    }
  }
}

class BrowserWebSocketFactory {
  create(url, headers, callbacks) {
    return new BrowserWebSocket(url, headers, callbacks);
  }
}

class BrowserWebSocket {
  constructor(url, headers, callbacks) {
    this.url = url;
    this.headers = headers;
    this.callbacks = callbacks;
  }
  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = this.callbacks.onopen;
    this.ws.onerror = this.callbacks.onerror;
    this.ws.onclose = this.callbacks.onclose;
    this.ws.onmessage = this.callbacks.onmessage;
  }
  send(message) {
    if (this.ws === undefined) {
      throw new Error("WebSocket is not connected");
    }
    this.ws.send(message);
  }
  close() {
    if (this.ws === undefined) {
      throw new Error("WebSocket is not connected");
    }
    this.ws.close();
  }
}
var GOOGLE_API_KEY_HEADER = "x-goog-api-key";

class WebAuth {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  async addAuthHeaders(headers) {
    if (headers.get(GOOGLE_API_KEY_HEADER) !== null) {
      return;
    }
    headers.append(GOOGLE_API_KEY_HEADER, this.apiKey);
  }
}
var LANGUAGE_LABEL_PREFIX = "gl-node/";

class GoogleGenAI {
  constructor(options) {
    var _a;
    if (options.apiKey == null) {
      throw new Error("An API Key must be set when running in a browser");
    }
    if (options.project || options.location) {
      throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");
    }
    this.vertexai = (_a = options.vertexai) !== null && _a !== undefined ? _a : false;
    this.apiKey = options.apiKey;
    const baseUrl = getBaseUrl(options, undefined, undefined);
    if (baseUrl) {
      if (options.httpOptions) {
        options.httpOptions.baseUrl = baseUrl;
      } else {
        options.httpOptions = { baseUrl };
      }
    }
    this.apiVersion = options.apiVersion;
    const auth = new WebAuth(this.apiKey);
    this.apiClient = new ApiClient({
      auth,
      apiVersion: this.apiVersion,
      apiKey: this.apiKey,
      vertexai: this.vertexai,
      httpOptions: options.httpOptions,
      userAgentExtra: LANGUAGE_LABEL_PREFIX + "web",
      uploader: new BrowserUploader,
      downloader: new BrowserDownloader
    });
    this.models = new Models(this.apiClient);
    this.live = new Live(this.apiClient, auth, new BrowserWebSocketFactory);
    this.chats = new Chats(this.models, this.apiClient);
    this.caches = new Caches(this.apiClient);
    this.files = new Files(this.apiClient);
    this.operations = new Operations(this.apiClient);
    this.tunings = new Tunings(this.apiClient);
  }
}

// node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {}
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error;
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};

class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== undefined) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === errorMap ? undefined : errorMap
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}

class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === undefined ? undefined : message.message;
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache;
var _ZodNativeEnum_cache;

class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== undefined ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== undefined ? message : required_error) !== null && _a !== undefined ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== undefined ? message : invalid_type_error) !== null && _b !== undefined ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}

class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus,
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === undefined ? undefined : params.async) !== null && _a !== undefined ? _a : false,
        contextualErrorMap: params === null || params === undefined ? undefined : params.errorMap
      },
      path: (params === null || params === undefined ? undefined : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    var _a, _b;
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if ((_b = (_a = err === null || err === undefined ? undefined : err.message) === null || _a === undefined ? undefined : _a.toLowerCase()) === null || _b === undefined ? undefined : _b.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === undefined ? undefined : params.errorMap,
        async: true
      },
      path: (params === null || params === undefined ? undefined : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if (!decoded.typ || !decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch (_a) {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}

class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a, _b;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === undefined ? undefined : options.precision) === "undefined" ? null : options === null || options === undefined ? undefined : options.precision,
      offset: (_a = options === null || options === undefined ? undefined : options.offset) !== null && _a !== undefined ? _a : false,
      local: (_b = options === null || options === undefined ? undefined : options.local) !== null && _b !== undefined ? _b : false,
      ...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof (options === null || options === undefined ? undefined : options.precision) === "undefined" ? null : options === null || options === undefined ? undefined : options.precision,
      ...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === undefined ? undefined : options.position,
      ...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === undefined ? undefined : params.coerce) !== null && _a !== undefined ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}

class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
    ...processCreateParams(params)
  });
};

class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch (_a) {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === undefined ? undefined : params.coerce) !== null && _a !== undefined ? _a : false,
    ...processCreateParams(params)
  });
};

class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
    ...processCreateParams(params)
  });
};

class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};

class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};

class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};

class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};

class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};

class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};

class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};

class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};

class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : undefined,
          maximum: tooBig ? def.exactLength.value : undefined,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}

class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== undefined ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === undefined ? undefined : _b.call(_a, issue, ctx).message) !== null && _c !== undefined ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== undefined ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};

class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = undefined;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [undefined];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [undefined, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};

class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = new Map;
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}

class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};

class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};

class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}

class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = new Map;
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = new Map;
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};

class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = new Set;
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};

class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}

class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};

class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}

class ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, undefined);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
_ZodEnum_cache = new WeakMap;
ZodEnum.create = createZodEnum;

class ZodNativeEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, undefined);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
_ZodNativeEnum_cache = new WeakMap;
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};

class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};

class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};

class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(undefined);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};

class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};

class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};

class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};

class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");

class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}

class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}

class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          var _a2, _b2;
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = (_b2 = (_a2 = params.fatal) !== null && _a2 !== undefined ? _a2 : fatal) !== null && _b2 !== undefined ? _b2 : true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = (_b = (_a = params.fatal) !== null && _a !== undefined ? _a : fatal) !== null && _b !== undefined ? _b : true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  datetimeRegex,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  enum: enumType,
  function: functionType,
  instanceof: instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  null: nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  undefined: undefinedType,
  union: unionType,
  unknown: unknownType,
  void: voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// node_modules/@modelcontextprotocol/sdk/dist/esm/types.js
var LATEST_PROTOCOL_VERSION = "2025-03-26";
var SUPPORTED_PROTOCOL_VERSIONS = [
  LATEST_PROTOCOL_VERSION,
  "2024-11-05",
  "2024-10-07"
];
var JSONRPC_VERSION = "2.0";
var ProgressTokenSchema = z.union([z.string(), z.number().int()]);
var CursorSchema = z.string();
var RequestMetaSchema = z.object({
  progressToken: z.optional(ProgressTokenSchema)
}).passthrough();
var BaseRequestParamsSchema = z.object({
  _meta: z.optional(RequestMetaSchema)
}).passthrough();
var RequestSchema = z.object({
  method: z.string(),
  params: z.optional(BaseRequestParamsSchema)
});
var BaseNotificationParamsSchema = z.object({
  _meta: z.optional(z.object({}).passthrough())
}).passthrough();
var NotificationSchema = z.object({
  method: z.string(),
  params: z.optional(BaseNotificationParamsSchema)
});
var ResultSchema = z.object({
  _meta: z.optional(z.object({}).passthrough())
}).passthrough();
var RequestIdSchema = z.union([z.string(), z.number().int()]);
var JSONRPCRequestSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  id: RequestIdSchema
}).merge(RequestSchema).strict();
var isJSONRPCRequest = (value) => JSONRPCRequestSchema.safeParse(value).success;
var JSONRPCNotificationSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION)
}).merge(NotificationSchema).strict();
var isJSONRPCNotification = (value) => JSONRPCNotificationSchema.safeParse(value).success;
var JSONRPCResponseSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  id: RequestIdSchema,
  result: ResultSchema
}).strict();
var isJSONRPCResponse = (value) => JSONRPCResponseSchema.safeParse(value).success;
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2[ErrorCode2["ConnectionClosed"] = -32000] = "ConnectionClosed";
  ErrorCode2[ErrorCode2["RequestTimeout"] = -32001] = "RequestTimeout";
  ErrorCode2[ErrorCode2["ParseError"] = -32700] = "ParseError";
  ErrorCode2[ErrorCode2["InvalidRequest"] = -32600] = "InvalidRequest";
  ErrorCode2[ErrorCode2["MethodNotFound"] = -32601] = "MethodNotFound";
  ErrorCode2[ErrorCode2["InvalidParams"] = -32602] = "InvalidParams";
  ErrorCode2[ErrorCode2["InternalError"] = -32603] = "InternalError";
})(ErrorCode || (ErrorCode = {}));
var JSONRPCErrorSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  id: RequestIdSchema,
  error: z.object({
    code: z.number().int(),
    message: z.string(),
    data: z.optional(z.unknown())
  })
}).strict();
var isJSONRPCError = (value) => JSONRPCErrorSchema.safeParse(value).success;
var JSONRPCMessageSchema = z.union([
  JSONRPCRequestSchema,
  JSONRPCNotificationSchema,
  JSONRPCResponseSchema,
  JSONRPCErrorSchema
]);
var EmptyResultSchema = ResultSchema.strict();
var CancelledNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/cancelled"),
  params: BaseNotificationParamsSchema.extend({
    requestId: RequestIdSchema,
    reason: z.string().optional()
  })
});
var ImplementationSchema = z.object({
  name: z.string(),
  version: z.string()
}).passthrough();
var ClientCapabilitiesSchema = z.object({
  experimental: z.optional(z.object({}).passthrough()),
  sampling: z.optional(z.object({}).passthrough()),
  roots: z.optional(z.object({
    listChanged: z.optional(z.boolean())
  }).passthrough())
}).passthrough();
var InitializeRequestSchema = RequestSchema.extend({
  method: z.literal("initialize"),
  params: BaseRequestParamsSchema.extend({
    protocolVersion: z.string(),
    capabilities: ClientCapabilitiesSchema,
    clientInfo: ImplementationSchema
  })
});
var ServerCapabilitiesSchema = z.object({
  experimental: z.optional(z.object({}).passthrough()),
  logging: z.optional(z.object({}).passthrough()),
  completions: z.optional(z.object({}).passthrough()),
  prompts: z.optional(z.object({
    listChanged: z.optional(z.boolean())
  }).passthrough()),
  resources: z.optional(z.object({
    subscribe: z.optional(z.boolean()),
    listChanged: z.optional(z.boolean())
  }).passthrough()),
  tools: z.optional(z.object({
    listChanged: z.optional(z.boolean())
  }).passthrough())
}).passthrough();
var InitializeResultSchema = ResultSchema.extend({
  protocolVersion: z.string(),
  capabilities: ServerCapabilitiesSchema,
  serverInfo: ImplementationSchema,
  instructions: z.optional(z.string())
});
var InitializedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/initialized")
});
var PingRequestSchema = RequestSchema.extend({
  method: z.literal("ping")
});
var ProgressSchema = z.object({
  progress: z.number(),
  total: z.optional(z.number())
}).passthrough();
var ProgressNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/progress"),
  params: BaseNotificationParamsSchema.merge(ProgressSchema).extend({
    progressToken: ProgressTokenSchema
  })
});
var PaginatedRequestSchema = RequestSchema.extend({
  params: BaseRequestParamsSchema.extend({
    cursor: z.optional(CursorSchema)
  }).optional()
});
var PaginatedResultSchema = ResultSchema.extend({
  nextCursor: z.optional(CursorSchema)
});
var ResourceContentsSchema = z.object({
  uri: z.string(),
  mimeType: z.optional(z.string())
}).passthrough();
var TextResourceContentsSchema = ResourceContentsSchema.extend({
  text: z.string()
});
var BlobResourceContentsSchema = ResourceContentsSchema.extend({
  blob: z.string().base64()
});
var ResourceSchema = z.object({
  uri: z.string(),
  name: z.string(),
  description: z.optional(z.string()),
  mimeType: z.optional(z.string())
}).passthrough();
var ResourceTemplateSchema = z.object({
  uriTemplate: z.string(),
  name: z.string(),
  description: z.optional(z.string()),
  mimeType: z.optional(z.string())
}).passthrough();
var ListResourcesRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal("resources/list")
});
var ListResourcesResultSchema = PaginatedResultSchema.extend({
  resources: z.array(ResourceSchema)
});
var ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal("resources/templates/list")
});
var ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({
  resourceTemplates: z.array(ResourceTemplateSchema)
});
var ReadResourceRequestSchema = RequestSchema.extend({
  method: z.literal("resources/read"),
  params: BaseRequestParamsSchema.extend({
    uri: z.string()
  })
});
var ReadResourceResultSchema = ResultSchema.extend({
  contents: z.array(z.union([TextResourceContentsSchema, BlobResourceContentsSchema]))
});
var ResourceListChangedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/resources/list_changed")
});
var SubscribeRequestSchema = RequestSchema.extend({
  method: z.literal("resources/subscribe"),
  params: BaseRequestParamsSchema.extend({
    uri: z.string()
  })
});
var UnsubscribeRequestSchema = RequestSchema.extend({
  method: z.literal("resources/unsubscribe"),
  params: BaseRequestParamsSchema.extend({
    uri: z.string()
  })
});
var ResourceUpdatedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/resources/updated"),
  params: BaseNotificationParamsSchema.extend({
    uri: z.string()
  })
});
var PromptArgumentSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  required: z.optional(z.boolean())
}).passthrough();
var PromptSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  arguments: z.optional(z.array(PromptArgumentSchema))
}).passthrough();
var ListPromptsRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal("prompts/list")
});
var ListPromptsResultSchema = PaginatedResultSchema.extend({
  prompts: z.array(PromptSchema)
});
var GetPromptRequestSchema = RequestSchema.extend({
  method: z.literal("prompts/get"),
  params: BaseRequestParamsSchema.extend({
    name: z.string(),
    arguments: z.optional(z.record(z.string()))
  })
});
var TextContentSchema = z.object({
  type: z.literal("text"),
  text: z.string()
}).passthrough();
var ImageContentSchema = z.object({
  type: z.literal("image"),
  data: z.string().base64(),
  mimeType: z.string()
}).passthrough();
var AudioContentSchema = z.object({
  type: z.literal("audio"),
  data: z.string().base64(),
  mimeType: z.string()
}).passthrough();
var EmbeddedResourceSchema = z.object({
  type: z.literal("resource"),
  resource: z.union([TextResourceContentsSchema, BlobResourceContentsSchema])
}).passthrough();
var PromptMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.union([
    TextContentSchema,
    ImageContentSchema,
    AudioContentSchema,
    EmbeddedResourceSchema
  ])
}).passthrough();
var GetPromptResultSchema = ResultSchema.extend({
  description: z.optional(z.string()),
  messages: z.array(PromptMessageSchema)
});
var PromptListChangedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/prompts/list_changed")
});
var ToolAnnotationsSchema = z.object({
  title: z.optional(z.string()),
  readOnlyHint: z.optional(z.boolean()),
  destructiveHint: z.optional(z.boolean()),
  idempotentHint: z.optional(z.boolean()),
  openWorldHint: z.optional(z.boolean())
}).passthrough();
var ToolSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  inputSchema: z.object({
    type: z.literal("object"),
    properties: z.optional(z.object({}).passthrough()),
    required: z.optional(z.array(z.string()))
  }).passthrough(),
  outputSchema: z.optional(z.object({
    type: z.literal("object"),
    properties: z.optional(z.object({}).passthrough()),
    required: z.optional(z.array(z.string()))
  }).passthrough()),
  annotations: z.optional(ToolAnnotationsSchema)
}).passthrough();
var ListToolsRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal("tools/list")
});
var ListToolsResultSchema = PaginatedResultSchema.extend({
  tools: z.array(ToolSchema)
});
var ContentListSchema = z.array(z.union([
  TextContentSchema,
  ImageContentSchema,
  AudioContentSchema,
  EmbeddedResourceSchema
]));
var CallToolUnstructuredResultSchema = ResultSchema.extend({
  content: ContentListSchema,
  structuredContent: z.never().optional(),
  isError: z.optional(z.boolean())
});
var CallToolStructuredResultSchema = ResultSchema.extend({
  structuredContent: z.object({}).passthrough(),
  content: z.optional(ContentListSchema),
  isError: z.optional(z.boolean())
});
var CallToolResultSchema = z.union([
  CallToolUnstructuredResultSchema,
  CallToolStructuredResultSchema
]);
var CompatibilityCallToolResultSchema = CallToolResultSchema.or(ResultSchema.extend({
  toolResult: z.unknown()
}));
var CallToolRequestSchema = RequestSchema.extend({
  method: z.literal("tools/call"),
  params: BaseRequestParamsSchema.extend({
    name: z.string(),
    arguments: z.optional(z.record(z.unknown()))
  })
});
var ToolListChangedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/tools/list_changed")
});
var LoggingLevelSchema = z.enum([
  "debug",
  "info",
  "notice",
  "warning",
  "error",
  "critical",
  "alert",
  "emergency"
]);
var SetLevelRequestSchema = RequestSchema.extend({
  method: z.literal("logging/setLevel"),
  params: BaseRequestParamsSchema.extend({
    level: LoggingLevelSchema
  })
});
var LoggingMessageNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/message"),
  params: BaseNotificationParamsSchema.extend({
    level: LoggingLevelSchema,
    logger: z.optional(z.string()),
    data: z.unknown()
  })
});
var ModelHintSchema = z.object({
  name: z.string().optional()
}).passthrough();
var ModelPreferencesSchema = z.object({
  hints: z.optional(z.array(ModelHintSchema)),
  costPriority: z.optional(z.number().min(0).max(1)),
  speedPriority: z.optional(z.number().min(0).max(1)),
  intelligencePriority: z.optional(z.number().min(0).max(1))
}).passthrough();
var SamplingMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.union([TextContentSchema, ImageContentSchema, AudioContentSchema])
}).passthrough();
var CreateMessageRequestSchema = RequestSchema.extend({
  method: z.literal("sampling/createMessage"),
  params: BaseRequestParamsSchema.extend({
    messages: z.array(SamplingMessageSchema),
    systemPrompt: z.optional(z.string()),
    includeContext: z.optional(z.enum(["none", "thisServer", "allServers"])),
    temperature: z.optional(z.number()),
    maxTokens: z.number().int(),
    stopSequences: z.optional(z.array(z.string())),
    metadata: z.optional(z.object({}).passthrough()),
    modelPreferences: z.optional(ModelPreferencesSchema)
  })
});
var CreateMessageResultSchema = ResultSchema.extend({
  model: z.string(),
  stopReason: z.optional(z.enum(["endTurn", "stopSequence", "maxTokens"]).or(z.string())),
  role: z.enum(["user", "assistant"]),
  content: z.discriminatedUnion("type", [
    TextContentSchema,
    ImageContentSchema,
    AudioContentSchema
  ])
});
var ResourceReferenceSchema = z.object({
  type: z.literal("ref/resource"),
  uri: z.string()
}).passthrough();
var PromptReferenceSchema = z.object({
  type: z.literal("ref/prompt"),
  name: z.string()
}).passthrough();
var CompleteRequestSchema = RequestSchema.extend({
  method: z.literal("completion/complete"),
  params: BaseRequestParamsSchema.extend({
    ref: z.union([PromptReferenceSchema, ResourceReferenceSchema]),
    argument: z.object({
      name: z.string(),
      value: z.string()
    }).passthrough()
  })
});
var CompleteResultSchema = ResultSchema.extend({
  completion: z.object({
    values: z.array(z.string()).max(100),
    total: z.optional(z.number().int()),
    hasMore: z.optional(z.boolean())
  }).passthrough()
});
var RootSchema = z.object({
  uri: z.string().startsWith("file://"),
  name: z.optional(z.string())
}).passthrough();
var ListRootsRequestSchema = RequestSchema.extend({
  method: z.literal("roots/list")
});
var ListRootsResultSchema = ResultSchema.extend({
  roots: z.array(RootSchema)
});
var RootsListChangedNotificationSchema = NotificationSchema.extend({
  method: z.literal("notifications/roots/list_changed")
});
var ClientRequestSchema = z.union([
  PingRequestSchema,
  InitializeRequestSchema,
  CompleteRequestSchema,
  SetLevelRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  SubscribeRequestSchema,
  UnsubscribeRequestSchema,
  CallToolRequestSchema,
  ListToolsRequestSchema
]);
var ClientNotificationSchema = z.union([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  InitializedNotificationSchema,
  RootsListChangedNotificationSchema
]);
var ClientResultSchema = z.union([
  EmptyResultSchema,
  CreateMessageResultSchema,
  ListRootsResultSchema
]);
var ServerRequestSchema = z.union([
  PingRequestSchema,
  CreateMessageRequestSchema,
  ListRootsRequestSchema
]);
var ServerNotificationSchema = z.union([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  LoggingMessageNotificationSchema,
  ResourceUpdatedNotificationSchema,
  ResourceListChangedNotificationSchema,
  ToolListChangedNotificationSchema,
  PromptListChangedNotificationSchema
]);
var ServerResultSchema = z.union([
  EmptyResultSchema,
  InitializeResultSchema,
  CompleteResultSchema,
  GetPromptResultSchema,
  ListPromptsResultSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesResultSchema,
  ReadResourceResultSchema,
  CallToolResultSchema,
  ListToolsResultSchema
]);

class McpError extends Error {
  constructor(code, message, data) {
    super(`MCP error ${code}: ${message}`);
    this.code = code;
    this.data = data;
    this.name = "McpError";
  }
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/protocol.js
var DEFAULT_REQUEST_TIMEOUT_MSEC = 60000;

class Protocol {
  constructor(_options) {
    this._options = _options;
    this._requestMessageId = 0;
    this._requestHandlers = new Map;
    this._requestHandlerAbortControllers = new Map;
    this._notificationHandlers = new Map;
    this._responseHandlers = new Map;
    this._progressHandlers = new Map;
    this._timeoutInfo = new Map;
    this.setNotificationHandler(CancelledNotificationSchema, (notification) => {
      const controller = this._requestHandlerAbortControllers.get(notification.params.requestId);
      controller === null || controller === undefined || controller.abort(notification.params.reason);
    });
    this.setNotificationHandler(ProgressNotificationSchema, (notification) => {
      this._onprogress(notification);
    });
    this.setRequestHandler(PingRequestSchema, (_request) => ({}));
  }
  _setupTimeout(messageId, timeout, maxTotalTimeout, onTimeout, resetTimeoutOnProgress = false) {
    this._timeoutInfo.set(messageId, {
      timeoutId: setTimeout(onTimeout, timeout),
      startTime: Date.now(),
      timeout,
      maxTotalTimeout,
      resetTimeoutOnProgress,
      onTimeout
    });
  }
  _resetTimeout(messageId) {
    const info = this._timeoutInfo.get(messageId);
    if (!info)
      return false;
    const totalElapsed = Date.now() - info.startTime;
    if (info.maxTotalTimeout && totalElapsed >= info.maxTotalTimeout) {
      this._timeoutInfo.delete(messageId);
      throw new McpError(ErrorCode.RequestTimeout, "Maximum total timeout exceeded", { maxTotalTimeout: info.maxTotalTimeout, totalElapsed });
    }
    clearTimeout(info.timeoutId);
    info.timeoutId = setTimeout(info.onTimeout, info.timeout);
    return true;
  }
  _cleanupTimeout(messageId) {
    const info = this._timeoutInfo.get(messageId);
    if (info) {
      clearTimeout(info.timeoutId);
      this._timeoutInfo.delete(messageId);
    }
  }
  async connect(transport) {
    this._transport = transport;
    this._transport.onclose = () => {
      this._onclose();
    };
    this._transport.onerror = (error) => {
      this._onerror(error);
    };
    this._transport.onmessage = (message, extra) => {
      if (isJSONRPCResponse(message) || isJSONRPCError(message)) {
        this._onresponse(message);
      } else if (isJSONRPCRequest(message)) {
        this._onrequest(message, extra);
      } else if (isJSONRPCNotification(message)) {
        this._onnotification(message);
      } else {
        this._onerror(new Error(`Unknown message type: ${JSON.stringify(message)}`));
      }
    };
    await this._transport.start();
  }
  _onclose() {
    var _a;
    const responseHandlers = this._responseHandlers;
    this._responseHandlers = new Map;
    this._progressHandlers.clear();
    this._transport = undefined;
    (_a = this.onclose) === null || _a === undefined || _a.call(this);
    const error = new McpError(ErrorCode.ConnectionClosed, "Connection closed");
    for (const handler of responseHandlers.values()) {
      handler(error);
    }
  }
  _onerror(error) {
    var _a;
    (_a = this.onerror) === null || _a === undefined || _a.call(this, error);
  }
  _onnotification(notification) {
    var _a;
    const handler = (_a = this._notificationHandlers.get(notification.method)) !== null && _a !== undefined ? _a : this.fallbackNotificationHandler;
    if (handler === undefined) {
      return;
    }
    Promise.resolve().then(() => handler(notification)).catch((error) => this._onerror(new Error(`Uncaught error in notification handler: ${error}`)));
  }
  _onrequest(request, extra) {
    var _a, _b, _c, _d;
    const handler = (_a = this._requestHandlers.get(request.method)) !== null && _a !== undefined ? _a : this.fallbackRequestHandler;
    if (handler === undefined) {
      (_b = this._transport) === null || _b === undefined || _b.send({
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: ErrorCode.MethodNotFound,
          message: "Method not found"
        }
      }).catch((error) => this._onerror(new Error(`Failed to send an error response: ${error}`)));
      return;
    }
    const abortController = new AbortController;
    this._requestHandlerAbortControllers.set(request.id, abortController);
    const fullExtra = {
      signal: abortController.signal,
      sessionId: (_c = this._transport) === null || _c === undefined ? undefined : _c.sessionId,
      _meta: (_d = request.params) === null || _d === undefined ? undefined : _d._meta,
      sendNotification: (notification) => this.notification(notification, { relatedRequestId: request.id }),
      sendRequest: (r, resultSchema, options) => this.request(r, resultSchema, { ...options, relatedRequestId: request.id }),
      authInfo: extra === null || extra === undefined ? undefined : extra.authInfo,
      requestId: request.id
    };
    Promise.resolve().then(() => handler(request, fullExtra)).then((result) => {
      var _a2;
      if (abortController.signal.aborted) {
        return;
      }
      return (_a2 = this._transport) === null || _a2 === undefined ? undefined : _a2.send({
        result,
        jsonrpc: "2.0",
        id: request.id
      });
    }, (error) => {
      var _a2, _b2;
      if (abortController.signal.aborted) {
        return;
      }
      return (_a2 = this._transport) === null || _a2 === undefined ? undefined : _a2.send({
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: Number.isSafeInteger(error["code"]) ? error["code"] : ErrorCode.InternalError,
          message: (_b2 = error.message) !== null && _b2 !== undefined ? _b2 : "Internal error"
        }
      });
    }).catch((error) => this._onerror(new Error(`Failed to send response: ${error}`))).finally(() => {
      this._requestHandlerAbortControllers.delete(request.id);
    });
  }
  _onprogress(notification) {
    const { progressToken, ...params } = notification.params;
    const messageId = Number(progressToken);
    const handler = this._progressHandlers.get(messageId);
    if (!handler) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(notification)}`));
      return;
    }
    const responseHandler = this._responseHandlers.get(messageId);
    const timeoutInfo = this._timeoutInfo.get(messageId);
    if (timeoutInfo && responseHandler && timeoutInfo.resetTimeoutOnProgress) {
      try {
        this._resetTimeout(messageId);
      } catch (error) {
        responseHandler(error);
        return;
      }
    }
    handler(params);
  }
  _onresponse(response) {
    const messageId = Number(response.id);
    const handler = this._responseHandlers.get(messageId);
    if (handler === undefined) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(response)}`));
      return;
    }
    this._responseHandlers.delete(messageId);
    this._progressHandlers.delete(messageId);
    this._cleanupTimeout(messageId);
    if (isJSONRPCResponse(response)) {
      handler(response);
    } else {
      const error = new McpError(response.error.code, response.error.message, response.error.data);
      handler(error);
    }
  }
  get transport() {
    return this._transport;
  }
  async close() {
    var _a;
    await ((_a = this._transport) === null || _a === undefined ? undefined : _a.close());
  }
  request(request, resultSchema, options) {
    const { relatedRequestId, resumptionToken, onresumptiontoken } = options !== null && options !== undefined ? options : {};
    return new Promise((resolve, reject) => {
      var _a, _b, _c, _d, _e;
      if (!this._transport) {
        reject(new Error("Not connected"));
        return;
      }
      if (((_a = this._options) === null || _a === undefined ? undefined : _a.enforceStrictCapabilities) === true) {
        this.assertCapabilityForMethod(request.method);
      }
      (_b = options === null || options === undefined ? undefined : options.signal) === null || _b === undefined || _b.throwIfAborted();
      const messageId = this._requestMessageId++;
      const jsonrpcRequest = {
        ...request,
        jsonrpc: "2.0",
        id: messageId
      };
      if (options === null || options === undefined ? undefined : options.onprogress) {
        this._progressHandlers.set(messageId, options.onprogress);
        jsonrpcRequest.params = {
          ...request.params,
          _meta: { progressToken: messageId }
        };
      }
      const cancel = (reason) => {
        var _a2;
        this._responseHandlers.delete(messageId);
        this._progressHandlers.delete(messageId);
        this._cleanupTimeout(messageId);
        (_a2 = this._transport) === null || _a2 === undefined || _a2.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: messageId,
            reason: String(reason)
          }
        }, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error) => this._onerror(new Error(`Failed to send cancellation: ${error}`)));
        reject(reason);
      };
      this._responseHandlers.set(messageId, (response) => {
        var _a2;
        if ((_a2 = options === null || options === undefined ? undefined : options.signal) === null || _a2 === undefined ? undefined : _a2.aborted) {
          return;
        }
        if (response instanceof Error) {
          return reject(response);
        }
        try {
          const result = resultSchema.parse(response.result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      (_c = options === null || options === undefined ? undefined : options.signal) === null || _c === undefined || _c.addEventListener("abort", () => {
        var _a2;
        cancel((_a2 = options === null || options === undefined ? undefined : options.signal) === null || _a2 === undefined ? undefined : _a2.reason);
      });
      const timeout = (_d = options === null || options === undefined ? undefined : options.timeout) !== null && _d !== undefined ? _d : DEFAULT_REQUEST_TIMEOUT_MSEC;
      const timeoutHandler = () => cancel(new McpError(ErrorCode.RequestTimeout, "Request timed out", { timeout }));
      this._setupTimeout(messageId, timeout, options === null || options === undefined ? undefined : options.maxTotalTimeout, timeoutHandler, (_e = options === null || options === undefined ? undefined : options.resetTimeoutOnProgress) !== null && _e !== undefined ? _e : false);
      this._transport.send(jsonrpcRequest, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error) => {
        this._cleanupTimeout(messageId);
        reject(error);
      });
    });
  }
  async notification(notification, options) {
    if (!this._transport) {
      throw new Error("Not connected");
    }
    this.assertNotificationCapability(notification.method);
    const jsonrpcNotification = {
      ...notification,
      jsonrpc: "2.0"
    };
    await this._transport.send(jsonrpcNotification, options);
  }
  setRequestHandler(requestSchema, handler) {
    const method = requestSchema.shape.method.value;
    this.assertRequestHandlerCapability(method);
    this._requestHandlers.set(method, (request, extra) => {
      return Promise.resolve(handler(requestSchema.parse(request), extra));
    });
  }
  removeRequestHandler(method) {
    this._requestHandlers.delete(method);
  }
  assertCanSetRequestHandler(method) {
    if (this._requestHandlers.has(method)) {
      throw new Error(`A request handler for ${method} already exists, which would be overridden`);
    }
  }
  setNotificationHandler(notificationSchema, handler) {
    this._notificationHandlers.set(notificationSchema.shape.method.value, (notification) => Promise.resolve(handler(notificationSchema.parse(notification))));
  }
  removeNotificationHandler(method) {
    this._notificationHandlers.delete(method);
  }
}
function mergeCapabilities(base, additional) {
  return Object.entries(additional).reduce((acc, [key, value]) => {
    if (value && typeof value === "object") {
      acc[key] = acc[key] ? { ...acc[key], ...value } : value;
    } else {
      acc[key] = value;
    }
    return acc;
  }, { ...base });
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/index.js
class Server extends Protocol {
  constructor(_serverInfo, options) {
    var _a;
    super(options);
    this._serverInfo = _serverInfo;
    this._capabilities = (_a = options === null || options === undefined ? undefined : options.capabilities) !== null && _a !== undefined ? _a : {};
    this._instructions = options === null || options === undefined ? undefined : options.instructions;
    this.setRequestHandler(InitializeRequestSchema, (request) => this._oninitialize(request));
    this.setNotificationHandler(InitializedNotificationSchema, () => {
      var _a2;
      return (_a2 = this.oninitialized) === null || _a2 === undefined ? undefined : _a2.call(this);
    });
  }
  registerCapabilities(capabilities) {
    if (this.transport) {
      throw new Error("Cannot register capabilities after connecting to transport");
    }
    this._capabilities = mergeCapabilities(this._capabilities, capabilities);
  }
  assertCapabilityForMethod(method) {
    var _a, _b;
    switch (method) {
      case "sampling/createMessage":
        if (!((_a = this._clientCapabilities) === null || _a === undefined ? undefined : _a.sampling)) {
          throw new Error(`Client does not support sampling (required for ${method})`);
        }
        break;
      case "roots/list":
        if (!((_b = this._clientCapabilities) === null || _b === undefined ? undefined : _b.roots)) {
          throw new Error(`Client does not support listing roots (required for ${method})`);
        }
        break;
      case "ping":
        break;
    }
  }
  assertNotificationCapability(method) {
    switch (method) {
      case "notifications/message":
        if (!this._capabilities.logging) {
          throw new Error(`Server does not support logging (required for ${method})`);
        }
        break;
      case "notifications/resources/updated":
      case "notifications/resources/list_changed":
        if (!this._capabilities.resources) {
          throw new Error(`Server does not support notifying about resources (required for ${method})`);
        }
        break;
      case "notifications/tools/list_changed":
        if (!this._capabilities.tools) {
          throw new Error(`Server does not support notifying of tool list changes (required for ${method})`);
        }
        break;
      case "notifications/prompts/list_changed":
        if (!this._capabilities.prompts) {
          throw new Error(`Server does not support notifying of prompt list changes (required for ${method})`);
        }
        break;
      case "notifications/cancelled":
        break;
      case "notifications/progress":
        break;
    }
  }
  assertRequestHandlerCapability(method) {
    switch (method) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling) {
          throw new Error(`Server does not support sampling (required for ${method})`);
        }
        break;
      case "logging/setLevel":
        if (!this._capabilities.logging) {
          throw new Error(`Server does not support logging (required for ${method})`);
        }
        break;
      case "prompts/get":
      case "prompts/list":
        if (!this._capabilities.prompts) {
          throw new Error(`Server does not support prompts (required for ${method})`);
        }
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
        if (!this._capabilities.resources) {
          throw new Error(`Server does not support resources (required for ${method})`);
        }
        break;
      case "tools/call":
      case "tools/list":
        if (!this._capabilities.tools) {
          throw new Error(`Server does not support tools (required for ${method})`);
        }
        break;
      case "ping":
      case "initialize":
        break;
    }
  }
  async _oninitialize(request) {
    const requestedVersion = request.params.protocolVersion;
    this._clientCapabilities = request.params.capabilities;
    this._clientVersion = request.params.clientInfo;
    return {
      protocolVersion: SUPPORTED_PROTOCOL_VERSIONS.includes(requestedVersion) ? requestedVersion : LATEST_PROTOCOL_VERSION,
      capabilities: this.getCapabilities(),
      serverInfo: this._serverInfo,
      ...this._instructions && { instructions: this._instructions }
    };
  }
  getClientCapabilities() {
    return this._clientCapabilities;
  }
  getClientVersion() {
    return this._clientVersion;
  }
  getCapabilities() {
    return this._capabilities;
  }
  async ping() {
    return this.request({ method: "ping" }, EmptyResultSchema);
  }
  async createMessage(params, options) {
    return this.request({ method: "sampling/createMessage", params }, CreateMessageResultSchema, options);
  }
  async listRoots(params, options) {
    return this.request({ method: "roots/list", params }, ListRootsResultSchema, options);
  }
  async sendLoggingMessage(params) {
    return this.notification({ method: "notifications/message", params });
  }
  async sendResourceUpdated(params) {
    return this.notification({
      method: "notifications/resources/updated",
      params
    });
  }
  async sendResourceListChanged() {
    return this.notification({
      method: "notifications/resources/list_changed"
    });
  }
  async sendToolListChanged() {
    return this.notification({ method: "notifications/tools/list_changed" });
  }
  async sendPromptListChanged() {
    return this.notification({ method: "notifications/prompts/list_changed" });
  }
}

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
  name: undefined,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: true,
  rejectedAdditionalProperties: false,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};
// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== undefined ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: undefined,
    seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name],
        jsonSchema: undefined
      }
    ]))
  };
};
// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}
// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def && def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
var integerDateParser = (def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        break;
      case "max":
        setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        break;
    }
  }
  return res;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : undefined;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === undefined) {
        unevaluatedProperties = undefined;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = undefined;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : undefined;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var emojiRegex2 = undefined;
var zodPatterns = {
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  emoji: () => {
    if (emojiRegex2 === undefined) {
      emojiRegex2 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
    }
    return emojiRegex2;
  },
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check.message, refs);
          break;
        case "cidr": {
          if (check.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
          }
          if (check.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          ((_) => {})(check);
      }
    }
  }
  return res;
}
function escapeLiteralCheckValue(literal, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i = 0;i < source.length; i++) {
    if (!ALPHA_NUMERIC.has(source[i])) {
      result += "\\";
    }
    result += source[i];
  }
  return result;
}
function addFormat(schema, value, message, refs) {
  if (schema.format || schema.anyOf?.some((x) => x.format)) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message, refs);
  }
}
function addPattern(schema, regex, message, refs) {
  if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
  }
}
function stringifyRegExpWithFlags(regex, refs) {
  if (!refs.applyRegexFlags || !regex.flags) {
    return regex.source;
  }
  const flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0;i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex.source;
  }
  return pattern;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openAi") {
    console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
  }
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? {}
      }), {}),
      additionalProperties: refs.rejectedAdditionalProperties
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? refs.allowedAdditionalProperties
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
    const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x) => (x._def.typeName in primitiveMappings) && (!x._def.checks || !x._def.checks.length))) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i}`]
  })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
  return anyOf.length ? { anyOf } : undefined;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function parseObjectDef(def, refs) {
  const forceOptionalIntoNullable = refs.target === "openAi";
  const result = {
    type: "object",
    properties: {}
  };
  const required = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === undefined || propDef._def === undefined) {
      continue;
    }
    let propOptional = safeIsOptional(propDef);
    if (propOptional && forceOptionalIntoNullable) {
      if (propDef instanceof ZodOptional) {
        propDef = propDef._def.innerType;
      }
      if (!propDef.isNullable()) {
        propDef = propDef.nullable();
      }
      propOptional = false;
    }
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === undefined) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required.push(propName);
    }
  }
  if (required.length) {
    result.required = required;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== undefined) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch {
    return true;
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef = (def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: {}
      },
      innerSchema
    ]
  } : {};
};

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== undefined)
  };
};

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === undefined ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === undefined ? acc : [...acc, x], [])
    };
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/selectParser.js
var selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return () => def.getter()._def;
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return;
    default:
      return ((_) => {
        return;
      })(typeName);
  }
};

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== undefined) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: undefined };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema, def, refs);
    newItem.jsonSchema = jsonSchema;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return {};
      }
      return refs.$refStrategy === "seen" ? {} : undefined;
    }
  }
};
var getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (;i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i])
      break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
var addMeta = (def, refs, jsonSchema) => {
  if (def.description) {
    jsonSchema.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema.markdownDescription = def.description;
    }
  }
  return jsonSchema;
};
// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema = (schema, options) => {
  const refs = getRefs(options);
  const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
    ...acc,
    [name2]: parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name2]
    }, true) ?? {}
  }), {}) : undefined;
  const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? undefined : options?.name;
  const main = parseDef(schema._def, name === undefined ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name]
  }, false) ?? {};
  const title = typeof options === "object" && options.name !== undefined && options.nameStrategy === "title" ? options.name : undefined;
  if (title !== undefined) {
    main.title = title;
  }
  const combined = name === undefined ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  if (refs.target === "openAi" && (("anyOf" in combined) || ("oneOf" in combined) || ("allOf" in combined) || ("type" in combined) && Array.isArray(combined.type))) {
    console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
  }
  return combined;
};
// node_modules/@modelcontextprotocol/sdk/dist/esm/server/completable.js
var McpZodTypeKind;
(function(McpZodTypeKind2) {
  McpZodTypeKind2["Completable"] = "McpCompletable";
})(McpZodTypeKind || (McpZodTypeKind = {}));

class Completable extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
Completable.create = (type, params) => {
  return new Completable({
    type,
    typeName: McpZodTypeKind.Completable,
    complete: params.complete,
    ...processCreateParams2(params)
  });
};
function processCreateParams2(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== undefined ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== undefined ? message : required_error) !== null && _a !== undefined ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== undefined ? message : invalid_type_error) !== null && _b !== undefined ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js
class McpServer {
  constructor(serverInfo, options) {
    this._registeredResources = {};
    this._registeredResourceTemplates = {};
    this._registeredTools = {};
    this._registeredPrompts = {};
    this._toolHandlersInitialized = false;
    this._completionHandlerInitialized = false;
    this._resourceHandlersInitialized = false;
    this._promptHandlersInitialized = false;
    this.server = new Server(serverInfo, options);
  }
  async connect(transport) {
    return await this.server.connect(transport);
  }
  async close() {
    await this.server.close();
  }
  setToolRequestHandlers() {
    if (this._toolHandlersInitialized) {
      return;
    }
    this.server.assertCanSetRequestHandler(ListToolsRequestSchema.shape.method.value);
    this.server.assertCanSetRequestHandler(CallToolRequestSchema.shape.method.value);
    this.server.registerCapabilities({
      tools: {
        listChanged: true
      }
    });
    this.server.setRequestHandler(ListToolsRequestSchema, () => ({
      tools: Object.entries(this._registeredTools).filter(([, tool]) => tool.enabled).map(([name, tool]) => {
        const toolDefinition = {
          name,
          description: tool.description,
          inputSchema: tool.inputSchema ? zodToJsonSchema(tool.inputSchema, {
            strictUnions: true
          }) : EMPTY_OBJECT_JSON_SCHEMA,
          annotations: tool.annotations
        };
        if (tool.outputSchema) {
          toolDefinition.outputSchema = zodToJsonSchema(tool.outputSchema, { strictUnions: true });
        }
        return toolDefinition;
      })
    }));
    this.server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
      const tool = this._registeredTools[request.params.name];
      if (!tool) {
        throw new McpError(ErrorCode.InvalidParams, `Tool ${request.params.name} not found`);
      }
      if (!tool.enabled) {
        throw new McpError(ErrorCode.InvalidParams, `Tool ${request.params.name} disabled`);
      }
      let result;
      if (tool.inputSchema) {
        const parseResult = await tool.inputSchema.safeParseAsync(request.params.arguments);
        if (!parseResult.success) {
          throw new McpError(ErrorCode.InvalidParams, `Invalid arguments for tool ${request.params.name}: ${parseResult.error.message}`);
        }
        const args = parseResult.data;
        const cb = tool.callback;
        try {
          result = await Promise.resolve(cb(args, extra));
        } catch (error) {
          result = {
            content: [
              {
                type: "text",
                text: error instanceof Error ? error.message : String(error)
              }
            ],
            isError: true
          };
        }
      } else {
        const cb = tool.callback;
        try {
          result = await Promise.resolve(cb(extra));
        } catch (error) {
          result = {
            content: [
              {
                type: "text",
                text: error instanceof Error ? error.message : String(error)
              }
            ],
            isError: true
          };
        }
      }
      if (tool.outputSchema) {
        if (!result.structuredContent && !result.isError) {
          throw new McpError(ErrorCode.InternalError, `Tool ${request.params.name} has outputSchema but returned no structuredContent`);
        }
        if (result.structuredContent && !result.content) {
          result.content = [
            {
              type: "text",
              text: JSON.stringify(result.structuredContent, null, 2)
            }
          ];
        }
      } else {
        if (!result.content && !result.isError) {
          throw new McpError(ErrorCode.InternalError, `Tool ${request.params.name} has no outputSchema and must return content`);
        }
        if (result.structuredContent) {
          throw new McpError(ErrorCode.InternalError, `Tool ${request.params.name} has no outputSchema but returned structuredContent`);
        }
      }
      return result;
    });
    this._toolHandlersInitialized = true;
  }
  setCompletionRequestHandler() {
    if (this._completionHandlerInitialized) {
      return;
    }
    this.server.assertCanSetRequestHandler(CompleteRequestSchema.shape.method.value);
    this.server.setRequestHandler(CompleteRequestSchema, async (request) => {
      switch (request.params.ref.type) {
        case "ref/prompt":
          return this.handlePromptCompletion(request, request.params.ref);
        case "ref/resource":
          return this.handleResourceCompletion(request, request.params.ref);
        default:
          throw new McpError(ErrorCode.InvalidParams, `Invalid completion reference: ${request.params.ref}`);
      }
    });
    this._completionHandlerInitialized = true;
  }
  async handlePromptCompletion(request, ref) {
    const prompt = this._registeredPrompts[ref.name];
    if (!prompt) {
      throw new McpError(ErrorCode.InvalidParams, `Prompt ${ref.name} not found`);
    }
    if (!prompt.enabled) {
      throw new McpError(ErrorCode.InvalidParams, `Prompt ${ref.name} disabled`);
    }
    if (!prompt.argsSchema) {
      return EMPTY_COMPLETION_RESULT;
    }
    const field = prompt.argsSchema.shape[request.params.argument.name];
    if (!(field instanceof Completable)) {
      return EMPTY_COMPLETION_RESULT;
    }
    const def = field._def;
    const suggestions = await def.complete(request.params.argument.value);
    return createCompletionResult(suggestions);
  }
  async handleResourceCompletion(request, ref) {
    const template = Object.values(this._registeredResourceTemplates).find((t) => t.resourceTemplate.uriTemplate.toString() === ref.uri);
    if (!template) {
      if (this._registeredResources[ref.uri]) {
        return EMPTY_COMPLETION_RESULT;
      }
      throw new McpError(ErrorCode.InvalidParams, `Resource template ${request.params.ref.uri} not found`);
    }
    const completer = template.resourceTemplate.completeCallback(request.params.argument.name);
    if (!completer) {
      return EMPTY_COMPLETION_RESULT;
    }
    const suggestions = await completer(request.params.argument.value);
    return createCompletionResult(suggestions);
  }
  setResourceRequestHandlers() {
    if (this._resourceHandlersInitialized) {
      return;
    }
    this.server.assertCanSetRequestHandler(ListResourcesRequestSchema.shape.method.value);
    this.server.assertCanSetRequestHandler(ListResourceTemplatesRequestSchema.shape.method.value);
    this.server.assertCanSetRequestHandler(ReadResourceRequestSchema.shape.method.value);
    this.server.registerCapabilities({
      resources: {
        listChanged: true
      }
    });
    this.server.setRequestHandler(ListResourcesRequestSchema, async (request, extra) => {
      const resources = Object.entries(this._registeredResources).filter(([_, resource]) => resource.enabled).map(([uri, resource]) => ({
        uri,
        name: resource.name,
        ...resource.metadata
      }));
      const templateResources = [];
      for (const template of Object.values(this._registeredResourceTemplates)) {
        if (!template.resourceTemplate.listCallback) {
          continue;
        }
        const result = await template.resourceTemplate.listCallback(extra);
        for (const resource of result.resources) {
          templateResources.push({
            ...resource,
            ...template.metadata
          });
        }
      }
      return { resources: [...resources, ...templateResources] };
    });
    this.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
      const resourceTemplates = Object.entries(this._registeredResourceTemplates).map(([name, template]) => ({
        name,
        uriTemplate: template.resourceTemplate.uriTemplate.toString(),
        ...template.metadata
      }));
      return { resourceTemplates };
    });
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request, extra) => {
      const uri = new URL(request.params.uri);
      const resource = this._registeredResources[uri.toString()];
      if (resource) {
        if (!resource.enabled) {
          throw new McpError(ErrorCode.InvalidParams, `Resource ${uri} disabled`);
        }
        return resource.readCallback(uri, extra);
      }
      for (const template of Object.values(this._registeredResourceTemplates)) {
        const variables = template.resourceTemplate.uriTemplate.match(uri.toString());
        if (variables) {
          return template.readCallback(uri, variables, extra);
        }
      }
      throw new McpError(ErrorCode.InvalidParams, `Resource ${uri} not found`);
    });
    this.setCompletionRequestHandler();
    this._resourceHandlersInitialized = true;
  }
  setPromptRequestHandlers() {
    if (this._promptHandlersInitialized) {
      return;
    }
    this.server.assertCanSetRequestHandler(ListPromptsRequestSchema.shape.method.value);
    this.server.assertCanSetRequestHandler(GetPromptRequestSchema.shape.method.value);
    this.server.registerCapabilities({
      prompts: {
        listChanged: true
      }
    });
    this.server.setRequestHandler(ListPromptsRequestSchema, () => ({
      prompts: Object.entries(this._registeredPrompts).filter(([, prompt]) => prompt.enabled).map(([name, prompt]) => {
        return {
          name,
          description: prompt.description,
          arguments: prompt.argsSchema ? promptArgumentsFromSchema(prompt.argsSchema) : undefined
        };
      })
    }));
    this.server.setRequestHandler(GetPromptRequestSchema, async (request, extra) => {
      const prompt = this._registeredPrompts[request.params.name];
      if (!prompt) {
        throw new McpError(ErrorCode.InvalidParams, `Prompt ${request.params.name} not found`);
      }
      if (!prompt.enabled) {
        throw new McpError(ErrorCode.InvalidParams, `Prompt ${request.params.name} disabled`);
      }
      if (prompt.argsSchema) {
        const parseResult = await prompt.argsSchema.safeParseAsync(request.params.arguments);
        if (!parseResult.success) {
          throw new McpError(ErrorCode.InvalidParams, `Invalid arguments for prompt ${request.params.name}: ${parseResult.error.message}`);
        }
        const args = parseResult.data;
        const cb = prompt.callback;
        return await Promise.resolve(cb(args, extra));
      } else {
        const cb = prompt.callback;
        return await Promise.resolve(cb(extra));
      }
    });
    this.setCompletionRequestHandler();
    this._promptHandlersInitialized = true;
  }
  resource(name, uriOrTemplate, ...rest) {
    let metadata;
    if (typeof rest[0] === "object") {
      metadata = rest.shift();
    }
    const readCallback = rest[0];
    if (typeof uriOrTemplate === "string") {
      if (this._registeredResources[uriOrTemplate]) {
        throw new Error(`Resource ${uriOrTemplate} is already registered`);
      }
      const registeredResource = {
        name,
        metadata,
        readCallback,
        enabled: true,
        disable: () => registeredResource.update({ enabled: false }),
        enable: () => registeredResource.update({ enabled: true }),
        remove: () => registeredResource.update({ uri: null }),
        update: (updates) => {
          if (typeof updates.uri !== "undefined" && updates.uri !== uriOrTemplate) {
            delete this._registeredResources[uriOrTemplate];
            if (updates.uri)
              this._registeredResources[updates.uri] = registeredResource;
          }
          if (typeof updates.name !== "undefined")
            registeredResource.name = updates.name;
          if (typeof updates.metadata !== "undefined")
            registeredResource.metadata = updates.metadata;
          if (typeof updates.callback !== "undefined")
            registeredResource.readCallback = updates.callback;
          if (typeof updates.enabled !== "undefined")
            registeredResource.enabled = updates.enabled;
          this.sendResourceListChanged();
        }
      };
      this._registeredResources[uriOrTemplate] = registeredResource;
      this.setResourceRequestHandlers();
      this.sendResourceListChanged();
      return registeredResource;
    } else {
      if (this._registeredResourceTemplates[name]) {
        throw new Error(`Resource template ${name} is already registered`);
      }
      const registeredResourceTemplate = {
        resourceTemplate: uriOrTemplate,
        metadata,
        readCallback,
        enabled: true,
        disable: () => registeredResourceTemplate.update({ enabled: false }),
        enable: () => registeredResourceTemplate.update({ enabled: true }),
        remove: () => registeredResourceTemplate.update({ name: null }),
        update: (updates) => {
          if (typeof updates.name !== "undefined" && updates.name !== name) {
            delete this._registeredResourceTemplates[name];
            if (updates.name)
              this._registeredResourceTemplates[updates.name] = registeredResourceTemplate;
          }
          if (typeof updates.template !== "undefined")
            registeredResourceTemplate.resourceTemplate = updates.template;
          if (typeof updates.metadata !== "undefined")
            registeredResourceTemplate.metadata = updates.metadata;
          if (typeof updates.callback !== "undefined")
            registeredResourceTemplate.readCallback = updates.callback;
          if (typeof updates.enabled !== "undefined")
            registeredResourceTemplate.enabled = updates.enabled;
          this.sendResourceListChanged();
        }
      };
      this._registeredResourceTemplates[name] = registeredResourceTemplate;
      this.setResourceRequestHandlers();
      this.sendResourceListChanged();
      return registeredResourceTemplate;
    }
  }
  _createRegisteredTool(name, description, inputSchema, outputSchema, annotations, callback) {
    const registeredTool = {
      description,
      inputSchema: inputSchema === undefined ? undefined : z.object(inputSchema),
      outputSchema: outputSchema === undefined ? undefined : z.object(outputSchema),
      annotations,
      callback,
      enabled: true,
      disable: () => registeredTool.update({ enabled: false }),
      enable: () => registeredTool.update({ enabled: true }),
      remove: () => registeredTool.update({ name: null }),
      update: (updates) => {
        if (typeof updates.name !== "undefined" && updates.name !== name) {
          delete this._registeredTools[name];
          if (updates.name)
            this._registeredTools[updates.name] = registeredTool;
        }
        if (typeof updates.description !== "undefined")
          registeredTool.description = updates.description;
        if (typeof updates.paramsSchema !== "undefined")
          registeredTool.inputSchema = z.object(updates.paramsSchema);
        if (typeof updates.callback !== "undefined")
          registeredTool.callback = updates.callback;
        if (typeof updates.annotations !== "undefined")
          registeredTool.annotations = updates.annotations;
        if (typeof updates.enabled !== "undefined")
          registeredTool.enabled = updates.enabled;
        this.sendToolListChanged();
      }
    };
    this._registeredTools[name] = registeredTool;
    this.setToolRequestHandlers();
    this.sendToolListChanged();
    return registeredTool;
  }
  tool(name, ...rest) {
    if (this._registeredTools[name]) {
      throw new Error(`Tool ${name} is already registered`);
    }
    let description;
    let inputSchema;
    let outputSchema;
    let annotations;
    if (typeof rest[0] === "string") {
      description = rest.shift();
    }
    if (rest.length > 1) {
      const firstArg = rest[0];
      if (isZodRawShape(firstArg)) {
        inputSchema = rest.shift();
        if (rest.length > 1 && typeof rest[0] === "object" && rest[0] !== null && !isZodRawShape(rest[0])) {
          annotations = rest.shift();
        }
      } else if (typeof firstArg === "object" && firstArg !== null) {
        annotations = rest.shift();
      }
    }
    const callback = rest[0];
    return this._createRegisteredTool(name, description, inputSchema, outputSchema, annotations, callback);
  }
  registerTool(name, config, cb) {
    if (this._registeredTools[name]) {
      throw new Error(`Tool ${name} is already registered`);
    }
    const { description, inputSchema, outputSchema, annotations } = config;
    return this._createRegisteredTool(name, description, inputSchema, outputSchema, annotations, cb);
  }
  prompt(name, ...rest) {
    if (this._registeredPrompts[name]) {
      throw new Error(`Prompt ${name} is already registered`);
    }
    let description;
    if (typeof rest[0] === "string") {
      description = rest.shift();
    }
    let argsSchema;
    if (rest.length > 1) {
      argsSchema = rest.shift();
    }
    const cb = rest[0];
    const registeredPrompt = {
      description,
      argsSchema: argsSchema === undefined ? undefined : z.object(argsSchema),
      callback: cb,
      enabled: true,
      disable: () => registeredPrompt.update({ enabled: false }),
      enable: () => registeredPrompt.update({ enabled: true }),
      remove: () => registeredPrompt.update({ name: null }),
      update: (updates) => {
        if (typeof updates.name !== "undefined" && updates.name !== name) {
          delete this._registeredPrompts[name];
          if (updates.name)
            this._registeredPrompts[updates.name] = registeredPrompt;
        }
        if (typeof updates.description !== "undefined")
          registeredPrompt.description = updates.description;
        if (typeof updates.argsSchema !== "undefined")
          registeredPrompt.argsSchema = z.object(updates.argsSchema);
        if (typeof updates.callback !== "undefined")
          registeredPrompt.callback = updates.callback;
        if (typeof updates.enabled !== "undefined")
          registeredPrompt.enabled = updates.enabled;
        this.sendPromptListChanged();
      }
    };
    this._registeredPrompts[name] = registeredPrompt;
    this.setPromptRequestHandlers();
    this.sendPromptListChanged();
    return registeredPrompt;
  }
  isConnected() {
    return this.server.transport !== undefined;
  }
  sendResourceListChanged() {
    if (this.isConnected()) {
      this.server.sendResourceListChanged();
    }
  }
  sendToolListChanged() {
    if (this.isConnected()) {
      this.server.sendToolListChanged();
    }
  }
  sendPromptListChanged() {
    if (this.isConnected()) {
      this.server.sendPromptListChanged();
    }
  }
}
var EMPTY_OBJECT_JSON_SCHEMA = {
  type: "object"
};
function isZodRawShape(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  const isEmptyObject = Object.keys(obj).length === 0;
  return isEmptyObject || Object.values(obj).some(isZodTypeLike);
}
function isZodTypeLike(value) {
  return value !== null && typeof value === "object" && "parse" in value && typeof value.parse === "function" && "safeParse" in value && typeof value.safeParse === "function";
}
function promptArgumentsFromSchema(schema) {
  return Object.entries(schema.shape).map(([name, field]) => ({
    name,
    description: field.description,
    required: !field.isOptional()
  }));
}
function createCompletionResult(suggestions) {
  return {
    completion: {
      values: suggestions.slice(0, 100),
      total: suggestions.length,
      hasMore: suggestions.length > 100
    }
  };
}
var EMPTY_COMPLETION_RESULT = {
  completion: {
    values: [],
    hasMore: false
  }
};

// node:process
var C = Object.create;
var T = Object.defineProperty;
var q = Object.getOwnPropertyDescriptor;
var A = Object.getOwnPropertyNames;
var I = Object.getPrototypeOf;
var Q = Object.prototype.hasOwnProperty;
var S = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var N = (e, t) => {
  for (var n in t)
    T(e, n, { get: t[n], enumerable: true });
};
var d = (e, t, n, w) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let l of A(t))
      !Q.call(e, l) && l !== n && T(e, l, { get: () => t[l], enumerable: !(w = q(t, l)) || w.enumerable });
  return e;
};
var h = (e, t, n) => (d(e, t, "default"), n && d(n, t, "default"));
var y = (e, t, n) => (n = e != null ? C(I(e)) : {}, d(t || !e || !e.__esModule ? T(n, "default", { value: e, enumerable: true }) : n, e));
var v = S((B, E) => {
  var r = E.exports = {}, i, u;
  function p() {
    throw new Error("setTimeout has not been defined");
  }
  function g() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      typeof setTimeout == "function" ? i = setTimeout : i = p;
    } catch {
      i = p;
    }
    try {
      typeof clearTimeout == "function" ? u = clearTimeout : u = g;
    } catch {
      u = g;
    }
  })();
  function b(e) {
    if (i === setTimeout)
      return setTimeout(e, 0);
    if ((i === p || !i) && setTimeout)
      return i = setTimeout, setTimeout(e, 0);
    try {
      return i(e, 0);
    } catch {
      try {
        return i.call(null, e, 0);
      } catch {
        return i.call(this, e, 0);
      }
    }
  }
  function O(e) {
    if (u === clearTimeout)
      return clearTimeout(e);
    if ((u === g || !u) && clearTimeout)
      return u = clearTimeout, clearTimeout(e);
    try {
      return u(e);
    } catch {
      try {
        return u.call(null, e);
      } catch {
        return u.call(this, e);
      }
    }
  }
  var o = [], s = false, a, m = -1;
  function U() {
    !s || !a || (s = false, a.length ? o = a.concat(o) : m = -1, o.length && x());
  }
  function x() {
    if (!s) {
      var e = b(U);
      s = true;
      for (var t = o.length;t; ) {
        for (a = o, o = [];++m < t; )
          a && a[m].run();
        m = -1, t = o.length;
      }
      a = null, s = false, O(e);
    }
  }
  r.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var n = 1;n < arguments.length; n++)
        t[n - 1] = arguments[n];
    o.push(new L(e, t)), o.length === 1 && !s && b(x);
  };
  function L(e, t) {
    this.fun = e, this.array = t;
  }
  L.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  r.title = "browser";
  r.browser = true;
  r.env = {};
  r.argv = [];
  r.version = "";
  r.versions = {};
  function c() {}
  r.on = c;
  r.addListener = c;
  r.once = c;
  r.off = c;
  r.removeListener = c;
  r.removeAllListeners = c;
  r.emit = c;
  r.prependListener = c;
  r.prependOnceListener = c;
  r.listeners = function(e) {
    return [];
  };
  r.binding = function(e) {
    throw new Error("process.binding is not supported");
  };
  r.cwd = function() {
    return "/";
  };
  r.chdir = function(e) {
    throw new Error("process.chdir is not supported");
  };
  r.umask = function() {
    return 0;
  };
});
var f = {};
N(f, { default: () => j });
h(f, y(v()));
var j = y(v());

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/stdio.js
class ReadBuffer {
  append(chunk) {
    this._buffer = this._buffer ? Buffer.concat([this._buffer, chunk]) : chunk;
  }
  readMessage() {
    if (!this._buffer) {
      return null;
    }
    const index = this._buffer.indexOf(`
`);
    if (index === -1) {
      return null;
    }
    const line = this._buffer.toString("utf8", 0, index).replace(/\r$/, "");
    this._buffer = this._buffer.subarray(index + 1);
    return deserializeMessage(line);
  }
  clear() {
    this._buffer = undefined;
  }
}
function deserializeMessage(line) {
  return JSONRPCMessageSchema.parse(JSON.parse(line));
}
function serializeMessage(message) {
  return JSON.stringify(message) + `
`;
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js
class StdioServerTransport {
  constructor(_stdin = j.stdin, _stdout = j.stdout) {
    this._stdin = _stdin;
    this._stdout = _stdout;
    this._readBuffer = new ReadBuffer;
    this._started = false;
    this._ondata = (chunk) => {
      this._readBuffer.append(chunk);
      this.processReadBuffer();
    };
    this._onerror = (error) => {
      var _a;
      (_a = this.onerror) === null || _a === undefined || _a.call(this, error);
    };
  }
  async start() {
    if (this._started) {
      throw new Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");
    }
    this._started = true;
    this._stdin.on("data", this._ondata);
    this._stdin.on("error", this._onerror);
  }
  processReadBuffer() {
    var _a, _b;
    while (true) {
      try {
        const message = this._readBuffer.readMessage();
        if (message === null) {
          break;
        }
        (_a = this.onmessage) === null || _a === undefined || _a.call(this, message);
      } catch (error) {
        (_b = this.onerror) === null || _b === undefined || _b.call(this, error);
      }
    }
  }
  async close() {
    var _a;
    this._stdin.off("data", this._ondata);
    this._stdin.off("error", this._onerror);
    const remainingDataListeners = this._stdin.listenerCount("data");
    if (remainingDataListeners === 0) {
      this._stdin.pause();
    }
    this._readBuffer.clear();
    (_a = this.onclose) === null || _a === undefined || _a.call(this);
  }
  send(message) {
    return new Promise((resolve) => {
      const json = serializeMessage(message);
      if (this._stdout.write(json)) {
        resolve();
      } else {
        this._stdout.once("drain", resolve);
      }
    });
  }
}

// index.ts
var log4js = __toESM(require_log4js(), 1);
var server = new McpServer({ name: "gemini-web-search", version: "0.1.0" });
var ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
var model = "gemini-2.0-flash";
server.tool("search", "Uses Gemini AI's grounding feature to perform Google searches. By default, `gemini-2.0-flash` is used.", {
  query: z.string().describe("Search query"),
  source: z.boolean().describe("View search source")
}, async ({ query, source }) => {
  const response = await ai.models.generateContent({
    model,
    contents: query,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  if (!response)
    return {
      content: [
        {
          type: "text",
          text: "An error occured while calling gemini API."
        }
      ]
    };
  const result = response.text;
  const result_metadata = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (source) {
    let links = [];
    if (Array.isArray(result_metadata)) {
      for (const c3 of result_metadata.slice(0, 5)) {
        const web = c3.web;
        if (web) {
          links.push(`- ${web.title || "none"} : ${web.uri}`);
        }
      }
    }
    return {
      content: [
        {
          type: "text",
          text: `${result}

Sources:
 ${links.length ? links.join(`
`) : "none"}`
        }
      ]
    };
  }
  return {
    content: [
      {
        type: "text",
        text: `${result}`
      }
    ]
  };
});
async function main() {
  const transport = new StdioServerTransport;
  const logger = log4js.getLogger("MCP");
  await server.connect(transport);
  logger.level = "info";
  logger.info("MCP Server is running on stdio.");
}
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
