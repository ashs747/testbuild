import React from 'react';
import ReactRouter from 'react-router-ie8';
import {connect} from 'react-redux';

import MainView from './views/MainView.jsx';
import LoginView from './views/LoginView.jsx';
import LearningJourneyView from './views/LearningJourneyView.jsx';

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Routes = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={connect((state) => state)(MainView)}>
      <DefaultRoute handler={connect((state) => state)(LearningJourneyView)} />
    </DefaultRoute>
    <Route name="home" path="/" handler={connect((state) => state.auth)(MainView)}>
      <Route name="personal-learning-journey" handler={connect((state) => state)(LearningJourneyView)} />
    </Route>
    <Route name="login" handler={connect((state) => state)(LoginView)} />
  </Route>
);

export default Routes;
