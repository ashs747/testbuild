import React from 'react/addons';
import Widget from '../Widget.jsx';
import {expect} from 'cirrus/testing/utils';

describe('MembersModuleWidget', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    title: "Test Title",
    users: [{
      image: "test",
      name: "test"
    }, {
      image: "test-1",
      name: "test"
    }]
  };
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

  it('should render a div with className: members-module', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'members-module');
    expect(components.length).to.equal(1);
  });

  it('should render a div with className: user-wrapper', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'user-wrapper');
    expect(components.length).to.equal(1);
  });

  it('should render 2 DisplayUser components if passed 2 user objects', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'user-display');
    expect(components.length).to.equal(2);
  });

  it('should render the wrapper with no children if no users passed', () => {
    let component = testUtils.renderIntoDocument(React.createElement(Widget));
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'user-display');
    expect(components.length).to.equal(0);
  });

  it('should render a title based on a property', () => {
    var nameSrc = mountedComponent.querySelector('h3').textContent;
    expect(nameSrc).to.equal("Test Title");
  });
});
