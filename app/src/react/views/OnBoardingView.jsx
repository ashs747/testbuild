import React from 'react';
import Slideshow from '../components/Slideshow.jsx';

class OnBoarding extends React.Component {

  constructor() {
    super();
  }

  render() {
    let welcomeSlide = {
      content: (
        <div className="row">
          <div className="title col-sm-7">
            <h1>Welcome to your leadership programme</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
          </div>
          <div className="col-sm-5" />
        </div>

      ),
      className: "welcome slide"
    };
    let secondSlide = {
      content: (
        <p>Slide 2</p>
      ),
      className: "second slide"
    };
    let thirdSlide = {
      content: (
        <p>Slide 3</p>
      ),
      className: "third slide"
    };
    let slides = [welcomeSlide, secondSlide, thirdSlide];
    return (
      <div className="on-boarding">
        <div className="header clearfix">
          <img className="logo" src="assets/img/programme-logo.png" alt="logo" />
        </div>
        <div className="main">
          <div className="slide-container">
            <Slideshow slides={slides}/>
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }

}

export default OnBoarding;
