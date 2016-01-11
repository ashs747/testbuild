'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var StyleProperties = _react2['default'].createClass({
  displayName: 'StyleProperties',

  render: function render() {
    var src = this.props.src || {};

    var styles = _Object$keys(src).filter(hasStyleAttributes, src).map(getStyleDefinition, src).join('\n');

    var markup = styles ? _react2['default'].createElement('style', { dangerouslySetInnerHTML: { __html: styles } }) : null;
    return markup;
  }
});

function hasStyleAttributes(styleName) {
  var self = this;
  return _Object$keys(self[styleName]).length;
}

function getStyleDefinition(styleName) {
  var self = this,
      styleAttributes = getStyleAttributes(self[styleName]);
  return styleName + ' {' + styleAttributes + '}';
}

function getStyleAttributes(attributes) {
  return _Object$keys(attributes).map(function (propertyName) {
    var value = attributes[propertyName];
    return propertyName + ': ' + value;
  }).join('; ');
}

exports['default'] = StyleProperties;
module.exports = exports['default'];