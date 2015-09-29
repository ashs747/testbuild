import React from 'react';

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
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.formatContent = this.formatContent.bind(this);
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
          <a className="see-more" onClick={this.showFullString}>... See more <i className="fa fa-chevron-right"></i></a>
        </p>
      );
    }
    let bodyContent = (this.props.editable) ? <textarea rows={3} wrap="soft" defaultValue={this.props.content} /> : bodyString;
    let editButtons = (this.props.userCanEdit) ? (
        <div className="admin-buttons">
          <a className="btn" onClick={this.onEdit}><i className="fa fa-pencil"></i></a>
          <a className="btn" onClick={this.onDelete}><i className="fa fa-times"></i></a>
        </div>) : null;

    return (
      <div className="comment">
        <div className="header">
          <img src={profilePic} />
          <h6>{this.props.name}</h6>
          <span className="date-display">{this.props.date.format('HH:mm - DD.MM.YYYY')}</span>
          {editButtons}
        </div>
        <div className="body">
          {bodyContent}
        </div>
      </div>
    );
  }

  showFullString() {
    this.setState({
      fullString: true
    });
  }

  formatContent(content) {
    //TODO: REGEX STUFF
    const regex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
    let result;
    let indices = [];
    while (result = regex.exec(content)) {
      indices.push(result.index);
    }
    return content;
  }

  onEdit() {
    console.log("edit");
  }

  onDelete() {
    console.log("delete");
  }

}

Comment.propTypes = {
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  date: React.PropTypes.object.isRequired,
  profilePic: React.PropTypes.string,
  editable: React.PropTypes.bool
};

export default Comment;
