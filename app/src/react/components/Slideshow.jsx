import React from 'react';

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
    let prev = (this.state.displaySlide > 0) ? <span onClick={this.prevSlide}><i className="fa fa-chevron-left"></i> Prev</span> : null;
    let dots = this.mapDots(this.props.slides.length);
    return (
      <div className="slideshow">
        <div className={`display ${className}`}>
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
    this.setState({
      displaySlide: this.state.displaySlide + 1
    });
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
        <li key={i} className="dot-nav-item"><div className={`dot ${className}`} onClick={this.changeSlide.bind(this, i)}></div></li>
      );
    }
    return (
      <ul className="dot-nav-list">{dots}</ul>
    );
  }

  changeSlide(i) {
    this.setState({
      displaySlide: i
    });
  }

}

Slideshow.defaultProps = {
  slides: [{
    content: (<div>content</div>),
    className: "slide-1"
  }, {
    content: (<div>second content</div>),
    className: "slide-2"
  }, {
    content: (<div>third content</div>),
    className: "slide-3"
  }, {
    content: (<div>fourth content</div>),
    className: "slide-4"
  }]
};
Slideshow.propTypes = {
  slides: React.PropTypes.array.isRequired
};
export default Slideshow;
