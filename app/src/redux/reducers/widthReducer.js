var defaultState = {};

export const widthReducer = (state = defaultState, action) => {
  var feed, nextState;

  switch (action.type) {
    case "WINDOW_RESIZE_ACTION":
    nextState = Object.assign({}, state);
    nextState.width.profile = action.payload.profile;
    return nextState;
    break;
  }
};
