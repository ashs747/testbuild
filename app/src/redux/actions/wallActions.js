import {getAllWallsForProgramme, postEvidence} from '../services/wallService';
import store from '../store.js';

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

export function userDeletedEvidence(wallID, postID) {
  return {
    type: 'REMOVE_WALL_EVIDENCE',
    payload: {
      wallID, postID
    }
  }
}

export function clearTempData(wallID, postID) {
  return {
    type: 'REMOVE_TEMP_DATA',
    payload: {
      wallID, postID
    }
  }
}

export function postEvidenceAction(wallID, postID) {
  var dispatch = store.dispatch;
  var wall = store.getState().wall[wallID];
  var post;
  var dispatchObj = {};
  wall.posts.forEach(postObj => {
    if (postObj.id === postID) {
      post = postObj;
    }
  })
  var evidence = post.evidence
  if (!evidence) {
    dispatchObj = updateInfoBox(wallID, postID, 'no-evidence', 'danger');
    return dispatchObj;
  }
  var payload = postEvidence(post).then((post) => {
    dispatch({
      type: "POST_EVIDENCE",
      status: "RESOLVED",
      payload: {
        post, wallID
      }
    });
  }, (err) => {
    dispatch({
      type: "POST_EVIDENCE",
      status: "REJECTED",
      payload: {
        postID, wallID
      }
    })
  });
  return {
    type: "POST_EVIDENCE",
    status: "PENDING",
    payload: {
      postID, wallID
    }
  }
}
