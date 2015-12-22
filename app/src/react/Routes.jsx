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
import ActivityView from './views/ActivityView.jsx';
import ProfileView from './views/ProfileView.jsx';
import BookingView from './views/BookingView.jsx';
import ResetPasswordView from './views/ResetPasswordView.jsx';

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
      <Route name="module" path="module/:module" handler={ModuleView} />
      <Route name="action-learning-zone" handler={ActionLearningZone} />
      <Route name="faq" handler={FAQView} />
      <Route name="project" path="project/:project" handler={ProjectView} />
      <Route name="programme" handler={LeadershipProgrammeView} />
      <Route name="home" handler={HomeView} />
      <Route name="toolkits" handler={ToolkitView} />
      <Route name="toolkit" path="toolkit/:toolkit" handler={ToolkitPageView} />
      <Route name="activity" path="activity/:activity" handler={ActivityView} />
      <Route name="profile" handler={ProfileView} />
      <Route name="booking" path="booking/:module/:activity" handler={BookingView} />
    </Route>
    <Route name="login" handler={connect((state) => {
      return {
        error: state.auth.error,
        loading: state.auth.waitingForLogin,
        sentRecoveryEmailSuccess: state.auth.sentRecoveryEmail
      };
    })(LoginView)} />
    <Route name="on-boarding/:userToken" handler={OnBoardingView} />
    <Route name="recover-password/:userToken" handler={ResetPasswordView} />
  </Route>
);

export default Routes;
