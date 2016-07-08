import {getAllWallsForProgramme} from '../services/wallService';

export function getWallsForProgramme() {
  var payload = getAllWallsForProgramme();
  return {
    type: 'FETCH_WALLS',
    payload
  };
};

export function updateWallPostField(wallID, postID, field, value) {
  return {
    type: 'UPDATE_WALL_POST_FIELD',
    payload: {
      wallID, postID, field, value
    }
  };
}

export function userDeletedEvidence(wallID, postID) {
  return {
    type: 'DELETE_WALL_POST_EVIDENCE',
    payload: {
      wallID, postID
    }
  };
}
