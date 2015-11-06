// AuthService: Deals with OAuth.
import config from '../../localConfig';
import request from 'cirrus/services/request';

let apiRoot = config.api ? config.api.url : '';

function oAuth(params) {
  return request.post(apiRoot + 'oauth/v2/token', params);
}

function getResponseBody(response) {
  return Promise.resolve(response.body);
}

function feedsArrayToObject(feedsArray) {
  var feedsObj = {};

  feedsArray.forEach((feed) => {
    feedsObj[feed.id] = feed;
  });

  return feedsObj;
}

function formatUserData(userData) {
  var user = userData.user[0] || userData.user;
  //var feeds = feedsArrayToObject(userData.feeds); //TODO: UncommentMe when FeedIDs come in
  var feeds = feedsArrayToObject([{"id": "1", "context": "programme"}, {"context": "cohort", "id": "2"}]);
  var out = {
    user,
    feeds
  };

  return Promise.resolve(out);
}

export function getUserData() {
  return request.get(apiRoot + 'api/user/bootstrap')
    .then(getResponseBody)
    .then(formatUserData);
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