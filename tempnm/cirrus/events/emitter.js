'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var emitter = new _events2['default'].EventEmitter();

emitter.setMaxListeners(100);

exports['default'] = emitter;
module.exports = exports['default'];