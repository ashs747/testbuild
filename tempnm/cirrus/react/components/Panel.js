'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var Container = _react2['default'].createClass({
  displayName: 'Container',

  getInitialState: function getInitialState() {
    return {
      header: null
    };
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    if (!className) {
      className = '';
    }

    className += ' panel panel-default';

    var header = this.state.header;
    if (!header) {
      var closeButton = this.props.showClose ? _react2['default'].createElement('a', { className: 'close', href: 'javascript:;', onClick: this.onClose }) : null;

      header = this.props.title || this.props.showClose ? _react2['default'].createElement(
        'h2',
        { className: 'panel-heading' },
        _react2['default'].createElement(
          'span',
          { className: 'title' },
          this.props.title
        ),
        closeButton
      ) : null;
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _jquery2['default'].trim(className) }),
      header,
      _react2['default'].createElement(
        'div',
        { className: 'panel-body' },
        this.props.children
      )
    );
  },

  componentWillMount: function componentWillMount() {
    function recur(children) {
      _react2['default'].Children.forEach(children, (function (item, i) {
        if (item && item.type == Header.type) {
          this.setState({
            header: item.props.children
          });
        } else if (item && item.type != Container.type && item.props) {
          recur.call(this, item.props.children);
        }
      }).bind(this));
    }

    recur.call(this, this.props.children);
  },

  onClose: function onClose() {
    if (_underscore2['default'].isFunction(this.props.onClose)) {
      this.props.onClose();
    }
  }
});

var Header = _react2['default'].createClass({
  displayName: 'Header',

  render: function render() {
    return _react2['default'].createElement('div', { style: { display: 'none' } });
  }
});

exports['default'] = {
  Container: Container,
  Header: Header
};
module.exports = exports['default'];