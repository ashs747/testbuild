//feedActions
import {postUpdatedMessage, postMessage, postComment, deleteMessage, patchMessage, getFeedMessages, updateMeta} from '../services/feedService';
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

export const createComment = (feedID, messageID) => {
  let message = {};
  var dispatch = store.dispatch;
  message.parent = messageID;
  message.content = store.getState().feeds[feedID].messages.reduce((prev, cur) => {
    if (cur.id === messageID) {
      if (cur.newComment) {
        return prev + cur.newComment;
      }
    }
    return prev;
  }, '');

  if (message.content && message.content.trim().length >= 1) {
    let response = postMessage(feedID, message, messageID)
      .then((res) => {
        dispatch(updateNewMessage(feedID, '', messageID));
        dispatch(fetchLatestFeedMessages(feedID));
        var out = res.text;
        return {feedID, message: out};
      });
    response.feedID = feedID;
    response.id = messageID;
    
    return {
      type: 'FEED_CREATE_COMMENT',
      payload: response
    };
  } else {
    alert("Sorry, blank replies aren't allowed");
    return {
      type: "NO_OP"
    };
  }
};

/**
 * Dispatches a delete handler to request a post is removed from the server
 */
export const deleteMessageFromFeed = (feedID, messageID) => {
  let asyncResponse = deleteMessage(messageID).then((result) => {
    store.dispatch(fetchLatestFeedMessages(feedID));
    
    return {...result, feedID, messageID};
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

export function updateNewMessage(feedID, messageContent, messageID) {
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
  if (message.content.trim().length < 1) {
    alert("You can't post a blank message, please enter some text");
  } else {
    var payload = postUpdatedMessage(feedID, messageID, message)
      .then((res) => {
        dispatch(setEditable(feedID, messageID, false));
        return res.text;
      })
      .then((resParsed) => {
        dispatch(fetchLatestFeedMessages(feedID));
        return {...resParsed,
          feedID};
      });
    payload = {...payload,
      feedID,
      messageID,
      commentID};

    return {
      type: 'FEED_SAVE_MESSAGE',
      payload
    };
  }
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

export const rotateAttachment = (feedId, imageId, imageRotation) => {
  imageRotation = imageRotation || 0;
  let newImageRotation = (imageRotation === 270) ? 0 : imageRotation + 90;
  let updatedMeta = {
    metaData: {
      rotate: imageRotation
    }
  };
  let returnedFile = updateMeta(imageId, updatedMeta).then((file) =>{
    return {
      file,
      feedId
    };
  });
  return {
    type: 'FEED_UPDATE_FILE',
    payload: returnedFile
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

export const createMessage = (feedID) => {
  var dispatch = store.dispatch;
  var message = {};
  var files = store.getState().feeds[feedID].files || [];
  message.content = store.getState().feeds[feedID].newMessageContent;
  
  message.files = files.length > 0 ? files.map((file) => {
    return file.id;
  }) : undefined;

  if (message.content && (message.content.trim().length > 0)) {
    let asyncResponse = postMessage(feedID, message)
      .then((res) => {
        dispatch(fetchLatestFeedMessages(feedID));
        var out = res.text;
        return {feedID, message: out};
      });

    asyncResponse.feedID = feedID;
    return {
      type: FEED_CREATE_MESSAGE,
      payload: asyncResponse
    };
  } else {
    alert("Cannot save a blank message!");
    return {
      type: 'NO_OP'
    };
  }
};
