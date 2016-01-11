import React from 'react';
import {windowResize} from '../redux/actions/widthActions';
import $ from 'jquery';

class AppWrapper extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.changeWidth();
    $(window).on('resize', () => {
      this.changeWidth();
    });
  }

  render() {
    if (!this.props.children) {
      return <div />;
    }
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  changeWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.props.dispatch(windowResize(width));
  }
}

export default AppWrapper;