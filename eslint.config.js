'use strict';

const init = require('eslint-config-metarhia');

module.exports = [
  ...init,
  {
    files: ['dist/**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
    },
  },
];
