import React from 'react';
import {connect} from 'react-redux';
import {getAllToolkits} from '../../redux/actions/contentActions';
import {dispatch} from '../../redux/store';

class ToolkitView extends React.Component {

  constructor() {
    super();
    this.mapToolkitWidgets = this.mapToolkitWidgets.bind(this);
  }

  componentDidMount() {
    dispatch(getAllToolkits());
  }

  render() {
    let toolkitWidgets = this.mapToolkitWidgets(this.props.toolkits);
    return (
      <div className="toolkits">
        <div className="header">
          <div className="header-text">
            <h1>Toolkit</h1>
            <h6>This collection of topic based ‘tools’ are designed to support your learning as you go through the programme.
              As you work with your peers, you can discuss which are going to be most helpful for your individual learning plan.
              You may find them handy to use with your teams. These great toolkits really help for when you want to do some
              independent development or just want a quick refresher in your own time. Feel free to have an explore!</h6>
          </div>
        </div>
        <div className="body clearfix">
          {toolkitWidgets}
        </div>
      </div>
    );
  }

  mapToolkitWidgets(toolkits) {
    let mappedWidgets = toolkits.map(toolkit => (
      <div key={toolkit.id} className={`toolkit-widget ${this.props.profile}-item`}>
        <div className="widget-icon">
          <i className={`fa fa-${toolkit.icon}`}></i>
        </div>
        <h3>Tool title:<br />{toolkit.title}</h3>
        <a className="btn" href={`/#/toolkit/${toolkit.slug}`}>View</a>
      </div>
    ));
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