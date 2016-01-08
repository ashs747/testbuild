import React from 'react';
import store from '../../../redux/store';
import {nextSlide} from '../../../redux/actions/slideActions';
import BookingDateDisplay from './BookingDateDisplay.jsx';
import SlotDisplay from './SlotDisplay.jsx';
import {connect, Provider} from 'react-redux';
import {bookUserOnToSlot} from '../../../redux/actions/bookingActions';
import FacilitatorBio from './FacilitatorBio.jsx';
import Confirmation from './Confirmation.jsx';
import Complete from './Complete.jsx';

function mapBookingDateDisplayProps(state) {
  let activity = getActivityFromLearningJourneyByUrl(state.learningJourney);
  return {
    activity,
    selectedDate: state.booking.currentSelectedDate,
    user: state.user,
    width: state.width.profile
  };
};
var MappedBookingDateDisplay = connect(mapBookingDateDisplayProps)(BookingDateDisplay);

function mapSlotDisplayProps(state) {
  let activity = getActivityFromLearningJourneyByUrl(state.learningJourney);
  let events = (activity) ? activity.availableEvents : [];
  return {
    events,
    selectedDate: state.booking.currentSelectedDate,
    width: state.width.profile
  };
}
var MappedSlotDisplay = connect(mapSlotDisplayProps)(SlotDisplay);

function mapFacilitatorBioProps(state) {
  let facilitator = state.booking.currentSelectedSlot.facilitator;
  let bio = (facilitator.properties && facilitator.properties.bio) ? facilitator.properties.bio : "";
  return {
    bio,
    name: `${facilitator.forename} ${facilitator.surname}`
  };
}
var MappedFacilitatorBio = connect(mapFacilitatorBioProps)(FacilitatorBio);

function mapConfirmationProps(state) {
  let facilitator = state.booking.currentSelectedSlot.facilitator;
  let activity = getActivityFromLearningJourneyByUrl(state.learningJourney);
  return {
    bookedSlot: (activity.myBookedEventAndSlot),
    facilitator,
    slot: state.booking.currentSelectedSlot.slot,
    error: state.booking.error,
    cancellationTerms: "Cancellation terms go here when we have them"
  };
}
var MappedConfirmation = connect(mapConfirmationProps)(Confirmation);

function mapCompleteProps(state) {
  let activity = getActivityFromLearningJourneyByUrl(state.learningJourney);
  let facilitator = state.booking.currentSelectedSlot.facilitator;
  return {
    facilitator: `${facilitator.forename} ${facilitator.surname}`,
    slot: state.booking.currentSelectedSlot.slot,
    cancellationTerms: "Cancellation terms go here when we have them",
    activity
  };
}
var MappedComplete = connect(mapCompleteProps)(Complete);

function getActivityFromLearningJourneyByUrl(learningJourney) {
  let moduleAndActivityIds = window.location.href.split("booking/")[1];
  let moduleID = moduleAndActivityIds.split("/")[0];
  let activityID = moduleAndActivityIds.split("/")[1];

  if (learningJourney && learningJourney["m" + moduleID]) {
    return learningJourney["m" + moduleID].activities["a" + activityID];
  }
}

export const bookingScreenSlides = [{
  content: (
      <Provider store={store}>
        <div className="choose-slide clearfix">
          <div className="col-md-6">
            <MappedBookingDateDisplay />
          </div>
          <div className="col-md-6">
            <MappedSlotDisplay />
          </div>
        </div>
    </Provider>
  ),
  showNext: false
}, {
  content: (
    <Provider store={store}>
      <div className="confirm-slide clearfix">
        <div className="col-md-6 col-md-push-6">
          <MappedConfirmation />
        </div>
        <div className="col-md-6 col-md-pull-6">
          <MappedFacilitatorBio />
        </div>
      </div>
    </Provider>
  ),
  showPrev: false,
  showNext: false
}, {
  content: (
    <Provider store={store}>
      <div className="complete-slide clearfix">
        <MappedComplete />
      </div>
    </Provider>
  ),
  showPrev: false,
  showNext: false
}];
() => {
  store.dispatch(bookUserOnToSlot(store.getState().user.id));
};
