'use strict';

const metatests = require('metatests');
const { load } = require('..');

const PATH = './test/examples/';

metatests.test('Rust WASM (node): wasm-pack', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 32);
  };

  const fileName = PATH + 'rust.wasm';
  const example = await load(fileName, 'wbg', [callback]);

  const sum = example.instance.exports.add(3, 7);
  test.strictEqual(sum, 10);

  example.instance.exports.add_callback(27, 5);

  test.end();
});

metatests.test('WAT WASM (node): wabt/wat2wasm', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 4);
  };

  const fileName = PATH + 'wat.wasm';
  const example = await load(fileName, 'imports', [callback]);

  const sum = example.instance.exports.add(6, 7);
  test.strictEqual(sum, 13);

  example.instance.exports.addCallback(2, 2);

  test.end();
});

metatests.test('AssemblyScript WASM (node)', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, -9);
  };

  const fileName = PATH + 'assemblyscript.wasm';
  const example = await load(fileName, 'example', [callback]);

  const sum = example.instance.exports.add(-1, 1);
  test.strictEqual(sum, 0);

  example.instance.exports.addCallback(-10, 1);

  test.end();
});
