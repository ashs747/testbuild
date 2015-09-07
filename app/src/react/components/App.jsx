import React from 'react';
import Routes from '../Routes.jsx';
import Router from 'react-router-ie8';

class App extends React.Component {
  constructor() {
    super();
    this.onRouteChange = this.onRouteChange.bind(this);
    this.state = {
      Handler: null
    };
  }

  componentWillMount() {
    Router.run(Routes, Router.HashLocation, this.onRouteChange);
  }

  render() {
    if (!this.state.Handler) {
      return <div />;
    }
    return (
      <div>
        <this.state.Handler />
      </div>
    );
  }

  onRouteChange(Handler, state) {
    this.setState({
      Handler: Handler
    });
  }
}

export default App;
