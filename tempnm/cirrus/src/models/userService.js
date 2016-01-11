import request from '../services/request';

function getProfilePicture(userId) {
  var params = {
    embed: 'variations',
    query: [{
      field: "context",
      type: "eq",
      value: "profile-picture"
    }, {
      field: "variation",
      type: "eq",
      value: "original"
    }, {
      field: "user",
      type: "eq",
      value: userId
    }]
  };
  return request.get('/file', params).end();
}

function saveUser(userId, user) {
  return request.patch(`/user/${userId}`, user).end();
}

export default {
  getProfilePicture: getProfilePicture,
  saveUser: saveUser
};
