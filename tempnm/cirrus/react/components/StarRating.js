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

var _FormControl = require('./FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var StarRating = (function (_BaseFormController) {
  _inherits(StarRating, _BaseFormController);

  function StarRating(props) {
    _classCallCheck(this, StarRating);

    _get(Object.getPrototypeOf(StarRating.prototype), 'constructor', this).call(this, props);
    this.handleClick = this.handleClick.bind(this);
  }

  _createClass(StarRating, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(StarRating.prototype), 'componentWillMount', this).call(this);
      this.setState({ value: this.props.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var stars = [1, 2, 3, 4, 5];
      var buttons = stars.map(function (i) {
        var className = parseInt(_this.state.value) >= parseInt(i) ? 'star active' : 'star';
        return _react2['default'].createElement('input', { key: i, type: 'button', className: className, onClick: _this.handleClick, value: i });
      });

      return _react2['default'].createElement(
        'div',
        _extends({ className: 'class' }, this.props),
        _react2['default'].createElement(
          'div',
          { className: 'star-rating' },
          buttons
        )
      );
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      _get(Object.getPrototypeOf(StarRating.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
      if (nextProps.value != this.state.value && nextProps.value != undefined) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      var target = event.currentTarget ? event.currentTarget : event.srcElement;

      if (target.value == this.state.value) {
        return;
      }

      this.setState({
        value: parseInt(target.value)
      });

      this.touched = true;
      this.onChange(event);
    }
  }]);

  return StarRating;
})(_FormControl2['default']);

StarRating.defaultProps = { value: 0 };
exports['default'] = StarRating;
module.exports = exports['default'];