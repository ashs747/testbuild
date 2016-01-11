'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _BaseRestRequest2 = require('./BaseRestRequest');

var _BaseRestRequest3 = _interopRequireDefault(_BaseRestRequest2);

exports['default'] = new ((function (_BaseRestRequest) {
  _inherits(_class, _BaseRestRequest);

  function _class() {
    _classCallCheck(this, _class);

    _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, 'activityFacilitator');
  }

  return _class;
})(_BaseRestRequest3['default']))();
module.exports = exports['default'];