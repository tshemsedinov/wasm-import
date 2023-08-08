export function load(
  fileName: string,
  moduleName: string,
  imports: Array<Function>,
): Promise<object>;

export function prepareWasmImports(
  byteCode: WebAssembly.Module,
  moduleName: string,
  entitiesToInject: Array<Function>,
): object;
