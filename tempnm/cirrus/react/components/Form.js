'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _RadioGroup = require('./RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _StarRating = require('./StarRating');

var _StarRating2 = _interopRequireDefault(_StarRating);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var Form = _react2['default'].createClass({
  displayName: 'Form',

  getInitialState: function getInitialState() {
    return {
      valid: false,
      dirty: false,
      touched: false
    };
  },

  componentWillMount: function componentWillMount() {
    this.controls = [];
    this.reactEls = [];

    this.registerControls(this.props.children);
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    var classNames = className ? className.split(' ') : [];

    classNames.push(this.state.valid ? 'valid' : 'error');
    classNames.push(this.state.dirty ? 'dirty' : 'clean');
    classNames.push(this.state.touched ? 'touched' : 'untouched');
    className = classNames.join(' ');

    return _react2['default'].createElement(
      'form',
      _extends({ noValidate: true, className: className }, other),
      this.props.children
    );
  },

  registerControls: function registerControls(children) {
    this.controls = [];

    function recur(children) {
      _react2['default'].Children.forEach(children, (function (child) {
        if (!child) {
          return;
        }

        if (child.type == _Input2['default'].type || child.type == _TextArea2['default'].type || child.type == _RadioGroup2['default'].type || child.type == _StarRating2['default']) {
          this.bindListeners(child);
        }

        if (child.props && _react2['default'].Children.count(child.props.children)) {
          recur.call(this, child.props.children);
        }
      }).bind(this));
    }

    recur.call(this, children);
  },

  bindListeners: function bindListeners(child) {
    var control = null;

    child.props.onConstruct = (function (c) {
      this.reactEls.push(child);
      this.controls.push(c);
      control = c;
    }).bind(this);

    var itemError = null;
    if (child.props.onError) {
      itemError = child.props.onError;
    }

    child.props.onError = (function (control, errors) {
      this.onControlError(control, errors);

      if (itemError) {
        itemError(control, errors);
      }
    }).bind(this);
  },

  onControlError: function onControlError(control, errors) {},

  isValid: function isValid() {
    var valid = true;

    _jquery2['default'].each(this.controls, (function (i) {
      this.controls[i].touched = true;
      if (this.controls[i].validate() !== true) {
        valid = false;
      }
    }).bind(this));

    return valid;
  }
});

exports['default'] = Form;
module.exports = exports['default'];