'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _servicesRequest = require('../services/request');

var _servicesRequest2 = _interopRequireDefault(_servicesRequest);

function getProfilePicture(userId) {
  var params = {
    embed: 'variations',
    query: [{
      field: "context",
      type: "eq",
      value: "profile-picture"
    }, {
      field: "variation",
      type: "eq",
      value: "original"
    }, {
      field: "user",
      type: "eq",
      value: userId
    }]
  };
  return _servicesRequest2['default'].get('/file', params).end();
}

function saveUser(userId, user) {
  return _servicesRequest2['default'].patch('/user/' + userId, user).end();
}

exports['default'] = {
  getProfilePicture: getProfilePicture,
  saveUser: saveUser
};
module.exports = exports['default'];