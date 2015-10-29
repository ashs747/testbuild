import React from 'react/addons';
import MessageList from '../components/MessageList.jsx';
import {expect} from 'cirrus/testing/utils';
import moment from 'moment-timezone';

describe('MessageList', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    messages: [],
    feedID: 'a'
  };
  var element = React.createElement(MessageList, props);
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

  it('it should render a div with className: message-list', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'message-list');
    expect(components.length).to.equal(1);
  });

  it('should map 2 messages if 2 are passed into mappMessages()', () => {
    var mapped = component.mapMessages([{
      id: 1,
      user: {
        forename: "Test",
        surname: "User",
        profilePic: {
          id: 1,
          reference: 'profile-pic'
        }
      },
      content: "This is a status",
      updatedOn: "2015-09-29T09:30:32",
      createdOn: "2015-09-29T09:30:32",
      files: [],
      comments: [],
      editable: false,
      userCanEdit: false
    }, {
      id: 2,
      user: {
        forename: "Test",
        surname: "User",
        profilePic: {
          id: 2,
          reference: 'profile-pic'
        }
      },
      content: "This is a status",
      updatedOn: "2015-09-29T09:30:32",
      createdOn: "2015-09-29T09:30:32",
      files: [],
      comments: [],
      editable: false,
      userCanEdit: false
    }]);
    expect(mapped.length).to.equal(2);
  });

});
