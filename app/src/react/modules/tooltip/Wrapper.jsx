import React from 'react';
import Tooltip from './Tooltip.jsx';

class Wrapper extends React.Component {

  constructor() {
    super();
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.state = {
      displayTooltip: false,
      x: 0,
      y: 0
    };
  }

  render() {
    let clonedElement = React.cloneElement(this.props.trigger, {
      onMouseOver: this.showTooltip,
      onMouseLeave: this.hideTooltip,
      style: {
        cursor: "pointer"
      }
    });
    return (
      <div className="tooltip-trigger" style={{position: "relative"}}>
        {clonedElement}
        <Tooltip ref="tooltip" display={this.state.displayTooltip} content={this.props.content} onBlur={this.hideTooltip} className={this.props.className} x={this.state.x} y={this.state.y}/>
      </div>
    );
  }

  showTooltip(e) {
    console.log(this.refs.tooltip);
    this.setState({displayTooltip: true, x: e.clientX, y: e.clientY});
  }

  hideTooltip() {
    //this.setState({displayTooltip: false});
  }

}

export default Wrapper;
