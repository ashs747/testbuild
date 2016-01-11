import React from 'react';
import Tooltip from './Tooltip.jsx';

class Wrapper extends React.Component {

  constructor() {
    super();
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.onTooltipLeave = this.onTooltipLeave.bind(this);
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
      },
      ref: "trigger"
    });
    return (
      <div className="tooltip-trigger" style={{position: "relative"}}>
        {clonedElement}
        <Tooltip ref="tooltip" display={this.state.displayTooltip} content={this.props.content} className={this.props.className} x={this.state.x} y={this.state.y} onMouseLeave={this.onTooltipLeave}/>
      </div>
    );
  }

  showTooltip(e) {
    var tooltip = React.findDOMNode(this.refs.tooltip).getBoundingClientRect();
    var trigger = React.findDOMNode(this.refs.trigger).getBoundingClientRect();
    var x = e.clientX - (tooltip.width / 2);
    var y = trigger.bottom - (trigger.height / 2) - tooltip.height - 20;
    this.setState({displayTooltip: true, x, y});
  }

  hideTooltip(e) {
    var tooltip = React.findDOMNode(this.refs.tooltip).getBoundingClientRect();
    var trigger = React.findDOMNode(this.refs.trigger).getBoundingClientRect();
    var withinX = (e.clientX >= tooltip.left && e.clientX <= tooltip.right);
    var withinY = (e.clientY < trigger.top);
    if (!(withinX && withinY)) {
      this.setState({displayTooltip: false});
    }
  }

  onTooltipLeave(e) {
    var tooltip = React.findDOMNode(this.refs.tooltip).getBoundingClientRect();
    var trigger = React.findDOMNode(this.refs.trigger).getBoundingClientRect();
    var withinX = (e.clientX > tooltip.left && e.clientX < tooltip.right);
    var withinY = (e.clientY < trigger.top && e.clientY >= tooltip.top);
    if (!(withinX && withinY)) {
      this.setState({displayTooltip: false});
    }

  }

}

export default Wrapper;
