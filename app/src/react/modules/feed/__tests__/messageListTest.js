import React from 'react/addons';
import MessageList from '../components/MessageList.jsx';
import {expect} from 'cirrus/testing/utils';

describe('MessageList', () => {

  var testUtils = React.addons.TestUtils;
  var props = {};
  var element = React.createElement(MessageList, props);
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

  it('it should render a div with className: message-list', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'message-list');
    expect(components.length).to.equal(1);
  });

});
