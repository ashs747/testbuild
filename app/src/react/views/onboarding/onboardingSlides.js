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
    authToken: state.auth.access_token //TODO: one-time-key-to-token-exchange - server + services
  };
};

var MappedUploadProfile = connect(mapUploadForm)(UploadProfile);

function mapCaptureFormProps(state) {

  // FixMe: Not finished (mappings);
  return {
    ...state.user,
    ...state.user.properties,
    updateAction: updateUserObject
  };
};
var MappedDataCaptureForm = connect(mapCaptureFormProps)(DataCaptureForm);

class WelcomeBlock extends React.Component {
  render() {
    return (
      <div className="row body">
        <div className="title col-sm-8">
          <h1>Hi {this.props.forename}<br /><br />Welcome to your leadership programme</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
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
    {function() {
      return (
        <ConnectedWelcomeBlock />
      );
    }}
    </Provider>
  ),
  className: 'welcome',
  showNext: true
}, {
  content: (
    <Provider store={store}>
      {function() {
        return (
          <div className="inner">
          <h1>Upload a photo and choose a password</h1>
          <div className="row">
            <div className="upload-image col-sm-6">
              <MappedUploadProfile />
            </div>
            <div className="col-sm-6">
              <MappedDataCaptureForm />
            </div>
          </div>
        </div>
        );
      }}
    </Provider>
  ),
  className: 'profile',
  showPrev: false,
  showNext: true,
  onNextClick: function() {
    console.log('this', this);
    var slideID = this.props.slideID;
    console.log(this);
    store.dispatch(saveUserData(slideID));
  }
}, {
  content: (
    <Provider store={store}>
      {function() {
        return (
          <div className="body">
          <div className="title">
            <h1>A message from the executive board</h1>
            <Video url="https://vimeo.com/150919913" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
          </div>
        </div>
        );
      }}
    </Provider>
  ),
  className: 'message',
  showPrev: false,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      {function() {
        return (
          <div className="body">
          <div className="title">
            <h1>Your learning journey</h1>
          </div>
          <div className="content">
            <div className="col-sm-7">
              image here
            </div>
            <div className="col-sm-5">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.<br /><br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. </p>
            </div>
            <div className="clearfix"/>
          </div>
        </div>
        );
      }}
    </Provider>
  ),
  className: 'journey',
  showPrev: false,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      {function() {
        return (
          <div className="body">
          <div className="title">
            <h1>Track your progress and see upcoming events</h1>
          </div>
          <div className="content">
            <div className="col-sm-7">
              image here
            </div>
            <div className="col-sm-5">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.<br /><br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. </p>
            </div>
            <div className="clearfix"/>
          </div>
        </div>
        );
      }}
    </Provider>
  ),
  className: 'progress',
  showPrev: false,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      {function() {
        return (
          <div className="body">
          <div className="title">
            <h1>What do you want to do now?</h1>
            <div className="sub">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod, incididunt ut
              labore.</p>
            </div>
          </div>
          <div className="content">
            <div className="col-sm-2"></div>
            <div className="col-sm-4">
              <div className="circle hidden-xs">
                <i className="fa fa-home"></i>
              </div>
              <a className="btn">GO TO THE HOMEPAGE</a>
            </div>
            <div className="col-sm-4">
              <div className="circle hidden-xs">
                <i className="fa fa-question-circle"></i>
              </div>
              <a className="btn">LEARN MORE</a>
            </div>
            <div className="col-sm-2"></div>
          <div className="clearfix"/>
          </div>
        </div>
        );
      }}
    </Provider>
  ),
  className: 'final',
  showPrev: false,
  showNext: false
}];
