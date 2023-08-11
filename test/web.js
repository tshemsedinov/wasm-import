'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const timers = require('node:timers/promises');
const metatests = require('metatests');
global.fetch = global.fetch || require('undici').fetch;

const CWD = process.cwd();
const DIST = 'file://' + path.join(CWD, './dist/loader.mjs');
const BASE = 'http://127.0.0.1:8000/examples/';

const PORT = 8000;
const TEST_TIMEOT = 5000;

const serve = async (req, res) => {
  const stream = fs.createReadStream('./test' + req.url);
  res.writeHead(200, { 'Content-Type': 'application/wasm' });
  stream.pipe(res);
};

const server = http.createServer(serve).listen(PORT);

setTimeout(() => {
  server.close();
}, TEST_TIMEOT);

metatests.test('Rust WASM (web): wasm-pack', async (test) => {
  const { load } = await import(DIST);
  await timers.setTimeout(100);

  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = BASE + 'rust.wasm';
  const example = await load(fileName, 'example', [callback]);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(3, 7);

  test.end();
});

metatests.test('WAT WASM (web): wabt/wat2wasm', async (test) => {
  const { load } = await import(DIST);
  await timers.setTimeout(100);

  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = BASE + 'wat.wasm';
  const example = await load(fileName, 'example', [callback]);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(3, 7);

  test.end();
});

metatests.test('AssemblyScript WASM (web)', async (test) => {
  const { load } = await import(DIST);
  await timers.setTimeout(100);

  const callback = (res) => {
    test.strictEqual(res, 10);
  };

  const fileName = BASE + 'as.wasm';
  const example = await load(fileName, 'example', [callback]);

  const res = example.instance.exports.sum(3, 7);
  test.strictEqual(res, 10);

  example.instance.exports.add(3, 7);

  test.end();
});
