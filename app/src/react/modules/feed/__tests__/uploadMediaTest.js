import React from 'react/addons';
import UploadMedia from '../components/UploadMedia.jsx';
import {expect} from 'cirrus/testing/utils';

describe('UploadMedia', () => {

  var testUtils = React.addons.TestUtils;
  var props = {};
  var element = React.createElement(UploadMedia, props);
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

  it('it should render a div with className: upload-media', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'upload-media-component');
    expect(components.length).to.equal(1);
  });

});
