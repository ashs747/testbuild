import {getResources} from '../services/contentService';
import store from '../store.js';

export const getResourcesByCohort = (cohortId) => {
  let asyncResponse = getResources(cohortId);
  return {
    type: "CONTENT_GET_RESOURCES",
    payload: asyncResponse
  };
};
