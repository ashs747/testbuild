import PersonalLearningJourneyView from '../PersonalLearningJourney.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';

describe('Personal Learning Journey View', function() {

  var component;
  var testUtils = React.addons.TestUtils;
  PersonalLearningJourneyView.__Rewire__("PersonalLearningJourney", getMockReactComponent());
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(PersonalLearningJourneyView, {
      learningJourneyModules: [],
      dispatch: function() {
      }
    }));
  });

  it('should render a div with class: personal-learning-journey', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'personal-learning-journey');
    expect(components.length).to.equal(1);
  });
});
