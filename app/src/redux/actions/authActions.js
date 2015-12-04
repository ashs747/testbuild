import authManager from 'cirrus/services/managers/authManager';
import userManager from 'cirrus/services/managers/userManager';
import {getOAuthToken, getUserData, setCookieCredentials} from '../services/authService';
import cookie from 'cookie-cutter';
import Store from '../store.js';

import config from '../../localConfig';
import {getPLJData} from '../../redux/actions/learningJourneyActions';
import {gotUsersCohort} from '../../redux/actions/cohortActions';

export const AUTH = 'AUTH';
export const TOKEN_CHECKED = 'TOKEN_CHECKED';
export const LOGOUT = 'LOGOUT';

export function fetchInitialUserData(key) {
  let authByOneTimeKey = (key) => {
    return Promise.resolve('MGYxNmEzZjJhZTNjYmU1NjkzOTE0OGI0MGQxNDZhYzdkYjJlMDM3YjcyNzc5Nzg0YTQ1ZWZmMzA3MWU3NDA3Mg'); //TODO: OneTimeKeyExchange Service
  };
  let req = authByOneTimeKey(key).then((token) => {
    setCookieCredentials(token);
    return getUserData();
  });

  return {
    type: TOKEN_CHECKED,
    payload: req
  };
};

export function authAction(username, password) {
  let req = getOAuthToken(username, password).then((response) => {
    let res = response;
    /* Expiry date is a new DateObject, set to 'Today in Milliseconds add the expiry time in seconds' */
    let expiryDate = new Date(new Date().valueOf() + res.expires_in * 1000);
    cookie.set('access_token', res.access_token, {expires: expiryDate});
    cookie.set('refresh_token', res.refresh_token);
    Store.dispatch(authTokenCheck());
    return response;
  });

  return {
    type: AUTH,
    payload: req
  };
};

export function loadAuthFromCookie(cookieData) {
  return {
    type: 'COOKIE_AUTH_LOADED',
    payload: cookieData
  };
}

export function authTokenCheck() {
  console.log('authTokenChecking for');
  return getUserData().then((userData) => {
    console.log('meanwhile... in the authtoken check success', userData);
    Store.dispatch(getPLJData());
    Store.dispatch(gotUsersCohort(userData.cohort));
    return userData;
  }, (userData) => {
    return userData;
  });
}

export function tokenCheckAction() {
  var out = authTokenCheck();
  return {
    type: 'TOKEN_CHECKED',
    payload: out
  };
}

export function getCookies() {
  /*eslint-disable camelcase */
  return {
    access_token: cookie.get('authToken'),
    expires_in: cookie.get('expiresIn'),
    refresh_token: cookie.get('refreshToken'),
    user_id: parseInt(cookie.get('userId'))
  };
  /*eslint-enable camelcase */
}

export function logoutAction() {
  cookie.set('authToken', '', {
    expires: 0
  });
  cookie.set('refresh_token', '', {
    expires: 0
  });

  return {type: 'LOGOUT', payload: ''};
}
