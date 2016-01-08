var initialState = {};

export function reducer(state = initialState, action) {

  switch (action.type) {

    case 'COHORT_GOT_USER_COHORT':
      var newState = {...state};
      var cohort = action.payload.cohort;
      cohort.users.forEach(user => {
        try {
          user.properties = JSON.parse(user.properties);
        } catch (e) {}
      });
      newState = action.payload.cohort;
      return newState;
      break;

    default:
      return state;
  }
}
