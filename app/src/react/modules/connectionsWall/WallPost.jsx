import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import Video from '../../components/Video.jsx';
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
        return <ImageView src = {evidence.url}/>;
      case "video":
        return <Video url = {evidence.url}/>;
      default:
        return <div>The evidence is not a suitable file format to be displayed</div>
    }
  }

  buildPostWithEvidence() {
    const postClass = classnames('wall-post', 'with-evidence', {'users-post': this.props.postBelongsToUser});
    const date = moment(this.props.date).format('Do MMMM YYYY');
    const evidenceComponent = this.buildEvidenceComponent(this.props.evidence);
    return (
      <div className={postClass}>
        <h5>{this.props.title}</h5>
        <div className="post-user">{this.props.owner.forename} {this.props.owner.surname}</div>
        <div className="post-date">{date}</div>
        <p>{this.props.description}</p>
        {evidenceComponent}
        <div>{this.props.likes.length} <button>Like</button></div>
      </div>
    )
  }

  buildPostWithoutEvidence() {
    const postClass = classnames('wall-post', 'without-evidence', {'users-post': this.props.postBelongsToUser});
    return (
      <div className={postClass}>
        <h5>No Evidence Yet</h5>
        <div className="post-user">{this.props.owner.forename} {this.props.owner.surname}</div>
        <img className="placeholder-image" src="http://res.cloudinary.com/strata/image/upload/v1467020297/placeholder_c6u3x0.png"/>
        <button>Upload</button>
      </div>
    )
  }
}
export default WallPost;
