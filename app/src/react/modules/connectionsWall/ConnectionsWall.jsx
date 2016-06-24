import React from 'react';
import WallPost from './WallPost.jsx';

class ConnectionsWall extends React.Component {

  constructor() {
    super();
  }

  render() {
    if (!this.props.wall) {
      return <p>No Wall Found</p>;
    }

    console.log(this.props.wall);

    /**
      Some sort of mapping function to turn posts from the wall object post array
      into post components

      In each post component display the information thats in the object.

      If there is evidence
        Load in the video and imageview components to display it (evidence.reference should help)
        Display title, name of the owner, postedOn date, description and number of likes
      if not
        display an upload button (does nothing), the users name and a placeholder upload image
    */


    return (
      <div dangerouslySetInnerHTML={{__html: this.props.wall.content}} />
    )

  }

}

export default ConnectionsWall;
