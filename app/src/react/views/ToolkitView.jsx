import React from 'react';
import {connect} from 'react-redux';

class ToolkitView extends React.Component {

  constructor() {
    super();
    this.mapToolkitWidgets = this.mapToolkitWidgets.bind(this);
  }

  render() {
    let toolkitWidgets = this.mapToolkitWidgets();
    return (
      <div className="toolkits">
        <div className="header">
          <h1>Toolkit</h1>
          <h6>This collection of topic based ‘tools’ are designed to support your learning as you go through the programme.
            As you work with your peers, you can discuss which are going to be most helpful for your individual learning plan.
            You may find them handy to use with your teams. These great toolkits really help for when you want to do some
            independent development or just want a quick refresher in your own time. Feel free to have an explore!</h6>
        </div>
        <div className="body clearfix">
          {toolkitWidgets}
        </div>
      </div>
    );
  }

  mapToolkitWidgets() {
    let mappedWidgets = [];
    for (var i = 0; i < 10; i++) {
      mappedWidgets.push(
        <div key={i} className={`toolkit-widget ${this.props.profile}-item`}>
          <div className="widget-icon">
            <i className="fa fa-wrench"></i>
          </div>
          <h3>Tool title: Aenean lacinia bibendum nulla sed consectetur.</h3>
          <a className="btn" href="/#/toolkit/test-toolkit">View</a>
        </div>
      );
    }
    return mappedWidgets;
  }
}

function mapToolkitsProps(state) {
  return {
    profile: state.width.profile
  };
};
let mappedToolkitView = connect(mapToolkitsProps)(ToolkitView);

export default mappedToolkitView;
