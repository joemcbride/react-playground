import * as modReact from 'react';
import CodeMirrorEditor from './CodeMirrorEditor';
import classNames from 'classnames';
import {IS_MOBILE} from './is_mobile';

const React = modReact.default;

class Playground extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditor: props.initialShowEditor,
      code: props.initialCode
    };

    this.toggle = this.toggle.bind(this);
    this.codeChanged = this.codeChanged.bind(this);
    this.displayError = this.displayError.bind(this);
  }

  toggle(ev) {
    ev.preventDefault();
    this.setState({ showEditor: !this.state.showEditor });
  }

  displayError(error, transformed) {

    if (this.props.displayError) {
      return this.props.displayError(error, transformed);
    } else {

      return (
        <div className="code-error">
          <h4>Oh snap! You got an error!</h4>
          <p>{error.message}</p>
        </div>
      );
    }
  }

  compile() {
    let transformed = this.props.transformer(this.state.code);

    if (transformed.error) {
      return this.displayError(transformed.error, transformed.code);
    }

    try {

      let Component;

      if (this.props.runEval) {

        Component = this.props.runEval(transformed.code);

      } else {

        /* eslint-disable */
        Component = eval(transformed.code);
        /* eslint-enable */
      }

      return <Component/>;

    } catch(ex) {
      return this.displayError(ex, transformed.code);
    }

    return null;
  }

  codeChanged(newVal) {
    this.setState({code:newVal});
  }

  render() {
    let editor = null;

    if (this.state.showEditor) {
        editor = (
          <div className="example-code">
            <CodeMirrorEditor
              mode={this.props.mode}
              theme={this.props.theme}
              lineNumbers={true}
              text={this.state.code}
              onChange={this.codeChanged}/>
          </div>
        );
    }

    let exampleClasses = {};
    exampleClasses.example = true;
    exampleClasses.expanded = this.state.showEditor;

    let codeToggleClasses = {};
    codeToggleClasses['code-toggle'] = true;
    codeToggleClasses.expanded = this.state.showEditor;

    if (this.props.toggleClass) {
      codeToggleClasses[this.props.toggleClass] = true;
    }

    let toggleText = this.state.showEditor ? 'Hide Code' : 'Show Code';

    let playgroundClasses = {};
    playgroundClasses.playground = true;
    playgroundClasses.mobile = IS_MOBILE;

    if (this.props.className) {
      playgroundClasses[this.props.className] = true;
    }

    return (
      <div className={classNames(playgroundClasses)}>
        <div className={classNames(exampleClasses)}>
          {this.compile()}
        </div>
        {editor}
        <button className={classNames(codeToggleClasses)} onClick={this.toggle}>{toggleText}</button>
      </div>
    );
  }
}

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

export default Playground;
