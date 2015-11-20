import React from 'react';

class SlideshowNext extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="slideshow-next-arrow" onClick={this.props.onClick}>
        Next <i className="fa fa-chevron-right"></i>
      </div>
    );
  }

}
export default SlideshowNext;
