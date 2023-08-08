'use strict';

const fsp = require('node:fs').promises;

const prepareWasmImports = (byteCode, moduleName, entitiesToInject) => {
  const wasmExpectedImports = WebAssembly.Module.imports(byteCode);
  const imports = {};
  for (const [i, { name }] of wasmExpectedImports.entries()) {
    imports[name] = entitiesToInject[i];
  }
  return { [moduleName]: imports };
};

const load = async (fileName, moduleName, imports) => {
  const wasmCompiled = await fsp.readFile(fileName).then(WebAssembly.compile);
  const wasmImports = prepareWasmImports(wasmCompiled, moduleName, imports);
  const instance = await WebAssembly.instantiate(wasmCompiled, wasmImports);
  return { instance };
};

module.exports = { load };
