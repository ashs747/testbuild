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

export function updateWallPostEvidence(wallID, postID, fileObj) {
  return {
    type: 'UPDATE_WALL_EVIDENCE',
    payload: {
      wallID, postID, fileObj
    }
  }
}

export function updateInfoBox(wallID, postID, msg, type) {
  return {
    type: 'UPDATE_INFO_BOX',
    payload: {
      wallID, postID, msg, type
    }
  }
}

export function removeInfoBox(wallID, postID) {
  return {
    type: 'REMOVE_INFO_BOX',
    payload: {
      wallID, postID
    }
  }
}