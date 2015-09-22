import React from 'react/addons';
import MembersModuleUserWrapper from '../MembersModuleUserWrapper.jsx';
import {expect} from 'cirrus/testing/utils';

describe('MembersModuleUserWrapper', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    users: [{
      image: "test",
      name: "test"
    }, {
      image: "test",
      name: "test"
    }]
  };
  var element = React.createElement(MembersModuleUserWrapper, props);
  var component;
  var mountedComponent;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(element);
    mountedComponent = React.findDOMNode(component)
  });

  afterEach(() => {
    component = null;
    mountedComponent = null;
  })

  it('should render a div with className: user-wrapper', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'user-wrapper');
    expect(components.length).to.equal(1);
  });

  it('should render 2 DisplayUser components if passed 2 user objects', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'user-display');
    expect(components.length).to.equal(2);
  });

  it('should render the wrapper with no children if no users passed', () => {
    let component = testUtils.renderIntoDocument(React.createElement(MembersModuleUserWrapper));
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'user-display');
    expect(components.length).to.equal(0);
  });


});
