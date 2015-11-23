import React from 'react/addons';
import LearningJourneyRow from '../LearningJourneyRow.jsx';
import {expect} from 'cirrus/testing/utils';
import {getStub} from './stubData/activity';

describe('LearningJourneyRow', () => {
  var component;
  var testUtils = React.addons.TestUtils;
  var stubData = getStub()[0];
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(LearningJourneyRow, {activity: stubData}));
  });

  it('should render a row with class "plj-table-row"', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'plj-table-row');
    expect(components.length).to.equal(1);
  });

  it('should return an event object with the correctly formatted data structure', () => {
    var event = component.assignEvent(stubData.activityUsers[0].event);
    expect(event).to.contain.all.keys("date", "time", "location");
  });

});
