import {AUTH, AUTH_SUCCESS, AUTH_FAIL} from '../actions/authActions';

const initialState = {
  loggedIn: false,
  currentUser: null,
  waitingForLogin: false,
  oauth: {}
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
}
