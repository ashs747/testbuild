import {FEED_CREATE_MESSAGE, FEED_ALLOW_EDIT, FEED_UPDATE_MESSAGE} from '../actions/feedActions';
import _ from 'underscore';

var defaultState = {};

function updateMatchedByFieldName(fieldName, value) {
  return (action) => {
    return function updateThisMessage(message) {
      if (message.id === action.payload.id) {
        message[fieldName] = (typeof(value) !== 'undefined') ? value : action.payload[fieldName];
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
  var feed;
  var nextState = {...state};

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
      
      nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('editable')(action));
      return nextState;
      break;

    case FEED_UPDATE_MESSAGE:
      feed = state[action.payload.feedID];
      
      nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('content')(action));
      return nextState;
      break;

    case 'FEED_SAVE_MESSAGE':
      feed = state[action.payload.feedID];
      switch (action.status) {
        case 'RESOLVED':
          nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('editable')(action));
          nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('pending', false)(action));
          return nextState;
          break;
        case 'REJECTED':
          // Set error flag
          nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('pending', false)(action));
          nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('err', 'Cannot post message to the server, please restart your browser and try again')(action));
          return state;
          break;
        default:
          nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('pending', true)(action));
          return state;
          break;
      }
      break;

    case 'FEED_CREATE_COMMENT':
      console.log('action', action);
      switch (action.status) {
        case 'RESOLVED':
          nextState[action.payload.feedID].messages = state[action.payload.feedID].messages.map(updateMatchedByFieldName('newComment', '')(action));
          nextState[action.payload.feedID].messages = state[action.payload.feedID].messages.map(updateMatchedByFieldName('newCommentPending', false)(action));
          console.log('new state post resolution', nextState[action.payload.feedID].messages);
          return nextState;
        case 'REJECTED':
          nextState[action.payload.feedID].messages = state[action.payload.feedID].messages.map(updateMatchedByFieldName('newCommentPending', false)(action));
          nextState[action.payload.feedID].messages = state[action.payload.feedID].messages.map(updateMatchedByFieldName('newCommentErr', 'Failed to post to server, please try logging out and back in again'));
          return nextState;
        default:
          console.log('Pending');
          nextState[action.payload.feedID].messages = state[action.payload.feedID].messages.map(updateMatchedByFieldName('newCommentPending', true)(action));
          return nextState;
      }

    case FEED_CREATE_MESSAGE:
      switch (action.status) {
        case 'RESOLVED':
          nextState[action.payload.feedID].newMessagePending = false;
          nextState[action.payload.feedID].newMessageContent = '';
          return nextState;
          break;
        case 'REJECTED':
        // Error Handling to be discussed;
          nextState[action.payload.feedID].newMessagePending = false;
          nextState[action.payload.feedID].newMessageErr = 'Could not post your message.';
          return {
            ...state,
            error: 'Could not post new message'
          };
          break;
        default:
          nextState[action.payload.feedID].newMessagePending = true;
          return nextState;
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
          nextState[action.payload.id] = {...action.payload};
          nextState[action.payload.id].messages = [...action.payload.messages];
          nextState[action.payload.id].files = action.payload.files || [];
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
          let payload = action.payload;
          let metaPreviewURL = _.findWhere(payload.metadata, {key: "url"});
          payload.previewUrl = metaPreviewURL.value;

          let splitUrl = payload.previewUrl.split("/upload/");

          payload.thumbnail = `${splitUrl[0]}/upload/c_fill,h_200,w_200/${splitUrl[1]}`;
          nextState[action.payload.feedId].files = [...state[action.payload.feedId].files || [], payload];
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
