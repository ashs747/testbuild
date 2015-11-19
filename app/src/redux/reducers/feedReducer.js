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
  console.log(action);
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
      nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('editable')(action));
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
          nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('editable')(action));
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
          nextState = {...state};
          nextState[action.payload.feedID].messages.unshift(action.payload.message);
          nextState[action.payload.feedID].newMessageContent = '';
          return nextState;
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
          var ns = {...state};
          ns[action.payload.id] = {...action.payload};
          ns[action.payload.id].messages = [...action.payload.messages];
          ns[action.payload.id].files = action.payload.files || [];
          return ns;
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
      console.log(action.payload);
      switch (action.status) {
        case 'RESOLVED':
          let payload = action.payload;
          let metaPreviewURL = _.findWhere(payload.metadata, {key: "url"});
          console.log('mpu', metaPreviewURL);

          payload.previewUrl = metaPreviewURL.value;

          let splitUrl = payload.previewUrl.split("/upload/");
          console.log('spliturl', splitUrl);

          payload.thumbnail = `${splitUrl[0]}/upload/c_fill,h_200,w_200/${splitUrl[1]}`;
          console.log(payload.thumbnail);
          nextState = Object.assign({}, state);
          console.log(nextState);
          nextState[action.payload.feedId].files = [...state[action.payload.feedId].files || [], payload];
          console.log(nextState);
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
      return nextState;
      break;

    case "FEED_DELETE_MESSAGE":
      switch (action.status) {
        case 'RESOLVED':
          nextState = {...state};
          var messages = state[action.payload.feedID].messages.filter((el) => {
            return action.payload.messageID !== el.id;
          });

          nextState[action.payload.feedID].messages = messages;
          return nextState;
        
        default: 
          return {...state};
      }

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
