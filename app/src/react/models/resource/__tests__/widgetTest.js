import React from 'react/addons';
import Widget from '../Widget.jsx';
import {expect} from 'cirrus/testing/utils';

describe('ResourceWidget', () => {

  var testUtils = React.addons.TestUtils;
  var props = {};
  var element = React.createElement(Widget, props);
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

  it('should render a div with className: resource-widget', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'resource-widget');
    expect(components.length).to.equal(1);
  });

});
