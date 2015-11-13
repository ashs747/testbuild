import React from 'react';
import store from '../../../redux/store';
import {nextSlide} from '../../../redux/actions/slideActions';
import BookingDateDisplay from './BookingDateDisplay.jsx';
import SlotDisplay from './SlotDisplay.jsx';
import {connect, Provider} from 'react-redux';
import {events} from './testEvents.js';

function mapBookingDateDisplayProps(state) {
  return {
    events,
    selectedDate: state.learningJourney.currentSelectedDate,
    user: {
      id: 1
    }
  };
};
var MappedBookingDateDisplay = connect(mapBookingDateDisplayProps)(BookingDateDisplay);

function mapSlotDisplayProps(state) {
  return {
    events,
    selectedDate: state.learningJourney.currentSelectedDate
  }
}
var MappedSlotDisplay = connect(mapSlotDisplayProps)(SlotDisplay);


export const bookingScreenSlides = [{
  content: (
      <Provider store={store}>
        {function() {
          return (
            <div className="choose-slide clearfix">
              <h2>Name of activity here</h2>
              <div className="col-md-6">
                <h3>Choose a date</h3>
                <MappedBookingDateDisplay />
                <div className="key">
                  <div className="key-item">
                    <div className="colour-yellow"></div>
                    <p>Booked</p>
                  </div>
                  <div className="key-item">
                    <div className="colour-green"></div>
                    <p>Selected</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h3>Choose a time</h3>
                <p>Your timezone is set to <strong>GMT</strong>. <a href="/#/profile">Edit <i className="fa fa-right-chevron"></i></a></p>
                <MappedSlotDisplay />
              </div>
            </div>
          );
        }
      }
    </Provider>
  ),
  showNext: false
}, {
  content: <p>Slide 2</p>
}, {
  content: <p>Slide 3</p>
}];
