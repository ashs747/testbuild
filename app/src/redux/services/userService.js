// AuthService: Deals with OAuth.
import config from '../../localConfig';
import request from 'cirrus/services/request';
import store from '../store';
let apiRoot = config.api ? config.api.url : '';

function getResponseBody(response) {
  return Promise.resolve(response.body);
}

export function updateUserData() {
  var params = store.getState().user;
  return request.put(apiRoot + `api/user/profile`, params)
    .then(getResponseBody);
}