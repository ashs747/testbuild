var defaultState = {
  loading: false,
  walls: []
};

export const reducer = (state = defaultState, action) => {
  var newState;

  switch (action.type) {
    case "FETCH_WALLS":
      switch(action.status) {
        case "RESOLVED":
          return {...state, walls: action.payload, loading: false};
        case "PENDING":
          return {...state, loading: true};
        case "REJECTED":
          return state;
      }
      return state;
    default:
      return state;
  }
};
