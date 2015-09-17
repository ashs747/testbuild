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

  it('should return a font-awesome icon string from assign icon', () => {
    var icon = component.assignIcon("test");
    expect(icon).to.contain('fa fa-');
  });

  it('should return a font-awesome italic if status is rated or missed', () => {
    var statusRated = component.assignStatus("rated");
    var statusMissed = component.assignStatus("missed");
    expect(statusRated.type).to.equal("i");
    expect(statusMissed.type).to.equal("i");
  });

  it('should return an anchor if status is open, booked or completed', () => {
    var statusOpen = component.assignStatus("open");
    var statusBooked = component.assignStatus("booked");
    var statusCompleted = component.assignStatus("completed");
    expect(statusOpen.type).to.equal("a");
    expect(statusBooked.type).to.equal("a");
    expect(statusCompleted.type).to.equal("a");
  });

  it('should return an event object with the correctly formatted data structure', () => {
    var event = component.assignEvent(stubData.activityUsers[0].event);
    expect(event).to.contain.all.keys("date", "time", "location");
  });

});
