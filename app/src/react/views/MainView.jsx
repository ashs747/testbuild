import React from 'react';
import ReactRouter from 'react-router-ie8';

var RouteHandler = ReactRouter.RouteHandler;

class MainView extends React.Component {

  constructor() {
    super();
  }

  render() {
    let content = (this.props.loggedIn) ? <RouteHandler /> : <p>Loading</p>;
    return (
      <div className="main">
        <div className="container-fluid">
          {content}
        </div>
      </div>
    );
  }

}

export default MainView;
