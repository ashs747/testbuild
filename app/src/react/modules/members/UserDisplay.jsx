import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import CloudinaryImg from '../../components/CloudinaryImg.jsx';
import Tooltip from '../tooltip/Wrapper.jsx';

class UserDisplay extends React.Component {

  constructor() {
    super();
  }

  render() {
    let content = (
      <div>
        <div className="user-display-tooltip-header">
          <p>{this.props.name}</p>
        </div>
        <div className="user-display-tooltip-body">
          <div className="profile-image">
            <CloudinaryImg defaultImg={this.props.default} file={this.props.image} />
          </div>
          <p>{this.props.jobTitle}</p>
          <p>{this.props.businessArea}</p>
          <p>{this.props.email}</p>
          <p>{this.props.telephone}</p>
        </div>
      </div>
    );
    return (
      <div className="user-display clearfix">
        <CloudinaryImg defaultImg={this.props.default} file={this.props.image} className="profile-image" style={this.props.imageViewStyle} />
        <div className="name">
          <Tooltip trigger={<p>{this.props.name} ></p>} content={content} className="mini-profile-tooltip" />
        </div>
      </div>
    );
  }

}

export default UserDisplay;
