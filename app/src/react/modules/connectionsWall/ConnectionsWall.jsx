import React from 'react';
import WallPost from './WallPost.jsx';
import ViewEditPost from './ViewEditPost.jsx';
import moment from 'moment-timezone';
import {findDOMNode} from 'react-dom';
import $ from 'jquery';

class ConnectionsWall extends React.Component {

  constructor() {
    super();
    this.buildViewEdit = this.buildViewEdit.bind(this);
    this.mapPosts = this.mapPosts.bind(this);
    this.animateToPos = this.animateToPos.bind(this);
  }

  componentDidMount() {
    this.animateToPos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps && prevProps.viewPost !== this.props.viewPost) {
      this.animateToPos();
    }
  }

  animateToPos() {
    var page = $("html, body");
    page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", () => {
      page.stop();
    });
    if (this.props.viewPost || this.props.viewPost === 0) {
      var ref = this.refs[`wall-post-${this.props.viewPost}`];
      if (ref) {
        var el = findDOMNode(ref);
        var top = ($(el).offset().top);
        page.stop();
        page.animate({ scrollTop: `${top + 100}px` }, 500);
      } else {
        page.stop();
        page.animate({ scrollTop: $(window).scrollTop() - 100}, 500);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
     $("html, body").off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", () => {});
  }

  render() {
    if (!this.props.wall) {
      return <p>No Wall Found</p>;
    }
    const deadline = moment(this.props.wall.deadline).format('Do MMMM YYYY');
    const posts = this.props.wall.posts.map(this.mapPosts.bind(null, this.props.currentUser, this.props.profile, this.props.wall.activityId, this.props.viewPost));
    const wallContent = this.populateContent(posts, this.props.profile, this.props.viewPost);
    return (
      <div className="connections-wall">
        {wallContent}
      </div>
    )
  }

  populateContent(posts, profile, viewPost) {
    const rowPosts = this.populateRows(posts, profile);
    let wallContent = rowPosts.map((row, i) => {
      var viewEdit = this.buildViewEdit(row);
      return (
        <div key={`wall-post-row-${i}`} className="wall-post-row">
          {row}
          {viewEdit}
        </div>
      );
    });
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
    switch (profile) {
      case "lg":
        return 4;
      case "md":
        return 3;
      default:
        return 2;
    }
  }

  mapPosts(currentUser, profile, activityId, viewPost, post, i) {
    const postBelongsToUser = (currentUser === post.owner.id);
    const postBeingViewed = (post.id === viewPost);
    return (
      <WallPost
        id={post.id}
        activityId={activityId}
        postBeingViewed={postBeingViewed}
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
        pending={post.pending}
        ref={`wall-post-${post.id}`}
        postedOn={post.postedOn}
        tempEvidence={post.tempEvidence}
      />
    );
  }

  buildViewEdit(row) {
    var post;
    for (let i = 0; i < row.length; i++) {
      if (row[i].props.id === this.props.viewPost) {
        post = row[i];
        break;
      }
    }
    if (post) {
      let postObjs = this.props.wall.posts;
      var postObj;
      postObjs.forEach(post => {
        if (post.id === this.props.viewPost) {
          postObj = post;
        }
      });
      if (postObj) {
        let usersPost = this.props.currentUser === postObj.owner.id;
        return (
          <ViewEditPost
            post={postObj}
            usersPost={usersPost}
            wallId={this.props.wall.id}
            supportUrl={this.props.supportUrl}
            activityId={this.props.wall.activityId}
          />
      );
      }
    }
    return null;
  }
}

export default ConnectionsWall;
