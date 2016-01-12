import React from 'react';
import UserDisplay from './UserDisplay.jsx';
import _ from 'underscore';

class Widget extends React.Component {

  constructor() {
    super();
  }

  render() {
    let users = (this.props.users) ? this.props.users.map((user, i) => {
      let profilePic = user.profilePic;
      let properties = user.properties;
      return (
        <UserDisplay
          key={`${i}-${profilePic}`}
          image={profilePic}
          default="assets/img/profile-placeholder.jpg"
          name={`${user.forename} ${user.surname}`}
          imageViewStyle={this.props.imageViewStyle}
          jobTitle={properties.jobTitle || ''}
          businessArea={properties.businessArea || ''}
          email={user.email}
          telephone={user.properties.phone || ''}
        />
      );
    }) : null;
    return (
      <div className="members-module">
        <h4>{this.props.title}</h4>
          <div className="user-wrapper">
            {users}
          </div>
      </div>
    );
  }

}

Widget.propTypes = { users: React.PropTypes.array };
export default Widget;
