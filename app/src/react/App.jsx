import React from 'react';
import router from './router';
import store from '../redux/store';
import {cookieCheckedAction} from '../redux/actions/authActions';
import {windowResize} from '../redux/actions/widthActions';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.onRouteChange = this.onRouteChange.bind(this);
    this.checkLoggedInState = this.checkLoggedInState.bind(this);
    this.state = {
      Handler: null
    };
  }

  componentWillMount() {
    this.changeWidth();
    $(window).on('resize', () => {
      this.changeWidth();
    });
    store.dispatch(cookieCheckedAction());
    store.subscribe(this.checkLoggedInState);
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
    this.checkLoggedInState();
    this.setState({
      Handler: Handler
    });
  }

  checkLoggedInState() {
    var loggedIn = store.getState().user.loggedIn;
    let currentRoutes = router.getCurrentRoutes();
    let activeRouteName;

    if (currentRoutes && currentRoutes.length > 0) {
      activeRouteName = currentRoutes[currentRoutes.length - 1].name;
    }

    if (loggedIn && activeRouteName == 'login') {
      router.transitionTo('/');
    }
    
    if (!loggedIn) {
      router.transitionTo('login');
    }
  }

  changeWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    store.dispatch(windowResize(width));
  }
}

export default App;
