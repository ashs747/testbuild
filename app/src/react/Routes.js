var React = require('react');
var Router = require('react-router-ie8');

var NotFound = require('./NotFound');
var App = require('./App');
var Home = require('./Home');
var News = require('./News');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

export default (
  <Route handler={App}>
    <NotFoundRoute handler={NotFound} />
    <DefaultRoute handler={Home}/>

    <Route name="news" handler={News}/>
  </Route>
);
