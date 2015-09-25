import ModuleView from '../ModuleView.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';
import {getStub} from '../../components/__tests__/stubData/module.js';

describe('Module View', function() {

  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(ModuleView, {
      params: {module: 1},
      modules: {contentTypeData: [{"id": 1, "title": "Brave Decision Maker", "aboutThisHub": "Aenean iculus mus.", "resources": []}]},
      learningJourney: {learningJourneyModules: [getStub()]},
      dispatch: function() {
      },
      auth: {
        currentUser: 1
      }
    }));
  });

  it('should render a div with class: main', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'module-hub');
    expect(components.length).to.equal(1);
  });

  it('should render a div with class: personal-learning-journey', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'personal-learning-journey');
    expect(components.length).to.equal(1);
  });

  it('should render one learning journey module', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'learning-journey-module');
    expect(components.length).to.equal(1);
  });
});
