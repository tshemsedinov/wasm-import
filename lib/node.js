'use strict';

const fsp = require('node:fs').promises;

const CALLBACK_POSTFIX_LEN = 'Callback'.length;

class WasmLoader {
  #calls;

  constructor(storage = null) {
    this.#calls = storage ?? new Map();
  }

  _prepareImports(byteCode) {
    const imports = WebAssembly.Module.imports(byteCode);
    const expected = {};
    for (const entry of imports) {
      if (entry.kind !== 'function') continue;
      let module = expected[entry.module];
      if (!module) module = expected[entry.module] = {};
      module[entry.name] = (...args) => {
        const name = entry.name.slice(0, -CALLBACK_POSTFIX_LEN);
        const callbacks = this.#calls.get(name);
        if (!callbacks) return;
        const callback = callbacks.shift();
        if (!callback) return;
        callback(...args);
      };
    }
    return expected;
  }

  _prepareExports(instance) {
    const exports = {};
    for (const [name, exported] of Object.entries(instance.exports)) {
      if (typeof exported !== 'function') {
        exports[name] = exported;
        continue;
      }
      exports[name] = (...args) => {
        if (typeof args.at(-1) !== 'function') return exported(...args);
        const callbacks = this.#calls.get(name) || [];
        callbacks.push(args.pop());
        this.#calls.set(name, callbacks);
        return exported(...args);
      };
    }
    return exports;
  }

  async load(fileName, importObject = {}) {
    const buffer = await fsp.readFile(fileName);
    const compiled = await WebAssembly.compile(buffer);
    const expected = this._prepareImports(compiled);
    const imports = { ...importObject, ...expected };
    const instance = await WebAssembly.instantiate(compiled, imports);
    const exports = this._prepareExports(instance);
    return { instance: { exports }, module: compiled };
  }
}

const loader = new WasmLoader();

const load = async (...args) => loader.load(...args);

module.exports = { load };
