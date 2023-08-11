'use strict';

const metatests = require('metatests');
const { load } = require('..');

const PATH = './test/examples/';

metatests.test('Rust WASM (node): wasm-pack', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = PATH + 'rust.wasm';
  const example = await load(fileName, 'example', [callback]);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(3, 7);

  test.end();
});

metatests.test('WAT WASM (node): wabt/wat2wasm', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = PATH + 'wat.wasm';
  const example = await load(fileName, 'example', [callback]);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(3, 7);

  test.end();
});

metatests.test('AssemblyScript WASM (node)', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = PATH + 'as.wasm';
  const example = await load(fileName, 'example', [callback]);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(3, 7);

  test.end();
});
