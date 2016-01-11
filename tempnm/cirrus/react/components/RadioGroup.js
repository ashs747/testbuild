'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _mixinsFormControlMixin = require('../mixins/formControlMixin');

var _mixinsFormControlMixin2 = _interopRequireDefault(_mixinsFormControlMixin);

var groupI = 1;

var RadioGroup = _reactAddons2['default'].createClass({
  displayName: 'RadioGroup',

  mixins: [_mixinsFormControlMixin2['default']],

  componentWillMount: function componentWillMount() {
    this.setState({
      groupI: groupI,
      value: this.props.value
    });

    groupI++;

    this.value = this.props.value ? this.props.value : this.props.defaultValue;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value && nextProps.value != undefined) {
      this.setState({
        value: nextProps.value
      });
    }
  },

  render: function render() {
    function recur(children) {
      _reactAddons2['default'].Children.forEach(children, (function (item, i) {
        if (item.type == "input" && item.props.type == "radio") {
          children[i] = _reactAddons2['default'].addons.cloneWithProps(item, {
            ref: i,
            name: 'group' + this.state.groupI,
            checked: this.state.value == item.props.value,
            onChange: this.onRadioChange
          });
        } else if (item.props && item.props.children) {
          recur.call(this, item.props.children);
        }
      }).bind(this));
    }

    recur.call(this, this.props.children);

    return _reactAddons2['default'].createElement(
      'div',
      _extends({}, this.props, { className: this.getStateClasses() }),
      this.props.children
    );
  },

  onRadioChange: function onRadioChange(event) {
    event.stopPropagation();

    if (event.currentTarget.value == this.state.value) {
      return;
    }

    this.setState({
      value: event.currentTarget.value
    });

    this.touched = true;
    this.onChange(event);
  }
});

exports['default'] = RadioGroup;
module.exports = exports['default'];