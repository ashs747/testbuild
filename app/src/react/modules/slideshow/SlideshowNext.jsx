import React from 'react';

class SlideshowNext extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="slideshow-next-arrow">
        <span onClick={this.props.onClick}>Next <i className="fa fa-chevron-right"></i></span>
      </div>
    );
  }

}
export default SlideshowNext;
