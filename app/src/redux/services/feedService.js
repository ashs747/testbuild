import request from 'cirrus/services/request';

export function getFeedMessages(programmeID, cohortID = 0, qty = 25) {
  // let reqURI = `/feed/${programmeID}/${cohortID}/?qty=${qty}`;
  // return request.get(reqURI).end();
  return Promise.resolve({
    id: "testTwo",
    messages: [{
      id: 0,
      userCanEdit: true,
      user: {
        forename: "Test",
        surname: "User",
        profilePic: {
          reference: "profile-pic"
        }
      },
      content: "This is a messageThis is a messageThis is a messageThis is a messageThis is a messageThis is a messageThis is a messag sdfas dfasdfawfawfea wefaefeThis is a messfas dfasdfawfawffaeh www.google.com/search ffffffesfsdf",
      date: "2015-09-29T09:30:32",
      comments: [{
        id: 1,
        userCanEdit: true,
        user: {
          forename: "Test",
          surname: "User",
          profilePic: {
            reference: "profile-pic"
          }
        },
        content: "This is a comment www.google.com http://www.google.com",
        date: "2015-09-29T09:30:32"
      }]
    }],
  });
}

export function getLatestFeedMessages(programmeID, cohortID = 0, qty = 25) {
  // let reqURI = `/latest-feed/${programmeID}/${cohortID}`;
  // return request.get(reqURI).end();
  /****** Moving stubbed data here until req.endpoint set up *******/

  return Promise.resolve({
    id: "testTwo",
    messages: [{
      id: 0,
      user: {
        forename: "Test",
        surname: "User",
        profilePic: {
          reference: "profile-pic"
        }
      },
      content: "This is a messageThis is a messageThis is a messageThis is a messageThis is a messageThis is a message www.google.com",
      date: "2015-09-29T09:30:32",
      comments: [{
        id: 1,
        user: {
          forename: "Test",
          surname: "User",
          profilePic: {
            reference: "profile-pic"
          }
        },
        content: "This is a comment www.google.com http://www.google.com",
        date: "2015-09-29T09:30:32"
      }]
    }],
  });
}

export function deleteMessage(programmeID, messageID) {

};

export function postMessage(programmeID) {

};

export function postUpdatedMessage(programmeID, messageID, content) {

}