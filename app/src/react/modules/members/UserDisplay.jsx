import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import CloudinaryImg from '../../components/CloudinaryImg.jsx';

class UserDisplay extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="user-display clearfix">
        <CloudinaryImg default={this.props.default} file={this.props.image} className="profile-image" style={this.props.imageViewStyle} />
        <div className="name">
          <p>{this.props.name}<i className="fa fa-chevron-right"></i></p>
        </div>
      </div>
    );
  }

}

export default UserDisplay;
