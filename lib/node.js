'use strict';

const fsp = require('node:fs').promises;

const CALLBACK_LEN = 'Callback'.length;

class Registry extends Map {
  getCallbacks(name) {
    if (this.has(name)) return this.get(name);
    const callbacks = [];
    this.set(name, callbacks);
    return callbacks;
  }

  getNextCallback(name) {
    const callbacks = this.get(name);
    return (callbacks && callbacks.shift()) || null;
  }
}

const cbRegistry = new Registry();

const fnNameFromCallbackName = (cbName) => cbName.slice(0, -CALLBACK_LEN);

const prepareImports = (byteCode) => {
  const imports = WebAssembly.Module.imports(byteCode);
  const expected = {};
  for (const entry of imports) {
    if (entry.kind !== 'function') continue;
    let module = expected[entry.module];
    if (!module) module = expected[entry.module] = {};
    const exportedFnName = fnNameFromCallbackName(entry.name);
    cbRegistry.set(exportedFnName, []);
    module[entry.name] = (...args) => {
      const name = entry.name.slice(0, -CALLBACK_LEN);
      cbRegistry.getNextCallback(name)?.(...args);
    };
  }
  return expected;
};

const prepareExports = (instance) => {
  const exports = {};
  for (const [name, fn] of Object.entries(instance.exports)) {
    if (typeof fn !== 'function') {
      exports[name] = fn;
      continue;
    }
    exports[name] = (...args) => {
      const callbacksExpected = cbRegistry.get(name);
      if (!callbacksExpected) return fn(...args);
      const callbackProvided = typeof args.at(-1) === 'function';
      if (callbackProvided) {
        callbacksExpected.push(args.pop());
        return fn(...args);
      }
      return new Promise((resolve) => {
        callbacksExpected.push(resolve);
        fn(...args);
      });
    };
  }

  return exports;
};

const load = async (fileName, importObject = {}) => {
  const buffer = await fsp.readFile(fileName);
  const compiled = await WebAssembly.compile(buffer);
  const expected = prepareImports(compiled);
  const imports = { ...importObject, ...expected };
  const instance = await WebAssembly.instantiate(compiled, imports);
  const exports = prepareExports(instance);
  return { instance: { exports }, module: compiled };
};

module.exports = { load };
