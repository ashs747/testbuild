import React from 'react';
import ReactRouter from 'react-router-ie8';
import {connect} from 'react-redux';

import Main from './components/Main.jsx';
import MainView from './views/MainView.jsx';
import LoginView from './views/LoginView.jsx';

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Routes = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={MainView}>
      <DefaultRoute handler={connect((state) => state)(Main)} />
    </DefaultRoute>
    <Route name="home" path="/" handler={MainView}>

    </Route>
    <Route name="login" handler={connect((state) => state)(LoginView)} />
  </Route>
);

export default Routes;
