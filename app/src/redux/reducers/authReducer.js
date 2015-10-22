import {AUTH, AUTH_SUCCESS, AUTH_FAIL, COOKIE_CHECKED, LOGOUT} from '../actions/authActions';
import cookie from 'cookie-cutter';

const initialState = {
};

export function reducer(state = initialState, action) {
  switch (action.type) {

    case 'COOKIE_CHECKED':
      if (action.status === 'REJECTED') {
        return {};
      }
      return state;
      break;

    case AUTH:
      switch (action.status) {
        case 'RESOLVED':
          return {
            ...state,
            ...action.payload.body,
            waitingForLogin: false
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
          return {...state,
            waitingForLogin: true
          };
      }

    case LOGOUT:
      return {};
      break;
    
    default:
      return state;
  }
}
