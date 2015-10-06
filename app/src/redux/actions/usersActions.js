import userManager from 'cirrus/services/managers/userManager';

export function fetchUsersByCohort(id) {
  let payload = userManager.getUsersByCohort(id)
    .then((result) => {
      return {
        users: result._embedded.user
      };
    });

  return {
    'type': 'FETCH_COHORT',
    payload
  };
};