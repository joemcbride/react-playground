import React from 'react';
import Editor from './Editor';

import babel from 'babel-core/browser';

class Application extends React.Component {

  transform(code) {
    return babel.transform(code).code;
  }

  render() {
    return (
      <div>
        <h1>Code Mirror Editor</h1>
        <Editor
          theme="monokai"
          initialCode="class Something extends React.Component { render(){ return (<div>Yap</div>); } }  export default Something;"
          transformer={this.transform}/>
      </div>
    );
  }
}

export default Application;
