import {AUTH, AUTH_SUCCESS, AUTH_FAIL, COOKIE_CHECKED, LOGOUT} from '../actions/authActions';
import cookie from 'cookie-cutter';

const initialState = {
  loggedIn: false,
  currentUser: null,
  waitingForLogin: false,
  oauth: {},
  cookieChecked: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {waitingForLogin: true});
    case AUTH_SUCCESS:
      setCookies(action.oauth);
      return Object.assign({}, state, {
        loggedIn: true,
        waitingForLogin: false,
        oauth: action.oauth,
        currentUser: parseInt(action.oauth.user_id)
      });
    case AUTH_FAIL:
      return Object.assign({}, state, {waitingForLogin: false});
    case COOKIE_CHECKED:
      return Object.assign({}, state, {
        cookieChecked: true
      });
    case LOGOUT:
      eraseCookies();
      return Object.assign({}, state, {
        loggedIn: false,
        currentUser: null,
        oauth: {}
      });
    default:
      return state;
  }

  function setCookies(data) {
    cookie.set('userId', data.user_id);
    cookie.set('authToken', data.access_token);
    cookie.set('refreshToken', data.refresh_token);
    cookie.set('expiresIn', data.expiresIn);
  }

  function eraseCookies() {
    cookie.set('userId', '', {
      expires: new Date(0)
    });
    cookie.set('authToken', '', {
      expires: new Date(0)
    });
    cookie.set('refreshToken', '', {
      expires: new Date(0)
    });
    cookie.set('expiresIn', '', {
      expires: new Date(0)
    });
  }
}
