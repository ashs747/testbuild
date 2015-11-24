import {getPLJDataByProgramme} from '../services/learningJourneyService';

export function getPLJData() {
  let payload = getPLJDataByProgramme();
  return {
    type: "LEARNING_JOURNEY_FETCHED",
    payload
  };
}
