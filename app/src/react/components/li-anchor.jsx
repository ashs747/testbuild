import React from 'react';

export default class LiAnchor extends React.Component {
  constuctor() {

  }

  render() {
    var subMenu;
    if (this.props.childList) {
      subMenu = <ul>{this.props.childList}</ul>;
    }

    return (<li>
      <a href={this.props.url} onClick={this.props.onClick}>{this.props.text}</a>
      {subMenu}
    </li>);
  }
}