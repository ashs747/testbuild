import {getResources, getFAQs, getProject, getToolkits} from '../services/contentService';
import store from '../store.js';

export const getResourcesByCohort = (cohortId) => {
  let asyncResponse = getResources(cohortId);
  return {
    type: "CONTENT_GET_RESOURCES",
    payload: asyncResponse
  };
};

export const getFAQsAction = () => {
  let asyncResponse = getFAQs();
  return {
    type: "CONTENT_GET_FAQS",
    payload: asyncResponse
  };
};

export const getProjectContent = (projectId) => {
  let asyncResponse = getProject(projectId);
  return {
    type: "CONTENT_GET_PROJECT",
    payload: asyncResponse
  };
};

export const getAllToolkits = () => {
  let asyncResponse = getToolkits();
  return {
    type: "CONTENT_GET_ALL_TOOLKITS",
    payload: asyncResponse
  };
};
