import React from 'react';

class SlideshowNext extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div onClick={this.props.onClick}>Next</div>
    );
  }

}
export default SlideshowNext;
