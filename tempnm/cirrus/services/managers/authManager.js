'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ajaxRpcOauth = require('../ajax/rpc/oauth');

var _ajaxRpcOauth2 = _interopRequireDefault(_ajaxRpcOauth);

var _ajaxRestUser = require('../ajax/rest/user');

var _ajaxRestUser2 = _interopRequireDefault(_ajaxRestUser);

exports['default'] = {
  auth: function auth(username, password, clientId) {
    if (!username || !password || !clientId) {
      throw new Error('Invalid arguments: auth() requires a username, password and clientId, ' + arguments + ' given');
    }

    /*eslint-disable camelcase */
    return _ajaxRpcOauth2['default'].oauth({
      username: username,
      password: password,
      client_id: clientId,
      grant_type: 'password'
    }).then(function (oauth) {
      var params = {
        access_token: oauth.access_token,
        embed: "labels,files"
      };
      return _ajaxRestUser2['default'].get(oauth.user_id, params).then(function (user) {
        oauth.user = user;
        return oauth;
      });
    }); /*eslnt-enable camelcase */
  },

  validateToken: function validateToken(userId, token) {
    if (!userId || !token) {
      throw new Error('Invalid arguments: auth() requires a userId and token, ' + arguments + ' given');
    }
    return _ajaxRpcOauth2['default'].oauthValidate({
      userId: userId,
      token: token
    });
  }
};
module.exports = exports['default'];