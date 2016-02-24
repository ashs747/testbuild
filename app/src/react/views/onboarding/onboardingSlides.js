import React from 'react';
import store from '../../../redux/store';
import {nextSlide} from '../../../redux/actions/slideActions';
import {connect, Provider} from 'react-redux';
import Video from '../../components/Video.jsx';
import DataCaptureForm from '../../components/MiniDataCaptureForm.jsx';
import UploadProfile from '../../components/UploadProfile.jsx';
import {updateUserObject, saveUserData} from '../../../redux/actions/usersActions';
import config from '../../../localConfig';

function mapUploadForm(state) {
  return {
    buttonText: "UPLOAD",
    uploadURL: `${config.api.url}api/upload`,
    profilePic: state.user.profilePic,
    profilePicPending: state.user.profilePending,
    authToken: state.auth.access_token, //TODO: one-time-key-to-token-exchange - server + services,
    width: state.width.profile
  };
};

var MappedUploadProfile = connect(mapUploadForm)(UploadProfile);

function mapCaptureFormProps(state) {
  return {
    ...state.user,
    ...state.user.properties,
    updateAction: updateUserObject,
    loading: state.user.onBoardingLoading,
    err: state.user.onBoardingError
  };
};

var MappedDataCaptureForm = connect(mapCaptureFormProps)(DataCaptureForm);

class WelcomeBlock extends React.Component {
  render() {
    return (
      <div className="row body">
        <div className="title col-sm-9">
          <h1>Hi {this.props.forename},<br /><br />Welcome to your portal for the Managers to Leaders programme.</h1>
          <p>Come on in, we’ve been expecting you!</p>
        </div>
      </div>
    );
  };
};

function mapWelcomePage(state) {
  var forename;
  if (state.user) {
    forename = state.user.forename;
  }
  return {
    forename
  };
};

var ConnectedWelcomeBlock = connect(mapWelcomePage)(WelcomeBlock);

export const onboardingSlides = [{
  content: (
    <Provider store={store}>
        <ConnectedWelcomeBlock />
    </Provider>
  ),
  className: 'welcome',
  showNext: true
}, {
  content: (
    <Provider store={store}>
      <div className="body">
        <div className="title">
          <h1>A message from the executive board</h1>
          <Video url="https://vimeo.com/150919913" />
        </div>
      </div>
    </Provider>
  ),
  className: 'message-slide',
  showPrev: true,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      <div className="body">
        <div className="title">
          <h1>Your learning journey</h1>
        </div>
        <div className="content">
          <div className="col-sm-7">
            <img src="assets/img/on-boarding-learning-journey-new.png" />
          </div>
          <div className="col-sm-5">
            <p>We have identified 5 essential leadership qualities which are the building blocks for every great leader in the States.</p>
            <p>The 9 month ‘Managers to Leaders’ programme is built around these qualities and has been designed specifically for
              managers and leaders at States of Jersey.</p>
          </div>
          <div className="clearfix"/>
        </div>
      </div>
    </Provider>
  ),
  className: 'journey',
  showPrev: true,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      <div className="body">
        <div className="title">
          <h1>An interactive learning experience</h1>
        </div>
        <div className="content">
          <div className="col-sm-7">
            <img src="assets/img/areas-of-expertise.png" />
          </div>
          <div className="col-sm-5">
            <p>The programme is delivered to you using a blended approach which will include workshops, webinars, coaching and a business challenge.</p>
            <p>It includes a large variety of experiential activities and self-learning tools that will help you to accelerate, stretch and grow.</p>
          </div>
          <div className="clearfix"/>
        </div>
      </div>
    </Provider>
  ),
  className: 'interactive',
  showPrev: true,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      <div className="body">
        <div className="title">
          <h1>Track your progress and see upcoming events</h1>
        </div>
        <div className="content">
          <div className="col-sm-7">
            <img src="assets/img/track-your-progress.png" />
          </div>
          <div className="col-sm-5">
            <p>Your personalised learning journey gives you all the key dates and information you need to stay on track.</p>
            <p>As you’ll be learning in a cohort most of the dates are fixed but you can book your coaching sessions at a time to suit you.</p>
            <p>We’ll send you email reminders about upcoming events so you don’t forget.</p>
          </div>
          <div className="clearfix"/>
        </div>
      </div>
    </Provider>
  ),
  className: 'progress',
  showPrev: true,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      <div className="body">
        <div className="title">
          <h1>Accessible on any device</h1>
        </div>
        <div className="content">
          <div className="col-sm-7">
            <img src="assets/img/any-device.png" />
          </div>
          <div className="col-sm-5">
            <p>This portal is here to guide you through your development journey.  You can access it on any device with an internet connection.</p>
            <p>We’ll send you an email with the web address - store it in your bookmarks for quick access.</p>
            <p>Webinars are best experienced on a laptop or desktop.</p>
          </div>
          <div className="clearfix"/>
        </div>
      </div>
    </Provider>
  ),
  className: 'devices',
  showPrev: true,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      <div className="body">
        <div className="title">
          <h1>Now, add a photo and password</h1>
        </div>
        <div className="content clearfix">
          <div className="upload-image col-sm-6">
            <MappedUploadProfile />
          </div>
          <div className="col-sm-6">
            <MappedDataCaptureForm />
          </div>
        </div>
      </div>
    </Provider>
  ),
  className: 'profile',
  showPrev: true,
  showNext: true,
  onNextClick: function() {
    var slideID = this.props.slideID;
    store.dispatch(saveUserData(slideID));
  }
}, {
  content: (
    <Provider store={store}>
      <div className="body">
        <div className="title">
          <h1>Your onboarding is complete</h1>
          <div className="sub">
            <p>Please make a note of your password. Click below to log in to the portal using your email and password.</p>
          </div>
        </div>
        <div className="content">
          <div className="final-button">
            <div className="circle hidden-xs">
              <i className="fa fa-sign-in"></i>
            </div>
            <a className="btn" href="/#/login">GO TO THE LOGIN PAGE</a>
          </div>
        <div className="clearfix"/>
        </div>
      </div>
    </Provider>
  ),
  className: 'final',
  showPrev: true,
  showNext: false
}];
