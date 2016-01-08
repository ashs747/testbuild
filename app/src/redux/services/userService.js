// UserService: Deals with users.
import config from '../../localConfig';
import store from '../store';
import requesty from '../../request';
var request = requesty();

let apiRoot = config.api ? config.api.url : '';

export function updateUserData() {
  var params = store.getState().user;
  var filteredParams = {
    password: params.password,
    confirm_password: params.passwordConfirm,
    forename: params.forename,
    surname: params.surname,
    properties: JSON.stringify(params.properties)
  };
  return request.put(apiRoot + `api/user/profile`, filteredParams);
}

export function updateUserProfile() {
  var params = store.getState().user;
  var filteredParams = {
    title: params.title,
    forename: params.forename,
    surname: params.surname,
    timezone: params.timezone,
    properties: JSON.stringify(params.properties)
  };
  return request.put(apiRoot + `api/user/profile`, filteredParams);
}

export function updateUserPassword(password, passwordConfirm) {
  var passwordParams = {
    password,
    passwordConfirm
  };
  return request.put(apiRoot + `api/user/profile/password`, passwordParams);
}

export function sendRecoverPasswordEmail(email) {
  var params = {
    email
  };
  return request.post(apiRoot + `user/password/reset`, params);
};
