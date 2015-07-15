var request = require('../services/request');

module.exports = {
  getPosts(params) {
    return request.get('/test', params).end();
  }
};
