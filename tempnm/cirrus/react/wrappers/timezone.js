'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _configsAppConfig = require('../../configs/appConfig');

var _configsAppConfig2 = _interopRequireDefault(_configsAppConfig);

var eventEmitter = require('../../events/emitter');

eventEmitter.on('timezoneChange', function (timezone) {
  _configsAppConfig2['default'].timezone = timezone;
});

exports['default'] = {
  wrap: function wrap(Component) {
    return (function (_React$Component) {
      _inherits(Wrapper, _React$Component);

      function Wrapper() {
        _classCallCheck(this, Wrapper);

        _get(Object.getPrototypeOf(Wrapper.prototype), 'constructor', this).call(this);
        this.onTimezoneChange = this.onTimezoneChange.bind(this);
        this.getWrappedComponent = this.getWrappedComponent.bind(this);
      }

      _createClass(Wrapper, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          eventEmitter.on('timezoneChange', this.onTimezoneChange);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2['default'].createElement(Component, _extends({ ref: 'comp' }, this.props, this.state));
        }
      }, {
        key: 'wrappedComponent',
        value: function wrappedComponent() {
          return this.refs.wrapped;
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          eventEmitter.removeListener('timezoneChange', this.onTimezoneChange);
        }
      }, {
        key: 'onTimezoneChange',
        value: function onTimezoneChange() {
          this.forceUpdate();
        }
      }, {
        key: 'getWrappedComponent',
        value: function getWrappedComponent() {
          return this.refs['comp'];
        }
      }]);

      return Wrapper;
    })(_react2['default'].Component);
  },

  current: function current(moment) {
    return moment.tz(_configsAppConfig2['default'].timezone);
  }
};
module.exports = exports['default'];