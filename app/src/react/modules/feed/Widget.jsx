import React from 'react';
import MessageList from './components/MessageList.jsx';
import PostForm from './components/PostForm.jsx';

export default class FeedWidget extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <PostForm
          feedID={this.props.feedID}
          onSave={() => {}}
          onChange={() => {}}
          showUploadMedia={true}
          showEmbedVideo={true}
          attachments={this.props.attachments}
        />
        <MessageList messages={this.props.messages} feedID={this.props.feedID} />
      </div>
    );
  }
}
