import React from 'react';
import ImageView from '../../components/ImageView.jsx';

class UserDisplay extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="user-display clearfix">
        <ImageView src={this.props.image} className="profile-image" layout="box-to-image" style={this.props.imageViewStyle} />
        <div className="name">
          <p>{this.props.name}  <i className="fa fa-chevron-right"></i></p>
        </div>
      </div>
    );
  }

}

export default UserDisplay;
