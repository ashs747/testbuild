import moduleManager from 'cirrus/services/managers/moduleManager';

export const MODULE_HUB = 'MODULE_HUB';
export const MODULE_HUB_SUCCESS = 'MODULE_HUB_SUCCESS';
export const MODULE_HUB_FAIL = 'MODULE_HUB_FAIL';
export function moduleHubFailAction(error) {
  return {type: MODULE_HUB_FAIL, error: error};
};

export function moduleHubSuccessAction(modules) {
  return {type: MODULE_HUB_SUCCESS, modules};
};

export function moduleHubAction(context, contextType, embed) {
  return (dispatch, getState) => {
    dispatch({type: MODULE_HUB, context, contextType, embed});
    moduleManager.getContentTypeData(context, contextType, embed)
      .then((data) => dispatch(moduleHubSuccessAction(data)))
      .catch((error) => dispatch(moduleHubFailAction(error)));
  };
};
