import React from 'react';
import Slideshow from '../modules/slideshow/Slideshow.jsx';
import {onboardingSlides} from './onboarding/onboardingSlides.js';
import {fetchInitialUserData} from '../../redux/actions/authActions';
import {connect} from 'react-redux';

function mapProps(state) {
  var slideID = "onBoarding";
  return {
    slides: onboardingSlides,
    topNav: true,
    index: state.slide[slideID] ? state.slide[slideID].index : 0,
    slideID,
  };
};
let MappedSlideshow = connect(mapProps)(Slideshow);

class OnBoarding extends React.Component {

  componentWillMount() {
    console.log('component mounting', this.props);
    let userToken = this.props.params.userToken;
    console.log(this.context);
    this.props.dispatch(fetchInitialUserData(userToken));
  }

  constructor() {
    super();
  }

  render() {
    console.log('Onboarding Props', this.props);
    return (
      <div className="on-boarding">
        <div className="header clearfix">
          <img className="logo" src="assets/img/programme-logo.png" alt="logo" />
        </div>
        <div className="main">
          <div className="slide-container">
            <MappedSlideshow />
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }
}

function mapOnboarding(state) {
  return state;
}

let connectedOnboarding = connect(mapOnboarding)(OnBoarding);

export default connectedOnboarding;