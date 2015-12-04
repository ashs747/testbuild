import {AUTH, AUTH_SUCCESS, AUTH_FAIL, COOKIE_CHECKED, LOGOUT} from '../actions/authActions';
import cookie from 'cookie-cutter';

const initialState = {
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGOUT':
      return {};
      break;

    case 'COOKIE_CHECKED':
      if (action.status === 'REJECTED') {
        //return {};
      }
      return state;
      break;

    case AUTH:
      console.log(action);
      switch (action.status) {
        case 'RESOLVED':
          console.log('woo?');
          var ns = {
            ...state,
            ...action.payload,
            waitingForLogin: false
          };
          console.log('ns', ns);
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
