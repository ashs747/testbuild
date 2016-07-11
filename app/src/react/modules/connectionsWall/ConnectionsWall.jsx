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
    let jsxPosts = posts.map(this.mapPosts.bind(null, this.props.currentUser, this.props.profile));
    var editPosts = posts.map((post, i) => {
      var usersPost = (post.owner && post.owner.id === this.props.currentUser);
      return <ViewEditPost key={`post-${i}`} post={post} usersPost={usersPost} wallId={this.props.wall.id} supportUrl={this.props.supportUrl}/>
    });
    const wallContent = this.populateContent(editPosts, jsxPosts, this.props.profile);
    return (
      <div className="connections-wall">
        {wallContent}
      </div>
    )
  }

  populateContent(editPosts, jsxPosts, profile) {
    const rowPosts = this.populateRows(jsxPosts, profile);
    let wallContent = [];
    for (let i = 0; i < rowPosts.length; i++) {
      let row = [];
      for (let j = 0 ; j < rowPosts[i].length; j++) {
        row.push(rowPosts[i][j]);
      }
      wallContent.push (
        <div key={`wall-post-row-${i}`} className="wall-post-row">
          {row}
          {editPosts[i]}
        </div>
      )
    }
    return wallContent;
  }

  populateRows(posts, profile) {
    const postsPerRow = this.calculatePostsPerRow(profile);
    let rows = Math.ceil(posts.length / postsPerRow);
    let postCount = 0;
    let rowPosts = [];
    outerLoop: for (let i = 0; i < rows; i++) {
      rowPosts.push([]);
      for (let j = 0; j < postsPerRow; j++) {
        rowPosts[i].push(posts[postCount]);
        postCount++;
        if (postCount === posts.length) {
          break outerLoop;
        }
      }
    }
    return rowPosts;
  }

  calculatePostsPerRow(profile) {
    let posts;
    switch (profile) {
      case "lg":
        posts = 4;
        break;
      case "md":
        posts = 3;
        break;
      default:
        posts = 2;
    }
    return posts;
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
