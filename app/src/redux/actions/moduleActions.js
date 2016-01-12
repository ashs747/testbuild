export const MODULE_HUB = 'MODULE_HUB';
export const MODULE_HUB_SUCCESS = 'MODULE_HUB_SUCCESS';
export const MODULE_HUB_FAIL = 'MODULE_HUB_FAIL';
export function moduleHubFailAction(error) {
  return {type: MODULE_HUB_FAIL, error: error};
};

export function moduleHubSuccessAction(modules) {
  return {type: MODULE_HUB_SUCCESS, modules};
};

