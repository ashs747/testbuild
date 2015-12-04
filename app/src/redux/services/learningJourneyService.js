//learningJourneyServices.js
import config from '../../localConfig';
import appConfig from '../../config';
import moment from 'moment-timezone';
import requesty from '../../request';
var request = requesty();

let apiRoot = config.api ? config.api.url : '';

export const getPLJDataByProgramme = (token) => {
  return request.get(`${apiRoot}api/plj/learning-journey/get-journey/${appConfig.programmeId}`, token);
};
