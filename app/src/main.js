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

function authStateToProps(state) {
  return {
    width: state.width,
    routing: state.routing,
    user: state.user,
    auth: state.auth
  }
}

ReactDOM.render(
  <Provider store={store}>
    <AppWrapper dispatch={store.dispatch}>
      <Router history={history}>
        <Route path="/" component={connect(authStateToProps)(MainView)}>
          <Route path="personal-learning-journey" component={connect((state) => state)(LearningJourneyView)} />
          <Route path="module" path="module/:module" component={connect()(ModuleView)} />
          <Route path="my-team" component={connect()(ActionLearningZone)} />
          <Route path="faq" component={connect()(FAQView)} />
          <Route path="project" path="project/:project" component={connect()(ProjectView)} />
          <Route path="programme" component={connect()(LeadershipProgrammeView)} />
          <Route path="home" component={connect()(HomeView)} />
          <Route path="toolkits" component={connect()(ToolkitView)} />
          <Route path="toolkit" path="toolkit/:toolkit" component={connect()(ToolkitPageView)} />
          <Route path="activity" path="activity/:activity" component={connect()(ActivityView)} />
          <Route path="profile" component={connect()(ProfileView)} />
          <Route path="booking" path="booking/:module/:activity" component={connect()(BookingView)} />
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
