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
          post['tempEvidence'] = formatEvidence(action.payload.fileObj);
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
    default:
      return state;
  }
};
