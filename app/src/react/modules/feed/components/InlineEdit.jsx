import React from 'react';

export default class InlineEdit extends React.Component {

  constructor() {
    super();
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSave = this.onSave.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
  }

  onChangeHandler(e) {
    e.preventDefault();
    console.log(e);
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

  render() {
    var textAreaStyle;
    if (this.props.state === 'error') {
      textAreaStyle = 'warn';
    }

    return (
      <form onSubmit={this.onSave} status={this.props.state}>
        <textarea class={textAreaStyle || ''} rows={3}  onKeyUp={this.keyHandler} onChange={this.onChangeHandler}>
          {this.props.content}
        </textarea>
        <button>Save</button>
        <button>Cancel</button>
      </form>
    );
  }
}