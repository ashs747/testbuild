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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Button = _react2['default'].createClass({
  displayName: 'Button',

  componentDidMount: function componentDidMount() {},

  render: function render() {
    var _props = this.props;
    var onClick = _props.onClick;
    var loading = _props.loading;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['onClick', 'loading', 'className']);

    var content = this.props.children;
    var size = "";
    var style = "";
    var classes = [];
    var loader = 'green';

    switch (this.props.skin) {
      case 'warning':
        style = 'btn-warning';
        loader = 'orange';
        break;
      case 'red':
        loader = 'red';
        break;
      case false:
        break;
      default:
        style = 'btn-primary';
        break;
    }

    switch (this.props.size) {
      case 'large':
        size = 'btn-lg';
        break;
    }

    classes.push('btn', style, size, className);

    if (loading) {
      style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-10px',
        marginTop: '-10px'
      };

      classes.push('loading');

      content = _react2['default'].createElement(
        'span',
        null,
        ' ',
        _react2['default'].createElement('img', { style: style, src: 'assets/img/circle-loader-20x20-' + loader + '.gif' })
      );
    }

    if (this.props.type == 'submit') {
      return _react2['default'].createElement(
        'button',
        _extends({}, other, { className: (0, _classnames2['default'])(classes), onClick: this.onClick.bind(this, onClick) }),
        content
      );
    }

    return _react2['default'].createElement(
      'a',
      _extends({}, other, { className: (0, _classnames2['default'])(classes), onClick: this.onClick.bind(this, onClick) }),
      content
    );
  },

  onClick: function onClick(_onClick, e) {
    if (this.props.loading || this.props.disabled) {
      e.preventDefault();
    } else if (_onClick) {
      _onClick();
    }
  }
});

exports['default'] = Button;
module.exports = exports['default'];