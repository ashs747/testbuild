import React from 'react';
import router from './router';
import store from '../redux/store';

class App extends React.Component {
  constructor() {
    super();
    this.onRouteChange = this.onRouteChange.bind(this);
    this.state = {
      Handler: null
    };
  }

  componentWillMount() {
    router.run(this.onRouteChange);
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
