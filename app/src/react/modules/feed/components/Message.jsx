import React from 'react';

/**
  Message Component, used to display a message (top level post) on the programme feed
  Dumb component, only accepts and displays props, has no sorting logic

  Props:
    name        - req string (the full name of the user who posted the message)
    textContent - req string (the body of the message)
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

*/

class Message extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="message">
        Message
      </div>
    );
  }

}

Message.defaultProps = {
  files: [],
  comments: []
};

Message.propTypes = {
  name: React.PropTypes.string.isRequired,
  textContent: React.PropTypes.string.isRequired,
  date: React.PropTypes.object.isRequired,
  profilePic: React.PropTypes.string,
  files: React.PropTypes.array,
  comments: React.PropTypes.array,
  editable: React.PropTypes.bool,
  userCanEdit: React.PropTypes.bool
};
export default Message;
