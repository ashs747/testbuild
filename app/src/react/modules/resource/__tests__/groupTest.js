import React from 'react/addons';
import Group from '../Group.jsx';
import {expect} from 'cirrus/testing/utils';

describe('ResourceGroup', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    title: "Title",
    resources: [{
      title: "resource 1",
      reference: "http://url1",
      type: {icon: "icon"}
    }, {
      title: "resource 2",
      reference: "http://url2",
      type: {icon: "icon"}
    }]
  };
  var element = React.createElement(Group, props);
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

  it('should render a div with className: resource-group', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'resource-group');
    expect(components.length).to.equal(1);
  });

  it('should render an h4 tag with the title passed through props', () => {
    var iClass = mountedComponent.querySelector('h4').textContent;
    expect(iClass).to.equal("Title");
  });

  it('should render 2 resource displays if 2 resources are passed in', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'resource-display');
    expect(components.length).to.equal(2);
  });

});
