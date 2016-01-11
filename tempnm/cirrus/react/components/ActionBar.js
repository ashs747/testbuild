'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _eventsEmitter = require('../../events/emitter');

var _eventsEmitter2 = _interopRequireDefault(_eventsEmitter);

var ActionBar = (function (_React$Component) {
  _inherits(ActionBar, _React$Component);

  function ActionBar() {
    _classCallCheck(this, ActionBar);

    _get(Object.getPrototypeOf(ActionBar.prototype), 'constructor', this).call(this);
    this.markAsAttended = this.markAsAttended.bind(this);
    this.markAsMissed = this.markAsMissed.bind(this);
  }

  _createClass(ActionBar, [{
    key: 'render',
    value: function render() {
      var defaultStyle = {
        minHeight: "40px",
        width: "100%",
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0
      };

      var style = _Object$assign(defaultStyle, this.props.style);

      return _react2['default'].createElement(
        'div',
        { style: style, className: 'action-bar' },
        _react2['default'].createElement(
          'div',
          { className: 'action-buttons' },
          _react2['default'].createElement(
            _Button2['default'],
            { className: 'btn', onClick: this.markAsMissed },
            'Mark as Missed'
          ),
          _react2['default'].createElement(
            _Button2['default'],
            { className: 'btn', onClick: this.markAsAttended },
            'Mark as Attended'
          )
        )
      );
    }
  }, {
    key: 'markAsMissed',
    value: function markAsMissed() {
      if (confirm("You are about to mark people as missed. Confirm?")) {
        _eventsEmitter2['default'].emit('markSelectedUsers', 'missed');
      }
    }
  }, {
    key: 'markAsAttended',
    value: function markAsAttended() {
      if (confirm("You are about to mark people as attended. Confirm?")) {
        _eventsEmitter2['default'].emit('markSelectedUsers', 'completed');
      }
    }
  }]);

  return ActionBar;
})(_react2['default'].Component);

exports['default'] = ActionBar;
module.exports = exports['default'];