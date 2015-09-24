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
    var statusRated = component.assignStatus({status:"rated"});
    var statusMissed = component.assignStatus({status:"missed"});
    expect(statusRated.type).to.equal("i");
    expect(statusMissed.type).to.equal("i");
  });

  it('should return an anchor if status is open, booked or completed', () => {
    var statusOpen = component.assignStatus({status:"open"});
    var statusBooked = component.assignStatus({status:"booked", "properties": {"modifier": {"direction": "add", "amount": 7, "duration": "days"}}}, stubData.activityUsers[0].event);
    var statusCompleted = component.assignStatus({status:"completed"});
    expect(statusOpen.type).to.equal("a");
    expect(statusBooked.type).to.equal("a");
    expect(statusCompleted.type).to.equal("a");
  });

  it('should return an event object with the correctly formatted data structure', () => {
    var event = component.assignEvent(stubData.activityUsers[0].event);
    expect(event).to.contain.all.keys("date", "time", "location");
  });

});
