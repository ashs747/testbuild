import React from 'react';
import _ from 'underscore';

class Tooltip extends React.Component {

  constructor() {
    super();
  }

  render() {
    let classNames = [
      'custom-tooltip',
      this.props.className
    ];
    let style = {
      position: "fixed",
      left: this.props.x,
      top: this.props.y,
      zIndex: 1000,
      visibility: (this.props.display) ? "visible" : "hidden"
    };
    return (
      <div className={classNames.join(" ")} style={style} onMouseLeave={this.props.onMouseLeave}>
        {this.props.content}
        <div className="down-arrow" />
      </div>
    );
  }

}

export default Tooltip;
