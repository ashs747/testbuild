import React from 'react/addons';
import MessageList from '../components/MessageList.jsx';
import {expect} from 'cirrus/testing/utils';
import moment from 'moment-timezone';

describe('MessageList', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    messages: []
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
      date: moment(),
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
      date: moment(),
      files: [],
      comments: [],
      editable: false,
      userCanEdit: false
    }]);
    expect(mapped.length).to.equal(2);
  });

  it('should map the correct fields to the correct properties', () => {
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
      date: moment(),
      files: [],
      comments: [],
      editable: false,
      userCanEdit: false
    }]);
    expect(mapped[0].props).to.have.all.keys(['name', 'content', 'date', 'profilePic', 'files', 'comments', 'editable', 'userCanEdit']);
  });

});
