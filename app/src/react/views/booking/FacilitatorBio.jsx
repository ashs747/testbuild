import React from 'react';

class CoachBio extends React.Component {

  constructor() {
    super();
  }

  render() {
    let profilePic = (this.props.profilePic) ? this.props.profilePic : "/assets/img/profile-placeholder.jpg";
    return (
      <div className="coach-bio">
        <div className="profile-pic"><img src={profilePic} alt="profile-pic" /></div>
        <h4>{this.props.name}</h4>
        <p>{this.props.bio}</p>
      </div>
    );
  }

}

export default CoachBio;
