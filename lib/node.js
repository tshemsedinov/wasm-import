'use strict';

const fsp = require('node:fs').promises;

const CALLBACK_LEN = 'Callback'.length;

class Registry extends Map {}

Registry.prototype.getOrSetDefault = function (key, fallback) {
  if (this.has(key)) return this.get(key);
  this.set(key, fallback);
  return fallback;
};

const callbacksRegistry = new Registry();

const prepareImports = (byteCode) => {
  const imports = WebAssembly.Module.imports(byteCode);
  const expected = {};
  for (const entry of imports) {
    if (entry.kind !== 'function') continue;
    let module = expected[entry.module];
    if (!module) module = expected[entry.module] = {};
    module[entry.name] = (...args) => {
      const name = entry.name.slice(0, -CALLBACK_LEN);
      const callbacks = callbacksRegistry.get(name);
      if (!callbacks) return;
      const callback = callbacks.shift();
      if (!callback) return;
      callback(...args);
    };
  }
  return expected;
};

const load = async (fileName, importObject = {}) => {
  const buffer = await fsp.readFile(fileName);
  const compiled = await WebAssembly.compile(buffer);
  const expected = prepareImports(compiled);
  const imports = { ...importObject, ...expected };
  const instance = await WebAssembly.instantiate(compiled, imports);
  const exports = {};
  for (const [name, fn] of Object.entries(instance.exports)) {
    if (typeof fn !== 'function') {
      exports[name] = fn;
      continue;
    }
    exports[name] = (...args) => {
      if (typeof args.at(-1) !== 'function') return fn(...args);
      const callbacks = callbacksRegistry.getOrSetDefault(name, []);
      callbacks.push(args.pop());
      return fn(...args);
    };
  }
  return { instance: { exports }, module: compiled };
};

module.exports = { load };
