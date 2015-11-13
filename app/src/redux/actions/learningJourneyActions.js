import {learningJourneyService, bookSlot} from '../services/learningJourneyService';
import {nextSlide} from './slideActions';
import Store from '../store.js';

export const LEARNING_JOURNEY = 'LEARNING_JOURNEY';
export const LEARNING_JOURNEY_SUCCESS = 'LEARNING_JOURNEY_SUCCESS';
export const LEARNING_JOURNEY_FAIL = 'LEARNING_JOURNEY_FAIL';

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
