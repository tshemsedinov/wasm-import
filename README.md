# WASM Import

[![ci status](https://github.com/tshemsedinov/wasm-import/workflows/Testing%20CI/badge.svg)](https://github.com/tshemsedinov/wasm-import/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![snyk](https://snyk.io/test/github/tshemsedinov/wasm-import/badge.svg)](https://snyk.io/test/github/tshemsedinov/wasm-import)
[![npm version](https://badge.fury.io/js/wasm-import.svg)](https://badge.fury.io/js/wasm-import)
[![npm downloads/month](https://img.shields.io/npm/dm/wasm-import.svg)](https://www.npmjs.com/package/wasm-import)
[![npm downloads](https://img.shields.io/npm/dt/wasm-import.svg)](https://www.npmjs.com/package/wasm-import)

## Example for Node.js

```js
const { load } = require('wasm-import');

const callback = (res) => {
  console.log({ res });
};

const example = await load('./example.wasm', 'wbg', [callback]);

example.instance.exports.addCallback(3, 7);
```

## License & Contributors

Copyright (c) 2023 [WASM Import contributors](https://github.com/tshemsedinov/wasm-import/graphs/contributors).
WASM Import is [MIT licensed](./LICENSE).
