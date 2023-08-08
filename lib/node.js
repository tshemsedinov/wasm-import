'use strict';

const fsp = require('node:fs').promises;

const prepareWasmImports = (byteCode, moduleName, callbacksToInject) => {
  const wasmExpectedImports = WebAssembly.Module.imports(byteCode);
  const imports = {};
  for (const [i, { name }] of wasmExpectedImports.entries()) {
    imports[name] = callbacksToInject[i];
  }
  return { [moduleName]: imports };
};

const load = async (fileName, moduleName, callbacks) => {
  const wasmBuffer = await fsp.readFile(fileName);
  const wasmCompiled = await WebAssembly.compile(wasmBuffer);
  const wasmImports = prepareWasmImports(wasmCompiled, moduleName, callbacks);
  const instance = await WebAssembly.instantiate(wasmCompiled, wasmImports);
  return { instance, module: wasmCompiled };
};

module.exports = { load };
