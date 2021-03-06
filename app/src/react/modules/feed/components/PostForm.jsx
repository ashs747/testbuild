import React from 'react';
import TextArea from 'react-textarea-autosize';
import UploadMedia from './UploadMedia.jsx';
import EmbedVideo from './EmbedVideo.jsx';
import {removeAttachment, rotateAttachment} from '../../../../redux/actions/feedActions';
import store from '../../../../redux/store';
import ImageView from '../../../components/ImageView.jsx';
import CloudinaryImg from '../../../components/CloudinaryImg.jsx';
var dispatch = store.dispatch;

/**
  PostForm Component, posts a message (or a comment) to a programme feed
  Dumb component, accepts a bunch of event handlers to pass onto child components and invoke itself

  Props:
    feedID - required: the ID against which to post
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
    this.keyPress = this.keyPress.bind(this);
    this.mapAttachments = this.mapAttachments.bind(this);
    this.removeAttachment = this.removeAttachment.bind(this);
  }

  render() {
    let attachments = this.mapAttachments(this.props.attachments);
    let attachmentsjsx = attachments.length > 0 ? (
      <div className="post-attachments">
        {attachments}
      </div>
    ) : null;
    let profilePic = (this.props.profilePic) ? this.props.profilePic : '/assets/img/profile-placeholder.jpg';
    let uploadMedia = (this.props.showUploadMedia) ? <UploadMedia feedId={this.props.feedID} authToken={this.props.authToken} profile={this.props.profile} /> : null;
    let embedVideo = (this.props.showEmbedVideo) ? <EmbedVideo feedId={this.props.feedID} profile={this.props.profile} /> : null;
    let placeholder = (this.props.commentForm) ? "Write a comment" : "What's happening?";
    let postButton;
    if (!this.props.commentForm) {
      var text = (this.props.pending) ? <img src="assets/img/ajax-loader-red.gif" /> : "POST";
      postButton = (
        <div className="post">
          <a className="btn" onClick={this.onSave}>{text}</a>
        </div>
      );
    }
    let className = (this.props.postStatus) ? "post-form-status" : "post-form";

    if (this.props.profile === "sm") {
      className += " mobile-form";
    }
    if (this.props.commentForm) {
      className += " comment-form";
    }
    if (this.props.pending) {
      className += " pending";
    }
    let error = this.props.err ? <div className="alert alert-danger">{this.props.err}</div> : null;
    return (
      <div className={`${className} clearfix`}>
        <div className="post-profile">
          <CloudinaryImg file={profilePic} defaultImg="assets/img/profile-placeholder.jpg" />
        </div>
        <div className="post-message">
          <TextArea disabled={this.props.pending} value={this.props.content} placeholder={placeholder} onKeyDown={this.props.saveOnEnter ? this.keyPress : () => {}} onChange={this.onChange} />
        </div>
        <div className="post-admin-buttons">
          {uploadMedia}
          {embedVideo}
        </div>
        {postButton}
        {error}
        {attachmentsjsx}
      </div>
    );
  }

  mapAttachments(attachments) {
    let attachmentsArray = attachments.map((a) => {
      let thumbnail = '/assets/img/thumb-default.png';
      let rotate;
      if (a) {
        rotate = <a onClick={this.rotateAttachment(a)}><img className="image-icon rotate" src="/assets/img/rotate.png" /></a>;
      }

      let imageViewStyle = {
        backgroundColor: "white",
        height: (this.props.profile === "sm") ? "90px" : "150px",
        width: (this.props.profile === "sm") ? "90px" : "150px",
      };

      if (a.mime_type === "video/mp4") {
        if (a.reference === "youtube") {
          a.metadata.forEach((meta) => {
            if (meta.key === "url") {
              let videoCode = meta.value.split("?v=");
              videoCode = videoCode[1].split("&");
              thumbnail = `http://img.youtube.com/vi/${videoCode[0]}/0.jpg`;
            }
          });
        }
        return (
          <div key={a.id} className="item">
            <img src={thumbnail} style={imageViewStyle} />
            <a onClick={this.removeAttachment(a)}><img className="image-icon remove" src="/assets/img/delete.png" /></a>
          </div>
        );
      }

      return (
        <div key={a.id} className="item">
          <CloudinaryImg file={a} width="120" height="120" style={imageViewStyle} crop="fill" defaultImg={thumbnail} disableAnchor={true} />
          <a onClick={this.removeAttachment(a)}><img className="image-icon remove" src="/assets/img/delete.png" /></a>
          {rotate}
        </div>
      );
    });
    return attachmentsArray;
  }

  onChange(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    this.props.onEdit(this.props.feedID, e.target.value, this.props.messageID);
  }

  onSave(e) {
    e.preventDefault();
    this.props.onSave(this.props.feedID, this.props);
  }

  keyPress(e) {
    var keyPressed = e.which || e.keyCode;
    if (keyPressed === 13) {
      this.onSave(e);
    }
  }

  getFileRotation(fileMeta) {
    return fileMeta.filter((metaEntry) => {
      return (metaEntry.key === 'rotate');
    }).reduce((p, c) => {
      return p + c.value;
    }, 0);
  }

  removeAttachment(file) {
    return (e) => {
      dispatch(removeAttachment(this.props.feedID, file.id));
    };
  }

  rotateAttachment(file) {
    return (e) => {
      let rotation = this.getFileRotation(file.metadata);
      dispatch(rotateAttachment(this.props.feedID, file, rotation));
    };
  }

}
PostForm.defaultProps = { attachments: [] };
PostForm.propTypes = {
  profilePic: React.PropTypes.object,
  attachments: React.PropTypes.array,
  feedID: React.PropTypes.string,
  showUploadMedia: React.PropTypes.bool,
  showEmbedVideo: React.PropTypes.bool,
  pending: React.PropTypes.bool
};
export default PostForm;
