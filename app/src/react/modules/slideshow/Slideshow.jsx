import React from 'react';
import SlideshowNav from './SlideshowNav.jsx';

class Slideshow extends React.Component {

  constructor() {
    super();
    this.showNext = this.showNext.bind(this);
    this.showPrev = this.showPrev.bind(this);
  }

  /*
    Pulls the slide through via index. If there isnt a function bound to the click of next or prev
    a default is attached which will simply increment the index
  */
  render() {
    let slide = this.props.slides[this.props.index];
    if (!slide.onNextClick) {
      slide.onNextClick = () => {
        this.props.dispatch({type: "SLIDE_NEXT_SLIDE", payload: {slideID: this.props.slideID}});
      };
    }
    if (!slide.onPrevClick) {
      slide.onPrevClick = () => {
        this.props.dispatch({type: "SLIDE_PREV_SLIDE", payload: {slideID: this.props.slideID}});
      };
    }
    let className = `slideshow-module ${slide.className ? slide.className : ""}`;
    return (
      <div className={className}>
        {slide.content}
        <SlideshowNav currentSlide={this.props.index} length={this.props.slides.length} showNext={this.showNext()} showPrev={this.showPrev()} onNextClick={slide.onNextClick} onPrevClick={slide.onPrevClick} />
      </div>
    );
  }

  /*
    If a value has been passed to showNext, either call the function or evaluate it
    If no value has been passed, default to standard behaviour (only show next if there is a slide to show)
  */
  showNext() {
    let showNext = this.props.slides[this.props.index].showNext;
    if (typeof showNext !== 'undefined') {
      if (typeof showNext === 'function') {
        return showNext.call(this);
      }
      return (!!showNext);
    }
    return (this.props.index < this.props.slides.length - 1);
  }

  /*
    If a value has been passed to showPrev, either call the function or evaluate it
    If no value has been passed, default to standard behaviour (only show prev if not first slide)
  */
  showPrev() {
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
