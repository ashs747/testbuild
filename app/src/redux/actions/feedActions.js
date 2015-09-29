//feedActions
import feedService from '../services/feedService';
import store from '../store.js';

export const FEED_CREATE_MESSAGE = 'FEED_CREATE_MESSAGE';
export const FEED_UPDATE_MESSAGE = 'FEED_UPDATE_MESSAGE';
export const FEED_ALLOW_EDIT = 'FEED_ALLOW_EDIT';
export const FEED_SAVE_MESSAGE = 'FEED_SAVE_MESSAGE';
export const FEED_DELETE_MESSAGE = 'FEED_DELETE_MESSAGE';

export const createMessage = (feedID, messageContent) => {
  let asyncResponse = feedService.postFeedContent(messageContent);
  return {
    type: FEED_CREATE_MESSAGE,
    payload: asyncResponse
  };
};

/**
 * Dispatches a delete handler to request a post is removed from the server
 */
export const deleteMessageFromFeed = (feedID, messageID) => {
  let asyncResponse = feedService.deleteFeedContent(messageID);
  return {
    type: 'FEED_DELETE_MESSAGE',
    feedID: feedID,
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
 * OnChange action dispatched when an editable field has its contents changed;
 * this is how the state gets updates to messageContent
 */

export const updateMessage = (feedID, messageID, messageContent) => {
  let asyncResponse = feedService.deleteFeedContent(messageID);
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
  //let asyncResponse = feedService.saveUpdatedMessage(store.);
  //return {
  //  type: 'FEED_SAVE_MESSAGE',
  //  payload: asyncResponse
  //}
};