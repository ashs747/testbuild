import authManager from 'cirrus/services/managers/authManager';
import userManager from 'cirrus/services/managers/userManager';
import cookie from 'cookie-cutter';

export const AUTH = 'AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const COOKIE_CHECKED = 'COOKIE_CHECKED';
export const LOGOUT = 'LOGOUT';

export function authAction(username, password, clientId) {
  let req = authManager.auth(username, password, clientId);
  console.log('req', req);
  console.log(req instanceof Promise);
  return {
    type: AUTH,
    payload: req
  };
}

export function cookieCheckedAction() {
  return {type: COOKIE_CHECKED};
}

export function cookieCheckAction() {
  // FIXME: Rewire to take advantage of promise middleware
  return (dispatch, getState) => {
    var cData = getCookies();
    if (cData.access_token) {
      authManager.validateToken(cData.user_id, cData.access_token)
        .then((data) => {
          userManager.getUserById(cData.user_id).then((user) => {
            /*eslint-disable camelcase */
            dispatch({
              type: AUTH,
              status: "RESOLVED",
              payload: {
                ...cData,
                scope: null,
                token_type: "Bearer",
                user: user
              }
            });
            /*eslint-enable camelcase */
            dispatch(cookieCheckedAction());
          });
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
    user_id: parseInt(cookie.get('userId'))
  };
  /*eslint-enable camelcase */
}

export function logoutAction() {
  return {type: LOGOUT};
}
