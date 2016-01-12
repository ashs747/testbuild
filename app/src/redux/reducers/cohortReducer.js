import {castPropertiesToObject} from '../helpers/genericHelpers';

var initialState = {};

export function reducer(state = initialState, action) {

  switch (action.type) {

    case 'COHORT_GOT_USER_COHORT':
      let cohort = castPropertiesToObject(action.payload.cohort);
      cohort.users = cohort.users.map(castPropertiesToObject);
      return {...state, ...cohort};

    default:
      return state;
  }
}
