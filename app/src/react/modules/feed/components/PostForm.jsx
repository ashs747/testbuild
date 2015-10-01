import React from 'react';
import TextArea from 'react-textarea-autosize';

/**
  PostForm Component, posts a message (or a comment) to a programme feed
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
    this.onUploadMedia = this.onUploadMedia.bind(this);
    this.onEmbedVideo = this.onEmbedVideo.bind(this);
  }

  render() {
    /**
      this.props.attachments.map(attachment => {
        return <Attachment props=props />
      });
    */
    let profilePic = (this.props.profilePic) ? this.props.profilePic : '/assets/img/profile-placeholder.jpg';
    let uploadMedia = (this.props.onUploadMedia) ? (
      <a className="btn upload-media" onClick={this.onUploadMedia} ><i className="fa fa-picture-o"> Upload Media/Video</i></a>
    ) : null;
    let embedVideo = (this.props.onEmbedVideo) ? (
      <a className="btn embed-video" onClick={this.onEmbedVideo} ><i className="fa fa-video-camera"> Embed Youtube/Vimeo</i></a>
    ) : null;
    return (
      <div className="post-form">
        <div className="profile">
          <img src={profilePic} />
        </div>
        <div className="message">
          <TextArea placeholder="What's happening?" onChange={this.onChange} />
        </div>
        <div className="buttons">
          {uploadMedia}
          {embedVideo}
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
    this.props.onSave();
  }

  onUploadMedia() {
    this.props.onUploadMedia();
  }

  onEmbedVideo() {
    this.props.onEmbedVideo();
  }

}
PostForm.defaultProps = { attachments: [] };
PostForm.propTypes = {
  profilePic: React.PropTypes.string,
  attachments: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUploadMedia: React.PropTypes.func,
  onEmbedVideo: React.PropTypes.func
};
export default PostForm;
