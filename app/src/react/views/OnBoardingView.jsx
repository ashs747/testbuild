import React from 'react';
import Slideshow from '../components/Slideshow.jsx';
import Video from '../components/Video.jsx';
import DataCaptureForm from '../components/MiniDataCaptureForm.jsx';
import {connect} from 'react-redux';

function mapCaptureFormProps(state) {
  return {
    forename: "",
    surname: "",
    telephone: "",
    password: "",
    //action: updateUserObject
  };
};
var MappedDataCaptureForm = connect(mapCaptureFormProps)(DataCaptureForm);

class OnBoarding extends React.Component {

  constructor() {
    super();
  }

  render() {
    let welcomeSlide = {
      content: (
        <div className="row body">
          <div className="title col-sm-8">
            <h1>Hi Steve<br /><br />Welcome to your leadership programme</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
          </div>
          <div className="col-sm-4" />
        </div>
      ),
      className: "welcome"
    };
    let profileSlide = {
      content: (
        <div className="inner">
          <h1>Upload a photo and choose a password</h1>
          <MappedDataCaptureForm />
        </div>
      ),
      className: "profile"
    };
    let messageSlide = {
      content: (
        <div className="body">
          <div className="title">
            <h1>A message from the executive board</h1>
            <Video url="https://www.youtube.com/watch?v=HGdQUMzRVxA" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
          </div>
        </div>
      ),
      className: "message"
    };
    let learningJourneySlide = {
      content: (
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
      ),
      className: "journey"
    };
    let progressSlide = {
      content: (
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
      ),
      className: "progress"
    };
    let finalSlide = {
      content: (
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
      ),
      className: "final"
    };
    let slides = [welcomeSlide, profileSlide, messageSlide, learningJourneySlide, progressSlide, finalSlide];
    return (
      <div className="on-boarding">
        <div className="header clearfix">
          <img className="logo" src="assets/img/programme-logo.png" alt="logo" />
        </div>
        <div className="main">
          <div className="slide-container">
            <Slideshow slides={slides} hideBackOnSlide={[1, 2]}/>
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }

}

export default OnBoarding;
