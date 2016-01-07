import store from '../store.js';
import {updateUserData, updateUserProfile} from '../services/userService';
// Update a users Cohorts
export function fetchUsersByCohort(id) {

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
  let asyncAction = updateUserProfile();
  return {

  };
}

export const saveUserData = (slideID) => {
  /**** TODO - import the service *****/
  let asyncAction = updateUserData()
    .then((status) => {
      if (slideID) {
        store.dispatch({type: "SLIDE_NEXT_SLIDE", payload: {slideID: slideID}});
      }
      return {
        type: 'SAVE_USER_DETAILS',
        status: 'RESOLVED',
        payload: {
          'fromSlide': slideID
        }
      };
    }, (err) => {
      return {
        type: 'SAVE_USER_DETAILS',
        status: 'REJECTED',
        error: {
          'validation': 'Bad password etc'
        }
      };
    });
  return {
    type: 'SAVING_USER_DETAILS_STARTED',
    status: 'PENDING'
  };
};
