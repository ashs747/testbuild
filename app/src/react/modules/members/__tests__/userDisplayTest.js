import React from 'react/addons';
import UserDisplay from '../UserDisplay.jsx';
import {expect} from 'cirrus/testing/utils';

describe('MembersModuleUserDisplay', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    image: "test-image-path",
    name: "Name Here"
  };
  var element = React.createElement(UserDisplay, props);
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

  it('should render a div with className: user-display', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'user-display');
    expect(components.length).to.equal(1);
  });

  it('should display an image tag from props', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'profile-image');
    expect(components.length).to.equal(1);
  });

  it('should display a user\'s name from props', () => {
    var nameSrc = mountedComponent.querySelector('p').textContent;
    expect(nameSrc).to.equal("Name Here");
  });

});
