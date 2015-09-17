import LearningJourneyView from '../LearningJourneyView.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';

describe('Personal Learning Journey View', function() {

  var component;
  var testUtils = React.addons.TestUtils;
  LearningJourneyView.__Rewire__("LearningJourneyTable", getMockReactComponent());
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(LearningJourneyView, {
      learningJourney: {learningJourneyModules: []},
      dispatch: function() {
      }
    }));
  });

  it('should render a div with class: personal-learning-journey', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'personal-learning-journey');
    expect(components.length).to.equal(1);
  });
});
