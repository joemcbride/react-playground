'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var IS_BROWSER = typeof window !== 'undefined';

var CodeMirror = {};

if (IS_BROWSER) {
  CodeMirror = require('codemirror');
}

exports['default'] = {
  IS_BROWSER: IS_BROWSER,
  CodeMirror: CodeMirror
};
module.exports = exports['default'];