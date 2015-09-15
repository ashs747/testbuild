import React from 'react/addons';
import LoginView from '../LoginView.jsx';
import {expect, sinon} from 'cirrus/testing/utils';

describe('LoginView', () => {
  var component;
  var testUtils = React.addons.TestUtils;
  beforeEach(function() {
    component = testUtils.renderIntoDocument(React.createElement(LoginView, {
      dispatch: function() {}
    }));
  });

  it('should render a div with class: login', function() {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'login');
    expect(components.length).to.equal(1);
  });

  it('changeHandler should update state', () => {
    component.changeHandler("email", {target: {value: "test-email"}});
    expect(component.state.email).to.equal("test-email");
  });

});
