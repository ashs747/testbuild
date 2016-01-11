"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var component = _react2["default"].createClass({
  displayName: "component",

  render: function render() {
    var completed = this.props.completed,
        max = this.props.max,
        color = this.props.color;

    validateInputs(completed, max);

    var percent = getPercent(completed, max);

    return _react2["default"].createElement(
      "div",
      { className: "progressbar-container" },
      _react2["default"].createElement("div", { className: "progressbar-progress", style: getStyle(percent, color) })
    );
  }
});

function getPercent(completed, max) {
  completed = completed || 0;
  max = max || 0;
  var percent = max ? Math.round(completed / max * 100) : completed;

  if (percent < 0) {
    percent = 0;
  } else if (percent > 100) {
    percent = 100;
  }
  return percent;
}

function getStyle(percent, color) {
  return {
    backgroundColor: color || '#0BD318',
    width: percent + '%',
    transition: "width 200ms",
    height: 10
  };
}

function validateInputs(completed, max) {
  if (completed && isNaN(completed)) {
    throw new Error('completed value must be a number');
  }
  if (max && isNaN(max)) {
    throw new Error('max value must be a number');
  }
}

exports["default"] = component;
module.exports = exports["default"];