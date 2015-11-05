import {FEED_CREATE_MESSAGE, FEED_ALLOW_EDIT, FEED_UPDATE_MESSAGE} from '../actions/feedActions';
import _ from 'underscore';

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
    case 'LOGOUT':
      return {};

    case 'COOKIE_CHECKED':
      if (action.status === 'RESOLVED') {
        if (Object.keys(state).length < 1) {
          return {
            ...state,
            ...action.payload.feeds
          };
        }
      }
      return state;
      break;

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
          return {
            ...state,
          };
          break;
        case 'REJECTED':
        // Error Handling to be discussed;
          return {
            ...state,
            error: 'Could not post new message'
          };
          break;
        default:
          return state;
          break;
      }
      break;

    case 'FEED_UPDATE_NEW_POST':

      var parentID = action.payload.parent;
      var feedID = action.payload.feedID;
      var content = action.payload.content;
      nextState = Object.assign({}, state);

      /* Do we have a parent message? */
      if (parentID) {
        nextState[feedID].messages = state[feedID].messages.map((message) => {
          if (message.id === parentID) {
            return {
              ...message,
              newComment: content
            };
          }
          return message;
        });
      } else {
        nextState[feedID].newMessageContent = action.payload.content;
      }

      return nextState;
      break;

    case "FEED_FETCHED":
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
        case 'RESOLVED':
          let payload = action.payload.file;
          payload.previewUrl = _.findWhere(payload.metadata, {metaKey: "url"}).metaValue;
          let splitUrl = payload.previewUrl.split("/upload/");
          payload.thumbnail = `${splitUrl[0]}/upload/c_limit,h_200,w_200/${splitUrl[1]}`;
          nextState = Object.assign({}, state);
          nextState[action.payload.feedId].files = [...state[action.payload.feedId].files, payload];
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
      nextState = Object.assign({}, state);
      nextState[action.payload.feedId].files = state[action.payload.feedId].files.filter((el) => {
        return action.payload.imageId != el.id;
      });
      return nextState;
      break;

    case "FEED_ROTATE_ATTACHMENT":
      nextState = Object.assign({}, state);
      console.log(nextState[action.payload.feedId].files);

      return nextState;
      break;

    case "FEED_EMBED_VIDEO":
      switch (action.status) {
        case 'RESOLVED':
          nextState = Object.assign({}, state);
          let file = {
            previewUrl: null,
            reference: "vimeo",
            mimeType: "video/vimeo",
            thumbnail: action.payload.thumbnail
          };
          nextState[action.payload.feedId].files = [...state[action.payload.feedId].files, file];
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
