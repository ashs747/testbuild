import config from '../../localConfig';
import requesty from '../../request';
console.log(requesty);
var request = requesty();

let apiRoot = config.api ? config.api.url : '';

export function updateMeta(fileID, metaData) {
  return request.post(`${apiRoot}api/files/${fileID}/meta-data`, metaData);
}

function formatFeedObject(feedObject) {
  return setNoneEditable(feedObject['message-boards'][0]);
}

function decorateEditableFalse(item) {
  if (item.comments) {
    item.comments = item.comments.map(decorateEditableFalse);
  }
  return {
    ...item,
    editable: false
  };
}

function setNoneEditable(feed) {
  if (feed && feed.messages) {
    return {...feed,
      messages: feed.messages.map(decorateEditableFalse)
    };
  }
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
    .then(formatFeedObject);
}

export function deleteMessage(messageID) {
  return request.del(`${apiRoot}api/feeds/message/${messageID}`);
};

export function postMessage(feedID, message, messageID) {
  if (messageID) {
    return request.post(`${apiRoot}api/feeds/${feedID}/message/${messageID}/comment`, message);
  }
  return request.post(`${apiRoot}api/feeds/${feedID}/message`, message);
};

export function postComment(feedID, messageID, comment) {
  return request.post(`${apiRoot}api/feeds/${feedID}/message/${messageID}/comment`, comment);
}

export function postUpdatedMessage(boardID, messageID, content) {
  return request.post(`${apiRoot}api/feeds/${boardID}/message/${messageID}`, content);
}

export function embedVideo(url) {
  let params = {
    url
  };
  return request.post(`${apiRoot}api/files/embed-video`, params);
}
