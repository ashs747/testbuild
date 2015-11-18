import {LEARNING_JOURNEY, LEARNING_JOURNEY_SUCCESS, LEARNING_JOURNEY_FAIL} from '../actions/learningJourneyActions';
import _ from 'underscore';
import moment from 'moment-timezone';

const initialState = {
  waitingForModules: false,
  learningJourneyModules: []
};

export function reducer(state = initialState, action) {
  var nextState;
  switch (action.type) {
    case 'LOGOUT':
      return {};

    case LEARNING_JOURNEY:
      switch (action.status) {
        case "FULFILLED":
          return Object.assign({}, state, {
            waitingForModules: false,
            learningJourneyModules: action.modules
          });
          break;

        case "REJECTED":
          return Object.assign({}, state, {waitingForModules: false});
          break;

        default: Object.assign({}, state, {waitingForModules: true});
      }

    case "LEARNING_JOURNEY_USER_SELECTED_DATE":
      nextState = Object.assign({}, state);
      nextState.currentSelectedDate = action.payload.date;
      return nextState;

    case "LEARNING_JOURNEY_USER_SELECTED_SLOT":
      nextState = Object.assign({}, state);
      nextState.currentSelectedSlot = {
        slot: action.payload.slot,
        facilitator: action.payload.facilitator
      };
      return nextState;

    case "LEARNING_JOURNEY_BOOKED_SLOT":
      switch (action.status) {
        case "RESOLVED":
          nextState = Object.assign({}, state);
          if (action.payload !== true) {
            nextState.error = action.payload;
          }
          return nextState;

        default:
          return state;
      }

    case "LEARNING_JOURNEY_GET_SLOTS":
      switch (action.status) {
        case "RESOLVED":
          nextState = Object.assign({}, state);
          nextState.events = action.payload.body.events;
          return nextState;

        default:
          return state;
      }

    case "LEARNING_JOURNEY_REMOVE_ERROR":
      nextState = Object.assign({}, state);
      nextState.error = null;
      return nextState;

    case "LEARNING_JOURNEY_FETCHED":
      switch (action.status) {
        case "RESOLVED":
          return _.mapObject(action.payload, (module, key) => {
            let activities = _.mapObject(module.activities, (activity, key) => {
              let status;
              let slots;
              var availableSlots = false;
              //Checking if we have slots, if not, status is TBC
              for (var i in activity.availableEvents) {
                if (activity.availableEvents[i].slots.length > 0) {
                  availableSlots = true;
                }
              }
              if (!availableSlots) {
                status = "dates-tbc";
              }
              //If we have a booked event, proceed to calculate status
              if (activity.myBookedEventAndSlot) {
                var bookedEvent = activity.myBookedEventAndSlot;
                //Checking if we can change the booking or not, by checking todays date vs cancellation date
                if (moment().isBefore(bookedEvent.cancelBy)) {
                  status = "booked-can-change";
                } else {
                  status = "booked-cannot-change";
                }
                //If the event has passed, start to check attendance and rating
                if (moment().isAfter(bookedEvent.endDate)) {
                  //If the event has been attended, check logging and rating
                  if (bookedEvent.attendance === "attended") {
                    //If the activity is a coaching call then need to check for both rating and log
                    if (activity.type === "Coaching") {
                      //If rated, or rated + logged or nothing, then show appropriate statuses
                      if (bookedEvent.rating) {
                        status = "rated-coaching";
                        if (activity.log) {
                          status = "completed";
                        }
                      } else {
                        status = "attended-coaching";
                      }
                    }
                    //If the activity is a webinar/workshop, only need to check for log
                    if (activity.type === "Webinar" || activity.type === "Workshop") {
                      if (activity.log) {
                        status = "completed";
                      } else {
                        status = "attended-activity";
                      }
                    }
                  //IF event is missed or not yet recorded attendance, set accordingly
                  } else if (bookedEvent.attendance === "missed") {
                    status = "missed";
                  } else {
                    status = "awaiting";
                  }
                }
                //If we dont have a status, then the user can book
              } else {
                status = "book";
              }
              console.log(status);
              return {...activity, status};
            });
            return {...module, activities};
          });
        default: return state;
      }
    default: return state;
  }
}
