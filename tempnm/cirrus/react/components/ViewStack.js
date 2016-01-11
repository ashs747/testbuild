'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mixinsUtilsMixin = require('../mixins/utilsMixin');

var _mixinsUtilsMixin2 = _interopRequireDefault(_mixinsUtilsMixin);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var HIDDEN_STYLE_PROPS = {
  style: {
    visibility: 'hidden',
    height: 0,
    padding: 0,
    margin: 0,
    width: '100%',
    position: 'absolute',
    zIndex: -1000,
    overflow: 'hidden'
  }
};

var ViewStack = _reactAddons2['default'].createClass({
  displayName: 'ViewStack',

  mixins: [_mixinsUtilsMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      selectedIndex: 0
    };
  },

  render: function render() {
    var className = this.props.className;
    className = this.addClass(className, 'view-stack');

    var children = _reactAddons2['default'].Children.map(this.props.children, (function (child, index) {

      var props = {
        key: "view-stack-" + index,
        className: 'view-stack-item'
      };
      var isCurrentVisiblePage = this.props.selectedIndex === index;
      if (!isCurrentVisiblePage) {
        _Object$assign(props, HIDDEN_STYLE_PROPS);
      }
      return _reactAddons2['default'].addons.cloneWithProps(child, props);
    }).bind(this));

    return _reactAddons2['default'].createElement(
      'div',
      _extends({}, this.props, { className: className }),
      children
    );
  },

  getSelectedIndex: function getSelectedIndex() {
    return this.props.selectedIndex;
  }
});

exports['default'] = ViewStack;
module.exports = exports['default'];