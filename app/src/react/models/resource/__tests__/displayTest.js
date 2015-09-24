import React from 'react/addons';
import Display from '../Display.jsx';
import {expect} from 'cirrus/testing/utils';

describe('ResourceDisplay', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    icon: "fa-500px",
    title: "Test Resource Display",
    reference: "url"
  };
  var element = React.createElement(Display, props);
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

  it('should render a div with className: resource-display', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'resource-display');
    expect(components.length).to.equal(1);
  });

  it('should render an i tag with the icon passed through props', () => {
    var iClass = mountedComponent.querySelector('i').className;
    expect(iClass).to.equal("fa fa-500px");
  });

  it('should render an a tag with the resource title passed through props', () => {
    var aContent = mountedComponent.querySelector('a').textContent;
    expect(aContent).to.equal("Test Resource Display");
  });

  it('should render an a tag with the href passed through props', () => {
    var aContent = mountedComponent.querySelector('a').href;
    expect(aContent).to.contain("url");
  });


});
