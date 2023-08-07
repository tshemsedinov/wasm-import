const load = async (fileName, moduleName, exports) => {
  const response = await fetch(fileName);
  const wasm = await response.arrayBuffer();
  const mod = await WebAssembly.compile(wasm);
  const units = WebAssembly.Module.imports(mod);
  const module = {};
  const context = { [moduleName]: module };
  for (const [i, { name }] of units.entries()) {
    module[name] = exports[i];
  }
  const instance = await WebAssembly.instantiate(wasm, context);
  return instance;
};

export { load };
