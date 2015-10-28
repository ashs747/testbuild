import React from 'react';
import MessageList from './components/MessageList.jsx';
import PostForm from './components/PostForm.jsx';

export default class FeedWidget extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.messages && this.props.messages.length > 0) {
      return (
        <div className="message-board">
          <PostForm
            feedID={this.props.feedID}
            showUploadMedia={true}
            showEmbedVideo={true}
            attachments={this.props.attachments}
            dispatch={this.props.dispatch}
            content={this.props.content}
          />
          <MessageList messages={this.props.messages} feedID={this.props.feedID} />
        </div>
      );
    }
    return (<p>Loading</p>);
  }
}

