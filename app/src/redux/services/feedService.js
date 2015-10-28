import request from 'cirrus/services/request';
import config from '../../localConfig';

let apiRoot = config.api ? config.api.url : '';

function formatFeedObject(feedObject) {
  return feedObject['message-boards'][0];
}

export function getFeedIdForContext(feeds, feedContext) {
  for (let key in feeds) {
    if (feeds.hasOwnProperty(key)) {
      if (feeds[key].context === feedContext) {
        return key;
      }
    }
  }
}

export function getFeedMessages(feedID, qty = 60) {
  return request.get(apiRoot + 'api/feeds/' + feedID)
    .end()
    .then(formatFeedObject);
}

export function deleteMessage(messageID) {
  return request.delete(`${apiRoot}api/messages/${messageID}`);
};

export function postMessage(feedID, message) {
  return request.post(`${apiRoot}api/feeds/${feedID}`, message);
};

export function postComment(feedID, messageID, comment) {
  return request.post(`${apiRoot}api/feeds/${feedID}/message/${messageID}/comment`, comment);
}

export function patch(messageID, content) {
  return request.patch(`${apiRoot}api/messages/${messageID}`, content);
}