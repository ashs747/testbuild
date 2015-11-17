var initialState = {
  'onBoarding': {
    index: 0,
    error: null
  },
  'booking': {
    index: 0,
    error: null
  }
};

export function reducer(state = initialState, action) {
  var nextState;

  switch (action.type) {
    case 'SLIDE_NEXT_SLIDE':
      nextState = Object.assign({}, state);
      nextState[action.payload.slideID].index++;
      return nextState;
      break;

    case 'SLIDE_PREV_SLIDE':
      nextState = Object.assign({}, state);
      nextState[action.payload.slideID].index--;
      return nextState;
      break;

    default:
      return state;
  }
}
