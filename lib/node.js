'use strict';

const fsp = require('node:fs').promises;

const CALLBACK_LEN = 'Callback'.length;
const calls = new Map();

const parseFunctionName = (cbName) => cbName.slice(0, -CALLBACK_LEN);

const prepareImports = (byteCode) => {
  const imports = WebAssembly.Module.imports(byteCode);
  const expected = {};
  for (const entry of imports) {
    if (entry.kind !== 'function') continue;
    let module = expected[entry.module];
    if (!module) module = expected[entry.module] = {};
    const exportedFunctionName = parseFunctionName(entry.name);
    calls.set(exportedFunctionName, []);
    module[entry.name] = (...args) => {
      const callbacks = calls.get(exportedFunctionName);
      if (!callbacks) return;
      const callback = callbacks.shift();
      if (callback) callback(...args);
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
      const callbacksExpected = calls.get(name);
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

const compileInBrowserEnv = async (fileName) => {
  const response = await fetch(fileName);
  const buffer = await response.arrayBuffer();
  const compiled = await WebAssembly.compile(buffer);
  return compiled;
};

const compileInServerEnv = async (fileName) => {
  const buffer = await fsp.readFile(fileName);
  const compiled = await WebAssembly.compile(buffer);
  return compiled;
};

const load = async (fileName, importObject = {}, opts = { browser: false }) => {
  const compiled = opts.browser
    ? await compileInBrowserEnv(fileName)
    : await compileInServerEnv(fileName);
  const expected = prepareImports(compiled);
  const imports = { ...importObject, ...expected };
  const instance = await WebAssembly.instantiate(compiled, imports);
  const exports = prepareExports(instance);
  return { instance: { exports }, module: compiled };
};

const getLoader =
  (opts) =>
  (fileName, importObject = {}) =>
    load(fileName, importObject, opts);

module.exports = { load, getLoader };
