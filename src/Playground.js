import * as modReact from 'react';
import CodeMirrorEditor from './CodeMirrorEditor';

const React = modReact.default;


class Playground extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditor: false,
      code: props.initialCode
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(ev) {
    ev.preventDefault();
    this.setState({ showEditor: !this.state.showEditor });
  }

  compile() {
    let transformed = this.props.transformer(this.state.code);
    try {
      /* eslint-disable */
      let Component = eval(transformed);
      /* eslint-enable */
      return <Component/>;
    } catch(ex) {
      console.log(ex, transformed.code);
      return (
        <div>
          <h4>Oh snap! You got an error!</h4>
          <p>{ex.message}</p>
        </div>
      );
    }

    return null;
  }

  render() {
    let editor = null;

    if (this.state.showEditor) {
        editor = (
          <CodeMirrorEditor
            mode={this.props.mode}
            theme={this.props.theme}
            lineNumbers={true}
            text={this.state.code}/>
        );
    }

    return (
      <div>
        {this.compile()}
        {editor}
        <a onClick={this.toggle}>Toggle</a>
      </div>
    );
  }
}

Playground.propTypes = {
  theme: React.PropTypes.string,
  mode: React.PropTypes.string,
  lineNumbers: React.PropTypes.bool,
  initialCode: React.PropTypes.string,
  transformer: React.PropTypes.func.isRequired
};

Playground.defaultProps = {
  mode: 'javascript',
  theme: 'solarized light',
  lineNumbers: false
};

export default Playground;
