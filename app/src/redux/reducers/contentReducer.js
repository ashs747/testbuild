var defaultState = {};

export const reducer = (state = defaultState, action) => {
  var feed, nextState;

  switch (action.type) {
    case 'LOGOUT':
      return {};
      
    case "CONTENT_GET_PROJECT":
      switch (action.status) {
        case "RESOLVED":
          nextState = Object.assign({}, state);
          nextState.project = action.payload;
          return nextState;
          break;
        default:
          return state;
          break;
      }
    case "CONTENT_GET_ALL_TOOLKITS":
      nextState = Object.assign({}, state);
      nextState.toolkits = action.payload;
      return nextState;
      break;
      break;
    case "CONTENT_GET_ACTIVITY":
      switch (action.status) {
        case "RESOLVED":
          nextState = Object.assign({}, state);
          nextState.activity = action.payload;
          return nextState;
          break;
        default:
          return state;
          break;
      }
      break;
    default:
      return state;
  }
};
