import React from 'react';
import UserDisplay from './UserDisplay.jsx';
import _ from 'underscore';

class Widget extends React.Component {

  constructor() {
    super();
  }

  render() {
    let users = (this.props.users) ? this.props.users.map((user, i) => {
      let profilePic = (user.profilePic || "assets/img/profile-placeholder.jpg");
      return <UserDisplay key={`${i}-${profilePic}`} image={profilePic} name={`${user.firstname} ${user.surname}`} imageViewStyle={this.props.imageViewStyle} />;
    }) : null;
    return (
      <div className="members-module">
        <h3>{this.props.title}</h3>
          <div className="user-wrapper">
            {users}
          </div>
      </div>
    );
  }

}

Widget.propTypes = { users: React.PropTypes.array };
export default Widget;
