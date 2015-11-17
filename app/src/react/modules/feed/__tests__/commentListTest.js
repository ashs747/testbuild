import React from 'react/addons';
import CommentList from '../components/CommentList.jsx';
import {expect, sinon} from 'cirrus/testing/utils';

// Mock Deps
CommentList.__set__('dispatch', () => {});
CommentList.__set__('deleteMessageFromFeed', () => {});
CommentList.__set__('setEditable', () => {});
CommentList.__set__('saveUpdatedMessage', () => {});
CommentList.__set__('updateMessage', () => {});

describe('CommentList', () => {

  var testUtils = React.addons.TestUtils;

  /*
let key = comment.id;
      let name = `${comment.user.forename} ${comment.user.surname}`;
      let content = comment.content;
      let date = moment(comment.date);
      let profilePic = comment.user.profilePic ? comment.user.profilePic.reference : '';
      let editing = comment.editing;
      let userCanEdit = comment.userCanEdit;
      let deleteComment = () => {
        return dispatch(deleteMessageFromFeed(this.props.feedID, comment.id));
      };
       */

  var comments = [{
    id: 1,
    user: {
      forename: "Test",
      surname: "User",
      profilePic: {
        reference: "profile-pic"
      }
    },
    content: "This is a comment",
    updatedOn: "2015-09-29T09:30:32",
    createdOn: "2015-09-29T09:30:32",
    editable: false,
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
    content: "This is another comment",
    updatedOn: "2015-09-29T09:30:32",
    createdOn: "2015-09-29T09:30:32",
    editable: false,
    userCanEdit: false
  }];
  var props = {feedID: 'testFeed', comments: comments, saveMessage: function() {}};
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

  it('shouldn\'t display the comments list by default', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'comment');
    expect(components.length).to.equal(0);
  });

  it('should not display a show-comments link if there are no comments', () => {
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(CommentList, {feedID: 'a', comments: []}));
    let renderedComponent = React.findDOMNode(updatedComponent);
    let commentLink = testUtils.scryRenderedDOMComponentsWithClass(updatedComponent, '.show-comments-link');
    expect(commentLink.length).to.equal(0);
    expect(renderedComponent.children.length).to.equal(0);
  });
});
