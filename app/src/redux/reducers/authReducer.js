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

    case COOKIE_CHECKED:
      switch (action.status) {
        case 'RESOLVED':
          return Object.assign({}, state, {
            cookieChecked: true,
            userData: action.payload
          });
        case 'REJECTED':
          return {...state,
            cookieChecked: true,
            userData: null,
            loggedIn: false
          };
        default:
          return state;
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
