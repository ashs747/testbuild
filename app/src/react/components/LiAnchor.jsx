import React from 'react';
import $ from 'jquery';

export default class LiAnchor extends React.Component {
  constructor() {
    super();
    this.doAction = this.doAction.bind(this);
  }

  componentDidMount() {
    var subnav = $('.sub-nav');
    var submenu = $('.sub-menu');
    var height = subnav.height();

    submenu.hover(() => {
      $('.sub-nav').stop();
      $('.sub-nav').slideDown(250);
    }, () => {
      $('.sub-nav').stop();
      $('.sub-nav').slideUp(250);
    });
  }

  render() {
    const subMenu = this.props.childList || '';
    const icon = this.props.icon ? <i className={`fa fa-${this.props.icon}`}></i> : null;
    let arrow;
    let className = this.props.className;

    if (this.props.mobileSubNav) {
      var type = (this.props.displaySubNav) ? "down" : "up";
      arrow = <i className={`fa fa-chevron-${type} sub-arrow`} ></i>
      if (this.props.displaySubNav) {
        className += " no-border-bottom";
      }
    }

    return (
      <li onClick={this.doAction} className={className} >
        {icon}
        <a>{this.props.text}</a>
        {arrow}
        {subMenu}
      </li>
    );
  }

  doAction(e) {
    if (this.props.url) {
      window.location.href = this.props.url;
    }
    if (this.props.action) {
      e.preventDefault();
      this.props.action();
    }
  }

}
