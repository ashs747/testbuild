var defaultState = {};

function updateStateField(state, payload) {
  var walls = state.walls;
  var idx;
  for (var i = 0; i < walls.length; i++) {
    if (walls[i].id === payload.wallID) {
      idx = i;
      break;
    }
  }
  if (walls[idx]) {
    var newWallPosts = walls[idx].posts.map((post, i) => {
      if (post.id === payload.postID) {
        post[payload.field] = payload.value;
      }
      return post;
    })
  }
  var newState = state;
  state.walls[idx].posts = newWallPosts;
  return {...state, walls};
}

export const reducer = (state = defaultState, action) => {
  var wall;

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
      return newState;
    default:
      return state;
  }
};
