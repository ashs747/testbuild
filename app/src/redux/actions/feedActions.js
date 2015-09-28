//feedActions

import feedService from '../services/feedService';
import store from '../store.js';

export const createMessage = (messageContent) => {
	let asyncResponse = feedService.postFeedContent(messageContent);
	return {
		type: 'FEED_CREATEMESSAGE',
		payload: asyncResponse;
	}
}

/**
 * Dispatches a delete handler to request a post is removed from the server
 */
export const deleteMessage = (messageID) => {
	let asyncResponse = feedService.deleteFeedContent(messageID);
	return {
		type: 'FEED_DELETE_MESSAGE',
		payload: asyncResponse
	}
}

export const setEditable = (messageID, canEdit) => {
	return {
		type: 'FEED_ALLOW_EDIT',
		payload: {
			id: messageID,
			editable: canEdit
		}
	}
}

/**
 * OnChange action dispatched when an editable field has its contents changed;
 * this is how the state gets updates to messageContent
 */

export const updateMessage(messageID, messageContent) => {
	let asyncResponse = feedService.deleteFeedContent(messageID);
	return {
		type: 'FEED_UPDATE_MESSAGE',
		payload: {
			id: messageID,
			content: messageContent
		}
	}
}

/**
 * Pushes the value of a message that's stored in appState up to the server
 * accepts a messageID:String
 */

export const saveUpdatedMessage = (messageID) => {
	let asyncResponse = feedService.saveUpdatedMessage(store.);
	return {
		type: 'FEED_SAVE_MESSAGE',
		payload: asyncResponse
	}
}