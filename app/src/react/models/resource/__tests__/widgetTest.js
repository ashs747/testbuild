import React from 'react/addons';
import Widget from '../Widget.jsx';
import {expect} from 'cirrus/testing/utils';

describe('ResourceWidget', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    resources: [{
      type: {
        typeSlug: "video"
      }
    }, {
      type: {
        typeSlug: "document-pdf"
      }
    }, {
      type: {
        typeSlug: "tool"
      }
    }, {
      type: {
        typeSlug: "external"
      }
    }]
  };
  var element = React.createElement(Widget, props);
  var component;
  var mountedComponent;

  beforeEach(function() {
    component = testUtils.renderIntoDocument(element);
    mountedComponent = React.findDOMNode(component);
  });

  afterEach(() => {
    component = null;
    mountedComponent = null;
  });

  it('should render a div with className: resource-widget', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'resource-widget');
    expect(components.length).to.equal(1);
  });

  it('shouldn\'t render a resource group if there are no resources', () => {
    var groupedComponents = component.createGroupsFromResources({video: [], external: [], document: [], tool: []});
    expect(groupedComponents.length).to.equal(0);
  });

  it('should render a resource group if one is passed', () => {
    var groupedComponents = component.createGroupsFromResources({
      video: [{
        test: "object"
      }]
    });
    expect(groupedComponents.length).to.equal(1);
  });

  it('should group resources by type', () => {
    var groupedComponents = component.groupResources();
    expect(groupedComponents).to.contain.all.keys(["video", "document", "tool", "external"]);
  });

  it('should group all documents together, regardless of type (pdf, word etc.)', () => {
    let props = {
      resources: [{
        type: {
          typeSlug: "document-pdf"
        }
      }, {
        type: {
          typeSlug: "document-word"
        }
      }]
    };
    let component = testUtils.renderIntoDocument(React.createElement(Widget, props));
    let groupedComponents = component.groupResources();
    expect(groupedComponents).to.have.all.keys(["document"]);
  });

});
