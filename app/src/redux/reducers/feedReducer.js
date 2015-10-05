import {FEED_CREATE_MESSAGE, FEED_ALLOW_EDIT, FEED_UPDATE_MESSAGE} from '../actions/feedActions';

var defaultState = {};

function updateMatchedByFieldName(fieldName) {
  return (action) => {
    return function updateThisMessage(message) {
      if (message.id === action.payload.id) {
        message[fieldName] = action.payload[fieldName];
      }
      if (message.comments && (message.comments.length > 0)) {
        // Recurse
        message.comments = message.comments.map(updateThisMessage);
      }
      return message;
    };
  };
};

export const feedReducer = (state = defaultState, action) => {
  var feed, nextState;

  switch (action.type) {
    case FEED_ALLOW_EDIT:
      feed = state[action.payload.feedID];
      nextState = Object.assign({}, state);
      nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('editing')(action));
      return nextState;
      break;

    case FEED_UPDATE_MESSAGE:
      feed = state[action.payload.feedID];
      nextState = Object.assign({}, state);
      nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('content')(action));
      return nextState;
      break;

    case 'FEED_SAVE_MESSAGE':
      switch (action.status) {
        case 'RESOLVED':
          feed = state[action.payload.feedID];
          nextState = Object.assign({}, state);
          nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('editing')(action));
          return nextState;
          break;
        case 'REJECTED':
          // Set error flag
          return state;
          break;
        default:
          //Pending state
          return state;
          break;
      }
      break;

    case FEED_CREATE_MESSAGE:
      switch (action.status) {
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

    case "FEED_FETCHED":
      switch (action.status) {
        case 'RESOLVED':
          var fullFeed = action.payload;
          nextState = Object.assign({}, state);
          nextState[action.payload.id] = action.payload;
          nextState[action.payload.id].files = nextState.files || [];
          break;
        case 'REJECTED':
        // Error Handling to be discussed;
          break;
        default:

          break;
      }
      break;

    case "FEED_ADD_FILE":
      switch (action.status) {
        //TODO: change the localhost
        case 'RESOLVED':
          nextState = Object.assign({}, state);
          let variation = action.payload.item;
          variation.folder = "message-board";
          variation.context = "message-board";
          variation.status = "active";
          variation.previewUrl = `http://localhost:8888${variation.previewUrl}`;
          let file = {
            reference: variation.original,
            folder: "message-board",
            variation: "original",
            context: "message-board",
            status: "active",
            mimeType: variation.mimeType,
            variations: [
              variation
            ]
          };
          var nextFeed = nextState[action.payload.feedId];
          nextFeed.files.push(file);
          return nextState;
          break;
        case 'REJECTED':
          //some kind of error handling
          console.log('called');
          return state;
          break;
        default:
          return state;
          //show a loader
          break;
      }
      break;

    default:
      return state;
  }
};
