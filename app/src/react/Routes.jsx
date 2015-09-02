var React = require('react');
var ReactRouter = require('react-router-ie8');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Main = require('./components/Main.jsx');

var Routes = (
<Route handler={ReactRouter.RouteHandler}>
  <DefaultRoute handler={Main} />
</Route>
);

module.exports = Routes;
