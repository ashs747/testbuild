var defaultState = {};

export const reducer = (state = defaultState, action) => {
  var feed, nextState;

  switch (action.type) {
    case "WINDOW_RESIZE_ACTION":
      nextState = Object.assign({}, state);
      nextState.profile = action.payload.profile;
      return nextState;
      break;
    default:
      return state;
  }
};
