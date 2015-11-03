import React from 'react/addons';
import Comment from '../components/Comment.jsx';
import {expect} from 'cirrus/testing/utils';
import moment from 'moment-timezone';

describe('Comment', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    name: "Test User",
    content: "here is a comment on a message",
    date: moment('2015-09-29T09:30:32'),
    profilePic: "url-of-pic",
    onEdit: (test => {}),
    onDelete: (test => {}),
    editable: false
  };
  var element = React.createElement(Comment, props);
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

  it('should render a div with className: comment', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'comment');
    expect(components.length).to.equal(1);
  });

  it('should display the name of the user posted through props', () => {
    var h6Content = mountedComponent.querySelector('h6').textContent;
    expect(h6Content).to.equal("Test User");
  });

  it('should display the date in the correct format', () => {
    var date = mountedComponent.querySelector('.comment-date-display').textContent;
    expect(date).to.equal('09:30 - 29.09.2015');
  });

  it('should display the profile picture if passed through', () => {
    var profilePic = mountedComponent.querySelector('img').src;
    expect(profilePic).to.contain("url-of-pic");
  });

  it('should display the placeholder image if no profile pic is passed', () => {
    let updatedProps = props;
    updatedProps.profilePic = null;
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(Comment, updatedProps));
    var profilePic = React.findDOMNode(updatedComponent).querySelector('img').src;
    expect(profilePic).to.contain("assets/img/profile-placeholder.jpg");
  });

  it('should limit the characters of a message to 200 and show a see-more if it exceeds', () => {
    let updatedProps = props;
    updatedProps.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ante volutpat, ultricies nibh nec, fringilla velit. Nunc mattis ut diam eget venenatis. Sed accumsan tortor ac dapibus venenatis. Praesent.";
    updatedProps.editable = false;
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(Comment, updatedProps));
    var components = testUtils.scryRenderedDOMComponentsWithClass(updatedComponent, 'see-more');
    expect(components.length).to.equal(1);
  });

});
