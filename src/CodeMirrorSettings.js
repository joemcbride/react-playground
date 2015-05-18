let IS_BROWSER = typeof window !== 'undefined';

let CodeMirror = {};

if (IS_BROWSER) {
  CodeMirror = require('codemirror');
}

export default {
  IS_BROWSER: IS_BROWSER,
  CodeMirror: CodeMirror
};
