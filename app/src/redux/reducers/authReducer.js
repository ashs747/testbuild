import {AUTH, AUTH_SUCCESS, AUTH_FAIL, COOKIE_CHECKED, LOGOUT, RECOVER_PASSWORD, RECOVER_PASSWORD_FINISHED, RECOVER_PASSWORD_EMAIL, RECOVER_PASSWORD_EMAIL_HIDE} from '../actions/authActions';
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

    case 'AUTH':
      console.log(action);
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
            waitingForLogin: false,
            error: {
              message: action.payload.message
            }
          };

        default:
          return {
            waitingForLogin: true
          };
      }

    case RECOVER_PASSWORD:
      switch (action.status) {
        case 'RESOLVED':
          return {
            ...state,
            recoverPasswordSuccess: true,
            waitingForRecoverPassword: false
          };

        case 'REJECTED':
          return {
            ...state,
            recoverPasswordSuccess: false,
            waitingForRecoverPassword: false,
            authError: {
              code: action.payload.status,
              message: action.payload.message
            }
          };

        default:
          return {
            waitingForRecoverPassword: true
          };
      }

    case RECOVER_PASSWORD_FINISHED:
      return {
        ...state,
        recoverPasswordSuccess: false,
        waitingForRecoverPassword: false,
        authError: null
      };

    case RECOVER_PASSWORD_EMAIL:
      switch (action.status) {
        case 'RESOLVED':
          return {
            ...state,
            waitingForLogin: false,
            sentRecoveryEmail: true
          };

        case 'REJECTED':
          return {
            ...state,
            waitingForLogin: false,
            error: {
              message: action.payload.message
            }
          };

        default:
          return {
            waitingForLogin: true
          };
      }

    case RECOVER_PASSWORD_EMAIL_HIDE:
      return {
        ...state,
        sentRecoveryEmail: false
      };

    default:
      return state;
  }
}
