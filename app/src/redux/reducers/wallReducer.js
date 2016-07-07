var defaultState = {};

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
    default:
      return state;
  }
};
