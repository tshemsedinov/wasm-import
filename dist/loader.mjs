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
      callbacksRegistry.getNextCallback(name)?.(...args);
    };
  }
  return expected;
};

const load = async (fileName, importObject = {}) => {
  const response = await fetch(fileName);
  const buffer = await response.arrayBuffer();
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
      const callbacks = callbacksRegistry.getCallbacks(name);
      callbacks.push(args.pop());
      return fn(...args);
    };
  }
  return { instance: { exports }, module: compiled };
};

export { load };
