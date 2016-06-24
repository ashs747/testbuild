//wallService.js
import config from '../../localConfig';
import appConfig from '../../config';
import requesty from '../../request';

var request = requesty();

let apiRoot = config.api ? config.api.url : '';

export const getAllWallsForProgramme = () => {
  return request.get(`${apiRoot}api/wall/get-for-programme/${appConfig.programmeId}`);
};
