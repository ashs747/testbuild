import React from 'react';

export default class LiAnchor extends React.Component {
  constructor() {
    super();
    this.doAction = this.doAction.bind(this);
  }

  render() {
    const subMenu = this.props.childList || '';

    return (<li>
      <a href={this.props.url} onClick={this.doAction}>{this.props.text}</a>
      {subMenu}
    </li>);
  }

  doAction(e) {
    if (this.props.action) {
      e.preventDefault();
      this.props.action();
    }
  }
}