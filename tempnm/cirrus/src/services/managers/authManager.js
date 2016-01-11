import oauthService from '../ajax/rpc/oauth';
import userService from '../ajax/rest/user';

export default {
  auth(username, password, clientId) {
    if (!username || !password || !clientId) {
      throw new Error(
        `Invalid arguments: auth() requires a username, password and clientId, ${arguments} given`
      );
    }

    /*eslint-disable camelcase */
    return oauthService.oauth({
      username: username,
      password: password,
      client_id: clientId,
      grant_type: 'password'
    }).then(oauth => {
      let params = {
        access_token: oauth.access_token,
        embed: "labels,files"
      };
      return userService.get(oauth.user_id, params)
      .then(user => {
        oauth.user = user;
        return oauth;
      });
    });  /*eslnt-enable camelcase */
  },

  validateToken(userId, token) {
    if (!userId || !token) {
      throw new Error(
        `Invalid arguments: auth() requires a userId and token, ${arguments} given`
      );
    }
    return oauthService.oauthValidate({
      userId,
      token
    });
  }
};
