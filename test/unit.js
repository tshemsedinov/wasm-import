'use strict';

const metatests = require('metatests');
const { load } = require('..');

metatests.test('Load WASM with callback', async (test) => {
  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const example = await load('./test/example.wasm', 'wbg', [callback]);

  const sum = example.instance.exports.add(3, 7);
  test.strictEqual(sum, 10);

  example.instance.exports.add_callback(3, 7);

  test.end();
});
