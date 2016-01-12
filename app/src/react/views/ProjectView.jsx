import React from 'react';
import {connect} from 'react-redux';
import {getProjectContent} from '../../redux/actions/contentActions';
import TabStack from '../legacy/TabStack.jsx';
import Store from '../../redux/store';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import ResourceWidget from '../modules/resource/Widget.jsx';
import ProjectPanel from '../modules/projectPanel/ProjectPanel.jsx';
import _ from 'underscore';
var dispatch = Store.dispatch;

class ProjectView extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    dispatch(getProjectContent(1));
  }

  render() {
    let smallTable = (this.props.profile === "sm");
    let moduleWithActivity = this.getModuleWithOnlySingleActivity(this.props.modules, this.props.params.project);
    let ljt = (this.props.content.journeyModule) ? <LearningJourneyTable journeyModule={moduleWithActivity} smallTable={smallTable} /> : null;
    let overview = (
      <div className="learning-journey">
        <h3>Your learning journey</h3>
        {ljt}
      </div>
    );
    let project = (
      <div className="project-rows">
        <h3>Project</h3>
        <p>{this.props.content.projectCopy}</p>
        <ProjectPanel steps={this.props.content.steps} />
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
          let tab1 = (<div label="Overview" tabClass="tab-btn" key="tab1">{overview}{timeRequired}</div>);
          let tab2 = (<div label="Project" tabClass="tab-btn" key="tab2">{project}</div>);
          let tab3 = (<div label="Resources" tabClass="tab-btn" key="tab3">{resources}</div>);
          let tabs = [tab1, tab2, tab3];
          return (
            <TabStack ref="projectTabs" className="project-tabs" selectedIndex={0}>
              {tabs}
            </TabStack>
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

  getModuleWithOnlySingleActivity(modules, activityID) {
    let singleModuleSingleActivity = {};
    let newObj = _.mapObject(modules, (mod, key) => {
      var selectedActivity;
      var activities = _.mapObject(mod.activities, (act, key) => {
        if (act.id === activityID) {
          selectedActivity = {[key]: act};
        }
      });
      if (selectedActivity) {
        singleModuleSingleActivity = {...mod, activities: selectedActivity};
      }
    });
    return singleModuleSingleActivity;
  }
}

function mapProjectProps(state) {
  return {
    profile: state.width.profile,
    content: state.content.project ? state.content.project : {},
    modules: state.learningJourney
  };
};
let mappedProjectView = connect(mapProjectProps)(ProjectView);

export default mappedProjectView;
