import React from 'react';
import moment from 'moment-timezone';
import {userSelectedDate} from '../../../redux/actions/learningJourneyActions';

class BookingDateDisplay extends React.Component {

  constructor() {
    super();
    this.mapDateToJsx = this.mapDateToJsx.bind(this);
    this.findUsersBookedSlot = this.findUsersBookedSlot.bind(this);
  }

  render() {
    let availableDays = this.props.events.filter(this.removeBookedDays);
    let stringDateArray = this.momentToString(availableDays);
    let bookedDate = this.props.events.filter(this.findUsersBookedSlot)[0];
    let uniqueDateArray = this.reduceEventDates(stringDateArray);
    let eventDateRows = this.mapDateToJsx(uniqueDateArray);
    let bookingMessage;
    if (bookedDate) {
      var startDate = bookedDate.slots[0].startDate;
      var endDate = bookedDate.slots[0].endDate;
      bookingMessage = (
        <div className="alert alert-warning">
          <p>You have a booking on <strong>{startDate.format('dddd Do MMMM YYYY')}</strong> at <strong>{`${startDate.format('HH:mm')}-${endDate.format('HH:mm')}`}</strong>.
            Select a new date or to cancel please click here to raise a support ticket</p>
        </div>
      );
    }
    return (
      <div className="select-date">
        <h3>Select a date</h3>
        {bookingMessage}
        <div className="event-date-rows">
          {eventDateRows}
        </div>
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
      return (
        <div key={i} className={className} onClick={this.eventDateClicked.bind(this, eventDate)}>
          <div className="radio"><div className="radio-inner" /></div>
          {eventDate}
        </div>
      );
    });
    return mappedItems;
  }

  /*
    Array filter function to return a users slot if they have booked
    an event for the list that has been passed
  */
  findUsersBookedSlot(event) {
    for (var i in event.slots) {
      if (event.slots[i].user && event.slots[i].user.id == this.props.user.id) {
        return true;
      }
    }
    return false;
  }

  /*
    Array filter function to determine if an event has at least 1 open slot
  */
  removeBookedDays(event) {
    let emptySlot = false;
    event.slots.forEach((slot) => {
      if (slot.user === null) {
        emptySlot = true;
      }
    });
    return emptySlot;
  }

  eventDateClicked(eventDate) {
    this.props.dispatch(userSelectedDate(eventDate));
  }
}

export default BookingDateDisplay;
