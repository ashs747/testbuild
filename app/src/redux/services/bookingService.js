import config from '../../localConfig';
import requesty from '../../request';
var request = requesty();

let apiRoot = config.api ? config.api.url : '';

export const bookSlot = (slotID) => {
  return request.get(apiRoot + 'api/plj/booking/book/' + slotID);
};

export const getSlots = (activityID) => {
  return request.get(`${apiRoot}api/plj/booking/get-slots/${activityID}`);
};

export const deleteSlot = (slotID) => {
  return request.del(`${apiRoot}api/plj/booking/book/${slotID}`);
};
