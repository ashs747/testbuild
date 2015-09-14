import PersonalLearningJourney from '../PersonalLearningJourney.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';

describe('Personal Learning Journey', function() {

  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(PersonalLearningJourney));
  });

  it('should render a div with class: personal-learning-journey', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'personal-learning-journey');
    expect(components.length).to.equal(1);
  });
});
