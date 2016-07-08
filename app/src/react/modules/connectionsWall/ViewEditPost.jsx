import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import Video from '../../components/Video.jsx';
import TextArea from 'react-textarea-autosize';
import moment from 'moment-timezone';
import {updateWallPostField} from '../../../redux/actions/wallActions';
import store from '../../../redux/store';
var dispatch = store.dispatch;
import classnames from 'classnames';
import UploadEvidence from './UploadEvidence.jsx';

class ViewEditPost extends React.Component {

  constructor(props) {
    super(props);
    var editing = false;
    if (props.post && !props.post.evidence && props.usersPost) {
      editing = true;
    }
    this.onEditClick = this.onEditClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getEvidence = this.getEvidence.bind(this);
    this.state = {
      editing
    };
  }

  render() {
    if (!this.props.post) {
      return <div>spinner</div>;
    }

    var post = this.props.post

    var evidence = this.getEvidence(post);
    var infoBox = (this.props.usersPost && this.state.editing) ? (
      <div className="panel panel-info">
        <p>Hello</p>
      </div>
    ) : null;
    var editButton = (this.props.usersPost && post.evidence && !this.state.editing) ? (
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
      if (this.state.editing) {
        if (post.evidence) {
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
    const panel = (post.infoBox) ? this.buildInfoBox.bind(null, post.infoBox) : null;
    return (
      <div className="edit-post-form editing-post">
        <h3>Edit your post</h3>
        <input type="text" placeholder="Title" value={post.title} onChange={this.onChange.bind(null, "title")} />
        <textarea
          disabled={this.props.pending}
          value={post.description}
          placeholder="Description"
          onChange={this.onChange.bind(null, "description")}
        />
        <div className="likes-counter">
          <div className="likes-thumb"><i className="fa fa-thumbs-o-up"/></div>
          <b>{post.likes.length}</b>
        </div>
        <div className="info-bar clearfix">
          {panel}
          <div className="publish-button">
            <a className="btn btn-publish" onClick={this.onFormSave}>PUBLISH</a>
          </div>
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
    return (
      <div className="edit-post-form first-post">
        <h3>Upload your post</h3>
        <input type="text" placeholder="Title" value={post.title} onChange={this.onChange.bind(null, "title")} />
        <textarea
          disabled={this.props.pending}
          value={post.description}
          placeholder="Description"
          onChange={this.onChange.bind(null, "description")}
        />
      <div className="info-bar clearfix">
          {panel}
          <div className="publish-button">
            <a className="btn btn-publish" onClick={this.onFormSave}>PUBLISH</a>
          </div>
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
        text = "Your video is currently being processed and will display as “unavailable” until complete. Click 'publish' to continue";
        break;
      case 'error':
        text = "There has been an error uploading your evidence. If the error persists, please contact Cirrus support";
        break;
      default:
        return null;
    }
    return (
      <div className={`panel panel-${infoBox.type}`}>
        <div className="panel-heading">
          <p>{text}</p>
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
    if (!post.evidence) {
      if (this.props.usersPost) {
        return <UploadEvidence wallId={this.props.wallId} postId={post.id} post={post} />;
      }
      var awaitingUploadImage = "http://res.cloudinary.com/strata/image/upload/v1467881930/connections-wall-click-to-add_rwb3sl.png";
      return <ImageView src={awaitingUploadImage} layout="box-to-image" style={imageStyle} />
    }
    if (post.evidence.type === "image") {
      return <ImageView src={post.evidence.url} layout="box-to-image" style={imageStyle} />
    }
    if (post.evidence.type === "video") {
      return <Video url={post.evidence.url} colour="#ea3592" autoplay={false}/>
    }
  }

  /*
    The onClick handler used to dispatch the update action
  */
  onFormSave() {
    console.log("Post update action");
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
    console.log("Close post");
  }

  /*
    When the user clicks to edit the post.
    Update internal component state with this and re-render.
  */
  onEditClick() {
    this.setState({editing: true});
  }

}

export default ViewEditPost;
