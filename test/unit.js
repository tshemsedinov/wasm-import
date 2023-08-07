'use strict';

const metatests = require('metatests');
const { load } = require('..');

const PATH = './test/examples/';

metatests.test('Rust WASM: wasm-pack', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = PATH + 'rust.wasm';
  const example = await load(fileName, 'wbg', [callback]);

  const sum = example.instance.exports.add(3, 7);
  test.strictEqual(sum, 10);

  example.instance.exports.add_callback(3, 7);

  test.end();
});

metatests.test('WAT WASM: wabt/wat2wasm', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = PATH + 'wat.wasm';
  const example = await load(fileName, 'imports', [callback]);

  const sum = example.instance.exports.add(3, 7);
  test.strictEqual(sum, 10);

  example.instance.exports.addCallback(3, 7);

  test.end();
});

metatests.test('AssemblyScript WASM', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = PATH + 'assemblyscript.wasm';
  const example = await load(fileName, 'example', [callback]);

  const sum = example.instance.exports.add(3, 7);
  test.strictEqual(sum, 10);

  example.instance.exports.addCallback(3, 7);

  test.end();
});
