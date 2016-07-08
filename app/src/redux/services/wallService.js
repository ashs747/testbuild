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
  var evidence = post.tempEvidence || post.evidence;
  var data = {
    "update_wall_post": {
      title: post.title,
      description: post.description,
      evidence: evidence.id
    }
  };
  return request.post(`${apiRoot}api/wall/update-post/${post.id}`, data);
};
