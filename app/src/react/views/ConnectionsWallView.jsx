import React from 'react';
import {connect} from 'react-redux';
import ConnectionsWall from '../modules/connectionsWall/ConnectionsWall.jsx';

class ConnectionsWallView extends React.Component {

  constructor() {
    super();
  }

  render() {
    var walls = this.props.walls;
    var requiredWallId = parseInt(this.props.params.id, 10);
    var wallObject = null;

    for (let i = 0; i < walls.length; i++) {
      if (walls[i].activityId === requiredWallId) {
        wallObject = walls[i];
        break;
      }
    }
    return <ConnectionsWall wall={wallObject} />
  }
}

var mappedConnectionsWallWrapperView = connect(state => {
  return {
    loading: state.wall.loading,
    walls: state.wall.walls
  };
})(ConnectionsWallView);

export default mappedConnectionsWallWrapperView;
