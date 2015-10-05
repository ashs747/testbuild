import request from 'cirrus/services/request';

export function fetchFeedMessages(programmeID, cohortID = 0, qty = 25) {
  let reqURI = `/feed/${programmeID}/${cohortID}/?qty=${qty}`;
  return request.get(reqURI).end();
}

export function fetchLatestFeedMessages(programmeID, cohortID = 0, qty = 25) {
  let reqURI = `/latest-feed/${programmeID}/${cohortID}`;
  return request.get(reqURI).end();
}

export function deleteMessage(programmeID, messageID) {

};

export function postMessage(programmeID) {

};

export function saveUpdatedMessage(programmeID, messageID, content) {

}