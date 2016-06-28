import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import Video from '../../components/Video.jsx';
import moment from 'moment';

class WallPost extends React.Component {
  constructor() {
    super();
  }

  render() {
    const title = this.props.title;
    const description = this.props.description;
    const evidence = this.props.evidence;
    const owner = this.props.owner;
    const date = moment(this.props.date).format('Do MMMM YYYY');
    const likes = this.props.likes;

    let evidenceComponent;
    if (evidence) {
      switch (evidence.type) {
        case "image":
          evidenceComponent = <ImageView src = {evidence.url}/>;
          break;
        case "video":
          evidenceComponent = <Video url = {evidence.url}/>;
          break;
        default:
          evidenceComponent = <div>The evidence is not a suitable file format to be displayed</div>
      }
    }

    const buildPostWithEvidence = (
      <div>
        <h5>{title}</h5>
        <div className="post-user">{owner.forename} {owner.surname}</div>
        <div className="post-date">{date}</div>
        <p>{description}</p>
        {evidenceComponent}
        <div>{likes.length} <button>Like</button></div>
      </div>
    )

    const buildPostWithoutEvidence = (
      <div>
        <h5>No Evidence Yet</h5>
        <img className="placeholder-image" src="http://res.cloudinary.com/strata/image/upload/v1467020297/placeholder_c6u3x0.png"/>
        <button>Upload</button>
      </div>
    )

    let wallPost = (evidence) ? buildPostWithEvidence : buildPostWithoutEvidence;

    return (
      <div className="post-style">
        {wallPost}
      </div>
    )
  }
}
export default WallPost;
