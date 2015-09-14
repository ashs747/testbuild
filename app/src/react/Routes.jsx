import React from 'react';
import ReactRouter from 'react-router-ie8';
import {connect} from 'react-redux';

import Main from './components/Main.jsx';
import PersonalLearningJourney from './views/PersonalLearningJourney.jsx';

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Routes = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={connect((state) => state.auth)(Main)} />
    <Route name="home" path="/" handler={connect((state) => state.auth)(Main)}>
      <Route name="personal-learning-journey" path="/personal-learning-journey" handler={connect((state) => state)(PersonalLearningJourney)} />
    </Route>
  </Route>
);

export default Routes;
