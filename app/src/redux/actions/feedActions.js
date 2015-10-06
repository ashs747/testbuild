//feedActions
import {deleteMessage, postMessage, getLatestFeedMessages, getFeedMessages, postUpdatedMessage} from '../services/feedService';
import {generateVariations, rotate, getThumbnail} from '../services/uploadService';
import store from '../store.js';

export const FEED_CREATE_MESSAGE = 'FEED_CREATE_MESSAGE';
export const FEED_UPDATE_MESSAGE = 'FEED_UPDATE_MESSAGE';
export const FEED_ALLOW_EDIT = 'FEED_ALLOW_EDIT';
export const FEED_SAVE_MESSAGE = 'FEED_SAVE_MESSAGE';
export const FEED_DELETE_MESSAGE = 'FEED_DELETE_MESSAGE';
export const FEED_FETCHED = 'FEED_FETCHED';

export const createMessage = (feedID, messageContent) => {
  let asyncResponse = postFeedContent(messageContent);
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

export const fetchLatestFeedMessages = (programmeID, cohortID) => {
  let payload = getFeedMessages(programmeID, cohortID);
  return {
    type: 'FEED_FETCHED',
    payload
  };
};

export const addFile = (file, variationObj, feedId) => {
  let payload = generateVariations(file.optimisedName, variationObj).then((response) => {
    return {
      item: response[0],
      feedId
    };
  });
  return {
    type: 'FEED_ADD_FILE',
    payload
  };
};

export const removeAttachment = (feedId, index) => {
  return {
    type: 'FEED_REMOVE_ATTACHMENT',
    payload: {
      feedId,
      index
    }
  };
};

export const rotateAttachment = (feedId, i, variations) => {
  let payload = rotate(variations).then((result) => {
    let randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    let variationResult = [
      result.fileName[0].concat('?x=' + randomString),
      result.fileName[1].concat('?x=' + randomString)
    ];
    return {
      feedId, i, variationResult
    };
  });
  return {
    type: 'FEED_ROTATE_ATTACHMENT',
    payload
  };
};

export const embedVideo = (feedId, url) => {
  let payload = getThumbnail(url).then((response) => {
    return {
      thumbnail: response,
      feedId
    }
  });
  return {
    type: 'FEED_EMBED_VIDEO',
    payload
  }
};
