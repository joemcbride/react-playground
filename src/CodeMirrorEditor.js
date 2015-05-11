import React from 'react';
import {CodeMirror, IS_NODE} from './CodeMirror';
import {IS_MOBILE} from './is_mobile';

class CodeMirrorEditor extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    if (IS_MOBILE || IS_NODE) {
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

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.text);
    }
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
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
    );
  }
}

CodeMirrorEditor.PropTypes = {
  text: React.PropTypes.string,
  theme: React.PropTypes.string,
  mode: React.PropTypes.string,
  lineNumbers: React.PropTypes.bool,
  className: React.PropTypes.className,
  readOnly: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

CodeMirrorEditor.defaultProps = {
  mode: 'javascript',
  theme: 'solarized light',
  lineNumbers: false
};

export default CodeMirrorEditor;
