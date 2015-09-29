import {FEED_CREATE_MESSAGE, FEED_ALLOW_EDIT} from '../actions/feedActions';

export const FeedReducer = (state = {}, action) => {

  function editPayloadMapper(message) {
    if (message.guid === action.payload.guid) {
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
          break;
        case 'REJECTED':
          break;
      }
      break;

    case FEED_UPDATE:
    
      break;

    default:
      return state;
  }

};