import {AUTH, AUTH_SUCCESS, AUTH_FAIL} from '../actions/authActions';
import cookie from 'cookie-cutter';

var oauth = {};
var loggedIn = false;
(() => {
  //get cookie logic here
  oauth = {
    test: "value"
  };
  loggedIn = true;
})();

const initialState = {
  loggedIn: loggedIn,
  currentUser: null,
  waitingForLogin: false,
  oauth: oauth,
  cookieChecked: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {waitingForLogin: true});
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        waitingForLogin: false,
        oauth: action.oauth
      });
    case AUTH_FAIL:
      return Object.assign({}, state, {waitingForLogin: false});
    default:
      return state;
  }

  function setCookies(data) {
    cookie.set('userId', data.user_id);
    cookie.set('authToken', data.access_token);
    cookie.set('refreshToken', data.refresh_token);
    cookie.set('expiresIn', data.expiresIn);
  }

  function getCookies() {
    cookie.get('');
  }

}
