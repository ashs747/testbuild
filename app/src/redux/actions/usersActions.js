import store from '../store.js';
import {updateUserData, updateUserProfile, updateUserPassword} from '../services/userService';
// Update a users Cohorts
export function fetchUsersByCohort() {
  return {
    'type': 'FETCH_COHORT'
  };
};

export const updateUserObject = (field, value) => {
  return {
    type: 'INITIAL_DATA_UPDATED',
    payload: {
      field,
      value
    }
  };
};

export const saveUserProfile = () => {
  let payload = updateUserProfile();
  return {
    type: 'USER_SAVED',
    payload
  };
};

export const saveUserData = (slideID) => {
  /**** TODO - import the service *****/
  let asyncAction = updateUserData()
    .then((status) => {
      if (slideID) {
        store.dispatch({type: "SLIDE_NEXT_SLIDE", payload: {slideID: slideID}});
      }
      store.dispatch({
        type: 'SAVE_USER_DETAILS',
        status: 'RESOLVED',
        payload: {
          'fromSlide': slideID
        }
      });
    }, (err) => {
      store.dispatch({
        type: 'SAVE_USER_DETAILS',
        status: 'REJECTED',
        error: err
      });
    });
  return {
    type: 'SAVE_USER_DETAILS',
    payload: {}
  };
};

export const clearDetailFormErrors = () => {
  return {
    type: 'USER_CLEAR_DETAILS_FORM',
    payload: {}
  };
};

export const saveUserPassword = () => {
  var params = store.getState().user;
  let payload = updateUserPassword(params.password, params.confirm);
  return {
    type: 'USER_SAVE_PASSWORD',
    payload
  };
};

export const newProfilePic = (profilePic) => {
  return {
    type: 'USER_UPDATE_PROFILE',
    payload: {
      profilePic
    }
  };
};
