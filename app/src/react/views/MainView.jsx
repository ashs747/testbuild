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
    let loggedIn = this.props.auth ? this.props.auth.loggedIn : false;
    let content = (loggedIn) ? <RouteHandler /> : <p>Loading</p>;
    let learningJourneyModules = this.props.learningJourney ? this.props.learningJourney.learningJourneyModules : [];

    let moduleList = learningJourneyModules.map((module) => {
      return {
        name: module.name,
        id: module.id
      };
    });

    return (
      <div className="main">
        <div className="container-fluid">
          <Header display={loggedIn} modules={moduleList}/>
          {content}
          <Footer display={loggedIn} />
        </div>
      </div>
    );
  }

}

export default MainView;
