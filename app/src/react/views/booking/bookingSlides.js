import React from 'react';
import store from '../../../redux/store';
import {nextSlide} from '../../../redux/actions/slideActions';
import BookingDateDisplay from './BookingDateDisplay.jsx';
import SlotDisplay from './SlotDisplay.jsx';
import {connect, Provider} from 'react-redux';
import {bookUserOnToSlot} from '../../../redux/actions/learningJourneyActions';
import FacilitatorBio from './FacilitatorBio.jsx';
import Confirmation from './Confirmation.jsx';
import Complete from './Complete.jsx';

function mapBookingDateDisplayProps(state) {
  return {
    events: state.learningJourney.events ? state.learningJourney.events : [],
    selectedDate: state.learningJourney.currentSelectedDate,
    user: state.user
  };
};
var MappedBookingDateDisplay = connect(mapBookingDateDisplayProps)(BookingDateDisplay);

function mapSlotDisplayProps(state) {
  return {
    events: state.learningJourney.events ? state.learningJourney.events : [],
    selectedDate: state.learningJourney.currentSelectedDate
  };
}
var MappedSlotDisplay = connect(mapSlotDisplayProps)(SlotDisplay);

function mapFacilitatorBioProps(state) {
  let facilitator = state.learningJourney.currentSelectedSlot.facilitator;
  let bio = (facilitator.properties && facilitator.properties.bio) ? facilitator.properties.bio : "";
  return {
    bio,
    name: `${facilitator.forename} ${facilitator.surname}`
  };
}
var MappedFacilitatorBio = connect(mapFacilitatorBioProps)(FacilitatorBio);

function mapConfirmationProps(state) {
  let facilitator = state.learningJourney.currentSelectedSlot.facilitator;
  return {
    facilitator: `${facilitator.forename} ${facilitator.surname}`,
    slot: state.learningJourney.currentSelectedSlot.slot,
    error: state.learningJourney.error,
    cancellationTerms: "Cancellation terms go here when we have them"
  };
}
var MappedConfirmation = connect(mapConfirmationProps)(Confirmation);

function mapCompleteProps(state) {
  let facilitator = state.learningJourney.currentSelectedSlot.facilitator;
  return {
    facilitator: `${facilitator.forename} ${facilitator.surname}`,
    slot: state.learningJourney.currentSelectedSlot.slot,
    cancellationTerms: "Cancellation terms go here when we have them"
  };
}
var MappedComplete = connect(mapCompleteProps)(Complete);

export const bookingScreenSlides = [{
  content: (
      <Provider store={store}>
        {function() {
          return (
            <div className="choose-slide clearfix">
              <h2>Name of activity here</h2>
              <div className="col-md-6">
                <MappedBookingDateDisplay />
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
  content: (
    <Provider store={store}>
      {function() {
        return (
          <div className="confirm-slide clearfix">
            <h2>Name of learning activity</h2>
            <div className="col-md-5">
              <MappedFacilitatorBio />
            </div>
            <div className="col-md-6 col-md-offset-1">
              <MappedConfirmation />
            </div>
          </div>
        );
      }}
    </Provider>
  ),
  showPrev: false,
  showNext: false
}, {
  content: (
    <Provider store={store}>
      {function() {
        return (
          <div className="complete-slide clearfix">
            <MappedComplete />
          </div>
        );
      }}
    </Provider>
  ),
  showPrev: false,
  showNext: false
}];
() => {
  store.dispatch(bookUserOnToSlot(store.getState().user.id));
};
