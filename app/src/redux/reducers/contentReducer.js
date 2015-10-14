var defaultState = {};

export const reducer = (state = defaultState, action) => {
  var feed, nextState;

  switch (action.type) {
    case "CONTENT_GET_RESOURCES":
      switch (action.status) {
        case "RESOLVED":
          nextState = Object.assign({}, state);
          nextState.resources = action.payload.resources;
          nextState.projects = action.payload.projects;
          return nextState;
          break;
        default:
          return state;
          break;
      }
    default:
      return state;
  }
};
