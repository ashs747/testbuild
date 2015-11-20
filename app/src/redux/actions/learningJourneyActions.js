import {getPLJDataByProgramme} from '../services/learningJourneyService';

export function getPLJData(programmeID) {
  let payload = getPLJDataByProgramme(programmeID);
  return {
    type: "LEARNING_JOURNEY_FETCHED",
    payload
  };
}
