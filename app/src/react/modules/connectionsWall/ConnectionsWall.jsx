import React from 'react';
import WallPost from './WallPost.jsx';
import ViewEditPost from './ViewEditPost.jsx';
import moment from 'moment-timezone';

class ConnectionsWall extends React.Component {

  constructor() {
    super();
  }

  render() {
    if (!this.props.wall) {
      return <p>No Wall Found</p>;
    }
    const deadline = moment(this.props.wall.deadline).format('Do MMMM YYYY');
    let posts = this.props.wall.posts;
    let jsxPosts = <div>{posts.map(this.mapPosts.bind(null, this.props.currentUser, this.props.profile))}</div>;
    var editPosts = posts.map((post, i) => {
      var usersPost = (post.owner && post.owner.id === this.props.currentUser);
      return <ViewEditPost key={`post-${i}`} post={post} usersPost={usersPost} wallId={this.props.wall.id}/>
    });
    return (
      <div id="connections-wall">
        {jsxPosts}
        {editPosts}
      </div>
    )
  }

  mapPosts(currentUser, profile, post, i) {
    const postBelongsToUser = (currentUser === post.owner.id);
    return (
      <WallPost
        key={`wall-post-${i}`}
        title={post.title}
        description={post.description}
        evidence={post.evidence}
        owner={post.owner}
        date={post.date}
        likes={post.likes}
        currentUser={currentUser}
        postBelongsToUser={postBelongsToUser}
        profile={profile}
      />
    );
  }
}

export default ConnectionsWall;
