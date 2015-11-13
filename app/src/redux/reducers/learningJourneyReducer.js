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

    default: return state;
  }
}
