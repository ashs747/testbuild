import React from 'react';
import moment from 'moment-timezone';
import Comment from './Comment.jsx';
import {deleteMessageFromFeed, setEditable, saveMessage, updateMessage} from '../../../../redux/actions/feedActions.js';

var dispatch = Store.dispatch;
/**
  CommentList Component, used to display a list of comments
  Iterates over a list of Comment components, but contains logic to either display the "show x comments" link
  and then show the comments when that's clicked.

  Props:
    comments     - req array (list of comments to display in the list)
    showComments - opt bool (show the list of comments straight away)
    feedId - the identifier of the host feed

  Considerations
    1) Need a state property which reflects whether to display the list or the "show x comments" link

  Functions
    showComments - changes state to fulLString: true. This will cause a render to display the full string rather than a snippet.
*/

class CommentList extends React.Component {

  constructor() {
    super();
    this.showComments = this.showComments.bind(this);
    this.mapComments = this.mapComments.bind(this);
    this.state = {
      showComments: false
    };
  }

  render() {
    let commentList = this.mapComments(this.props.comments);
    let displayCommentsLink = (commentList.length > 0) ? <a className="show-comments-link" onClick={this.showComments}>{`Show ${commentList.length} comment${(commentList.length > 1) ? "s" : ""}`}</a> : null;
    let content = (this.state.showComments || this.props.showComments) ? commentList : displayCommentsLink;
    return (
      <div className="comment-list">
        {content}
      </div>
    );
  }

  mapComments(comments = []) {
    let commentList = comments.map(comment => {
      let key = comment.id;
      let name = `${comment.user.forename} ${comment.user.surname}`;
      let content = comment.content;
      let date = moment(comment.date);
      let profilePic = comment.user.profilePic.reference;
      let editing = comment.editing;
      let userCanEdit = comment.userCanEdit;

      let deleteComment = () => {
        return dispatch(deleteMessageFromFeed(this.props.feedID, comment.id));
      };

      let editComment = () => {
        return dispatch(setEditable(this.props.feedID, comment.id, true));
      };

      let saveMessage = () => {
        return dispatch(saveMessage(this.props.feedID, comment.id));
      };

      let updateComment = (text) => {
        return dispatch(updateMessage(this.props.feedID, comment.id, text));
      };

      return <Comment key={comment.id} name={name} content={content} date={date} profilePic={profilePic} editing={editing} userCanEdit={userCanEdit} dispatchDeleteAction={deleteComment} dispatchEditAction={editComment} editCommentAction={updateComment}/>;
    });
    return commentList;
  }

  showComments() {
    this.setState({
      showComments: true
    });
  }
}

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
  feedID: React.PropTypes.string.isRequired,
  showComments: React.PropTypes.bool
};

export default CommentList;
