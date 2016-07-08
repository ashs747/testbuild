var defaultState = {};

function formatEvidence(fileObj) {
  var file = fileObj.file;
  var formatFileObj = {};
  switch (file.reference) {
    case "cloudinary":
      formatFileObj.type = "image";
      break;
    case "vimeo":
    case "youtube":
      formatFileObj.type = "video";
      break;
  }
  file.metadata.forEach(meta => {
    if (meta.key === "url") {
      formatFileObj.url = meta.value;
    }
  });
  return formatFileObj;
}

export const reducer = (state = defaultState, action) => {
  var wall;
  var newState;
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
      newState = {...state};
      wall = newState[action.payload.wallID];
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          post[action.payload.field] = action.payload.value;
        }
        return post;
      });
      return newState;
    case "UPDATE_WALL_EVIDENCE":
      newState = {...state};
      wall = newState[action.payload.wallID];
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          post['tempEvidence'] = formatEvidence(action.payload.fileObj);
        }
        return post;
      });
      return newState;
    case 'UPDATE_INFO_BOX':
      newState = {...state};
      wall = newState[action.payload.wallID];
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
      newState = {...state};
      wall = newState[action.payload.wallID];
      wall.posts = wall.posts.map(post => {
        if (post.id === action.payload.postID) {
          post['infoBox'] = null;
        }
        return post;
      });
      return newState;
    default:
      return state;
  }
};
