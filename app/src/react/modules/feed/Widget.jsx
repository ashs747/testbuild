import React from 'react';
import MessageList from './components/MessageList.jsx';
import PostForm from './components/PostForm.jsx';
import {getFeedIdForContext} from '../../../redux/services/feedService';
import {createMessage, updateNewMessage} from '../../../redux/actions/feedActions';

export default class FeedWidget extends React.Component {
  constructor() {
    super();
    this.dispatchUpdateNewMessage = this.dispatchUpdateNewMessage.bind(this);
    this.dispatchCreateMessage = this.dispatchCreateMessage.bind(this);
  }

  render() {
    var context = this.props.context;
    var feeds = this.props.feeds || {};
    if (Object.keys(feeds).length > 0) {
      //We have feeds
      var feedID = getFeedIdForContext(feeds, context);
      var feed = this.props.feeds[feedID];
      let title = (this.props.title) ? <h4 className="semi-bold">{this.props.title}</h4> : null;
      return (
        <div className="message-board">
          {title}
          <PostForm
            feedID={feedID}
            showUploadMedia={true}
            showEmbedVideo={true}
            onEdit={this.dispatchUpdateNewMessage}
            onSave={this.dispatchCreateMessage}
            attachments={feed.files}
            dispatch={this.props.dispatch}
            pending={feed.newMessagePending}
            err={feed.newMessageErr}
            content={feed.newMessageContent}
            postStatus={true}
            profile={this.props.profile}
            profilePic={this.props.profilePic}
          />
          <MessageList messages={feed.messages.map((message) => {
            return message;
          })} feedID={feedID} profile={this.props.profile} />
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
