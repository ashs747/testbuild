import React from 'react';
import SlideshowNext from './SlideshowNext.jsx';
import SlideshowPrev from './SlideshowPrev.jsx';

class SlideshowNav extends React.Component {

  constructor() {
    super();
  }

  render() {
    let showNext = (this.props.showNext) ? <SlideshowNext onClick={this.props.onNextClick} />: null;
    let showPrev = (this.props.showPrev) ? <SlideshowPrev onClick={this.props.onPrevClick} /> : null;
    let dots = this.mapNavigationDots(this.props.length);
    return (
      <div className="slideshow-nav">
        <div className="slideshow-arrows">
          {showNext}
          {showPrev}
        </div>
        <div className="slideshow-dots">
          {dots}
        </div>
      </div>
    );
  }

  mapNavigationDots(length) {
    let navigationDots = [];
    for (var i = 0; i < length; i++) {
      navigationDots.push(<li key={`navItem-${i}`} className="dot" />);
    }
    return (<ul>{navigationDots}</ul>);
  }

}
export default SlideshowNav;
