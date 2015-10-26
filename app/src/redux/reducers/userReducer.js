var initialState = {};

export function reducer(state = initialState, action) {

  switch (action.type) {
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
          var user = action.payload.user;
          var feeds = action.payload.feeds;
          return {
            ...state,
            ...user,
            feeds,
            loggedIn: true
          };

        case 'REJECTED':
          return {cookieChecked: true,
            loggedIn: false
          };
        default:
          return state;
      }

    default:
      return state;
  }
}