import React from 'react';
import TextArea from 'react-textarea-autosize';
import InlineEdit from './InlineEdit.jsx';
import URLBuilder from '../helpers/URLBuilder';

/**
  Comment Component, used to display a comment (child of a message) on the programme feed
  Dumb component, only accepts and displays props, has no sorting logic

  Props:
    name        - req string (the full name of the user who posted the comment)
    content     - req string (the body of the comment)
    date        - req moment object (the date the message was posted (or updated) in format: HH:mm - DD.MM.YYYY)
    profilePic  - opt string (url of the profile picture)
    editable    - opt bool (whether to display a textarea for editing the comment inline when clicking the edit button)
    userCanEdit - opt bool (whether the user can edit or delete the comment)

  Considerations
    1) If the content exceeds a certain length, need to show a 'show more' link to show the rest
    2) If there is no profile picture (falsey) then display a localy stored placeholder image

  Functions
    showFulLString - changes state to fulLString: true. This will cause a render to display the full string rather than a snippet.
    formatContent  - formats a content string, to return a regexed version where web addresses are <a> tags
*/

class Comment extends React.Component {

  constructor() {
    super();
    this.showFullString = this.showFullString.bind(this);
    this.onEditClicked = this.onEditClicked.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.formatContent = this.formatContent.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSaveComment = this.onSaveComment.bind(this);
    this.state = {
      fullString: true
    };
  }

  componentWillMount() {
    if (this.props.content.length > 200) {
      this.setState({
        fullString: false
      });
    }
  }

  render() {
    let profilePic = (this.props.profilePic) ? this.props.profilePic : '/assets/img/profile-placeholder.jpg';
    let bodyString = <p>{this.formatContent(this.props.content)}</p>;
    if (!this.state.fullString) {
      //String is too long, show small one and display see more link to change to fullstring
      let subString = this.props.content.substring(0, 200);
      bodyString = (
        <p>
          {subString}
          <a className="see-more" onClick={this.showFullString}> See more <i className="fa fa-chevron-right"></i></a>
        </p>
      );
    }
    let bodyContent = (this.props.editing) ? <InlineEdit content={this.props.content} save={this.onSaveComment} onChangeHandler={this.onChangeHandler}/> : bodyString;
    let editButtons = (this.props.userCanEdit) ? (
        <div className="admin-buttons">
          <a className="btn" onClick={this.onEditClicked}><i className="fa fa-pencil"></i></a>
          <a className="btn" onClick={this.onDeleteClicked}><i className="fa fa-times"></i></a>
        </div>
      ) : null;
    let contentClass = "comment-content";
    if (this.props.userCanEdit) contentClass += " with-buttons";
    return (
      <div className={`comment clearfix ${(this.props.profile === "sm") ? "mobile-comment" : "" }`}>
        <img src={profilePic} />
        <div className={contentClass}>
          <h6>{this.props.name}</h6>
          {bodyContent}
          <span className="comment-date-display">{this.props.date.format('HH:mm - DD.MM.YYYY')}</span>
        </div>
        {editButtons}
      </div>
    );
  }

  showFullString() {
    this.setState({
      fullString: true
    });
  }

  formatContent(content) {
    return content.split(' ').map(URLBuilder);
  }

  onSaveComment(e) {
    this.props.dispatchSaveAction(e);
  }

  onEditClicked(e) {
    this.props.dispatchEditAction(e);
  }

  onDeleteClicked(e) {
    this.props.dispatchDeleteAction(e);
  }

  onChangeHandler(text) {
    this.props.editCommentAction(text);
  }
}

Comment.propTypes = {
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  date: React.PropTypes.object.isRequired,
  profilePic: React.PropTypes.string,
  editing: React.PropTypes.bool
};

export default Comment;
