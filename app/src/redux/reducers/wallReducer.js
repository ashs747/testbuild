var defaultState = {};

function formatEvidence(fileObj) {
  var file = fileObj.file;
  var formatFileObj = {
    id: file.id,
    metadata: file.metadata
  };
  switch (file.reference) {
    case "cloudinary":
      formatFileObj.type = "image";
      break;
    case "vimeo":
    case "youtube":
      formatFileObj.type = "video";
      break;
  }
  var url;
  var rotate;
  file.metadata.forEach(meta => {
    if (meta.key === "url") {
      url = meta.value;
    }
    if (meta.key === "rotate") {
      rotate = meta.value;
    }
  });
  if (rotate) {
    var splitUrl = url.split("/");
    splitUrl.splice(6, 0, `a_${rotate}`);
    url = splitUrl.join("/");
  }
  formatFileObj.url = url;
  return formatFileObj;
}

export const reducer = (state = defaultState, action) => {
  var newState = {...state};
  var wall;

  if (action.payload && action.payload.wallID) {
    wall = newState[action.payload.wallID];
  }

  switch (action.type) {
    case "FETCH_WALLS":
      switch(action.status) {
        case "RESOLVED":
          var nextState = {...state};
          action.payload.forEach(wall => {
            nextState[wall.id] = wall;
          });
          return nextState;
        case "PENDING":
          return {...state};
        case "REJECTED":
          return state;
      }
      return state;
    case "UPDATE_WALL_POST_FIELD":
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          post[action.payload.field] = action.payload.value;
        }
        return post;
      });
      return newState;
    case "UPDATE_WALL_EVIDENCE":
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          post['evidence'] = formatEvidence(action.payload.fileObj);
        }
        return post;
      });
      return newState;
    case 'UPDATE_INFO_BOX':
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          post['infoBox'] = {
            msg: action.payload.msg,
            type: action.payload.type
          }
        }
        return post;
      });
      return newState;
    case 'REMOVE_INFO_BOX':
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          post['infoBox'] = null;
        }
        return post;
      });
      return newState;
    case 'REMOVE_WALL_EVIDENCE':
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          if (post['postedOn']) {
            post['tempEvidence'] = post['evidence'];
          }
          post['evidence'] = null;
        }
        return post;
      });
      return newState;
    case 'POST_EVIDENCE':
      switch (action.status) {
        case "RESOLVED":
          wall.posts = wall.posts.map(post => {
            if (post.id === action.payload.post.id) {
              post = action.payload.post
              post['pending'] = false;
            }
            return post;
          });
          window.location.href = `/#/connections-wall/${action.payload.activityId}?viewPost=0`;
          return newState;
        case "REJECTED":
          wall.posts = wall.posts.map(post => {
            if (post.id === action.payload.postID) {
              post['pending'] = false;
              post['infoBox'] = {
                msg: 'error',
                type: 'danger'
              };
            }
            return post;
          });
          return newState;
        case "PENDING":
          wall.posts = wall.posts.map(post => {
            if (post.id === action.payload.postID) {
              post['pending'] = true;
            }
            return post;
          });
          return newState;
      }
    case 'REMOVE_TEMP_DATA':
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          if (post['tempEvidence']) {
            post['evidence'] = post['tempEvidence'];
          }
          post['tempEvidence'] = null;
          post['tempTitle'] = null;
          post['tempDescription'] = null;
        }
        return post;
      });
      return newState;
    case 'CHANGE_EDIT_STATE':
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          post['editing'] = action.payload.editState;
        }
        return post;
      });
      return newState;
    case 'ROTATED_IMAGE':
      switch (action.status) {
        case 'RESOLVED':
          wall.posts = wall.posts.map(post => {
            if (post.id === action.payload.postID) {
              post['evidence'] = formatEvidence(action.payload.file);
              post['pending'] = false;
            }
            return post;
          });
          return newState;
        case 'REJECTED':
          return state;
        case 'PENDING':
          wall.posts = wall.posts.map(post => {
            if (post.id === action.payload.postID) {
              post['pending'] = true;
            }
            return post;
          });
          return newState;
          return state;
      }
    default:
      return state;
  }
};
