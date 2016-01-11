import config from '../configs/appConfig';
import request from '../services/request';

export default {
  login(username, password, clientId) {
    var data = {
      "grant_type": "password",
      "client_id": clientId,
      "username": username,
      "password": password
    };
    return request.post('/oauth', data).end()
      .then(function(data) {
        data.loginType = 'standard';
        return data;
      });
  },
  ssoLogin(rs, createdDate, userId, digest, clientId) {
    /*eslint-disable camelcase */
    var params = {
      grant_type: 'cirrus_digest',
      rs: rs,
      userId: userId,
      digest: digest,
      client_id: clientId,
      createdDate: createdDate
    };
    /*eslint-enable camelcase */
    return request.post('/oauth', params).end()
      .then(function(data) {
        data.loginType = 'sso';
        return data;
      });
  },
  getUser(userId) {
    var params = {
      embed: "labels,roles.permissions.resource,versions.application"
    };
    return request.get(`/user/${userId}`, params).end();
  },
  checkToken(userId, token) {
    var tokenData = {
      userId: userId,
      token: token
    };
    return request.post('/oauth/validate-token', tokenData).end();
  },
  recoverTokenCheck(token) {
    return request.get('/oauth/recover-password', {token: token}).end();
  },
  recoverPassword(email) {
    var params = {
      'email': email,
      'urlTemplate': 'http://' + window.location.host + '#/login/recover?t={token}',
      'real': true
    };
    return request.post('/oauth/recover-password', params).end();
  },
  updatePassword(password, token) {
    var params = {
      password: password,
      token: token
    };
    return request.post('/oauth/recover-password', params).end();
  },
  setupTokenCheck(token) {
    var params = {
      query: [{
        field: 'authUser.setupToken',
        type: 'eq',
        value: token
      }]
    };
    return request.get('/user', params).end();
  }

};
