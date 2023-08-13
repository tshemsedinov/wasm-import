const CALLBACK_LEN = 'Callback'.length;
const calls = new Map();

const fnNameFromCallbackName = (cbName) => cbName.slice(0, -CALLBACK_LEN);

const prepareImports = (byteCode) => {
  const imports = WebAssembly.Module.imports(byteCode);
  const expected = {};
  for (const entry of imports) {
    if (entry.kind !== 'function') continue;
    let module = expected[entry.module];
    if (!module) module = expected[entry.module] = {};

    const exportedFnName = fnNameFromCallbackName(entry.name);
    calls.set(exportedFnName, []);

    module[entry.name] = (...args) => {
      const callbacks = calls.get(exportedFnName);
      if (!callbacks) return null;
      const callback = callbacks.shift();
      return callback ? callback(...args) : null;
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

const load = async (fileName, importObject = {}) => {
  const response = await fetch(fileName);
  const buffer = await response.arrayBuffer();
  const compiled = await WebAssembly.compile(buffer);
  const expected = prepareImports(compiled);
  const imports = { ...importObject, ...expected };
  const instance = await WebAssembly.instantiate(compiled, imports);
  const exports = prepareExports(instance);
  return { instance: { exports }, module: compiled };
};

export { load };
