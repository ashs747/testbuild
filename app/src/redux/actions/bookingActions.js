import {bookSlot, getSlots} from '../services/bookingService';
import {nextSlide} from './slideActions';
import Store from '../store.js';

export function userSelectedDate(date) {
  return {
    type: "BOOKING_USER_SELECTED_DATE",
    payload: {date}
  };
};

export function userSelectedSlot(slot, facilitator) {
  return {
    type: "BOOKING_USER_SELECTED_SLOT",
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
    type: "BOOKING_BOOKED_SLOT",
    payload
  };
};

export function getSlotsForActivity(activityID) {
  let payload = getSlots(activityID);
  return {
    type: "BOOKING_GET_SLOTS",
    payload
  };
};

export function removeBookingError() {
  return {
    type: "BOOKING_REMOVE_ERROR"
  };
}
