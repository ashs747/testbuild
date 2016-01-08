import React from 'react';
import router from './router';
import store from '../redux/store';
import {refreshTokenAction, loadAuthFromCookie, tokenCheckAction, authTokenCheck} from '../redux/actions/authActions';
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

    let state = store.getState();
    let initialized = (Object.keys(state).length > 0);
    let activeRouteBase = this.getActiveRouteBase();
    let loginPending = initialized ? state.auth.waitingForLogin : false || this.waitForLogin;
    let userLoggedIn = initialized ? state.auth.tokenChecked : false;
    let stRefreshToken = initialized ? state.auth.refresh_token : false;
    let stAccToken = initialized ? state.auth.access_token : false;

    if (stAccToken && state.auth.waitingForLogin === false) {
      if (!userLoggedIn) {
        store.dispatch(tokenCheckAction());
        return;
      }
    }

    if (initialized && !loginPending) {
      if (!stAccToken && stRefreshToken) {
        if (this.waitForLogin !== true) {
          this.waitForLogin = true;
          store.dispatch(refreshTokenAction(stRefreshToken));
          return;
        }
      }

      if (userLoggedIn) {
        this.waitForLogin = false;
        if (activeRouteBase === 'login') {
          router.transitionTo('/'); // Login Success - Go to home page
          return;
        }
        return; // LoggedIn - Nothing to do
      }

      if (!stAccToken) {
        var authTokenInCookie = cookie.get('access_token');
        var refreshToken = cookie.get('refresh_token');

        if (!authTokenInCookie && !refreshToken) {
          // TODO: Mop up invalid token in cookie
          console.log('router.getCurrentRoutes(); earlier than redirect', router.getCurrentRoutes());
          if (router.getCurrentRoutes()) {    
            if (activeRouteBase !== 'login' && activeRouteBase !== 'on-boarding') {
              console.log('activeRouteBase at redirect', activeRouteBase);
              console.log('router.getCurrentRoutes(); at redirect',router.getCurrentRoutes());
              router.transitionTo('/login');
              return;
            }
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
  }

  changeWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    store.dispatch(windowResize(width));
  }
}

export default App;
