//feedActions
import {postMessage, postComment, deleteMessage, patchMessage, getFeedMessages} from '../services/feedService';
import store from '../store.js';

export const FEED_CREATE_MESSAGE = 'FEED_CREATE_MESSAGE';
export const FEED_UPDATE_MESSAGE = 'FEED_UPDATE_MESSAGE';
export const FEED_ALLOW_EDIT = 'FEED_ALLOW_EDIT';
export const FEED_SAVE_MESSAGE = 'FEED_SAVE_MESSAGE';
export const FEED_DELETE_MESSAGE = 'FEED_DELETE_MESSAGE';
export const FEED_FETCHED = 'FEED_FETCHED';

export const createMessage = (feedID, messageContent) => {
  let asyncResponse = postMessage(feedID, messageContent);
  return {
    type: FEED_CREATE_MESSAGE,
    payload: asyncResponse
  };
};

/**
 * Dispatches a delete handler to request a post is removed from the server
 */
export const deleteMessageFromFeed = (feedID, messageID) => {
  let asyncResponse = deleteMessage(messageID);
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
      editing: canEdit,
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

export const saveUpdatedMessage = (feedID, messageID) => {
  //let payload = feedService.postUpdatedMessage(store.);
  let payload = Promise.resolve({
    editing: false,
    feedID,
    id: messageID
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
    file, feedId
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
  console.log("rotate attachment: ", feedId, imageId);
};

export const embedVideo = (feedId, url) => {
  let payload = getThumbnail(url).then((response) => {
    return {
      thumbnail: response,
      feedId
    };
  });
  return {
    type: 'FEED_EMBED_VIDEO',
    payload
  };
};
