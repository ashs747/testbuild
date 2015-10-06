import {FEED_CREATE_MESSAGE, FEED_ALLOW_EDIT, FEED_UPDATE_MESSAGE} from '../actions/feedActions';

var defaultState = {
  testTwo: {
    messages: [{
      id: 0,
      user: {
        forename: "Test",
        surname: "User",
        profilePic: {
          reference: "profile-pic"
        }
      },
      content: "This is a comment",
      date: "2015-09-29T09:30:32",
      editing: false,
      userCanEdit: true,
      comments: [{
        id: 1,
        user: {
          forename: "Test",
          surname: "User",
          profilePic: {
            reference: "profile-pic"
          }
        },
        content: "This is a comment",
        date: "2015-09-29T09:30:32",
        editing: false,
        userCanEdit: true
      }]
    }],
    files: []
  }
};

export const feedReducer = (state = defaultState, action) => {
  var feed, nextState;

  function updateMatchedByFieldName(fieldName) {
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

  switch (action.type) {
    case FEED_ALLOW_EDIT:
      feed = statert[action.payload.feedID];
      nextState = Object.assign({}, ...state);
      nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('editing'));
      return nextState;
      break;

    case FEED_UPDATE_MESSAGE:
      feed = state[action.payload.feedID];
      nextState = Object.assign({}, ...state);
      nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('content'));
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
          //some kind of error handling
          console.log(action);
          return state;
          break;
        default:
          return state;
          //show a loader
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
          console.log(action);
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
