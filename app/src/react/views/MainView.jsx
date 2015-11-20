import React from 'react';
import ReactRouter from 'react-router-ie8';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

var RouteHandler = ReactRouter.RouteHandler;

class MainView extends React.Component {

  constructor() {
    super();
  }

  render() {
    let loggedIn = this.props.user.loggedIn;

    return (
      <div className="main">
        <div className={`${(this.props.width.profile !== "sm") ? "container-fluid" : ""}`}>
          <Header display={loggedIn} dispatch={this.props.dispatch}/>
          <RouteHandler />
          <Footer display={loggedIn} />
        </div>
      </div>
    );
  }

}

export default MainView;
