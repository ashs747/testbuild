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
    let content = [];
    let currentRank = 1;
    for (var i = 0; i < posts.length; i++) {
      let trophy;
      let equals = this.showEquals(posts, i) ?  "= " : ". ";
      if (i > 0 && posts[i].likes.length < posts[i - 1].likes.length) {
        currentRank++;
      }
      if (currentRank === 1) {
        trophy = <i className="fa fa-trophy"></i>;
      }
      content.push(
        <li key={`wall-post-${i}`}>
          <div className="top-10-rank">{currentRank}{equals}</div>
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
    return content;
  }

  /*
    Need to work out whether to show the equals sign next to the persons score
  */
  showEquals(posts, i) {
    //If they are 1st (i === 0), check 2nd place for the same score
    if (i === 0) {
      if (posts[0].likes.length === posts[1].likes.length) {
        return true;
      }
    }
    //If they are between 2nd and last, need to check before and after
    if (i > 0 && i < posts.length - 1) {
      let j = i + 1;
      if (posts[i].likes.length === posts[i - 1].likes.length || posts[i].likes.length === posts[j].likes.length) {
        return true;
      }
    }
    //If they are the last post, need to check only the post before
    if (i === posts.length - 1) {
      if (posts[i].likes.length === posts[i - 1].likes.length) {
        return true;
      }
    }
  }
}

export default Top10Widget;
