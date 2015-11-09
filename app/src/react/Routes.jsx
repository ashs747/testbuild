import React from 'react';
import ReactRouter from 'react-router-ie8';
import {connect, bindActionCreators} from 'react-redux';

import MainView from './views/MainView.jsx';
import LoginView from './views/LoginView.jsx';
import LearningJourneyView from './views/LearningJourneyView.jsx';
import ActionLearningZone from './views/ActionLearningZoneView.jsx';
import ModuleView from './views/ModuleView.jsx';
import FAQView from './views/FAQView.jsx';
import ProjectView from './views/ProjectView.jsx';
import LeadershipProgrammeView from './views/LeadershipProgrammeView.jsx';
import OnBoardingView from './views/OnBoardingView.jsx';
import HomeView from './views/HomeView.jsx';
import ToolkitView from './views/ToolkitView.jsx';
import ToolkitPageView from './views/ToolkitPageView.jsx';

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Routes = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={connect((state) => state)(MainView)}>
      <DefaultRoute handler={connect((state) => state)(HomeView)} />
    </DefaultRoute>
    <Route name="main" path="/" handler={connect((state) => state)(MainView)}>
      <Route name="personal-learning-journey" handler={connect((state) => state)(LearningJourneyView)} />
      <Route name="module" path="module/:module" handler={connect((state) => state)(ModuleView)} />
      <Route name="action-learning-zone" handler={ActionLearningZone} />
      <Route name="faq" handler={FAQView} />
      <Route name="project" path="project/:project" handler={ProjectView} />
      <Route name="programme" handler={LeadershipProgrammeView} />
      <Route name="home" handler={HomeView} />
      <Route name="toolkits" handler={ToolkitView} />
      <Route name="toolkit" path="toolkit/:toolkit" handler={ToolkitPageView} />
    </Route>
    <Route name="login" handler={connect((state) => {
      return {
        error: state.auth.error,
        loading: state.auth.waitingForLogin
      };
    })(LoginView)} />
    <Route name="on-boarding" handler={OnBoardingView} />
  </Route>
);

export default Routes;
