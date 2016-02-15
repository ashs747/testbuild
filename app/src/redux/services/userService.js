// UserService: Deals with users.
import config from '../../localConfig';
import store from '../store';
import requesty from '../../request';

 /*eslint-disable camelcase */
var request = requesty();
let apiRoot = config.api ? config.api.url : '';

export function updateUserData() {
  var params = store.getState().user;
  if (!params.password || !params.passwordConfirm || !params.forename || !params.surname) {
    return Promise.reject("Please fill out all form fields");
  }
  if (params.password !== params.passwordConfirm) {
    return Promise.reject("Passwords do not match");
  }
  var filteredParams = {
    password: params.password,
    confirm_password: params.passwordConfirm,
    forename: params.forename,
    surname: params.surname,
    properties: params.properties
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
    properties: params.properties
  };
  return request.put(apiRoot + `api/user/profile`, filteredParams);
}

export function updateUserProfilePicture(fileId) {
  return request.post(apiRoot + 'api/upload/profile-picture', {fileId: fileId})
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
 /*eslint-enable camelcase */
