import React from 'react/addons';
import ActionLearningZoneView from '../ActionLearningZoneView.jsx';
import {expect} from 'cirrus/testing/utils';

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

});
