'use strict';

const metatests = require('metatests');
const { load } = require('..');

const PATH = './test/examples/';

metatests.test('Rust WASM (node): wasm-pack', async (test) => {
  const fileName = PATH + 'rust.wasm';
  const example = await load(fileName);

  {
    const res = example.instance.exports.sum(3, 7);
    test.strictEqual(res, 10);
  }

  {
    example.instance.exports.add(1, 1, (res) => {
      test.strictEqual(res, 2);
    });
    const res = await example.instance.exports.add(1, 1);
    test.strictEqual(res, 2);
  }

  {
    example.instance.exports.add(2, 2, (res) => {
      test.strictEqual(res, 4);
    });
    const res = await example.instance.exports.add(2, 2);
    test.strictEqual(res, 4);
  }

  {
    example.instance.exports.sub(10, 5, (res) => {
      test.strictEqual(res, 5);
    });
    const res = await example.instance.exports.sub(10, 5);
    test.strictEqual(res, 5);
  }

  {
    example.instance.exports.sub(20, 10, (res) => {
      test.strictEqual(res, 10);
    });
    const res = await example.instance.exports.sub(20, 10);
    test.strictEqual(res, 10);
  }

  test.end();
});

metatests.test('WAT WASM (node): wabt/wat2wasm', async (test) => {
  const fileName = PATH + 'wat.wasm';
  const example = await load(fileName);

  {
    const res = example.instance.exports.sum(3, 7);
    test.strictEqual(res, 10);
  }

  {
    example.instance.exports.add(1, 1, (res) => {
      test.strictEqual(res, 2);
    });
    const res = await example.instance.exports.add(1, 1);
    test.strictEqual(res, 2);
  }

  {
    example.instance.exports.add(2, 2, (res) => {
      test.strictEqual(res, 4);
    });
    const res = await example.instance.exports.add(2, 2);
    test.strictEqual(res, 4);
  }

  {
    example.instance.exports.sub(10, 5, (res) => {
      test.strictEqual(res, 5);
    });
    const res = await example.instance.exports.sub(10, 5);
    test.strictEqual(res, 5);
  }

  {
    example.instance.exports.sub(20, 10, (res) => {
      test.strictEqual(res, 10);
    });
    const res = await example.instance.exports.sub(20, 10);
    test.strictEqual(res, 10);
  }

  test.end();
});

metatests.test('AssemblyScript WASM (node)', async (test) => {
  const fileName = PATH + 'as.wasm';
  const example = await load(fileName);

  {
    const res = example.instance.exports.sum(3, 7);
    test.strictEqual(res, 10);
  }

  {
    example.instance.exports.add(1, 1, (res) => {
      test.strictEqual(res, 2);
    });
    const res = await example.instance.exports.add(1, 1);
    test.strictEqual(res, 2);
  }

  {
    example.instance.exports.add(2, 2, (res) => {
      test.strictEqual(res, 4);
    });
    const res = await example.instance.exports.add(2, 2);
    test.strictEqual(res, 4);
  }

  {
    example.instance.exports.sub(10, 5, (res) => {
      test.strictEqual(res, 5);
    });
    const res = await example.instance.exports.sub(10, 5);
    test.strictEqual(res, 5);
  }

  {
    example.instance.exports.sub(20, 10, (res) => {
      test.strictEqual(res, 10);
    });
    const res = await example.instance.exports.sub(20, 10);
    test.strictEqual(res, 10);
  }

  test.end();
});

metatests.test('C++ WASM (node)', async (test) => {
  const fileName = PATH + 'cpp.wasm';
  const example = await load(fileName);

  {
    const res = example.instance.exports.sum(3, 7);
    test.strictEqual(res, 10);
  }

  {
    example.instance.exports.add(1, 1, (res) => {
      test.strictEqual(res, 2);
    });
    const res = await example.instance.exports.add(1, 1);
    test.strictEqual(res, 2);
  }

  {
    example.instance.exports.add(2, 2, (res) => {
      test.strictEqual(res, 4);
    });
    const res = await example.instance.exports.add(2, 2);
    test.strictEqual(res, 4);
  }

  {
    example.instance.exports.sub(10, 5, (res) => {
      test.strictEqual(res, 5);
    });
    const res = await example.instance.exports.sub(10, 5);
    test.strictEqual(res, 5);
  }

  {
    example.instance.exports.sub(20, 10, (res) => {
      test.strictEqual(res, 10);
    });
    const res = await example.instance.exports.sub(20, 10);
    test.strictEqual(res, 10);
  }

  test.end();
});
