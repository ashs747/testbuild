import React from 'react/addons';
import ActionLearningZoneView from '../ActionLearningZoneView.jsx';
import {expect} from 'cirrus/testing/utils';

ActionLearningZoneView.__set__("userManager.getUsersByCohort", {
  _embedded: {
    user: [{
      id: 1,
      forename: "Test",
      surname: "User"
    }]
  }
})

describe('ActionLearningZoneView', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    user: {
      labels: []
    }
  };
  var element = React.createElement(ActionLearningZoneView, props);
  var component;
  var mountedComponent;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(element);
    mountedComponent = React.findDOMNode(component);
  });

  afterEach(() => {
    component = null;
    mountedComponent = null;
  });

  it('should render a div with className: action-learning-zone', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'action-learning-zone');
    expect(components.length).to.equal(1);
  });

  it('should set state with users loaded via label id', () => {
    //Need to stub userManager.getUsersByCohort with some stub data as a promise
    expect(ActionLearningZoneView.state.users.length).to.equal(0);
    ActionLearningZoneView.getCohortFromLabelId(1);
    expect(ActionLearningZoneView.state.users.length).to.equal(1);
  });

});
