const initialState = {};

export function reducer(state = initialState, action) {
  var nextState;
  switch (action.type) {
    case "BOOKING_USER_SELECTED_DATE":
      nextState = Object.assign({}, state);
      nextState.currentSelectedDate = action.payload.date;
      return nextState;

    case "BOOKING_USER_SELECTED_SLOT":
      nextState = Object.assign({}, state);
      nextState.currentSelectedSlot = {
        slot: action.payload.slot,
        facilitator: action.payload.facilitator
      };
      return nextState;

    case "BOOKING_BOOKED_SLOT":
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

    case "BOOKING_GET_SLOTS":
      switch (action.status) {
        case "RESOLVED":
          nextState = Object.assign({}, state);
          nextState.events = action.payload.body.events;
          return nextState;

        default:
          return state;
      }

    case "BOOKING_REMOVE_ERROR":
      nextState = Object.assign({}, state);
      nextState.error = null;
      return nextState;

    default: return state;
  }
}
