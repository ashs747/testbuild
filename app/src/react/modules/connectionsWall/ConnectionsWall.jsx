import React from 'react';
import WallPost from './WallPost.jsx';
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
        <div dangerouslySetInnerHTML={{__html: this.props.wall.content}} />
        Deadline: {deadline}
        <div className="wall-posts">
          {posts}
        </div>
      </div>
    )
  }

  mapPosts(post, i) {
    return (
      <WallPost key={`factor-view-${i}`} title={post.title} description={post.description} evidence={post.evidence} owner={post.owner} date={post.date} likes={post.likes}/>
    );
  }
}

export default ConnectionsWall;
