import moment from 'moment-timezone';

export function getStub() {

  let json = {
    "id": 1,
    "name": "Module 1",
    "startDate": moment().subtract(1, 'd'),
    "endDate": moment().add(1, 'M'),
    "activities": [{
      "id": 24,
      "name": "Coaching Session 1",
      "description": null,
      "properties": {"info": "Context setting; My leadership challenge and the impact I want to create (14 days prior to ITL)"},
      "weight": 0,
      "activityUsers": [{
        "id": 2,
        "status": "open",
        "properties": [],
        "token": "ea398fe0aa0e5774b489372bc7c861ffaead9b31",
        "event": {
          "id": 1307,
          "name": "Coaching Session 1",
          "description": null,
          "location": "Telephone",
          "properties": [],
          "dates": [{"id": 3123, "dateFrom": "2015-08-24T08:00:00+0000", "dateTo": "2015-08-24T09:00:00+0000"}]
        }
      }]
    }, {
      "id": 25,
      "name": "Coaching Session 2",
      "description": null,
      "properties": {"info": "Insights from ITL, my first experiments and deepening my personal story; My Leadership Purpose (14 days after ITL)"},
      "weight": 0,
      "activityUsers": [{
        "id": 3,
        "status": "open",
        "properties": [],
        "token": "fd9fac750e12bed594c7d219ecf74f47479274ed",
        "event": {
          "id": 1309,
          "name": "Coaching Session 2",
          "description": null,
          "location": "Telephone",
          "properties": [],
          "dates": [{"id": 3125, "dateFrom": "2015-08-31T08:00:00+0000", "dateTo": "2015-08-31T09:00:00+0000"}]
        }
      }]
    }, {
      "id": 26,
      "name": "Coaching Session 3",
      "description": null,
      "properties": {"info": "Reflection; Successes and new experiments; Impacts on team and system; My Leadership Purpose (30 days after ITL)"},
      "weight": 0,
      "activityUsers": [{
        "id": 4,
        "status": "open",
        "properties": [],
        "token": "04cacf3e3dee37a104798c80314d364b9df0bb7f",
        "event": {
          "id": 1312,
          "name": "Coaching Session 3",
          "description": null,
          "location": "Telephone",
          "properties": [],
          "dates": [{"id": 3128, "dateFrom": "2015-09-07T08:00:00+0000", "dateTo": "2015-09-07T09:00:00+0000"}]
        }
      }]
    }, {
      "id": 27,
      "name": "Coaching Session 4",
      "description": null,
      "properties": {"info": "Reflection; Successes and new experiments; Impacts on team and system; My Leadership Purpose (60 days after ITL)"},
      "weight": 0,
      "activityUsers": [{
        "id": 5,
        "status": "open",
        "properties": [],
        "token": "3bb126944820102de50089e87bf01bd423761127",
        "event": null
      }]
    }, {
      "id": 28,
      "name": "Coaching Session 5",
      "description": null,
      "properties": {"info": "Reflection; Successes and new experiments; Impacts on team and system; My Leadership Purpose (90 days after ITL)"},
      "weight": 0,
      "activityUsers": [{
        "id": 9,
        "status": "open",
        "properties": [],
        "token": "c9abc3acfed6c59446a4181f67f0f617af289d80",
        "event": null
      }]
    }],
    "programme": {"id": 1, "title": "Impact Through Leadership", "startDate": null, "endDate": null}
  };
  return json;
};
