import authManager from 'cirrus/services/managers/authManager';
import userManager from 'cirrus/services/managers/userManager';
import {getOAuthToken, getUserData} from '../services/authService';
import cookie from 'cookie-cutter';
import store from '../store.js';
export const AUTH = 'AUTH';
export const COOKIE_CHECKED = 'COOKIE_CHECKED';
export const LOGOUT = 'LOGOUT';

export function authAction(username, password) {
  let req = getOAuthToken(username, password).then((response) => {
    let res = response.body;
    cookie.set('authToken', res.access_token, { expires: new Date() + res.expires_in});
    cookie.set('refresh_token', res.refresh_token);
    store.dispatch(cookieCheckedAction());
    return response;
  });

  return {
    type: AUTH,
    payload: req
  };
};

export function cookieCheckedAction() {
  var req = getUserData();
  return { 
    type: COOKIE_CHECKED,
    payload: req
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
  cookie.set('expires_in', '', {
    expires: 0
  });
  return {type: LOGOUT};
}
