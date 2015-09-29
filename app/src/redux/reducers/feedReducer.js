import {FEED_CREATE_MESSAGE, FEED_ALLOW_EDIT} from '../actions/feedActions';

export const FeedReducer = (state = {}, action) => {

  function editPayloadMapper(message) {
    if (message.id === action.payload.id) {
      message.editing = action.payload.editing;
    }
    if (message.comments && (message.comments.length > 0)) {
      message.comments = message.comments.map(editPayloadMapper);
    }
    return message;
  };

  switch (action.type) {
    case FEED_ALLOW_EDIT:
      var Feed = state.Feeds[action.payload.feedID];
      var nextState = {...state};
      nextState.Feeds[action.payload.feedID].messages = Feed.messages.map(editPayloadMapper);
      return nextState;
      break;

    case FEED_CREATE_MESSAGE:
      switch (action.payload.status) {
        case 'RESOLVED':
        // Add to state, clear editbox text
          break;
        case 'REJECTED':
        // Error Handling to be discussed;
          break;
        default:

          break;
      }
      break;

    case FEED_UPDATE:
      switch (action.payload.status) {
        case 'RESOLVED':
          // Set loading false on this feed,
          // Merge NewPosts to state;
          break;

        case 'REJECTED':
          // Set loading false on this feed;
          break;

        default:
          // Set loading to true on this feed;
          break;
      }

      break;

    default:
      return state;
  }
};