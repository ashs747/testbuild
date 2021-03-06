import React from 'react';
import moment from 'moment-timezone';

class Complete extends React.Component {

  constructor() {
    super();
  }

  render() {
    let cancellationTerms;
    if (this.props.slot.cancelBy) {
      cancellationTerms = (moment().isBefore(this.props.slot.cancelBy)) ?
        `You have until ${moment(this.props.slot.cancelBy).format('MMMM Do YYYY')} to change your booking; after which you will need to contact Cirrus support to change it.` :
        `If at any point you need to amend your booking, please contact Cirrus support.`
    }
    let consultant = (this.props.facilitator) ? (
      <p><strong>Consultant:</strong>{`${this.props.facilitator.forename} ${this.props.facilitator.surname}`}</p>
    ) : null;
    return (
      <div className="complete-slide">
        <h3>Booking Confirmed: {this.props.activity.name}</h3>
        <p><strong>We have sent you a confirmation email with an outlook calendar invite.</strong></p>
        <div className="booking-details">
          {consultant}
          <p><strong>Date:</strong> {moment(this.props.slot.startDate).format('Do MMMM YYYY')}</p>
          <p><strong>Time:</strong> {`${moment(this.props.slot.startDate).format('HH:mm')} - ${moment(this.props.slot.endDate).format('HH:mm')}`}</p>
        </div>
        <p className="small"><strong>Cancellation Terms</strong></p>
        <p className="small">{cancellationTerms}</p>
        <a onClick={this.cancel} className="btn back">GO BACK</a>
      </div>
    );
  }

  cancel() {
    window.history.back();
  }

}

export default Complete;
