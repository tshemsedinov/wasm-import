'use strict';

const { getLoader } = require('./lib/node.js');

const load = getLoader({ browser: false });

module.exports = { load };
