import React from 'react';

class Top10Widget extends React.Component {

  constructor() {
    super();
  }

  render() {
    let posts = this.props.wall.posts;
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
    let sortedPosts = this.sortPostsByNumberOfLikes(likedPosts);
    let sortedPostContent = this.displaySortedPosts(sortedPosts);
    return sortedPostContent;
  }

  findLikedPosts(posts){
    let likedPosts = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].evidence) {
        if (posts[i].likes.length > 0) {
          likedPosts.push(posts[i]);
        }
      }
    }
    return likedPosts;
  }

  sortPostsByNumberOfLikes(posts){
    let sortedPosts = [];
    while (posts.length > 0) {
      let mostLiked = 0;
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].likes.length > posts[mostLiked].likes.length) {
          mostLiked = i;
        }
        if (i === posts.length - 1) {
          sortedPosts.push(posts[mostLiked]);
          posts.splice(mostLiked, 1);
          break;
        }
      }
    }
    return sortedPosts;
  }

  displaySortedPosts(posts){
    let sortedPostContent = [];
    for (let i = 0; i < posts.length; i++){
      let trophy = "";
      if(i === 0){
        trophy = <i className="fa fa-trophy" aria-hidden="true"></i>
      }
      sortedPostContent.push(
        <li key={`wall-post-${i}`}>
          <div className="top-10-rank">{i+1}.</div>
          <div className="top-10-name">
            <span>
              {posts[i].owner.forename} {posts[i].owner.surname}
            </span>
            {trophy}
          </div>
          <div className="top-10-likes">
            <div className="top-10-icon"><i className="fa fa-thumbs-o-up"></i></div>
            <div>{posts[i].likes.length}</div>
          </div>
        </li>
      );
    }
    return sortedPostContent;
  }
}

export default Top10Widget;
