'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _configsAppConfig = require('../configs/appConfig');

var _configsAppConfig2 = _interopRequireDefault(_configsAppConfig);

var _servicesRequest = require('../services/request');

var _servicesRequest2 = _interopRequireDefault(_servicesRequest);

exports['default'] = {
  login: function login(username, password, clientId) {
    var data = {
      "grant_type": "password",
      "client_id": clientId,
      "username": username,
      "password": password
    };
    return _servicesRequest2['default'].post('/oauth', data).end().then(function (data) {
      data.loginType = 'standard';
      return data;
    });
  },
  ssoLogin: function ssoLogin(rs, createdDate, userId, digest, clientId) {
    /*eslint-disable camelcase */
    var params = {
      grant_type: 'cirrus_digest',
      rs: rs,
      userId: userId,
      digest: digest,
      client_id: clientId,
      createdDate: createdDate
    };
    /*eslint-enable camelcase */
    return _servicesRequest2['default'].post('/oauth', params).end().then(function (data) {
      data.loginType = 'sso';
      return data;
    });
  },
  getUser: function getUser(userId) {
    var params = {
      embed: "labels,roles.permissions.resource,versions.application"
    };
    return _servicesRequest2['default'].get('/user/' + userId, params).end();
  },
  checkToken: function checkToken(userId, token) {
    var tokenData = {
      userId: userId,
      token: token
    };
    return _servicesRequest2['default'].post('/oauth/validate-token', tokenData).end();
  },
  recoverTokenCheck: function recoverTokenCheck(token) {
    return _servicesRequest2['default'].get('/oauth/recover-password', { token: token }).end();
  },
  recoverPassword: function recoverPassword(email) {
    var params = {
      'email': email,
      'urlTemplate': 'http://' + window.location.host + '#/login/recover?t={token}',
      'real': true
    };
    return _servicesRequest2['default'].post('/oauth/recover-password', params).end();
  },
  updatePassword: function updatePassword(password, token) {
    var params = {
      password: password,
      token: token
    };
    return _servicesRequest2['default'].post('/oauth/recover-password', params).end();
  },
  setupTokenCheck: function setupTokenCheck(token) {
    var params = {
      query: [{
        field: 'authUser.setupToken',
        type: 'eq',
        value: token
      }]
    };
    return _servicesRequest2['default'].get('/user', params).end();
  }

};
module.exports = exports['default'];