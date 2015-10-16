import React from 'react';

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
          <h1>Introduce leadership qualities</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>
        <div className="carousel">
          <p>Carousel here</p>
        </div>
        <div className="delivery-formats">
          <h1>Introduce different delivery formats</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>
        <div className="delivery-grid clearfix">
          <div className="col-sm-6">1</div>
          <div className="col-sm-6">2</div>
          <div className="col-sm-6">3</div>
          <div className="col-sm-6">4</div>
        </div>
        <div className="message">
          <h1>A message from the executive board</h1>
          <p>Video</p>
        </div>
      </div>
    );
  }

}

export default LeadershipProgrammeView;
