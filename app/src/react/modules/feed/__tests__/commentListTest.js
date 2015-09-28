import React from 'react/addons';
import CommentList from '../components/CommentList.jsx';
import {expect} from 'cirrus/testing/utils';

describe('CommentList', () => {

  var testUtils = React.addons.TestUtils;
  var props = {};
  var element = React.createElement(CommentList, props);
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

  it('it should render a div with className: comment-list', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'comment-list');
    expect(components.length).to.equal(1);
  });

});
