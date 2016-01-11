import React from 'react';

var component = React.createClass({
  render: function() {
    var completed = this.props.completed,
      max = this.props.max,
      color = this.props.color;

    validateInputs(completed, max);

    var percent = getPercent(completed, max);

    return (
      <div className="progressbar-container" >
        <div className="progressbar-progress" style={getStyle(percent, color)}>
        </div>
      </div>
    );
  }
});

function getPercent(completed, max) {
  completed = completed || 0;
  max = max || 0;
  var percent = max ? Math.round((completed / max) * 100) : completed;

  if (percent < 0) {
    percent = 0;
  } else if (percent > 100) {
    percent = 100;
  }
  return percent;
}

function getStyle(percent, color) {
  return {
    backgroundColor: color || '#0BD318',
    width: percent + '%',
    transition: "width 200ms",
    height: 10
  };
}

function validateInputs(completed, max) {
  if (completed && isNaN(completed)) {
    throw new Error('completed value must be a number');
  }
  if (max && isNaN(max)) {
    throw new Error('max value must be a number');
  }
}

export default component;
