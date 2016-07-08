import React from 'react';
import {connect} from 'react-redux';
import ConnectionsWall from '../modules/connectionsWall/ConnectionsWall.jsx';
import Top10Widget from '../modules/connectionsWall/Top10Widget.jsx';
import TabStack from '../legacy/TabStack.jsx';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import _ from 'underscore';

class ConnectionsWallView extends React.Component {

  constructor() {
    super();
  }

  render() {
    var walls = this.props.walls;
    var requiredWallId = parseInt(this.props.params.id, 10);
    let moduleWithActivity = this.getModuleWithOnlySingleActivity(this.props.learningJourney, requiredWallId);
    var activity = _.values(moduleWithActivity.activities);
    if (activity.length === 0) {
      return <div />;
    }
    activity = activity[0];
    var wallObject = null;
    for (var wall in walls) {
      if (walls.hasOwnProperty(wall)) {
        if (walls[wall].activityId === requiredWallId) {
          wallObject = walls[wall];
        }
      }
    }
    let connectionsWall =
    <ConnectionsWall
      wall={wallObject}
      currentUser={this.props.currentUser}
      profile={this.props.profile}
      supportUrl={this.props.supportUrl}
      />
    let top10 = (
      <Top10Widget wall={wallObject}/>
    );
    let overview = (
      <div className="overview">
      </div>
    );
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-8 left-bar">
                  <LearningJourneyTable journeyModule={moduleWithActivity} smallTable={false}/>
                  <div className="activity-content" dangerouslySetInnerHTML={{__html: activity.content}}/>
                </div>
                <div className="col-sm-4 right-bar">
                  {top10}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  {connectionsWall}
                </div>
              </div>
            </div>
          );
          break;
        default:
          let tab1 = (<div label="Wall" tabClass="tab-btn" key="tab1">
            {connectionsWall}
          </div>);
          let tab2 = (
            <div label="Top 10" tabClass="tab-btn" key="tab2">
              {top10}
              <div className="activity-content" dangerouslySetInnerHTML={{__html: activity.content}}/>
              <LearningJourneyTable journeyModule={moduleWithActivity} smallTable={true}/>
            </div>
          );
          let tabs = [tab1, tab2];
          return (
            <TabStack ref="activityTabs" className="activity-tabs" selectedIndex={0}>
              {tabs}
            </TabStack>
          );
          break;
      }
    })();
    let moduleSlug = activity.name.replace(/\s+/g, '-').toLowerCase();
    let icon = <img src={`assets/img/${moduleSlug}.png`} alt="module icon" />;
    return (
      <div className="connections-wall-view">
        <div className="header clearfix" style={{backgroundImage: `url("assets/img/banner-${moduleSlug}.jpg")`}}>
          <div className="hidden-xs hidden-sm col-md-2">
            <div className="icon">
              {icon}
            </div>
          </div>
          <div className="col-sm-12 col-md-10">
            <h4>{activity.name}</h4>
            <h2>Connections Wall</h2>
          </div>
        </div>
        {bodyContent}
      </div>
    );
  }

  getActivityImage(imageName, ext){
    let newName = imageName.toLowerCase();
    newName = newName.split(' ').join('-');
    newName += ext;
    return newName;
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
}

var mappedConnectionsWallWrapperView = connect(state => {
  return {
    loading: state.wall.loading,
    profile: state.width.profile,
    walls: state.wall,
    currentUser: state.user.id,
    learningJourney: state.learningJourney,
    supportUrl: state.programme.supportUrl
  };
})(ConnectionsWallView);

export default mappedConnectionsWallWrapperView;
