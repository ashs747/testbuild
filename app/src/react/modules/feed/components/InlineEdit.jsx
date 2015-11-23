import React from 'react';
import TextArea from 'react-textarea-autosize';

export default class InlineEdit extends React.Component {

  constructor() {
    super();
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSave = this.onSave.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
  }

  render() {
    var textAreaStyle;
    if (this.props.state === 'error') {
      textAreaStyle = 'warn';
    }

    let saveButton = (this.props.showSaveButton) ? <a className="save-button btn" onClick={this.onSave}>Save</a> : null;

    return (
      <form onSubmit={this.onSave} status={this.props.state}>
        <TextArea value={this.props.content} onChange={this.onChangeHandler} onKeyDown={this.keyHandler} onBlur={this.onSave}/>
        {saveButton}
      </form>
    );
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.props.onChangeHandler(e.target.value);
  }

  onSave(e) {
    e.preventDefault();
    this.props.save();
  }

  keyHandler(e) {
    var keyPressed = e.which || e.keyCode;
    if (keyPressed == '13') {
      this.onSave(e);
    }
  }
}
