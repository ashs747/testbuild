import {MODULE_HUB, MODULE_HUB_SUCCESS, MODULE_HUB_FAIL} from '../actions/moduleActions';

const initialState = {
  waitingForModules: false,
  contentTypeData: []
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGOUT': 
      return {};
    
    case MODULE_HUB:
      return Object.assign({}, state, {waitingForModules: true});
    case MODULE_HUB_SUCCESS:
      return Object.assign({}, state, {
        waitingForModules: false,
        contentTypeData: action.modules._embedded.content_type_data
      });
    case MODULE_HUB_FAIL:
      return Object.assign({}, state, {waitingForModules: false});
    default:
      return state;
  }
}
