import React from 'react';
import WallPost from './WallPost.jsx';
import ImageView from '../../components/ImageView.jsx';
import Video from '../../components/Video.jsx';
import moment from 'moment';

class ConnectionsWall extends React.Component {

  constructor() {
    super();
  }

  render() {
    if (!this.props.wall) {
      return <p>No Wall Found</p>;
    }
    const deadline = moment(this.props.wall.deadline).format('Do MMMM YYYY');
    let posts = this.props.wall.posts.map(this.mapPosts);

    return (
      <div id="connections-wall">
        <p dangerouslySetInnerHTML={{__html: this.props.wall.content}} />
        Deadline: {deadline}
        <div className="wall-posts">
          {posts}
        </div>
      </div>
    )
  }

  mapPosts(post, i) {
    if (post.evidence === null) {
      return(
        <div key={`factor-view-${i}`} className="post-style">
          <h5>No Evidence Yet</h5>
          <img className="placeholder-image" src="http://res.cloudinary.com/strata/image/upload/v1467020297/placeholder_c6u3x0.png"/>
          <button>Upload</button>
        </div>
      );
    }
    else {
      const postedDate = moment(post.postedOn).format('Do MMMM YYYY');
      let evidenceComponent;
      if (post.evidence.type === "image") {
        evidenceComponent = <ImageView src = {post.evidence.url}/>;
      }
      else{
        evidenceComponent = <Video url = {post.evidence.url}/>;
      }
      return(
        <div key={`factor-view-${i}`} className="post-style">
          <h5>{post.title}</h5>
          <div className="post-user">{post.owner.forename} {post.owner.surname}</div>
          <div className="post-date">{postedDate}</div>
          <p>{post.description}</p>
          {evidenceComponent}
          <div>{post.likes.length} <button>Like</button></div>
        </div>
      );
    }
  }
}

export default ConnectionsWall;
