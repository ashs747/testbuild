// Simple wrapper for a list item with a link - seems we'll use it often enough
import React from 'react/addons';
import LiAnchor from '../LiAnchor.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';

describe('LI-A wrapper', () => {
  var stubProps;
  var component;
  var mountedComponent;
  var TestUtils = React.addons.TestUtils;

  const stubLiData = {
    'text': 'AnchorText',
    'url': 'http://www.mything.com/#myLink'
  };

  var myComponent = React.createElement(LiAnchor, stubLiData);
  var myChildList = (<ul><li><a href="/">Woo</a></li></ul>);

  const stubLiDataWithChildList = {
    'text': 'AnchorText',
    'url': 'http://www.mything.com/#anotherLink',
    'childList': myChildList,
  };

  describe('Without a child list', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(myComponent);
      mountedComponent = React.findDOMNode(component);
    });

    afterEach(() => {
      component = null;
      mountedComponent = null;
    });

    it('Renders a list item and anchor with some text and a URL', () => {
      const aHref = mountedComponent.querySelector('a').href;
      expect(aHref).to.equal('http://www.mything.com/#myLink');
      expect(mountedComponent.querySelector('a').text).to.equal('AnchorText');
    });

    // eg: a defensive test
    it('Does not render a child UL if there is no provided childList', () => {
      expect(mountedComponent.querySelectorAll('ul').length).to.equal(0);
    });
  });

  describe('With a child list', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(React.createElement(LiAnchor, stubLiDataWithChildList));
      mountedComponent = React.findDOMNode(component);
    });

    afterEach(() => {
      component = null;
      mountedComponent = null;
    });

    it('Renders a nested list item if you provide it a component', () => {
      expect(mountedComponent.querySelector('ul')).to.exist;
      expect(mountedComponent.querySelectorAll('ul li a').length).to.equal(1);
    });
  });
});