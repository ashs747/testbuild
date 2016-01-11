'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _mixinsFormControlMixin = require('../mixins/formControlMixin');

var _mixinsFormControlMixin2 = _interopRequireDefault(_mixinsFormControlMixin);

var TextArea = _react2['default'].createClass({
  displayName: 'TextArea',

  mixins: [_mixinsFormControlMixin2['default']],

  render: function render() {
    return _react2['default'].createElement('textarea', _extends({}, this.props, { className: this.getStateClasses(), onChange: this.onChange, disabled: this.props.loading }));
  }
});

exports['default'] = TextArea;
module.exports = exports['default'];