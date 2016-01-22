import React from 'react';
import CommentList from './CommentList.jsx';
import InlineEdit from './InlineEdit.jsx';
import URLBuilder from '../helpers/URLBuilder';
import PostForm from './PostForm.jsx';
import CloudinaryImg from '../../../components/CloudinaryImg.jsx';
import MediaGrid from '../../../components/MediaGrid.jsx';
import moment from 'moment-timezone';
import Tooltip from '../../tooltip/Wrapper.jsx';

/**
  Message Component, used to display a message (top level post) on the programme feed
  Dumb component, only accepts and displays props, has no sorting logic

  Props:
    name        - req string (the full name of the user who posted the message)
    content     - req string (the body of the message)
    date        - req moment object (the date the message was posted (or updated) in format: HH:mm - DD.MM.YYYY)
    profilePic  - opt string (url of the profile picture)
    files       - opt array (an array of images uploaded with the post to display)
    comments    - opt array (an array of comments associated with the message)
    editable    - opt bool (whether to display a textarea for editing the message inline when clicking the edit button)
    userCanEdit - opt bool (whether the user can edit or delete the message)

  Considerations:
    1) If the content exceeds a certain length, need to show a 'show more' link to show the rest
    2) If there is no profile picture (falsey) then display a localy stored placeholder image
    3) If there are images associated with a message, display them in a media grid
    4) Should always contain a comment list by default even if it is passed an empty array

  Functions
    showFulLString - changes state to fulLString: true. This will cause a render to display the full string rather than a snippet.
*/

class Message extends React.Component {

  constructor() {
    super();
    this.onEditClicked = this.onEditClicked.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.showFullString = this.showFullString.bind(this);
    this.editNewComment = this.editNewComment.bind(this);
    this.createComment = this.createComment.bind(this);
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

  shouldComponentUpdate(nextProps, nextState) {
    let changeableKeys = ['content', 'editable', 'commentText', 'newCommentPending', 'err', 'newCommentErr'];

    if (this.state.fullString !== nextState.fullString) {
      return true;
    }

    for (let key in nextProps) {
      if (nextProps.hasOwnProperty(key) && changeableKeys.indexOf(key) >= 0 && (this.props[key] !== nextProps[key])) {
        return true;
      }
    }

    if (nextProps.comments.length !== this.props.comments.length) {
      return true;
    }

    for (let i = 0; i < nextProps.comments.length; i += 1) {
      let thisComment = this.props.comments[i],
        nextComment = nextProps.comments[i];
      for (let key in nextProps) {
        if (nextComment.hasOwnProperty(key) && changeableKeys.indexOf(key) > -1 && thisComment[key] !== nextComment[key]) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    let profilePic = this.props.profilePic;
    let bodyString = <p>{this.props.content.split(' ').map(URLBuilder)}</p>;
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

    let bodyContent = (this.props.editable) ? <InlineEdit onChangeHandler={this.props.dispatchUpdateAction} save={this.props.dispatchSaveAction()} content={this.props.content} /> : bodyString;
    let editButtons = (this.props.userCanEdit) ? (
        <div className="admin-buttons">
          <a className="btn" onClick={this.onEditClicked}><i className="fa fa-pencil"></i></a>
          <a className="btn" onClick={this.onDeleteClicked}><i className="fa fa-times"></i></a>
        </div>) : null;
    let content = (
      <div>
        <div className="user-display-tooltip-header">
          <p>{this.props.name}</p>
        </div>
        <div className="user-display-tooltip-body">
          <div className="profile-image">
            <CloudinaryImg default="assets/img/profile-placeholder.jpg" file={profilePic} />
          </div>
          <p>{this.props.jobTitle}</p>
          <p>{this.props.businessArea}</p>
          <p>{this.props.email}</p>
          <p>{this.props.telephone}</p>
        </div>
      </div>
    );

    return (
      <div className={`message ${(this.props.profile === "sm") ? "mobile-message" : ""}`}>
        <div className="header clearfix">
          <CloudinaryImg file={profilePic} alt={this.props.name} defaultImg="assets/img/profile-placeholder.jpg"/>
          <div className="header-text">
            <Tooltip trigger={<p><b><u>{this.props.name}</u></b></p>} content={content} className="mini-profile-tooltip" />
            <p className="date-display">{moment(this.props.date).format('HH:mm - DD.MM.YYYY')}</p>
          </div>
          {editButtons}
        </div>
        <div className="body">
          {bodyContent}
        </div>
        <div className="images">
          <MediaGrid files={this.props.files} />
        </div>
        <CommentList comments={this.props.comments} feedID={this.props.feedID} profile={this.props.profile} saveMessage={this.props.dispatchSaveCommentAction}/>
        <PostForm feedID={this.props.feedID}
          content={this.props.commentText}
          onSave={this.createComment}
          onEdit={this.editNewComment}
          err={this.props.newCommentErr}
          pending={this.props.newCommentPending}
          commentForm={true}
          profile={this.props.profile}
          saveOnEnter={true}
          profilePic={this.props.userProfilePic}
        />
      </div>
    );
  }

  editNewComment(feedID, text) {
    this.props.dispatchUpdateCommentAction(feedID, text);
  }

  createComment() {
    this.props.dispatchPostNewCommentAction(this.props.feedID);
  }

  showFullString() {
    this.setState({
      fullString: true
    });
  }

  onEditClicked(e) {
    this.props.dispatchEditAction();
  }

  onDeleteClicked(e) {
    this.props.dispatchDeleteAction();
  }
}

Message.defaultProps = {
  files: [],
  comments: []
};

Message.propTypes = {
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  profilePic: React.PropTypes.object,
  files: React.PropTypes.array,
  comments: React.PropTypes.array,
  editable: React.PropTypes.bool,
  userCanEdit: React.PropTypes.bool,
  feedID: React.PropTypes.string.isRequired,
  dispatchDeleteAction: React.PropTypes.func,
  dispatchEditAction: React.PropTypes.func,
  dispatchUpdateAction: React.PropTypes.func,
  dispatchSaveAction: React.PropTypes.func
};
export default Message;
