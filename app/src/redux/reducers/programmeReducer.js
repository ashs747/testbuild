var initialState = {};

export function reducer(state = initialState, action) {

  switch (action.type) {
    case 'PROGRAMME_FETCHED':
      return Object.assign({}, ...state, action.payload);

    default:
      return state;
  }
}
