import React from 'react';
import UserDisplay from './UserDisplay.jsx';
import _ from 'underscore';

class Widget extends React.Component {

  constructor() {
    super();
  }

  render() {
    let users = (this.props.users) ? this.props.users.map((user, i) => {
      let profilePics = _.where(user.files, {context: "profile-picture", variation: "original"});
      let profilePicReference = (profilePics.length > 0) ? profilePics[profilePics.length - 1].reference : "assets/img/profile-placeholder.jpg";
      return <UserDisplay key={`${i}-${profilePicReference}`} image={profilePicReference} name={`${user.forename} ${user.surname}`} imageViewStyle={this.props.imageViewStyle} />;
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
