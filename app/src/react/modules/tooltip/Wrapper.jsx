import React from 'react';
import Tooltip from './Tooltip.jsx';

class Wrapper extends React.Component {

  constructor() {
    super();
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.state = {
      displayTooltip: false
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
        <Tooltip display={this.state.displayTooltip} content={this.props.content} onBlur={this.hideTooltip} className={this.props.className} />
      </div>
    );
  }

  showTooltip() {
    this.setState({displayTooltip: true});
  }

  hideTooltip() {
    this.setState({displayTooltip: false});
  }

}

export default Wrapper;
