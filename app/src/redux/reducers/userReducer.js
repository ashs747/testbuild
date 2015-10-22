var initialState = {};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_COHORT':
      let newState = Object.assign({}, state);
      newState.users = action.payload.users;
      return newState;

    case 'COOKIE_CHECKED':
      console.log('Cookiechecked', action);
      switch (action.status) {
        case 'RESOLVED':
          var user = action.payload.user;
          console.log('the fing user', user);
          var feeds = action.payload.feeds;
          return {
            ...state,
            ...user,
            feeds
          };

        case 'REJECTED':
          return {...state,
            cookieChecked: true,
            userData: null,
            loggedIn: false
          };
        default:
          return state;
      }

    default:
      return state;
  }
}