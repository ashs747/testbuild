//feedActions
import {postUpdatedMessage, postMessage, postComment, deleteMessage, patchMessage, getFeedMessages} from '../services/feedService';
import store from '../store.js';
export const FEED_CREATE_MESSAGE = 'FEED_CREATE_MESSAGE';
export const FEED_UPDATE_MESSAGE = 'FEED_UPDATE_MESSAGE';
export const FEED_ALLOW_EDIT = 'FEED_ALLOW_EDIT';
export const FEED_SAVE_MESSAGE = 'FEED_SAVE_MESSAGE';
export const FEED_DELETE_MESSAGE = 'FEED_DELETE_MESSAGE';
export const FEED_FETCHED = 'FEED_FETCHED';

function findMessageByID(messages, messageID) {
  var targetMessage;
  for (let i = 0; i < messages.length; i += 1) {
    if (messages[i].id === messageID) {
      targetMessage = messages[i];
    }
  }
  return targetMessage;
}

export const createMessage = (feedID) => {
  var dispatch = store.dispatch;
  var message = {};
  message.content = store.getState().feeds[feedID].newMessageContent;
  message.files = store.getState().feeds[feedID].files.reduce((file) => {
    return file.id;
  });
  console.log('message', message);
  let asyncResponse = postMessage(feedID, JSON.stringify(message))
    .then((res) => {
      dispatch(fetchLatestFeedMessages(feedID));
      var out = JSON.parse(res.text);
      return {feedID, message: out};
    });
  return {
    type: FEED_CREATE_MESSAGE,
    payload: asyncResponse
  };
};

/**
 * Dispatches a delete handler to request a post is removed from the server
 */
export const deleteMessageFromFeed = (feedID, messageID) => {
  let asyncResponse = deleteMessage(messageID).then((result) => {
    store.dispatch(fetchLatestFeedMessages(feedID));
    var resultText = JSON.parse(result.text);
    return {...resultText, feedID, messageID};
  });

  return {
    type: 'FEED_DELETE_MESSAGE',
    payload: asyncResponse
  };
};

export const setEditable = (feedID, messageID, canEdit) => {
  return {
    type: 'FEED_ALLOW_EDIT',
    payload: {
      id: messageID,
      editable: canEdit,
      feedID: feedID
    }
  };
};

/**
 *
 * OnChange Action dispatched when a new post is being
 * written-out
 */

export const updateNewMessage = (feedID, messageContent, messageID) => {
  return {
    type: 'FEED_UPDATE_NEW_POST',
    payload: {
      feedID: feedID,
      content: messageContent,
      parent: messageID || ''
    }
  };
};

/**
 * OnChange action dispatched when an editable field has its contents changed;
 * this is how the state gets updates to messageContent
 */

export const updateMessage = (feedID, messageID, messageContent) => {
  return {
    type: 'FEED_UPDATE_MESSAGE',
    payload: {
      id: messageID,
      content: messageContent,
      feedID: feedID
    }
  };
};

/**
 * Pushes the value of a message that's stored in appState up to the server
 * accepts a messageID:String
 */

export const saveUpdatedMessage = (feedID, messageID, commentID) => {
  var messages = store.getState().feeds[feedID].messages;
  var message = findMessageByID(messages, messageID);
  var dispatch = store.dispatch;
  if (commentID) {
    message = findMessageByID(message.comments, commentID);
    messageID = commentID;
  }

  var payload = postUpdatedMessage(feedID, messageID, JSON.parse(message))
    .then((res) => {
      dispatch(setEditable(feedID, messageID, false));
      return JSON.parse(res.text);
    })
    .then((resParsed) => {
      dispatch(fetchLatestFeedMessages(feedID));
      return {...resParsed,
        feedID};
    });

  return {
    type: 'FEED_SAVE_MESSAGE',
    payload
  };
};

export const fetchLatestFeedMessages = (feedID) => {
  let payload = getFeedMessages(feedID);
  return {
    type: 'FEED_FETCHED',
    payload
  };
};

export const addFile = (file, feedId) => {
  let payload = Promise.resolve({
    ...file.file, feedId
  });
  return {
    type: 'FEED_ADD_FILE',
    payload
  };
};

export const removeAttachment = (feedId, imageId) => {
  return {
    type: 'FEED_REMOVE_ATTACHMENT',
    payload: {
      feedId, imageId
    }
  };
};

export const rotateAttachment = (feedId, imageId) => {
  return {
    type: 'FEED_ROTATE_ATTACHMENT',
    payload: {
      feedId, imageId
    }
  };
};

export const embedVideo = (feedId, url) => {
  let videoCode = url.split("?v=");
  videoCode = videoCode[1].split("&");
  let thumbnail = `http://img.youtube.com/vi/${videoCode[0]}/0.jpg`;
  let payload = Promise.resolve({
    thumbnail,
    feedId
  });
  return {
    type: 'FEED_EMBED_VIDEO',
    payload
  };
};
