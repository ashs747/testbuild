import React from 'react';
import _ from 'underscore';

class Slideshow extends React.Component {

  constructor() {
    super();
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.state = {
      displaySlide: 0
    };
  }

  render() {
    let content = this.props.slides[this.state.displaySlide].content;
    let className = this.props.slides[this.state.displaySlide].className;
    let totalSlides = this.props.slides.length;
    let next = (this.props.slides.length > this.state.displaySlide + 1) ? <span onClick={this.nextSlide}>Next <i className="fa fa-chevron-right"></i></span> : null;
    let prev = (this.state.displaySlide > 0 && this.hideBackButton(this.state.displaySlide)) ? <span onClick={this.prevSlide}><i className="fa fa-chevron-left"></i> Back</span> : null;
    let dots = this.mapDots(this.props.slides.length);
    return (
      <div className="slideshow">
        <div className={`display slide ${className}`}>
          {content}
          <div className="nav">
            <div className="left-arrow arrow col-xs-4">
              {prev}
            </div>
            <div className="dot-nav col-xs-4">
              {dots}
            </div>
            <div className="right-arrow arrow col-xs-4">
              {next}
            </div>
          </div>
        </div>
      </div>
    );
  }

  nextSlide() {
    if (this.props.nextSlideAction) {
      nextSlideAction.call(this);
    } else {
      this.setState({
        displaySlide: this.state.displaySlide + 1
      });
    }
  }

  prevSlide() {
    this.setState({
      displaySlide: this.state.displaySlide - 1
    });
  }

  mapDots(length) {
    let dots = [];
    for (var i = 0; i < length; i++) {
      let className = (i === this.state.displaySlide) ? "active" : "";
      dots.push(
        <li key={i} className="dot-nav-item"><div className={`dot ${className}`}></div></li>
      );
    }
    return (
      <ul className="dot-nav-list">{dots}</ul>
    );
  }

  hideBackButton(i) {
    if (this.props.hideBackOnSlide) {
      return !_.find(this.props.hideBackOnSlide, x => i === x);
    }
    return true;
  }
}

Slideshow.defaultProps = {
  slides: []
};
Slideshow.propTypes = {
  slides: React.PropTypes.array.isRequired,
  hideBackOnSlide: React.PropTypes.array
};
export default Slideshow;
