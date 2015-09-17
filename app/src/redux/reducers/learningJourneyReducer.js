import {LEARNING_JOURNEY, LEARNING_JOURNEY_SUCCESS, LEARNING_JOURNEY_FAIL} from '../actions/learningJourneyActions';

const initialState = {
  waitingForModules: false,
  learningJourneyModules: []
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LEARNING_JOURNEY:
      return Object.assign({}, state, {waitingForModules: true});
    case LEARNING_JOURNEY_SUCCESS:
      return Object.assign({}, state, {
        waitingForModules: false,
        learningJourneyModules: action.modules
      });
    case LEARNING_JOURNEY_FAIL:
      return Object.assign({}, state, {waitingForModules: false});
    default:
      return state;
  }
}
