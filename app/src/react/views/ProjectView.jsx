import React from 'react';
import {connect} from 'react-redux';
import {getProjectContent} from '../../redux/actions/contentActions';
import Store from '../../redux/store';
var dispatch = Store.dispatch;

class ProjectView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    dispatch(getProjectContent(1));
  }

  render() {
    console.log(this.props.content);
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <p>Large screen, show 2 bars</p>
          );
          break;
        default:
          return (
            <p>Small or Medium screen, show the tab stack</p>
          );
          break;
      }
    })();
    return (
      <div className="project">
        <div className="header clearfix">
          <div className="col-sm-2">
            <div className="icon">
              <span><i className={`fa fa-${this.props.content.icon}`}></i></span>
            </div>
          </div>
          <div className="col-sm-10">
            <h3>Module 3 - Agile desicion maker</h3>
            <h1>Project title, 2nd line if needed</h1>
          </div>
        </div>
        {bodyContent}
      </div>
    );
  }

}

function mapProjectProps(state) {
  return {
    profile: state.width.profile,
    content: state.content.project ? state.content.project : {}
  };
};

let mappedProjectView = connect(mapProjectProps)(ProjectView);

export default mappedProjectView;
