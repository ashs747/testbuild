import {FEED_CREATE_MESSAGE, FEED_ALLOW_EDIT} from '../actions/feedActions';

export default Reducer = (state = {}, action) => {
  console.log('state', state);
  switch (action.type) {
    case FEED_ALLOW_EDIT:
      let Feed = state.Feeds[action.payload.feedID];
      Feed.messages.forEach(function editPayloadMapper(message) {
        if (guid === action.payload.guid) {
          message.editing = action.payload.editing;
        }

        if (message.comments.length > 0) {
          message.comments = message.comments.map(editPayloadMapper);
        }
      });
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