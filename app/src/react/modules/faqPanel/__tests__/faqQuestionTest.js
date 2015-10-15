import React from 'react/addons';
import FAQQuestion from '../FAQQuestion.jsx';
import {expect} from 'cirrus/testing/utils';

describe('FAQQuestion', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    question: "Example Question",
    answer: "Example Answer"
  };
  var element = React.createElement(FAQQuestion, props);
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

  it('it should render a div with className: faq-question', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'faq-question');
    expect(components.length).to.equal(1);
  });

  it('it shouldn\'t show an answer by default', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'answer');
    expect(components.length).to.equal(0);
  });

  it('should display a question passed in via props', () => {
    let question = mountedComponent.querySelector('h5').textContent;
    expect(question).to.equal('Example Question ');
  });

});
