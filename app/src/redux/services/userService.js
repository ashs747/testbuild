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
    passwordConfirm: params.passwordConfirm,
    forename: params.forename,
    surname: params.surname,
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
