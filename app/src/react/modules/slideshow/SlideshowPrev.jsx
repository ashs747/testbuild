import React from 'react';

class SlideshowPrev extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div onClick={this.props.onClick}>Prev</div>
    );
  }

}

export default SlideshowPrev;
