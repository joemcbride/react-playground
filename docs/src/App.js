import React from 'react';
import EditorPlayground from './EditorPlayground';
import CodeExample from '../../src/CodeExample';

if (typeof window !== 'undefined') {
  require('./assets/root.less');
}

let example = `
class MountComponent extends React.Component {
  render() {
    return (
      <div>
        Inline custom components.
        <MyComponent/>
      </div>
    );
  }
}

export default MountComponent;
`;

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = {example: example};

    this.change = this.change.bind(this);
  }

  change() {
    let res = this.state.example = this.state.example + '\nvar = 1;';
    this.setState({example:res});
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>React Playground</h1>
        </div>
        <div className="content">
          <EditorPlayground
            theme="monokai"
            initialCode={this.state.example}/>
          <CodeExample
            className="cm-s-monokai"
            codeText={this.state.example}/>
          <button onClick={this.change}>Change code</button>
        </div>
      </div>
    );
  }
}

export default Application;
