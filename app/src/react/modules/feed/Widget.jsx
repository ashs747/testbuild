import React from 'react';
import MessageList from 'components/MessageList';
import PostForm from 'components/PostForm';

export default class FeedWidget extends React.component {
  constructor() {
  	super();
  }

  render() {
  	let messages = this.props.feed.messages.map((message) => )
  	return (
  		<div>
  			<PostForm feedID={this.props.feed.id}/>
  			<MessageList messages={this.props.messages} feedID={this.props.feed.id} />
  		</div>
  	);
  }
}