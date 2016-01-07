var initialState = {};

export function reducer(state = initialState, action) {

  switch (action.type) {

    case 'INITIAL_DATA_UPDATED':
      console.log(action.payload);
      var newState = {...state};
      var field = action.payload.field;
      var value = action.payload.value;

      if (field.indexOf("properties.") > -1) {
        var propsField = field.split('.')[1];
        newState.properties[propsField] = value;
        return newState;
      }

      newState[field] = value;
      return newState;
      break;

    case 'FETCHED_INITIAL_USER':
      switch (action.status) {
        case 'RESOLVED':
          let newState = {...state, ...action.payload};
          return newState;

        case 'REJECTED':
          return {...state};

        default:
          return {...state};
      }

    case 'LOGOUT':
      return {};

    case 'FETCH_COHORT':
      switch (action.status) {
        case 'RESOLVED':
          return {...state,
            cohortMembers: action.payload.users
          };
      }

    case 'TOKEN_CHECKED':
      switch (action.status) {
        case 'RESOLVED':
          var user = action.payload.user;

          return {
            ...state,
            ...user,
            loggedIn: true
          };

        case 'REJECTED':
          return {
            loggedIn: false
          };
        default:
          return state;
      }

    default:
      return state;
  }
}
