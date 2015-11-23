var initialState = {};

export function reducer(state = initialState, action) {

  switch (action.type) {

    case 'INITIAL_DATA_UPDATED':
      var newState = {...state};
      newState[action.payload.field] = action.payload.value;
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

    case 'COOKIE_CHECKED':
      switch (action.status) {
        case 'RESOLVED':
          var user = action.payload.user,
            feeds = action.payload.feeds;
          return {
            ...state,
            ...user,
            loggedIn: true
          };

        case 'REJECTED':
          return {
            cookieChecked: true,
            loggedIn: false
          };
        default:
          return state;
      }

    default:
      return state;
  }
}