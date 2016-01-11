import authService from './authService';
import cookie from 'cookie-cutter';
import userService from './userService';
import config from '../configs/appConfig';

var currentUser;

export default {
  login(username, password, clientId, onAuth) {
    return authService.login(username, password, clientId)
      .then(data => {
        return this._onAuthorisation(data, onAuth);
      }
    );
  },
  ssoLogin(rs, createdDate, userId, digest, clientId, onAuth) {
    return authService.ssoLogin(rs, createdDate, userId, digest, clientId)
      .then(data => {
        return this._onAuthorisation(data, onAuth);
      });
  },
  checkToken() {
    var authToken = cookie.get('authToken');
    if (!authToken) {
      return Promise.resolve();
    } else {
      var userId = cookie.get('userId');
      return authService.checkToken(userId, authToken)
        .then(authData => {
          if (!authData.success) {
            return Promise.reject('unsuccessful token check, logging out');
          }
          /*eslint-disable camelcase */
          authData = {
            access_token: authToken,
            refresh_token: cookie.get('refreshToken'),
            expires_in: cookie.get('expiresIn'),
            user_id: userId
          };
          /*eslint-enable camelcase */
          return this._onAuthorisation(authData);

        }).catch((err) => {
          this.logout();
        });
    }
    return Promise.resolve();
  },
  _onAuthorisation(authData, onAuth) {
    if (onAuth) {
      onAuth();
    }
    this.setTokens(authData);
    var promises = [];
    promises.push(authService.getUser(authData.user_id));
    promises.push(userService.getProfilePicture(authData.user_id));
    return Promise.all(promises)
      .then(values => {
        var user = values[0];
        var userFiles = values[1];
        user.files = userFiles._embedded.file;
        currentUser = user;
        config.timezone = user.timezone;
        return currentUser;
      });
  },
  setTokens(data) {
    config.api.authToken = data.access_token;

    cookie.set('userId', data.user_id);
    cookie.set('authToken', data.access_token);
    cookie.set('refreshToken', data.refresh_token);
    cookie.set('expiresIn', data.expires_in);
    cookie.set('loginType', data.loginType);
  },
  isLoggedIn() {
    return currentUser != undefined;
  },
  getCurrentUser() {
    if (!currentUser) {
      throw new Error('User is not set, check with isLoggedIn()');
    }
    return currentUser;
  },
  logout() {
    var expiredDate = new Date(0);
    var appCookies = ['userId', 'authToken', 'refreshToken', 'expiresIn', 'loginType'];
    appCookies.forEach(cookieName => {
      cookie.set(cookieName, '', {expires: expiredDate});
    });
    currentUser = undefined;
    delete config.api.authToken;
  }

};
