import utils from '../../testing/utils.js';
import events from 'events';
import eventEmitter from '../emitter';

describe('eventEmitter', function() {
  var handlerTriggered = false;

  function testEventHandler(bool) {
    handlerTriggered = bool;
  }

  it('should return an eventEmitter instance', function() {
    utils.expect(eventEmitter).to.be.an.instanceof(events.EventEmitter);
  });

  it('should attach an event listener to be fired by the next test', function() {
    eventEmitter.on('test', testEventHandler);
    utils.expect(eventEmitter.listeners('test')).to.contain(testEventHandler);
  });

  it('attached listener should fire', function() {
    eventEmitter.emit('test', true);
    utils.expect(handlerTriggered).to.eq(true);
  });
});
