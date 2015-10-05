import React from 'react';
import MembersModuleWidget from '../modules/members/Widget.jsx';
import _ from 'underscore';
import {connect} from 'react-redux';
import {FeedWidget} from '../modules/feed/Widget.jsx';
import {fetchUsersByCohort} from '../../redux/actions/usersActions';

function mapCommentListProps(state) {
  return {
    feedID: 'testTwo',
    messages: state.feeds.testTwo.messages,
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

class ActionLearningZoneView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    let label = _.findWhere(this.props.user.labels, {context: "soj-cohort"});
    if (label) {
      this.getCohortFromLabelId(label.id);
    }
  }

  render() {
    return (
      <div className="action-learning-zone">
        {ALZFeed}
        {MembersModule}
      </div>
    );
  }
}

export default ActionLearningZoneView;
