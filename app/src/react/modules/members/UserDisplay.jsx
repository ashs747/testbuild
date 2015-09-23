import React from 'react';

class UserDisplay extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="user-display">
        <img src={this.props.image} />
        <p>{this.props.name}</p>
      </div>
    );
  }

}

export default UserDisplay;
