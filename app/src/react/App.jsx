import React from 'react';
import router from './router';
import store from '../redux/store';
import {cookieCheckAction} from '../redux/actions/authActions';
import {windowResize} from '../redux/actions/widthActions';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.onRouteChange = this.onRouteChange.bind(this);
    this.state = {
      Handler: null
    };
  }

  componentWillMount() {
    this.changeWidth();
    $(window).on('resize', () => {
      this.changeWidth();
    });
    store.dispatch(cookieCheckAction());
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
    let currentRoutes = router.getCurrentRoutes();
    let activeRouteName;

    if (currentRoutes && currentRoutes.length > 0) {
      activeRouteName = currentRoutes[currentRoutes.length - 1].name;
    }

    if (store.getState().auth.cookieChecked) {
      if (!store.getState().auth.loggedIn) {
        router.transitionTo('login');
      } else if (store.getState().auth.loggedIn && activeRouteName == 'login') {
        router.transitionTo('/');
      }
    }
  }

  changeWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    store.dispatch(windowResize(width));
  }
}

export default App;
