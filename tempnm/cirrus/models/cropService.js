'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _servicesRequest = require('../services/request');

var _servicesRequest2 = _interopRequireDefault(_servicesRequest);

exports['default'] = {
  cropImage: function cropImage(params) {
    return _servicesRequest2['default'].post('/crop', params).end();
  }
};
module.exports = exports['default'];