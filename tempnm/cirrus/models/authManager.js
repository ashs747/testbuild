'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _authService = require('./authService');

var _authService2 = _interopRequireDefault(_authService);

var _cookieCutter = require('cookie-cutter');

var _cookieCutter2 = _interopRequireDefault(_cookieCutter);

var _userService = require('./userService');

var _userService2 = _interopRequireDefault(_userService);

var _configsAppConfig = require('../configs/appConfig');

var _configsAppConfig2 = _interopRequireDefault(_configsAppConfig);

var currentUser;

exports['default'] = {
  login: function login(username, password, clientId, onAuth) {
    var _this = this;

    return _authService2['default'].login(username, password, clientId).then(function (data) {
      return _this._onAuthorisation(data, onAuth);
    });
  },
  ssoLogin: function ssoLogin(rs, createdDate, userId, digest, clientId, onAuth) {
    var _this2 = this;

    return _authService2['default'].ssoLogin(rs, createdDate, userId, digest, clientId).then(function (data) {
      return _this2._onAuthorisation(data, onAuth);
    });
  },
  checkToken: function checkToken() {
    var _this3 = this;

    var authToken = _cookieCutter2['default'].get('authToken');
    if (!authToken) {
      return _Promise.resolve();
    } else {
      var userId = _cookieCutter2['default'].get('userId');
      return _authService2['default'].checkToken(userId, authToken).then(function (authData) {
        if (!authData.success) {
          return _Promise.reject('unsuccessful token check, logging out');
        }
        /*eslint-disable camelcase */
        authData = {
          access_token: authToken,
          refresh_token: _cookieCutter2['default'].get('refreshToken'),
          expires_in: _cookieCutter2['default'].get('expiresIn'),
          user_id: userId
        };
        /*eslint-enable camelcase */
        return _this3._onAuthorisation(authData);
      })['catch'](function (err) {
        _this3.logout();
      });
    }
    return _Promise.resolve();
  },
  _onAuthorisation: function _onAuthorisation(authData, onAuth) {
    if (onAuth) {
      onAuth();
    }
    this.setTokens(authData);
    var promises = [];
    promises.push(_authService2['default'].getUser(authData.user_id));
    promises.push(_userService2['default'].getProfilePicture(authData.user_id));
    return _Promise.all(promises).then(function (values) {
      var user = values[0];
      var userFiles = values[1];
      user.files = userFiles._embedded.file;
      currentUser = user;
      _configsAppConfig2['default'].timezone = user.timezone;
      return currentUser;
    });
  },
  setTokens: function setTokens(data) {
    _configsAppConfig2['default'].api.authToken = data.access_token;

    _cookieCutter2['default'].set('userId', data.user_id);
    _cookieCutter2['default'].set('authToken', data.access_token);
    _cookieCutter2['default'].set('refreshToken', data.refresh_token);
    _cookieCutter2['default'].set('expiresIn', data.expires_in);
    _cookieCutter2['default'].set('loginType', data.loginType);
  },
  isLoggedIn: function isLoggedIn() {
    return currentUser != undefined;
  },
  getCurrentUser: function getCurrentUser() {
    if (!currentUser) {
      throw new Error('User is not set, check with isLoggedIn()');
    }
    return currentUser;
  },
  logout: function logout() {
    var expiredDate = new Date(0);
    var appCookies = ['userId', 'authToken', 'refreshToken', 'expiresIn', 'loginType'];
    appCookies.forEach(function (cookieName) {
      _cookieCutter2['default'].set(cookieName, '', { expires: expiredDate });
    });
    currentUser = undefined;
    delete _configsAppConfig2['default'].api.authToken;
  }

};
module.exports = exports['default'];