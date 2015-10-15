import React from 'react';
import {connect} from 'react-redux';
import {getProjectContent} from '../../redux/actions/contentActions';
import TabStack from 'cirrus/react/components/TabStack';
import Store from '../../redux/store';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import ResourceWidget from '../modules/resource/Widget.jsx';
var dispatch = Store.dispatch;

class ProjectView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    dispatch(getProjectContent(1));
  }

  render() {
    let ljt = (this.props.content.journeyModule) ? <LearningJourneyTable journeyModule={this.props.content.journeyModule} /> : null;
    let overview = (
      <div className="learning-journey">
        <h3>Your learning journey</h3>
        {ljt}
      </div>
    );
    let project = (
      <div className="project">

      </div>
    );
    let timeRequired = (
      <div className="time-required">
        <h4>Time Required: {this.props.content.time}</h4>
        <h6>Overview</h6>
        <p>{this.props.content.overview}</p>
        <h6>Learning Outcomes</h6>
        <p>{this.props.content.learningOutcomes}</p>
      </div>
    );
    let resources = (<ResourceWidget title="Resources" resources={this.props.content.resources} />);
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <div className="main clearfix">
              <div className="col-sm-8 left-bar">
                {overview}
                {project}
              </div>
              <div className="col-sm-4 right-bar">
                {timeRequired}
                {resources}
              </div>
            </div>
          );
          break;
        default:
          /*
          let tab1 = (<div label="Overview" tabClass="tab-btn" key="tab1">{messageBoard}</div>);
          let tab2 = (<div label="Project" tabClass="tab-btn" key="tab2">{membersModule}</div>);
          let tab3 = (<div label="Resources" tabClass="tab-btn" key="tab3">{resoucesWidgets}</div>);
          let tabs = [tab1, tab2, tab3];
          */
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
