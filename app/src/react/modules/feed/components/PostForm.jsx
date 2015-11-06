import React from 'react';
import TextArea from 'react-textarea-autosize';
import UploadMedia from './UploadMedia.jsx';
import EmbedVideo from './EmbedVideo.jsx';
import {removeAttachment, rotateAttachment} from '../../../../redux/actions/feedActions';;
import {dispatch} from '../../../../redux/store';
import ImageView from '../../../components/ImageView.jsx';

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
    this.mapAttachments = this.mapAttachments.bind(this);
  }

  render() {
    let attachments = this.mapAttachments(this.props.attachments);
    let profilePic = (this.props.profilePic) ? this.props.profilePic : '/assets/img/profile-placeholder.jpg';
    let uploadMedia = (this.props.showUploadMedia) ? <UploadMedia feedId={this.props.feedID} /> : null;
    let embedVideo = (this.props.showEmbedVideo) ? <EmbedVideo feedId={this.props.feedID} /> : null;
    let placeholder = (this.props.commentForm) ? "Write a comment" : "What's happening?";
    let postButton = (this.props.commentForm) ? null : (
      <div className="post">
        <a className="btn" onClick={this.onSave}>Post</a>
      </div>
    );
    let className = (this.props.postStatus) ? "post-form-status" : "post-form";
    if (this.props.profile === "sm") {
      className += " mobile-form";
    }
    if (this.props.commentForm) {
      className += " comment-form";
    }
    return (
      <div className={`${className} clearfix`}>
        <div className="post-profile">
          <img src={profilePic} />
        </div>
        <div className="post-message">
          <TextArea value={this.props.content} placeholder={placeholder} onChange={this.onChange} />
        </div>
        <div className="post-admin-buttons">
          {uploadMedia}
          {embedVideo}
        </div>
        <div className="post-attachments">
          {attachments}
        </div>
        {postButton}
      </div>
    );
  }

  mapAttachments(attachments) {
    let attachmentsArray = attachments.map((a, i) => {
      let thumbnail = '/assets/img/thumb-default.png';
      let rotate;
      if (a.thumbnail) {
        thumbnail = a.thumbnail;
        if (a.previewUrl) {
          rotate = <a onClick={this.rotateAttachment.bind(this, a.id)}><img className="image-icon rotate" src="/assets/img/rotate.png" /></a>;
        }
      }
      let imageViewStyle = {
        backgroundColor: "white",
        height: (this.props.profile === "sm") ? "90px" : "150px",
        width: (this.props.profile === "sm") ? "90px" : "150px",
      };
      return (
        <div key={a.id} className="item">
          <ImageView src={thumbnail} style={imageViewStyle} />
          <a onClick={this.removeAttachment.bind(this, a.id)}><img className="image-icon remove" src="/assets/img/delete.png" /></a>
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

  removeAttachment(id) {
    dispatch(removeAttachment(this.props.feedID, id));
  }

  rotateAttachment(id) {
    dispatch(rotateAttachment(this.props.feedID, id));
  }

}
PostForm.defaultProps = { attachments: [] };
PostForm.propTypes = {
  profilePic: React.PropTypes.string,
  attachments: React.PropTypes.array,
  feedID: React.PropTypes.string,
  showUploadMedia: React.PropTypes.bool,
  showEmbedVideo: React.PropTypes.bool
};
export default PostForm;
