// Update a users Cohorts
export function fetchUsersByCohort(id) {

  return {
    'type': 'FETCH_COHORT'
  };
};

export const updateUserObject = (newUserObj) => {
  return {
    type: 'INITIAL_DATA_UPDATED',
    payload: {...newUserObj}
  };
};

export const saveUpdatedUserDetails = () => {
	let req = Promise.resolve({'status': 'ok'});
  return {
  	type: 'SAVE_USER_DETAILS',
  	payload: req
  };
};