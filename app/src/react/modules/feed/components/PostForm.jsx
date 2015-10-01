import React from 'react';
import TextArea from 'react-textarea-autosize';

/**
  PostForm Component, posts a message to a programme feed
  Dumb component, accepts a bunch of event handlers to pass onto child components and invoke itself

  Props:
    profilePic - opt string (users profile picture url)
    onSave - req function (what fires when the save button)
    onChange - req function (whenever anything inside the component, attach to the textarea)
    onUploadMedia - req function (passed into upload component)
    onEmbedVideo - req function (passed into the embed video component)
    attachments - opt array (what files are attached, keeping in line with the looped state passing the files down as they are uploaded and set in app state)
*/

class PostForm extends React.Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  render() {
    /**
      this.props.attachments.map(attachment => {
        return <Attachment props=props />
      });
      <UploadMedia onUpload={this.props.onUploadMedia} />
      <EmbedVideo onEmbedVideo={this.props.onEmbedVideo} />
    */
    let profilePic = (this.props.profilePic) ? this.props.profilePic : '/assets/img/profile-placeholder.jpg';
    return (
      <div className="post-form">
        <div className="profile">
          <img src={profilePic} />
        </div>
        <div className="message">
          <TextArea placeholder="What's happening?" onChange={this.onChange} />
        </div>
        <div className="post">
          <a className="btn" onClick={this.onSave}>Post</a>
        </div>
      </div>
    );
  }

  onChange(e) {
   e.preventDefault ? e.preventDefault() : e.returnValue = false;
   this.props.onChange(e.target.value);
  }

  onSave() {
    //Any saving logic goes here
    this.props.onSave();
  }

}
PostForm.defaultProps = { attachments: [] };
PostForm.propTypes = {
  profilePic: React.PropTypes.string,
  attachments: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUploadMedia: React.PropTypes.func.isRequired,
  onEmbedVideo: React.PropTypes.func.isRequired
};
export default PostForm;
