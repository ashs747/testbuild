import {AUTH, AUTH_SUCCESS, AUTH_FAIL, COOKIE_CHECKED, LOGOUT} from '../actions/authActions';
import cookie from 'cookie-cutter';

const initialState = {
  loggedIn: false,
  currentUser: null,
  waitingForLogin: false,
  oauth: {},
  cookieChecked: false,
  user: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {

    case AUTH:
      switch (action.status) {
        case 'RESOLVED':
          return {
            ...state,
            loggedIn: true,
            waitingForLogin: false,
            oauth: action.payload.body
          };
        case 'REJECTED':
          return {
            ...state,
            waitingForLogin: false,
            error: {
              code: action.payload.status,
              message: action.payload.message
            }
          };

        default:
          return {
            ...state,
            waitingForLogin: true
          };
      }

    case LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
        currentUser: null,
        oauth: {},
        user: null
      });
    default:
      return state;
  }
}
