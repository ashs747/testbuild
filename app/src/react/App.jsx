var React = require('react');
var Router = require('react-router-ie8');
var newsModel = require('../models/newsModel');
var Test = require('cirrus').react.Test;

var RouteHandler = Router.RouteHandler;

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Skeleton Application</h1>
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/news">News</a></li>
        </ul>
        <Test />
        <RouteHandler />
      </div>
    );
  }
}

module.exports = App;
