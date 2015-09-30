import React from 'react/addons';
import Message from '../components/Message.jsx';
import {expect} from 'cirrus/testing/utils';
import moment from 'moment-timezone';

describe('Message', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    name: "Test User",
    textContent: "Here is a message on the feed",
    date: moment('2015-09-29T09:30:32'),
    profilePic: 'url-of-pic'
  };
  var element = React.createElement(Message, props);
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

  it('it should render a div with className: message', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'message');
    expect(components.length).to.equal(1);
  });

  it('should render a div with className: message', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'message');
    expect(components.length).to.equal(1);
  });

  it('should display the name of the user posted through props', () => {
    var h6Content = mountedComponent.querySelector('h6').textContent;
    expect(h6Content).to.equal("Test User");
  });

  it('should display the date in the correct format', () => {
    var date = mountedComponent.querySelector('.date-display').textContent;
    expect(date).to.equal('09:30 - 29.09.2015');
  });

  it('should display the textContent from props', () => {
    var bodyContent = mountedComponent.querySelector('.body p').textContent;
    expect(bodyContent).to.equal("Here is a message on the feed");
  });

  it('should display the profile picture if passed through', () => {
    var profilePic = mountedComponent.querySelector('.header img').src;
    expect(profilePic).to.contain("url-of-pic");
  });

  it('should display the placeholder image if no profile pic is passed', () => {
    let updatedProps = props;
    updatedProps.profilePic = null;
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(Message, updatedProps));
    var profilePic = React.findDOMNode(updatedComponent).querySelector('.header img').src;
    expect(profilePic).to.contain("assets/img/profile-placeholder.jpg");
  });

  it('should display a textarea if the editable property is true', () => {
    let updatedProps = props;
    updatedProps.editable = true;
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(Message, updatedProps));
    var components = testUtils.scryRenderedDOMComponentsWithTag(updatedComponent, 'textarea');
    expect(components.length).to.equal(1);
  });

  it('should limit the characters of a message to 200 and show a see-more if it exceeds', () => {
    let updatedProps = props;
    updatedProps.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ante volutpat, ultricies nibh nec, fringilla velit. Nunc mattis ut diam eget venenatis. Sed accumsan tortor ac dapibus venenatis. Praesent.";
    updatedProps.editable = false;
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(Message, updatedProps));
    var components = testUtils.scryRenderedDOMComponentsWithClass(updatedComponent, 'see-more');
    expect(components.length).to.equal(1);
  });

  it('should display a comment list', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'comment-list');
    expect(components.length).to.equal(1);
  });

});
