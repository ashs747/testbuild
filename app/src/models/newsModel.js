var request = require('cirrus').services.request(require('../config'));

module.exports = {
  getPosts(params) {
    return request.get('/test', params).end();
  }
};
