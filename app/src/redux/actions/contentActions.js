import {getProject, getActivity} from '../services/contentService';
import store from '../store.js';

export const getProjectContent = (projectId) => {
  let asyncResponse = getProject(projectId);
  return {
    type: "CONTENT_GET_PROJECT",
    payload: asyncResponse
  };
};

export const gotToolkits = (toolkits) => {
  return {
    type: "CONTENT_GET_ALL_TOOLKITS",
    payload: toolkits
  };
};

export const getActivityContent = (slug) => {
  let asyncResponse = getActivity(slug);
  return {
    type: "CONTENT_GET_ACTIVITY",
    payload: asyncResponse
  };
};
