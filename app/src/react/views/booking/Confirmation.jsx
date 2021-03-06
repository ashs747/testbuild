import React from 'react';
import {prevSlide} from '../../../redux/actions/slideActions';
import {bookUserOnToSlot, getSlotsForActivity, removeBookingError} from '../../../redux/actions/bookingActions';
import {getPLJData} from '../../../redux/actions/learningJourneyActions';
import moment from 'moment-timezone';

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
    let facilitator = this.props.facilitator;
    let name = `${facilitator.forename} ${facilitator.surname}`;
    let cancellationTerms;
    if (this.props.slot.cancelBy) {
      cancellationTerms = (moment().isBefore(this.props.slot.cancelBy)) ?
        `You have until ${moment(this.props.slot.cancelBy).format('MMMM Do YYYY')} to change your booking; after which you will need to contact Cirrus support to change it.` :
        `After confirming your booking if you need to amend it you will need to contact Cirrus support.`
    }
    let consultantRow = (facilitator) ? (
      <div className="selection-row grey">
        <p><strong>Coach: </strong>{name}</p>
      </div>
    ) : null;
    return (
      <div className="confirm-selection">
        <h3>Confirm your selection</h3>
        <div className="selection-item">
          <div className="selection-header">
            <h4>Your selection</h4>
          </div>
          {consultantRow}
          <div className="selection-row">
            <p><strong>Date: </strong>{moment(this.props.slot.startDate).format('Do MMMM YYYY')}</p>
          </div>
          <div className="selection-row grey">
            <p><strong>Time: </strong>{`${moment(this.props.slot.startDate).format('HH:mm')} - ${moment(this.props.slot.endDate).format('HH:mm')}`}</p>
          </div>
        </div>
        <p><strong>Cancellation Terms: </strong><br />{cancellationTerms}</p>
        <a className="btn back" onClick={this.prevSlide}>BACK</a>
        <a className="btn confirm" onClick={this.confirm}>CONFIRM</a>
        {error}
      </div>
    );
  }

  mapError(error) {
    let errorText;
    if (error.status === 422) {
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
    this.props.dispatch(bookUserOnToSlot(this.props.eventID, this.props.slot.startDate));
  }

  prevSlide() {
    let activityAndModule = window.location.href.split('booking/')[1];
    let activity = activityAndModule.split("/")[1];
    this.props.dispatch(getPLJData());
    this.props.dispatch(removeBookingError());
    this.props.dispatch(prevSlide("booking"));
  }

}

export default Confirmation;
