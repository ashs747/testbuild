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
  var filteredParams = {
    password: params.password,
    passwordConfirm: params.passwordConfirm,
    forename: params.forename,
    surname: params.surname,
    properties: JSON.stringify(params.properties)
  };
  return request.put(apiRoot + `api/user/profile`, filteredParams)
    .then(getResponseBody);
}