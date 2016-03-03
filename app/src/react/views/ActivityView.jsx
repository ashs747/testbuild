import React from 'react';
import {connect} from 'react-redux';
import {getActivityContent} from '../../redux/actions/contentActions';
import store from '../../redux/store';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import ResourceWidget from '../modules/resource/Widget.jsx';
import _ from 'underscore';
var dispatch = store.dispatch;

import TabStack from '../legacy/TabStack.jsx';

class ActivityView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    dispatch(getActivityContent(this.props.params.activity));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.activity !== this.props.params.activity) {
      dispatch(getActivityContent(this.props.params.activity));
    }
  }

  render() {
    let moduleWithActivity = this.getModuleWithOnlySingleActivity(this.props.modules, this.props.params.activity);
    var activity = _.values(moduleWithActivity.activities);
    if (activity.length === 0) {
      return <div />;
    }
    activity = activity[0];
    let smallTable = (this.props.profile === "sm");
    let ljt = (moduleWithActivity) ? <LearningJourneyTable journeyModule={moduleWithActivity} smallTable={smallTable} accessToken={this.props.accessToken} supportUrl={this.props.supportUrl}/> : null;
    let groupedResources = this.groupResources(activity.resources);
    let preWorkResources = groupedResources["pre-work"];
    if (!preWorkResources) {
      preWorkResources = [];
    }
    var preWork;
    if (activity.myBookedEventAndSlot) {
      preWorkResources = preWorkResources.concat(activity.myBookedEventAndSlot.resources);
      if (activity.myBookedEventAndSlot.content && activity.myBookedEventAndSlot.content.length > 0) {
        preWork = (
          <div>
            <h4>Pre Work</h4>
            <div dangerouslySetInnerHTML={{__html: activity.myBookedEventAndSlot.content}}></div>
          </div>
        );
      }
    }
    let resources = (
      <div>
        <ResourceWidget title="Pre-work" resources={preWorkResources} />
        <ResourceWidget title="Resources" resources={groupedResources["resource"]} />
        <ResourceWidget title="Course notes and recordings" resources={groupedResources["course-notes"]} />
      </div>
    );
    let overview = (
      <div className="overview">
        {ljt}
        <div className="overview-inner">
          {preWork}
          <h4>Overview and objectives</h4>
          <div dangerouslySetInnerHTML={{__html: activity.content}}></div>
        </div>
      </div>
    );
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <div className="main clearfix">
              <div className="col-sm-8 left-bar">
                {overview}
              </div>
              <div className="col-sm-4 right-bar">
                {resources}
              </div>
            </div>
          );
          break;
        default:
          let tab1 = (<div label="Overview" tabClass="tab-btn" key="tab1">{overview}</div>);
          let tab2 = (<div label="Resources" tabClass="tab-btn" key="tab2">{resources}</div>);
          let tabs = [tab1, tab2];
          return (
            <TabStack ref="activityTabs" className="activity-tabs" selectedIndex={0}>
              {tabs}
            </TabStack>
          );
          break;
      }
    })();
    let icon = this.assignIcon(activity.type);
    return (
      <div className="activity-view">
        <div className="header clearfix" style={{backgroundImage: `url("assets/img/${activity.type.toLowerCase()}.png")`}}>
          <div className="col-sm-2">
            <div className="icon">
              <span><i className={icon}></i></span>
            </div>
          </div>
          <div className="col-sm-10">
            <h4>{`Module ${moduleWithActivity.moduleId} - ${moduleWithActivity.name}`}</h4>
            <h2>{activity.name}</h2>
            <h4>{activity.type}</h4>
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
        if (act.id === parseInt(activityID, 10)) {
          selectedActivity = {[key]: act};
        }
      });
      if (selectedActivity) {
        singleModuleSingleActivity = {...mod, activities: selectedActivity};
      }
    });
    return singleModuleSingleActivity;
  }

  groupResources(resources = []) {
    let groupedResources = [];
    resources.forEach(resource => {
      if (!groupedResources[resource.context]) {
        groupedResources[resource.context] = [];
      }
      groupedResources[resource.context].push(resource);
    });
    return groupedResources;
  }

  assignIcon(type) {
    switch (type) {
      case 'Workshop':
        return 'fa fa-users';
      case 'Webinar':
        return 'fa fa-laptop';
      case 'Project':
        return 'fa fa-star';
      case 'Coaching':
        return 'fa fa-comments-o';
      default:
        return 'fa fa-users';
    }
  }

}

function mapActivityViewProps(state) {
  return {
    profile: state.width.profile,
    modules: state.learningJourney,
    accessToken: state.auth.acces_token,
    supportUrl: state.programme.supportUrl
  };
};
let mappedActivityView = connect(mapActivityViewProps)(ActivityView);

export default mappedActivityView;
