import React from 'react';
import _ from 'underscore';

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
    let allPosts = posts;
    let likedPosts = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].evidence) {
        if (posts[i].likes.length > 0) {
          likedPosts.push(posts[i]);
        }
      }
    }
    let sortedPosts = [];
    while (likedPosts.length > 0) {
      let mostLiked = 0;
      for (let i = 0; i < likedPosts.length; i++) {
        console.log(likedPosts.length  + " " + likedPosts[mostLiked].likes.length);
        if (likedPosts[i].likes.length > likedPosts[mostLiked].likes.length) {
          mostLiked = i;
        }
        if (i === likedPosts.length - 1) {
          sortedPosts.push(likedPosts[mostLiked]);
          likedPosts.splice(mostLiked, 1);
          break;
        }
      }
    }
    let sortedPostContent = [];
    for (let i = 0; i < sortedPosts.length; i++){
      sortedPostContent.push(
        <li key={`wall-post-${i}`}>
          <span className="top-10-rank">{i+1}.</span> <span className="top-10-name">{sortedPosts[i].owner.forename} {sortedPosts[i].owner.surname}</span>
          <span className="top-10-likes">
            <div className="top-10-icon"><i className="fa fa-thumbs-o-up"></i></div>
            <div>{sortedPosts[i].likes.length}</div>
          </span>
        </li>
      );
    }
    //console.log(_.sortBy(likedPosts, likes.length).reverse());
    return sortedPostContent;
  }
}

export default Top10Widget;
