import React from 'react';
import {prevSlide} from '../../../redux/actions/slideActions';
import {bookUserOnToSlot, getSlotsForActivity, removeBookingError} from '../../../redux/actions/learningJourneyActions';
import Router from 'react-router';

class Confirmation extends React.Component {

  constructor() {
    super();
    this.prevSlide = this.prevSlide.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  render() {
    let error;
    if (this.props.error) {
      error = this.mapError(this.props.error);
    }
    return (
      <div className="confirm-selection">
        <h3>Confirm your selection</h3>
        <div className="selection-item">
          <div className="selection-header">
            <h4>Your selection</h4>
          </div>
          <div className="selection-row grey">
            <p><strong>Coach: </strong>{this.props.facilitator}</p>
          </div>
          <div className="selection-row">
            <p><strong>Date: </strong>{this.props.slot.startDate.format('Do MMMM YYYY')}</p>
          </div>
          <div className="selection-row grey">
            <p><strong>Time: </strong>{`${this.props.slot.startDate.format('HH:mm')} - ${this.props.slot.endDate.format('HH:mm')}`}</p>
          </div>
        </div>
        <h6><strong>Cancellation Terms</strong><br />{this.props.cancellationTerms}</h6>
        <a className="btn back" onClick={this.prevSlide}>BACK</a>
        <a className="btn confirm" onClick={this.confirm}>CONFIRM</a>
        {error}
      </div>
    );
  }

  mapError(error) {
    let errorText;
    if (error.status == 422) {
      errorText = "It appears someone has booked this slot while you were viewing it, please go back and select a new slot";
    } else {
      errorText = "It appears there was an error, please contact Cirrus support";
    }
    return (
      <div className="booking-error alert alert-danger">
        <p>{errorText}</p>
      </div>
    );
  }

  confirm() {
    this.props.dispatch(bookUserOnToSlot(this.props.slot.id));
  }

  prevSlide() {
    this.props.dispatch(getSlotsForActivity(window.location.href.split('booking/')[1]));
    this.props.dispatch(removeBookingError());
    this.props.dispatch(prevSlide("booking"));
  }

}

export default Confirmation;
