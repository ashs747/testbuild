import React from 'react';
import Video from '../components/Video.jsx';

class LeadershipProgrammeView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="leadership-programme">
        <div className="intro">
          <div className="inner">
            <h1>Introduction to programme</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse.</p>
          </div>
        </div>
        <div className="in-it-for-me">
          <h1>What's in it for me?</h1>
        </div>
        <div className="double-column clearfix">
          <div className="col-sm-6 left-column">
            <div className="inner">
              <div className="circle" />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex dolor in reprehenderit.</p>
            </div>
          </div>
          <div className="col-sm-6 right-column">
            <div className="inner">
              <div className="circle" />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex dolor in reprehenderit.</p>
            </div>
          </div>
        </div>
        <div className="roadmap">
          <div className="inner">
            <h1>Roadmap with programme structure</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <p>image</p>
          </div>
        </div>
        <div className="qualities">
          <div className="inner">
            <h1>Introduce leadership qualities</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
        </div>
        <div className="carousel">
          <p>Carousel here</p>
        </div>
        <div className="delivery-formats">
          <div className="inner">
            <h1>Introduce different delivery formats</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
        </div>
        <div className="delivery-grid clearfix">
          <div className="col-sm-6 red-box">
            <div className="box-inner">
              1
            </div>
          </div>
          <div className="col-sm-6 white-box">
            <div className="box-inner">
              2
            </div>
          </div>
          <div className="col-sm-6 white-box">
            <div className="box-inner">
              3
            </div>
          </div>
          <div className="col-sm-6 red-box">
            <div className="box-inner">
              4
            </div>
          </div>
        </div>
        <div className="message">
          <div className="inner">
            <h1>A message from the executive board</h1>
            <Video url="https://www.youtube.com/watch?v=HGdQUMzRVxA" />
          </div>
        </div>
      </div>
    );
  }

}

export default LeadershipProgrammeView;
