import React from 'react';

class ResourceDisplay extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="resource-display">
        <i className={`fa ${this.props.icon}`}></i>
        <h6 className="resource-title"><a href={this.props.reference}>{this.props.title}</a></h6>
      </div>
    );
  }

}

export default ResourceDisplay;
