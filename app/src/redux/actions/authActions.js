import authManager from 'cirrus/services/managers/authManager';
import userManager from 'cirrus/services/managers/userManager';
import {getOAuthToken, getOAuthTokenFromOneUseKey, getOAuthTokenFromRefreshToken, getUserData, setCookieCredentials} from '../services/authService';
import {updateUserPassword, sendRecoverPasswordEmail} from '../services/userService';
import cookie from 'cookie-cutter';
import Store from '../store.js';

import config from '../../localConfig';
import {getPLJData} from '../../redux/actions/learningJourneyActions';
import {gotUsersCohort} from '../../redux/actions/cohortActions';
import {gotToolkits} from '../../redux/actions/contentActions';
import {gotProgramme} from '../../redux/actions/programmeActions';
import {pushPath} from 'redux-simple-router';

export const AUTH = 'AUTH';
export const TOKEN_CHECKED = 'TOKEN_CHECKED';
export const LOGOUT = 'LOGOUT';
export const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
export const RECOVER_PASSWORD_FINISHED = 'RECOVER_PASSWORD_FINISHED';
export const RECOVER_PASSWORD_EMAIL = 'RECOVER_PASSWORD_EMAIL';
export const RECOVER_PASSWORD_EMAIL_HIDE = 'RECOVER_PASSWORD_EMAIL_HIDE';

export function fetchInitialUserData(key) {
  
  let req = getOAuthTokenFromOneUseKey(key).then((response) => {
    Store.dispatch({type: AUTH, payload: response});
    return getUserData(response.access_token);
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
  .then(saveToCookie)
  .then(res => {
      getUserData(res.access_token).then(res=>{
        Store.dispatch(pushPath('/#/'));
      });
     return res;
   }, res => {
    return res;
   });

  return {
    type: AUTH,
    payload: req
  };
};

export function exchangeOTUK(key) {
  let req = getOAuthTokenFromOneUseKey(key);
  return {
    type: AUTH,
    payload: req
  };
}

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
    Store.dispatch(gotProgramme(userData.programme));

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

export function updatePassword(password, confirmPassword) {
  var payload = updateUserPassword(password, confirmPassword);
  return {
    type: RECOVER_PASSWORD,
    payload
  };
}

export function finishedRecoverPassword() {
  return {
    type: RECOVER_PASSWORD_FINISHED,
    payload: {}
  };
}

export function recoverPassword(email) {
  var payload = sendRecoverPasswordEmail(email);
  return {
    type: RECOVER_PASSWORD_EMAIL,
    payload
  };
}

export function hideRecoverPassword() {
  return {
    type: RECOVER_PASSWORD_EMAIL_HIDE,
    payload: {}
  };
}
