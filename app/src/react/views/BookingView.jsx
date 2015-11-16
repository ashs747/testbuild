import React from 'react';
import {connect} from 'react-redux';
import Slideshow from '../modules/slideshow/Slideshow.jsx';
import {bookingScreenSlides} from './booking/bookingSlides.js';
import {nav} from './booking/customBookingNav.js';
import {getSlotsForActivity} from '../../redux/actions/learningJourneyActions';
import {dispatch} from '../../redux/store.js';

function mapProps(state) {
  var slideID = "booking";
  return {
    slides: bookingScreenSlides,
    topNav: true,
    index: state.slide[slideID] ? state.slide[slideID].index : 0,
    slideID,
    nav
  };
};
let MappedSlideshow = connect(mapProps)(Slideshow);

class BookingView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    dispatch(getSlotsForActivity(this.props.params.activity));
  }

  render() {
    return (
      <div className="booking">
        <div className="header">
          <h1>Make a booking</h1>
          <h3>Activity Name Here</h3>
        </div>
        <div className="body">
          <div className="body-inner">
            <MappedSlideshow />
          </div>
        </div>
      </div>
    );
  }

}

export default BookingView;
