import React from 'react';

/**
  MessageList Component, used to display a list of messages
  Iterates over a list of Message components

  Props:
    comments     - req array (list of comments to display in the list)

  Considerations
    n/a

*/

class MessageList extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="message-list">
        MessageList
      </div>
    );
  }

}

export default MessageList;
