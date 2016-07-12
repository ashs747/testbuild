import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import Video from '../../components/Video.jsx';
import TextArea from 'react-textarea-autosize';
import moment from 'moment-timezone';
import {updateWallPostField, userDeletedEvidence, removeInfoBox, postEvidenceAction, clearTempData, changeEditState} from '../../../redux/actions/wallActions';
import store from '../../../redux/store';
var dispatch = store.dispatch;
import classnames from 'classnames';
import UploadEvidence from './UploadEvidence.jsx';

class ViewEditPost extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getEvidence = this.getEvidence.bind(this);
    this.buildInfoBox = this.buildInfoBox.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onFormSave = this.onFormSave.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onCancelEditClick = this.onCancelEditClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post && nextProps.post && this.props.post.id !== nextProps.post.id) {
      this.postUnmount(this.props.wallId, this.props.post.id);
    }
  }

  render() {
    if (!this.props.post) {
      return <div />;
    }

    var post = this.props.post
    var evidence = this.getEvidence(post);
    var editButton = (this.props.usersPost && post.evidence && !post.editing) ? (
      <a className="btn circle edit-circle" onClick={this.onEditClick}><i className="fa fa-pencil"/></a>
    ) : null;
    var postForm = this.buildPostForm(post, this.props.usersPost);
    return (
      <div className="view-edit-post">
        <div className="post-wrapper clearfix">
          <div className="evidence-wrapper">
            {evidence}
          </div>
          <div className="form-wrapper">
            <div className="action-buttons clearfix">
              {editButton}
              <a className="btn circle close-circle" onClick={this.onCloseClick}><i className="fa fa-times"/></a>
            </div>
            {postForm}
          </div>
        </div>
      </div>
    )
  }

  /*
    Builds the post form
    2 forms:
      1) View post - Viewing the post, show all the info, no edit fields
      2) Edit post, Editing the post, show the edit boxes

    4 cases:
      Users post
        1) No post, "posting" for the first time. Edit === true, UsersPost === true, Evidence === false
        2) Post, "viewing their post". Edit === false, Users Post === true, Evidence === true
        3) Post, "editing a post". Edit === true, Users Post === true, Evidence === true;
      Not users post
        1) Viewing someone elses post. Edit ? , Users Post === false, Evidence ?
  */
  buildPostForm(post, usersPost) {
    if (usersPost) {
      if (post.editing) {
        if (post.postedOn) {
          return this.buildEditPostForm(post);
        }
        return this.buildFirstPostForm(post);
      }
    }
    return this.buildViewPostForm(post);
  }

  /*
    Build the post if the user is editing their already existing post.
    Show edit boxes and disaptch updated field calls
  */
  buildEditPostForm(post) {
    const panel = (post.infoBox) ? this.buildInfoBox(post.infoBox) : null;
    const postClass = classnames("edit-post-form", "editing-post", {'short-textarea': panel});
    const anchor = (post.pending) ? (
      <a className="btn btn-publish"><img src="assets/img/ring-pink.svg" /></a>
    ) : (
      <a className="btn btn-publish" onClick={this.onFormSave}>PUBLISH</a>
    );
    const cancel = (post.pending) ? (
      <a className="btn btn-cancel"><img src="assets/img/ring.svg" /></a>
    ) : (
      <a className="btn btn-cancel" onClick={this.onCancelEditClick}>CANCEL</a>
    );
    var title = post.tempTitle || post.title;
    if (post.tempTitle === "") {
      title = post.tempTitle;
    }
    var description = post.tempDescription || post.description;
    if (post.tempDescription === "") {
      description = post.tempDescription;
    }
    return (
      <div className={postClass}>
        <h3>Edit your post</h3>
        <input disabled={post.pending} type="text" placeholder="Title" value={title} onChange={this.onChange.bind(null, "tempTitle")} />
        <textarea
          disabled={post.pending}
          value={description}
          placeholder="Description"
          onChange={this.onChange.bind(null, "tempDescription")}
        />
        <div className="likes-counter">
          <div className="likes-thumb"><i className="fa fa-thumbs-o-up"/></div>
          <b>{post.likes.length}</b>
        </div>
        {panel}
        <div className="publish-button">
          {cancel}
          {anchor}
        </div>
      </div>
    )
  }

  /*
    Build the post if the user is posting for the first time.
    Show edit boxes and disaptch updated field calls
  */
  buildFirstPostForm(post) {
    const panel = (post.infoBox) ? this.buildInfoBox(post.infoBox) : null;
    const postClass = classnames("edit-post-form", "first-post", {'short-textarea': panel});
    const anchor = (post.pending) ? (
      <a className="btn btn-publish"><img src="assets/img/ring-pink.svg" /></a>
    ) : (
      <a className="btn btn-publish" onClick={this.onFormSave}>PUBLISH</a>
    );
    const title = post.tempTitle || post.title;
    const description = post.tempDescription || post.description;
    return (
      <div className={postClass}>
        <h3>Upload your post</h3>
        <input disabled={post.pending} type="text" placeholder="Title" value={title} onChange={this.onChange.bind(null, "tempTitle")} />
        <textarea
          disabled={post.pending}
          value={description}
          placeholder="Description"
          onChange={this.onChange.bind(null, "tempDescription")}
        />
        {panel}
        <div className="publish-button">
          {anchor}
        </div>
      </div>
    )
  }

  /*
    Build the post if the user viewing the post, theirs or someone elses.
    Show all the details of the post
  */
  buildViewPostForm(post) {
    var profilePicture = (post.owner.profilePic) ? post.owner.profilePic.url : "assets/img/profile-placeholder.jpg";
    var uploaded = (post.evidence) ? <i className="uploaded">Uploaded: {moment(post.postedOn).format('DD.MM.YYYY')}</i> : null;
    var postClass = classnames('edit-post-form', 'view-form', {'not-uploaded': !post.evidence});
    var title = (post.title) ? post.title : "Awaiting Upload";
    var likesWidget = (post.evidence) ? (
      <div className="likes-counter">
        <div className="likes-thumb"><i className="fa fa-thumbs-o-up"/></div>
        <b>{post.likes.length}</b>
      </div>
    ) : null;
    return (
      <div className={postClass}>
        <h3>{title}</h3>
        <img src={profilePicture} alt="profile-picture" />
        <b className="user-name">{post.owner.forename} {post.owner.surname}</b>
        {uploaded}
        <p>{post.description}</p>
        {likesWidget}
      </div>
    )
  }

  buildInfoBox(infoBox) {
    var text = "";
    switch (infoBox.msg) {
      case 'video-processing':
        text = <p>Your video is currently being processed and will display as “unavailable” until complete. Click 'publish' to continue</p>;
        break;
      case 'error':
        text = <p>There has been an error uploading your evidence. If the error persists, please <a target="_blank" href={this.props.supportUrl}>click here</a></p>;
        break;
      case 'no-evidence':
        text = <p>You cannot submit your post without any evidence attached</p>;
        break;
      case 'posted':
        text = <p>Post successfull!</p>;
        break;
    }
    return (
      <div className={`panel panel-${infoBox.type}`}>
        <div className="panel-heading">
          {text}
        </div>
      </div>
    );
  }

  /*
    Get the evidence, if we don't have one, display a placeholder
  */
  getEvidence(post) {
    const imageStyle = {
      height: "100%",
      width: "100%",
      display: "inline-block"
    };

    var evidence = post.evidence;

    if (!evidence) {
      if (this.props.usersPost) {
        return <UploadEvidence wallId={this.props.wallId} post={post} />;
      }
      var awaitingUploadImage = "http://res.cloudinary.com/strata/image/upload/v1467975107/awaiting-upload_wvdhdh.png";
      return <ImageView src={awaitingUploadImage} layout="box-to-image" style={imageStyle} />
    }

    var content;
    var delBtn = (post.editing) ? (
      <a className="btn-delete" onClick={this.onDeleteClick}><i className="fa fa-trash-o"></i></a>
    ) : null;

    if (evidence.type === "image") {
      content = <ImageView src={evidence.url} layout="box-to-image" style={imageStyle} />;
    }
    if (evidence.type === "video") {
      content = <Video url={evidence.url} colour="#ea3592" autoplay={false}/>;
    }
    if (!content) {
      return null;
    }

    return (
      <div className="evidence-inner-wrapper">
        {content}
        {delBtn}
      </div>
    )
  }

  postUnmount(wallId, postId) {
    dispatch(clearTempData(wallId, postId));
    dispatch(removeInfoBox(wallId, postId));
    dispatch(changeEditState(wallId, postId, false));
  }

  /*
    The onClick handler used to dispatch the update action
  */
  onFormSave() {
    dispatch(removeInfoBox(this.props.wallId, this.props.post.id));
    dispatch(postEvidenceAction(this.props.wallId, this.props.post.id, this.props.activityId));
  }

  /*
    The onChange handler used for updating app state with the new field value
  */
  onChange(field, e) {
    dispatch(updateWallPostField(this.props.wallId, this.props.post.id, field, e.target.value));
  }

  /*
    When the user clicks to close the post.
    Dispatch an action to update the parent component with a viewPost: 0.
  */
  onCloseClick() {
    window.location.href = `/#/connections-wall/${this.props.activityId}`;
  }

  /*
    When the user click to stop editing the post.
    Update internal component state and re-render
  */
  onCancelEditClick() {
    this.postUnmount(this.props.wallId, this.props.post.id);
  }

  /*
    When the user clicks to edit the post.
    Update internal component state with this and re-render.
  */
  onEditClick() {
    dispatch(changeEditState(this.props.wallId, this.props.post.id, true));
  }

  onDeleteClick() {
    dispatch(removeInfoBox(this.props.wallId, this.props.post.id));
    dispatch(userDeletedEvidence(this.props.wallId, this.props.post.id));
  }

}

export default ViewEditPost;
