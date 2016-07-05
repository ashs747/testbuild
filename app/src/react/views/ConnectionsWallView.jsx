import React from 'react';
import {connect} from 'react-redux';
import ConnectionsWall from '../modules/connectionsWall/ConnectionsWall.jsx';
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

    //console.log(moduleWithActivity) THE MODULE WITH activity
    //console.log(activity) THE ACTIVITY

    var wallObject = null;
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].activityId === requiredWallId) {
        wallObject = walls[i];
        break;
      }
    }
    return <ConnectionsWall wall={wallObject} currentUser={this.props.currentUser} />
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
    walls: state.wall.walls,
    currentUser: state.user.id,
    learningJourney: state.learningJourney
  };
})(ConnectionsWallView);

export default mappedConnectionsWallWrapperView;
