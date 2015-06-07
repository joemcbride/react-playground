'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CodeMirrorSettings = require('./CodeMirrorSettings');

var _is_mobile = require('./is_mobile');

var CodeMirrorEditor = (function (_React$Component) {
  function CodeMirrorEditor(props) {
    _classCallCheck(this, CodeMirrorEditor);

    _get(Object.getPrototypeOf(CodeMirrorEditor.prototype), 'constructor', this).call(this, props);

    this.handleChange = this.handleChange.bind(this);
  }

  _inherits(CodeMirrorEditor, _React$Component);

  _createClass(CodeMirrorEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      if (_is_mobile.IS_MOBILE || !_CodeMirrorSettings.IS_BROWSER) {
        return;
      }

      this.editor = _CodeMirrorSettings.CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
        mode: this.props.mode,
        lineNumbers: this.props.lineNumbers,
        lineWrapping: false,
        matchBrackets: true,
        tabSize: 2,
        styleSelectedText: true,
        theme: this.props.theme,
        readOnly: this.props.readOnly
      });
      this.editor.on('change', this.handleChange);
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      if (!this.props.readOnly && this.props.onChange) {
        this.props.onChange(this.editor.getValue());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // wrap in a div to fully contain CodeMirror
      var editor = undefined;

      if (_is_mobile.IS_MOBILE) {
        var preStyles = { overflow: 'scroll' };
        editor = _react2['default'].createElement(
          'pre',
          { style: preStyles },
          this.props.text
        );
      } else {
        editor = _react2['default'].createElement('textarea', { ref: 'editor', defaultValue: this.props.text });
      }

      return _react2['default'].createElement(
        'div',
        { className: this.props.className },
        editor
      );
    }
  }]);

  return CodeMirrorEditor;
})(_react2['default'].Component);

CodeMirrorEditor.propTypes = {
  text: _react2['default'].PropTypes.string,
  theme: _react2['default'].PropTypes.string,
  mode: _react2['default'].PropTypes.string,
  lineNumbers: _react2['default'].PropTypes.bool,
  className: _react2['default'].PropTypes.string,
  readOnly: _react2['default'].PropTypes.bool,
  onChange: _react2['default'].PropTypes.func
};

CodeMirrorEditor.defaultProps = {
  mode: 'javascript',
  theme: 'solarized light',
  lineNumbers: false,
  readOnly: false
};

exports['default'] = CodeMirrorEditor;
module.exports = exports['default'];