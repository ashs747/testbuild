import {getAllWallsForProgramme, postEvidence, likePost} from '../services/wallService';
import {updateMeta} from '../services/feedService';
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

export function changeEditState(wallID, postID, editState) {
  return {
    type: 'CHANGE_EDIT_STATE',
    payload: {
      wallID, postID, editState
    }
  }
}

export function userLikesPost(wallID, postID) {
  var dispatch = store.dispatch;
  var payload = likePost(postID).then((post) => {
    dispatch({
      type: 'USER_LIKED_POST',
      status: 'RESOLVED',
      payload: {
        wallID, postID, post
      }
    });
  }, () => {
    dispatch({
      type: 'USER_LIKED_POST',
      status: 'REJECTED',
      payload: {
        wallID, postID
      }
    });
  });
  return {
    type: 'USER_LIKED_POST',
    status: 'PENDING',
    payload: {
      wallID, postID
    }
  }
}

export function rotateImageAction(wallID, postID, fileID, meta) {
  var dispatch = store.dispatch;
  var payload = updateMeta(fileID, meta).then((file) => {
    dispatch({
      type: 'ROTATED_IMAGE',
      status: 'RESOLVED',
      payload: {
        wallID, postID, file
      }
    });
  }, (err) => {
    dispatch({
      type: 'ROTATED_IMAGE',
      status: 'REJECTED',
      payload: {
        wallID, postID
      }
    });
  });
  return {
    type: 'ROTATED_IMAGE',
    status: 'PENDING',
    payload: {
      wallID, postID
    }
  }
}

export function postEvidenceAction(wallID, postID, activityId) {
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
        post, wallID, activityId
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
