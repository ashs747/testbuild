import PersonalLearningJourney from '../PersonalLearningJourney.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';


describe('PersonalLearningJourney', function() {
  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(PersonalLearningJourney));
  });

  it('should render a div with class: learning-journey-module', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'learning-journey-module');
    expect(components.length).to.equal(1);
  });
});
