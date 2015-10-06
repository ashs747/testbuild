import {AUTH, AUTH_SUCCESS, AUTH_FAIL, COOKIE_CHECKED, LOGOUT} from '../actions/authActions';
import cookie from 'cookie-cutter';

const initialState = {
  loggedIn: false,
  currentUser: null,
  waitingForLogin: false,
  oauth: {},
  cookieChecked: false,
  user: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {

    case AUTH:
      console.log('auth', action);
      switch (action.status) {
        case 'RESOLVED':
          setCookies(action.payload); // FIXME: Side-effect (refactor this out... bit of an antiPattern Here)
          return {
            ...state,
            loggedIn: true,
            waitingForLogin: false,
            oauth: action.payload,
            currentUser: parseInt(action.payload.user_id),
            user: action.payload.user
          };

        case 'REJECTED':
          return {
            ...state, 
            waitingForLogin: false
          };

        default:
          return {
            ...state,
            waitingForLogin: true
          };
      }

    case COOKIE_CHECKED:
      return Object.assign({}, state, {
        cookieChecked: true
      });

    case LOGOUT:
      eraseCookies(); // FIXME: Side-effect
      return Object.assign({}, state, {
        loggedIn: false,
        currentUser: null,
        oauth: {},
        user: null
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
