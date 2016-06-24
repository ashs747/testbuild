import React from 'react';
import {connect} from 'react-redux';
import ConnectionsWall from '../modules/connectionsWall/ConnectionsWall.jsx';

class ConnectionsWallWrapperView extends React.Component {

  constructor() {
    super();
  }

  render() {
    var walls = this.props.walls;
    var requiredWallId = parseInt(this.props.params.id, 10);
    var wallObject = null;

    walls.forEach((wall) => {
      if (wall.activityId === requiredWallId) {
        wallObject = wall;
      }
    })

    return <ConnectionsWall wall={wallObject} />
  }

}

var mappedConnectionsWallWrapperView = connect(state => {
  return {
    loading: state.wall.loading,
    walls: state.wall.walls
  };
})(ConnectionsWallWrapperView);

export default mappedConnectionsWallWrapperView;
