import React from 'react';
import _ from 'underscore';

class Tooltip extends React.Component {

  constructor() {
    super();
  }

  render() {
    let classNames = [
      'custom-tooltip',
      (this.props.display) ? "show" : "hide"
    ];
    return (
      <div className={classNames.join(" ")} >
        {this.props.content}
        <div className="down-arrow" />
      </div>
    );
  }

}

export default Tooltip;
