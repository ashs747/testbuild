'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ViewStack = require('./ViewStack');

var _ViewStack2 = _interopRequireDefault(_ViewStack);

var _mixinsUtilsMixin = require('../mixins/utilsMixin');

var _mixinsUtilsMixin2 = _interopRequireDefault(_mixinsUtilsMixin);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var TabStack = _react2['default'].createClass({
  displayName: 'TabStack',

  mixins: [_mixinsUtilsMixin2['default']],

  getInitialState: function getInitialState() {
    return {
      selectedIndex: 0
    };
  },

  render: function render() {
    var className = this.props.className;
    className = this.addClass(className, 'tab-stack');

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: className }),
      _react2['default'].createElement(
        TabBar,
        { onChange: this.onChange, selectedIndex: this.state.selectedIndex },
        this.props.children
      ),
      _react2['default'].createElement(
        _ViewStack2['default'],
        { ref: 'viewStack', selectedIndex: this.state.selectedIndex },
        this.props.children
      )
    );
  },

  componentWillMount: function componentWillMount() {
    if (this.props.selectedIndex) {
      this.setState({ selectedIndex: this.props.selectedIndex });
    }
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (this.props.onChange && this.state.selectedIndex != nextState.selectedIndex) {
      this.props.onChange(nextState.selectedIndex);
    }
  },

  onChange: function onChange(index) {
    if (!this.props.onBeforeChange || this.props.onBeforeChange && this.props.onBeforeChange(index) !== false) {
      this.setState({
        selectedIndex: index
      });
    }
  },

  selectIndex: function selectIndex(index) {
    this.setState({
      selectedIndex: index
    });
  },

  getSelectedIndex: function getSelectedIndex() {
    return this.refs.viewStack.getSelectedIndex();
  }
});

var TabBar = _react2['default'].createClass({
  displayName: 'TabBar',

  mixins: [_mixinsUtilsMixin2['default']],

  render: function render() {
    var tabs = [];

    _react2['default'].Children.forEach(this.props.children, (function (item, i) {

      var className = item.props.tabClass;
      var activeClass = i == this.props.selectedIndex ? 'active' : '';
      className = this.addClass(className, activeClass);

      tabs.push(_react2['default'].createElement(
        'div',
        { key: i, onClick: this.onClick.bind(this, i), className: className },
        _react2['default'].createElement(
          'span',
          null,
          item.props.label
        )
      ));
    }).bind(this));

    return _react2['default'].createElement(
      'div',
      { className: 'tab-bar clearfix' },
      tabs
    );
  },

  onClick: function onClick(index) {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }
});

exports['default'] = TabStack;
module.exports = exports['default'];