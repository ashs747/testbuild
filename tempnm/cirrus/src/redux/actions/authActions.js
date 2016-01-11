import authManager from '../../services/managers/authManager';

export const AUTH = 'AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

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
