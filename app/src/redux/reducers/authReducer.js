import {AUTH, AUTH_SUCCESS, AUTH_FAIL, COOKIE_CHECKED, LOGOUT} from '../actions/authActions';
import cookie from 'cookie-cutter';

const initialState = {
  waitingForLogin: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGOUT':
      return {};
      break;

    case 'COOKIE_AUTH_LOADED':
      var cookieData = action.payload;
      return {
        ...state,
        ...cookieData,
        tokenChecked: false,
        waitingForLogin: false
      };

    case 'TOKEN_CHECKED':
      switch (action.status) {
        case 'REJECTED':
          return {
            waitingForLogin: false,
            tokenChecked: false
          };

        case 'RESOLVED':
          return {
            ...state,
            waitingForLogin: false,
            tokenChecked: true
          };

        default:
          return {
            ...state,
            waitingForLogin: true
          };
      }
      break;

    case AUTH:
      switch (action.status) {
        case 'RESOLVED':
          var ns = {
            ...state,
            ...action.payload,
            waitingForLogin: false
          };
          return ns;

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
          return {...state,
            waitingForLogin: true
          };
      }

    default:
      return state;
  }
}
