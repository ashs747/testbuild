'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _configsAppConfig = require('../configs/appConfig');

var _configsAppConfig2 = _interopRequireDefault(_configsAppConfig);

var _servicesRequest = require('../services/request');

var _servicesRequest2 = _interopRequireDefault(_servicesRequest);

function createFile(fileData) {
  return _servicesRequest2['default'].post('/file', fileData).end();
}

function generateVariation(variation) {
  return _servicesRequest2['default'].post('/variation-generator', variation).end();
}

function rotate(files) {
  return _servicesRequest2['default'].post('/rotate', { variations: files }).end();
}

function getBody(response) {
  return response.body;
}

exports['default'] = {
  createFile: createFile,
  generateVariation: generateVariation,
  rotateFile: rotate
};
module.exports = exports['default'];