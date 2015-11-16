import React from 'react';

class Complete extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="complete-slide">
        <h3>Name of learning activity</h3>
        <p><strong>We have sent you a confiirmation email with an outlook calendar invite. You can change your selected session time by visiting the coaching zone up to 48 hours before your appointment.</strong></p>
        <div className="booking-details">
          <p><strong>Coach:</strong> {this.props.facilitator}</p>
          <p><strong>Date:</strong> {this.props.facilitator}</p>
          <p><strong>Time:</strong> {this.props.facilitator}</p>
        </div>
        <p className="small"><strong>Cancellation Terms</strong></p>
        <p className="small">{this.props.cancellationTerms}</p>
      </div>
    );
  }

}

export default Complete;
