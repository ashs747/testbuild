import React from 'react';
import Message from './Message.jsx';

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
  }

  render() {
    let messages = this.mapMessages(this.props.messages);
    return (
      <div className="message-list">
        {messages}
      </div>
    );
  }

  mapMessages(messages) {
    let mappedMessages = messages.map(message => {
      let key = message.id;
      let name = `${message.user.forename} ${message.user.surname}`;
      let content = message.content;
      let date = message.date;
      let profilePic = message.user.profilePic.reference;
      let files = message.files;
      let comments = message.comments;
      let editable = message.editing;
      let userCanEdit = message.userCanEdit;
      return <Message feedID={this.props.feedID} key={key} name={name} content={content} date={date}
        profilePic={profilePic} files={files} comments={comments}
        editable={editable} userCanEdit={userCanEdit} />;
    });
    return mappedMessages;
  }

}

MessageList.propTypes = { messages: React.PropTypes.array.isRequired };
export default MessageList;
