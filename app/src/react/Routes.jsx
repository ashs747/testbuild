var React = require('react');
var Router = require('react-router-ie8');

var NotFound = require('./NotFound.jsx');
var App = require('./App.jsx');
var Home = require('./Home.jsx');
var News = require('./News.jsx');

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
