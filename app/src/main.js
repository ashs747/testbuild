import "babel-polyfill";
/* Import Redux Store */
import store from './redux/store';

/* import React, Redux, Router */
import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, NotFoundRoute} from 'react-router';
import {Provider, connect} from 'react-redux';

/* Import React-Redux-Router */
import createBrowserHistory from 'history/lib/createHashHistory';
import {syncReduxAndRouter} from 'redux-simple-router';

/* Import Views*/
import MainView from './react/views/MainView.jsx';
import LoginView from './react/views/LoginView.jsx';
import LearningJourneyView from './react/views/LearningJourneyView.jsx';
import ActionLearningZone from './react/views/ActionLearningZoneView.jsx';
import ModuleView from './react/views/ModuleView.jsx';
import FAQView from './react/views/FAQView.jsx';
import ProjectView from './react/views/ProjectView.jsx';
import LeadershipProgrammeView from './react/views/LeadershipProgrammeView.jsx';
import OnBoardingView from './react/views/OnBoardingView.jsx';
import HomeView from './react/views/HomeView.jsx';
import ToolkitView from './react/views/ToolkitView.jsx';
import ToolkitPageView from './react/views/ToolkitPageView.jsx';
import ActivityView from './react/views/ActivityView.jsx';
import ProfileView from './react/views/ProfileView.jsx';
import BookingView from './react/views/BookingView.jsx';
import ResetPasswordView from './react/views/ResetPasswordView.jsx';

/* Trashing app.jsx temporarily for the refactor */

import AppWrapper from './react/App.jsx';

/*  Binds history to our Store STATE in store.getState().routing */
const history = createBrowserHistory();
syncReduxAndRouter(history, store);

var slaves = {};

ReactDOM.render(
  <Provider store={store}>
    <AppWrapper dispatch={store.dispatch}>
      <Router history={history}>
        <Route path="/" component={connect((state) => state)(MainView)}>
          <Route path="personal-learning-journey" component={connect((state) => state)(LearningJourneyView)} />
          <Route path="module" path="module/:module" component={ModuleView} />
          <Route path="action-learning-zone" component={ActionLearningZone} />
          <Route path="faq" component={FAQView} />
          <Route path="project" path="project/:project" component={ProjectView} />
          <Route path="programme" component={LeadershipProgrammeView} />
          <Route path="home" component={HomeView} />
          <Route path="toolkits" component={ToolkitView} />
          <Route path="toolkit" path="toolkit/:toolkit" component={ToolkitPageView} />
          <Route path="activity" path="activity/:activity" component={ActivityView} />
          <Route path="profile" component={ProfileView} />
          <Route path="booking" path="booking/:module/:activity" component={BookingView} />
        </Route>
        <Route path="login" component={connect((state) => {
          return {
            error: state.auth.error,
            loading: state.auth.waitingForLogin,
            sentRecoveryEmailSuccess: state.auth.sentRecoveryEmail
          };
        })(LoginView)} />
        <Route path="on-boarding/:userToken" component={OnBoardingView} />
        <Route path="recover-password/:userToken" component={ResetPasswordView} />
    </Router>
  </AppWrapper>
</Provider>, document.getElementById('app'));
