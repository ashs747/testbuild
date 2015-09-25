import moment from 'moment-timezone';

export function getStub() {
  return [{
    "id": 29,
    "name": "Workshop Title 2nd line if needed",
    "description": null,
    "properties": {
      "type": "workshop"
    },
    "weight": 1,
    "activityUsers": [
      {
        "id": 11,
        "status": "rated",
        "properties": {"modifier": {"direction": "add", "amount": 7, "duration": "days"}},
        "token": null,
        "user": {
          "id": 1244,
          "forename": "Matt",
          "surname": "Tsinontas",
          "email": "matthew.tsinontas@cirrus-connect.com",
          "properties": {
            "general": {
              "jobRole": {
                "phone": "1",
                "department": "Boss",
                "position": "Boss"
              }
            },
            "marksSpencerPortal": {
              "postalAddress": {
                "address1": "2",
                "city": "3",
                "postcode": "4"
              }
            }
          },
          "active": true,
          "timezone": "Europe/London"
        },
        "event": {
          "id": 1316,
          "name": "SOJ Webinar",
          "description": null,
          "location": "Details",
          "properties": [],
          "dates": [
            {
              "id": 3132,
              "dateFrom": moment().add(1, 'day'),
              "dateTo": moment().add(1, 'day')
            }
          ]
        }
      }
    ]
  }];
}
