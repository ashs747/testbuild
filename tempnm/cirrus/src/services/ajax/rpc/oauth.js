import request from '../../request';

export default {
  oauth(params) {
    return request.post('/oauth', params).end();
  },
  oauthValidate(params) {
    return request.post('/oauth/validate-token', params).end();
  }
};
