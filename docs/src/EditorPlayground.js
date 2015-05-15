import * as modReact from 'react';
import babel from 'babel-core/browser';
import Editor from './Editor';

import * as modMyComponent from './MyComponent';

/* eslint-disable */
const React = modReact.default;
const MyComponent = modMyComponent.default;
/* eslint-enable */

class EditorPlayground extends React.Component {

  transform(code) {
    let result = {
      code: code
    };

    try {
      result.code = babel.transform(code).code;
    } catch (ex) {
      result.error = ex;
    }

    return result;
  }

  runEval(code) {
    /* eslint-disable */
    return eval(code);
    /* eslint-enable */
  }

  displayError(err, transformed) {
    console.log(err);
    return (
      <div className="code-error">
        {err.message}
      </div>
    );
  }

  render() {
    return (
      <div className="editor-body">
        <Editor
          initialShowEditor={true}
          theme={this.props.theme}
          initialCode={this.props.initialCode}
          transformer={this.transform}
          displayError={this.displayError}
          runEval={this.runEval}/>
      </div>
    );
  }
}

EditorPlayground.propTypes = {
  initialCode: React.PropTypes.string.isRequired,
  theme: React.PropTypes.string.isRequired
};

export default EditorPlayground;
