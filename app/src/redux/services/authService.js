// AuthService: Deals with OAuth.
import config from '../../localConfig';
import request from 'cirrus/services/request';

let apiRoot = config.api ? config.api.url : '';

function oAuth(params) {
  return request.post(apiRoot + 'oauth/v2/token', params);
}

export function getUserData() {
  return request.get(apiRoot + 'api/user/bootstrap');
}

export const getOAuthToken = (username, password) => {
  if (arguments.length < 2) {
    throw new Error(
      `Invalid arguments: auth() requires a username + password`
    );
  }

  /*eslint-disable camelcase */
  return oAuth({
    username: username,
    password: password,
    client_id: config.api.clientId,
    client_secret: config.api.appSecret,
    grant_type: 'password'
  });
};

export const getInitialUserData = () => {
  return user();
};