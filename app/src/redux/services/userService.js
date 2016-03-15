// UserService: Deals with users.
import config from '../../localConfig';
import store from '../store';
import requesty from '../../request';

 /*eslint-disable camelcase */
var request = requesty();
let apiRoot = config.api ? config.api.url : '';

export function updateUserData() {
  var params = store.getState().user;
  console.log(params);
  var requestObj = {
    update_profile: {
      title: params.title,
      forename: params.forename,
      surname: params.surname,
      properties: params.properties,
      timezone: params.timezone,
      plainPassword: {
        password: (params.password) ? params.password : "",
        confirm_password: (params.passwordConfirm) ? params.passwordConfirm : ""
      }
    }
  };
  return request.put(apiRoot + `api/user/profile`, requestObj);
}

export function updateUserProfile() {
  var params = store.getState().user;
  var requestObj = {
    update_profile: {
      title: params.title,
      forename: params.forename,
      surname: params.surname,
      timezone: params.timezone,
      properties: params.properties
    }
  };
  return request.put(apiRoot + `api/user/profile`, requestObj);
}

export function updateUserProfilePicture(fileId) {
  return request.post(apiRoot + 'api/upload/profile-picture', {fileId: fileId})
}

export function updateUserPassword(password, confirm_password) {
  var passwordParams = {
    password_update: {
      password: {
        password,
        confirm_password
      }
    }
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
