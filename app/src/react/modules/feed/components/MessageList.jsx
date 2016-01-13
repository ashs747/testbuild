import React from 'react';
import moment from 'moment-timezone';
import Message from './Message.jsx';
import {createComment, deleteMessageFromFeed, setEditable, saveUpdatedMessage, updateMessage, updateNewMessage, saveNewMessage} from '../../../../redux/actions/feedActions.js';
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
    this.updateCommentAction = this.updateCommentAction.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  render() {
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
      let name = message.user ? `${message.user.forename} ${message.user.surname}` : '';
      let content = message.content;
      let date = moment(message.updatedOn);
      let profilePic = (message.user && message.user.profilePic) ? message.user.profilePic : '';
      let files = message.files;
      var comments;

      if (message.comments) {
        comments = message.comments.map((comment) => {
          return {...comment};
        });
      } else {
        comments = [];
      }
      let properties = message.user.properties || {};

      let editable = message.editable;
      let userCanEdit = message.can_edit;
      let newComment = message.newComment;
      return <Message
        feedID={this.props.feedID}
        key={key}
        name={name}
        content={content}
        date={date.format()}
        profilePic={profilePic}
        files={files}
        comments={comments}
        editable={editable}
        userCanEdit={userCanEdit}
        commentText={newComment}
        newCommentErr={message.newCommentErr}
        newCommentPending={message.newCommentPending}
        dispatchPostNewCommentAction={this.createComment(key)}
        dispatchUpdateCommentAction={this.updateCommentAction(key)}
        dispatchSaveCommentAction={this.saveMessage(key)}
        dispatchDeleteAction={this.deleteMessage(key)}
        dispatchEditAction={this.editMessage(key)}
        dispatchUpdateAction={this.updateMessage(key)}
        dispatchSaveAction={this.saveMessage(key)}
        profile={this.props.profile}
        jobTitle={properties.jobTitle}
        businessArea={properties.businessArea}
        email={message.user.email}
        telephone={properties.phone}
        userProfilePic={this.props.profilePic} />;
    });
  }

  updateCommentAction(messageID) {
    return (feedID, text) => {
      dispatch(updateNewMessage(this.props.feedID, text, messageID));
    };
  };

  createComment(messageID) {
    return (feedID) => {
      dispatch(createComment(this.props.feedID, messageID));
    };
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
    return (commentID) => {
      return () => {
        dispatch(saveUpdatedMessage(this.props.feedID, messageID, commentID));
      };
    };
  };

  updateMessage(messageID) {
    return (text) => {
      return dispatch(updateMessage(this.props.feedID, messageID, text));
    };
  };
}

export default MessageList;
