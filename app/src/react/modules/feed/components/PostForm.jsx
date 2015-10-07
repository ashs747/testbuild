import React from 'react';
import TextArea from 'react-textarea-autosize';
import UploadMedia from './UploadMedia.jsx';
import EmbedVideo from './EmbedVideo.jsx';
import {removeAttachment, rotateAttachment} from '../../../../redux/actions/feedActions';
import {dispatch} from '../../../../redux/store';

/**
  PostForm Component, posts a message (or a comment) to a programme feed
  Dumb component, accepts a bunch of event handlers to pass onto child components and invoke itself

  Props:
    profilePic - opt string (users profile picture url)
    onSave - req function (what fires when the save button)
    onChange - req function (whenever anything inside the component, attach to the textarea)
    showUploadMedia - opt bool (whether to show the upload component, makes the post form generic and that it can be used to post comments too)
    showEmbedVideo - req function (passed into the embed video component)
    attachments - opt array (what files are attached, keeping in line with the looped state passing the files down as they are uploaded and set in app state)
*/

class PostForm extends React.Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.mapAttachments = this.mapAttachments.bind(this);
  }

  render() {
    let attachments = this.mapAttachments(this.props.attachments);
    let profilePic = (this.props.profilePic) ? this.props.profilePic : '/assets/img/profile-placeholder.jpg';
    let uploadMedia = (this.props.showUploadMedia) ? <UploadMedia feedId="testTwo" /> : null;
    let embedVideo = (this.props.showEmbedVideo) ? <EmbedVideo feedId="testTwo" /> : null;
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
        <div className="attachments">
          {attachments}
        </div>
        <div className="post">
          <a className="btn" onClick={this.onSave}>Post</a>
        </div>
      </div>
    );
  }

  mapAttachments(attachments) {
    let attachmentsArray = attachments.map((a, i) => {
      let fileVariations = [a.reference, a.variations[0].reference];
      let thumbnail = '/assets/img/thumb-default.png';
      let rotate;
      if (a.thumbnail) {
        thumbnail = a.thumbnail;
        rotate = <a onClick={this.rotateAttachment.bind(this, fileVariations, a.reference)}>Rotate</a>;
      }
      return (
        <div key={a.reference} className="item">
          <img src={thumbnail} />
          <a onClick={this.removeAttachment.bind(this, a.reference)}>Remove</a>
          {rotate}
        </div>
      );
    });
    return attachmentsArray;
  }

  onChange(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    this.props.onChange(e.target.value);
  }

  onSave() {
    this.props.onSave();
  }

  removeAttachment(reference) {
    dispatch(removeAttachment("testTwo", reference));
  }

  rotateAttachment(variations, reference) {
    dispatch(rotateAttachment("testTwo", reference, variations));
  }

}
PostForm.defaultProps = { attachments: [] };
PostForm.propTypes = {
  profilePic: React.PropTypes.string,
  attachments: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  showUploadMedia: React.PropTypes.bool,
  showEmbedVideo: React.PropTypes.bool
};
export default PostForm;
