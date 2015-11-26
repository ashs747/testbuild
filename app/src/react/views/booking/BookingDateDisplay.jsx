import React from 'react';
import moment from 'moment-timezone';
import {userSelectedDate} from '../../../redux/actions/bookingActions';

class BookingDateDisplay extends React.Component {

  constructor() {
    super();
    this.mapDateToJsx = this.mapDateToJsx.bind(this);
  }

  render() {
    if (!this.props.activity) {
      return <div />;
    }
    let activity = this.props.activity;
    let stringDateArray = this.momentToString(activity.availableEvents);
    let uniqueDateArray = this.reduceEventDates(stringDateArray);
    let eventDateRows = this.mapDateToJsx(uniqueDateArray);
    let bookingMessage;

    if (eventDateRows.length < 1) {
      eventDateRows = (
        <p className="no-dates">There are currently no alternative dates or times available for this activity.
        Select “cancel” at the bottom of the page to keep your existing booking .
        You can contact the [link]programme support team if you need further assistance.</p>
      );
    }

    if (activity.myBookedEventAndSlot) {
      let booked = activity.myBookedEventAndSlot;
      var startDate = moment(booked.startDate);
      var endDate = moment(booked.endDate);
      bookingMessage = (
        <div className="alert alert-warning">
          <p>You have a booking on <strong>{startDate.format('dddd Do MMMM YYYY')}</strong> at <strong>{`${startDate.format('HH:mm')}-${endDate.format('HH:mm')}`}</strong>.
            Select a new date or to cancel please click here to raise a support ticket</p>
        </div>
      );
    }

    let dateSelection = (this.props.width === "sm") ? (
      <div className="event-date-dropdown">
        <select className="form-control" onChange={this.eventDateClicked.bind(this)}>
          <option value={0}>- Please Select -</option>
          {eventDateRows}
        </select>
      </div>
    ) : (
      <div className="event-date-rows">
        {eventDateRows}
      </div>
    );

    return (
      <div className="select-date">
        {bookingMessage}
        <h3>Select a date</h3>
        {dateSelection}
        <br />
        <a href="/#/personal-learning-journey" className="btn back">CANCEL</a>
      </div>
    );
  }

  /*
    Takes an array ov event objects and converts the native DateTime
    to a stringed moment date object to be reduced in a different function
  */
  momentToString(eventsArray) {
    let stringEventDates = eventsArray.map(eventObj => {
      return moment(eventObj.eventDate).format('MMMM Do YYYY');
    });
    return stringEventDates;
  }

  /*
    Loops through an array of stringed event dates,
    returning a unique array of dates (e.g. Thursday 5th November)
  */
  reduceEventDates(stringEventDates) {
    var uniqueEventDates = [];
    for (let i = 0; i < stringEventDates.length; i++) {
      if (uniqueEventDates.indexOf(stringEventDates[i]) === -1) {
        uniqueEventDates.push(stringEventDates[i]);
      }
    }
    return uniqueEventDates;
  }

/*
  Loops through a list of unique events, maps them to JSX with
  an onClick handler to dispatch an event to store the selectedDate
*/
  mapDateToJsx(uniqueEventDates) {
    let mappedItems = uniqueEventDates.map((eventDate, i) => {
      let className = "date-row";
      if (this.props.selectedDate === eventDate) {
        className += " selected-date";
      }
      let dateItem = (this.props.width === "sm") ? (
        <option key={i} value={eventDate}>{eventDate}</option>
      ) : (
        <div key={i} className={className} onClick={this.eventDateClicked.bind(this, eventDate)}>
          <div className="radio"><div className="radio-inner" /></div>
          {eventDate}
        </div>
      );
      return dateItem;
    });
    return mappedItems;
  }

  eventDateClicked(eventDate) {
    let value = eventDate;
    if (eventDate.target) {
      value = eventDate.target.value;
    }
    this.props.dispatch(userSelectedDate(value));
  }
}

export default BookingDateDisplay;
