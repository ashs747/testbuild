// AuthService: Deals with OAuth.
import config from '../../localConfig';
import requesty from '../../request';
import cookie from 'cookie-cutter';

var request = requesty();

let apiRoot = config.api ? config.api.url : '';

function oAuth(params) {
  return request.post(apiRoot + 'oauth/v2/token', params);
}

function formatUserData(userData) {
  var user = userData.user[0] || userData.user;
  if (!user.properties || user.properties instanceof Array) {
    user.properties = {};
  }

  var feeds = userData.feeds;
  var cohort = userData.cohort;
  var toolkits = userData.toolkits;
  var programme = userData.programme;
  var out = {
    user,
    feeds,
    cohort,
    toolkits,
    programme
  };

  return Promise.resolve(out);
}

export function setCookieCredentials(authToken) {
  cookie.set('authToken', authToken);
}

export function getUserData(token) {
  return request.get(apiRoot + 'api/user/bootstrap', token)
    .then(formatUserData);
}

export const getOAuthTokenFromRefreshToken = (token) => {
  /*eslint-disable camelcase */
  return oAuth({
    refresh_token: token,
    client_id: config.api.clientId,
    client_secret: config.api.appSecret,
    grant_type: 'refresh_token'
  });
  /*eslint-enable camelcase */
};

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
    grant_type: 'http://strata.core/grants/portal-password'
  });
};

export const getOAuthTokenFromOneUseKey = (key) => {
  if (!key) {
    throw new Error('You need the yellow key');
  }
  /*eslint-disable camelcase */
  return oAuth({
    scope: 'PRE_AUTH',
    grant_type: 'http://strata.core/grants/onetime',
    client_id: config.api.clientId,
    client_secret: config.api.appSecret,
    key: key
  });
};
