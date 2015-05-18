import React from 'react';
import EditorPlayground from './EditorPlayground';

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

  render() {
    return (
      <div>
        <div className="header">
          <h1>React Playground</h1>
        </div>
        <div className="content">
          <EditorPlayground
            theme="monokai"
            initialCode={example}/>
        </div>
      </div>
    );
  }
}

export default Application;
