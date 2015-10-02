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
      feed = state[action.payload.feedID];
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
      console.log(action);
      switch (action.status) {
        //TODO: change the localhost
        case 'RESOLVED':
          nextState = state;
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
