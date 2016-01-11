import events from 'events';
var emitter = new events.EventEmitter();

emitter.setMaxListeners(100);

export default emitter;
