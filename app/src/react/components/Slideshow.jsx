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
    let content = this.props.slides[this.state.displaySlide];
    let totalSlides = this.props.slides.length;
    let next = (this.props.slides.length > this.state.displaySlide + 1) ? <a onClick={this.nextSlide}>Next <i className="fa fa-chevron-right"></i></a> : null;
    let prev = (this.state.displaySlide > 0) ? <a onClick={this.prevSlide}> <i className="fa fa-chevron-left"></i>Prev</a> : null;
    let dots = this.mapDots(this.props.slides.length);
    return (
      <div className="slideshow">
        <div className="display">
          {content}
        </div>
        <div className="nav">
          <div className="left-arrow col-xs-2">
            {prev}
          </div>
          <div className="dot-nav col-xs-8">
            {dots}
          </div>
          <div className="right-arrow col-xs-2">
            {next}
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
      dots.push(
        <li className="dot-nav-item"><div className="dot" onClick={this.changeSlide.bind(this, i)}>{i}</div></li>
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
  slides: [<p>Hello</p>, <p>There</p>, <p>World!</p>]
};
Slideshow.propTypes = {
  slides: React.PropTypes.array.isRequired
};
export default Slideshow;
