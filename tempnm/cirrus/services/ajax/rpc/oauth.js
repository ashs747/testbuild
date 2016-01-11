'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _request = require('../../request');

var _request2 = _interopRequireDefault(_request);

exports['default'] = {
  oauth: function oauth(params) {
    return _request2['default'].post('/oauth', params).end();
  },
  oauthValidate: function oauthValidate(params) {
    return _request2['default'].post('/oauth/validate-token', params).end();
  }
};
module.exports = exports['default'];