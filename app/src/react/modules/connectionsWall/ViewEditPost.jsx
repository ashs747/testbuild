import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import TextArea from 'react-textarea-autosize';

class ViewEditPost extends React.Component {

  constructor(props) {
    super(props);
    var editing = false;
    if (props.post && !props.post.evidence && props.usersPost) {
      editing = true;
    }
    this.onEditClick = this.onEditClick.bind(this);
    this.state = {
      editing
    };
  }

  render() {
    if (!this.props.post) {
      return <div>spinner</div>;
    }

    var post = this.props.post
    var state = (this.state.editing) ? "Editing" : "Viewing";

    var evidence = this.getEvidencePhoto(post.evidence);
    var editButton = (this.props.usersPost && post.evidence) ? (
      <a className="edit-button btn" onClick={this.onEditClick}><i className="fa fa-pencil" /> Edit</a>
    ) : null;
    var postForm = this.buildPostForm(post, this.props.usersPost);
    const style = {
      height: "100%",
      width: "100%",
      display: "inline-block"
    };
    return (
      <div className="view-edit-post">
        <div className="post-wrapper clearfix">
          <div className="evidence-wrapper">
            <ImageView src={evidence} layout="box-to-image" style={style}/>
          </div>
          <div className="form-wrapper">
            <div className="action-buttons">
              {editButton}
              <a className="btn close-circle" onClick={this.onCloseClick}><i className="fa fa-times"/></a>
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
    console.log(post);
    return (
      <div className="edit-post-form">

      </div>
    )
  }

  /*
    Build the post if the user is posting for the first time.
    Show edit boxes and disaptch updated field calls
  */
  buildFirstPostForm(post) {
    return (
      <div className="edit-post-form">
        <h3>Upload your post</h3>
        <input type="text" placeholder="Title" value={post.title} onChange={this.onChange.bind(null, "title")} />
        <textarea
          disabled={this.props.pending}
          value={post.description}
          placeholder="Description"
          onChange={this.onChange.bind(null, "desciption")}
        />
        <a className="btn btn-publish" onClick={this.onFormSave}>PUBLISH</a>
      </div>
    )
  }

  /*
    Build the post if the user viewing the post, theirs or someone elses.
    Show all the details of the post
  */
  buildViewPostForm(post) {
    return <p>View post</p>;
  }

  /*
    Get the evidence photo, if we don't have one, display a placeholder
  */
  getEvidencePhoto(evidence) {
    if (!evidence) {
      return "http://res.cloudinary.com/strata/image/upload/v1467020297/placeholder_c6u3x0.png";
    }
    if (evidence.type === "image") {
      return evidence.url;
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
    console.log(`Updating field: ${field} with value ${e.target.value}`);
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
