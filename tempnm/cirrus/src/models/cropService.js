import request from '../services/request';

export default {
  cropImage(params) {
    return request.post('/crop', params).end();
  }
};
