import React from 'react/addons';
import Comment from '../components/Comment.jsx';
import {expect} from 'cirrus/testing/utils';

describe('Comment', () => {

  var testUtils = React.addons.TestUtils;
  var props = {};
  var element = React.createElement(Comment, props);
  var component;
  var mountedComponent;

  beforeEach(() => {
    component = testUtils.renderIntoDocument(element);
    mountedComponent = React.findDOMNode(component);
  });

  afterEach(() => {
    component = null;
    mountedComponent = null;
  })

  it('it should render a div with className: comment', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'comment');
    expect(components.length).to.equal(1);
  });

});
