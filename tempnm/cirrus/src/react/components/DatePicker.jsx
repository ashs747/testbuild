import React from 'react';
import moment from 'moment-timezone';
import PickaDay from 'pikaday';
import $ from 'jquery';
class DatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.picker = null;
    this.selectedDate = null;
    this.monthSelector = null;
    this.yearSelector = null;
    this.eventBoundEls = [];
  }

  componentDidMount() {

    var wasSelectLast = false;

    this.picker = new PickaDay({
      firstDay: 1,
      onSelect: function(date) {

        var selectedDate = moment(date);
        if (this.props.onSelect) {
          this.props.onSelect(selectedDate);
        }
        this.selectedDate = selectedDate;

        this.setColors($(this.picker.el).find('select.pika-select-month').val(), $(this.picker.el).find('select.pika-select-year').val());
        wasSelectLast = true;
      }.bind(this),
      onDraw: function() {
        if (wasSelectLast) {
          wasSelectLast = false;
          return;
        }
        this.setColors($(this.picker.el).find('select.pika-select-month').val(), $(this.picker.el).find('select.pika-select-year').val());
      }.bind(this)
    });

    this.monthSelector = $(this.picker.el).find('select.pika-select-month');
    this.yearSelector = $(this.picker.el).find('select.pika-select-year');
    this.picker.setDate(this.props.defaultDate.format('YYYY-MM-DD'));
    var dom = findDOMNode(this);
    $(dom).append(this.picker.el);
  }

  render() {
    return <div ref="datePicker" className={"datepicker"}></div>;
  }

  componentDidUpdate() {
    this.setColors($(this.picker.el).find('select.pika-select-month').val(), $(this.picker.el).find('select.pika-select-year').val());
  }

  setColors(selectedMonth, selectedYear) {
    if (!this.props.colorDates) {
      return;
    }

    for (var i = 0; i < this.eventBoundEls.length; i++) {
      $(this.eventBoundEls[i]).off();
    }

    this.eventBoundEls = [];

    for (i = 0; i < this.props.colorDates.length; i++) {
      var color = this.props.colorDates[i];
      if (color.date.month() == selectedMonth && color.date.year() == selectedYear) {

        var day = $(this.picker.el).find('[data-day="' + color.date.date() + '"]').children('button').css({
          backgroundColor: color.colors.normal,
          color: color.colors.font
        }).data('colors', color.colors).on('mouseenter', function() {
          $(this).css({
            backgroundColor: $(this).data('colors').hover
          });
        }).on('mouseleave', function() {
          $(this).css({
            backgroundColor: $(this).data('colors').normal
          });
        });

        this.eventBoundEls.push(day);
      }
    }
  }
}

DatePicker.defaultProps = {defaultDate: moment()};
export default DatePicker;
