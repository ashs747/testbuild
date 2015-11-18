import React from 'react';

class SlideshowPrev extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="slideshow-prev-arrow" onClick={this.props.onClick}>
        <i className="fa fa-chevron-left"></i> Prev
      </div>
    );
  }

}
export default SlideshowPrev;
