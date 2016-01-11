'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _request = require('../../request');

var _request2 = _interopRequireDefault(_request);

exports['default'] = new ((function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: 'get',
    value: function get(params) {
      return _request2['default'].get('booking/get-slots-by-event', params);
    }
  }]);

  return _class;
})())();
module.exports = exports['default'];