import React from 'react';
import Button from './Button.jsx';
import eventEmitter from '../../events/emitter';

class ActionBar extends React.Component {
  constructor() {
    super();
    this.markAsAttended = this.markAsAttended.bind(this);
    this.markAsMissed = this.markAsMissed.bind(this);
  }

  render() {
    var defaultStyle = {
      minHeight: "40px",
      width: "100%",
      position: "fixed",
      bottom: 0,
      right: 0,
      left: 0
    };

    var style = Object.assign(defaultStyle, this.props.style);

    return (
      <div style={style} className="action-bar">
        <div className="action-buttons">
          <Button className="btn" onClick={this.markAsMissed}>Mark as Missed</Button>
          <Button className="btn" onClick={this.markAsAttended}>Mark as Attended</Button>
        </div>
      </div>
    );
  }

  markAsMissed() {
    if (confirm("You are about to mark people as missed. Confirm?")) {
      eventEmitter.emit('markSelectedUsers', 'missed');
    }
  }

  markAsAttended() {
    if (confirm("You are about to mark people as attended. Confirm?")) {
      eventEmitter.emit('markSelectedUsers', 'completed');
    }
  }

}

export default ActionBar;
