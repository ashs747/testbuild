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
  console.log('Current User:', params);
  return request.post(apiRoot + `user/${params.id}/update`, params)
    .then(getResponseBody);
}