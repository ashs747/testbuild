import React from 'react';
import MembersModuleWidget from '../modules/members/Widget.jsx';
import _ from 'underscore';
import {connect} from 'react-redux';
import FeedWidget from '../modules/feed/Widget.jsx';
import {fetchLatestFeedMessages} from '../../redux/actions/feedActions';
import {fetchUsersByCohort} from '../../redux/actions/usersActions';
import Store from '../../redux/store';
import TabSack from 'cirrus/react/components/TabStack';
import ResourcesWidget from '../modules/resource/Widget.jsx';
var dispatch = Store.dispatch;

/*
function mapCommentListProps(state) {
  return {
    attachments: state.feeds.testTwo ? state.feeds.testTwo.files : [],
    feedID: 'testTwo',
    messages: state.feeds.testTwo ? state.feeds.testTwo.messages : [],
    showComments: true
  };
};
var ALZFeed = connect(mapCommentListProps)(FeedWidget);
*/

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
    resources: [{
      title: "Example resource - Word",
      reference: "http://google.com?1",
      type: {
        icon: "file-word-o",
        typeSlug: "document"
      }
    }, {
      title: "Example resource - Video",
      reference: "http://google.com?2",
      type: {
        icon: "youtube-play",
        typeSlug: "video"
      }
    }]
  }
}
var TeamResourcesWidget = connect(mapResourceProps)(ResourcesWidget);

function mapProjectProps(state) {
  return {
    title: "Project Pages",
    resources: [{
      title: "Project title 2nd line if needed",
      reference: "http://google.com?",
      type: {
        icon: "briefcase",
        typeSlug: "project"
      }
    }, {
      title: "Project title 2nd line if needed",
      reference: "http://google.com",
      type: {
        icon: "briefcase",
        typeSlug: "project"
      }
    }]
  }
}
var ProjectsWidget = connect(mapProjectProps)(ResourcesWidget);

class ActionLearningZoneView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    dispatch(fetchLatestFeedMessages(0));
    dispatch(fetchUsersByCohort(13));
    //dispatch(fetchResourcesByCohort(13));
  }

  render() {
    var messageBoard = (
      <div className="alz-message-board">
        <h3>Cohort 1 message board</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <div style={{height: "800px", width: "100%"}} >
          <p>ALZ feed goes here once styled :)</p>
        </div>
      </div>
    );
    var resoucesWidgets = (
      <div className="resources-widgets">
        <ProjectsWidget />
        <TeamResourcesWidget />
      </div>
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
                <MembersModule />
                {resoucesWidgets}
              </div>
            </div>
          );
          break;
        default:
          return (
            <p>Small or Medium, show the tab stack</p>
          );
          break;
      }
    })();
    return (
      <div className="action-learning-zone">
        <div className="row">
          <div className="col-sm-12 header">
            <div className="col-sm-8">
              <h1>Action learning zone</h1>
            </div>
            <div className="col-sm-4">
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
  };
};

var linkedALZView = connect(mapALZProps)(ActionLearningZoneView);
export default linkedALZView;
