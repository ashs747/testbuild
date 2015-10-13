import React from 'react';
import MembersModuleWidget from '../modules/members/Widget.jsx';
import _ from 'underscore';
import {connect} from 'react-redux';
import FeedWidget from '../modules/feed/Widget.jsx';
import {fetchLatestFeedMessages} from '../../redux/actions/feedActions';
import {fetchUsersByCohort} from '../../redux/actions/usersActions';
import Store from '../../redux/store';
import TabSack from 'cirrus/react/components/TabStack';
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
    users: state.users,
    title: 'Members'
  };
};

var MembersModule = connect(mapMembersProps)(MembersModuleWidget);

class ActionLearningZoneView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    dispatch(fetchLatestFeedMessages(0));
  }

  render() {
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'sm':
          return <p>Small page</p>;
          break;
        case 'md':
          return <p>Medium Page</p>;
          break;
        case 'lg':
          return <p>Large Page</p>;
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
