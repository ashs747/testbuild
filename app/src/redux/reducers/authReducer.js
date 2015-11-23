import {AUTH, AUTH_SUCCESS, AUTH_FAIL, COOKIE_CHECKED, LOGOUT} from '../actions/authActions';
import cookie from 'cookie-cutter';

const initialState = {
};

export function reducer(state = initialState, action) {

  switch (action.type) {
    case 'INITIAL_DATA_UPDATED':
      var newState = {...state};
      newState.initialUser[action.payload.field] = action.payload.value;
      return newState;
      break;

    case 'FETCHED_INITIAL_USER':
      switch (action.status) {
        case 'RESOLVED':
          let newState = {...state,
            initialUser: {...action.payload}
          };
          return newState;

        case 'REJECTED':
          return {...state};

        default: 
          return {...state};
      }

    case 'LOGOUT':
      return {};
      break;

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

    default:
      return state;
  }
}
