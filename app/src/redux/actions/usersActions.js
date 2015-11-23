// Update a users Cohorts
export function fetchUsersByCohort(id) {

  return {
    'type': 'FETCH_COHORT'
  };
};

export const updateUserObject = (field, value) => {
  console.log(field + ' ' + value);
  return {
    type: 'INITIAL_DATA_UPDATED',
    payload: {
      field,
      value
    }
  };
};

export const saveUserData = () => {
  let req = Promise.resolve({'status': 'ok'});
  return {
    type: 'SAVE_USER_DETAILS',
    payload: req
  };
};