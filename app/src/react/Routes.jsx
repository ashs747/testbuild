import React from 'react';
import ReactRouter from 'react-router-ie8';
import {connect, bindActionCreators} from 'react-redux';

import MainView from './views/MainView.jsx';
import LoginView from './views/LoginView.jsx';
import LearningJourneyView from './views/LearningJourneyView.jsx';
import ActionLearningZone from './views/ActionLearningZoneView.jsx';
import ModuleView from './views/ModuleView.jsx';

/* Testing */
import CommentList from './modules/feed/components/CommentList.jsx';
import {deleteMessageFromFeed, setEditable, updateMessage} from '../redux/actions/feedActions.js';

function mapCommentListProps(state) {
  return {
    feedID: 'testTwo',
    comments: state.feeds.testTwo.messages[0].comments,
    showComments: true
  };
};

var WrappedCommentList = connect(mapCommentListProps)(CommentList);
//Deleteme

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Routes = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={connect((state) => state)(MainView)}>
      <DefaultRoute handler={connect((state) => state)(LearningJourneyView)} />
    </DefaultRoute>
    <Route name="home" path="/" handler={connect((state) => state)(MainView)}>
      <Route name="personal-learning-journey" handler={connect((state) => state)(LearningJourneyView)} />
      <Route name="module" path="module/:module" handler={connect((state) => state)(ModuleView)} />
      <Route name="action-learning-zone" handler={connect((state) => state.auth)(ActionLearningZone)} />
      </Route>
    <Route name="login" handler={connect((state) => state)(LoginView)} />
    <Route name="messages" handler={WrappedCommentList} />
  </Route>
);

export default Routes;
