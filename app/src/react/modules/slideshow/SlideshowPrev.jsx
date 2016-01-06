import React from 'react';

class SlideshowPrev extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="slideshow-prev-arrow">
        <span onClick={this.props.onClick}><i className="fa fa-chevron-left"></i> Prev</span>
      </div>
    );
  }

}
export default SlideshowPrev;
