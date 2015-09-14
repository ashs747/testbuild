import React from 'react';
import ReactRouter from 'react-router-ie8';

var RouteHandler = ReactRouter.RouteHandler;

class MainView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="main">
        <div className="container-fluid">
          <RouteHandler />
        </div>
      </div>
    );
  }

}

export default MainView;
