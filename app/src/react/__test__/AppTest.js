var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var App = require('../App.jsx');

App.__set__('RouteHandler', class App extends React.Component {
  render() { return <div />; }
});

describe('App component', function() {
  var domNode = null;

  before('render and locate element', function() {
    TestUtils.renderIntoDocument(<App />)
  });

  it('Tets', function() {

  });
});
