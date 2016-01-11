'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtilsJs = require('../../testing/utils.js');

var _testingUtilsJs2 = _interopRequireDefault(_testingUtilsJs);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _emitter = require('../emitter');

var _emitter2 = _interopRequireDefault(_emitter);

describe('eventEmitter', function () {
  var handlerTriggered = false;

  function testEventHandler(bool) {
    handlerTriggered = bool;
  }

  it('should return an eventEmitter instance', function () {
    _testingUtilsJs2['default'].expect(_emitter2['default']).to.be.an['instanceof'](_events2['default'].EventEmitter);
  });

  it('should attach an event listener to be fired by the next test', function () {
    _emitter2['default'].on('test', testEventHandler);
    _testingUtilsJs2['default'].expect(_emitter2['default'].listeners('test')).to.contain(testEventHandler);
  });

  it('attached listener should fire', function () {
    _emitter2['default'].emit('test', true);
    _testingUtilsJs2['default'].expect(handlerTriggered).to.eq(true);
  });
});