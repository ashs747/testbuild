import MainView from '../MainView.jsx';
import {expect, sinon, getMockReactComponent} from 'cirrus/testing/utils';
import React from 'react/addons';

MainView.__Rewire__("RouteHandler", getMockReactComponent());

describe('Main Screen', function() {
  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(MainView));
  });

  xit('should render a div with class: main', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'main');
    expect(components.length).to.equal(1);
  });

});
