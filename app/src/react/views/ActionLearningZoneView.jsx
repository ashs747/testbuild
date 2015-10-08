import React from 'react';
import MembersModuleWidget from '../modules/members/Widget.jsx';
import _ from 'underscore';
import {connect} from 'react-redux';
import FeedWidget from '../modules/feed/Widget.jsx';
import {fetchLatestFeedMessages} from '../../redux/actions/feedActions';
import {fetchUsersByCohort} from '../../redux/actions/usersActions';
import Store from '../../redux/store';
var dispatch = Store.dispatch;

function mapCommentListProps(state) {
  return {
    attachments: state.feeds.testTwo ? state.feeds.testTwo.files : [],
    feedID: 'testTwo',
    messages: state.feeds.testTwo ? state.feeds.testTwo.messages : [],
    showComments: true
  };
};
var ALZFeed = connect(mapCommentListProps)(FeedWidget);

function mapMembersProps(state) {
  return {
    users: state.users,
    title: 'Members'
  };
};
var MembersModule = connect(mapMembersProps)(MembersModuleWidget);

export default class ActionLearningZoneView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    dispatch(fetchLatestFeedMessages(0));
  }

  render() {
    return (
      <div className="action-learning-zone">
        <ALZFeed />
        <MembersModule />
      </div>
    );
  }
}
