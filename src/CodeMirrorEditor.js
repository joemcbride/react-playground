import React from 'react';
import {CodeMirror, IS_BROWSER} from './CodeMirrorSettings';
import {IS_MOBILE} from './is_mobile';

class CodeMirrorEditor extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    if (IS_MOBILE || !IS_BROWSER) {
      return;
    }

    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: this.props.mode,
      lineNumbers: this.props.lineNumbers,
      lineWrapping: false,
      matchBrackets: true,
      tabSize: 2,
      theme: this.props.theme,
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.handleChange);
  }

  handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  }

  render() {
    // wrap in a div to fully contain CodeMirror
    let editor;

    if (IS_MOBILE) {
      let preStyles = {overflow: 'scroll'};
      editor = <pre style={preStyles}>{this.props.text}</pre>;
    } else {
      editor = <textarea ref='editor' defaultValue={this.props.text} />;
    }

    return (
      <div className={this.props.className}>
        {editor}
      </div>
    );
  }
}

CodeMirrorEditor.propTypes = {
  text: React.PropTypes.string,
  theme: React.PropTypes.string,
  mode: React.PropTypes.string,
  lineNumbers: React.PropTypes.bool,
  className: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

CodeMirrorEditor.defaultProps = {
  mode: 'javascript',
  theme: 'solarized light',
  lineNumbers: false,
  readOnly: false
};

export default CodeMirrorEditor;
