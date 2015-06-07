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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CodeMirrorSettings = require('./CodeMirrorSettings');

if (_CodeMirrorSettings.IS_BROWSER) {
  require('codemirror/addon/runmode/runmode');
}

var propTypes = {
  codeText: _react2['default'].PropTypes.string.isRequired,
  className: _react2['default'].PropTypes.string,
  mode: _react2['default'].PropTypes.string
};

var defaultProps = {
  mode: 'javascript'
};

var CodeExample = (function (_React$Component) {
  function CodeExample(props) {
    _classCallCheck(this, CodeExample);

    _get(Object.getPrototypeOf(CodeExample.prototype), 'constructor', this).call(this, props);

    this.update = this.update.bind(this);
  }

  _inherits(CodeExample, _React$Component);

  _createClass(CodeExample, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      if (_CodeMirrorSettings.CodeMirror === undefined) {
        return;
      }

      _CodeMirrorSettings.CodeMirror.runMode(this.props.codeText, this.props.mode, _react2['default'].findDOMNode(this).children[0]);
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = _classnames2['default']('code-example', 'CodeMirror', this.props.className);
      return _react2['default'].createElement(
        'pre',
        { className: classes },
        _react2['default'].createElement(
          'code',
          null,
          this.props.codeText
        )
      );
    }
  }]);

  return CodeExample;
})(_react2['default'].Component);

CodeExample.defaultProps = defaultProps;
CodeExample.propTypes = propTypes;

exports['default'] = CodeExample;
module.exports = exports['default'];