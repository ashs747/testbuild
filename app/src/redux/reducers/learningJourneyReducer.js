import {LEARNING_JOURNEY, LEARNING_JOURNEY_SUCCESS, LEARNING_JOURNEY_FAIL} from '../actions/learningJourneyActions';

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

    default: return state;
  }
}
