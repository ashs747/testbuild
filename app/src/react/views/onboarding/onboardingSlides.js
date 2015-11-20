import React from 'react';
import store from '../../../redux/store';
import {nextSlide} from '../../../redux/actions/slideActions';
import {connect, Provider} from 'react-redux';
import Video from '../../components/Video.jsx';
import DataCaptureForm from '../../components/MiniDataCaptureForm.jsx';
import UploadProfile from '../../components/UploadProfile.jsx';

function mapCaptureFormProps(state) {
  // FixMe: Not done (mappings);
  return {
    forename: "",
    surname: "",
    telephone: "",
    password: "",
    //action: updateUserObject
  };
};
var MappedDataCaptureForm = connect(mapCaptureFormProps)(DataCaptureForm);

export const onboardingSlides = [{
  content: (
      <Provider store={store}>
        {function() {
          return (
            <div className="row body">
              <div className="title col-sm-8">
                <h1>Hi Steve<br /><br />Welcome to your leadership programme</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
            </div>
            <div className="col-sm-4" />
          </div>
          );
        }
      }
    </Provider>
  ),
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
              <UploadProfile buttonText="UPLOAD" />
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
  showPrev: false,
  showNext: true
}, {
  content: (
    <Provider store={store}>
      {function() {
        return (
          <div className="body">
          <div className="title">
            <h1>A message from the executive board</h1>
            <Video url="https://www.youtube.com/watch?v=HGdQUMzRVxA" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
          </div>
        </div>
        );
      }}
    </Provider>
  ),
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
          </div>
        </div>
        );
      }}
    </Provider>
  ),
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
          </div>
        </div>
        );
      }}
    </Provider>
  ),
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
          </div>
        </div>
        );
      }}
    </Provider>
  ),
  showPrev: false,
  showNext: false
}];
