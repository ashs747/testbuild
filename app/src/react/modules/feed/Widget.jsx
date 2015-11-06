import React from 'react';
import MessageList from './components/MessageList.jsx';
import PostForm from './components/PostForm.jsx';
import {createMessage, updateNewMessage} from '../../../redux/actions/feedActions';
import {getFeedIdForContext} from '../../../redux/services/feedService';

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
      return (
        <div className="message-board">
          <PostForm
            feedID={feedID}
            showUploadMedia={true}
            showEmbedVideo={true}
            onEdit={this.dispatchUpdateNewMessage}
            onSave={this.dispatchCreateMessage}
            attachments={feeds[feedID].files}
            dispatch={this.props.dispatch}
            content={feeds[feedID].newMessageContent}
            postStatus={true}
            profile={this.props.profile}
          />
          <MessageList messages={feeds[feedID].messages} feedID={feedID} profile={this.props.profile} />
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
