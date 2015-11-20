import React from 'react';

class CoachBio extends React.Component {

  constructor() {
    super();
  }

  render() {
    //TODO: normalize the facilitator bio and profile pic (through properties)
    let profilePic = (this.props.profilePic) ? this.props.profilePic : "/assets/img/profile-placeholder.jpg";
    return (
      <div className="coach-bio">
        <img src={profilePic} alt="profile-pic" />
        <h4>{this.props.name}</h4>
        <p>{this.props.bio}</p>
      </div>
    );
  }

}

export default CoachBio;
