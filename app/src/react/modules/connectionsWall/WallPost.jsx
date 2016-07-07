import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import Video from '../../components/Video.jsx';
import CloudinaryImg from '../../components/CloudinaryImg.jsx';
import moment from 'moment-timezone';
import classnames from 'classnames'

class WallPost extends React.Component {

  constructor() {
    super();
    this.buildPostWithEvidence = this.buildPostWithEvidence.bind(this);
    this.buildPostWithoutEvidence = this.buildPostWithoutEvidence.bind(this);
  }

  render() {
    let buildWallPostFunction = (this.props.evidence) ? this.buildPostWithEvidence : this.buildPostWithoutEvidence;
    let wallPost = buildWallPostFunction();
    return wallPost;
  }

  buildEvidenceComponent(evidence) {
    switch (evidence.type) {
      case "image":
        return <div className="post-evidence"><ImageView layout="box-to-image" style={{ height:"100%", width:"100%"}} src={evidence.url}/></div>
      case "video":
        return <div className="post-evidence"><Video url={evidence.url}/></div>
      default:
        return <div>The evidence is not a suitable file format to be displayed</div>
    }
  }

  buildPostWithEvidence() {
    let userLiked = false;
    this.props.likes.forEach(like => {if (this.props.currentUser === like) userLiked = true});
    const postClass = classnames(`wall-post-${this.props.profile}`, 'wall-post', 'with-evidence', {'users-post': this.props.postBelongsToUser}, {'post-liked': userLiked});
    const date = moment(this.props.date).format('DD.MM.YYYY');
    const evidenceComponent = this.buildEvidenceComponent(this.props.evidence);
    const label = this.getUserLabel(this.props.postBelongsToUser);
    return (
      <div className={postClass}>
        {label}
        {evidenceComponent}
        <h5>{this.props.title}</h5>
        <div className="post-details">
          <div className="post-name"><CloudinaryImg file="" defaultImg="assets/img/profile-placeholder.jpg" /> {this.props.owner.forename} {this.props.owner.surname}</div>
          <div className="post-date">Uploaded: {date}</div>
        </div>
        <div className="post-like"><button><i className="fa fa-thumbs-o-up"></i></button>{this.props.likes.length}</div>
      </div>
    )
  }

  buildPostWithoutEvidence() {
    const postClass = classnames(`wall-post-${this.props.profile}`, 'wall-post', 'without-evidence', {'users-post': this.props.postBelongsToUser});
    let uploadButton = (this.props.postBelongsToUser) ? <button className="upload-evidence">+ Upload</button> : null
    const label = this.getUserLabel(this.props.postBelongsToUser);
    return (
      <div className={postClass}>
        {label}
        <div className="post-evidence">
          <img className="placeholder-image" src="http://res.cloudinary.com/strata/image/upload/v1467878082/connections-wall-awaiting-upload_ecaku1.png"/>
        </div>
        <h5>Awaiting Title</h5>
        <div className="post-details">
          <div className="post-name"><CloudinaryImg file="" defaultImg="assets/img/profile-placeholder.jpg" /> {this.props.owner.forename} {this.props.owner.surname}</div>
        </div>
        {uploadButton}
      </div>
    )
  }

  getUserLabel(user) {
    let label = (user) ? <img className="users-post-label"src="http://res.cloudinary.com/strata/image/upload/v1467819173/connections-wall-you_uxihlm.png" /> : null;
    return label;
  }
}

export default WallPost;
