import React from 'react';
import {connect} from 'react-redux';
import store from '../../redux/store';
import CloudinaryImg from '../components/CloudinaryImg.jsx';
var dispatch = store.dispatch;

class ToolkitView extends React.Component {

  constructor() {
    super();
    this.mapToolkitWidgets = this.mapToolkitWidgets.bind(this);
  }

  render() {
    let toolkitWidgets = this.mapToolkitWidgets(this.props.toolkits);
    return (
      <div className="toolkits">
        <div className="header">
          <div className="header-text">
            <h1>Toolkit</h1>
          </div>
        </div>
        <div className="body clearfix">
          <p>A collection of tools designed to support you through the programme and beyond. Straightforward tips and techniques to put into practice straight away.</p>
          {toolkitWidgets}
        </div>
      </div>
    );
  }

  mapToolkitWidgets(toolkits) {
    let mappedWidgets = toolkits.map(toolkit => {
      let icon = toolkit.icon ? <CloudinaryImg file={toolkit.icon} /> : null;
      return (
        <div key={toolkit.id} className={`toolkit-widget ${this.props.profile}-item`}>
          <div className="widget-icon">
            {icon}
          </div>
          <h3>{toolkit.title}</h3>
          <a className="btn" href={`/#/toolkit/${toolkit.slug}`}>VIEW</a>
        </div>
      );
    });
    return mappedWidgets;
  }
}

function mapToolkitsProps(state) {
  return {
    profile: state.width.profile,
    toolkits: state.content.toolkits ? state.content.toolkits : []
  };
};
let mappedToolkitView = connect(mapToolkitsProps)(ToolkitView);

export default mappedToolkitView;
