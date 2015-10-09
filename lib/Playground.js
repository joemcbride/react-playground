'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var modReact = _interopRequireWildcard(_react);

var _CodeMirrorEditor = require('./CodeMirrorEditor');

var _CodeMirrorEditor2 = _interopRequireDefault(_CodeMirrorEditor);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _is_mobile = require('./is_mobile');

var React = modReact['default'];

var Playground = (function (_React$Component) {
  _inherits(Playground, _React$Component);

  function Playground(props) {
    _classCallCheck(this, Playground);

    _get(Object.getPrototypeOf(Playground.prototype), 'constructor', this).call(this, props);

    this.state = {
      showEditor: props.initialShowEditor,
      code: props.initialCode
    };

    this.toggle = this.toggle.bind(this);
    this.codeChanged = this.codeChanged.bind(this);
    this.displayError = this.displayError.bind(this);
  }

  _createClass(Playground, [{
    key: 'toggle',
    value: function toggle(ev) {
      ev.preventDefault();
      this.setState({ showEditor: !this.state.showEditor });
    }
  }, {
    key: 'displayError',
    value: function displayError(error, transformed) {

      if (this.props.displayError) {
        return this.props.displayError(error, transformed);
      } else {

        return React.createElement(
          'div',
          { className: 'code-error' },
          React.createElement(
            'h4',
            null,
            'Oh snap! You got an error!'
          ),
          React.createElement(
            'p',
            null,
            error.message
          )
        );
      }
    }
  }, {
    key: 'compile',
    value: function compile() {
      var transformed = this.props.transformer(this.state.code);

      if (transformed.error) {
        return this.displayError(transformed.error, transformed.code);
      }

      try {

        var Component = undefined;

        if (this.props.runEval) {

          Component = this.props.runEval(transformed.code);
        } else {

          /* eslint-disable */
          Component = eval(transformed.code);
          /* eslint-enable */
        }

        return React.createElement(Component, null);
      } catch (ex) {
        return this.displayError(ex, transformed.code);
      }

      return null;
    }
  }, {
    key: 'codeChanged',
    value: function codeChanged(newVal) {
      this.setState({ code: newVal });
    }
  }, {
    key: 'render',
    value: function render() {
      var editor = null;

      if (this.state.showEditor) {
        editor = React.createElement(
          'div',
          { className: 'example-code' },
          React.createElement(_CodeMirrorEditor2['default'], {
            mode: this.props.mode,
            theme: this.props.theme,
            lineNumbers: true,
            text: this.state.code,
            onChange: this.codeChanged })
        );
      }

      var exampleClasses = {};
      exampleClasses.example = true;
      exampleClasses.expanded = this.state.showEditor;

      var codeToggleClasses = {};
      codeToggleClasses['code-toggle'] = true;
      codeToggleClasses.expanded = this.state.showEditor;

      if (this.props.toggleClass) {
        codeToggleClasses[this.props.toggleClass] = true;
      }

      var toggleText = this.state.showEditor ? 'Hide Code' : 'Show Code';

      var playgroundClasses = {};
      playgroundClasses.playground = true;
      playgroundClasses.mobile = _is_mobile.IS_MOBILE;

      if (this.props.className) {
        playgroundClasses[this.props.className] = true;
      }

      return React.createElement(
        'div',
        { className: (0, _classnames2['default'])(playgroundClasses) },
        React.createElement(
          'div',
          { className: (0, _classnames2['default'])(exampleClasses) },
          this.compile()
        ),
        editor,
        React.createElement(
          'button',
          { className: (0, _classnames2['default'])(codeToggleClasses), onClick: this.toggle },
          toggleText
        )
      );
    }
  }]);

  return Playground;
})(React.Component);

Playground.propTypes = {
  transformer: React.PropTypes.func.isRequired,
  runEval: React.PropTypes.func,
  initialShowEditor: React.PropTypes.bool,
  initialCode: React.PropTypes.string,
  displayError: React.PropTypes.func,
  theme: React.PropTypes.string,
  mode: React.PropTypes.string,
  lineNumbers: React.PropTypes.bool,
  className: React.PropTypes.string,
  toggleClass: React.PropTypes.string
};

Playground.defaultProps = {
  intialShowEditor: false,
  mode: 'javascript',
  theme: 'solarized light',
  lineNumbers: false
};

exports['default'] = Playground;
module.exports = exports['default'];