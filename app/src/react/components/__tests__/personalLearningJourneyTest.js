import PersonalLearningJourney from '../PersonalLearningJourney.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';
import moment from 'moment-timezone';

describe('PersonalLearningJourney', function() {
  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    var stub = {};
    var data = {
      "id": 1,
      "name": "Module 1",
      "startDate": moment("2015-09-01T00:00:00+0000"),
      "endDate": moment("2015-10-01T00:00:00+0000"),
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
    component = testUtils.renderIntoDocument(React.createElement(PersonalLearningJourney, {
      journeyModule: data,
      dispatch: function() {
      }
    }));
  });

  it('should render a div with class: learning-journey-module', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'learning-journey-module');
    expect(components.length).to.equal(1);
  });

  it('it should render 5 activity rows', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'activity');
    expect(components.length).to.equal(5);
  });
});
