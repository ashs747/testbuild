import React from 'react';
import ReactRouter from 'react-router-ie8';
import {connect} from 'react-redux';

import Main from './components/Main.jsx';
import MainView from './views/MainView.jsx';
import PersonalLearningJourney from './views/PersonalLearningJourney.jsx';

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Routes = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={MainView}>
      <DefaultRoute handler={connect((state) => state)(PersonalLearningJourney)} />
    </DefaultRoute>
    <Route name="home" path="/" handler={MainView}>
      <Route name="personal-learning-journey" handler={connect((state) => state)(PersonalLearningJourney)} />
    </Route>
  </Route>
);

export default Routes;
