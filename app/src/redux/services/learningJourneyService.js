//learningJourneyServices.js
import config from '../../localConfig';
import request from 'cirrus/services/request';
import moment from 'moment-timezone';

let apiRoot = config.api ? config.api.url : '';

export const getlearningModules = () => {
  return Promise.resolve({stub: 'data'});
};

export const bookSlot = (slotID) => {
  return request.get(apiRoot + 'api/plj/booking/book/' + slotID);
};

export const getSlots = (activityID) => {
  return request.get(`${apiRoot}api/plj/booking/get-slots/${activityID}`);
};

export const getPLJDataByProgramme = (programmeID) => {
  //service call goes here
  return Promise.resolve({
    //object with top level keys consisting of m+the moduleID (e.g. m1, m2 for module 1 and module 2)
    m1: {
      id: 1,
      name: "Module 1 - Lorem ipsum dolor sit amet",
      startDate: "2015-11-05T00:00:00",
      endDate: "2015-12-05T00:00:00",
      activities: {
        //Similar to the module keys, a+activityID (e.g. a1, a2 for activity 1 and 2)
        a1: {
          id: 1,
          name: "Workshop title here",
          description: "Activity description",
          properties: null,
          type: "Workshop",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: null,
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: []
        },
        a2: {
          id: 2,
          name: "Webinar title Here",
          description: "Activity description",
          log: false,
          properties: null,
          type: "Webinar",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: null,
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: [{
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            slots: [{
              startDate: "2015-11-05T09:00:00",
              endDate: "2015-11-05T10:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T10:00:00"
            }, {
              startDate: "2015-11-05T11:00:00",
              endDate: "2015-11-05T12:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T10:00:00"
            }]
          }]
        },
        a3: {
          id: 3,
          name: "Coaching Title Here",
          description: "Activity description",
          properties: null,
          type: "Coaching",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: {
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-12-04T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            startDate: "2015-12-04T09:00:00",
            endDate: "2015-12-04T12:00:00",
            location: "Telephone",
            cancelBy: "2015-12-24T00:00:00"
          },
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: [{
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            slots: [{
              startDate: "2015-11-05T09:00:00",
              endDate: "2015-11-05T10:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T10:00:00"
            }, {
              startDate: "2015-11-05T11:00:00",
              endDate: "2015-11-05T12:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T10:00:00"
            }]
          }]
        },
        a4: {
          id: 4,
          name: "Project title here",
          description: "Activity description",
          properties: {
            deadline: "January 1st 2016"
          },
          type: "Project",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: null,
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: []
        },
        a5: {
          id: 5,
          name: "Webinar Title Here",
          description: "Activity description",
          properties: null,
          type: "Webinar",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: {
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-12-04T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            startDate: "2015-12-04T09:00:00",
            endDate: "2015-12-04T12:00:00",
            location: "Telephone",
            cancelBy: "2015-10-24T00:00:00"
          },
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: [{
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            slots: [{
              startDate: "2015-11-05T09:00:00",
              endDate: "2015-11-05T10:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T10:00:00"
            }, {
              startDate: "2015-11-05T11:00:00",
              endDate: "2015-11-05T12:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T10:00:00"
            }]
          }]
        },
        a6: {
          id: 6,
          name: "Webinar Title Here",
          description: "Activity description",
          properties: null,
          type: "Coaching",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: {
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-04T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            startDate: "2015-11-04T09:00:00",
            endDate: "2015-11-04T12:00:00",
            location: "Telephone",
            cancelBy: "2015-11-24T00:00:00",
            attendance: "attended"
          },
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: [{
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            slots: [{
              startDate: "2015-11-05T09:00:00",
              endDate: "2015-11-05T10:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T10:00:00"
            }, {
              startDate: "2015-11-05T11:00:00",
              endDate: "2015-11-05T12:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T10:00:00"
            }]
          }]
        }
      }
    },
    m2: {
      id: 2,
      name: "Module 2 - Lorem ipsum dolor sit amet",
      startDate: "2015-12-05T00:00:00",
      endDate: "2016-01-01T00:00:00",
      activities: {
        //Similar to the module keys, a+activityID (e.g. a1, a2 for activity 1 and 2)
        a1: {
          id: 7,
          name: "Webinar Title Here",
          description: "Activity description",
          log: true,
          properties: null,
          type: "Coaching",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: {
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            startDate: "2015-11-05T00:00:00",
            endDate: "2015-11-05T00:00:00",
            location: "Telephone",
            cancelBy: "2015-11-05T00:00:00",
            attendance: "attended"
          },
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: [{
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            slots: [{
              startDate: "2015-11-05T00:00:00",
              endDate: "2015-11-05T00:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T00:00:00"
            }, {
              startDate: "2015-11-05T00:00:00",
              endDate: "2015-11-05T00:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T00:00:00"
            }]
          }]
        },
        a2: {
          id: 8,
          name: "Webinar Title Here",
          description: "Activity description",
          log: false,
          properties: null,
          type: "Webinar",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: {
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            startDate: "2015-11-05T00:00:00",
            endDate: "2015-11-05T00:00:00",
            location: "Telephone",
            cancelBy: "2015-11-05T00:00:00",
            attendance: "attended"
          },
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: [{
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            slots: [{
              startDate: "2015-11-05T00:00:00",
              endDate: "2015-11-05T00:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T00:00:00"
            }, {
              startDate: "2015-11-05T00:00:00",
              endDate: "2015-11-05T00:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T00:00:00"
            }]
          }]
        },
        a3: {
          id: 9,
          name: "Webinar Title Here",
          description: "Activity description",
          log: false,
          properties: null,
          type: "Coaching",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: {
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            startDate: "2015-11-05T00:00:00",
            endDate: "2015-11-05T00:00:00",
            location: "Telephone",
            cancelBy: "2015-11-05T00:00:00",
            attendance: "missed",
          },
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: [{
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            slots: [{
              startDate: "2015-11-05T00:00:00",
              endDate: "2015-11-05T00:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T00:00:00"
            }, {
              startDate: "2015-11-05T00:00:00",
              endDate: "2015-11-05T00:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T00:00:00"
            }]
          }]
        },
        a4: {
          id: 10,
          name: "Webinar Title Here",
          description: "Activity description",
          log: false,
          properties: null,
          type: "Coaching",
          //Custom key, flatten the data for the event and slot if user has booked onto it, otherwise null
          myBookedEventAndSlot: {
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            startDate: "2015-11-05T00:00:00",
            endDate: "2015-11-05T00:00:00",
          },
          //Custom key, populate with events + available slots, this will be used by the booking system
          availableEvents: [{
            name: "Webinar 1",
            description: "Joining instructions",
            eventDate: "2015-11-05T00:00:00",
            facilitator: {
              id: 1,
              forname: "Jenny Perkins",
              surname: ""
            },
            slots: [{
              startDate: "2015-11-05T00:00:00",
              endDate: "2015-11-05T00:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T00:00:00"
            }, {
              startDate: "2015-11-05T00:00:00",
              endDate: "2015-11-05T00:00:00",
              location: "Telephone",
              cancelBy: "2015-11-05T00:00:00"
            }]
          }]
        }
      }
    }
  });
};
