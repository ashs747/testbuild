import LearningJourneyTable from '../LearningJourneyTable.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';
import {getStub} from './stubData/module.js';
import moment from 'moment-timezone';
describe('LearningJourneyTable', function() {
  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(LearningJourneyTable, {
      journeyModule: getStub(),
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
