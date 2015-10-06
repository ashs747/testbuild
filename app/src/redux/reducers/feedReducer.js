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
      console.log(action);
      switch (action.status) {
        case 'RESOLVED':
          var fullFeed = action.payload;
          nextState = Object.assign({}, state);
          nextState[action.payload.id] = action.payload;
          nextState[action.payload.id].files = nextState.files || [];
          return nextState;
          break;
        case 'REJECTED':
          return state;
          break;
        default:
          return state;
          break;
      }
      break;

    case "FEED_ADD_FILE":
      switch (action.status) {
        //TODO: change the localhost
        case 'RESOLVED':
          let variation = action.payload.item;
          variation.previewUrl = variation.previewUrl ? `http://localhost:8888${variation.previewUrl}` : null;
          let file = {
            reference: variation.original,
            variation: "original",
            mimeType: variation.mimeType,
            thumbnail: variation.previewUrl,
            variations: [
              variation
            ]
          };
          nextState = state;
          nextState[action.payload.feedId].files.push(file);
          return nextState;
          break;
        case 'REJECTED':
          return state;
          break;
        default:
          return state;
          break;
      }
      break;

    case "FEED_REMOVE_ATTACHMENT":
      nextState = state;
      nextState[action.payload.feedId].files.splice(action.payload.index, 1);
      return nextState;
      break;

    case "FEED_ROTATE_ATTACHMENT":
      switch (action.status) {
        case 'RESOLVED':
          nextState = state;
          let image = nextState[action.payload.feedId].files[action.payload.i];
          let modifiedImage = action.payload.variationResult[1].split("data/");
          image.thumbnail = `http://localhost:8888/v1/${modifiedImage[1]}`;
          return nextState;
          break;
        case 'REJECTED':
          return state;
          //Error Handling to be discussed;
          break;
        default:
          //show loader
          return state;
          break;
      }
      break;

    default:
      return state;
  }
};
