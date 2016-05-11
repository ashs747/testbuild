import React from 'react';
import store from '../../../redux/store';
import {nextSlide} from '../../../redux/actions/slideActions';
import {connect, Provider} from 'react-redux';
import Video from '../../components/Video.jsx';
import DataCaptureForm from '../../components/MiniDataCaptureForm.jsx';
import UploadProfile from '../../components/UploadProfile.jsx';
import {updateUserObject, saveUserData} from '../../../redux/actions/usersActions';
import config from '../../../localConfig';

import {onBoardingContent} from '../../../content.js';

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
          <h1>Hi {this.props.forename},<br /><br />{onBoardingContent.slide1.title}</h1>
          <p>{onBoardingContent.slide1.body}</p>
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
          <h1>{onBoardingContent.slide2.title}</h1>
          <Video url={onBoardingContent.slide2.videoUrl} />
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
          <h1>{onBoardingContent.slide3.title}</h1>
        </div>
        <div className="content">
          <div className="col-sm-7">
            <img src={onBoardingContent.slide3.image}/>
          </div>
          <div className="col-sm-5">
            {onBoardingContent.slide3.content}
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
          <h1>{onBoardingContent.slide4.title}</h1>
        </div>
        <div className="content">
          <div className="col-sm-7">
            <img src={onBoardingContent.slide4.image} />
          </div>
          <div className="col-sm-5">
            {onBoardingContent.slide4.content}
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
          <h1>{onBoardingContent.slide5.title}</h1>
        </div>
        <div className="content">
          <div className="col-sm-7">
            <img src={onBoardingContent.slide5.image} />
          </div>
          <div className="col-sm-5">
            {onBoardingContent.slide5.content}
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
          <h1>{onBoardingContent.slide6.title}</h1>
        </div>
        <div className="content">
          <div className="col-sm-7">
            <img src={onBoardingContent.slide6.image} />
          </div>
          <div className="col-sm-5">
            {onBoardingContent.slide6.content}
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
          <h1>{onBoardingContent.slide7.title}</h1>
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
