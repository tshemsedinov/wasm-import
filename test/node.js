'use strict';

const metatests = require('metatests');
const { load } = require('..');

const PATH = './test/examples/';

metatests.test('Rust WASM (node): wasm-pack', async (test) => {
  const fileName = PATH + 'rust.wasm';
  const example = await load(fileName);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(1, 1, (res) => {
    test.strictEqual(res, 2);
  });

  example.instance.exports.add(2, 2, (res) => {
    test.strictEqual(res, 4);
  });

  example.instance.exports.sub(10, 5, (res) => {
    test.strictEqual(res, 5);
  });

  example.instance.exports.sub(20, 10, (res) => {
    test.strictEqual(res, 10);
  });

  const strictEq = (wanted) => (got) => test.strictEqual(got, wanted);
  example.add(10, 5, strictEq(15));
  example.add(-2, 7, strictEq(5));
  example.add(65535, 1, strictEq(2 ** 16));
  example.sub(10, 10, strictEq(0));
  example.sub(23, 1000_000, strictEq(-999_977));

  test.end();
});

metatests.test('WAT WASM (node): wabt/wat2wasm', async (test) => {
  const fileName = PATH + 'wat.wasm';
  const example = await load(fileName);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(1, 1, (res) => {
    test.strictEqual(res, 2);
  });

  example.instance.exports.add(2, 2, (res) => {
    test.strictEqual(res, 4);
  });

  example.instance.exports.sub(10, 5, (res) => {
    test.strictEqual(res, 5);
  });

  example.instance.exports.sub(20, 10, (res) => {
    test.strictEqual(res, 10);
  });

  const strictEq = (wanted) => (got) => test.strictEqual(got, wanted);
  example.add(10, 5, strictEq(15));
  example.add(-2, 7, strictEq(5));
  example.add(65535, 1, strictEq(2 ** 16));
  example.sub(10, 10, strictEq(0));
  example.sub(23, 1000_000, strictEq(-999_977));

  test.end();
});

metatests.test('AssemblyScript WASM (node)', async (test) => {
  const fileName = PATH + 'as.wasm';
  const example = await load(fileName);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(1, 1, (res) => {
    test.strictEqual(res, 2);
  });

  example.instance.exports.add(2, 2, (res) => {
    test.strictEqual(res, 4);
  });

  example.instance.exports.sub(10, 5, (res) => {
    test.strictEqual(res, 5);
  });

  example.instance.exports.sub(20, 10, (res) => {
    test.strictEqual(res, 10);
  });

  const strictEq = (wanted) => (got) => test.strictEqual(got, wanted);
  example.add(10, 5, strictEq(15));
  example.add(-2, 7, strictEq(5));
  example.add(65535, 1, strictEq(2 ** 16));
  example.sub(10, 10, strictEq(0));
  example.sub(23, 1000_000, strictEq(-999_977));

  test.end();
});

metatests.test('C++ WASM (node)', async (test) => {
  const fileName = PATH + 'cpp.wasm';
  const example = await load(fileName);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(1, 1, (res) => {
    test.strictEqual(res, 2);
  });

  example.instance.exports.add(2, 2, (res) => {
    test.strictEqual(res, 4);
  });

  example.instance.exports.sub(10, 5, (res) => {
    test.strictEqual(res, 5);
  });

  example.instance.exports.sub(20, 10, (res) => {
    test.strictEqual(res, 10);
  });

  const strictEq = (wanted) => (got) => test.strictEqual(got, wanted);
  example.add(10, 5, strictEq(15));
  example.add(-2, 7, strictEq(5));
  example.add(65535, 1, strictEq(2 ** 16));
  example.sub(10, 10, strictEq(0));
  example.sub(23, 1000_000, strictEq(-999_977));

  test.end();
});
