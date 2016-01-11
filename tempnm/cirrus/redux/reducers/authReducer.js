'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.reducer = reducer;

var _servicesManagersAuthManager = require('../../services/managers/authManager');

var _servicesManagersAuthManager2 = _interopRequireDefault(_servicesManagersAuthManager);

var _actionsAuthActions = require('../actions/authActions');

var initialState = {
  loggedIn: false,
  currentUser: null,
  waitingForLogin: false,
  oauth: {}
};

function reducer(state, action) {
  if (state === undefined) state = initialState;

  switch (action.type) {
    case _actionsAuthActions.AUTH:
      return _Object$assign({}, state, { waitingForLogin: true });
    case _actionsAuthActions.AUTH_SUCCESS:
      return _Object$assign({}, state, {
        loggedIn: true,
        waitingForLogin: false,
        oauth: action.oauth
      });
    case _actionsAuthActions.AUTH_FAIL:
      return _Object$assign({}, state, { waitingForLogin: false });
    default:
      return state;
  }
}