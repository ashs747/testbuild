import React from 'react/addons';
import Message from '../components/Message.jsx';
import {expect} from 'cirrus/testing/utils';

describe('Message', () => {

  var testUtils = React.addons.TestUtils;
  var props = {};
  var element = React.createElement(Message, props);
  var component;
  var mountedComponent;

  beforeEach(() => {
    component = testUtils.renderIntoDocument(element);
    mountedComponent = React.findDOMNode(component);
  });

  afterEach(() => {
    component = null;
    mountedComponent = null;
  });

  it('it should render a div with className: message', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'message');
    expect(components.length).to.equal(1);
  });

});
