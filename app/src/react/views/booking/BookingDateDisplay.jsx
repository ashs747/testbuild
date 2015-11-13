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
    let stringDateArray = this.momentToString(this.props.events);
    let bookedDate = this.props.events.filter(this.findUsersBookedSlot);
    let uniqueDateArray = this.reduceEventDates(stringDateArray);
    let eventDateRows = this.mapDateToJsx(uniqueDateArray, bookedDate[0]);
    return (
      <div className="event-date-rows">
        {eventDateRows}
      </div>
    );
  }

  /*
    Takes an array ov event objects and converts the native DateTime
    to a stringed moment date object to be reduced in a different function
  */
  momentToString(eventsArray) {
    let stringEventDates = eventsArray.map(eventObj => {
      return eventObj.date;
      //return moment(eventObj.date).format('yyyy-mm-dd');
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
  mapDateToJsx(uniqueEventDates, bookedEventDate) {
    let mappedItems = uniqueEventDates.map((eventDate, i) => {
      let className = "date-row";
      if (bookedEventDate && bookedEventDate.date === eventDate) {
        className += " booked-date";
      }
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
      if (event.slots[i].user === this.props.user.id) {
        return event.date;
      }
    }
    return false;
  }

  eventDateClicked(eventDate) {
    this.props.dispatch(userSelectedDate(eventDate));
  }
}

export default BookingDateDisplay;
