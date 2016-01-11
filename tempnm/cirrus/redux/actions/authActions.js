'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.authSuccessAction = authSuccessAction;
exports.authFailAction = authFailAction;
exports.authAction = authAction;

var _servicesManagersAuthManager = require('../../services/managers/authManager');

var _servicesManagersAuthManager2 = _interopRequireDefault(_servicesManagersAuthManager);

var AUTH = 'AUTH';
exports.AUTH = AUTH;
var AUTH_SUCCESS = 'AUTH_SUCCESS';
exports.AUTH_SUCCESS = AUTH_SUCCESS;
var AUTH_FAIL = 'AUTH_FAIL';

exports.AUTH_FAIL = AUTH_FAIL;

function authSuccessAction(oauth) {
  return { type: AUTH_SUCCESS, oauth: oauth };
}

;

function authFailAction(error) {
  return { type: AUTH_FAIL, error: error };
}

;

function authAction(username, password, clientId) {
  return function (dispatch, getState) {
    dispatch({ type: AUTH, username: username, password: password, clientId: clientId });

    _servicesManagersAuthManager2['default'].auth(username, password, clientId).then(function (data) {
      return dispatch(authSuccessAction(data));
    })['catch'](function (error) {
      return dispatch(authFailAction(error));
    });
  };
}