import _ from 'underscore';
import moment from 'moment-timezone';

const initialState = {};

export function reducer(state = initialState, action) {
  var nextState;

  switch (action.type) {
    case "LEARNING_JOURNEY_FETCHED":
      switch (action.status) {
        case "RESOLVED":
          return _.mapObject(action.payload, (module, key) => {
            let activities = _.mapObject(module.activities, (activity, key) => {
              let status;
              let slots;
              var availableSlots = false;
              //Checking if we have slots, if not, status is TBC
              for (var activityKey in activity.availableEvents) {
                if (activity.availableEvents.hasOwnProperty(activityKey)) {
                  if (activity.availableEvents[activityKey].slots.length > 0) {
                    availableSlots = true;
                  }
                }
              }
              if (activity.type === "Wall") {
                status = (activity.uploaded) ? "completed" : "upload";
              }
              else if (!availableSlots && !activity.myBookedEventAndSlot) {
                status = "dates-tbc";
              } else {
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
                    status = "no-attendance-marked";
                    if (bookedEvent.attendance === "attended") {
                      if (activity.log) {
                        status = "completed";
                      } else {
                        //TODO: Enable this when learning log complete
                        //status = "log";
                      }
                    //If event is missed
                    } else if (bookedEvent.attendance === "not_attended") {
                      status = "missed";
                    }
                  }
                  //If we dont have a status, then the user can book
                } else {
                  status = "book";
                }
              }
              return {...activity, status};
            });
            return {...module, activities};
          });
        default: return state;
      }
    default: return state;
  }
}
