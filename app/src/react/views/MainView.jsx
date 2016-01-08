import React from 'react';
import {RouteHandler} from 'react-router';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import store from '../../redux/store.js';
import cookie from 'cookie-cutter';
import router from 'react-router';
import { pushPath } from 'redux-simple-router';

class MainView extends React.Component {

  constructor() {
    super();
    this.checkLoggedInState = this.checkLoggedInState.bind(this);
    this.getActiveRouteBase = this.getActiveRouteBase.bind(this);
  }

  render() {
    let loggedIn = this.props.user.loggedIn;
    
    return (
      <div className="main">
        <div className={`${(this.props.width.profile !== "sm") ? "container-fluid" : ""}`}>
          <Header display={loggedIn} dispatch={this.props.dispatch}/>
          {this.props.children}
          <Footer display={loggedIn} />
        </div>
      </div>
    );
  }

  getActiveRouteBase() {
    return store.getState().routing.path;
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
        this.props.dispatch(tokenCheckAction());
        return;
      }
    }

    if (initialized && !loginPending) {
      if (!stAccToken && stRefreshToken) {
        if (this.waitForLogin !== true) {
          this.waitForLogin = true;
          this.props.dispatch(refreshTokenAction(stRefreshToken));
          return;
        }
      }

      if (userLoggedIn) {
        this.waitForLogin = false;
        if (activeRouteBase.indexOf('login')) {
          this.props.dispatch(pushPath('/#/'));; // Login Success - Go to home page
          return;
        }
        return; // LoggedIn - Nothing to do
      }

      if (!stAccToken) {
        var authTokenInCookie = cookie.get('access_token');
        var refreshToken = cookie.get('refresh_token');

        if (!authTokenInCookie && !refreshToken) {
          // TODO: Mop up invalid token in cookie
          console.log(this.getActiveRouteBase());
          if (this.getActiveRouteBase()) {    
            if (activeRouteBase.indexOf('login') === -1 && activeRouteBase.indexOf('on-boarding') === -1) {
              this.props.dispatch(pushPath('/#/login'));
              return;
            }
          }
        } else {
          var authTokenData = {};
          authTokenData['access_token'] = authTokenInCookie;
          authTokenData['refresh_token'] = refreshToken;
          /* Throw the tokens from the cookie up to state */
          this.props.dispatch(loadAuthFromCookie(authTokenData));
          return;
        }
      }
    }
  }
}

export default MainView;
