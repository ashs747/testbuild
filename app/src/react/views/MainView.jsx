import React from 'react';
import HeaderElem from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import HomeView from './HomeView.jsx';
import store from '../../redux/store.js';
import cookie from 'cookie-cutter';
import router from 'react-router';
/* Action Creators */
import { pushPath } from 'redux-simple-router';
import {refreshTokenAction, loadAuthFromCookie, tokenCheckAction, authTokenCheck} from '../../redux/actions/authActions';

class MainView extends React.Component {

  constructor() {
    super();
    this.waitForLogin = false;
    this.checkLoggedInState = this.checkLoggedInState.bind(this);
    this.getActiveRouteBase = this.getActiveRouteBase.bind(this);
  }

  componentWillReceiveProps(props) {
    if ((this.props.auth.access_token !== props.auth.access_token) || this.props.auth.tokenChecked === false) {
      this.checkLoggedInState();
    }
  }

  componentWillMount(props) {
    this.checkLoggedInState();
  }

  render() {
    let loggedIn = this.props.user.loggedIn;
    
    return (
      <div className="main">
        <div className={`${(this.props.width.profile !== "sm") ? "container-fluid" : ""}`}>
          <HeaderElem display={loggedIn} dispatch={this.props.dispatch}/>
          {this.props.children || <HomeView />}
          <Footer display={loggedIn} />
        </div>
      </div>
    );
  }

  getActiveRouteBase() {
    return this.props.routing.path;
  }

  checkLoggedInState() {
    
    let activeRouteBase = this.getActiveRouteBase();
    let loginPending = (this.props.auth.waitingForLogin) ? true : this.waitForLogin;
    let userLoggedIn = this.props.auth.tokenChecked;
    let stRefreshToken = this.props.auth.refresh_token || false;
    let stAccToken = this.props.auth.access_token || false;

    if (stAccToken && loginPending === false) {
      if (!userLoggedIn) {
        this.props.dispatch(tokenCheckAction());
        return;
      }
    }

    if (!loginPending) {
      if (!stAccToken && stRefreshToken) {
        if (this.waitForLogin !== true) {
          this.waitForLogin = true;
          this.props.dispatch(refreshTokenAction(stRefreshToken));
          return;
        }
      }

      if (userLoggedIn) {
        this.waitForLogin = false;
        if (activeRouteBase.indexOf('login') > -1) {
          this.props.dispatch(pushPath('/'));; // Login Success - Go to home page
          return;
        }
        return; // LoggedIn - Nothing to do
      }

      if (!stAccToken) {
        var authTokenInCookie = cookie.get('access_token');
        var refreshToken = cookie.get('refresh_token');

        if (!authTokenInCookie && !refreshToken) {
          // TODO: Mop up invalid token in cookie
          this.props.dispatch(pushPath('/login'));
          return;
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
