import React from 'react';
var $ = require('jquery');
window.jQuery = $;
require('bootstrap');

class Carousel extends React.Component {

  constructor() {
    super();
  }

  render() {
    var items = [];
    var navigation = [];
    let width = (this.props.defineWidthClass) ? this.props.defineWidthClass : "col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3";
    this.props.items.forEach((item, i) => {
      let className = (i == 0) ? "active" : "";
      items.push(
        <div key={i} className={`item text-center ${className}`}>
          <div className="icon">
            <i className={`fa fa-${item.icon}`} ></i>
          </div>
          <div className="row">
            <div className={width}>
              <h3>{item.name}</h3>
              <p>{item.copy}</p>
            </div>
          </div>
        </div>
      );
      navigation.push(
        <li key={i} data-target="#welcome-carousel" data-slide-to={i} className={className}></li>
      );
    });
    let leftArrow = (!this.props.hideArrows) ? (<a className="left carousel-control" href="#welcome-carousel" data-slide="prev"><img src="assets/img/back.png" /></a>) : null;
    let rightArrow = (!this.props.hideArrows) ? (<a className="right carousel-control" href="#welcome-carousel" data-slide="next"><img src="assets/img/next.png" /></a>) : null;
    return (
      <div id="welcome-carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          {items}
        </div>
        {leftArrow}
        {rightArrow}
        <ol className="carousel-indicators">
          {navigation}
        </ol>
      </div>
    );
  }

}
Carousel.defaultProps = {
  items: []
};
Carousel.propTypes = {
  items: React.PropTypes.array.isRequired
};
export default Carousel;
