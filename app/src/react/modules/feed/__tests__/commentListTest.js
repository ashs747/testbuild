import React from 'react/addons';
import CommentList from '../components/CommentList.jsx';
import {expect, sinon} from 'cirrus/testing/utils';


describe('CommentList', () => {

  var testUtils = React.addons.TestUtils;
  var comments = [{
    id: 1,
    user: {
      forename: "Test",
      surname: "User",
      profilePic: {
        reference: "profile-pic"
      }
    },
    textContent: "This is a comment",
    date: "2015-09-29T09:30:32",
    editing: false,
    userCanEdit: false
  }, {
    id: 2,
    user: {
      forename: "Test",
      surname: "User 2",
      profilePic: {
        reference: "profile-pic"
      }
    },
    textContent: "This is another comment",
    date: "2015-09-29T09:30:32",
    editing: false,
    userCanEdit: false
  }];
  var props = {feedID: 'testFeed', comments: comments};
  var element = React.createElement(CommentList, props);
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

  it('it should render a div with className: comment-list', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'comment-list');
    expect(components.length).to.equal(1);
  });

  it('should map 2 comments if 2 are passed in to the mapper', () => {
    let commentList = component.mapComments(comments);
    expect(commentList.length).to.equal(2);
  });

  it('should display an a tag which says "Show 2 comments" if 2 objects are in the comment list', () => {
    var showComments = mountedComponent.querySelector('.show-comments-link').textContent;
    expect(showComments).to.equal("Show 2 comments");
  });

  it('should display an a tag which says "Show 1 comment" if 1 object is in the comment list', () => {
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(CommentList, {
      feedID: 'testTwo',
      comments: [{
        id: 1,
        user: {
          forename: "Test",
          surname: "User",
          profilePic: {
            reference: "profile-pic"
          }
        },
        textContent: "This is a comment",
        date: "2015-09-29T09:30:32",
        editing: false,
        userCanEdit: false
      }]}));
    let renderedComponent = React.findDOMNode(updatedComponent);
    var showComments = renderedComponent.querySelector('.show-comments-link').textContent;
    expect(showComments).to.equal("Show 1 comment");
  });

  it('shouldn\'t display the comments list by default', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'comment');
    expect(components.length).to.equal(0);
  });

  it('shouldn\'t display anything if there are no comments', () => {
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(CommentList, {feedID: 'a', comments: []}));
    let renderedComponent = React.findDOMNode(updatedComponent);
    expect(renderedComponent.children.length).to.equal(0);
  });

  describe('Action wrapping', () => {
    beforeEach(() => {

    });
  });

});
