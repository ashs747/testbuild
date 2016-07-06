import React from 'react';

class Top10Widget extends React.Component {

  constructor() {
    super();
  }

  render() {
    let posts = (this.props.wall) ? this.props.wall.posts : [];
    let content = <p>No posts for this connections wall</p>;
    if (posts.length > 0) {
      content = this.sortPosts(posts);
    }
    return (
      <div className="top-10-widget">
        <div className="title">
          <h4>Top 10 most liked posts</h4>
        </div>
        <div className="body">
          <div className="row">
            <ul className="col-sm-12">
              {content}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  sortPosts(posts) {
    let likedPosts = this.findLikedPosts(posts);
    let sortedPosts = likedPosts.sort(this.sortPostsByNumberOfLikes);
    sortedPosts = sortedPosts.slice(0,10);
    let sortedPostContent = this.displaySortedPosts(sortedPosts);
    return sortedPostContent;
  }

  findLikedPosts(posts){
    let likedPosts = [];
    posts.forEach(post => {
      if (post.evidence) {
        if (post.likes.length > 0) {
          likedPosts.push(post);
        }
      }
    })
    return likedPosts;
  }

  sortPostsByNumberOfLikes(a, b) {
    if (a.likes.length > b.likes.length) {
      return -1;
    }
    if (a.likes.length < b.likes.length) {
      return 1;
    }
    return 0;
  }

  displaySortedPosts(posts){
    let initRank = 1;
    let sortedPostContent = posts.map((post, i) => {
      let trophy;
      if (i === 0) {
        trophy = <i className="fa fa-trophy"></i>
      }
      if (i > 0) {
        if (post.likes.length !== posts[i - 1].likes.length) {
          initRank++;
        }
      }
      return (
        <li key={`wall-post-${i}`}>
          <div className="top-10-rank">{initRank}.</div>
          <div className="top-10-name">
            <span>
              {post.owner.forename} {post.owner.surname}
            </span>
            {trophy}
          </div>
          <div className="top-10-likes">
            <div className="top-10-icon"><i className="fa fa-thumbs-o-up"></i></div>
            <div>{post.likes.length}</div>
          </div>
        </li>
      )
    });
    return sortedPostContent;
  }
}

export default Top10Widget;
