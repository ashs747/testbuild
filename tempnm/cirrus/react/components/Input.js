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

var Input = _react2['default'].createClass({
  displayName: 'Input',

  mixins: [_mixinsFormControlMixin2['default']],

  render: function render() {
    return _react2['default'].createElement('input', _extends({}, this.props, { className: this.getStateClasses(), onChange: this.onChange }));
  },

  componentDidMount: function componentDidMount() {
    if (this.props.placeholder && !this.placeholderSupport) {
      this.createPlaceholder();
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.placeholder && !this.placeholderSupport) {
      this.createPlaceholder();
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.placeholder && !this.placeholderSupport) {
      this.positionPlaceholder();
    }
  },

  createPlaceholder: function createPlaceholder() {
    if (this.placeholderNode) {
      return;
    }

    var domNode = (0, _jquery2['default'])(this.getDOMNode());

    if (domNode.parent().css('position') == 'static') {
      domNode.parent().css('position', 'relative');
    }

    this.placeholderNode = (0, _jquery2['default'])('<div>').addClass('placeholder').css({
      position: 'absolute'
    }).text(this.props.placeholder);

    this.placeholderNode.insertAfter(domNode);

    domNode.data('placeholder', this.placeholderNode);
    this.placeholderNode.data('input', domNode);

    domNode.on('focus', this.hidePlaceholder);
    this.placeholderNode.on('click', (function (e) {
      if (!domNode.prop("disabled")) {
        this.hidePlaceholder(e);
      }
    }).bind(this));
    domNode.on('blur', this.showPlaceholder);

    this.positionPlaceholder();

    if (domNode.val()) {
      this.hidePlaceholder({ target: domNode });
    }
  },

  positionPlaceholder: function positionPlaceholder() {
    if (!this.placeholderNode) {
      return;
    }

    var domNode = (0, _jquery2['default'])(this.getDOMNode());

    var paddingLeft = domNode.css('paddingLeft') ? parseFloat(domNode.css('paddingLeft')) : 0;
    var paddingTop = domNode.css('paddingTop') ? parseFloat(domNode.css('paddingTop')) : 0;
    var borderWidth = domNode.css('borderWidth') ? parseFloat(domNode.css('borderWidth')) : 0;

    this.placeholderNode.css({
      paddingLeft: paddingLeft + borderWidth,
      paddingTop: paddingTop + borderWidth
    });

    var inputPosition = domNode.position();

    this.placeholderNode.css({
      left: inputPosition.left,
      top: inputPosition.top
    });
  },

  hidePlaceholder: function hidePlaceholder(event) {
    domNode = (0, _jquery2['default'])(event.target);

    if (domNode.data('input')) {
      domNode = domNode.data('input');
    }

    domNode.data('placeholder').hide();
    domNode.off('focus', this.hidePlaceholder);
    domNode.focus();
    domNode.on('focus', this.hidePlaceholder);
  },

  showPlaceholder: function showPlaceholder(event) {
    domNode = (0, _jquery2['default'])(event.target);

    if (!domNode.val()) {
      domNode.data('placeholder').show();
    }
  }
});

exports['default'] = Input;
module.exports = exports['default'];