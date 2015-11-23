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
});
