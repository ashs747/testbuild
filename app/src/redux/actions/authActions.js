import authManager from 'cirrus/services/managers/authManager';
import userManager from 'cirrus/services/managers/userManager';
import {getOAuthToken, getOAuthTokenFromRefreshToken, getUserData, setCookieCredentials} from '../services/authService';
import cookie from 'cookie-cutter';
import Store from '../store.js';

import config from '../../localConfig';
import {getPLJData} from '../../redux/actions/learningJourneyActions';
import {gotUsersCohort} from '../../redux/actions/cohortActions';
import {gotToolkits} from '../../redux/actions/contentActions';

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

function saveToCookie(res) {
  /* Expiry date is a new DateObject, set to 'Today in Milliseconds add the expiry time in seconds' */
  let expiryDate = new Date(new Date().valueOf() + res.expires_in * 1000);
  cookie.set('access_token', res.access_token, {expires: expiryDate});
  cookie.set('refresh_token', res.refresh_token);
  return res;
};

function updateStateFromNewToken(res) {
  Store.dispatch(tokenCheckAction(res.access_token));
  return res;
}

export function refreshTokenAction(token) {
  // dispatch a call to the oAuth endpoint to exchange the refresh token for an access_token
  let req = getOAuthTokenFromRefreshToken(token)
    .then(saveToCookie);

  return {
    type: AUTH,
    payload: req
  };
}

export function authAction(username, password) {
  let req = getOAuthToken(username, password)
  .then(saveToCookie);

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
  return getUserData().then((userData) => {
    Store.dispatch(getPLJData());
    Store.dispatch(gotUsersCohort(userData.cohort));
    Store.dispatch(gotToolkits(userData.toolkits));
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
