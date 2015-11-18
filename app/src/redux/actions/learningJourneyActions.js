import {learningJourneyService, bookSlot, getSlots, getPLJDataByProgramme} from '../services/learningJourneyService';
import {nextSlide} from './slideActions';
import Store from '../store.js';

export function learningJourney(userId, programmeId) {
  return {
    type: LEARNING_JOURNEY,
    payload: learningJourneyService.getlearningModules(programmeId)
  };
};

export function userSelectedDate(date) {
  return {
    type: "LEARNING_JOURNEY_USER_SELECTED_DATE",
    payload: {date}
  };
};

export function userSelectedSlot(slot, facilitator) {
  return {
    type: "LEARNING_JOURNEY_USER_SELECTED_SLOT",
    payload: {slot, facilitator}
  };
};

export function bookUserOnToSlot(slotID) {
  let payload = bookSlot(slotID).then((res) => {
    Store.dispatch(nextSlide("booking"));
    return true;
  }, (res) => {
    return res;
  });
  return {
    type: "LEARNING_JOURNEY_BOOKED_SLOT",
    payload
  };
};

export function getSlotsForActivity(activityID) {
  let payload = getSlots(activityID);
  return {
    type: "LEARNING_JOURNEY_GET_SLOTS",
    payload
  };
};

export function removeBookingError() {
  return {
    type: "LEARNING_JOURNEY_REMOVE_ERROR"
  };
}

export function getPLJData(programmeID) {
  let payload = getPLJDataByProgramme(programmeID);
  return {
    type: "LEARNING_JOURNEY_FETCHED",
    payload
  };
}
