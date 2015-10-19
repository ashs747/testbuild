import LearningJourneyWidget from '../LearningJourneyWidget.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';
import {getStub} from './stubData/module.js';
import moment from 'moment-timezone';

describe('LearningJourneyWidget', function() {
  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(LearningJourneyWidget, {
      journeyModules: [getStub()],
      dispatch: function() {
      }
    }));
  });

  it('should render a div with class: learning-journey-module', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'learning-journey-module');
    expect(components.length).to.equal(1);
  });

  it('the component should show that it is the current module', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'current');
    expect(components.length).to.equal(1);
  });
});
