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
    this.getActiveRouteBase = this.getActiveRouteBase.bind(this);
    this.state = {
      Handler: null
    };
  }

  componentWillMount() {
    this.changeWidth();
    $(window).on('resize', () => {
      this.changeWidth();
    });

    if (this.getActiveRouteBase() && this.getActiveRouteBase() !== 'on-boarding') {
      /* we check to see if the router's instantiated and then that its not equal to on-boarding before triggering an auth */
      store.dispatch(cookieCheckedAction());
    }
    
    store.subscribe(this.checkLoggedInState);
    router.run(this.onRouteChange);
  }

  render() {
    this.checkLoggedInState();
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

  getActiveRouteBase() {
    let currentRoutes = router.getCurrentRoutes();
    // grab just the base, ignoring all params and sub-pages
    if (currentRoutes && currentRoutes.length > 0) {
      let arb = currentRoutes[currentRoutes.length - 1].name ? currentRoutes[currentRoutes.length - 1].name.split('/')[0] : 'home';
      return arb;
    }
  }

  checkLoggedInState() {
    var loggedIn = store.getState().user.loggedIn;

    let currentRoutes = router.getCurrentRoutes();
    let activeRouteBase = this.getActiveRouteBase();
    
    if (activeRouteBase !== undefined) {
      if (loggedIn && activeRouteBase === 'login') {
        router.transitionTo('/');
      }
      if (loggedIn === false && (activeRouteBase !== 'on-boarding')) {
        router.transitionTo('login');
      }
    }
  }

  changeWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    store.dispatch(windowResize(width));
  }
}

export default App;
