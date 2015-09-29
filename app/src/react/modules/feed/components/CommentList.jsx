import React from 'react';
import moment from 'moment-timezone';
import Comment from './Comment.jsx';

/**
  CommentList Component, used to display a list of comments
  Iterates over a list of Comment components, but contains logic to either display the "show x comments" link
  and then show the comments when that's clicked.

  Props:
    comments     - req array (list of comments to display in the list)
    showComments - opt bool (show the list of comments straight away)

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
    let displayCommentsLink = (commentList.length > 0) ? <a className="show-comments-link" onClick={this.showComments}>{`Show ${commentList.length} comments`}</a> : null;
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
      let content = comment.textContent;
      let date = moment(comment.date);
      let profilePic = comment.user.profilePic.reference;
      let editable = comment.editing;
      let userCanEdit = comment.userCanEdit;
      return <Comment key={comment.id} name={name} content={name} date={date} profilePic={profilePic} editable={editable} userCanEdit={userCanEdit} />;
    });
    return commentList;
  }

  showComments() {
    this.setState({
      showComments: true
    });
  }

}

CommentList.propTypes = { comments: React.PropTypes.array.isRequired, showComments: React.PropTypes.bool };
export default CommentList;
