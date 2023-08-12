# WASM Import

[![ci status](https://github.com/tshemsedinov/wasm-import/workflows/Testing%20CI/badge.svg)](https://github.com/tshemsedinov/wasm-import/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![snyk](https://snyk.io/test/github/tshemsedinov/wasm-import/badge.svg)](https://snyk.io/test/github/tshemsedinov/wasm-import)
[![npm version](https://badge.fury.io/js/wasm-import.svg)](https://badge.fury.io/js/wasm-import)
[![npm downloads/month](https://img.shields.io/npm/dm/wasm-import.svg)](https://www.npmjs.com/package/wasm-import)
[![npm downloads](https://img.shields.io/npm/dt/wasm-import.svg)](https://www.npmjs.com/package/wasm-import)

```
npm i wasm-import
```

See MDN docs how to pass callbacks to wasm via `importObject`:
https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Instance

```js
load(
  fileName: string, // File name or URL
  importObject?: object // See MDN docs
): Promise<object>;
```

## Example

```js
import { load } from 'wasm-import';
// Alternative: const { load } = require('wasm-import');

const example = await load('example.wasm');

example.instance.exports.add(3, 7, (result) => {
  console.log({ result, expected: 10 });
});
```

## License & Contributors

Copyright (c) 2023 [WASM Import contributors](https://github.com/tshemsedinov/wasm-import/graphs/contributors).
WASM Import is [MIT licensed](./LICENSE).
