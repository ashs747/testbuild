import React from 'react';
import ReactRouter from 'react-router-ie8';
import {connect} from 'react-redux';

import Main from './components/Main.jsx';

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Routes = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={connect((state) => state.auth)(Main)} />
  </Route>
);

export default Routes;
