import React from 'react';
import $ from 'jquery';

export default class LiAnchor extends React.Component {
  constructor() {
    super();
    this.doAction = this.doAction.bind(this);
  }

  componentDidMount() {
    if (this.props.subMenu) {
      var subNavSelector = '#sub-nav-' + this.props.subMenu;
      var subMenuSelector = '#sub-menu-' + this.props.subMenu;
      var subnav = $(subNavSelector);
      var submenu = $(subMenuSelector);
      var height = subnav.height();

      submenu.hover(() => {
        subnav.stop();
        subnav.slideDown(250);
      }, () => {
        subnav.stop();
        subnav.slideUp(250);
      });
    }
  }

  render() {
    const subMenu = this.props.childList || '';
    const icon = this.props.icon ? <i className={`fa fa-${this.props.icon}`}></i> : null;
    let arrow;
    let className = this.props.className;

    if (this.props.mobileSubNav) {
      var type = (this.props.displaySubNav) ? "up" : "down";
      arrow = <i className={`fa fa-chevron-${type} sub-arrow`} ></i>
      if (this.props.displaySubNav) {
        className += " no-border-bottom";
      }
    }
    let target = (this.props.target) ? this.props.target : '_self';
    return (
      <li onClick={this.doAction} className={className} id={`sub-menu-${this.props.subMenu}`}>
        <a target={target}>{icon} {this.props.text} </a>
        {arrow}
        {subMenu}
      </li>
    );
  }

  doAction(e) {
    if (this.props.url) {
      if (this.props.target) {
      window.open(this.props.url, this.props.target);
      } else {
        window.location.href = this.props.url;
      }
    }
    if (this.props.action) {
      e.preventDefault();
      this.props.action();
    }
  }

}
