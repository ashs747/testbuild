import React from 'react';
import {connect} from 'react-redux';
import Slideshow from '../modules/slideshow/Slideshow.jsx';
import {bookingScreenSlides} from './booking/bookingSlides.js';
import {nav} from './booking/customBookingNav.js';
import store from '../../redux/store.js';
import {moveToSlide} from '../../redux/actions/slideActions.js';
var dispatch = store.dispatch;

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
    dispatch(moveToSlide("booking", 0));
  }

  render() {
    if (!this.props.activity) {
      return <div />;
    }
    return (
      <div className="booking">
        <div className="header booking-banner">
          <h3>Make a booking | {this.props.activity.type}: {this.props.activity.name}</h3>
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

function mapBookingViewprops(state) {
  let activity = getActivityFromLearningJourneyByUrl(state.learningJourney);
  return {
    activity
  };
}
let mappedBookingView = connect(mapBookingViewprops)(BookingView);

function getActivityFromLearningJourneyByUrl(learningJourney) {
  let routing = store.getState().routing;
  if (routing) {
    let moduleAndActivityIds = routing.path.split("booking/")[1];
    if (moduleAndActivityIds) {
      let moduleID = moduleAndActivityIds.split("/")[0];
      let activityID = moduleAndActivityIds.split("/")[1]

      if (learningJourney && learningJourney["m" + moduleID]) {
        return learningJourney["m" + moduleID].activities["a" + activityID];
      }
    }
  }
}
export default mappedBookingView;
