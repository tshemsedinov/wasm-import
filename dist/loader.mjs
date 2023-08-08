const prepareWasmImports = (byteCode, moduleName, callbacksToInject) => {
  const wasmExpectedImports = WebAssembly.Module.imports(byteCode);
  const imports = {};
  for (const [i, { name }] of wasmExpectedImports.entries()) {
    imports[name] = callbacksToInject[i];
  }
  return { [moduleName]: imports };
};

const linkWasmInstance = async (wasmCompiled, moduleName, callbacks) => {
  const wasmImports = prepareWasmImports(wasmCompiled, moduleName, callbacks);
  const instance = await WebAssembly.instantiate(wasmCompiled, wasmImports);
  return instance;
};

const load = async (fileName, moduleName, callbacks) => {
  const response = await fetch(fileName);
  const wasmBuffer = await response.arrayBuffer();
  const wasmCompiled = await WebAssembly.compile(wasmBuffer);
  const instance = await linkWasmInstance(wasmCompiled, moduleName, callbacks);
  return { instance, module: wasmCompiled };
};

export { load };
