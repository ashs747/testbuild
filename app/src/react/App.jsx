var React = require('react');
var Router = require('react-router-ie8');
var newsModel = require('../models/newsModel');

newsModel.getPosts();

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
        <RouteHandler />
      </div>
    );
  }
}

module.exports = App;
