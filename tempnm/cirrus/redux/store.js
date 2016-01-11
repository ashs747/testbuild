'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _redux = require('redux');

var _reducersAuthReducer = require('./reducers/authReducer');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2['default'])(_redux.createStore);

var appReducers = (0, _redux.combineReducers)({
  auth: _reducersAuthReducer.reducer
});

exports['default'] = createStoreWithMiddleware(appReducers);
module.exports = exports['default'];