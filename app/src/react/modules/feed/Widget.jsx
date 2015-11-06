import React from 'react';
import MessageList from './components/MessageList.jsx';
import PostForm from './components/PostForm.jsx';
import {createMessage, updateNewMessage} from '../../../redux/actions/feedActions';

export default class FeedWidget extends React.Component {
  constructor() {
    super();
    this.dispatchUpdateNewMessage = this.dispatchUpdateNewMessage.bind(this);
    this.dispatchCreateMessage = this.dispatchCreateMessage.bind(this);
  }

  render() {
    if (this.props.messages && this.props.messages.length > 0) {
      return (
        <div className="message-board">
          <PostForm
            feedID={this.props.feedID}
            showUploadMedia={true}
            showEmbedVideo={true}
            onEdit={this.dispatchUpdateNewMessage}
            onSave={this.dispatchCreateMessage}
            attachments={this.props.attachments}
            dispatch={this.props.dispatch}
            content={this.props.content}
            newComment={this.props.newComment}
            postStatus={true}
            profile={this.props.profile}
          />
          <MessageList messages={this.props.messages} feedID={this.props.feedID} profile={this.props.profile} />
        </div>
      );
    }
    return (<p>Loading</p>);
  }

  dispatchCreateMessage() {
    this.props.dispatch(createMessage(...arguments));
  }

  dispatchUpdateNewMessage() {
    this.props.dispatch(updateNewMessage(...arguments));
  }
}
