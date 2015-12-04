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
    this.getProgData = this.getProgData.bind(this);
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
    console.log('woo!');
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
    var initialized = (Object.keys(store.getState()).length > 0);
    let activeRouteBase = this.getActiveRouteBase();
    console.log('In checkLoginState');

    if (initialized) {
      if (!store.getState().auth.access_token) {
        console.log("/* If redux initialized, and there's no authToken in the appState */");
        var authTokenInCookie = cookie.get('authToken');

        if (!authTokenInCookie) {
          if (activeRouteBase !== 'login' && activeRouteBase !== 'on-boarding') {
            console.log("If there's no authToken in a cookie then chuck them to the login");
            /* If there's no authToken in a cookie then chuck them to the login */
            router.transitionTo('/login');
            return;
          }
        } else {
          console.log("/* we have an authToken in the cookie */");
          var authTokenData = {};
          authTokenData['access_token'] = authTokenInCookie;
          authTokenData['refresh_token'] = cookie.get('refresh_token');
          store.dispatch(loadAuthFromCookie(authTokenData));
          store.dispatch(tokenCheckAction());
        }
      }
/* ***
((()))
      var loggedIn = store.getState().user.loggedIn;
      let loginPending = store.getState().auth.waitingForLogin;
      
      if (loggedIn === true && activeRouteBase === 'login') {
        router.transitionTo('/');
      }

      if (loggedIn === true && loginPending === false && activeRouteBase !== 'login' && !this.initializedProgramme) {
        var cohort = store.getState().user.cohort;
        console.log('auth in state', store.getState().auth);
        this.getProgData(cohort, authTokenInCookie);
      }
      
      console.log('authtoken from cookie:', authTokenInCookie);
      let currentRoutes = router.getCurrentRoutes();

      if (!loggedIn && (loginPending === false) && authTokenInCookie && activeRouteBase !== 'on-boarding') {
        //resume the session, pass the token into state
        console.log('Notloggedin, not pending, authtoken in cookie, not on onboardingURL');
        let req = authTokenCheck(authTokenInCookie)
            .then((suc) => {
              console.log('dispatching checkAction');
              store.dispatch(cookieCheckedAction(authTokenInCookie));
              if (activeRouteBase === 'login') {
                router.transitionTo('/');
              }
              return suc;
            }, (er) => { 
              console.log('nope');
              if (activeRouteBase !== 'login') {
                router.transitionTo('/login');
              }
              return er;
            });

        let authCheckActionObj = {
          type: 'COOKIE_CHECKED',
          payload: req
        };
        console.log('authCheckActionObj', authCheckActionObj);
        store.dispatch(authCheckActionObj);
        // if !expired - try dispatchCheckAuthToken.then(getUserData)
        // if expired -> router.transitionTo login
        return true;
      }

      if (activeRouteBase !== undefined) {
        if (loggedIn === false && (activeRouteBase !== 'on-boarding')) {
          router.transitionTo('login');
        }
      }
***/
    
    } else {
      console.log('store yet to be initialized');
    }
  }

  changeWidth() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    store.dispatch(windowResize(width));
  }
}

export default App;
