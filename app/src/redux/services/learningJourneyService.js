//learningJourneyServices.js
import config from '../../localConfig';
import request from 'cirrus/services/request';

let apiRoot = config.api ? config.api.url : '';

export const getlearningModules = () => {
  return Promise.resolve({stub: 'data'});
};

export const bookSlot = (slotID) => {
  return request.get(apiRoot + 'api/plj/booking/book/' + slotID);
};

export const getSlots = (activityID) => {
  return request.get(`${apiRoot}api/plj/booking/get-slots/${activityID}`);
};
