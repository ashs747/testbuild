import ActionBar from '../ActionBar.jsx';
import {expect, sinon, getMockReactComponent} from '../../../testing/utils';
import React from 'react/addons';

describe('Action Bar', function() {

  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(ActionBar));
  });

  it('should render a div with class: action-bar', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'action-bar');
    expect(components.length).to.equal(1);
  });

});
