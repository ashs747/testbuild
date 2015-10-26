import React from 'react';

export default class LiAnchor extends React.Component {
  constructor() {
    super();
  }

  render() {
    const subMenu = this.props.childList || '';

    return (<li onClick={this.props.onClick}>
      <a href={this.props.url} onClick={this.props.onClick}>{this.props.text}</a>
      {subMenu}
    </li>);
  }
}
