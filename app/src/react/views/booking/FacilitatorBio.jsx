import React from 'react';
import CloudinaryImg from '../../components/CloudinaryImg.jsx';

class CoachBio extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="coach-bio">
        <CloudinaryImg file={this.props.profilePic} defaultImg="assets/img/profile-placeholder.jpg"/>
        <h4>{this.props.name}</h4>
        <p>{this.props.bio}</p>
      </div>
    );
  }

}

export default CoachBio;
