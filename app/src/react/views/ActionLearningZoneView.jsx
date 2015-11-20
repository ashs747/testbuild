import React from 'react';
import MembersModuleWidget from '../modules/members/Widget.jsx';
import _ from 'underscore';
import {connect} from 'react-redux';
import FeedWidget from '../modules/feed/Widget.jsx';
import {getFeedIdForContext} from '../../redux/services/feedService';
import {fetchUsersByCohort} from '../../redux/actions/usersActions';
import {getResourcesByCohort} from '../../redux/actions/contentActions';
import Store from '../../redux/store';
import TabStack from 'cirrus/react/components/TabStack';
import ResourcesWidget from '../modules/resource/Widget.jsx';
var dispatch = Store.dispatch;
var feedID;

function mapALZFeed(state) {
  return {
    context: 'cohort',
    feeds: state.feeds,
    profile: state.width.profile,
    showComments: true,
  };
};
var ALZFeed = connect(mapALZFeed)(FeedWidget);

function mapMembersProps(state) {
  return {
    users: state.user.users,
    title: 'Team',
    imageViewStyle: {
      height: "40px",
      width: "40px"
    }
  };
};
var MembersModule = connect(mapMembersProps)(MembersModuleWidget);

function mapResourceProps(state) {
  return {
    title: "Resouces",
    resources: state.content ? state.content.resources : []
  };
}
var TeamResourcesWidget = connect(mapResourceProps)(ResourcesWidget);

function mapProjectProps(state) {
  return {
    title: "Project Pages",
    resources: state.content ? state.content.projects : []
  };
}
var ProjectsWidget = connect(mapProjectProps)(ResourcesWidget);

class ActionLearningZoneView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    dispatch(fetchUsersByCohort(1));
    dispatch(getResourcesByCohort(1));
  }

  render() {
    var messageBoard = (
      <div className="alz-message-board">
        <h3>Cohort 1 message board</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <ALZFeed />
      </div>
    );
    var resoucesWidgets = (
      <div className="resources-widgets">
        <ProjectsWidget />
        <TeamResourcesWidget />
      </div>
    );
    var membersModule = (
      <MembersModule />
    );
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <div className="row">
              <div className="col-sm-8 left-bar">
                {messageBoard}
              </div>
              <div className="col-sm-4 right-bar">
                {membersModule}
                {resoucesWidgets}
              </div>
            </div>
          );
          break;
        default:
          let tab1 = (<div label="Message Board" tabClass="tab-btn" key="tab1">{messageBoard}</div>);
          let tab2 = (<div label="Team" tabClass="tab-btn" key="tab2">{membersModule}</div>);
          let tab3 = (<div label="Resources" tabClass="tab-btn" key="tab3">{resoucesWidgets}</div>);
          let tabs = [tab1, tab2, tab3];
          return (
            <TabStack ref="alzTabs" className="alz-tabs" selectedIndex={0}>
              {tabs}
            </TabStack>
          );
          break;
      }
    })();
    return (
      <div className="action-learning-zone">
        <div className="row">
          <div className="col-sm-12 header-page">
            <div className="col-sm-8">
              <h1>Action learning zone</h1>
            </div>
            <div className="col-sm-4">
            /* This needs to be implemented along with a User-Role check */
              <select className="form-control">
                <option>Cohort 1</option>
              </select>
            </div>
          </div>
        </div>
        {bodyContent}
      </div>
    );
  }
}

function mapALZProps(state) {
  return {
    profile: state.width.profile,
    feeds: state.feeds
  };
};

var linkedALZView = connect(mapALZProps)(ActionLearningZoneView);
export default linkedALZView;
