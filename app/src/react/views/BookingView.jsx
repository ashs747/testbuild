import React from 'react';
import {connect} from 'react-redux';
import Slideshow from '../modules/slideshow/Slideshow.jsx';
import {slides} from './booking/bookingSlides.js';
import {nav} from './booking/customBookingNav.js';

function mapProps(state) {
  var slideID = "onBoarding";
  return {
    slides,
    topNav: true,
    index: state.slide[slideID] ? state.slide[slideID].index : 0,
    slideID,
    nav
  };
};
let MappedSlideshow = connect(mapProps)(Slideshow);

/*
{
  event: {
    slots: [],
    facilitator: {
      firstname, surname, bio, profilepic
    },
    properties: {
      cancelationTerms,
    }
  }
}
*/

class BookingView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="booking">
        <MappedSlideshow />  
      </div>
    );
  }

}

export default BookingView;
