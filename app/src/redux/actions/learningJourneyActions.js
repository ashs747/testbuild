import learningJourneyService from '../services/learningJourneyService';

export const LEARNING_JOURNEY = 'LEARNING_JOURNEY';
export const LEARNING_JOURNEY_SUCCESS = 'LEARNING_JOURNEY_SUCCESS';
export const LEARNING_JOURNEY_FAIL = 'LEARNING_JOURNEY_FAIL';

export function learningJourney(userId, programmeId) {
  return {
    type: LEARNING_JOURNEY,
    payload: learningJourneyService.getlearningModules(programmeId)
  };
};
