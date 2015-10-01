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
  }
};

export const feedReducer = (state = defaultState, action) => {
  
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
      var feed = state[action.payload.feedID];
      var nextState = {...state};
      nextState[action.payload.feedID].messages = feed.messages.map(updateMatchedByFieldName('editing'));
      return nextState;
      break;
      
    case FEED_UPDATE_MESSAGE:
      var feed = state[action.payload.feedID];
      var nextState = {...state};
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

    default:
      return state;
  }
};
