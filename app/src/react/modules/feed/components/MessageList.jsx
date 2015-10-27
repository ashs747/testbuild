import React from 'react';
import Message from './Message.jsx';
import {deleteMessageFromFeed, setEditable, saveUpdatedMessage, updateMessage} from '../../../../redux/actions/feedActions.js';
import Store from '../../../../redux/store';
var dispatch = Store.dispatch;

/**
  MessageList Component, used to display a list of messages
  Iterates over a list of Message components

  Props:
    messages - req array (list of messages to display in the list)

  Considerations
    n/a
*/

class MessageList extends React.Component {

  constructor() {
    super();
    this.deleteMessage = this.deleteMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
    this.mapMessages = this.mapMessages.bind(this);
  }

  render() {
    console.log('messages passed:', this.props.messages);
    let messages = (this.props.messages && this.props.messages.length > 0) ? this.mapMessages(this.props.messages) : '';
    return (
      <div className="message-list">
        {messages}
      </div>
    );
  }

  mapMessages(messages) {
    return messages.map(message => {
      let key = message.id;
      let name = `${message.user.forename} ${message.user.surname}`;
      let content = message.content;
      let date = message.date;
      let profilePic = message.user.profilePic ? message.user.profilePic.reference : '';
      let files = message.files;
      let comments = message.comments;
      let editable = message.editing;
      let userCanEdit = message.userCanEdit;
      return <Message 
        feedID={this.props.feedID}
        key={key} name={name}
        content={content}
        date={date}
        profilePic={profilePic}
        files={files}
        comments={comments}
        editable={editable}
        userCanEdit={userCanEdit}
        dispatchDeleteAction={this.deleteMessage(key)}
        dispatchEditAction={this.editMessage(key)}
        dispatchUpdateAction={this.updateMessage(key)}
        dispatchSaveAction={this.saveMessage(key)}/>;
    });
  }

  deleteMessage(messageID) {
    return () => {
      dispatch(deleteMessageFromFeed(this.props.feedID, messageID));
    };
  };

  editMessage(messageID) {
    return () => {
      dispatch(setEditable(this.props.feedID, messageID, true));
    };
  };

  saveMessage(messageID) {
    return () => {
      return dispatch(saveUpdatedMessage(this.props.feedID, messageID));
    };
  };

  updateMessage(messageID) {
    return (text) => {
      if (text) {
        return dispatch(updateMessage(this.props.feedID, messageID, text));
      }
    };
  };
}

export default MessageList;
