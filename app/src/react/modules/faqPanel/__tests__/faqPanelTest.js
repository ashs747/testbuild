import React from 'react/addons';
import FAQPanel from '../FAQPanel.jsx';
import {expect} from 'cirrus/testing/utils';
import FAQQuestion from '../FAQQuestion.jsx';

describe('FAQPanel', () => {

  var testUtils = React.addons.TestUtils;
  var props = {};
  var element = React.createElement(FAQPanel, props);
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

  it('it should render a div with className: faq-panel', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'faq-panel');
    expect(components.length).to.equal(1);
  });

  it('it should return 2 question components if 2 are passed into the mapper', () => {
    let mappedQuestions = component.mapQuestions([
      {title: "Example Question 1", answer: "Answer 1"},
      {title: "Example Question 2", answer: "Answer 2"}
    ]);
    expect(mappedQuestions.length).to.equal(2);
  });

});
