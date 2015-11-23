import authManager from 'cirrus/services/managers/authManager';
import userManager from 'cirrus/services/managers/userManager';
import {getOAuthToken, getUserData} from '../services/authService';
import cookie from 'cookie-cutter';
import Store from '../store.js';
export const AUTH = 'AUTH';
export const COOKIE_CHECKED = 'COOKIE_CHECKED';
export const LOGOUT = 'LOGOUT';
import config from '../../localConfig';

import {fetchLatestFeedMessages} from '../../redux/actions/feedActions';
import {getPLJData} from '../../redux/actions/learningJourneyActions';

export function fetchInitialUserData(token) {
  // let request = getUserDataFromOneTimeKey(token)
  let request = Promise.resolve({
    'forename': 'Matt',
    'surname': 'Cavanagh',
    'email': 'matt.c@darkynt.co.uk',
    'phone': '',
    'profilePicture': {
      'id': 123,
      'url': 'http://www.baconmockup.com/200/200'
    },
    token
  });

  return {
    type: 'FETCHED_INITIAL_USER',
    payload: request
  };
};

export function authAction(username, password) {
  let req = getOAuthToken(username, password).then((response) => {
    let res = response.body;
    /* Expiry date is a new DateObject, set to 'Today in Milliseconds add the expiry time in seconds' */
    let expiryDate = new Date(new Date().valueOf() + res.expires_in * 1000);
    cookie.set('authToken', res.access_token, {expires: expiryDate});
    cookie.set('refresh_token', res.refresh_token);
    Store.dispatch(cookieCheckedAction());
    return response;
  });

  return {
    type: AUTH,
    payload: req
  };
};

export function cookieCheckedAction() {
  var req = getUserData().then((userData) => {
    for (let feed in userData.feeds) {
      if (userData.feeds.hasOwnProperty(feed)) {
        Store.dispatch(fetchLatestFeedMessages(feed));
      }
    }
    Store.dispatch(getPLJData(config.programmeId));
    return userData;
  });
  return {
    type: COOKIE_CHECKED,
    payload: req
  };
}

export function getCookies() {
  /*eslint-disable camelcase */
  return {
    access_token: cookie.get('authToken'),
    expires_in: cookie.get('expiresIn'),
    refresh_token: cookie.get('refreshToken'),
    user_id: parseInt(cookie.get('userId'))
  };
  /*eslint-enable camelcase */
}

export function logoutAction() {
  cookie.set('authToken', '', {
    expires: 0
  });
  cookie.set('refresh_token', '', {
    expires: 0
  });

  return {type: 'LOGOUT', payload: ''};
}
