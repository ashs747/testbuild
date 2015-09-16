import authManager from 'cirrus/services/managers/authManager';
import cookie from 'cookie-cutter';

export const AUTH = 'AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const COOKIE_CHECKED = 'COOKIE_CHECKED';
export const LOGOUT = 'LOGOUT';

export function authSuccessAction(oauth) {
  return {type: AUTH_SUCCESS, oauth};
};

export function authFailAction(error) {
  return {type: AUTH_FAIL, error: error};
};

export function authAction(username, password, clientId) {
  return (dispatch, getState) => {
    dispatch({type: AUTH, username, password, clientId});

    authManager.auth(username, password, clientId)
      .then((data) => dispatch(authSuccessAction(data)))
      .catch((error) => dispatch(authFailAction(error)));
  };
}

export function cookieCheckedAction() {
  return {type: COOKIE_CHECKED};
}

export function cookieCheckAction() {
  return (dispatch, getState) => {
    var cData = getCookies();
    if (cData.access_token) {
      authManager.validateToken(cData.user_id, cData.access_token)
        .then((data) => {
          /*eslint-disable camelcase */
          dispatch(authSuccessAction(Object.assign(cData, {scope: null, token_type: "Bearer"})));
          /*eslint-enable camelcase */
          dispatch(cookieCheckedAction());
        })
        .catch((error) => dispatch(cookieCheckedAction()));
    } else {
      dispatch(cookieCheckedAction());
    }
  };
}

export function getCookies() {
  /*eslint-disable camelcase */
  return {
    access_token: cookie.get('authToken'),
    expires_in: cookie.get('expiresIn'),
    refresh_token: cookie.get('refreshToken'),
    user_id: cookie.get('userId')
  };
  /*eslint-enable camelcase */
}

export function logoutAction() {
  return {type: LOGOUT};
}
