import React from 'react';
import SlideshowNext from './SlideshowNext.jsx';
import SlideshowPrev from './SlideshowPrev.jsx';

class SlideshowNav extends React.Component {

  constructor() {
    super();
    this.mapCustomNav = this.mapCustomNav.bind(this);
  }

  render() {
    let showNext = (this.props.showNext) ? <SlideshowNext onClick={this.props.onNextClick} /> : null;
    let showPrev = (this.props.showPrev) ? <SlideshowPrev onClick={this.props.onPrevClick} /> : null;
    let nav = (this.props.nav) ?
      this.mapCustomNav(this.props.currentSlide, this.props.nav) :
      this.mapDefaultNav(this.props.length, this.props.currentSlide);
    return (
      <div className="slideshow-nav">
        <div className="slideshow-arrows">
          {showPrev}
          {showNext}
        </div>
        <div className="slideshow-nav-items">
          {nav}
        </div>
      </div>
    );
  }

  /*
    If no custom nav is passed, map a basic 'dot' nav style,
    looping to the number of slides and adding an active class
  */
  mapDefaultNav(length, currentSlide) {
    let defaultNav = [];
    for (var i = 0; i < length; i++) {
      var className = `dot ${i === currentSlide ? "dot-active" : ""}`;
      defaultNav.push(<div key={`navItem-${i}`} className={className} />);
    }
    return defaultNav;
  }

  /*
    If a custom nav is passed, we need to itterate over it, cloning the element
    while mapping the active class and applying a custom key
  */
  mapCustomNav(currentSlide, customNavItems) {
    let customNav = customNavItems.map((navItem, i) => {
      return this.cloneNavItem(navItem, i, currentSlide);
    });
    return customNav;
  }

  /*
    Custom cloning function, calls React.cloneElement and applies the class and key
  */
  cloneNavItem(element, i, currentSlide) {
    return React.cloneElement(element, {
      className: `${element.props.className} ${(i === currentSlide) ? "active" : ""}`,
      key: `custom-nav-item-${i}`
    });
  }

}
export default SlideshowNav;
