//learningJourneyServices.js
import config from '../../localConfig';
import appConfig from '../../config';
import request from 'cirrus/services/request';
import moment from 'moment-timezone';

let apiRoot = config.api ? config.api.url : '';

export const getPLJDataByProgramme = () => {
  return request.get(`${apiRoot}api/plj/learning-journey/get-journey/${appConfig.programmeId}`);
};
