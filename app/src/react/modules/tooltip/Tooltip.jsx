import React from 'react';
import _ from 'underscore';

class Tooltip extends React.Component {

  constructor() {
    super();
  }

  render() {
    let classNames = [
      'custom-tooltip',
      (this.props.display) ? "show" : "hide",
      this.props.className
    ];
    let style = {
      position: "fixed",
      left: this.props.x,
      top: this.props.y,
      zIndex: 1000
    };
    return (
      <div className={classNames.join(" ")} style={style} >
        {this.props.content}
        <div className="down-arrow" />
      </div>
    );
  }

}

export default Tooltip;
