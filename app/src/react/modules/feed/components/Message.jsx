import React from 'react';
import moment from 'moment-timezone';
import CommentList from './CommentList.jsx';
import InlineEdit from './InlineEdit.jsx';
import URLBuilder from '../helpers/URLBuilder';

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
    let bodyString = <p>{this.props.content.split(' ').map(URLBuilder)}</p>;
    if (!this.state.fullString) {
      //String is too long, show small one and display see more link to change to fullstring
      let subString = this.props.content.substring(0, 200);
      bodyString = (
        <p>
          {subString}
          <a className="see-more" onClick={this.showFullString}>... See more <i className="fa fa-chevron-right"></i></a>
        </p>
      );
    }

    let bodyContent = (this.props.editable) ? <InlineEdit onChangeHandler={this.props.dispatchUpdateAction} save={this.props.dispatchSaveAction} content={this.props.content} /> : bodyString;
    let editButtons = (this.props.userCanEdit) ? (
        <div className="admin-buttons">
          <a className="btn" onClick={this.onEditClicked}><i className="fa fa-pencil"></i></a>
          <a className="btn" onClick={this.onDeleteClicked}><i className="fa fa-times"></i></a>
        </div>) : null;
    let postImages = this.props.files.map(file => {
      return <img key={file.id} className="post-image" src={file.reference} />;
    });
    return (
      <div className="message">
        <div className="header">
          <img src={profilePic} />
          <h6>{this.props.name}</h6>
          <span className="date-display">{moment(this.props.date).format('HH:mm - DD.MM.YYYY')}</span>
          {editButtons}
        </div>
        <div className="body">
          {bodyContent}
        </div>
        <div className="images">
          {postImages}
        </div>
        <CommentList comments={this.props.comments} feedID={this.props.feedID}/>
      </div>
    );
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
  profilePic: React.PropTypes.string,
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
