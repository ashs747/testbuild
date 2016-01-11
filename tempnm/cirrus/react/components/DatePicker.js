'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _pikaday = require('pikaday');

var _pikaday2 = _interopRequireDefault(_pikaday);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var DatePicker = (function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    _get(Object.getPrototypeOf(DatePicker.prototype), 'constructor', this).call(this, props);
    this.picker = null;
    this.selectedDate = null;
    this.monthSelector = null;
    this.yearSelector = null;
    this.eventBoundEls = [];
  }

  _createClass(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      var wasSelectLast = false;

      this.picker = new _pikaday2['default']({
        firstDay: 1,
        onSelect: (function (date) {

          var selectedDate = (0, _momentTimezone2['default'])(date);
          if (this.props.onSelect) {
            this.props.onSelect(selectedDate);
          }
          this.selectedDate = selectedDate;

          this.setColors((0, _jquery2['default'])(this.picker.el).find('select.pika-select-month').val(), (0, _jquery2['default'])(this.picker.el).find('select.pika-select-year').val());
          wasSelectLast = true;
        }).bind(this),
        onDraw: (function () {
          if (wasSelectLast) {
            wasSelectLast = false;
            return;
          }
          this.setColors((0, _jquery2['default'])(this.picker.el).find('select.pika-select-month').val(), (0, _jquery2['default'])(this.picker.el).find('select.pika-select-year').val());
        }).bind(this)
      });

      this.monthSelector = (0, _jquery2['default'])(this.picker.el).find('select.pika-select-month');
      this.yearSelector = (0, _jquery2['default'])(this.picker.el).find('select.pika-select-year');
      this.picker.setDate(this.props.defaultDate.format('YYYY-MM-DD'));
      var dom = _react2['default'].findDOMNode(this);
      (0, _jquery2['default'])(dom).append(this.picker.el);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', { ref: 'datePicker', className: "datepicker" });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setColors((0, _jquery2['default'])(this.picker.el).find('select.pika-select-month').val(), (0, _jquery2['default'])(this.picker.el).find('select.pika-select-year').val());
    }
  }, {
    key: 'setColors',
    value: function setColors(selectedMonth, selectedYear) {
      if (!this.props.colorDates) {
        return;
      }

      for (var i = 0; i < this.eventBoundEls.length; i++) {
        (0, _jquery2['default'])(this.eventBoundEls[i]).off();
      }

      this.eventBoundEls = [];

      for (i = 0; i < this.props.colorDates.length; i++) {
        var color = this.props.colorDates[i];
        if (color.date.month() == selectedMonth && color.date.year() == selectedYear) {

          var day = (0, _jquery2['default'])(this.picker.el).find('[data-day="' + color.date.date() + '"]').children('button').css({
            backgroundColor: color.colors.normal,
            color: color.colors.font
          }).data('colors', color.colors).on('mouseenter', function () {
            (0, _jquery2['default'])(this).css({
              backgroundColor: (0, _jquery2['default'])(this).data('colors').hover
            });
          }).on('mouseleave', function () {
            (0, _jquery2['default'])(this).css({
              backgroundColor: (0, _jquery2['default'])(this).data('colors').normal
            });
          });

          this.eventBoundEls.push(day);
        }
      }
    }
  }]);

  return DatePicker;
})(_react2['default'].Component);

DatePicker.defaultProps = { defaultDate: (0, _momentTimezone2['default'])() };
exports['default'] = DatePicker;
module.exports = exports['default'];