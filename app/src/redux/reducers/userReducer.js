var initialState = {};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_COHORT':
      let newState = Object.assign({}, state);
      newState.users = action.payload.users;
      return newState;
    default:
      return state;
  }
}
