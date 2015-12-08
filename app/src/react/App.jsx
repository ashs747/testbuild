import React from 'react';
import router from './router';
import store from '../redux/store';
import {loadAuthFromCookie, tokenCheckAction, authTokenCheck} from '../redux/actions/authActions';
import {windowResize} from '../redux/actions/widthActions';
import $ from 'jquery';
import cookie from 'cookie-cutter';
import config from '../localConfig';

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
    let initialized = (Object.keys(store.getState()).length > 0);
    let activeRouteBase = this.getActiveRouteBase();
    let loginPending = initialized ? store.getState().auth.waitingForLogin : false;
    let userLoggedIn = initialized ? store.getState().auth.tokenChecked : false;
    console.log(activeRouteBase);

    if (initialized && !loginPending) {

      if (userLoggedIn) {
        if (activeRouteBase === 'login') {
          router.transitionTo('/'); // Login Success - Go to home page
          return;
        } 
        return; // LoggedIn - Nothing to do
      }

      if (store.getState().auth['access_token']) {
        if (userLoggedIn === false) {
          store.dispatch(tokenCheckAction());
          return;
        }
        
        return;
      }

      var authTokenInCookie = cookie.get('access_token');
      var refreshToken = cookie.get('refresh_token');

      if (!authTokenInCookie && !refreshToken) {
        // TODO: Mop up invalid token in cookie
        if (activeRouteBase !== 'login' && activeRouteBase !== 'on-boarding') {
          router.transitionTo('/login');
          return;
        }
      } else {
        var authTokenData = {};
        authTokenData['access_token'] = authTokenInCookie;
        authTokenData['refresh_token'] = refreshToken;
        /* Throw the tokens from the cookie up to state */
        store.dispatch(loadAuthFromCookie(authTokenData));
        return;
      }
    }
  }

  changeWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    store.dispatch(windowResize(width));
  }
}

export default App;
