import React from 'react';

class UploadProfile extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="upload-profile">
        <div className="circle-image">
          <img src="/assets/img/profile-placeholder.jpg" alt="profile" />
        </div>
        <button onClick={this.uploadProfile} className="btn">{this.props.buttonText}</button>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
      </div>
    );
  }

  uploadProfile() {
    console.log("Uploading image");
  }

}

export default UploadProfile;
