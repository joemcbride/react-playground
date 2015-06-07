import React from 'react';
import classNames from 'classnames';
import {CodeMirror, IS_BROWSER} from './CodeMirrorSettings';

if (IS_BROWSER) {
  require('codemirror/addon/runmode/runmode');
}

const propTypes = {
  codeText: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  mode: React.PropTypes.string
};

const defaultProps = {
  mode: 'javascript'
};

class CodeExample extends React.Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    if (CodeMirror === undefined) {
      return;
    }

    CodeMirror.runMode(
      this.props.codeText,
      this.props.mode,
      React.findDOMNode(this).children[0]
    );
  }

  render() {
    let classes = classNames('code-example', 'CodeMirror', this.props.className);
    return (
      <pre className={classes}>
        <code>
          {this.props.codeText}
        </code>
      </pre>
    );
  }
}

CodeExample.defaultProps = defaultProps;
CodeExample.propTypes = propTypes;

export default CodeExample;
