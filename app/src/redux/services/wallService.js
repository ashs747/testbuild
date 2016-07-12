//wallService.js
import config from '../../localConfig';
import appConfig from '../../config';
import requesty from '../../request';

var request = requesty();

let apiRoot = config.api ? config.api.url : '';

export const getAllWallsForProgramme = () => {
  return request.get(`${apiRoot}api/wall/get-for-programme/${appConfig.programmeId}`);
};

export const postEvidence = (post) => {
  var title = post.tempTitle || post.title;
  var description = post.tempDescription || post.description;
  var data = {
    "update_wall_post": {
      title,
      description,
      evidence: post.evidence.id
    }
  };
  return request.post(`${apiRoot}api/wall/update-post/${post.id}`, data);
};
