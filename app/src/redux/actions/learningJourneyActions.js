import learningJourneyManager from 'cirrus/services/managers/learningJourneyManager';

export const LEARNING_JOURNEY = 'LEARNING_JOURNEY';
export const LEARNING_JOURNEY_SUCCESS = 'LEARNING_JOURNEY_SUCCESS';
export const LEARNING_JOURNEY_FAIL = 'LEARNING_JOURNEY_FAIL';

export function learningJourneySuccessAction(modules) {
  return {type: LEARNING_JOURNEY_SUCCESS, modules};
};

export function learningJourneyFailAction(error) {
  return {type: LEARNING_JOURNEY_FAIL, error: error};
};

export function learningJourneyAction(userId, programmeId) {
  return (dispatch, getState) => {
    dispatch({type: LEARNING_JOURNEY, userId, programmeId});
    learningJourneyManager.getlearningModulesByUser(userId, programmeId)
      .then((data) => dispatch(learningJourneySuccessAction(data)))
      .catch((error) => dispatch(learningJourneyFailAction(error)));
  };
}
