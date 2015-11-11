import React from 'react';
import SlideshowNav from './SlideshowNav.jsx';

class Slideshow extends React.Component {

  constructor() {
    super();
    this.showNext = this.showNext.bind(this);
    this.showPrev = this.showPrev.bind(this);
  }

  render() {
    let slide = this.props.slides[this.props.index];
    return (
      <div className="slideshow-module">
        {slide.content}
        <SlideshowNav length={this.props.slides.length} showNext={this.showNext()} showPrev={this.showPrev()} onNextClick={slide.onNextClick} onPrevClick={slide.onPrevClick} />
      </div>
    );
  }

  showNext() {
    /*
      If a value has been passed to showNext, either call the function or evaluate it
      If no value has been passed, default to standard behaviour (only show next if there is a slide to show)
    */
    let showNext = this.props.slides[this.props.index].showNext;
    if (typeof showNext !== 'undefined') {
      if (typeof showNext === 'function') {
        return showNext.call(this);
      }
      return (!!showNext);
    }
    return (this.props.index < this.props.slides.length - 1);
  }

  showPrev() {
    /*
      If a value has been passed to showPrev, either call the function or evaluate it
      If no value has been passed, default to standard behaviour (only show prev if not first slide)
    */
    let showPrev = this.props.slides[this.props.index].showPrev;
    if (typeof showPrev !== 'undefined') {
      if (typeof showPrev === 'function') {
        return showPrev.call(this);
      }
      return (!!showPrev);
    }
    return (this.props.index !== 0);
  }

}
Slideshow.defaultProps = {
  slides: [],
  index: 0
};
export default Slideshow;
