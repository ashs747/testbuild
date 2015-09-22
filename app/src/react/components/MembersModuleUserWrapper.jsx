import React from 'react';
import DisplayUser from './MembersModuleDisplayUser';

class MembersModuleUserWrapper extends React.Component {

  constructor() {
    super();
  }

  render() {
    let users = (this.props.users) ? this.props.users.map((user, i) => {
      return <DisplayUser key={i} image="test" name="test" />
    }) : null;
    return (
      <div className="user-wrapper">
        {users}
      </div>
    );
  }

}

MembersModuleUserWrapper.propTypes = { users: React.PropTypes.array };
export default MembersModuleUserWrapper;
